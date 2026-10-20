import {tabMetadata} from './metadata.js';
let socket=null,connecting=false,version=0,sequence=0,focusWindow=null,state='not_paired',installation='',pairedPort=null,nextAttempt=0;
const alarm='surv-reconnect';
const read=()=>chrome.storage.local.get(['token','port','paused','installation']);
const status=()=>({state,installation,port:pairedPort,extensionId:chrome.runtime.id});
const announce=()=>void chrome.runtime.sendMessage({type:'connection-status',...status()}).catch(()=>{});
async function setup(){await chrome.storage.local.setAccessLevel({accessLevel:'TRUSTED_CONTEXTS'});if(!await chrome.alarms.get(alarm))await chrome.alarms.create(alarm,{periodInMinutes:.5});void connect();}
function stop(){const old=socket;socket=null;old?.close();}
async function sample(request,ws){
  const generation=version,settings=await read();
  if(settings.paused||socket!==ws||ws.readyState!==WebSocket.OPEN)return;
  let focused=false,metadata={hostname:null,title:null};
  try{
    const window=await chrome.windows.getLastFocused({populate:false,windowTypes:['normal']});
    if(window.focused&&!window.incognito){
      const [tab]=await chrome.tabs.query({active:true,windowId:window.id});
      const again=await chrome.windows.get(window.id,{populate:false});
      if(generation===version&&again.focused&&!again.incognito&&tab?.windowId===window.id&&tab.active){focused=true;focusWindow=window.id;metadata=tabMetadata(tab,request.includeTitle===true);}
    }
  }catch{/* Closed/private/privileged surfaces are unavailable. */}
  if(socket===ws&&ws.readyState===WebSocket.OPEN)ws.send(JSON.stringify({type:'sample',requestId:request.requestId,sequence:++sequence,timestamp:Date.now(),focused,...metadata}));
}
async function connect(force=false){
  if(connecting||socket||!force&&Date.now()<nextAttempt)return;
  connecting=true;nextAttempt=Date.now()+15000;
  try{
    const s=await read();installation=s.installation||'';pairedPort=s.port||null;
    if(!s.token){state='not_paired';return;}if(s.paused){state='paused';return;}
    const port=Number(s.port);if(!Number.isInteger(port)||port<1||port>65535){state='invalid_port';return;}
    const ws=new WebSocket(`ws://127.0.0.1:${port}/browser-companion/channel`);socket=ws;state='connecting';sequence=0;
    ws.onopen=()=>ws.send(JSON.stringify({type:'authenticate',token:s.token}));
    ws.onmessage=e=>{if(socket!==ws)return;try{const data=JSON.parse(e.data);if(data.type==='ready'){state=data.enabled?'connected':'disabled';if(!data.enabled)stop();announce();}else if(data.type==='sample')void sample(data,ws);else if(data.type==='disabled'){state='disabled';stop();announce();}}catch{stop();}};
    ws.onerror=()=>{if(socket===ws){state='temporarily_disconnected';stop();announce();}};
    ws.onclose=()=>{if(socket===ws){socket=null;state='temporarily_disconnected';announce();}};
  }finally{connecting=false;}
}
// Events invalidate in-flight reads. Metadata is read only in response to a fresh
// server sample challenge, never from a bulk tab enumeration or event history.
const changed=()=>{version++;void connect();};
chrome.tabs.onActivated.addListener(changed);
chrome.tabs.onUpdated.addListener((_id,change,tab)=>{if(tab.active&&(change.title!==undefined||change.url!==undefined||change.status!==undefined))changed();});
chrome.tabs.onRemoved.addListener(changed);
chrome.windows.onFocusChanged.addListener(id=>{focusWindow=id;changed();});
chrome.windows.onRemoved.addListener(changed);
chrome.runtime.onStartup.addListener(()=>void setup());
chrome.runtime.onInstalled.addListener(()=>void setup());
chrome.alarms.onAlarm.addListener(a=>{if(a.name===alarm)void connect();});
chrome.runtime.onMessage.addListener((message,sender,reply)=>{
  if(sender.id!==chrome.runtime.id||sender.url!==chrome.runtime.getURL('popup.html'))return;
  (async()=>{
    if(message.type==='pair'){
      const port=Number(message.port);if(!Number.isInteger(port)||port<1||port>65535||typeof message.code!=='string'||!/^[A-Za-z0-9_-]{32}$/.test(message.code))throw Error('Enter the local server port and the Settings pairing code.');
      const response=await fetch(`http://127.0.0.1:${port}/browser-companion/pair`,{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:message.code}),signal:AbortSignal.timeout(5000)});
      const data=await response.json();if(!response.ok)throw Error(data.error||'Pairing failed.');
      stop();await chrome.storage.local.set({token:data.token,port,installation:data.installation,paused:false});state='connecting';await connect(true);
    }else if(message.type==='pause'){await chrome.storage.local.set({paused:true});stop();state='paused';}
    else if(message.type==='resume'){await chrome.storage.local.set({paused:false});await connect(true);}
    else if(message.type==='disconnect'){stop();await chrome.storage.local.remove(['token','installation']);state='not_paired';installation='';pairedPort=null;}
    else if(message.type==='status')await connect();
    else throw Error('Unsupported operation.');
    return status();
  })().then(reply,()=>reply({error:'Could not complete the connection. Check the port and create a fresh pairing code in Settings.'}));
  return true;
});
void setup();
