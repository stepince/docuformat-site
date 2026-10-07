// Static build: renders every page to dist/<route>/index.html. No runtime dependencies.
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { tools } from './content/tools.mjs';
import { renderHome } from './lib/home.mjs';
import { about, features, notFound, privacy } from './lib/info-pages.mjs';
import { APP_URL, SITE_URL } from './lib/site.mjs';
import { renderTool } from './lib/tool-page.mjs';

const appUrl = new URL(APP_URL);
if (appUrl.protocol !== 'https:' && !(appUrl.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(appUrl.hostname))) {
  throw new Error('DOCUFORMAT_APP_URL must use HTTPS (or HTTP on localhost).');
}

/** route -> HTML. Routes use trailing slashes; hosts should redirect /route to /route/. */
export const routes = new Map([
  ['/', renderHome()],
  ['/features/', features()],
  ['/privacy/', privacy()],
  ['/about/', about()],
  ...tools.map((t) => [`/${t.slug}/`, renderTool(t, tools)])
]);

await rm('dist', { recursive: true, force: true });
for (const [route, html] of routes) {
  const file = join('dist', route, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
await writeFile('dist/404.html', notFound());
await cp('styles.css', 'dist/styles.css');
await cp('assets', 'dist/assets', { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === '/' ? '1.0' : tools.some((t) => `/${t.slug}/` === r) ? '0.8' : '0.5');
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...routes.keys()].map((r) => `  <url><loc>${SITE_URL}${r}</loc><lastmod>${today}</lastmod><priority>${priority(r)}</priority></url>`).join('\n')}
</urlset>
`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`Built ${routes.size} pages in dist/`);
