/* Jalankan dari folder website: node tests/check.cjs */
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'js/content.js'),'utf8'),context);
const content=context.window.LANGKAH_CONTENT;
const K=require('../js/core.js');
let checks=0;
function test(name,fn){fn();checks++;console.log('OK '+name);}
test('123 pelajaran, 115 unit, 8 dasar, seluruh peta sekali',()=>{
  assert.equal(content.lessons.length,123);
  assert.equal(content.lessons.filter(l=>l.unit!==null).length,115);
  const units=content.lessons.filter(l=>l.unit!==null).map(l=>l.unit).sort((a,b)=>a-b);
  assert.equal(JSON.stringify(units),JSON.stringify(Array.from({length:115},(_,i)=>i+1)));
  const mapped=content.paths.flatMap(p=>p.lessons);
  assert.equal(mapped.length,123);assert.equal(new Set(mapped).size,123);
  assert.ok(content.lessons.every(l=>mapped.includes(l.id)));
});
test('615 soal memiliki jawaban, opsi unik, bank kata utuh',()=>{
  const ids=new Set();let count=0;
  for(const l of content.lessons){
    assert.ok(l.rule&&l.tip&&l.pattern&&l.examples.length===3);
    for(const q of K.questions(l)){
      count++;assert.ok(!ids.has(q.id));ids.add(q.id);
      assert.ok(q.prompt&&q.why&&q.answers.length);
      assert.ok(K.equivalent(q.answers[0],q.answers));
      assert.ok(!K.equivalent('jawaban sengaja keliru',q.answers));
      if(q.type==='choice'){assert.equal(new Set(q.options).size,3);assert.equal(q.options.filter(o=>q.answers.includes(o)).length,1);}
      if(q.type==='order'){assert.equal(K.clean([...q.tokens].sort((a,b)=>a.i-b.i).map(t=>t.word).join(' ')),K.clean(q.answers[0]));}
      if(q.type==='write')assert.equal(q.bank.split(' · ').length,q.answers[0].split(/\s+/).length);
    }
  }assert.equal(count,615);
});
test('tulisan menerima kontraksi; apostrof kepemilikan tetap bermakna',()=>{
  assert.ok(K.equivalent("  I'M READY! ",['I am ready.']));
  assert.ok(K.equivalent('She hasn’t eaten yet.',['She has not eaten yet.']));
  assert.ok(K.equivalent('He’s written it.',['He has written it.']));
  assert.ok(K.equivalent('Let’s go!',['Let us go.']));
  assert.ok(!K.equivalent('He does not eats.',['He does not eat.']));
  assert.ok(!K.equivalent('childrens',["children’s"]));
  assert.ok(!K.equivalent('You are ready',['You are not ready']));
});
test('nilai pertama tidak tertimpa percobaan ulang, XP tidak bertambah',()=>{
  const s=K.initialState();
  K.finishLesson(s,'f01',[false,true,false,true,true],'2026-10-04');
  assert.equal(s.completed.f01.firstScore,60);assert.equal(s.reviews.f01.due,'2026-10-04');assert.equal(K.xp(s),30);
  K.finishLesson(s,'f01',[true,true,true,true,true],'2026-10-04');
  assert.equal(s.completed.f01.firstScore,60);assert.equal(s.completed.f01.bestScore,100);assert.equal(K.xp(s),30);assert.equal(s.reviews.f01.due,'2026-10-04');
  assert.throws(()=>K.finishLesson(s,'f02',[true,null,true,true,true]));
});
test('jadwal 1/3/7/14/30 hari, gagal kembali besok',()=>{
  let r={box:0,due:'2026-10-04',last:'2026-10-04'};
  for(const [i,days] of K.DAY_STEPS.entries()){
    r=K.schedule(r,true,'2026-10-04');assert.equal(r.box,i+1);assert.equal(r.due,K.plusDays('2026-10-04',days));
  }
  r=K.schedule(r,false,'2026-10-04');assert.equal(r.box,0);assert.equal(r.due,'2026-10-05');
  assert.equal(K.plusDays('2026-12-31',1),'2027-01-01');
});
test('streak, XP ulang sekali sehari, dan target latihan',()=>{
  const s=K.initialState();K.record(s,'review','f01',1,'2026-10-03');K.record(s,'review','f01',1,'2026-10-04');K.record(s,'review','f01',1,'2026-10-04');
  assert.equal(K.streak(s,'2026-10-04'),2);assert.equal(K.daily(s,'2026-10-04'),2);assert.equal(K.xp(s),16);assert.equal(K.streak(s,'2026-10-06'),0);
});
test('pemangkasan riwayat tidak menghapus poin yang sudah diperoleh',()=>{
  const s=K.initialState();K.record(s,'review','f01',1,'2026-10-04');
  for(let i=0;i<5010;i++)K.record(s,'word','w001',1,'2026-10-04');
  assert.equal(s.records.length,5000);assert.equal(K.xp(s),8);
});
test('cadangan dibangun ulang; data asing/angka/tanggal tak valid ditolak',()=>{
  const s=K.initialState();K.finishLesson(s,'f01',[true,true,true,true,true],'2026-10-04');s.active={lesson:'g001',index:1,first:[true,null,null,null,null]};
  const imported=K.validated(JSON.parse(JSON.stringify(s)),content);assert.deepEqual(imported,s);
  const copy=()=>JSON.parse(JSON.stringify(s));let bad=copy();bad.completed.evil=bad.completed.f01;assert.throws(()=>K.validated(bad,content));
  bad=copy();bad.reviews.f01.box=100;assert.throws(()=>K.validated(bad,content));
  bad=copy();bad.records[0].date='2026-02-30';assert.throws(()=>K.validated(bad,content));
  bad=copy();bad.active.index=9;assert.throws(()=>K.validated(bad,content));
  bad=copy();bad.settings.remote='yes';assert.throws(()=>K.validated(bad,content));
});
test('161 kata, 8 misi, dan rujukan tidak kosong',()=>{
  assert.equal(content.vocab.length,161);assert.equal(new Set(content.vocab.map(w=>w.en)).size,161);
  assert.equal(content.missions.length,8);for(const m of content.missions){assert.equal(new Set(m.options).size,3);assert.ok(m.lines.length&&m.model&&m.why);assert.ok(m.units.every(id=>content.lessons.some(l=>l.id===id)));}
  assert.equal(content.irregular.length,40);
});
console.log(checks+' kelompok pemeriksaan berhasil.');
