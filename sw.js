/* Dibuat oleh tools/build_cache.py. */
'use strict';
const VERSION="b7e48e2602f3";
const PREFIX='langkah-hub:'+self.registration.scope+':';
const CACHE=PREFIX+VERSION;
const FILES=["./", "./assets/favicon.svg", "./assets/icon-192.png", "./assets/icon-512.png", "./assets/icon.svg", "./css/hub.css", "./css/style.css", "./index.html", "./js/app.js", "./js/content.js", "./js/core.js", "./js/hub-core.js", "./js/hub.js", "./js/module-bridge.js", "./manifest.webmanifest", "./modules/grammar/css/style.css", "./modules/grammar/entry.js", "./modules/grammar/js/app.js", "./modules/grammar/js/content.js", "./modules/grammar/js/core.js", "./modules/registry.js", "./modules/writing/assets/book-31.png", "./modules/writing/assets/book-53.png", "./modules/writing/assets/book-76.png", "./modules/writing/assets/book-97.png", "./modules/writing/assets/icon.svg", "./modules/writing/css/style.css", "./modules/writing/entry.js", "./modules/writing/js/app.js", "./modules/writing/js/content.js", "./modules/writing/js/core.js", "./modules/writing/js/tasks.js"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith(PREFIX)||key.startsWith('langkah-static:'+self.registration.scope+':'))&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(!url.href.startsWith(self.registration.scope))return;
 event.respondWith(caches.match(event.request,{cacheName:CACHE}).then(cached=>cached||fetch(event.request)));
});
