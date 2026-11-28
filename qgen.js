/* زر الأسئلة التلقائية + بنك أسئلة العلوم للصف الثالث (منقول من صور الملف، راجعه) */
(function(){
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
const RAW=`1|ما أجزاء النبات؟|جذر – ساق – أوراق – ثمرة
2|ما وظيفة أوراق النبات؟|صنع الغذاء للنبات
3|ما وظائف الساق في النبات؟|نقل الماء والمواد الغذائية والاملاح الى أجزاء النبات
4|ما وظيفة الجذر للنبات؟|يثبت النبات في التربة ويمتص الماء والاملاح
5|ما هو الغاز الذي تحرره أوراق النباتات؟|الاوكسجين
6|ماذا تحتاج أوراق النبات كي تصنع الغذاء؟|ماء – هواء – ضوء الشمس
7|ما هي عملية البناء الضوئي؟|عملية صنع غذاء النبات داخل الأوراق
8|كيف تصنع النباتات غذاءها؟|تصنع النباتات غذاءها بنفسها
9|ما هي الفطريات؟|كائنات حية بسيطة ليس لها جذور ولا ساق ولا أوراق
10|هل تستطيع الفطريات صنع غذاءها بنفسها؟|لا تستطيع الفطريات صنع غذاءها بنفسها
11|كيف تحصل الفطريات على غذائها؟|تحصل على غذائها من الحيوانات والنباتات والجلود والخبز والجبن
12|اين تعيش الفطريات؟|تعيش في الاماكن المظلمة والرطبة بين الأعشاب
13|لماذا لا تستطيع الفطريات صنع غذائها بنفسها؟|لانها لا تمتلك أوراق
14|ما انواع الفطريات؟|الفطر – الكما – المشروم – العفن – الخميرة
15|ماذا يسمى العفن الموجود على البرتقالة؟|عفن الفاكهة
16|على ماذا يتغذى العفن؟|يتغذى العفن على الغذاء المخزون في الأطعمة
17|من اين يصنع الدواء البنسلين؟|صنع الانسان دواء البنسلين من بعض انواع العفن
18|اين تخزن النباتات غذاءها؟|تخزن النباتات الغذاء الزائد في جذورها وسيقانها واوراقها وثمارها
19|لماذا تخزن النباتات الغذاء الزائد عن حاجتها؟|لكي تستخدمه في اوقات لا تستطيع صنع الغذاء بنفسها
20|صنف أنواع الحيوانات من حيث تغذيتها؟|اكلات النباتات – اكلات اللحوم – مختلطة التغذية
21|ما هي حيوانات اكلات النباتات؟|الأغنام – الخيول – الابقار – الغزلان
22|ما هي حيوانات اكلات اللحوم؟|هي التي تتغذى على اللحوم فقط
23|اعط ثلاث حيوانات اكلات اللحوم؟|الأسد – النمر – سمك القرش – الصقر – النسر
24|كيف تحصل الحيوانات مختلطة التغذية على غذائها؟|تحصل على الغذاء بأكل النبات او أكل الحيوان او الاثنين معا
25|ما يساعد الحيوانات على الحصول على غذائها؟|الاسنان الحادة – المخالب القوية – المناقير المدببة
26|ماهي حيوانات مختلطة التغذية؟|الدجاجة تتغذى على الديدان والنباتات والدب على السمك والنباتات والحيوانات
27|على ماذا تتغذى النحلة؟|تتغذى النحلة على رحيق الازهار
28|هل تستطيع الحيوانات صنع غذائها بنفسها؟|لا، لانها لا تمتلك أجزاء النبات
29|ما هي المنتجات؟|كائنات حية تصنع غذاءها بنفسها بواسطة الشمس
30|اعط مثالين للمنتجات؟|النباتات على اليابسة والطحالب في البحار
31|ما هي المستهلكات؟|كائنات حية لا يمكنها صنع غذائها بنفسها وتتغذى على المنتجات او الحيوانات
32|ما هي السلسلة الغذائية؟|تتغذى المستهلكات على المنتجات مثل الافعى تأكل الفار
33|ما هي المحللات؟|كائنات حية تقوم بتحليل اجسام الكائنات الميتة الى مواد بسيطة
34|اعط مثالين للمحللات؟|الديدان – البكتريا – الفطريات
35|اكتب ثلاث حيوانات مفترسة وفريسة كل منها؟|الافعى – الفار – البوم – الفار – الاسد – الغزال
36|ما هي السلسلة الغذائية؟|عملية انتقال الطاقة الغذائية من كائن الى اخر
37|اعط امثالا للسلسلة الغذائية؟|العشب – الفار – الافعى – النمر
38|على ماذا تتغذى الاسماك الكبيرة؟|الاسماك الكبيرة تأكل الاسماك الصغيرة
39|على ماذا تتغذى الاسماك الصغيرة؟|تتغذى الاسماك الصغيرة على الطحالب
40|لماذا يربي الناس حيوانات اكلات اللحوم؟|للقضاء على الافات الضارة والفئران
41|ما طبيعة تغذية الانسان؟|مختلط التغذية يتغذى على الحيوانات والنباتات
42|ما العلاقة بين النبات والحيوان؟|اكل وماكول واخذ وعطاء
43|ما موارد البيئة الطبيعية؟|الماء – الهواء – التربة – الصخور – النفط – الغاز
44|ما موارد البيئة الحية؟|النباتات – الحيوانات
45|ما اهمية موارد البيئة للانسان؟|توفر له الغذاء والملبس والمسكن
46|كيف نتعامل مع موارد البيئة؟|نحافظ عليها ونحميها من التلوث حتى لا تضر الانسان
47|ما اهمية الماء والهواء للانسان؟|نتنفس الهواء كي نعيش ونشرب الماء ونغسل اجسامنا
48|كيف تتم تنقية المياه في المنازل؟|بواسطة الترشيح او الفلاتر الكهربائية الحديثة
49|من اين نحصل على المياه في البيئة؟|من الانهار والابار ومياه الامطار وهي موارد طبيعية
50|من اين نحصل على الهواء النقي؟|من الطبيعة التي نعيش فيها
51|ماذا يستخرج من باطن الارض؟|النفط – المعادن – الغاز – الكبريت
52|ما اهمية الترشيح في تصفية المياه؟|تزيل الكثير من الشوائب التي يحتويها الماء
53|ما اهمية الماء والهواء للانسان؟|الماء والهواء ضروريان لحياة الانسان كي يعيش
54|كيف يستخرج النفط؟|نستخرجه باستعمال ادوات حفر خاصة ثم نحصل منه على الوقود
55|من اين نحصل على المعادن؟|نستخرج المعادن من الصخور
56|ما موارد الثروة النباتية؟|حبوب القمح – الفواكه – الخضراوات
57|ما موارد الثروة الحيوانية؟|الحليب – البيض – اللحوم
58|ما بعض الادوية التي تصنع من الاعشاب؟|ماء البابونج يستخدم لعلاج بعض الامراض
59|كيف نحافظ على موارد البيئة؟|عند اعادة استعمال مواد الطبيعة بذلك نحافظ على موارد البيئة
60|ما ترشيد الاستهلاك؟|عدم صرف الماء بكميات كبيرة وكذلك عدم ترك المصابيح مضاءة
61|ما المقصود بتلوث البيئة؟|هو ان تصبح البيئة غير صالحة لحياة الانسان وسلامته
62|كيف تتلوث البيئة؟|عندما تتراكم النفايات ومخلفات الطعام فأنها تلوث الماء والتربة والهواء
63|ماهي مضار تلوث البيئة؟|تلوث البيئة يضر بالحيوان والنباتات والانسان
64|كيف نحمي موارد البيئة من التلوث؟|وذلك باستعمال المخلفات من خلال اعادة التدوير
65|من اين يحصل النبات على الاوكسجين؟|من الهواء الجوي ومن عملية البناء الضوئي
66|كيف يتنفس الانسان؟|يأخذ الاوكسجين ويطرح ثاني اوكسيد الكاربون عن طريق الرئتين
67|كيف تتكون الصخور؟|من اندماج مواد التربة
68|ماذا يستفيد الانسان من الصخور؟|في اعمال البناء والطرق
69|ما موارد البيئة التي تستعمل في الصناعة؟|القطن – الكتان – المطاط – الصمغ – الاخشاب
70|ما وحدات قياس الطول؟|المتر – السنتمتر
71|ما اهمية القياس؟|لقياس طول وعرض الاشياء
72|ما هو الطول؟|هو صفة للجسم يمكن قياسها وهي مسافة بين بداية الجسم الى نهايته
73|ما هي المسطرة المدرجة؟|هي اداة قياس اطوال الاجسام القصيرة
74|ماهو الشريط المتري؟|هو اداة قياس اطوال الاجسام الطويلة
75|ما الاداة المناسبة لقياس الطول؟|المسطرة المدرجة والشريط المتري
76|كيف يقيس مهندس طول جدار بناية؟|شريط القياس
77|ما الاداة المناسبة لقياس طول شباك؟|الشريط المتري – المسطرة المترية
78|ما الاداة المناسبة لقياس طول الشارع؟|شريط القياس
79|المتر كم سنتمتر؟|100 سم
80|ما هو المتر؟|وحدة لقياس اطوال الاجسام الطويلة
81|ما هو السنتمتر؟|وحدة لقياس اطوال الاجسام القصيرة
82|ما الكتلة؟|كمية المادة الموجودة في الجسم
83|الميزان ذو الكفتين هو..؟|اداة لقياس الكتلة
84|ما اداة قياس الكتلة؟|الميزان
85|ما هو الكيلو غرام؟|وحدة قياس كتلة الاجسام الكبيرة
86|ما هو الغرام؟|وحدة قياس كتلة الاجسام الصغيرة
87|ما انواع الموازين؟|ميزان ذو الكفتين – الميزان الرقمي – ميزان الصاغة وموازين خاصة
88|ما هي الموازين الخاصة؟|هي موازين لقياس كتلة حمولات الشاحنات الكبيرة
89|ما المخلوط غير المتجانس؟|هو خلط مواد صلبة ببعضها وتحتفظ كل مادة بخصائصها الاصلية
90|اعطي ثلاث مخاليط نتناولها في طعامنا؟|السلطة – شوربة العدس – المخللات
91|اذكر طريقة تصفية الماء العكر؟|التركيد
92|ما اهمية معجون الاسنان؟|لتنظيف الاسنان
93|اذكر معاجين نستعملها في حياتك اليومية؟|معجون طماطة – مربى – اسنان – الزجاج
94|ما انواع المخاليط غير المتجانسة؟|صلب مع صلب – صلب مع سائل
95|ما نوع مخلوط الطباشير مع الماء؟|مخلوط صلب مع سائل
96|ما نوع مخلوط المكسرات؟|صلب مع صلب
97|اذكر طريقة فصل مكونات التراب مع الماء؟|بالترشيح
98|اذكر طريقة فصل مكونات الزيتون مع الخل؟|المصفاة او اليد
99|عدد طرق فصل مكونات صلب مع صلب؟|الالتقاط باليد – الغربال – المغناطيس – الهواء – الطفو
100|ما نوع مخلوط العصير؟|مخلوط صلب مع سائل`;
const BANK={'الصف الثالث|العلوم':{
 topics:[
  {id:1,name:'النباتات وغذاؤها',n:[...R(1,8),18,19]},
  {id:2,name:'الفطريات',n:R(9,17)},
  {id:3,name:'الحيوانات وغذاؤها',n:R(20,28)},
  {id:4,name:'المنتجات والمستهلكات والسلسلة الغذائية',n:R(29,42)},
  {id:5,name:'موارد البيئة',n:[...R(43,58),...R(65,69)]},
  {id:6,name:'ترشيد الاستهلاك والتلوث',n:R(59,64)},
  {id:7,name:'قياس الطول',n:R(70,81)},
  {id:8,name:'الكتلة والميزان',n:R(82,88)},
  {id:9,name:'المخاليط',n:R(89,100)}],
 q:{}}};
BANK['الصف الثالث|العلوم'].def=3;
RAW.split('\n').forEach(l=>{const p=l.split('|');BANK['الصف الثالث|العلوم'].q[+p[0]]={q:p[1],a:p[2]}});
window.QBANK=BANK;


let qg={key:null,cn:null,topics:new Set(),cnt:3,ans:false,mode:'oral'};
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const clean=s=>String(s==null?'':s).replace(/^س[\d٠-٩]+\s*\/\s*/,'');
const item=(B,n)=>{const it=B.q[n];return it.parts?{parts:it.parts,a:null}:{parts:[{t:it.l||'',x:[clean(it.q)]}],a:it.a,l:it.l}};
const D5=['١','٢','٣','٤','٥','٦','٧','٨','٩'],BL=['أ','ب','ج'];
const RL={both:'أجب عن الفرعين',two:'أجب عن فرعين فقط',one:'أجب عن فرع واحد فقط'};
function takeBranch(order,k,used,st){
  for(let tries=0;tries<2;tries++){
    for(let z=0;z<order.length;z++){const t=order[(st.p+z)%order.length];const av=t.n.filter(x=>!used.has(x));
      if(av.length>=k){st.p=(st.p+z+1)%order.length;const ids=sh(av).slice(0,k);ids.forEach(x=>used.add(x));return {ids,tid:t.id}}}
    let best=null;order.forEach(t=>{const av=t.n.filter(x=>!used.has(x));if(av.length&&(!best||av.length>best.av.length))best={t,av}});
    if(best){const ids=sh(best.av);ids.forEach(x=>used.add(x));return {ids,tid:best.t.id}}
    used.clear();
  }
  return {ids:[],tid:null};
}
/* خطط الامتحان التحريري. الرياضيات للصف الرابع: 5 أسئلة من 10 درجات (لكل سؤال درجتان)
   س1 وس3 وس5 فرعان يُجاب عنهما، وس2 وس4 ثلاثة فروع يُجاب عن فرعين فقط. k = عدد الأسئلة في كل فرع */
const PLAN_OLD=[{rule:'both',k:[2,3]},{rule:'both',k:[2,3]},{rule:'two',k:[1,1,1]},{rule:'both',k:[2,3]},{rule:'two',k:[1,1,1]}];
const PLAN_M4=[{rule:'both',k:[1,1]},{rule:'two',k:[1,1,1]},{rule:'both',k:[1,1]},{rule:'two',k:[1,1,1]},{rule:'both',k:[1,1]}];
const isM4=key=>String(key).startsWith('الصف الرابع|');
/* العربي: التعبير (موضوعان، يُجاب عن واحد) + القواعد (3 أسئلة نصف السنة أو 5 نهاية السنة، كل سؤال فرعان) + الخط (سؤال) */
function pickArabic(B){
  const on=t=>qg.topics.has(t.id);
  const ess=sh(B.topics.filter(t=>t.kind==='essay'&&on(t)));
  const gr=sh(B.topics.filter(t=>t.kind==='gram'&&on(t)));
  const used=new Set(),st={p:0},out=[];
  out.push({n:1,rule:'one',br:ess.slice(0,2).map(t=>({ids:[t.n[0]],tid:t.id}))});
  const ng=cfgOf().etype===ETYPES[1]?5:3;
  for(let i=0;i<ng;i++){
    const a=takeBranch(gr,2,used,st);
    out.push({n:out.length+1,rule:'both',br:a.ids.map(x=>({ids:[x],tid:a.tid}))});
  }
  const kh=B.khat[Math.floor(Math.random()*B.khat.length)];
  out.push({n:out.length+1,rule:'single',br:[{ids:[kh],tid:null}]});
  return out;
}
function pickExam(B){
  if(B.arExam)return pickArabic(B);
  const order=sh(B.topics.filter(t=>qg.topics.has(t.id))),used=new Set(),st={p:0};
  const plan=isM4(qg.key)?PLAN_M4:PLAN_OLD;
  return plan.map((q,i)=>({n:i+1,rule:q.rule,br:q.k.map(k=>takeBranch(order,k,used,st))}));
}
const nl=t=>esc(t).replace(/\n/g,'<br>');
function examHtml(B,r){
  const ans=n=>qg.ans&&B.q[n].a?`<div class="note" style="color:var(--ok)">← ${esc(B.q[n].a)}</div>`:'';
  const box='<div class="item" style="flex-direction:column;align-items:stretch">';
  return r.exam.map(q=>{
    if(q.rule==='single'){const n=q.br[0].ids[0];return box+`<div><b>س${D5[q.n-1]} /</b> ${nl(clean(B.q[n].q))}${ans(n)}</div></div>`}
    return box+`<b>س${D5[q.n-1]} / ${RL[q.rule]}:</b>`+q.br.map((b,bi)=>b.ids.length===1
      ?`<div style="margin-top:8px"><b>${BL[bi]}/</b> ${nl(clean(B.q[b.ids[0]].q))}${ans(b.ids[0])}</div>`
      :`<div style="margin-top:8px"><b>${BL[bi]}/</b>${b.ids.map((n,k)=>`<div style="margin-top:4px;padding-inline-start:12px">${k+1}- ${nl(clean(B.q[n].q))}${ans(n)}</div>`).join('')}</div>`).join('')+'</div>';
  }).join('');
}
function pick(B,s){
  const pool=[...new Set([].concat(...B.topics.filter(t=>qg.topics.has(t.id)).map(t=>t.n)))];
  let deck=[];const per={};
  s.students.forEach(t=>{const mine=[],need=Math.min(qg.cnt,pool.length);
    while(mine.length<need){if(!deck.length)deck=sh(pool);const x=deck.pop();if(!mine.includes(x))mine.push(x)}
    per[t.id]=mine});
  return per;
}
function qText(B,s,r){
  if(r.exam){const tx=n=>clean(B.q[n].q)+(qg.ans&&B.q[n].a?'\n        ← '+B.q[n].a:'');
    return 'أسئلة '+cls().name+' — '+qg.key.split('|')[1]+' (امتحان تحريري)\n\n'+r.exam.map(q=>q.rule==='single'?'س'+D5[q.n-1]+': '+tx(q.br[0].ids[0]):'س'+D5[q.n-1]+': '+RL[q.rule]+'\n'+q.br.map((b,bi)=>'  '+BL[bi]+') '+b.ids.map((n,k)=>(b.ids.length>1?(k+1)+'- ':'')+tx(n)).join('\n      ')).join('\n')).join('\n\n')}
  if(r.shared)return 'أسئلة '+cls().name+' — '+qg.key.split('|')[1]+'\n\n'+r.shared.map((n,j)=>{const it=item(B,n);return (j+1)+') '+it.l+'\n   '+it.parts[0].x[0].split('\n').join('\n   ')+(qg.ans&&it.a?'\n   ← '+it.a:'')}).join('\n\n');
  const sorted=[...s.students].sort((x,y)=>x.name.localeCompare(y.name,'ar'));
  return 'أسئلة '+s.name+'\n\n'+sorted.map((t,i)=>(i+1)+'. '+t.name+'\n'+(r.per[t.id]||[]).map((n,j)=>{const it=item(B,n);
    return (it.l?['   '+(j+1)+') '+it.l+'\n      '+it.parts[0].x[0].split('\n').join('\n      ')]:it.parts.map(p=>'   '+(p.t?p.t+': ':(j+1)+') ')+p.x.join(' — '))).join('\n')+(qg.ans&&it.a?'\n      ← '+it.a:'')}).join(B.card?'\n   ───\n':'\n')).join('\n\n');
}
function qHtml(B,n,j){
  const it=item(B,n);
  if(B.card)return `<div style="margin-top:8px;padding:8px 10px;border:1px dashed var(--bd);border-radius:12px">${it.parts.map(p=>`<div style="margin:3px 0"><b>${esc(p.t)}:</b> ${p.x.map(esc).join('<br>• ')}</div>`).join('')}</div>`;
  return `<div style="margin-top:8px">${j+1}) ${it.l?`<b>${esc(it.l)}</b><br>`:''}${esc(it.parts[0].x[0]).replace(/\n/g,'<br>')}${qg.ans&&it.a?`<div class="note" style="color:var(--ok)">← ${esc(it.a)}</div>`:''}</div>`;
}
const toAr=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const ETYPES=['امتحانات نصف السنة','امتحانات نهاية السنة','امتحانات شهرية'];
const cfgOf=()=>{S.cfg=S.cfg||{};return S.cfg};
function paperLines(B,n){const it=item(B,n);return B.card?it.parts.map(p=>p.t+': '+p.x.join(' — ')):it.parts[0].x[0].split('\n')}
function buildPaper(B,s,r,c){
  const cfg=cfgOf(),subj=qg.key.split('|')[1];
  const head={school:cfg.school||'',cls:c.name.replace(/^الصف\s*/,''),subj,time:cfg.time||'',etype:cfg.etype||ETYPES[0],year:cfg.year||'2026/2027'};
  const body=[],P=(t,o)=>body.push(Object.assign({k:'p',t},o||{}));
  const addItem=(n,pref,ind)=>{paperLines(B,n).forEach((ln,i)=>P((i===0?pref:'')+ln,{ind}));if(qg.ans&&B.q[n].a)P('الإجابة: '+B.q[n].a,{ind,clr:'1F7A3A',sz:22})};
  const sorted=[...s.students].sort((x,y)=>x.name.localeCompare(y.name,'ar'));
  if(r.exam){
    P('اسم الطالب: ..............................................   الشعبة: ..............',{b:1,af:160});
    r.exam.forEach(x=>{
      if(x.rule==='single'){x.br[0].ids.forEach(n=>addItem(n,'س'+toAr(x.n)+' / ',0));return}
      P('س'+toAr(x.n)+' / '+(x.rule==='both'?'أجب عن الفرعين الآتيين':RL[x.rule])+':',{b:1,bf:140,keep:1});
      x.br.forEach((b,bi)=>{
        if(b.ids.length>1){P(BL[bi]+' /',{b:1,ind:200,keep:1});b.ids.forEach((n,k)=>addItem(n,toAr(k+1)+'- ',500))}
        else b.ids.forEach(n=>addItem(n,BL[bi]+' / ',200));
      });
    });
  }else if(r.shared){
    P('اسم الطالب: ..............................................   الشعبة: ..............',{b:1,af:160});
    r.shared.forEach((n,j)=>addItem(n,'س'+toAr(j+1)+' / ',0));
  }else{
    P('الشعبة: '+s.name,{b:1});
    const rows=sorted.map((t,i)=>{const ids=r.per[t.id]||[],lines=[];
      ids.forEach((n,j)=>{paperLines(B,n).forEach((ln,k)=>lines.push((!B.card&&k===0?toAr(j+1)+') ':'')+ln))});
      return [toAr(i+1),t.name,lines,''];});
    body.push({k:'t',w:[7,23,60,10],head:['ت','اسم التلميذ','الأسئلة','الدرجة'],rows});
  }
  return {head,body,name:subj+' - '+c.name+' - '+head.etype};
}
const chip=(B,t)=>`<button class="chip ${qg.topics.has(t.id)?'on':''}" data-qt="${t.id}">${esc(t.name)}${(B.card||B.arExam)?'':' ('+t.n.length+')'}</button>`;
const chipsH=B=>B.arExam
  ?'<div class="note" style="margin-top:4px"><b>التعبير</b> — اختر المواضيع (يُختار منها موضوعان والتلميذ يجيب عن واحد)</div><div class="row">'+B.topics.filter(t=>t.kind==='essay').map(t=>chip(B,t)).join('')+'</div><div class="note"><b>القواعد</b> — اختر المواضيع</div><div class="row">'+B.topics.filter(t=>t.kind==='gram').map(t=>chip(B,t)).join('')+'</div><div class="note">الخط: سؤال واحد يُختار تلقائياً</div>'
  :'<div class="row">'+B.topics.map(t=>chip(B,t)).join('')+'</div>';
const aetH=B=>B.arExam?'<div class="row"><b>نوع الامتحان:</b>'+ETYPES.slice(0,2).map(t=>`<button class="chip ${(cfgOf().etype===ETYPES[1])===(t===ETYPES[1])?'on':''}" data-aet="${t}">${t}</button>`).join('')+'</div>':'';
const exNote=B=>B.arExam?'امتحان اللغة العربية التحريري: التعبير (موضوعان والتلميذ يجيب عن واحد) + القواعد ('+(cfgOf().etype===ETYPES[1]?'خمسة':'ثلاثة')+' أسئلة، كل سؤال من فرعين) + الخط (سؤال واحد)':isM4(qg.key)?'الامتحان التحريري (من 10 درجات): خمسة أسئلة — س١ وس٣ وس٥ من فرعين يجيب عنهما التلميذ، وس٢ وس٤ من ثلاثة فروع يجيب التلميذ عن فرعين فقط':'الامتحان التحريري: خمسة أسئلة — س١ وس٢ وس٤ من فرعين، وس٣ وس٥ من ثلاثة فروع يجيب التلميذ عن فرعين فقط';
function showQ(){
  const A=document.querySelector('#app'),c=cls(),s=sec();S.qgen=S.qgen||{};
  const keys=Object.keys(BANK);
  if(!qg.key||qg.cn!==c.id){qg.cn=c.id;qg.key=keys.find(k=>c.name.includes(k.split('|')[0].replace('الصف ','')))||keys[0];qg.topics=new Set();qg.cnt=BANK[qg.key].def||3;qg.mode='oral'}
  const B=BANK[qg.key],r=S.qgen[s.id]&&S.qgen[s.id].key===qg.key?S.qgen[s.id]:null;
  const exW=B.arExam||(B.exam&&qg.mode==='written');
  A.innerHTML=`<button class="btn" id="qb">→ الرئيسية</button><div class="hd">🎲 أسئلة تلقائية</div>
  <div class="note">${esc(c.name)} — ${esc(s.name)} · ${s.students.length} تلميذ</div>
  <div class="row"><button class="btn" id="psb">🏫 ${cfgOf().school?'المدرسة: '+esc(cfgOf().school):'اكتب اسم المدرسة'}</button></div>
  <div class="row"><select id="qk">${keys.map(k=>`<option value="${esc(k)}" ${k===qg.key?'selected':''}>${esc(k.replace('|',' — '))}</option>`).join('')}</select></div>
  <div class="row"><b>${B.card?'اختر الدروس:':'اختر المواضيع:'}</b><button class="btn" id="qall">✔ الكل</button></div>
  ${chipsH(B)}
  ${aetH(B)}
  ${B.modes?`<div class="row"><b>نوع الامتحان:</b><button class="chip ${qg.mode!=='written'?'on':''}" id="qmo">🗣 امتحان شفوي</button><button class="chip ${qg.mode==='written'?'on':''}" id="qmw">📝 امتحان تحريري</button></div><div class="note">${qg.mode==='written'?'تحريري: أسئلة موحدة للصف كله وشعبه':'شفوي: أسئلة مختلفة لكل تلميذ'}</div>`:''}
  <div class="row"><span class="note">${exW?exNote(B):B.card?'عدد البطاقات لكل تلميذ (كل بطاقة: قراءة + محادثة + محفوظة)':(B.shared||(B.modes&&qg.mode==='written'))?'عدد الأسئلة للصف كله (الأسئلة نفسها لكل التلاميذ)':'عدد الأسئلة لكل تلميذ'}</span>${exW?'':`<input type="number" id="qc" min="1" max="10" value="${qg.cnt}" style="width:80px">`}</div>
  <div class="row"><button class="btn pri" id="qgo">🎲 اختر الأسئلة</button>${r?`${(B.card||B.shared||B.modes)&&!B.hasAns?'':`<button class="btn" id="qa">${qg.ans?'إخفاء الأجوبة':'إظهار الأجوبة'}</button>`}<button class="btn" id="qcp">📋 نسخ</button>`:''}</div>
  ${r?`<div class="item" style="flex-direction:column;align-items:stretch;margin-top:10px"><b>📄 ورقة الأسئلة (A4) للإرسال أو الطباعة</b>
    <div class="row">${ETYPES.map(t=>`<button class="chip ${(cfgOf().etype||ETYPES[0])===t?'on':''}" data-et="${t}">${t}</button>`).join('')}</div>
    <div class="row"><input id="pyr" value="${esc(cfgOf().year||'2026/2027')}" style="width:38%" placeholder="العام الدراسي"><input id="ptm" value="${esc(cfgOf().time||'')}" style="flex:1" placeholder="الوقت (مثال: ساعة ونصف)"></div>
    <div class="row"><button class="btn pri" id="pdoc">📄 ملف Word</button><button class="btn" id="pwa">🟢 واتساب</button><button class="btn" id="ppr">🖨 طباعة</button></div>
    <div class="note">الورقة: بسم الله في الوسط، واسم المدرسة يميناً، والصف والمادة والوقت يساراً. وتظهر الأجوبة في الورقة فقط إذا فعّلت «إظهار الأجوبة».</div></div>`:''}
  ${r&&r.exam?`<div class="note" style="margin-top:8px">الأسئلة نفسها لكل تلاميذ ${esc(c.name)} (${c.sections.map(x=>esc(x.name)).join(' و ')})</div>`+examHtml(B,r):r&&r.shared?`<div class="note" style="margin-top:8px">الأسئلة نفسها لكل تلاميذ ${esc(c.name)} (${c.sections.map(x=>esc(x.name)).join(' و ')})</div>`+r.shared.map((n,j)=>`<div class="item" style="flex-direction:column;align-items:stretch">${qHtml(B,n,j)}</div>`).join(''):r?[...s.students].sort((x,y)=>x.name.localeCompare(y.name,'ar')).map((t,i)=>`<div class="item" style="flex-direction:column;align-items:stretch"><b>${i+1}. ${esc(t.name)}</b>${(r.per[t.id]||[]).map((n,j)=>qHtml(B,n,j)).join('')}</div>`).join(''):'<p class="note">اختر موضوعاً أو أكثر ثم اضغط «اختر الأسئلة» فيأخذ كل تلميذ أسئلة مختلفة.</p>'}`;
  A.querySelector('#psb').onclick=()=>{const v=prompt('اكتب اسم المدرسة',cfgOf().school||'');if(v===null)return;cfgOf().school=v.trim();save();showQ()};
  if(r){
    A.querySelectorAll('[data-et]').forEach(b=>b.onclick=()=>{cfgOf().etype=b.dataset.et;save();showQ()});
    A.querySelector('#pyr').oninput=e=>{cfgOf().year=e.target.value.trim();save()};
    A.querySelector('#ptm').oninput=e=>{cfgOf().time=e.target.value.trim();save()};
    const need=()=>{if(!window.Paper){alert('جارٍ تحميل الميزة، أعد المحاولة بعد لحظات وأنت متصل بالإنترنت');return false}if(!cfgOf().school&&!confirm('لم تكتب اسم المدرسة بعد. هل تريد المتابعة بدونه؟'))return false;return true};
    A.querySelector('#pdoc').onclick=()=>{if(need())window.Paper.download(buildPaper(B,s,r,c))};
    A.querySelector('#pwa').onclick=()=>{if(need())window.Paper.share(buildPaper(B,s,r,c))};
    A.querySelector('#ppr').onclick=()=>{if(need())window.Paper.print(buildPaper(B,s,r,c))};
  }
  A.querySelector('#qb').onclick=()=>go('home');
  A.querySelectorAll('[data-aet]').forEach(b=>b.onclick=()=>{cfgOf().etype=b.dataset.aet;c.sections.forEach(x=>{delete S.qgen[x.id]});save();showQ()});
  A.querySelector('#qk').onchange=e=>{qg.key=e.target.value;qg.topics=new Set();qg.cnt=BANK[qg.key].def||3;qg.mode='oral';showQ()};
  if(A.querySelector('#qmo')){A.querySelector('#qmo').onclick=()=>{qg.mode='oral';qg.cnt=3;showQ()};A.querySelector('#qmw').onclick=()=>{qg.mode='written';qg.cnt=5;showQ()}}
  A.querySelector('#qall').onclick=()=>{qg.topics=qg.topics.size===B.topics.length?new Set():new Set(B.topics.map(t=>t.id));showQ()};
  A.querySelectorAll('[data-qt]').forEach(b=>b.onclick=()=>{const id=+b.dataset.qt;qg.topics.has(id)?qg.topics.delete(id):qg.topics.add(id);showQ()});
  if(A.querySelector('#qc'))A.querySelector('#qc').onchange=e=>{qg.cnt=Math.max(1,Math.min(10,+e.target.value||1))};
  A.querySelector('#qgo').onclick=()=>{
    if(!qg.topics.size){alert('اختر درساً أو موضوعاً واحداً على الأقل');return}
    if(B.arExam){
      const ne=B.topics.filter(t=>t.kind==='essay'&&qg.topics.has(t.id)).length,ng=B.topics.filter(t=>t.kind==='gram'&&qg.topics.has(t.id)).length;
      if(ne<2){alert('اختر موضوعين على الأقل من مواضيع التعبير');return}
      if(ng<1){alert('اختر موضوعاً واحداً على الأقل من القواعد');return}
    }
    if(B.arExam||(B.exam&&qg.mode==='written')){const ex=pickExam(B);c.sections.forEach(x=>{S.qgen[x.id]={key:qg.key,exam:ex,date:today()}});save();showQ();return}
    if(B.shared||(B.modes&&qg.mode==='written')){const pool=[...new Set([].concat(...B.topics.filter(t=>qg.topics.has(t.id)).map(t=>t.n)))],ids=sh(pool).slice(0,qg.cnt);
      c.sections.forEach(x=>{S.qgen[x.id]={key:qg.key,shared:ids,date:today()}});save();showQ();return}
    if(!s.students.length){alert('لا يوجد تلاميذ في هذه الشعبة');return}
    S.qgen[s.id]={key:qg.key,per:pick(B,s),date:today()};save();showQ()};
  if(r){if(A.querySelector('#qa'))A.querySelector('#qa').onclick=()=>{qg.ans=!qg.ans;showQ()};
    A.querySelector('#qcp').onclick=async()=>{try{await navigator.clipboard.writeText(qText(B,s,r));alert('تم النسخ')}catch(e){alert('تعذر النسخ')}}}
}
const prev=window.render;
window.render=function(){
  if(view==='qgen'){showQ();return}
  prev();
  if(view==='home'){
    const g=[...document.querySelectorAll('#app .grid')].pop();
    if(g&&!g.querySelector('[data-qg]')){
      const b=document.createElement('button');b.className='tile t5';b.dataset.qg='1';
      b.innerHTML='<b>🎲</b>أسئلة تلقائية<small>من المواضيع</small>';b.onclick=()=>go('qgen');g.appendChild(b);
    }
    if(g&&!g.querySelector('[data-sch]')){
      const b2=document.createElement('button');b2.className='tile t8';b2.dataset.sch='1';
      b2.innerHTML='<b>🏫</b>اسم المدرسة<small>'+esc(cfgOf().school||'اضغط للكتابة')+'</small>';
      b2.onclick=()=>{const v=prompt('اكتب اسم المدرسة',cfgOf().school||'');if(v===null)return;cfgOf().school=v.trim();save();render()};g.appendChild(b2);
    }
  }
};
if(view==='home')window.render();
const ps=document.createElement('script');ps.src='paper.js';document.head.appendChild(ps);
})();
document.head.appendChild(Object.assign(document.createElement('script'),{src:'bank-islamic6.js'}));
