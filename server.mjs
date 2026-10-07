// Tiny static preview server for dist/. Run `npm run build` first (or `npm run dev`, which does both).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = resolve('dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
// In dev, point "Try DocuFormat" at the local app (vite dev server) unless previewing production output.
const devApp = process.env.SERVE_DIST === '1' ? null : process.env.DOCUFORMAT_DEV_APP || 'http://localhost:5173/';

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!path.includes('.') && !path.endsWith('/')) return void res.writeHead(301, { Location: `${path}/` }).end();
    if (path.endsWith('/')) path += 'index.html';
    const file = resolve(root, '.' + path);
    if (!file.startsWith(root + sep)) throw new Error('Not found');
    let data = await readFile(file);
    if (devApp && file.endsWith('.html')) data = Buffer.from(data.toString().replace(/href="[^"]*" data-app-link/g, `href="${devApp}" data-app-link`));
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' }).end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    try { res.end(await readFile(resolve(root, '404.html'))); } catch { res.end('Not found'); }
  }
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`DocuFormat site: http://localhost:${process.env.PORT || 3000}`));
