/* Uji alur DOM dengan fixture. Bukan pengujian visual browser. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');const root=path.join(__dirname,'..');
function fixture(saved=null){const elements=new Map(),events={},winEvents={},store=new Map(),downloads=[];let tick;
 const element=id=>{if(!elements.has(id))elements.set(id,{id,innerHTML:'',textContent:'',hidden:false,value:'',dataset:{},classList:{toggle(){}},focus(){},scrollIntoView(){},click(){downloads.push(this.download);}});return elements.get(id);};
 const location={hash:'#home',href:'file:///demo/index.html',protocol:'file:',hostname:''};if(saved)store.set('langkah-writing-v1:/demo/',JSON.stringify(saved));
 const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
 const document={getElementById:element,querySelectorAll:()=>[],createElement:()=>({click(){downloads.push(this.download)},remove(){}}),body:{appendChild(){}},addEventListener:(n,f)=>events[n]=f,title:''};
 const context={window:{location,confirm:()=>true,scrollTo(){},addEventListener:(n,f)=>winEvents[n]=f},document,location,localStorage,navigator:{},console,URL,Blob,Date,AbortController,setTimeout:()=>1,clearTimeout(){},setInterval:f=>tick=f};
 vm.createContext(context);for(const p of ['js/content.js','js/tasks.js','js/core.js','js/app.js'])vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),context);
 const state=()=>JSON.parse(store.get('langkah-writing-v1:/demo/')||'null');
 function route(p){location.hash='#'+p;winEvents.hashchange();return element('main').innerHTML;}
 function click(action,data={}){events.click({target:{closest:()=>({disabled:false,dataset:{action,...data}})}});}
 function input(id,value,data={}){events.input({target:{id,value,dataset:data}});}
 function choice(lesson,i,value){events.change({target:{dataset:{q:String(i)},value:String(value),closest:selector=>selector==='#lesson-quiz'&&lesson?{dataset:{lesson}}:null}});}
 return {context,route,click,input,choice,state,element,events,tick:()=>tick(),downloads};
}
const f=fixture(),C=f.context.window.WRITING_CONTENT;
const routes=['home','learn','write','review','notebook','progress','sources','simulation','diagnostic',...C.lessons.map(l=>'lesson/'+l.id),...C.tasks.map(t=>'writer/'+t.id),'lesson/missing'];
for(const r of routes){const html=f.route(r);assert.ok(html.length>150,r);assert.ok(!html.includes('undefined'),r);assert.ok(!html.includes('NaN'),r);}
console.log('OK '+routes.length+' halaman dirender tanpa nilai kosong tak sengaja.');
f.route('lesson/w01');f.click('finish-lesson',{id:'w01'});assert.equal(f.state()?.completed?.w01,undefined);
const l=C.lessons[0];for(let i=0;i<3;i++)f.choice('w01',i,(l.qs[i].answer+1)%3);f.click('check-lesson',{id:'w01'});assert.deepEqual(f.state().work.w01.first,[false,false,false]);
for(let i=0;i<3;i++)f.choice('w01',i,l.qs[i].answer);f.click('check-lesson',{id:'w01'});f.input('lesson-writing','Saya akan menulis informasi grafik dan mengembangkan alasan yang relevan dalam esai.',{id:'w01'});f.click('finish-lesson',{id:'w01'});assert.equal(f.state().completed.w01.score,0);assert.equal(f.state().work.w01.done,true);f.click('finish-lesson',{id:'w01'});assert.equal(f.state().completed.w01.attempts,1);
console.log('OK koreksi tidak mengubah skor percobaan pertama; simpan berulang tidak menggandakan usaha.');
f.route('writer/p12');f.click('show-model',{id:'p12'});assert.equal(f.element('model-panel').innerHTML,'');
f.input('writer','<script>alert(1)</script> This is my first draft with a clear opinion.',{id:'p12'});f.click('save-version',{id:'p12'});assert.equal(f.state().drafts.p12.versions.length,1);f.click('show-model',{id:'p12'});assert.equal(f.state().drafts.p12.help,true);
f.input('writer','This is a different draft, with a developed reason and a more consistent conclusion.',{id:'p12'});f.click('save-version',{id:'p12'});assert.equal(f.state().drafts.p12.versions.length,1);f.input('revision-note','Saya mengembangkan alasan pertama.',{id:'p12'});f.click('save-version',{id:'p12'});assert.equal(f.state().drafts.p12.versions.length,2);assert.equal(f.state().drafts.p12.versions[1].help,true);
f.click('restore-version',{id:'p12',index:'0'});assert.ok(f.state().drafts.p12.text.startsWith('<script>'));assert.ok(f.element('main').innerHTML.includes('&lt;script&gt;'));assert.ok(!f.element('main').innerHTML.includes('<script>alert'));
f.click('download-draft',{id:'p12'});assert.equal(f.downloads.at(-1).includes('p12'),true);
console.log('OK draf, bantuan, versi awal/revisi, pemulihan, dan pengunduhan tulisan.');
f.click('start-simulation',{test:'2'});assert.equal(f.state().timer.duration,3600);let html=f.route('writer/b21');assert.ok(!html.includes('id="plan-0"'));assert.ok(!html.includes('data-action="show-model"'));assert.ok(html.includes('writer/b22'));f.route('writer/b22');f.click('toggle-timer');assert.equal(f.state().timer.running,false);const seconds=f.state().timer.remaining;f.click('toggle-timer');assert.equal(f.state().timer.running,true);assert.ok(f.state().timer.remaining<=3600);f.click('stop-timer');assert.equal(f.state().timer,null);html=f.route('writer/b22');assert.ok(html.includes('id="plan-0"'));
console.log('OK simulasi menutup bantuan kedua tugas, jam dapat dijeda dan diakhiri.');
const restored=fixture(f.state());restored.route('writer/p12');assert.equal(restored.state().drafts.p12.versions.length,2);assert.equal(restored.state().completed.w01.score,0);
console.log('OK data draf dan hasil pelajaran bertahan saat aplikasi dimuat ulang.');
const currentText=restored.state().drafts.p12.text;restored.click('delete-version',{id:'p12',index:'1'});assert.equal(restored.state().drafts.p12.versions.length,1);assert.equal(restored.state().drafts.p12.text,currentText);console.log('OK hapus versi tidak menghapus draf saat ini.');
