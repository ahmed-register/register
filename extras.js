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

/* ===== ربط زر الدرجات بسجل التلاميذ + عمود الامتحان النهائي + الانتقال التلقائي ===== */
(function(){
const SLOT={'تشرين الأول':['a',0],'تشرين الثاني':['a',1],'كانون الأول':['a',2],'كانون الثاني':['mid'],'شباط':['b',0],'آذار':['b',1],'نيسان':['b',2],'أيار':['fin']};
const monthOf=(k,j)=>Object.keys(SLOT).find(m=>{const s=SLOT[m];return s[0]===k&&(s[1]||0)===+j});
function subOf(c,name,create){S.mks[c.id]=S.mks[c.id]||[];let x=S.mks[c.id].find(y=>y.name===name);if(!x&&create){x={id:'m'+uid(),name};S.mks[c.id].push(x)}return x}
function getMk(c,tid,name,mon){const sb=subOf(c,name,false);if(!sb)return '';const m=((S.mk[tid]||{})[sb.id])||{},sl=SLOT[mon];
  if(sl[0]==='mid')return m.mid==null?'':m.mid;if(sl[0]==='fin')return (m.fin||[''])[0]||'';return ((m[sl[0]]||[])[sl[1]])||''}
function putMk(c,tid,name,mon,val){const sl=SLOT[mon];if(!sl)return;const sb=subOf(c,name,true);
  S.mk[tid]=S.mk[tid]||{};const m=S.mk[tid][sb.id]=S.mk[tid][sb.id]||{};const v=(val==null?'':val);
  if(sl[0]==='mid'){if(v==='')delete m.mid;else m.mid=v}
  else if(sl[0]==='fin'){m.fin=m.fin||[''];m.fin[0]=v}
  else{m[sl[0]]=m[sl[0]]||['','',''];m[sl[0]][sl[1]]=v}}
function syncAll(){let ch=false;
  S.classes.forEach(c=>{if(!isUpper(c))return;c.sections.forEach(s=>{const g=S.gr[s.id]||{};
    Object.keys(g).forEach(subj=>Object.keys(g[subj]||{}).forEach(mon=>{if(!SLOT[mon])return;const o=g[subj][mon]||{};
      Object.keys(o).forEach(tid=>{const v=o[tid];if(v===undefined||v==='')return;const cur=getMk(c,tid,subj,mon);if(cur===''){putMk(c,tid,subj,mon,v);ch=true}})}))})});
  return ch}
window.SchoolMarks={putMk,getMk,syncAll,SLOT};

window.calc=function(m){m=m||{};const av=l=>{l=(l||[]).map(num).filter(x=>x!=null);return l.length?l.reduce((x,y)=>x+y,0)/l.length:null};
  const a1=av(m.a),a2=av(m.b),mid=num(m.mid),fin=num((m.fin||[])[0]),yr=(a1!=null&&a2!=null&&mid!=null)?(a1+mid+a2)/3:null;
  const base=yr==null?null:(fin!=null?(yr+fin)/2:yr);
  return {a1,a2,yr,fin,res:base==null?'':(base>=50?'ناجح':'راسب')}};

window.nextMk=function(i){
  const col=i.dataset.k.split('|').slice(1).join('|'),cols=['a|0','a|1','a|2','mid|0','b|0','b|1','b|2','fin|0'];
  let r=i.closest('tr').nextElementSibling;while(r&&r.style.display==='none')r=r.nextElementSibling;
  let n=r&&r.querySelector('input.mk[data-k$="|'+col+'"]'),wrapped=false;
  if(!n){const ci=cols.indexOf(col);if(ci>=0&&ci<cols.length-1){const f=[...i.closest('table').querySelectorAll('tr[data-sid]')].find(t=>t.style.display!=='none');n=f&&f.querySelector('input.mk[data-k$="|'+cols[ci+1]+'"]');wrapped=true}}
  if(!n){i.blur();return}
  const box=n.closest('.tbl'),tr=n.closest('tr');
  if(wrapped){n.scrollIntoView({block:'center',inline:'center'})}
  else if(box&&tr){box.scrollTop=Math.max(0,tr.offsetTop-box.clientHeight/2)}
  n.focus({preventScroll:true});try{n.select()}catch(e){}
};

window.markBlock=function(c,s){
  const list=[...s.students].sort((x,y)=>x.name.localeCompare(y.name,'ar'));
  const subs=(S.mks[c.id]=S.mks[c.id]||[]);const sub=subs.find(x=>x.id===msub)||subs[0];
  if(!sub)return '<p class="note">اكتب اسم المادة (مثل: القراءة أو الرياضيات) في المربع بجانب «إضافة الأسماء» ثم اضغط «＋ مادة»، فيظهر لها جدول درجات خاص بها. وتظهر هنا تلقائياً الدرجات التي تدخلها في زر الدرجات 📝 بنفس اسم المادة.</p>';
  msub=sub.id;
  const inp=(t,k,j,v)=>{const n=num(v);return `<td class="${n!=null&&n<50?'low':''}"><input class="mk" type="number" inputmode="decimal" enterkeyhint="next" min="0" max="100" step="any" data-k="${t.id}|${k}|${j}" data-m="${sub.id}" value="${v==null?'':esc(v)}"></td>`};
  const cc=(k,v,low)=>`<td class="c ${low?'low':''}" data-f="${k}">${v}</td>`;
  const hd=(c1,a,b)=>`<th class="${c1}">${a}<br>${b}</th>`;
  return `<div class="row">${subs.map(x=>`<button class="chip ${x.id===sub.id?'on':''}" data-ms="${x.id}">${esc(x.name)}</button>`).join('')}<button class="btn" data-dm="${sub.id}">🗑 حذف المادة</button></div>
    <input id="sq" placeholder="ابحث عن تلميذ..." style="margin-top:8px">
    <div class="note" style="margin:6px 0">الدرجات من 100 والخلية الحمراء = أقل من 50. الأعمدة مرتبطة بزر الدرجات 📝: تشرين الأول = ف1 امتحان 1، تشرين الثاني = ف1 امتحان 2، كانون الأول = ف1 امتحان 3، كانون الثاني = نصف السنة، شباط وآذار ونيسان = ف2 امتحان 1 و2 و3، أيار = الامتحان النهائي. عند كتابة رقمين (أو 100) ينتقل المؤشر للتلميذ التالي والأعمدة ثابتة، وللأرقام الأخرى اضغط «التالي».</div>
    <div class="row"><button class="btn" id="an">الانتقال التلقائي بين التلاميذ: ${S.autoNext===false?'متوقف':'مفعّل'}</button></div>
    <div class="tbl"><table><tr><th class="sn">م</th><th class="nm2">التلميذ</th>${[1,2,3].map(i=>hd('t1','ف1','امتحان '+i)).join('')}${hd('t1','معدل','الفصل 1')}${hd('t3','امتحان','نصف السنة')}${[1,2,3].map(i=>hd('t2','ف2','امتحان '+i)).join('')}${hd('t2','معدل','الفصل 2')}${hd('t3','السعي','السنوي')}${hd('t3','الامتحان','النهائي')}${hd('t3','النتيجة','النهائية')}</tr>
    ${list.map((t,i)=>{const m=((S.mk[t.id]||{})[sub.id])||{},r=calc(m);return `<tr data-n="${esc(t.name)}" data-sid="${t.id}"><td class="sn">${i+1}</td><td class="nm2"><button class="x" data-d="${t.id}" style="width:26px;height:26px;color:#ff6b6b">✕</button> <button class="x" data-mv="${t.id}" title="نقل لشعبة أخرى" style="width:26px;height:26px">⇄</button> ${esc(t.name)}</td>${[0,1,2].map(j=>inp(t,'a',j,(m.a||[])[j])).join('')}${cc('a1',fmt(r.a1),r.a1!=null&&r.a1<50)}${inp(t,'mid',0,m.mid)}${[0,1,2].map(j=>inp(t,'b',j,(m.b||[])[j])).join('')}${cc('a2',fmt(r.a2),r.a2!=null&&r.a2<50)}${cc('yr',fmt(r.yr),r.yr!=null&&r.yr<50)}${inp(t,'fin',0,(m.fin||[])[0])}${cc('res',r.res,r.res==='راسب')}</tr>`}).join('')}</table></div>
    ${list.length?'':'<p class="note">أضف التلاميذ أولًا من الخانات أعلاه.</p>'}`;
};

/* من السجل إلى زر الدرجات */
document.addEventListener('input',e=>{
  const i=e.target;if(!i||!i.classList||!i.classList.contains('mk')||!i.dataset||!i.dataset.k)return;
  setTimeout(()=>{try{const [tid,k,j]=i.dataset.k.split('|'),c=cls(),s=sec();
    const sb=(S.mks[c.id]||[]).find(x=>x.id===i.dataset.m);if(!sb)return;const mon=monthOf(k,j);if(!mon)return;
    S.gr[s.id]=S.gr[s.id]||{};const g=S.gr[s.id][sb.name]=S.gr[s.id][sb.name]||{};const o=g[mon]=g[mon]||{};
    if(i.value==='')delete o[tid];else o[tid]=i.value;save()}catch(err){}},0);
},true);

const prev=window.render;
window.render=function(){
  if(['stu','gr','weak','res'].includes(view)){try{if(syncAll())save()}catch(e){}}
  prev();
  if(view!=='gr')return;
  const A=document.querySelector('#app'),c=cls(),s=sec();
  const names=[...new Set([...ALL,...(S.mks[c.id]||[]).map(x=>x.name)])];
  const sel=A.querySelector('#gs');if(sel)sel.innerHTML=names.map(o=>`<option ${o===gs?'selected':''}>${esc(o)}</option>`).join('');
  const nt=A.querySelector('.note');
  if(nt&&isUpper(c))nt.textContent+=' — الدرجات تظهر تلقائياً في سجل التلاميذ (تشرين الأول = ف1 امتحان 1 ... أيار = الامتحان النهائي).';
  const inputs=[...A.querySelectorAll('[data-g]')];
  inputs.forEach((i,idx)=>{
    i.onchange=null;i.setAttribute('enterkeyhint','next');
    const next=()=>{const n=inputs[idx+1];if(n){n.scrollIntoView({block:'center'});n.focus({preventScroll:true});try{n.select()}catch(e){}}else i.blur()};
    i.oninput=()=>{
      let v=i.value;const n=parseFloat(v);
      if(!isNaN(n)){if(n>100){v='100';i.value=v}if(n<0){v='0';i.value=v}}
      const tid=i.dataset.g;
      S.gr[s.id]=S.gr[s.id]||{};S.gr[s.id][gs]=S.gr[s.id][gs]||{};S.gr[s.id][gs][gm]=S.gr[s.id][gs][gm]||{};
      const o=S.gr[s.id][gs][gm];if(v==='')delete o[tid];else o[tid]=v;
      if(isUpper(c))putMk(c,tid,gs,gm,v);
      const arr=Object.values(S.gr[s.id][gs]).map(x=>x[tid]).filter(x=>x!==undefined&&x!=='');
      const avg=arr.length?(arr.reduce((x,y)=>x+ +y,0)/arr.length).toFixed(1):'—';
      const it=i.closest('.item'),nn=it&&it.querySelector('.note');if(nn)nn.textContent='المعدل: '+avg;
      save();
      if(S.autoNext!==false&&!isNaN(n)&&!v.includes('.')&&((v.length===2&&v!=='10')||v.length>=3))next();
    };
    i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();next()}};
  });
};
if(view==='home')window.render();
})();
