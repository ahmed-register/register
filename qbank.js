/* بنك أسئلة اللغة العربية — الصف الرابع الابتدائي (يُضاف بعد extras.js) */
(function(){
const BR=['القراءة','القواعد','المحفوظات','التعبير','الإملاء'];
const TY={mc:'اختيار من متعدد',tf:'صح أو خطأ',fill:'أكمل',open:'سؤال مفتوح'};
/* في الاختيار من متعدد: الإجابة الصحيحة أولًا ثم الخاطئة */
const SEED=[
['القواعد','mc','ما الاسم في جملة: يلعبُ الولدُ في الحديقة؟','الولد|يلعب|في'],
['القواعد','mc','ما الفعل في جملة: كتبَ الطالبُ الدرسَ؟','كتب|الطالب|الدرس'],
['القواعد','mc','نوع الكلمة «مدرسة»:','اسم|فعل|حرف'],
['القواعد','mc','نوع الكلمة «يكتب»:','فعل مضارع|فعل ماضٍ|فعل أمر'],
['القواعد','mc','نوع الكلمة «اكتب»:','فعل أمر|فعل ماضٍ|فعل مضارع'],
['القواعد','mc','نوع الكلمة «ذهبَ»:','فعل ماضٍ|فعل مضارع|اسم'],
['القواعد','mc','مثنى كلمة «كتاب»:','كتابان|كتابون|كتب'],
['القواعد','mc','جمع المذكر السالم لكلمة «معلّم»:','معلّمون|معلّمات|معالم'],
['القواعد','mc','جمع المؤنث السالم لكلمة «طالبة»:','طالبات|طلّاب|طالبون'],
['القواعد','tf','الفعل الماضي يدل على زمن مضى.','صح'],
['القواعد','tf','كلمة «ولد» فعل.','خطأ'],
['القواعد','tf','«في» حرف جر.','صح'],
['القواعد','fill','أكمل: المضارع من الفعل «ذهب» هو: ....','يذهب'],
['القواعد','fill','أكمل: مفرد كلمة «أقلام» هو: ....','قلم'],
['الإملاء','mc','الكلمة المكتوبة كتابة صحيحة:','مدرسة|مدرسه|مدرصة'],
['الإملاء','mc','الكلمة التي تنتهي بتاء مربوطة:','معلّمة|بنت|وقت'],
['الإملاء','mc','الكلمة التي فيها همزة قطع:','أكل|اسم|استمع'],
['الإملاء','mc','الكلمة التي فيها همزة وصل:','استمع|أمل|أخ'],
['الإملاء','tf','في كلمة «الشمس» تُكتب اللام ولا تُنطق.','صح'],
['الإملاء','tf','الكتابة الصحيحة هي: حديقه.','خطأ'],
['الإملاء','fill','أكمل بالحرف المناسب (ظ / ض): .... لّ الشجرة','ظ'],
['القراءة','mc','مرادف كلمة «سعيد»:','فرحان|حزين|غاضب'],
['القراءة','mc','ضد كلمة «كبير»:','صغير|طويل|واسع'],
['القراءة','mc','ضد كلمة «النهار»:','الليل|الصباح|الظهر'],
['القراءة','mc','ضد كلمة «شجاع»:','جبان|قوي|ذكي'],
['القراءة','tf','الفكرة الرئيسة هي أهم ما يدور حوله النص.','صح'],
['القراءة','fill','أكمل: مفرد كلمة «كتب» هو: ....','كتاب'],
['التعبير','mc','يتكوّن موضوع التعبير من:','مقدمة وعرض وخاتمة|مقدمة فقط|عرض فقط'],
['التعبير','mc','نبدأ كتابة موضوع التعبير بـ:','المقدمة|الخاتمة|العرض'],
['التعبير','mc','العلامة المناسبة في نهاية: ما أجملَ السماءَ ....','علامة التعجب (!)|النقطة (.)|الفاصلة (،)'],
['التعبير','tf','تُوضع علامة الاستفهام (؟) في نهاية الجملة الاستفهامية.','صح'],
['التعبير','tf','تُوضع النقطة في نهاية جملة السؤال.','خطأ'],
['التعبير','fill','ضع علامة الترقيم المناسبة: كم عمرُك ....','؟'],
['التعبير','fill','أكمل: التحية في بداية الرسالة تكون بعد ....','البسملة']
];
const BUILT=[...SEED.map((r,i)=>({id:'s'+i,br:r[0],ty:r[1],q:r[2],a:r[1]==='mc'?r[3].split('|'):r[3]})),...(window.QB_IMPORT||[]).map((r,i)=>({id:'i'+i,br:r[0],ty:r[1],q:r[2],a:r[3],src:r[4]}))];
const BIDS=new Set(BUILT.map(x=>x.id));
let qf='الكل',qs='',qadd=false,qz=null,qn=10,qopen=false;
const E=t=>esc(t),ans=x=>x.ty==='mc'?x.a[0]:x.a;
const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function bank(){
  if(S.qbi){S.qb=(S.qb||[]).filter(x=>!SEED.some(r=>r[2]===x.q));delete S.qbi}
  S.qb=S.qb||[];S.qbx=S.qbx||[];
  return BUILT.filter(x=>!S.qbx.includes(x.id)).concat(S.qb);
}
const flt=()=>bank().filter(x=>(qf==='الكل'||x.br===qf)&&(!qs||norm(x.q).includes(norm(qs))));
const listHtml=L=>L.map(x=>`<div class="item" style="align-items:flex-start"><span><div class="note">${TY[x.ty]}${x.src?' · '+E(x.src):''}</div><b style="white-space:pre-line">${E(x.q)}</b><div class="note" style="white-space:pre-line">${x.ty==='mc'?x.a.map((o,i)=>(i?'':'✔ ')+E(o)).join(' — '):(x.a?'✔ '+E(x.a):'بدون إجابة نموذجية')}</div></span><button class="x" data-qd="${x.id}">✕</button></div>`).join('')||'<p class="note">لا توجد أسئلة.</p>';

function bindDel(){document.querySelectorAll('[data-qd]').forEach(b=>b.onclick=()=>{if(confirm('حذف السؤال؟')){const id=b.dataset.qd;if(BIDS.has(id)){S.qbx=S.qbx||[];S.qbx.push(id)}else S.qb=S.qb.filter(x=>x.id!==id);save();draw()}})}

function exam(){
  const L=flt();if(!L.length){alert('لا توجد أسئلة');return null}
  const n=Math.min(qn,L.length);
  const P=sh(L).slice(0,n),LT=['أ','ب','ج','د','هـ','و'];
  let t='ورقة امتحان — اللغة العربية — الصف الرابع الابتدائي'+'\nالاسم: ................   الشعبة: ......\n\n',k='الإجابات:\n';
  P.forEach((x,i)=>{t+=(i+1)+'. '+x.q+'\n';
    if(x.ty==='mc')sh(x.a).forEach((o,j)=>{t+='   '+LT[j]+') '+o+'\n'});
    else if(x.ty==='tf')t+='   ( صح )     ( خطأ )\n';else t+='   ..........................\n';
    t+='\n';k+=(i+1)+'. '+(ans(x)||'—')+'\n'});
  return {t,k};
}

function startQuiz(){const L=flt();if(!L.length){alert('لا توجد أسئلة');return}
  qz={it:sh(L).slice(0,qn).map(x=>({x,o:x.ty==='mc'?sh(x.a):null})),i:0,sc:0,st:0,pk:null};draw()}

function drawQuiz(A){
  const z=qz,n=z.it.length;
  if(z.i>=n){
    A.innerHTML=`<div class="hd">🎯 النتيجة</div><div class="stat"><b>${z.sc} / ${n}</b><span>${Math.round(100*z.sc/n)}%</span></div><div class="row"><button class="btn pri" id="qr">🔁 اختبار جديد</button><button class="btn" id="qx">إغلاق</button></div>`;
    $('#qr').onclick=startQuiz;$('#qx').onclick=()=>{qz=null;draw()};return}
  const {x,o}=z.it[z.i],c=ans(x);let body='';
  if(x.ty==='fill'||x.ty==='open'){
    body=z.st?`<div class="item"><b style="white-space:pre-line">${c?'✔ '+E(c):'لا توجد إجابة نموذجية'}</b></div><div class="row"><button class="btn pri" data-k="1">عرفتها ✅</button><button class="btn" data-k="0">لم أعرفها ❌</button></div>`:'<button class="btn pri" id="qsh">أظهر الإجابة</button>';
  }else{
    const opts=x.ty==='mc'?o:['صح','خطأ'];
    body=opts.map(v=>{let s='';if(z.st){if(v===c)s='border-color:var(--ok);color:var(--ok);';else if(v===z.pk)s='border-color:var(--no);color:var(--no);'}
      return `<button class="btn" style="width:100%;margin:5px 0;${s}" data-o="${E(v)}">${E(v)}</button>`}).join('')+(z.st?'<button class="btn pri" id="qnx">التالي ←</button>':'');
  }
  A.innerHTML=`<button class="btn" id="qx">← خروج</button><div class="note" style="margin:8px 0">اللغة العربية — سؤال ${z.i+1} من ${n}</div><div class="item"><b style="white-space:pre-line">${E(x.q)}</b></div>${body}`;
  $('#qx').onclick=()=>{qz=null;draw()};
  const nx=()=>{z.i++;z.st=0;z.pk=null;draw()};
  A.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{if(z.st)return;z.pk=b.dataset.o;z.st=1;if(z.pk===c)z.sc++;draw()});
  A.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(b.dataset.k==='1')z.sc++;nx()});
  if($('#qsh'))$('#qsh').onclick=()=>{z.st=1;draw()};
  if($('#qnx'))$('#qnx').onclick=nx;
}

