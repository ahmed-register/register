/* إضافة «تصحيح الأوراق بالكاميرا» لسجل التلاميذ — تُضاف قبل </body> */
(function(){
const SL=[['a|0','ف1 امتحان 1'],['a|1','ف1 امتحان 2'],['a|2','ف1 امتحان 3'],['mid|0','نصف السنة'],['b|0','ف2 امتحان 1'],['b|1','ف2 امتحان 2'],['b|2','ف2 امتحان 3']];
const R0=()=>({m:'list',n:'',sub:'',sl:'a|0',t:'',qi:[],ai:[],ex:null,st:null,mk:{},nt:{},msg:''});
let X=R0();
const subs=c=>isUpper(c)?(S.mks[c.id]=S.mks[c.id]||[]):(S.evs[c.id]=S.evs[c.id]||[]);
const mx=e=>e.qs.reduce((a,q)=>a+q.parts.reduce((x,p)=>x+p.max,0),0);
const tot=()=>Object.values(X.mk).reduce((a,b)=>a+(+b||0),0);
const say=t=>{X.msg=t;const e=$('#xmsg');if(e)e.textContent=t||''};
const pick=()=>new Promise(r=>{const i=document.createElement('input');i.type='file';i.accept='image/*';i.capture='environment';i.onchange=()=>r(i.files[0]);i.click()});
const shrink=f=>new Promise(r=>{const i=new Image();i.onload=()=>{const k=Math.min(1,1400/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);c.toBlob(r,'image/jpeg',.85)};i.src=URL.createObjectURL(f)});
const b64=b=>new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result.split(',')[1]);f.readAsDataURL(b)});
async function ai(p,bs){
  const k=localStorage.getItem('ai_key');if(!k)throw new Error('أدخل مفتاح API من الإعدادات');
  const c=[];for(const b of bs)c.push({type:'image',source:{type:'base64',media_type:'image/jpeg',data:await b64(b)}});c.push({type:'text',text:p});
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':k,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:localStorage.getItem('ai_model')||'claude-sonnet-5-5',max_tokens:3000,messages:[{role:'user',content:c}]})});
  const d=await r.json();if(!r.ok)throw new Error((d.error&&d.error.message)||r.status);
  const m=d.content.map(x=>x.text||'').join('').match(/\{[\s\S]*\}/);if(!m)throw new Error('رد غير مفهوم');return JSON.parse(m[0]);
}
function parse(t){const qs=[];t.split('\n').forEach(l=>{const p=l.split('|').map(x=>x.trim());if(p.length<3)return;const n=parseInt(p[0]);if(!n)return;(qs[n-1]=qs[n-1]||{parts:[]}).parts.push({l:p[1],max:parseFloat(p[2])||0,key:p[3]||''})});return qs.filter(Boolean)}

