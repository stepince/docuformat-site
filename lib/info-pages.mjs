// Features, Privacy, About and 404 pages.
import { appLink, breadcrumbLd, closingCta, esc, faqLd, faqList, layout } from './components.mjs';
import { tools } from '../content/tools.mjs';
import { FORMATS, NAME, SITE_URL } from './site.mjs';

const shell = ({ path, nav, eyebrow, h1, lead, sections, faq, cta = true, title, description }) => {
  const body = `<article class="wrap page">
<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">${NAME}</a><span aria-hidden="true">/</span><span>${esc(nav)}</span></nav>
<p class="eyebrow">${esc(eyebrow)}</p>
<h1>${esc(h1)}</h1>
<p class="lead">${lead}</p>
${cta ? `<div class="cta-row">${appLink('Try DocuFormat →')}</div>` : ''}
${sections.map((s) => `<section class="prose"><h2>${esc(s.h2)}</h2>\n${s.html}</section>`).join('\n')}
${faq ? `<section class="prose"><h2>Questions, answered</h2>${faqList(faq)}</section>` : ''}
</article>
${closingCta()}`;
  const ld = [{ '@context': 'https://schema.org', '@type': 'WebPage', name: h1, description, url: `${SITE_URL}${path}` }, breadcrumbLd([[NAME, '/'], [nav, path]])];
  if (faq) ld.push(faqLd(faq));
  return layout({ path, title, description, body, ld });
};

const formatLinks = `<ul class="link-list">${FORMATS.map((f) => `<li><a href="/${f.slug}/">${f.label} formatter</a>: ${f.blurb}</li>`).join('')}</ul>`;

export const features = () => shell({
  path: '/features/',
  nav: 'Features',
  eyebrow: 'FEATURES',
  h1: 'What DocuFormat does',
  title: 'DocuFormat Features: Detect, Format, Validate, Fix, Explain',
  description: 'Everything DocuFormat does: automatic format detection, formatting, minifying, validation with line numbers, table and request views, and optional AI Fix and Explain.',
  lead: 'DocuFormat is a single workspace for the structured text developers paste all day. Routine operations are deterministic and run locally. AI is a separate, explicit step.',
  sections: [
    { h2: 'Deterministic tools', html: `<ul>
<li><strong>Automatic format detection.</strong> Paste anything; DocuFormat identifies JSON, YAML, XML, CSV, SQL or cURL, or you can pick the language yourself.</li>
<li><strong>Format.</strong> Consistent indentation and layout for every supported format.</li>
<li><strong>Minify.</strong> Available for JSON, XML, SQL and cURL.</li>
<li><strong>Validate.</strong> Live checks as you type, with errors highlighted by line and column.</li>
<li><strong>Table view.</strong> CSV shown as a table, with the detected delimiter and uneven rows flagged.</li>
<li><strong>Request view.</strong> cURL broken into method, URL, query parameters, headers, authentication, cookies and body.</li>
<li><strong>SQL dialects.</strong> Generic, PostgreSQL, MySQL, SQL Server, Oracle and SQLite.</li>
<li><strong>Copy, download, swap and reset.</strong> Move output back into the input to keep iterating.</li>
<li><strong>Samples and shortcuts.</strong> Load a sample for each format; ⌘/Ctrl+Enter formats and ⌘/Ctrl+Shift+Enter validates.</li>
</ul>` },
    { h2: 'AI-assisted tools', html: `<ul>
<li><strong>AI Fix.</strong> Proposes a corrected version of malformed input, with an explanation and a list of problems found. The suggestion is re-validated locally and is not applied until you accept it.</li>
<li><strong>Explain.</strong> Describes what is wrong with invalid input, what a SQL query does, or what request a cURL command would send, and can describe what changed after a fix.</li>
</ul>
<p>Both run only when you click them, after a first-time confirmation that your content will go to an AI provider. Read <a href="/privacy/">how data is handled</a>.</p>` },
    { h2: 'Format by format', html: formatLinks },
    { h2: 'All tool pages', html: `<ul class="link-list">${tools.map((t) => `<li><a href="/${t.slug}/">${t.nav}</a></li>`).join('')}</ul>` },
    { h2: 'What DocuFormat does not do', html: `<ul><li>It does not execute SQL or cURL commands, or connect to a database.</li><li>It does not validate against schemas (JSON Schema, XSD, DTD) or against a specific tool’s configuration format.</li><li>It does not convert cURL to other languages.</li><li>It does not require an account to try the formatter.</li></ul>` }
  ]
});

