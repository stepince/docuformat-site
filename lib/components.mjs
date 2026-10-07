// Reusable page components. Each returns an HTML string.
import { highlight } from './highlight.mjs';
import { APP_LINK_ATTR, APP_URL, DEFAULT_DESCRIPTION, LIVE, FORMATS, NAME, PRODUCT_LINKS, RESOURCE_LINKS, SITE_URL, TAGLINE } from './site.mjs';

export const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export const strip = (s) => s.replace(/<[^>]+>/g, '');
const json = (o) => JSON.stringify(o).replaceAll('<', '\\u003c');

/** Link to the DocuFormat application. */
export const appLink = (label = 'Try DocuFormat →', cls = 'button') =>
  LIVE ? `<a class="${cls}" href="${esc(APP_URL)}" ${APP_LINK_ATTR}>${esc(label)}</a>` : `<a class="${cls}" href="/coming-soon/">Coming soon ↗</a>`;
/** Sentence about trying the app; empty until the app is live. */
export const tryNote = LIVE ? 'No sign-up needed to try the formatter.' : '';
export const textLink = (label, href, cls = 'button secondary') => `<a class="${cls}" href="${href}">${esc(label)}</a>`;

/** Code-editor window. `lang` drives highlighting; `code` may use «…» error markers. */
export function editor({ file, lang, code, badge, badgeKind = '', foot, footKind = 'ok', label }) {
  return `<figure class="editor" role="group" aria-label="${esc(label || `${file} example`)}">
<figcaption class="editor-bar"><span class="editor-file">${esc(file)}</span>${badge ? `<span class="chip ${badgeKind}">${badge}</span>` : ''}</figcaption>
<pre class="code" tabindex="0"><code>${highlight(code, lang)}</code></pre>${foot ? `\n<div class="editor-foot ${footKind}">${foot}</div>` : ''}
</figure>`;
}

/** The four actions shown in the app's toolbar. Decorative in marketing visuals. */
export const actionBar = (active = 'Format') =>
  `<div class="actions" aria-hidden="true">${['Format', 'Validate', 'AI Fix', 'Explain'].map((a) => `<span class="act${a === active ? ' on' : ''}${a === 'AI Fix' || a === 'Explain' ? ' ai' : ''}">${a}</span>`).join('')}</div>`;

export function header() {
  return `<header class="site-header">
<div class="wrap bar">
<a class="brand" href="/" aria-label="${NAME} home"><span class="logo" aria-hidden="true">{ }</span>${NAME}</a>
<nav class="nav" aria-label="Main">
<details class="menu"><summary>Formats</summary><div class="menu-panel">${FORMATS.map((f) => `<a href="/${f.slug}/">${f.label}</a>`).join('')}</div></details>
<a href="/features/">Features</a>
<a href="/privacy/">Privacy</a>
</nav>
${appLink('Try DocuFormat →', 'button small')}
</div>
</header>`;
}

export function footer() {
  const col = (title, links) => `<div><h2>${title}</h2><ul>${links.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`;
  return `<footer class="site-footer">
<div class="wrap foot">
<div class="foot-brand"><a class="brand" href="/"><span class="logo" aria-hidden="true">{ }</span>${NAME}</a><p>${TAGLINE}</p></div>
${col('Product', PRODUCT_LINKS)}
${col('Formats', FORMATS.map((f) => [`${f.label} Formatter`, `/${f.slug}/`]))}
${col('Resources', RESOURCE_LINKS)}
</div>
<div class="wrap legal"><span>© 2026 ${NAME}</span></div>
</footer>`;
}

/** Closing call-to-action band. */
export const closingCta = (title = 'Paste it. Fix it. Move on.', text = tryNote || 'DocuFormat is not open to the public yet.') =>
  `<section class="closing"><div class="wrap"><h2>${esc(title)}</h2><p>${esc(text)}</p><div class="cta-row">${appLink('Try DocuFormat →')}</div></div></section>`;

/** Complete HTML document with SEO and social metadata. */
export function layout({ path, title, description = DEFAULT_DESCRIPTION, body, ld = [], ogType = 'website', noindex = false }) {
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}/assets/social.png`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : ''}<meta name="theme-color" content="#0d1117">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${NAME}. ${TAGLINE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<link rel="stylesheet" href="/styles.css">
${ld.map((o) => `<script type="application/ld+json">${json(o)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header()}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
}

export const breadcrumbLd = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE_URL}${path}` }))
});

export const faqLd = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } }))
});

export const faqList = (faq) => `<div class="faq-list">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join('')}</div>`;
