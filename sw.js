const C='reg-v3',V='10.14.1',FB=['app','auth','firestore'].map(n=>'https://www.gstatic.com/firebasejs/'+V+'/firebase-'+n+'.js');
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{
  await Promise.all(['./','index.html','manifest.json','icon-192.png','icon-512.png'].map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})));
  await Promise.all(FB.map(u=>c.add(new Request(u,{mode:'cors'})).catch(()=>{})));
}));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  if(u.hostname==='www.gstatic.com'&&u.pathname.startsWith('/firebasejs/')){
    e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok){const k=x.clone();caches.open(C).then(c=>c.put(r,k))}return x})));return;
  }
  if(u.origin!==location.origin)return;
  const net=()=>fetch(r,{cache:'no-store'}).then(x=>{if(x.ok){const k=x.clone();caches.open(C).then(c=>c.put(r,k))}return x});
  const isDoc=r.mode==='navigate'||/(\/|index\.html)$/.test(u.pathname);
  if(isDoc){
    e.respondWith(new Promise(res=>{
      let done=false;const fin=x=>{if(!done&&x){done=true;res(x)}};
      const fb=()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('index.html'));
      const t=setTimeout(()=>fb().then(fin),2500);
      net().then(x=>{clearTimeout(t);fin(x)}).catch(()=>{clearTimeout(t);fb().then(h=>fin(h||Response.error()))});
    }));return;
  }
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>{
    const n=net().catch(()=>h);
    return h||n;
  }));
});
