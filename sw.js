// Saves every file on the phone so the app works offline.
// VERSION is replaced with the commit ID on deploy (.github/workflows/pages.yml),
// which makes phones download the new copy. Leave this line's format as is.
const VERSION = 'dev';

importScripts('sounds.js');
const FILES = ['./', 'index.html', 'sounds.js', 'manifest.json', 'icon.png',
  ...Object.values(SOUNDS).flat().map(s => s.file)];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// "bytes=start-end" header -> [start, end], or null if it can't be served.
function parseRange(header, size) {
  const m = /bytes=(\d*)-(\d*)/.exec(header);
  if (!m) return null;
  let start, end;
  if (m[1] === '') { start = Math.max(0, size - Number(m[2])); end = size - 1; }
  else { start = Number(m[1]); end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1); }
  return start <= end && start < size ? [start, end] : null;
}

self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    const cached = await caches.match(e.request, { ignoreSearch: true });
    if (!cached) return fetch(e.request);
    // iPhone Safari loads audio in byte ranges and won't play/seek a whole-file reply, so slice it.
    const range = e.request.headers.get('range');
    if (!range) return cached;
    const buf = await cached.arrayBuffer();
    const r = parseRange(range, buf.byteLength);
    if (!r) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${buf.byteLength}` } });
    const [start, end] = r;
    return new Response(buf.slice(start, end + 1), { status: 206, headers: {
      'Content-Type': cached.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`,
      'Content-Length': String(end - start + 1),
    }});
  })());
});
