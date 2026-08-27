/* One More Dungeon — network-first, cache as the road home.
   Online: always fetch the newest build. Offline: serve the last one cached. */
const CACHE='omd';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(r=>{
      if(r.ok&&new URL(e.request.url).origin===location.origin){
        const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));
      }
      return r;
    }).catch(()=>caches.match(e.request,{ignoreSearch:true}))
  );
});
