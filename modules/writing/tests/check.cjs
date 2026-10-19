/* Jalankan dari folder proyek: node tests/check.cjs. Tanpa npm. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),K=require('../js/core.js');
const contentContext={window:{}};vm.createContext(contentContext);for(const p of ['js/content.js','js/tasks.js'])vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),contentContext);
const C=JSON.parse(JSON.stringify(contentContext.window.WRITING_CONTENT));let passed=0;
function test(title,fn){fn();passed++;console.log('OK '+title);}
test('20 pelajaran, 60 soal sah, ID unik, 16 tugas dan sumber lengkap',()=>{
 assert.equal(C.lessons.length,20);assert.equal(C.lessons.reduce((n,l)=>n+l.qs.length,0),60);assert.equal(new Set(C.lessons.map(l=>l.id)).size,20);
 for(const l of C.lessons){assert.equal(l.qs.length,3);assert.ok(l.ref&&l.write&&l.model);for(const q of l.qs){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3);assert.ok(q.why&&C.tags[q.tag]);}}
 assert.equal(C.tasks.length,16);assert.equal(C.tasks.filter(t=>t.origin==='book').length,8);assert.equal(new Set(C.tasks.map(t=>t.id)).size,16);
 for(const t of C.tasks){if(t.model)assert.ok(K.words(t.model)>=(t.task===1?150:250),t.id);if(t.image)assert.ok(fs.statSync(path.join(root,t.image)).size>1000);if(t.origin==='book')assert.ok(t.band&&t.answerPages&&t.page);}
 assert.deepEqual(C.tasks.filter(t=>t.origin==='book').map(t=>t.band),[6.5,6,6.5,6,6.5,7,5,6]);
 for(const t of C.tasks.filter(t=>t.visual?.shares))assert.equal(t.visual.shares.reduce((n,r)=>n+r[1],0),100);
});
test('kata dan paragraf tidak mengubah minimum menjadi nilai band',()=>{
 assert.equal(K.words("I don't know. It’s cost-effective."),5);assert.equal(K.paragraphs('First line.\nStill first.\n\nSecond.'),2);assert.equal(K.paragraphs('  '),0);
 assert.equal(K.audit('word '.repeat(149),1).notes[0].type,'warn');assert.equal(K.audit('word '.repeat(150),1).notes[0].type,'ok');assert.equal(K.audit('word '.repeat(249),2).notes[0].type,'warn');assert.equal(K.audit('word '.repeat(250),2).notes[0].type,'ok');
 assert.equal(K.audit('In my opinion, the number rose.',1).notes.some(n=>n.title==='Periksa pendapat pribadi'),true);
 assert.equal(K.audit('word '.repeat(300),2).band,undefined);
});
test('jadwal melalui bulan kabisat, gagal kembali besok, tidak meloncat karena klik ulang',()=>{
 assert.equal(K.addDays('2028-02-28',1),'2028-02-29');assert.equal(K.addDays('2028-02-29',1),'2028-03-01');
 let prev=null;for(const [date,days]of [['2026-10-01',1],['2026-10-02',3],['2026-10-05',7],['2026-10-12',14]]){prev=K.nextDue(prev,true,date);assert.equal(prev.due,K.addDays(date,days));}
 const repeated=K.nextDue(prev,true,'2026-10-12');assert.deepEqual(repeated,prev);assert.equal(K.nextDue(prev,false,'2026-10-13').due,'2026-10-14');
});
test('jam memakai waktu nyata dan berhenti di nol',()=>{
 assert.equal(K.remaining({running:true,end:5000},3500),2);assert.equal(K.remaining({running:true,end:5000},6000),0);assert.equal(K.remaining({running:false,remaining:700},999999),700);
});
test('cadangan membangun ulang data yang dikenal dan menjeda jam',()=>{
 const s=K.initial();s.focus='task2';s.work.w01={text:'a useful answer',answers:[1,1,2],first:[true,false,true],checked:true,done:true};s.drafts.b12=K.draft();s.drafts.b12.text='<img src=x onerror=alert(1)>';s.drafts.b12.versions=[{text:'original',at:'2026-10-19T01:02:03Z',note:'reason',help:false}];s.drafts.b12.checks={tr:'yes',evil:'yes'};s.timer={duration:3600,remaining:125,running:true,end:555,label:'test',id:'test1'};
 s.errors=[{id:'one',tag:'data',before:'wrong',after:'right',rule:'check',due:'2026-10-20',date:'2026-10-19',last:'2026-10-19',level:1}];
 const raw=JSON.parse(JSON.stringify(s));raw.drafts.unknown=K.draft();raw.work.w02={checked:true,first:[],answers:[0,0,0]};const v=K.validate(raw,C);
 assert.equal(v.drafts.b12.text,s.drafts.b12.text);assert.equal(v.drafts.b12.versions[0].text,'original');assert.equal(v.work.w01.done,true);assert.equal(v.work.w02.checked,false);assert.equal(v.timer.running,false);assert.equal(v.timer.remaining,125);assert.equal(v.drafts.unknown,undefined);assert.equal(v.drafts.b12.checks.evil,undefined);assert.equal(v.errors[0].last,'2026-10-19');
 assert.throws(()=>K.validate({version:2},C));
 const malicious=JSON.parse('{"version":1,"drafts":{"__proto__":{"text":"bad"}}}');const clean=K.validate(malicious,C);assert.equal(Object.keys(clean.drafts).length,0);assert.equal({}.text,undefined);
});
test('saran menghormati fokus dan mendahulukan pengulangan',()=>{
 const s=K.initial();s.focus='task1';const first=K.recommend(s,C,'2026-10-19');assert.equal(first.lesson.id,'w01');for(const l of C.lessons.filter(l=>l.task==='dasar'))s.completed[l.id]={due:'2026-10-20'};assert.equal(K.recommend(s,C,'2026-10-19').lesson.task,'task1');s.completed.w15={due:'2026-10-18'};assert.equal(K.recommend(s,C,'2026-10-19').lesson.id,'w15');
});
test('service worker hanya menangani scope sendiri, semua aset cache ada',()=>{
 const swRoot=path.join(root,'..','..');const sw=fs.readFileSync(path.join(swRoot,'sw.js'),'utf8'),list=JSON.parse(sw.match(/const FILES=(\[[^;]+\]);/)[1]);for(const f of list)assert.ok(fs.existsSync(path.join(swRoot,f)),f);assert.ok(sw.includes('self.registration.scope'));assert.ok(sw.includes("event.request.method!=='GET'"));
});
console.log(passed+' kelompok pemeriksaan berhasil.');
