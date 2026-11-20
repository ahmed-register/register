/* إضافات سجل التلاميذ: زر كتب المنهج */
(function(){
const BOOKS=[
 {cls:'الصف الرابع الابتدائي',name:'القراءة العربية',file:'books/reading4.pdf'},
 {cls:'الصف الرابع الابتدائي',name:'قواعد اللغة العربية',file:'books/grammar4.pdf'}
];
const CN='school-books-v1';
const isCached=async f=>{try{return !!(await (await caches.open(CN)).match(f))}catch(e){return false}};
async function openBook(f){
  try{const r=await (await caches.open(CN)).match(f);
    if(r){const b=await r.blob();window.open(URL.createObjectURL(new Blob([b],{type:'application/pdf'})),'_blank');return}}catch(e){}
  window.open(f,'_blank');
}
async function dlBook(f,btn){
  if(!navigator.onLine){alert('يلزم اتصال بالإنترنت للتنزيل');return}
  btn.textContent='⏳ جارٍ التنزيل…';btn.disabled=true;
  try{const r=await fetch(f);if(!r.ok)throw 0;await (await caches.open(CN)).put(f,r)}catch(e){alert('تعذر تنزيل الكتاب')}
  showBooks();
}
async function showBooks(){
  const st=await Promise.all(BOOKS.map(b=>isCached(b.file)));
  if(view!=='books')return;
  const A=document.querySelector('#app');
  A.innerHTML='<button class="btn" id="bk0">→ الرئيسية</button><div class="hd">📖 كتب المنهج</div><div class="note">اضغط «تنزيل للجهاز» مرة واحدة وأنت متصل بالإنترنت، بعدها يُفتح الكتاب في المدرسة بدون إنترنت.</div>'
  +BOOKS.map((b,i)=>`<div class="item" style="flex-direction:column;align-items:stretch"><div><b>${esc(b.name)}</b><div class="note">${esc(b.cls)}${st[i]?' · ✅ محفوظ على الجهاز':''}</div></div><div class="row" style="margin:8px 0 0"><button class="btn pri" data-o="${i}">📖 فتح</button><button class="btn" data-dl="${i}">${st[i]?'🔄 تحديث':'⬇️ تنزيل للجهاز'}</button>${st[i]?`<button class="btn" data-rm="${i}">🗑 إزالة</button>`:''}</div></div>`).join('');
  A.querySelector('#bk0').onclick=()=>go('home');
  A.querySelectorAll('[data-o]').forEach(x=>x.onclick=()=>openBook(BOOKS[+x.dataset.o].file));
  A.querySelectorAll('[data-dl]').forEach(x=>x.onclick=()=>dlBook(BOOKS[+x.dataset.dl].file,x));
  A.querySelectorAll('[data-rm]').forEach(x=>x.onclick=async()=>{try{await (await caches.open(CN)).delete(BOOKS[+x.dataset.rm].file)}catch(e){}showBooks()});
}
const orig=window.render;
window.render=function(){
  if(view==='books'){showBooks();return}
  orig();
  if(view==='home'){
    const g=[...document.querySelectorAll('#app .grid')].pop();
    if(g&&!g.querySelector('[data-bk]')){
      const b=document.createElement('button');b.className='tile t2';b.dataset.bk='1';
      b.innerHTML='<b>📖</b>كتب المنهج<small>تنزيل وفتح</small>';b.onclick=()=>go('books');g.appendChild(b);
    }
  }
};
if(view==='home')window.render();
const sc=document.createElement('script');sc.src='qgen.js';document.head.appendChild(sc);
})();
