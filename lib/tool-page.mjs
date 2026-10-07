// Renders a tool landing page from an entry in content/tools.mjs.
import { appLink, breadcrumbLd, closingCta, editor, esc, faqList, faqLd, layout, strip } from './components.mjs';
import { FORMATS, NAME, SITE_URL } from './site.mjs';

export function renderTool(page, all) {
  const bySlug = Object.fromEntries(all.map((p) => [p.slug, p]));
  const fmt = FORMATS.find((f) => f.id === page.format);
  const path = `/${page.slug}/`;
  const related = page.related.map((s) => bySlug[s]).filter(Boolean);

  const pane = (e, which) => editor({ ...e, label: `${which} example`, badge: e.badge, badgeKind: e.badgeKind });
  const example = page.after
    ? `<div class="before-after"><div>${pane(page.before, 'Input')}</div><div class="arrow" aria-hidden="true">→</div><div>${pane(page.after, 'Output')}</div></div>`
    : `<div class="single">${pane(page.before, 'Input')}</div>`;

  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: strip(page.h1), description: page.description, url: `${SITE_URL}${path}`, isPartOf: { '@type': 'WebSite', name: NAME, url: `${SITE_URL}/` } },
    breadcrumbLd([[NAME, '/'], [page.nav, path]]),
    faqLd(page.faq)
  ];

  const body = `<article class="wrap page">
<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">${NAME}</a><span aria-hidden="true">/</span><span>${esc(page.nav)}</span></nav>
<p class="eyebrow">${esc(fmt.label)}</p>
<h1>${esc(page.h1)}</h1>
<p class="lead">${page.lead}</p>
<div class="cta-row">${appLink(page.cta)}<a class="button secondary" href="#example">See an example ↓</a></div>
<section id="example" class="example" aria-label="Example">${example}</section>
${page.sections.map((s) => `<section class="prose"><h2>${esc(s.h2)}</h2>\n${s.html}</section>`).join('\n')}
<section class="prose"><h2>Questions, answered</h2>${faqList(page.faq)}</section>
<section class="related"><h2>Keep reading</h2><ul>${related.map((r) => `<li><a href="/${r.slug}/">${esc(r.nav)}</a></li>`).join('')}<li><a href="/features/">Everything DocuFormat can do</a></li><li><a href="/privacy/">How DocuFormat handles your data</a></li></ul>
<p class="other-formats">Other formats: ${FORMATS.filter((f) => f.id !== page.format).map((f) => `<a href="/${f.slug}/">${f.label}</a>`).join(' · ')}</p></section>
</article>
${closingCta(`Try the ${fmt.label} formatter on your own input.`, 'Paste it, format it, and fix it if it is broken. No sign-up needed to try the formatter.')}`;

  return layout({ path, title: page.title, description: page.description, body, ld, ogType: 'article' });
}
