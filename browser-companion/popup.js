const names={not_paired:'Not paired',connecting:'Connecting…',connected:'Connected',disabled:'Disabled in Surv-AI Settings',paused:'Paused in this extension',temporarily_disconnected:'Temporarily disconnected',invalid_port:'Check the server port'};
function show(value){document.getElementById('status').textContent=value.error||names[value.state]||'Connection unavailable';document.getElementById('installation').textContent=value.installation?(value.installation+(value.port?' · 127.0.0.1:'+value.port:'')):'';document.getElementById('identity').textContent='Extension ID: '+(value.extensionId||chrome.runtime.id);const port=document.getElementById('port');if(value.port&&document.activeElement!==port&&!document.getElementById('code').value)port.value=value.port;}
async function action(message){show(await chrome.runtime.sendMessage(message));}
chrome.runtime.onMessage.addListener((value,sender)=>{if(sender.id===chrome.runtime.id&&value.type==='connection-status')show(value);});
document.getElementById('pair').addEventListener('submit',async e=>{e.preventDefault();const code=document.getElementById('code');await action({type:'pair',port:document.getElementById('port').value,code:code.value.trim()});code.value='';});
for(const type of ['pause','resume','disconnect'])document.getElementById(type).addEventListener('click',()=>void action({type}));
void action({type:'status'});
