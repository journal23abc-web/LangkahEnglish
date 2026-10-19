const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');const root=path.join(__dirname,'..');
async function run(){
 const elements=new Map(),events={},listeners={},store=new Map(),frames=[],downloads=[];
 const element=id=>{if(!elements.has(id))elements.set(id,{id,innerHTML:'',textContent:'',hidden:false,value:'',children:[],classList:{toggle(){}},focus(){},remove(){this.removed=true;},appendChild(x){this.children.push(x);},click(){}});return elements.get(id);};
 const location={href:'https://example.test/LangkahEnglish/index.html',hash:'#home',protocol:'https:',hostname:'example.test'};
 const document={title:'',body:{classList:{add(){},remove(){}},appendChild(){}},head:{appendChild(s){queueMicrotask(()=>{try{const p=new URL(s.src).pathname.replace('/LangkahEnglish/','');vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx);s.onload();}catch(e){s.onerror();}});}},getElementById:element,querySelectorAll:()=>[],addEventListener:(k,f)=>events[k]=f,createElement(tag){if(tag==='iframe'){const frame={contentWindow:{messages:[],postMessage(m){this.messages.push(m);}},setAttribute(){},hidden:false};frames.push(frame);return frame;}if(tag==='script')return {remove(){}};return {click(){downloads.push(this.download);},remove(){}};}};
 const window={confirm:()=>true,scrollTo(){},addEventListener:(k,f)=>listeners[k]=f};
 const ctx={window,document,location,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},console,URL,Blob,navigator:{},setTimeout:()=>1,clearTimeout(){}};
 vm.createContext(ctx);for(const p of ['modules/registry.js','js/hub-core.js','js/hub.js'])vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx);
 const settle=()=>new Promise(resolve=>setImmediate(resolve));
 async function route(hash){location.hash='#'+hash;listeners.hashchange();await settle();await settle();}
 assert.ok(element('main').innerHTML.includes('Grammar'));assert.ok(element('main').innerHTML.includes('IELTS Writing'));
 await route('grammar/lesson/f01');assert.equal(frames.length,1);assert.ok(frames[0].srcdoc.includes('"route":"lesson/f01"'));assert.ok(frames[0].srcdoc.includes('langkah-english-v1:/LangkahEnglish/'));
 listeners.message({source:frames[0].contentWindow,data:{channel:'langkah-module-v1',module:'grammar',type:'ready'}});assert.equal(frames[0].hidden,false);
 await route('grammar/lesson/f02');assert.equal(frames.length,1);assert.equal(frames[0].contentWindow.messages.at(-1).route,'lesson/f02');
 await route('writing/writer/b11');assert.equal(frames.length,2);assert.ok(frames[1].srcdoc.includes('modules/writing/'));await route('settings');assert.ok(element('main').innerHTML.includes('Satu file untuk seluruh aplikasi'));
 const oldGrammar={version:1,settings:{goal:5,rate:.85,remote:false},completed:{},reviews:{},words:{},missions:{},reviewXP:0,reviewRewardDays:{},records:[],active:null};
 const oldWriting={version:1,focus:'both',completed:{},work:{},drafts:{p12:{text:'A draft restored through the combined backup page.',plan:['','',''],versions:[],checks:{}}},errors:[],diagnostic:null,started:'2026-10-19',timer:{duration:3600,remaining:900,running:true,end:123,label:'test',id:'test1'}};
 const packet={app:'langkah-english-hub',version:1,modules:{grammar:oldGrammar,writing:oldWriting}};
 events.change({target:{id:'backup-file',files:[{size:1000,text:async()=>JSON.stringify(packet)}]}});await settle();await settle();
 assert.ok(store.has('langkah-english-v1:/LangkahEnglish/'));const result=JSON.parse(store.get('langkah-writing-v1:/LangkahEnglish/'));assert.ok(result.drafts.p12.text.includes('combined backup'));assert.equal(result.timer.running,false);
 events.click({target:{closest:()=>({dataset:{action:'export-all'}})}});assert.ok(downloads.at(-1).startsWith('langkah-english-semua-modul-'));
 const before=store.get('langkah-writing-v1:/LangkahEnglish/');packet.modules.grammar={version:999};events.change({target:{id:'backup-file',files:[{size:1000,text:async()=>JSON.stringify(packet)}]}});await settle();await settle();assert.equal(store.get('langkah-writing-v1:/LangkahEnglish/'),before);
 console.log('OK host: beranda, pemuatan dua modul, rute yang sama, cadangan gabungan, ekspor, dan penolakan berkas salah.');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
