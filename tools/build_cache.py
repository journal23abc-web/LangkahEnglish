"""Buat ulang daftar aset setelah menambah atau mengubah modul.
Jalankan: python3 tools/build_cache.py
"""
from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parents[1]
allowed = {'.html', '.js', '.css', '.svg', '.png', '.jpg', '.webp', '.webmanifest', '.woff2'}
files = sorted(p for p in root.rglob('*') if p.is_file() and p.suffix in allowed
               and p.name != 'sw.js' and not any(x in {'tests', 'docs', 'tools', 'node_modules'} for x in p.relative_to(root).parts))
digest = hashlib.sha256()
for p in files:
    digest.update(p.relative_to(root).as_posix().encode())
    digest.update(p.read_bytes())
version = digest.hexdigest()[:12]
asset_list = ['./'] + ['./' + p.relative_to(root).as_posix() for p in files]
script = """/* Dibuat oleh tools/build_cache.py. */
'use strict';
const VERSION=__VERSION__;
const PREFIX='langkah-hub:'+self.registration.scope+':';
const CACHE=PREFIX+VERSION;
const FILES=__FILES__;
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith(PREFIX)||key.startsWith('langkah-static:'+self.registration.scope+':'))&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(!url.href.startsWith(self.registration.scope))return;
 event.respondWith(caches.match(event.request,{cacheName:CACHE}).then(cached=>cached||fetch(event.request)));
});
""".replace('__VERSION__', json.dumps(version)).replace('__FILES__', json.dumps(asset_list))
(root / 'sw.js').write_text(script)
(root / '.nojekyll').write_text('')
print(f'Cache diperbarui: {len(asset_list)} aset, versi {version}.')
