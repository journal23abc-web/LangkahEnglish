'use strict';
const VERSION='1.0.0';
const PREFIX='langkah-static:'+self.registration.scope+':';
const CACHE=PREFIX+VERSION;
const FILES=['./','./index.html','./css/style.css','./js/content.js','./js/core.js','./js/app.js','./manifest.webmanifest','./assets/favicon.svg','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));
});
