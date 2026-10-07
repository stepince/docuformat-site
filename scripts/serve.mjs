// Preview server for the generated site (repo root). Serves only published files, never src/ or scripts/.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = resolve('.');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
const rootFiles = new Set(['styles.css', 'favicon.ico', 'icon.svg', 'icon-48.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'site.webmanifest', 'robots.txt', 'sitemap.xml', '404.html']);
// Published pages are <route>/index.html at the root; anything else must be an allowed root file or an asset.
const allowed = (rel) => rootFiles.has(rel) || /^assets\/[\w.-]+\.(svg|png)$/.test(rel) || /^[\w-]+\/index\.html$/.test(rel) && !/^(src|scripts|node_modules|tests)\//.test(rel);

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!path.includes('.') && !path.endsWith('/')) return void res.writeHead(301, { Location: `${path}/` }).end();
    if (path.endsWith('/')) path += 'index.html';
    const file = resolve(root, '.' + path);
    const rel = file.slice(root.length + 1);
    if (!file.startsWith(root + sep) || (rel !== 'index.html' && !allowed(rel))) throw new Error('Not found');
    const data = await readFile(file); // read first so a missing file falls through to the 404 below
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' }).end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    try { res.end(await readFile(resolve(root, '404.html'))); } catch { res.end('Not found'); }
  }
}).listen(Number(process.env.PORT || 4321), '127.0.0.1', () => console.log(`DocuFormat site: http://localhost:${process.env.PORT || 4321}`));
