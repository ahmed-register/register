/* ورقة الأسئلة: ملف Word (A4) + واتساب + طباعة. لا يحتاج أي مكتبة خارجية
   جديد: اسم المعلم في شريط سفلي على يسار الورقة (يُحفظ لكل مادة) */
(function(){
const MIME='application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const enc=new TextEncoder();
const crcT=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc32=b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=crcT[(c^b[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0};
const u16=v=>[v&255,(v>>8)&255],u32=v=>[v&255,(v>>8)&255,(v>>16)&255,(v>>>24)&255];
function zip(files){
  const out=[],cen=[];let off=0;
  files.forEach(f=>{
    const nm=enc.encode(f.n),crc=crc32(f.d),sz=f.d.length;
    const lh=new Uint8Array([0x50,0x4b,3,4,...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(crc),...u32(sz),...u32(sz),...u16(nm.length),...u16(0),...nm]);
    out.push(lh,f.d);
    cen.push(new Uint8Array([0x50,0x4b,1,2,...u16(20),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(crc),...u32(sz),...u32(sz),...u16(nm.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(off),...nm]));
    off+=lh.length+sz;
  });
  const cdSize=cen.reduce((a,b)=>a+b.length,0);
  const end=new Uint8Array([0x50,0x4b,5,6,...u16(0),...u16(0),...u16(files.length),...u16(files.length),...u32(cdSize),...u32(off),...u16(0)]);
  const all=[...out,...cen,end],tot=all.reduce((a,b)=>a+b.length,0),res=new Uint8Array(tot);let p=0;
  all.forEach(a=>{res.set(a,p);p+=a.length});return res;
}
const X=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
/* اسم المعلم: من الورقة نفسها أو من المحفوظ لكل مادة */
const teacherOf=s=>{try{return (((S.cfg||{}).teachers||{})[s]||'').trim()}catch(e){return ''}};
const TCH=m=>((m.head&&m.head.teacher)||teacherOf(m.head&&m.head.subj)||'').trim();
const FONT='<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>';
function runs(t,o){
  const sz=o.sz||26,parts=String(t).split('\n');
  return '<w:r><w:rPr>'+FONT+(o.b?'<w:b/><w:bCs/>':'')+(o.clr?`<w:color w:val="${o.clr}"/>`:'')+`<w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/><w:rtl/></w:rPr>`+parts.map(x=>`<w:t xml:space="preserve">${X(x)}</w:t>`).join('<w:br/>')+'</w:r>';
}
function para(t,o){o=o||{};
  const jc=o.jc==='c'?'<w:jc w:val="center"/>':o.jc==='l'?'<w:jc w:val="right"/>':'';
  return '<w:p><w:pPr>'+(o.keep?'<w:keepNext/>':'')+(o.line?'<w:pBdr><w:bottom w:val="single" w:sz="8" w:space="1" w:color="000000"/></w:pBdr>':'')+'<w:bidi/>'
   +`<w:spacing w:before="${o.bf||0}" w:after="${o.af==null?80:o.af}"/>`+(o.ind?`<w:ind w:start="${o.ind}"/>`:'')+jc+'</w:pPr>'+(t===''?'':runs(t,o))+'</w:p>';
}
const cell=(w,inner,o)=>`<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${o&&o.shd?'<w:shd w:val="clear" w:color="auto" w:fill="E7ECF5"/>':''}</w:tcPr>${inner||para('')}</w:tc>`;
function head(m){
  const h=m.head,W=[2900,3838,2900];
  const right=para(h.school?'إدارة مدرسة '+h.school:'إدارة المدرسة: .............................',{b:1,sz:24});
  const centre=para('بسم الله الرحمن الرحيم',{b:1,sz:32,jc:'c',af:60})+para((h.etype||'امتحانات نصف السنة')+' للعام '+(h.year||'2026/2027'),{b:1,sz:24,jc:'c'});
  const left=para('الصف: '+(h.cls||'.............'),{jc:'l',b:1,sz:22,af:40})+para('المادة: '+(h.subj||'.............'),{jc:'l',b:1,sz:22,af:40})+para('الوقت: '+(h.time||'.............'),{jc:'l',b:1,sz:22,af:40});
  return '<w:tbl><w:tblPr><w:bidiVisual/><w:tblW w:w="9638" w:type="dxa"/><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>'+W.map(w=>`<w:gridCol w:w="${w}"/>`).join('')+'</w:tblGrid><w:tr>'+cell(W[0],right)+cell(W[1],centre)+cell(W[2],left)+'</w:tr></w:tbl>'+para('',{line:1,af:120});
}
function table(b){
  const T=9638,ws=b.w.map(p=>Math.round(T*p/100));
  const bd=['top','left','bottom','right','insideH','insideV'].map(s=>`<w:${s} w:val="single" w:sz="4" w:space="0" w:color="555555"/>`).join('');
  const row=(cells,hd)=>'<w:tr><w:trPr><w:cantSplit/>'+(hd?'<w:tblHeader/>':'')+'</w:trPr>'+cells.map((c,i)=>cell(ws[i],(Array.isArray(c)?c:[c]).map(x=>para(String(x),{b:hd?1:0,sz:hd?24:24,jc:hd||i===0?'c':'',af:30})).join(''),{shd:hd})).join('')+'</w:tr>';
  return '<w:tbl><w:tblPr><w:bidiVisual/><w:tblW w:w="9638" w:type="dxa"/><w:tblBorders>'+bd+'</w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>'+ws.map(w=>`<w:gridCol w:w="${w}"/>`).join('')+'</w:tblGrid>'+row(b.head,true)+b.rows.map(r=>row(r.map((c,i)=>i===2?c:c),false)).join('')+'</w:tbl>'+para('',{af:0});
}
function docXml(m){
  const body=m.body.map(b=>b.k==='t'?table(b):para(b.t,{b:b.b,ind:b.ind,bf:b.bf,af:b.af,keep:b.keep,clr:b.clr,sz:b.sz||26,jc:b.jc})).join('');
  const t=TCH(m);
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>'+head(m)+body
   +'<w:sectPr>'+(t?'<w:footerReference w:type="default" r:id="rId1"/>':'')+'<w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="850" w:right="1134" w:bottom="850" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/><w:bidi/></w:sectPr></w:body></w:document>';
}
/* الشريط السفلي: اسم المعلم على يسار الصفحة */
function footerXml(t){
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
   +para('اسم المعلم: '+t,{b:1,sz:22,jc:'l',af:0})+'</w:ftr>';
}
function docxBytes(m){
  const f=(n,s)=>({n,d:enc.encode(s)});
  const t=TCH(m);
  const files=[
    f('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'+(t?'<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>':'')+'</Types>'),
    f('_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'),
    f('word/document.xml',docXml(m))
  ];
  if(t){
    files.push(f('word/_rels/document.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>'));
    files.push(f('word/footer1.xml',footerXml(t)));
  }
  return zip(files);
}
const fname=m=>((m.name||'اسئلة')+'.docx').replace(/[\\/:*?"<>|]+/g,' ');
const blobOf=m=>new Blob([docxBytes(m)],{type:MIME});
function plain(m){
  const h=m.head,L=[];
  L.push('بسم الله الرحمن الرحيم',(h.etype||'')+' للعام '+(h.year||''),(h.school?'إدارة مدرسة '+h.school:''),'الصف: '+(h.cls||'')+' | المادة: '+(h.subj||'')+(h.time?' | الوقت: '+h.time:''),'');
  m.body.forEach(b=>{if(b.k==='t'){b.rows.forEach(r=>{L.push(r[0]+'. '+r[1]);(Array.isArray(r[2])?r[2]:[r[2]]).forEach(x=>L.push('   '+x));L.push('')})}else L.push((b.ind?'   ':'')+b.t)});
  const t=TCH(m);if(t)L.push('','اسم المعلم: '+t);
  return L.filter((x,i,a)=>!(x===''&&a[i-1]==='')).join('\n');
}
function download(m){
  const b=blobOf(m),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fname(m);document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);
}
async function share(m){
  const file=new File([blobOf(m)],fname(m),{type:MIME});
  try{
    if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:fname(m)});return}
  }catch(e){if(e&&e.name==='AbortError')return}
  download(m);
  alert('تم حفظ ملف Word على جهازك. سيفتح واتساب الآن لإرسال نص الأسئلة، ولإرسال الملف نفسه اختره من واتساب (إرفاق ثم مستند).');
  location.href='https://wa.me/?text='+encodeURIComponent(plain(m));
}
function htmlOf(m){
  const h=m.head,e=X,t=TCH(m);
  const bodyH=m.body.map(b=>{
    if(b.k==='t')return '<table class="g"><tr>'+b.head.map((x,i)=>`<th style="width:${b.w[i]}%">${e(x)}</th>`).join('')+'</tr>'+b.rows.map(r=>'<tr>'+r.map((c,i)=>`<td${i===0?' class="c"':''}>${(Array.isArray(c)?c:[c]).map(x=>e(x)).join('<br>')}</td>`).join('')+'</tr>').join('')+'</table>';
    return `<p style="${b.b?'font-weight:700;':''}${b.ind?'margin-inline-start:'+Math.round(b.ind/20*1.33)+'px;':''}${b.bf?'margin-top:'+Math.round(b.bf/15)+'px;':''}${b.clr?'color:#'+b.clr+';':''}${b.sz&&b.sz<26?'font-size:14px;':''}">${e(b.t).replace(/\n/g,'<br>')}</p>`;
  }).join('');
  return '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>'+e(m.name||'')+'</title><style>@page{size:A4;margin:14mm}*{box-sizing:border-box}body{font-family:Arial,Tahoma,sans-serif;direction:rtl;font-size:16px;color:#000;margin:0;line-height:1.7}p{margin:2px 0 6px}table.h{width:100%;border-collapse:collapse}table.h td{vertical-align:top;width:33.3%;padding:0 4px}.hl{border-bottom:2px solid #000;margin:8px 0 12px}table.g{width:100%;border-collapse:collapse;margin-top:6px}table.g th,table.g td{border:1px solid #555;padding:4px 6px;vertical-align:top}table.g th{background:#e7ecf5}table.g tr{page-break-inside:avoid}.c{text-align:center}'+(t?'.ft{position:fixed;bottom:0;left:0;font-weight:700;font-size:15px}body{padding-bottom:30px}':'')+'</style></head><body>'
   +'<table class="h"><tr><td style="text-align:right;font-weight:700">'+(h.school?'إدارة مدرسة '+e(h.school):'إدارة المدرسة: .............')+'</td><td style="text-align:center;font-weight:700"><div style="font-size:21px">بسم الله الرحمن الرحيم</div><div>'+e(h.etype||'')+' للعام '+e(h.year||'')+'</div></td><td style="text-align:left;font-weight:700">الصف: '+e(h.cls||'.........')+'<br>المادة: '+e(h.subj||'.........')+'<br>الوقت: '+e(h.time||'.........')+'</td></tr></table><div class="hl"></div>'+bodyH+(t?'<div class="ft">اسم المعلم: '+e(t)+'</div>':'')+'</body></html>';
}
function print(m){
  const w=window.open('','_blank');
  if(!w){alert('اسمح بالنوافذ المنبثقة ثم أعد المحاولة');return}
  w.document.open();w.document.write(htmlOf(m));w.document.close();
  setTimeout(()=>{try{w.focus();w.print()}catch(e){}},500);
}
window.Paper={download,share,print,docxBytes,plain,htmlOf,docXml};

/* ===== حقل «اسم المعلم» داخل صندوق ورقة الأسئلة (لكل مادة) ===== */
function injectTeacher(){
  const A=document.querySelector('#app');if(!A)return;
  const yr=A.querySelector('#pyr')||A.querySelector('#islyr');
  if(!yr||A.querySelector('#pteacher'))return;
  const qk=A.querySelector('#qk'),subj=qk?String(qk.value).split('|')[1]:'';
  if(!subj)return;
  const row=yr.closest('.row');if(!row)return;
  const d=document.createElement('div');d.className='row';
  const inp=document.createElement('input');inp.id='pteacher';inp.placeholder='اسم معلم مادة '+subj+' (يظهر أسفل الورقة على اليسار)';inp.style.flex='1';
  inp.value=teacherOf(subj);
  inp.oninput=()=>{S.cfg=S.cfg||{};S.cfg.teachers=S.cfg.teachers||{};const v=inp.value.trim();if(v)S.cfg.teachers[subj]=v;else delete S.cfg.teachers[subj];save()};
  d.appendChild(inp);row.after(d);
}
if(typeof document!=='undefined'){
  const A0=document.querySelector('#app');
  if(A0)new MutationObserver(()=>{try{injectTeacher()}catch(e){}}).observe(A0,{childList:true,subtree:true});
  try{injectTeacher()}catch(e){}
}
})();
