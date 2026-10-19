(function(root){
'use strict';
const localDate=(d=new Date())=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
const addDays=(date,n)=>{const[y,m,d]=date.split('-').map(Number);return localDate(new Date(y,m-1,d+n,12));};
const words=t=>(String(t).match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)||[]).length;
const paragraphs=t=>String(t).trim()?String(t).trim().split(/\n\s*\n/).filter(Boolean).length:0;
function initial(){return {version:1,focus:'both',completed:{},work:{},drafts:{},errors:[],diagnostic:null,timer:null,started:localDate()};}
function draft(){return {text:'',plan:['','',''],versions:[],checks:{},evidence:'',revisionNote:'',help:false};}
function audit(text,task){const n=words(text),p=paragraphs(text),minimum=task===1?150:250,notes=[];
 if(n<minimum)notes.push({title:'Jumlah kata belum mencapai minimum',body:`Perkiraan ${n} kata. Task ${task} meminta sedikitnya ${minimum} kata. Tambahkan informasi atau penjelasan yang relevan.`,type:'warn'});
 else notes.push({title:'Minimum kata sudah terlewati',body:'Ini pemeriksaan panjang saja. Kelengkapan jawaban, ketepatan fakta, dan mutu bahasa tetap perlu kamu baca.',type:'ok'});
 if(p===1&&n>60)notes.push({title:'Tulisan masih satu blok',body:'Periksa apakah informasi atau alasan yang berbeda perlu dikelompokkan dalam paragraf. Jumlah paragraf sendiri bukan penentu band.',type:'warn'});
 if(/^\s*(?:[-*•]|\d+[.)])\s/m.test(text))notes.push({title:'Ada bentuk daftar',body:'Jawaban akhir IELTS perlu berupa tulisan yang saling terhubung. Periksa baris yang masih berupa butir atau catatan.',type:'warn'});
 if(task===1&&/\b(?:I think|I believe|in my opinion)\b/i.test(text))notes.push({title:'Periksa pendapat pribadi',body:'Task 1 meminta laporan isi gambar. Pastikan kalimat pendapat tidak menggantikan informasi yang diminta.',type:'warn'});
 if(n>0)notes.push({title:'Baca kembali isi dan bahasanya',body:'Pemeriksaan ini tidak menentukan ketepatan data, kekuatan argumen, grammar, atau band IELTS. Gunakan empat bidang pemeriksaan di bawah.',type:'info'});
 return {words:n,paragraphs:p,minimum,notes};
}
function nextDue(previous,perfect,today=localDate()){
 let level=perfect?Math.min((previous?.level||0)+1,4):0;
 if(previous?.date===today)return {date:today,level:previous.level||0,due:previous.due};
 return {date:today,level,due:addDays(today,perfect?[1,3,7,14][level-1]:1)};
}
function remaining(timer,now=Date.now()){if(!timer)return 0;return Math.max(0,timer.running?Math.ceil((timer.end-now)/1000):timer.remaining);}
function recommend(state,content,today=localDate()){
 const inFocus=l=>state.focus==='both'||l.task==='dasar'||l.task===state.focus;
 const due=content.lessons.filter(l=>inFocus(l)&&state.completed[l.id]?.due<=today);
 if(due.length)return {lesson:due[0],why:'Sudah waktunya mengulang. Coba ingat dan tulis lagi sebelum membuka contoh.'};
 const wrong=new Set(state.diagnostic?.wrongTags||[]);
 const weak=content.lessons.find(l=>inFocus(l)&&!state.completed[l.id]&&l.qs.some(q=>wrong.has(q.tag)));
 if(weak)return {lesson:weak,why:'Disarankan dari bagian yang perlu diperbaiki pada cek awal.'};
 const ordered=content.lessons.filter(inFocus);const next=ordered.find(l=>!state.completed[l.id]);
 return next?{lesson:next,why:'Langkah berikutnya dari jalur belajar. Semua pelajaran tetap bisa kamu buka.'}:{lesson:ordered[0],why:'Semua pelajaran sudah dicoba. Latih soal baru dan periksa apakah perbaikannya bertahan.'};
}
function validDate(s){if(typeof s!=='string'||!/^20\d\d-\d\d-\d\d$/.test(s))return false;const[y,m,d]=s.split('-').map(Number);return localDate(new Date(y,m-1,d,12))===s;}
const text=(v,max=20000)=>typeof v==='string'?v.slice(0,max):'';
function validate(raw,content){
 if(!raw||raw.version!==1||typeof raw!=='object'||Array.isArray(raw))throw Error('Format cadangan tidak dikenali.');
 const s=initial(),ids=new Set(content.lessons.map(l=>l.id)),taskIds=new Set(content.tasks.map(t=>t.id)),tags=new Set(Object.keys(content.tags));
 if(['both','task1','task2'].includes(raw.focus))s.focus=raw.focus;
 if(validDate(raw.started))s.started=raw.started;
 for(const[id,v]of Object.entries(raw.completed||{}))if(ids.has(id)&&v&&validDate(v.date)&&validDate(v.due)&&Number.isInteger(v.level)&&v.level>=0&&v.level<=4&&Number.isInteger(v.score)&&v.score>=0&&v.score<=3){s.completed[id]={date:v.date,due:v.due,level:v.level,score:v.score,attempts:Math.max(1,Math.min(999,Number(v.attempts)||1))};}
 for(const[id,v]of Object.entries(raw.work||{}))if(ids.has(id)&&v&&typeof v==='object'){
  const first=Array.isArray(v.first)&&v.first.length===3&&v.first.every(x=>typeof x==='boolean')?[...v.first]:null;
  s.work[id]={text:text(v.text),answers:Array.isArray(v.answers)?v.answers.slice(0,3).map(n=>Number.isInteger(n)&&n>=0&&n<3?n:null):[],first,checked:v.checked===true&&!!first,done:v.done===true&&!!first};
 }
 for(const[id,v]of Object.entries(raw.drafts||{}))if(taskIds.has(id)&&v&&typeof v==='object'){
  const d=draft();d.text=text(v.text);d.plan=[0,1,2].map(i=>text(v.plan?.[i],3000));d.evidence=text(v.evidence,5000);d.revisionNote=text(v.revisionNote,3000);d.help=v.help===true;
  const allowed=content.criteria[content.tasks.find(t=>t.id===id).task===1?'task1':'task2'].map(c=>c[0]);for(const k of allowed)if(['yes','revise'].includes(v.checks?.[k]))d.checks[k]=v.checks[k];
  if(Array.isArray(v.versions))d.versions=v.versions.slice(-30).filter(x=>x&&typeof x.text==='string'&&typeof x.at==='string'&&!Number.isNaN(Date.parse(x.at))).map(x=>({text:text(x.text),at:x.at,note:text(x.note,3000),help:x.help===true}));s.drafts[id]=d;
 }
 if(Array.isArray(raw.errors))s.errors=raw.errors.slice(0,200).filter(e=>e&&tags.has(e.tag)&&validDate(e.due)&&validDate(e.date)).map((e,i)=>({id:'restored-'+i,tag:e.tag,before:text(e.before,2000),after:text(e.after,2000),rule:text(e.rule,2000),due:e.due,date:e.date,last:validDate(e.last)?e.last:undefined,level:Number.isInteger(e.level)&&e.level>=0&&e.level<=4?e.level:0}));
 if(raw.diagnostic&&Array.isArray(raw.diagnostic.wrongTags))s.diagnostic={score:Math.min(8,Math.max(0,Number(raw.diagnostic.score)||0)),wrongTags:raw.diagnostic.wrongTags.filter(t=>tags.has(t)),date:validDate(raw.diagnostic.date)?raw.diagnostic.date:localDate()};
 // Timer dari cadangan sengaja dipulihkan sebagai jeda; impor tidak memulai jam ujian.
 if(raw.timer&&[1200,2400,3600].includes(raw.timer.duration)&&Number.isFinite(raw.timer.remaining))s.timer={duration:raw.timer.duration,remaining:Math.max(0,Math.min(raw.timer.duration,raw.timer.remaining)),running:false,end:0,label:text(raw.timer.label,100),id:text(raw.timer.id,30)};
 return s;
}
const api={localDate,addDays,words,paragraphs,initial,draft,audit,nextDue,remaining,recommend,validate};
root.WritingCore=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
