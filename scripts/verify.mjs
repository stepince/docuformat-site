// Post-build SEO/integrity checks over the generated site at the repo root: unique titles and descriptions,
// one h1, canonicals, resolvable internal links, sitemap coverage, and every page reachable from the homepage.
import { readFile, stat } from 'node:fs/promises';
import { tools } from '../src/content/tools.mjs';
import { SITE_URL } from '../src/site.mjs';

// The sitemap defines the published routes; every one must exist as <route>/index.html at the repo root.
const pages = new Map();
const sitemap = await readFile('sitemap.xml', 'utf8');
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(SITE_URL, ''));
const problems = [];
for (const r of routes) {
  try { pages.set(r, await readFile(`.${r}index.html`, 'utf8')); } catch { problems.push(`${r}: sitemap lists a page that was not built`); }
}
for (const t of tools) if (!routes.includes(`/${t.slug}/`)) problems.push(`/${t.slug}/: tool page missing from sitemap`);
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
for (const f of ['favicon.ico', 'icon.svg', 'icon-48.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'site.webmanifest', 'styles.css', '404.html', 'CNAME', '.nojekyll', 'robots.txt']) await stat(f).catch(() => problems.push(`missing ${f}`));
for (const route of pages.keys()) {
  if (!sitemap.includes(`<loc>${SITE_URL}${route}</loc>`)) problems.push(`${route}: missing from sitemap`);
  if (route !== '/' && ![...links].some(([r, l]) => r !== route && l.has(route))) problems.push(`${route}: no inbound links`);
  if (route !== '/' && !links.get('/').has(route) && !links.get('/json-formatter/').has(route) && !links.get('/features/').has(route)) problems.push(`${route}: not within one hop of home/json-formatter/features`);
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`OK: ${pages.size} pages verified`);