async function extract(){
  if(!X.qi.length){say('صوّر ورقة الأسئلة أولاً');return}
  say('⏳ جارٍ قراءة الأسئلة والأجوبة...');
  try{
    const r=await ai(`أول ${X.qi.length} صور هي ورقة أسئلة امتحان لتلاميذ ابتدائيين${X.ai.length?`، والصور التالية (${X.ai.length}) هي ورقة الإجابات النموذجية`:' ولا توجد ورقة إجابات، فاكتب أنت إجابة نموذجية لكل فرع'}. استخرج كل سؤال وفروعه (أ، ب...) مع درجة كل فرع وإجابته النموذجية. إن لم تُذكر الدرجات فوزّعها بحيث يكون المجموع 100. أعد JSON فقط: {"qs":[{"parts":[{"l":"أ","max":2,"key":"الإجابة"}]}]} واترك l فارغاً إن لم توجد فروع.`,[...X.qi,...X.ai]);
    X.t=(r.qs||[]).map((q,i)=>q.parts.map(p=>[i+1,p.l||'',p.max,String(p.key||'').replace(/[\n|]/g,' ')].join('|')).join('\n')).join('\n');
    X.msg='✅ راجع الأسئلة أدناه وعدّل ما يلزم ثم احفظ';XR();
  }catch(e){say('تعذّر: '+e.message)}
}
async function scan(s){
  const f=await pick();if(!f)return;say('⏳ جارٍ التعرف على الاسم...');
  try{
    const L=s.students,r=await ai(`في الصورة اسم تلميذ مكتوب. طابقه مع القائمة واختر الأقرب:\n${L.map((t,i)=>i+': '+t.name).join('\n')}\nأعد JSON فقط: {"index":رقم_أو_-1}`,[await shrink(f)]);
    const i=Number(r.index);
    if(L[i]){X.st=L[i].id;X.mk={};X.nt={};X.msg='✅ '+L[i].name;XR()}else say('لم أتعرف على الاسم، اخترْه يدوياً');
  }catch(e){say('تعذّر: '+e.message)}
}
async function gradeQ(i){
  const q=X.ex.qs[i],f=await pick();if(!f)return;say(`⏳ جارٍ تصحيح السؤال ${i+1}...`);
  try{
    const r=await ai(`أنت معلم مصحّح لتلاميذ ابتدائيين. الصورة فيها إجابة تلميذ عن السؤال ${i+1}. الفروع ودرجاتها وإجاباتها النموذجية:\n${q.parts.map((p,j)=>`${j}) فرع ${p.l||'-'} | الدرجة العظمى ${p.max} | الإجابة: ${p.key||'قدّر صحتها'}`).join('\n')}\nصحّح كل فرع وامنح درجة من 0 إلى عظماه (يجوز نصف درجة). أعد JSON فقط: {"parts":[{"i":0,"mark":0,"note":"ملاحظة قصيرة"}]}`,[await shrink(f)]);
    (r.parts||[]).forEach(p=>{const m=q.parts[p.i];if(m){X.mk[i+'-'+p.i]=Math.max(0,Math.min(m.max,Number(p.mark)||0));X.nt[i+'-'+p.i]=p.note||''}});
    X.msg=`✅ تم تصحيح السؤال ${i+1}`;XR();
  }catch(e){say('تعذّر: '+e.message)}
}
function finish(c){
  const ex=X.ex,t=X.st,m0=mx(ex),p=m0?Math.round(tot()/m0*200)/2:0;let out;
  if(isUpper(c)){S.mk[t]=S.mk[t]||{};const m=S.mk[t][ex.sub]=S.mk[t][ex.sub]||{};const [k,j]=ex.sl.split('|');
    if(k==='mid')m.mid=String(p);else{m[k]=m[k]||['','',''];m[k][+j]=String(p)}out=p+' / 100'}
  else{out=LV[kOf(p)-1];S.ev[t]=S.ev[t]||{};S.ev[t][ex.sub]=out}
  const nm=(sec().students.find(x=>x.id===t)||{}).name;
  save();X.st=null;X.mk={};X.nt={};X.msg='💾 سُجّل لـ '+nm+': '+out+' — صوّر اسم التلميذ التالي';XR();
}

