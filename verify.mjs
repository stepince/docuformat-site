// Post-build SEO/integrity checks over dist/: unique titles and descriptions, one h1, canonical URLs,
// resolvable internal links, sitemap coverage, and every page reachable from the homepage.
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL } from './lib/site.mjs';

const pages = new Map();
async function walk(dir) {
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) await walk(p);
    else if (name === 'index.html') pages.set('/' + dir.slice(5).replace(/\\/g, '/') + (dir === 'dist' ? '' : '/'), await readFile(p, 'utf8'));
  }
}
await walk('dist');
const problems = [];
const seen = { title: new Map(), description: new Map() };
const links = new Map();
for (const [route, html] of pages) {
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="(.*?)">/)?.[1];
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (!title || title.length > 70) problems.push(`${route}: title missing or >70 chars (${title?.length})`);
  if (!desc || desc.length < 70 || desc.length > 175) problems.push(`${route}: description length ${desc?.length}`);
  if (h1s !== 1) problems.push(`${route}: ${h1s} h1 elements`);
  if (!html.includes(`<link rel="canonical" href="${SITE_URL}${route === '/' ? '/' : route}">`)) problems.push(`${route}: canonical mismatch`);
  for (const [k, v] of [['title', title], ['description', desc]]) {
    if (seen[k].has(v)) problems.push(`${route}: duplicate ${k} with ${seen[k].get(v)}`);
    seen[k].set(v, route);
  }
  const out = new Set();
  for (const m of html.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const h = m[1];
    if (/\.(css|svg|png|xml|txt|ico|webmanifest)$/.test(h)) continue;
    out.add(h);
    if (!pages.has(h)) problems.push(`${route}: broken internal link ${h}`);
  }
  links.set(route, out);
}
for (const f of ['favicon.ico', 'icon.svg', 'icon-48.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'site.webmanifest']) await stat(`dist/${f}`).catch(() => problems.push(`missing dist/${f}`));
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
for (const route of pages.keys()) {
  if (!sitemap.includes(`<loc>${SITE_URL}${route}</loc>`)) problems.push(`${route}: missing from sitemap`);
  if (route !== '/' && ![...links].some(([r, l]) => r !== route && l.has(route))) problems.push(`${route}: no inbound links`);
  if (route !== '/' && !links.get('/').has(route) && !links.get('/json-formatter/').has(route) && !links.get('/features/').has(route)) problems.push(`${route}: not within one hop of home/json-formatter/features`);
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`OK: ${pages.size} pages verified`);