export const privacy = () => shell({
  path: '/privacy/',
  nav: 'Privacy',
  eyebrow: 'PRIVACY',
  h1: 'Your developer data deserves careful handling',
  title: 'Privacy: How DocuFormat Handles Your Developer Data',
  description: 'What runs locally, what is sent to an AI provider and when. Formatting, validation and detection are deterministic; AI is used only after you click AI Fix or Explain.',
  lead: 'Pasted JSON, SQL and cURL often contain tokens, hostnames and customer data. This page describes exactly what DocuFormat does with it.',
  sections: [
    { h2: 'What happens without AI', html: `<p>Format detection, parsing, validation, formatting and minifying are implemented as deterministic code that runs in your browser. No AI is involved in any of them, and using them does not send your input to an AI provider.</p>
<p>SQL and cURL are treated as text. DocuFormat never executes a pasted SQL statement and never runs a pasted cURL command or makes the request it describes.</p>` },
    { h2: 'What happens when you use AI', html: `<ul>
<li>AI only runs when you click <strong>AI Fix</strong> or <strong>Explain</strong>.</li>
<li>The first time in a session, DocuFormat shows a notice that your content will be sent to an external AI provider and asks you to confirm.</li>
<li>The request goes from your browser to DocuFormat’s server, which forwards it to the AI provider (currently Anthropic). Your content, the format, any local validation messages and, for SQL, the chosen dialect are included.</li>
<li>Secrets are <strong>not</strong> redacted. Remove tokens, passwords and keys before using an AI action.</li>
<li>AI requests are limited to 512 KB.</li>
</ul>` },
    { h2: 'What the server records', html: `<p>DocuFormat’s server is built so that, for AI requests, it logs only the method, route, response status, duration and the size of the request body. Request bodies, headers and upstream error bodies are not logged. Error messages returned to the browser do not echo your content.</p>
<p>What the AI provider does with data it receives is governed by that provider’s own terms and policies.</p>` },
    { h2: 'This website', html: `<p>This marketing site is static pages. It sets no cookies, loads no third-party scripts and includes no analytics.</p>` }
  ],
  faq: [
    ['Does my data ever leave my browser?', 'Not for formatting, validation, minifying or format detection. It leaves your browser for an AI provider only after you click AI Fix or Explain.'],
    ['Does DocuFormat run my SQL or cURL?', 'No. They are parsed as text only.'],
    ['Can I use DocuFormat without AI?', 'Yes. Everything except AI Fix and Explain works without it.']
  ]
});

export const about = () => shell({
  path: '/about/',
  nav: 'About',
  eyebrow: 'ABOUT',
  h1: 'About DocuFormat',
  title: 'About DocuFormat: A Practical Developer Utility',
  description: 'DocuFormat is a developer utility for formatting, validating, fixing and explaining JSON, YAML, XML, CSV, SQL and cURL: deterministic where possible, AI where it helps.',
  lead: 'DocuFormat exists for the moment you paste something messy and just need it to be clean, valid and understandable.',
  sections: [
    { h2: 'The idea', html: `<p>Developers constantly handle structured text: API responses, config files, exports, queries, and commands copied from somewhere else. Formatters handle the easy case, when the input is already valid. DocuFormat is built for the other case too.</p>
<p>Its guiding rule: <strong>use deterministic tools when possible, and use AI when needed.</strong> Parsers are reliable and fast, so they do the routine work. AI is kept for tasks that call for reasoning: repairing malformed input and explaining it.</p>` },
    { h2: 'What it covers', html: formatLinks },
    { h2: 'How it is meant to be used', html: `<p>Open it, paste, and go. There is no account to create before trying the formatter. If you want to know what happens to your data, <a href="/privacy/">the privacy page</a> is specific about it, and <a href="/features/">the features page</a> lists what DocuFormat does and does not do.</p>` }
  ]
});

export const notFound = () => layout({
  path: '/404.html',
  title: 'Page not found | DocuFormat',
  description: 'This page could not be found.',
  noindex: true,
  body: `<div class="wrap page"><p class="eyebrow">404</p><h1>Page not found</h1><p class="lead">That page does not exist. Try one of the formatters instead.</p>${formatLinks}<div class="cta-row">${appLink('Try DocuFormat →')}</div></div>`
});
