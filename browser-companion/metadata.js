export function tabMetadata(tab,includeTitle){
  if(!tab||tab.incognito||!tab.active)return {hostname:null,title:null};
  try{
    const url=new URL(tab.url);if(!['http:','https:'].includes(url.protocol)||url.username||url.password)return {hostname:null,title:null};
    const hostname=url.hostname.toLowerCase().replace(/\.$/,'');
    if(hostname.length>253||!hostname.split('.').every(v=>/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(v)))return {hostname:null,title:null};
    // Retain exact permitted titles. Oversized/control-bearing titles are
    // unavailable, never silently rewritten or presented as complete evidence.
    return {hostname,title:includeTitle&&typeof tab.title==='string'&&tab.title.length<=1024&&!/[\u0000-\u001f\u007f]/u.test(tab.title)?tab.title:null};
  }catch{return {hostname:null,title:null};}
}
