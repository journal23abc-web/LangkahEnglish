/* Mesin latihan dan progres, tanpa jaringan atau dependensi. */
(function (root) {
  'use strict';
  const DAY_STEPS = [1, 3, 7, 14, 30];
  const KEY = 'langkah-english-v1' + (typeof window!=='undefined'&&window.location ? ':'+new URL('.',window.location.href).pathname : '');
  function day(date = new Date()) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  }
  function plusDays(value, amount) {
    const [y,m,d] = value.split('-').map(Number);
    return day(new Date(y, m - 1, d + amount, 12));
  }
  function shuffle(items, seed) {
    const arr = [...items];
    let h = 2166136261;
    for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
    for (let i = arr.length - 1; i > 0; i--) {
      h = (Math.imul(h,1664525) + 1013904223) >>> 0;
      const j = h % (i + 1); [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
  }
  function clean(value) {
    return String(value).toLowerCase().replace(/[‘’`]/g,"'").replace(/[.,!?;:"()[\]{}]/g,'').replace(/\s+/g,' ').trim();
  }
  function variants(value) {
    let text = clean(value);
    const fixed = {"i'm":'i am',"you're":'you are',"we're":'we are',"they're":'they are',"i've":'i have',"you've":'you have',"we've":'we have',"they've":'they have',"isn't":'is not',"aren't":'are not',"wasn't":'was not',"weren't":'were not',"don't":'do not',"doesn't":'does not',"didn't":'did not',"haven't":'have not',"hasn't":'has not',"hadn't":'had not',"can't":'can not',cannot:'can not',"couldn't":'could not',"won't":'will not',"wouldn't":'would not',"shouldn't":'should not',"mustn't":'must not',"needn't":'need not',"let's":'let us'};
    text = text.replace(/\b[a-z]+(?:'[a-z]+)?\b/g, w => fixed[w] || (w.endsWith("'ll") ? w.slice(0,-3)+' will' : w));
    let results = [text];
    const ambiguous = [[/\b(he|she|it|that|there|who)'s\b/g, ['is','has']], [/\b(i|you|he|she|we|they)'d\b/g,['would','had']]];
    for (const [pattern, words] of ambiguous) {
      results = results.flatMap(s => words.map(w => s.replace(pattern,(_,p)=>p+' '+w)));
    }
    return [...new Set(results.map(clean))];
  }
  function equivalent(input, accepted) {
    const candidates = new Set(variants(input));
    return accepted.some(a => variants(a).some(v => candidates.has(v)));
  }
  function questions(lesson) {
    const [a,b,c] = lesson.examples;
    const opts = shuffle(lesson.examples.map(e => e.id),lesson.id+'meaning');
    return [
      {id:lesson.id+'-meaning',type:'choice',label:'Pahami arti',prompt:'Apa arti “'+a.en+'”?',options:opts,answers:[a.id],why:'“'+a.en+'” berarti “'+a.id+'”.'},
      {id:lesson.id+'-form',type:'choice',label:'Pilih pola',prompt:lesson.quiz.prompt,options:shuffle(lesson.quiz.options,lesson.id+'form'),answers:[lesson.quiz.options[lesson.quiz.answer]],why:lesson.quiz.why},
      {id:lesson.id+'-gap',type:'gap',label:'Lengkapi',prompt:lesson.gap.prompt,answers:lesson.gap.answers,why:lesson.gap.why},
      {id:lesson.id+'-order',type:'order',label:'Susun kalimat',prompt:'Susun kata untuk: “'+b.id+'”',tokens:shuffle(b.en.split(/\s+/).map((word,i)=>({word,i})),lesson.id+'order'),answers:[b.en],why:'Susunan kalimatnya: '+b.en},
      {id:lesson.id+'-write',type:'write',label:'Tulis dengan petunjuk',prompt:'Tulis dalam bahasa Inggris: “'+c.id+'”',bank:shuffle(c.en.split(/\s+/),lesson.id+'write').join(' · '),answers:[c.en],why:'Jika semua kata yang tersedia dipakai, kalimatnya: '+c.en}
    ];
  }
  function initialState() {
    return {version:1,settings:{goal:5,rate:0.85,remote:false},completed:{},reviews:{},words:{},missions:{},reviewXP:0,reviewRewardDays:{},records:[],active:null};
  }
  function dateValid(s) {
    if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    const [y,m,d]=s.split('-').map(Number); const v=new Date(y,m-1,d,12);
    return y>=2000 && y<=2200 && day(v)===s;
  }
  function validated(raw, content) {
    if (!raw || raw.version!==1 || typeof raw!=='object') throw Error('Versi cadangan tidak dikenali.');
    const lessonIds=new Set(content.lessons.map(l=>l.id)), wordIds=new Set(content.vocab.map(w=>w.id)), missionIds=new Set(content.missions.map(m=>m.id)), pathIds=new Set(content.paths.map(p=>p.id));
    const out=initialState();
    if (![5,10,15].includes(raw.settings?.goal) || ![0.65,0.85,1].includes(raw.settings?.rate) || typeof raw.settings?.remote!=='boolean') throw Error('Pengaturan cadangan tidak valid.');
    out.settings={goal:raw.settings.goal,rate:raw.settings.rate,remote:raw.settings.remote};
    if (!Number.isInteger(raw.reviewXP)||raw.reviewXP<0||raw.reviewXP>100000000||raw.reviewXP%8!==0||!raw.reviewRewardDays||typeof raw.reviewRewardDays!=='object'||Array.isArray(raw.reviewRewardDays)) throw Error('Poin pengulangan tidak valid.');
    out.reviewXP=raw.reviewXP;
    for(const [id,date] of Object.entries(raw.reviewRewardDays)){
      if(!lessonIds.has(id)||!dateValid(date))throw Error('Riwayat poin pengulangan tidak valid.');
      out.reviewRewardDays[id]=date;
    }
    if(Object.keys(out.reviewRewardDays).length*8>out.reviewXP)throw Error('Jumlah poin pengulangan tidak sesuai.');
    for (const key of ['completed','reviews','words','missions']) {
      if (!raw[key] || typeof raw[key]!=='object' || Array.isArray(raw[key])) throw Error('Data progres tidak valid.');
      for (const [id,item] of Object.entries(raw[key])) {
        const ids=key==='words'?wordIds:key==='missions'?missionIds:lessonIds;
        if (!ids.has(id) || !item || typeof item!=='object') throw Error('Ada ID materi yang tidak dikenal.');
        if (key==='completed') {
          if (![item.firstScore,item.bestScore].every(n=>Number.isInteger(n)&&n>=0&&n<=100&&n%20===0) || item.bestScore<item.firstScore || !dateValid(item.date) || !Number.isInteger(item.attempts)||item.attempts<1||item.attempts>100000) throw Error('Nilai pelajaran tidak valid.');
          out.completed[id]={firstScore:item.firstScore,bestScore:item.bestScore,date:item.date,attempts:item.attempts};
        } else if (key==='missions') {
          if (!dateValid(item.date)) throw Error('Tanggal misi tidak valid.');
          out.missions[id]={date:item.date};
        } else {
          if (!Number.isInteger(item.box)||item.box<0||item.box>5||!dateValid(item.due)||!dateValid(item.last)) throw Error('Jadwal pengulangan tidak valid.');
          out[key][id]={box:item.box,due:item.due,last:item.last};
        }
      }
    }
    for (const id of Object.keys(out.reviews)) if (!out.completed[id]) throw Error('Jadwal tanpa pelajaran selesai.');
    for (const id of Object.keys(out.completed)) if (!out.reviews[id]) throw Error('Pelajaran selesai tanpa jadwal.');
    if (!Array.isArray(raw.records) || raw.records.length>5000) throw Error('Riwayat terlalu besar.');
    for (const r of raw.records) {
      const ids=r?.kind==='lesson'||r?.kind==='review'||r?.kind==='listen'?lessonIds:r?.kind==='word'?wordIds:r?.kind==='mission'?missionIds:r?.kind==='check'?pathIds:new Set();
      if (!ids.has(r.key)||!dateValid(r.date)||!Number.isInteger(r.questions)||r.questions<1||r.questions>5) throw Error('Riwayat aktivitas tidak valid.');
      out.records.push({date:r.date,kind:r.kind,key:r.key,questions:r.questions});
    }
    if (raw.active!==null && raw.active!==undefined) {
      const a=raw.active;
      if (!lessonIds.has(a.lesson)||!Number.isInteger(a.index)||a.index<0||a.index>4||!Array.isArray(a.first)||a.first.length!==5||!a.first.every(x=>x===null||typeof x==='boolean')||!a.first.slice(0,a.index).every(x=>typeof x==='boolean')||!a.first.slice(a.index+1).every(x=>x===null)) throw Error('Sesi tersimpan tidak valid.');
      out.active={lesson:a.lesson,index:a.index,first:[...a.first]};
    }
    return out;
  }
  function record(state,kind,key,questionsCount, today=day()) {
    if(kind==='review'&&state.reviewRewardDays[key]!==today){state.reviewRewardDays[key]=today;state.reviewXP+=8;}
    state.records.push({date:today,kind,key,questions:questionsCount});
    if (state.records.length>5000) state.records.splice(0,state.records.length-5000);
  }
  function finishLesson(state,id,first,today=day()) {
    if (first.length!==5||!first.every(v=>typeof v==='boolean')) throw Error('Selesaikan lima latihan terlebih dahulu.');
    const score=first.filter(Boolean).length*20;
    const previous=state.completed[id];
    state.completed[id]=previous?{...previous,bestScore:Math.max(previous.bestScore,score),attempts:previous.attempts+1}:{firstScore:score,bestScore:score,date:today,attempts:1};
    if (!previous) state.reviews[id]={box:0,due:plusDays(today,score>=80?1:0),last:today};
    record(state,'lesson',id,5,today); state.active=null;
    return {score,isNew:!previous};
  }
  function schedule(previous,correct,today=day()) {
    const box=correct?Math.min((previous?.box||0)+1,5):0;
    return {box,due:plusDays(today,correct?DAY_STEPS[box-1]:1),last:today};
  }
  function xp(state) {
    return Object.keys(state.completed).length*30 + state.reviewXP + Object.keys(state.missions).length*10 + Object.keys(state.words).length*2;
  }
  function streak(state,today=day()) {
    const days=new Set(state.records.map(r=>r.date));
    let cursor=days.has(today)?today:plusDays(today,-1), count=0;
    while (days.has(cursor)) {count++;cursor=plusDays(cursor,-1);}
    return count;
  }
  function due(state,today=day()) {return Object.keys(state.reviews).filter(id=>state.reviews[id].due<=today);}
  function daily(state,today=day()) {return state.records.filter(r=>r.date===today).reduce((sum,r)=>sum+r.questions,0);}
  const api={KEY,DAY_STEPS,day,plusDays,shuffle,clean,variants,equivalent,questions,initialState,validated,record,finishLesson,schedule,xp,streak,due,daily};
  root.LangkahCore=api;
  if (typeof module!=='undefined' && module.exports) module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

