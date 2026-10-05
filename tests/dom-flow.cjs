/* Pemeriksaan DOM offline; bukan pemeriksaan visual browser.
   Opsional: npm install --no-save jsdom && node tests/dom-flow.cjs */
const {JSDOM,VirtualConsole}=require(process.env.LANGKAH_TEST_JSDOM||'jsdom');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const tick=()=>new Promise(r=>setTimeout(r,0));
function fixture(saved=null){
  const errors=[], registered=new Map(), spoken=[];
  const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://example.invalid/project/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window;w.scrollTo=()=>{};
  w.__speechVoices=[{name:'Local English',lang:'en-GB',localService:true},{name:'Remote English',lang:'en-US',localService:false}];
  w.speechSynthesis={getVoices:()=>w.__speechVoices,addEventListener:()=>{},cancel:()=>{},speak:u=>spoken.push(u)};
  w.SpeechSynthesisUtterance=function(text){this.text=text;};
  w.document.modelContext={registerTool:tool=>{registered.set(tool.name,tool);}};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.URL.createObjectURL=()=> 'blob:fixture';w.URL.revokeObjectURL=()=>{};
  w.HTMLAnchorElement.prototype.click=function(){w.__download=this.download;};
  for(const name of ['content','core'])w.eval(fs.readFileSync(path.join(root,'js/'+name+'.js'),'utf8'));
  if(saved)w.localStorage.setItem(w.LangkahCore.KEY,saved);
  w.eval(fs.readFileSync(path.join(root,'js/app.js'),'utf8'));
  w.addEventListener('error',e=>errors.push(e.message));
  const doc=w.document;
  return {dom,w,doc,errors,registered,spoken,click:(selector)=>{const el=doc.querySelector(selector);assert.ok(el,'missing '+selector);el.click();},async route(hash){w.location.hash=hash;await tick();await tick();},saved:()=>JSON.parse(w.localStorage.getItem(w.LangkahCore.KEY)),close:()=>w.close()};
}
function choose(f,answer){const buttons=[...f.doc.querySelectorAll('[data-action="answer-choice"]')];const b=buttons.find(b=>b.querySelector('span:last-child').textContent===answer);assert.ok(b,'choice '+answer);b.click();}
function fill(f,answer){const input=f.doc.querySelector('#answer-input');assert.ok(input);input.value=answer;f.doc.querySelector('#answer-form').dispatchEvent(new f.w.Event('submit',{bubbles:true,cancelable:true}));}
function closeDialog(f,value){const d=f.doc.querySelector('#confirm-dialog');d.returnValue=value;d.open=false;d.dispatchEvent(new f.w.Event('close'));}
async function run(){let checks=0;const f=fixture(),K=f.w.LangkahCore,C=f.w.LANGKAH_CONTENT;
  assert.ok(f.doc.querySelector('.next-card'));assert.equal(f.registered.size,2);checks++;
  for(const l of C.lessons){await f.route('lesson/'+l.id);assert.equal(f.doc.querySelector('.page-heading h1').textContent,l.title);assert.equal(f.doc.querySelectorAll('.example').length,3);}
  console.log('OK 123 penjelasan dan contoh dapat dirender ke DOM');checks++;
  await f.route('practice/f01');const q=K.questions(C.lessons.find(l=>l.id==='f01'));
  choose(f,q[0].options.find(o=>o!==q[0].answers[0]));assert.match(f.doc.querySelector('.feedback').textContent,/Belum pas/);choose(f,q[0].answers[0]);f.click('[data-action="next-question"]');
  f.click('[data-action="hint"]');choose(f,q[1].answers[0]);f.click('[data-action="next-question"]');
  fill(f,'night');assert.match(f.doc.querySelector('.feedback').textContent,/Belum pas/);fill(f,q[2].answers[0]);f.click('[data-action="next-question"]');
  for(let i=0;i<q[3].tokens.length;i++)f.click('.tokens [data-action="add-token"][data-index="'+i+'"]');f.click('[data-action="answer-order"]');f.click('[data-action="next-question"]');
  fill(f,q[4].answers[0].toUpperCase());f.click('[data-action="next-question"]');await tick();
  assert.equal(f.saved().completed.f01.firstScore,40);assert.equal(f.saved().completed.f01.bestScore,40);assert.equal(K.xp(f.saved()),30);assert.ok(f.doc.querySelector('.finish-card'));console.log('OK salah → koreksi, petunjuk, susun, tulis, dan penyelesaian tercatat');checks++;
  await f.route('practice/f02');const q2=K.questions(C.lessons.find(l=>l.id==='f02'));choose(f,q2[0].answers[0]);f.click('[data-action="next-question"]');
  const resumed=fixture(JSON.stringify(f.saved()));await resumed.route('practice/f02');assert.match(resumed.doc.querySelector('.practice-count').textContent,/2 \/ 5/);assert.equal(resumed.saved().active.first[0],true);assert.equal(Object.keys(resumed.saved().completed).length,1);resumed.close();console.log('OK pemulihan sesi tidak menyelesaikan pelajaran secara otomatis');checks++;
  await f.route('review');f.click('[data-action="start-review"]');await tick();f.click('[data-action="hint"]');fill(f,q[2].answers[0]);f.click('[data-action="next-question"]');await tick();
  assert.equal(f.saved().reviews.f01.box,0);assert.equal(f.saved().reviews.f01.due,K.plusDays(K.day(),1));assert.equal(K.xp(f.saved()),38);console.log('OK jawaban ulang dengan bantuan kembali besok');checks++;
  await f.route('mission/m1');const wrong=[...f.doc.querySelectorAll('[data-action="mission-answer"]')].find(b=>b.dataset.value==='Yes, I’m.');wrong.click();assert.match(f.doc.querySelector('#mission-feedback').textContent,/Mari cek/);assert.equal(Object.keys(f.saved().missions).length,0);
  [...f.doc.querySelectorAll('[data-action="mission-answer"]')].find(b=>b.dataset.value==='Yes, I am.').click();assert.equal(Object.keys(f.saved().missions).length,1);assert.equal(K.xp(f.saved()),48);
  await f.route('missions');await f.route('mission/m1');[...f.doc.querySelectorAll('[data-action="mission-answer"]')].find(b=>b.dataset.value==='Yes, I am.').click();assert.equal(K.xp(f.saved()),48);console.log('OK kontraksi positif jawaban singkat ditolak dan XP misi tidak digandakan');checks++;
  await f.route('words');f.click('[data-action="start-words"]');await tick();assert.ok(f.doc.querySelector('.flash-word'));f.click('[data-action="reveal-word"]');f.click('[data-action="word-grade"][data-correct="true"]');assert.equal(Object.keys(f.saved().words).length,1);console.log('OK kartu kosakata dengan penilaian mandiri');checks++;
  await f.route('progress');f.click('[data-action="speak"]');assert.equal(f.spoken.length,1);assert.equal(f.spoken[0].voice.localService,true);
  f.w.__speechVoices=[{lang:'en-US',localService:false}];f.click('[data-action="speak"]');assert.equal(f.spoken.length,1);assert.match(f.doc.querySelector('#toast').textContent,/daring/);
  f.doc.querySelector('#remote-voice').checked=true;f.doc.querySelector('#settings-form').dispatchEvent(new f.w.Event('submit',{bubbles:true,cancelable:true}));f.click('[data-action="speak"]');assert.equal(f.spoken.length,2);assert.equal(f.spoken[1].voice.localService,false);
  f.w.__speechVoices=[];f.click('[data-action="speak"]');assert.equal(f.spoken.length,2);console.log('OK suara daring memerlukan izin; tanpa suara tetap ada teks');checks++;
  f.click('[data-action="export"]');assert.match(f.w.__download,/langkah-progres-.*\.json/);
  const current=JSON.stringify(f.saved()),bad={size:50,text:async()=>'{"version":999}'};let input=f.doc.querySelector('#import-file');Object.defineProperty(input,'files',{value:[bad],configurable:true});input.dispatchEvent(new f.w.Event('change',{bubbles:true}));await tick();assert.match(f.doc.querySelector('#toast').textContent,/ditolak/);assert.equal(JSON.stringify(f.saved()),current);
  const restored=K.initialState();K.finishLesson(restored,'g001',[true,true,true,true,true],K.day());Object.defineProperty(input,'files',{value:[{size:500,text:async()=>JSON.stringify(restored)}],configurable:true});input.dispatchEvent(new f.w.Event('change',{bubbles:true}));await tick();assert.ok(f.doc.querySelector('#confirm-dialog').open);closeDialog(f,'cancel');assert.equal(JSON.stringify(f.saved()),current);
  input.dispatchEvent(new f.w.Event('change',{bubbles:true}));await tick();closeDialog(f,'confirm');assert.equal(Object.keys(f.saved().completed).join(),'g001');console.log('OK ekspor, impor tidak valid, batal impor, dan pemulihan setelah konfirmasi');checks++;
  f.click('[data-action="reset"]');closeDialog(f,'cancel');assert.equal(Object.keys(f.saved().completed).length,1);f.click('[data-action="reset"]');closeDialog(f,'confirm');assert.equal(Object.keys(f.saved().completed).length,0);console.log('OK reset hanya berjalan setelah konfirmasi');checks++;
  const open=f.registered.get('langkah_open_lesson'),read=f.registered.get('langkah_read_progress');assert.throws(()=>open.execute({lesson_id:'bad'}));assert.throws(()=>open.execute({lesson_id:'g001',extra:true}));assert.throws(()=>read.execute([]));open.execute({lesson_id:'g001'});await tick();assert.equal(f.w.location.hash,'#lesson/g001');assert.equal(Object.keys(f.saved().completed).length,0);assert.match(read.execute({}).content[0].text,/"completed":0/);console.log('OK WebMCP dalam registry simulasi: valid/invalid dan state UI sama');checks++;
  await f.route('check/p0');const checkIds=K.shuffle(C.paths[0].lessons,K.day()+'p0').slice(0,5);
  for(const [i,id] of checkIds.entries()){const q=K.questions(C.lessons.find(l=>l.id===id))[i%2?1:2];if(q.type==='choice')choose(f,q.answers[0]);else fill(f,q.answers[0]);f.click('[data-action="next-question"]');}
  await tick();assert.ok(f.saved().records.some(r=>r.kind==='check'));assert.equal(Object.keys(f.saved().completed).length,0);
  await f.route('diagnostic');f.click('[data-action="start-diagnostic"]');await tick();
  for(const id of ['f01','f02','f04','f05','g005','g007','g003','g011','g017','g030','g103','g049']){choose(f,K.questions(C.lessons.find(l=>l.id===id))[1].answers[0]);f.click('[data-action="next-question"]');}
  await tick();assert.match(f.doc.querySelector('.finish-card').textContent,/12 \/ 12/);assert.equal(Object.keys(f.saved().completed).length,0);console.log('OK campur pola dan diagnostik tidak menandai pelajaran sebagai selesai');checks++;
  f.w.__speechVoices=[{lang:'en-GB',localService:true}];await f.route('listen');f.click('[data-action="start-listen"]');await tick();const listenLessons=K.shuffle(C.lessons.filter(l=>!l.unit),K.day()+'listen').slice(0,5);
  for(const [i,l] of listenLessons.entries()){assert.equal(f.doc.querySelector('#main h1').textContent,'Dengarkan frasanya. Apa artinya?');f.click('[data-action="speak"]');choose(f,l.examples[i%3].id);f.click('[data-action="next-question"]');}
  await tick();assert.equal(f.saved().records.filter(r=>r.kind==='listen').length,5);assert.equal(Object.keys(f.saved().completed).length,0);assert.ok(K.validated(f.saved(),C));console.log('OK lima frasa mendengar memakai audio fixture dan menyimpan aktivitas');checks++;
  for(const route of ['path','review','words','missions','checks','diagnostic','listen','progress','about','reference','not-a-page']){await f.route(route);assert.ok(f.doc.querySelector('#main h1'));}
  await f.route('path');f.doc.querySelector('#lesson-search').value='kepemilikan';f.doc.querySelector('#lesson-search').dispatchEvent(new f.w.Event('input',{bubbles:true}));assert.ok(f.doc.querySelectorAll('.lesson-row').length>0);
  f.doc.querySelector('#lesson-search').value='zzzzzz';f.doc.querySelector('#lesson-search').dispatchEvent(new f.w.Event('input',{bubbles:true}));assert.equal(f.doc.querySelectorAll('.lesson-row').length,0);assert.ok(f.doc.querySelector('.empty'));
  assert.equal(f.errors.length,0,f.errors.join('\n'));f.close();console.log('OK seluruh menu, filter, dan nol error DOM');checks++;
  console.log(checks+' kelompok pemeriksaan DOM berhasil. Audio dan dialog memakai fixture; CSS, browser native, serta service worker nyata tidak diuji oleh skrip ini.');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
