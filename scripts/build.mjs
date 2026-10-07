// Static build. Renders every page to the repository root (<route>/index.html, 404.html, sitemap.xml,
// robots.txt, CNAME), where GitHub Pages serves it from `main`. Commit the generated files.
// No runtime dependencies. Run from the repo root: `npm run build`.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { tools } from '../src/content/tools.mjs';
import { renderHome } from '../src/home.mjs';
import { about, comingSoon, features, notFound, privacy } from '../src/info-pages.mjs';
import { APP_URL, LIVE, SITE_URL } from '../src/site.mjs';
import { renderTool } from '../src/tool-page.mjs';

const appUrl = LIVE ? new URL(APP_URL) : null;
if (appUrl && appUrl.protocol !== 'https:' && !(appUrl.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(appUrl.hostname))) {
  throw new Error('DOCUFORMAT_APP_URL must use HTTPS (or HTTP on localhost).');
}

/** route -> HTML. Routes use trailing slashes; GitHub Pages redirects /route to /route/. */
const routes = new Map([
  ['/', renderHome()],
  ['/features/', features()],
  ['/privacy/', privacy()],
  ['/about/', about()],
  ['/coming-soon/', comingSoon()],
  ...tools.map((t) => [`/${t.slug}/`, renderTool(t, tools)])
]);

for (const [route, html] of routes) {
  const file = join('.', route, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
await writeFile('404.html', notFound());

const priority = (r) => (r === '/' ? '1.0' : tools.some((t) => `/${t.slug}/` === r) ? '0.8' : '0.5');
await writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...routes.keys()].map((r) => `  <url><loc>${SITE_URL}${r}</loc><priority>${priority(r)}</priority></url>`).join('\n')}
</urlset>
`);
await writeFile('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await writeFile('CNAME', new URL(SITE_URL).hostname + '\n'); // GitHub Pages custom domain
await writeFile('.nojekyll', '');
console.log(`Built ${routes.size} pages at the repo root`);