function XR(){
  const c=cls(),s=sec(),up=isUpper(c),sb=subs(c),L=(S.xm=S.xm||[]).filter(e=>e.cid===c.id);
  if(X.st&&!s.students.some(t=>t.id===X.st))X.st=null;
  const st=s.students.find(t=>t.id===X.st);
  let h=`<button class="btn" id="xb">→ الرئيسية</button><div class="hd">📷 تصحيح الأوراق</div>`+secChips(c,s)+`<div class="note" id="xmsg">${esc(X.msg||'')}</div>`;
  if(!localStorage.getItem('ai_key'))h+=`<div class="item">⚙️ أدخل مفتاح Anthropic API من «الإعدادات» أولاً.</div>`;
  if(!sb.length)h+=`<div class="item">أضف مادة أولاً (${up?'من «سجل التلاميذ»':'من «⭐ التقييمات»'}).</div>`;
  if(X.m==='new'){
    h+=`<div class="item" style="flex-direction:column;align-items:stretch;gap:8px"><input id="xn" placeholder="اسم الامتحان" value="${esc(X.n)}">
    <select id="xsub"><option value="">— اختر المادة —</option>${sb.map(b=>`<option value="${b.id}" ${X.sub===b.id?'selected':''}>${esc(b.name)}</option>`).join('')}</select>
    ${up?`<select id="xsl">${SL.map(([k,n])=>`<option value="${k}" ${X.sl===k?'selected':''}>${n}</option>`).join('')}</select>`:''}
    <button class="btn" id="xq">📷 صوّر ورقة الأسئلة (${X.qi.length})</button><button class="btn" id="xa">📷 صوّر ورقة الأجوبة (${X.ai.length})</button>
    <button class="btn pri" id="xex">🔍 استخراج الأسئلة والأجوبة</button>
    <textarea id="xt" rows="9" placeholder="السؤال|الفرع|الدرجة|الإجابة النموذجية">${esc(X.t)}</textarea>
    <div class="row"><button class="btn pri" id="xsv">💾 حفظ الامتحان</button><button class="btn" id="xcn">إلغاء</button></div></div>`;
  }else if(X.m==='grade'&&X.ex){
    const ex=X.ex;
    h+=`<div class="item" style="flex-direction:column;align-items:stretch;gap:8px"><b>${esc(ex.name)}</b><div class="note">${esc((sb.find(b=>b.id===ex.sub)||{}).name||'')}${up?' — '+SL.find(x=>x[0]===ex.sl)[1]:''}</div>
    <div><b>التلميذ:</b> ${st?esc(st.name):'—'}</div><button class="btn pri" id="xsc">📷 صوّر اسم التلميذ</button>
    <select id="xsel"><option value="">أو اختر يدوياً</option>${[...s.students].sort((a,b)=>a.name.localeCompare(b.name,'ar')).map(t=>`<option value="${t.id}" ${t.id===X.st?'selected':''}>${esc(t.name)}</option>`).join('')}</select></div>`;
    if(st){
      ex.qs.forEach((q,i)=>{const sub=q.parts.reduce((a,p,j)=>a+(+X.mk[i+'-'+j]||0),0),m=q.parts.reduce((a,p)=>a+p.max,0);
        h+=`<div class="item" style="flex-direction:column;align-items:stretch"><b>السؤال ${i+1} <span class="note">(${sub} / ${m})</span></b><button class="btn pri" data-xq="${i}">📷 صوّر السؤال ${i+1} وصحّحه</button>
        ${q.parts.map((p,j)=>`<div class="row" style="justify-content:space-between"><span>${p.l?'فرع '+esc(p.l):'الإجابة'} <span class="note">/ ${p.max}</span><div class="note">${esc(X.nt[i+'-'+j]||'')}</div></span><input class="xk" type="number" step="0.5" min="0" max="${p.max}" data-k="${i}-${j}" value="${X.mk[i+'-'+j]??''}" style="width:80px;text-align:center"></div>`).join('')}</div>`});
      const pc=mx(ex)?Math.round(tot()/mx(ex)*200)/2:0;
      h+=`<div class="item" style="flex-direction:column;align-items:stretch"><div>المجموع: <b style="font-size:22px">${tot()} / ${mx(ex)}</b> <span class="note">${up?'= '+pc+' من 100':'= '+LV[kOf(pc)-1]}</span></div><button class="btn pri" id="xfin">💾 حفظ الدرجة في السجل</button></div>`;
    }
    h+=`<button class="btn" id="xl">← قائمة الامتحانات</button>`;
  }else{
    h+=`<button class="btn pri" id="xnew" style="width:100%;margin:8px 0">＋ امتحان جديد (بصور الأسئلة والأجوبة)</button>`+
    (L.map(e=>`<div class="item"><span><b>${esc(e.name)}</b><div class="note">${esc((sb.find(b=>b.id===e.sub)||{}).name||'—')}${up?' — '+(SL.find(x=>x[0]===e.sl)||[,''])[1]:''} · ${e.qs.length} أسئلة / ${mx(e)} درجة</div></span><span><button class="btn pri" data-xg="${e.id}">تصحيح</button> <button class="x" data-xd="${e.id}">✕</button></span></div>`).join('')||'<p class="note">لا توجد امتحانات لهذا الصف بعد.</p>');
  }
  $('#app').innerHTML=h;
  const on=(i,f)=>{const e=$(i);if(e)e.onclick=f};
  on('#xb',()=>go('home'));
  const pc=$('#pc');if(pc)pc.onchange=()=>{S.cur.c=pc.value;S.cur.s=cls().sections[0].id;X.st=null;X.m='list';save();XR()};
  document.querySelectorAll('[data-sc]').forEach(b=>b.onclick=()=>{S.cur.s=b.dataset.sc;X.st=null;save();XR()});
  on('#xnew',()=>{X=R0();X.m='new';XR()});
  on('#xcn',()=>{X=R0();XR()});
  on('#xl',()=>{X=R0();XR()});
  const set=(i,k)=>{const e=$(i);if(e)e.oninput=e.onchange=()=>X[k]=e.value;};
  set('#xn','n');set('#xsub','sub');set('#xsl','sl');set('#xt','t');
  on('#xq',async()=>{const f=await pick();if(f){X.qi.push(await shrink(f));XR()}});
  on('#xa',async()=>{const f=await pick();if(f){X.ai.push(await shrink(f));XR()}});
  on('#xex',extract);
  on('#xsv',()=>{const qs=parse(X.t);if(!X.n.trim()||!X.sub||!qs.length){say('أكمل الاسم والمادة وتأكد من وجود أسئلة');return}
    S.xm.push({id:'x'+uid(),cid:c.id,name:X.n.trim(),sub:X.sub,sl:X.sl,qs});save();X=R0();X.msg='✅ تم حفظ الامتحان';XR()});
  document.querySelectorAll('[data-xg]').forEach(b=>b.onclick=()=>{const e=S.xm.find(x=>x.id===b.dataset.xg);X=R0();X.m='grade';X.ex=e;XR()});
  document.querySelectorAll('[data-xd]').forEach(b=>b.onclick=()=>{if(confirm('حذف هذا الامتحان؟')){S.xm=S.xm.filter(x=>x.id!==b.dataset.xd);save();XR()}});
  on('#xsc',()=>scan(s));
  const se=$('#xsel');if(se)se.onchange=()=>{X.st=se.value||null;X.mk={};X.nt={};X.msg='';XR()};
  document.querySelectorAll('[data-xq]').forEach(b=>b.onclick=()=>gradeQ(+b.dataset.xq));
  document.querySelectorAll('input.xk').forEach(i=>i.onchange=()=>{const [q,p]=i.dataset.k.split('-'),m=X.ex.qs[q].parts[p].max;X.mk[i.dataset.k]=Math.max(0,Math.min(m,parseFloat(i.value)||0));XR()});
  on('#xfin',()=>finish(c));
}

const R=render;
render=function(){
  if(view==='exm'){XR();return}
  R();
  if(view==='home'){const g=document.querySelector('[data-v="gr"]');if(g){const b=document.createElement('button');b.className='tile t6';b.innerHTML='<b>📷</b>تصحيح الأوراق<small>بالكاميرا والذكاء الاصطناعي</small>';b.onclick=()=>go('exm');g.after(b)}}
  if(view==='set'){const o=$('#out');if(o){const l=document.createElement('div');l.innerHTML='<label class="note">مفتاح Anthropic API للتصحيح بالكاميرا (يُحفظ في هذا الجهاز فقط)</label><input id="ak" type="password" dir="ltr" placeholder="sk-ant-..." style="margin-bottom:10px">';o.before(l);const i=$('#ak');i.value=localStorage.getItem('ai_key')||'';i.oninput=()=>{try{localStorage.setItem('ai_key',i.value.trim())}catch(e){}}}}
};
})();
