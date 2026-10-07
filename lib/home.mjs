// Homepage.
import { actionBar, appLink, closingCta, editor, esc, layout } from './components.mjs';
import { highlight } from './highlight.mjs';
import { FORMATS, NAME, SITE_URL, TAGLINE } from './site.mjs';

const MESSY = '{ "name":"DocuFormat","active":true }';
const CLEAN = '{\n  "name": "DocuFormat",\n  "active": true\n}';

const SNIPPETS = {
  json: ['json', '{"id":7,"tags":["a","b"]}'],
  yaml: ['yaml', 'server:\n   host: localhost\n  port: 8080'],
  xml: ['xml', '<item>Book</item>\n<item>Pen</order>'],
  csv: ['csv', 'name,age,city\nAda,36,London\nLinus,54'],
  sql: ['sql', 'select id,name from users\nwhere active=true'],
  curl: ['curl', "curl -X POST https://api.example.com \\\n  -H 'Content-Type: application/json'"]
};

const steps = [
  ['Paste', 'Paste JSON, YAML, XML, CSV, SQL or cURL.', 'local'],
  ['Detect', 'DocuFormat automatically determines what type of input you’re working with.', 'local'],
  ['Format & Validate', 'Pretty-print the content and identify syntax problems using deterministic parsers.', 'local'],
  ['Fix', 'When the input is malformed, use AI-assisted repair to produce a corrected version.', 'ai'],
  ['Explain', 'Understand what went wrong, what changed, or what the input does.', 'ai']
];

const formatCard = (f) => {
  const [lang, code] = SNIPPETS[f.id];
  return `<article class="card${f.id === 'curl' ? ' featured' : ''}">
<h3>${f.label}</h3>
<p>${f.blurb}</p>
<pre class="code mini" aria-hidden="true"><code>${highlight(code, lang)}</code></pre>
<a class="more" href="/${f.slug}/">${f.cta}</a>
</article>`;
};

