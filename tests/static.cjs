/* Audit file dan simulasi service worker. Tidak membuka browser. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
async function run(){
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){if(ref.startsWith('#'))continue;assert.ok(!ref.startsWith('/'),'asset relatif '+ref);assert.ok(fs.existsSync(path.join(root,ref)),ref);}
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));assert.equal(manifest.scope,'./');assert.equal(manifest.start_url,'./index.html#home');for(const icon of manifest.icons)assert.ok(fs.existsSync(path.join(root,icon.src)));assert.ok(fs.existsSync(path.join(root,'.nojekyll')));
 console.log('OK semua rujukan HTML, ikon, manifest, dan .nojekyll ada dan relatif');
 const scope='https://example.invalid/repository/',prefix='langkah-static:'+scope+':';const listeners={},entries=new Map(),deleted=[],fetches=[];let claimed=false;
 const stores=new Map([[prefix+'old',{}],['langkah-static:https://example.invalid/other/:old',{}]]);
 const caches={async open(name){if(!stores.has(name))stores.set(name,{async addAll(files){for(const f of files){const url=new URL(f,scope).href,local=new URL(f,scope).pathname.replace('/repository/','');assert.ok(fs.existsSync(path.join(root,local||'index.html')),f);entries.set(url,{cached:true,url});}}});return stores.get(name);},async keys(){return [...stores.keys()];},async delete(name){deleted.push(name);return stores.delete(name);},async match(req){return entries.get(typeof req==='string'?req:req.url);}};
 const self={registration:{scope},location:{origin:'https://example.invalid'},clients:{async claim(){claimed=true;}},addEventListener:(type,fn)=>listeners[type]=fn};
 vm.runInNewContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'),{self,caches,URL,fetch:async req=>{fetches.push(req.url);return {network:true};}});
 let task;listeners.install({waitUntil(p){task=p;}});await task;assert.equal(entries.size,10);
 listeners.activate({waitUntil(p){task=p;}});await task;assert.ok(claimed);assert.deepEqual(deleted,[prefix+'old']);assert.ok(stores.has('langkah-static:https://example.invalid/other/:old'));
 let response;listeners.fetch({request:{method:'GET',url:scope+'js/content.js'},respondWith(p){response=p;}});assert.ok((await response).cached);assert.equal(fetches.length,0);
 response=null;listeners.fetch({request:{method:'GET',url:scope+'not-cached'},respondWith(p){response=p;}});assert.ok((await response).network);
 for(const req of [{method:'POST',url:scope},{method:'GET',url:'https://example.invalid/other/js/content.js'},{method:'GET',url:'https://other.invalid/resource'}]){response=null;listeners.fetch({request:req,respondWith(p){response=p;}});assert.equal(response,null);}
 console.log('OK simulasi cache: 10 aset, cache hit, network fallback, dan isolasi subfolder');
 console.log('2 kelompok pemeriksaan statis berhasil. Instalasi/aktivasi native dan offline browser nyata tetap perlu diuji pada browser.');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