function draw(){
  const A=$('#app');if(qz)return drawQuiz(A);
  const L=flt(),N=bank().length;
  A.innerHTML=`<button class="btn" id="qback">→ الرئيسية</button><div class="hd">🎲 أسئلة تلقائية</div>
  <div class="item" style="flex-direction:column;align-items:stretch;gap:10px">
    <b style="font-size:20px">📘 اللغة العربية للصف الرابع الابتدائي</b>
    <div class="note">القراءة · القواعد · الخط والإملاء · التعبير · المحفوظات — ${N} سؤال</div>
    <div class="note">عدد الأسئلة في كل مرة:</div>
    <div class="row" style="margin:0">${[5,10,20,30].map(k=>`<button class="chip ${k===qn?'on':''}" data-qn="${k}" style="flex:1">${k}</button>`).join('')}</div>
    <button class="btn pri" id="qz" style="padding:16px;font-size:18px">🎲 ابدأ الأسئلة التلقائية</button>
    <div class="row" style="margin:0"><button class="btn" id="qp" style="flex:1">🖨 ورقة امتحان تلقائية</button><button class="btn" id="qc" style="flex:1">📋 نسخ الورقة</button></div>
  </div>
  <div class="row"><button class="btn" id="qt" style="flex:1">${qopen?'▲ إخفاء الأسئلة':'📚 عرض كل الأسئلة وإدارتها'}</button></div>
  ${qopen?`<input id="qsr" placeholder="🔍 ابحث في الأسئلة" value="${E(qs)}">
  <div class="row"><span class="note" id="qnum">${L.length} سؤال</span><button class="btn pri" id="qa" style="margin-inline-start:auto">＋ سؤال</button></div>
  ${qadd?`<div class="item" style="flex-direction:column;align-items:stretch;gap:8px">
    <select id="fty"><option value="mc">اختيار من متعدد</option><option value="tf">صح أو خطأ</option><option value="fill">أكمل</option><option value="open">سؤال مفتوح</option></select>
    <textarea id="fq" rows="2" placeholder="نص السؤال"></textarea>
    <textarea id="fmc" rows="4" placeholder="كل خيار في سطر — الإجابة الصحيحة في السطر الأول"></textarea>
    <select id="ftf"><option>صح</option><option>خطأ</option></select>
    <textarea id="ffl" rows="2" placeholder="الإجابة"></textarea>
    <button class="btn pri" id="fsv">حفظ السؤال</button></div>`:''}
  <div id="qlist">${listHtml(L)}</div>`:''}`;
  $('#qback').onclick=()=>go('home');
  A.querySelectorAll('[data-qn]').forEach(b=>b.onclick=()=>{qn=+b.dataset.qn;draw()});
  $('#qz').onclick=startQuiz;
  $('#qt').onclick=()=>{qopen=!qopen;draw()};
  $('#qp').onclick=()=>{const r=exam();if(!r)return;const w=window.open('','_blank');if(!w){alert('تعذر فتح الطباعة، استخدم زر النسخ');return}
    w.document.write('<html dir="rtl" lang="ar"><meta charset="utf-8"><body style="font:18px Tahoma,Arial;white-space:pre-wrap;line-height:1.9;padding:20px">'+esc(r.t)+'</body></html>');w.document.close();w.print()};
  $('#qc').onclick=async()=>{const r=exam();if(!r)return;try{await navigator.clipboard.writeText(r.t+'\n———\n'+r.k);alert('تم النسخ (الورقة مع الإجابات)')}catch(e){alert('تعذر النسخ')}};
  if(!qopen)return;
  $('#qsr').oninput=e=>{qs=e.target.value;const l=flt();$('#qnum').textContent=l.length+' سؤال';$('#qlist').innerHTML=listHtml(l);bindDel()};
  $('#qa').onclick=()=>{qadd=!qadd;draw()};
  if(qadd){
    const ty=$('#fty'),sy=()=>{$('#fmc').style.display=ty.value==='mc'?'':'none';$('#ftf').style.display=ty.value==='tf'?'':'none';$('#ffl').style.display=(ty.value==='fill'||ty.value==='open')?'':'none'};
    ty.onchange=sy;sy();
    $('#fsv').onclick=()=>{
      const q=$('#fq').value.trim();if(!q){alert('اكتب نص السؤال');return}
      let a;
      if(ty.value==='mc'){a=$('#fmc').value.split('\n').map(s=>s.trim()).filter(Boolean);if(a.length<2){alert('أدخل خيارين على الأقل');return}}
      else if(ty.value==='tf')a=$('#ftf').value;
      else{a=$('#ffl').value.trim();if(!a&&ty.value==='fill'){alert('اكتب الإجابة');return}}
      bank();S.qb.push({id:'u'+uid(),br:'اللغة العربية',ty:ty.value,q,a});qadd=false;save();draw();
    };
  }
  bindDel();
}

function inject(){
  const g=[...document.querySelectorAll('#app .grid')].pop();if(!g||$('#qbt'))return;
  g.insertAdjacentHTML('beforeend','<button class="tile t2" id="qbt"><b>🎲</b>أسئلة تلقائية<small>اللغة العربية — رابع</small></button>');
  $('#qbt').onclick=()=>{qz=null;go('qb')};
}
const orig=window.render;
window.render=function(){
  if(view!=='qb'){orig();if(view==='home')inject();return}
  ensure();draw();
};
})();