export function renderHome() {
  const hero = `<section class="hero"><div class="wrap hero-grid">
<div class="hero-copy">
<p class="eyebrow">DEVELOPER TOOL</p>
<h1>Format. Validate. Fix. Explain.</h1>
<p class="lead">Format and troubleshoot JSON, YAML, XML, CSV, SQL and cURL from one developer-friendly tool.</p>
<p class="sub">Automatically detect your input, pretty-print it, validate it, and use AI to repair or explain problems when needed.</p>
<div class="cta-row">${appLink('Try DocuFormat →')}<a class="button secondary" href="#how-it-works">See How It Works</a></div>
<p class="fine">No sign-up needed to try the formatter.</p>
</div>
<div class="hero-visual" role="group" aria-label="DocuFormat editor: messy JSON on the left, detected as JSON and formatted on the right">
<div class="app-window">
${actionBar('Format')}
<div class="panes">
<div class="pane"><p class="pane-label">Input</p><pre class="code" tabindex="0"><code>${highlight(MESSY, 'json')}</code></pre></div>
<div class="pane"><p class="pane-label">Output <span class="chip ok">Detected: JSON ✓</span></p><pre class="code" tabindex="0"><code>${highlight(CLEAN, 'json')}</code></pre></div>
</div>
<div class="editor-foot ok">✓ Valid JSON</div>
</div>
</div>
</div></section>
<section class="strip" aria-label="Supported formats"><div class="wrap"><span>Supports</span>${FORMATS.map((f) => `<a href="/${f.slug}/">${f.label}</a>`).join('')}</div></section>`;

  const how = `<section id="how-it-works" class="section"><div class="wrap">
<p class="eyebrow">HOW IT WORKS</p>
<h2>From pasted mess to clean, valid output.</h2>
<ol class="flow" aria-label="Workflow">${['Paste', 'Detect', 'Format', 'Validate', 'Fix', 'Explain'].map((s, i) => `<li class="${i > 3 ? 'ai' : ''}">${s}</li>`).join('<li class="sep" aria-hidden="true">→</li>')}</ol>
<ol class="steps">${steps.map(([t, d, k], i) => `<li class="step"><span class="num">${i + 1}</span><h3>${t}</h3><p>${d}</p><span class="tag ${k}">${k === 'local' ? 'Deterministic · local' : 'AI · only when you ask'}</span></li>`).join('')}</ol>
</div></section>`;

  const formats = `<section id="formats" class="section alt"><div class="wrap">
<p class="eyebrow">FORMATS</p>
<h2>Six formats. One place to clean them up.</h2>
<div class="cards">${[FORMATS[5], ...FORMATS.slice(0, 5)].map(formatCard).join('')}</div>
</div></section>`;

  const aiFix = `<section id="ai-fix" class="section"><div class="wrap">
<p class="eyebrow">AI FIX</p>
<h2>When formatting isn’t enough.</h2>
<p class="lead">Traditional formatters work when the input is already valid. DocuFormat should help when it isn’t.</p>
<div class="fix-grid">
${editor({ file: 'broken.json', lang: 'json', code: '{\n  «name»: "Steve"«\n»  active: true«,»\n}', badge: 'Detected: JSON ✗', badgeKind: 'bad', foot: '✗ Invalid JSON · 3 problems found', footKind: 'bad', label: 'Malformed JSON' })}
<div class="arrow" aria-hidden="true"><span class="act ai on">AI Fix</span>→</div>
<div>
${editor({ file: 'suggested.json', lang: 'json', code: '{\n  "name": "Steve",\n  "active": true\n}', badge: 'AI suggestion — not applied', badgeKind: 'ai', foot: '✓ Passes local re-validation', label: 'AI-suggested JSON' })}
<div class="changes"><h3>What changed</h3><ul><li>Added quotes around the property names</li><li>Added missing comma</li><li>Removed trailing comma</li></ul></div>
</div>
</div>
<p class="callout">DocuFormat doesn’t just tell you something is broken. It can help you fix it.</p>
<p class="note">AI Fix never runs on its own. You click it, confirm that your content will go to an AI provider, review the suggestion, and only then choose to use it. <a href="/ai-json-fixer/">How AI Fix works →</a> · <a href="/json-fixer/">Fix My Input →</a></p>
</div></section>`;

  const split = `<section id="deterministic" class="section alt"><div class="wrap">
<p class="eyebrow">ARCHITECTURE</p>
<h2>AI when you need it. Deterministic when you don’t.</h2>
<p class="lead">Formatting should not require an LLM. Validation should not require an LLM. Format detection should not require an LLM. DocuFormat uses deterministic tools for routine operations and AI only where reasoning adds value.</p>
<div class="two">
<div class="panel"><h3><span class="dot local"></span>Deterministic</h3><p class="muted">Runs in your browser. Same input, same output.</p><ul class="ticks"><li>Format</li><li>Pretty print</li><li>Minify</li><li>Parse</li><li>Validate</li><li>Detect format</li></ul></div>
<div class="panel ai"><h3><span class="dot ai"></span>AI-assisted</h3><p class="muted">Runs only when you click it.</p><ul class="ticks"><li>Fix malformed input</li><li>Explain errors</li><li>Explain complex SQL</li><li>Repair cURL</li><li>Describe what changed</li></ul></div>
</div>
</div></section>`;

  const curlCmd = `curl -X POST https://api.example.com/users \\\n  -H "Authorization: Bearer YOUR_TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d '{"name":"Steve","active":true}'`;
  const curl = `<section id="curl" class="section"><div class="wrap">
<p class="eyebrow">cURL</p>
<h2>Make cURL readable.</h2>
<p class="lead">Stop decoding long cURL commands by eye.</p>
<div class="curl-grid">
${editor({ file: 'command.sh', lang: 'curl', code: curlCmd, badge: 'Detected: cURL ✓', label: 'cURL command' })}
<div class="arrow" aria-hidden="true">→</div>
<figure class="editor request" role="group" aria-label="Parsed request">
<figcaption class="editor-bar"><span class="editor-file">Request</span><span class="chip ok">Parsed locally</span></figcaption>
<div class="req">
<p><span class="method">POST</span> <span class="url">https://api.example.com/users</span></p>
<h4>Headers</h4>
<dl><dt>Content-Type</dt><dd>application/json</dd><dt>Authorization</dt><dd>Bearer YOUR_TOKEN</dd></dl>
<h4>Body</h4>
<pre class="code mini"><code>${highlight('{\n  "name": "Steve",\n  "active": true\n}', 'json')}</code></pre>
</div>
</figure>
</div>
<ul class="chips"><li>Method</li><li>URL</li><li>Headers</li><li>Query parameters</li><li>Authentication</li><li>Request body</li></ul>
<div class="cta-row">${appLink('Format cURL →')}<a class="button secondary" href="/curl-parser/">How the parser works</a><a class="button secondary" href="/curl-explainer/">Explain a cURL command</a></div>
</div></section>`;

  const privacy = `<section id="privacy" class="section alt"><div class="wrap">
<p class="eyebrow">PRIVACY</p>
<h2>Your developer data deserves careful handling.</h2>
<p class="lead">Developer input often includes tokens, hostnames and customer data. So the routine work (parsing, validating, formatting and detecting) happens locally, and AI only sees content after you choose an AI feature.</p>
<ul class="grid-list">
<li><strong>No AI required for basic formatting</strong></li>
<li><strong>No AI required for validation</strong></li>
<li><strong>No AI required for format detection</strong></li>
<li><strong>AI actions are explicit</strong><span>Sent only after you click AI Fix or Explain.</span></li>
<li><strong>SQL is never executed</strong><span>Parsed as text only.</span></li>
<li><strong>cURL is never executed</strong><span>No request is ever made.</span></li>
</ul>
<p class="note">Used with care: when you do use AI, your content passes through DocuFormat’s server to an AI provider, so remove secrets first. <a href="/privacy/">Read the details →</a></p>
</div></section>`;

  const body = hero + how + formats + aiFix + split + curl + privacy +
    closingCta('Format. Validate. Fix. Explain.', 'Paste your input and see what DocuFormat makes of it. No sign-up needed to try the formatter.');

  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: NAME, url: `${SITE_URL}/`, description: TAGLINE },
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: NAME, applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', url: `${SITE_URL}/`, description: 'Formats, validates, fixes and explains JSON, YAML, XML, CSV, SQL and cURL.' }
  ];
  return layout({
    path: '/',
    title: 'DocuFormat: Format, Validate, Fix and Explain Developer Data',
    description: 'DocuFormat formats, validates, fixes and explains JSON, YAML, XML, CSV, SQL and cURL. Deterministic parsing for routine work; optional AI repair when your input is broken.',
    body,
    ld
  });
}
