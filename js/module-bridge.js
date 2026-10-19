/* Navigasi modul selalu melewati satu alamat pada jendela utama. */
(function(){
'use strict';const context=window.LANGKAH_MODULE_CONTEXT;if(!context||window.parent===window)return;
const valid=r=>typeof r==='string'&&r.length<=180&&/^[a-zA-Z0-9_/-]*$/.test(r)&&!r.includes('..');
const send=(type,extra={})=>parent.postMessage({channel:'langkah-module-v1',module:context.id,type,...extra},'*');
context.navigate=route=>{if(valid(route))send('navigate',{route:route||'home'});};
window.addEventListener('message',e=>{const d=e.data;if(e.source!==parent||!d||d.channel!=='langkah-host-v1'||d.module!==context.id)return;if(d.type==='route'&&valid(d.route)){context.route=d.route||'home';window.dispatchEvent(new Event('hashchange'));}if(d.type==='focus')document.getElementById('main')?.focus({preventScroll:true});});
function rewriteLinks(){if(!context.hostURL)return;document.querySelectorAll('a[href^="#"]').forEach(a=>{const href=a.getAttribute('href');if(href==='#main')return;const route=href.slice(1)||'home';if(valid(route)){a.dataset.langkahRoute=route;a.href=context.hostURL+'#'+context.id+'/'+route;}});}
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button>0)return;const href=a.getAttribute('href');if(href==='#main'){e.preventDefault();document.getElementById('main')?.focus();return;}const route=a.dataset.langkahRoute||(href?.startsWith('#')?href.slice(1)||'home':null);if(route&&valid(route)){e.preventDefault();context.navigate(route);}},true);
// Sebuah base URL membuat gambar dan skrip tetap milik modulnya. Hash diproses
// di atas agar tautan tidak membuka direktori modul di dalam frame.
function ready(){const content=document.getElementById('main');if(!content||!content.innerHTML.trim()){send('error',{message:'Halaman modul belum berhasil dibuka.'});return;}rewriteLinks();if(typeof MutationObserver!=='undefined')new MutationObserver(rewriteLinks).observe(document.body,{childList:true,subtree:true});send('ready');}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
window.addEventListener('pagehide',()=>{window.speechSynthesis?.cancel();});
})();
