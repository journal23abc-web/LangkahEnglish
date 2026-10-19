/* Alur kedua modul melalui konteks host. Fixture ini bukan browser grafis. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');const root=path.join(__dirname,'..'),storage=new Map();
function fixture(id,route='home'){
 const elements=new Map(),events={},windowEvents={},navigation=[];
 const element=name=>{if(!elements.has(name))elements.set(name,{innerHTML:'',textContent:'',hidden:false,focus(){},scrollIntoView(){},classList:{toggle(){}},remove(){}});return elements.get(name);};
 const context={id,route,storageKey:(id==='grammar'?'langkah-english-v1:':'langkah-writing-v1:')+'/LangkahEnglish/',navigate:p=>navigation.push(p)};
 const location={href:'about:srcdoc',hash:'',protocol:'about:',hostname:''};
 const document={title:'',getElementById:element,querySelectorAll:()=>[],querySelector:()=>({focus(){}}),addEventListener:(n,f)=>events[n]=f,createElement:()=>({click(){},remove(){}}),body:{appendChild(){}}};
 const window={location,LANGKAH_MODULE_CONTEXT:context,confirm:()=>true,scrollTo(){},addEventListener:(n,f)=>windowEvents[n]=f};
 const v={window,document,location,console,URL,Blob,AbortController,navigator:{},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout:()=>1,clearTimeout(){},setInterval(){}};
 vm.createContext(v);for(const p of (id==='grammar'?['js/content.js','js/core.js','js/app.js']:['js/content.js','js/tasks.js','js/core.js','js/app.js']))vm.runInContext(fs.readFileSync(path.join(root,'modules',id,p),'utf8'),v);
 function navigate(route){context.route=route;windowEvents.hashchange();return element('main').innerHTML;}
 function click(action,extra={}){events.click({target:{closest:()=>({disabled:false,dataset:{action,...extra}})}});}
 return {v,context,elements,element,navigate,click,navigation,events};
}
const initialG={version:1,settings:{goal:5,rate:.85,remote:false},completed:{f01:{firstScore:80,bestScore:80,date:'2026-10-19',attempts:1}},reviews:{f01:{box:0,due:'2026-10-20',last:'2026-10-19'}},words:{},missions:{},reviewXP:0,reviewRewardDays:{},records:[{date:'2026-10-19',kind:'lesson',key:'f01',questions:5}],active:null};
storage.set('langkah-english-v1:/LangkahEnglish/',JSON.stringify(initialG));
const grammar=fixture('grammar');assert.ok(grammar.element('main').innerHTML.includes('1 / 123'));assert.equal(grammar.v.window.LangkahCore.KEY,'langkah-english-v1:/LangkahEnglish/');
const GC=grammar.v.window.LANGKAH_CONTENT;const grammarRoutes=['home','path','review','words','missions','checks','diagnostic','listen','progress','about','reference',...GC.lessons.map(l=>'lesson/'+l.id),...GC.missions.map(m=>'mission/'+m.id),'practice/f01','check/p0'];
for(const route of grammarRoutes){const html=grammar.navigate(route);assert.ok(html.length>100,route);assert.ok(!html.includes('undefined'),route);}
grammar.navigate('home');grammar.click('start-diagnostic');assert.equal(grammar.navigation.at(-1),'diagnostic/start');assert.equal(grammar.v.location.hash,'');grammar.navigate('diagnostic/start');assert.ok(grammar.element('main').innerHTML.includes('latihan'));
console.log('OK Grammar: '+grammarRoutes.length+' halaman, navigasi host, dan progres lama pada kunci asli.');
const writing=fixture('writing','writer/p12');writing.events.input({target:{id:'writer',value:'This is a saved writing draft inside the combined application.',dataset:{id:'p12'}}});const saved=JSON.parse(storage.get('langkah-writing-v1:/LangkahEnglish/'));assert.ok(saved.drafts.p12.text.includes('saved writing draft'));assert.equal(JSON.parse(storage.get('langkah-english-v1:/LangkahEnglish/')).completed.f01.firstScore,80);
const WC=writing.v.window.WRITING_CONTENT;const writingRoutes=['home','learn','write','review','notebook','progress','sources','simulation','diagnostic',...WC.lessons.map(l=>'lesson/'+l.id),...WC.tasks.map(t=>'writer/'+t.id),'lesson/missing'];
for(const route of writingRoutes){const html=writing.navigate(route);assert.ok(html.length>100,route);assert.ok(!html.includes('undefined'),route);}
writing.navigate('simulation');writing.click('start-simulation',{test:'1'});assert.equal(writing.navigation.at(-1),'writer/b11');writing.navigate('writer/b11');assert.ok(!writing.element('main').innerHTML.includes('id="plan-0"'));assert.ok(JSON.parse(storage.get('langkah-writing-v1:/LangkahEnglish/')).timer.running);
const grammarAgain=fixture('grammar');assert.ok(grammarAgain.element('main').innerHTML.includes('1 / 123'));const writingAgain=fixture('writing','writer/p12');assert.ok(writingAgain.element('main').innerHTML.includes('saved writing draft'));assert.equal(writingAgain.v.location.href,'about:srcdoc');
console.log('OK Writing: '+writingRoutes.length+' halaman, draf terpisah, timer, dan perpindahan dua arah.');
// Penghubung menangani klik hash tanpa mengubah lokasi frame; Back ditangani host.
const parent={postMessage:m=>messages.push(m)},messages=[],docEvents={},winEvents={};let renders=0;
function anchor(href){const a={dataset:{},getAttribute:()=>href,set href(value){href=value;},get href(){return href;}};return a;}
const a=anchor('#lesson/g001');const ctx={id:'grammar',route:'home',hostURL:'https://example.test/LangkahEnglish/index.html'};
const browser={parent,window:null,document:{readyState:'complete',body:{},getElementById:()=>({innerHTML:'content',focus(){}}),querySelectorAll:()=>[a],addEventListener:(n,f)=>docEvents[n]=f},MutationObserver:class{observe(){}},Event:class{constructor(type){this.type=type;}},console};
browser.window={parent,LANGKAH_MODULE_CONTEXT:ctx,addEventListener:(n,f)=>winEvents[n]=f,dispatchEvent:()=>renders++};
vm.runInNewContext(fs.readFileSync(path.join(root,'js/module-bridge.js'),'utf8'),browser);
assert.equal(a.href,'https://example.test/LangkahEnglish/index.html#grammar/lesson/g001');assert.equal(messages[0].type,'ready');let prevented=false;
docEvents.click({target:{closest:()=>a},preventDefault(){prevented=true;},button:0});assert.equal(prevented,true);assert.equal(messages.at(-1).route,'lesson/g001');assert.equal(ctx.route,'home');
winEvents.message({source:{},data:{channel:'langkah-host-v1',module:'grammar',type:'route',route:'lesson/f01'}});assert.equal(renders,0);
winEvents.message({source:parent,data:{channel:'langkah-host-v1',module:'grammar',type:'route',route:'lesson/f01'}});assert.equal(ctx.route,'lesson/f01');assert.equal(renders,1);
prevented=false;docEvents.click({target:{closest:()=>a},preventDefault(){prevented=true;},ctrlKey:true,button:0});assert.equal(prevented,false);
console.log('OK penghubung: tautan utama, buka tab baru, perintah host, dan pesan asing ditolak.');
