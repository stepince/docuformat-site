// Content for the 14 tool landing pages. Rendered by build.mjs (lib/tool-page.mjs).
// Claims are limited to what the application does today (see README, "Verified behavior").
// «…» inside example code marks an error span.

import { shellPage } from './shell.mjs';

const ex = (file, lang, code, extra = {}) => ({ file, lang, code, ...extra });

export const tools = [
  // ───────────────────────── JSON ─────────────────────────
  {
    slug: 'json-formatter',
    format: 'json',
    nav: 'JSON Formatter',
    title: 'JSON Formatter & Beautifier: Format JSON Online | DocuFormat',
    description: 'Format JSON online: pretty-print, beautify or minify JSON and validate it as you go. Runs deterministically in your browser, with optional AI repair when the JSON is broken.',
    h1: 'JSON formatter and pretty printer',
    lead: 'Paste minified or messy JSON and get readable, consistently indented output. DocuFormat validates as it formats, so you know right away whether the document is actually valid.',
    cta: 'Format JSON →',
    before: ex('input.json', 'json', '{"name":"DocuFormat","active":true,"formats":["json","yaml","xml"],"limits":{"maxMb":0.5,"retries":3}}', { badge: 'Detected: JSON ✓' }),
    after: ex('output.json', 'json', '{\n  "name": "DocuFormat",\n  "active": true,\n  "formats": [\n    "json",\n    "yaml",\n    "xml"\n  ],\n  "limits": {\n    "maxMb": 0.5,\n    "retries": 3\n  }\n}', { foot: '✓ Valid JSON · formatted locally' }),
    sections: [
      { h2: 'What the JSON formatter does', html: `<p>Formatting turns a single line of compact JSON into an indented structure where every object and array is easy to scan. DocuFormat uses two-space indentation and keeps your key order exactly as written.</p>
<p>Because formatting is done by a real parser rather than a language model, the result is predictable: the same input always gives the same output, and the data itself never changes, only the whitespace around it.</p>` },
      { h2: 'Pretty print, beautify, or minify', html: `<p>“Pretty printing” and “beautifying” are the same operation under two names: add line breaks and indentation. Minifying is the reverse. It strips optional whitespace so the payload is as small as it can be, which is handy for config values, query strings and test fixtures.</p>
<p>Both directions are available from the same input. Format to read it, minify to ship it, then use <strong>Swap</strong> to move the output back into the input if you want to keep working on it.</p>` },
      { h2: 'Strict JSON, not “JSON-ish”', html: `<p>The formatter follows the JSON specification. It will not quietly accept things that other tools tolerate but real parsers reject:</p>
<ul><li>comments (<code>//</code> or <code>/* */</code>)</li><li>trailing commas after the last item</li><li>unquoted property names</li><li>single-quoted strings</li></ul>
<p>When any of these show up, formatting stops and DocuFormat reports the problem with a line and column. That is usually exactly what you need when a service is returning a 400 for your payload. See the <a href="/json-validator/">JSON validator</a> for how errors are reported, or the <a href="/json-fixer/">JSON fixer</a> for repairing them.</p>` },
      { h2: 'When to use it', html: `<ul><li>Reading an API response copied from logs, a terminal or browser dev tools.</li><li>Cleaning up a config file before a code review.</li><li>Checking that a hand-edited fixture is still valid.</li><li>Shrinking a pretty-printed document before embedding it somewhere.</li></ul>` }
    ],
    faq: [
      ['Is my JSON sent to a server when I format it?', 'No. Format detection, parsing, validation and formatting run in your browser. Content is only sent to an AI provider if you explicitly click AI Fix or Explain.'],
      ['What indentation does it use?', 'Two spaces.'],
      ['Can it format JSON with comments?', 'No. Comments are not part of JSON, so the formatter reports them as errors rather than silently dropping them. AI Fix can remove them if you ask.'],
      ['Does formatting change my data?', 'No. Only whitespace changes. Key order and values are preserved.'],
      ['Can it minify JSON?', 'Yes. Use Minify to remove all optional whitespace.']
    ],
    related: ['json-validator', 'json-fixer', 'ai-json-fixer', 'curl-formatter']
  },
  {
    slug: 'json-validator',
    format: 'json',
    nav: 'JSON Validator',
    title: 'JSON Validator: Find Syntax Errors with Line Numbers | DocuFormat',
    description: 'Validate JSON and see exactly where it breaks. DocuFormat checks strict JSON syntax locally and reports errors with line and column, then lets you format or fix the result.',
    h1: 'JSON validator',
    lead: 'Check whether a document is valid JSON and find the exact line where it stops being valid. Validation happens as you type, using a deterministic parser instead of a guess.',
    cta: 'Validate JSON →',
    before: ex('payload.json', 'json', '{\n  "id": 42,\n  "tags": ["a", "b"]«,»\n}', { badge: 'Detected: JSON ✓', foot: '✗ 1 error · line 4: Trailing comma is not allowed in JSON', footKind: 'bad' }),
    after: null,
    sections: [
      { h2: 'Validation you can act on', html: `<p>A bare “invalid JSON” message does not help much. DocuFormat points to a position, labels the error, and highlights the line in the editor so you can fix it in place. The checker reports up to twenty distinct problems, so you can often fix several in one pass.</p>` },
      { h2: 'The mistakes that break JSON most often', html: `<table class="table"><thead><tr><th>Mistake</th><th>Why it is invalid</th></tr></thead><tbody>
<tr><td><code>{"a": 1,}</code></td><td>Trailing commas are not allowed.</td></tr>
<tr><td><code>{name: "x"}</code></td><td>Property names must be double-quoted strings.</td></tr>
<tr><td><code>{'a': 'b'}</code></td><td>Strings must use double quotes.</td></tr>
<tr><td><code>{"a": 1 "b": 2}</code></td><td>A comma is missing between members.</td></tr>
<tr><td><code>{"a": undefined}</code></td><td><code>undefined</code> is not a JSON value; use <code>null</code> or omit the key.</td></tr>
<tr><td><code>// note</code></td><td>JSON has no comment syntax.</td></tr></tbody></table>` },
      { h2: 'Validation without AI', html: `<p>Checking syntax is a solved problem, so DocuFormat does not ask a model to do it. Validation is deterministic and local. The same input always gives the same verdict, and nothing is uploaded.</p>
<p>If the document turns out to be broken and the cause isn’t obvious, you can then choose to ask AI to propose a repair. See the <a href="/json-fixer/">JSON fixer</a>.</p>` },
      { h2: 'Validate, then format', html: `<p>A valid document can go straight to the <a href="/json-formatter/">JSON formatter</a> to be pretty-printed. If you only need a yes or no, use Validate: you get a clear “valid” result or the list of problems, and your input is left untouched.</p>` }
    ],
    faq: [
      ['Does it validate against a JSON Schema?', 'No. DocuFormat checks that the text is syntactically valid JSON. It does not check your data against a schema.'],
      ['Why does my JSON with comments fail?', 'Strict JSON has no comments. Editors that accept them are usually reading a superset such as JSONC.'],
      ['Is validation done by AI?', 'No. Validation is a local, deterministic parse. AI is only involved if you click AI Fix or Explain.'],
      ['What is the maximum size?', 'Local validation has no server limit because it runs in your browser. AI requests are limited to 512 KB of input.']
    ],
    related: ['json-formatter', 'json-fixer', 'ai-json-fixer', 'yaml-validator']
  },
  {
    slug: 'json-fixer',
    format: 'json',
    nav: 'JSON Fixer',
    title: 'JSON Fixer: Repair Broken JSON (Trailing Commas, Quotes) | DocuFormat',
    description: 'Fix invalid JSON: missing commas, trailing commas, unquoted keys and single quotes. DocuFormat pinpoints the problem, and optional AI Fix proposes a repair you can review.',
    h1: 'JSON fixer',
    lead: 'Most broken JSON is broken in a small, predictable way. DocuFormat shows you where, and when you want help, AI Fix proposes a corrected version and lists what it changed.',
    cta: 'Fix My JSON →',
    before: ex('broken.json', 'json', '{\n  «name»: "Steve"«\n»  active: true«,»\n}', { badge: 'Detected: JSON ✗', foot: '✗ errors found · AI Fix available', footKind: 'bad' }),
    after: ex('suggested.json', 'json', '{\n  "name": "Steve",\n  "active": true\n}', { badge: 'AI suggestion', badgeKind: 'ai', foot: '✓ Passes local re-validation' }),
    sections: [
      { h2: 'Start with the diagnosis', html: `<p>Before anything is repaired, DocuFormat tells you what is wrong, using the same local parser that powers the <a href="/json-validator/">validator</a>. Often that is enough: delete a comma, add a quote, done.</p>` },
      { h2: 'When you want it fixed for you', html: `<p>Some inputs are messier: a pasted JavaScript object, a log line with truncated output, a config with comments. Click <strong>AI Fix</strong> and DocuFormat asks an AI model for a corrected version, with an explanation and a list of the specific problems it found.</p>
<p>The suggestion is shown beside your input, labelled as AI-generated, and is <em>not</em> applied until you choose <strong>Use as input</strong>. DocuFormat also re-validates the suggestion locally before presenting it, so you can see immediately whether it is actually valid.</p>` },
      { h2: 'Typical repairs', html: `<ul><li>Adding quotes around property names</li><li>Replacing single quotes with double quotes</li><li>Inserting missing commas</li><li>Removing trailing commas</li><li>Removing comments</li></ul>
<p>The repair prompt asks for the smallest change that makes the input valid, and not to invent data or drop content unless validity requires it. Still, review the result: AI output is a proposal, not a guarantee. More on how this works on the <a href="/ai-json-fixer/">AI JSON fixer</a> page.</p>` },
      { h2: 'Fixing it by hand', html: `<p>If you would rather not use AI at all, the error list and highlighted lines are usually enough. Fix the first reported problem and re-validate; later errors are often side effects of earlier ones.</p>` }
    ],
    faq: [
      ['Is AI Fix required?', 'No. Formatting and validation work without it, and AI Fix only runs when you click it.'],
      ['Will AI Fix change my values?', 'It is instructed to make the smallest changes needed and not invent data. Always review the suggestion and its change list before using it.'],
      ['What if the AI result is still invalid?', 'DocuFormat re-validates the suggestion locally and tells you if it still has problems, so you know before you use it.']
    ],
    related: ['ai-json-fixer', 'json-validator', 'json-formatter', 'sql-fixer']
  },
  {
    slug: 'ai-json-fixer',
    format: 'json',
    nav: 'AI JSON Fixer',
    title: 'AI JSON Fixer: Repair Malformed JSON, Explained | DocuFormat',
    description: 'How DocuFormat’s AI JSON fixer works: you click AI Fix, the model proposes a repair and explains what changed, and the result is re-validated locally before you use it.',
    h1: 'AI JSON fixer',
    lead: 'An AI fixer is only useful if you can trust what it does. Here is exactly how DocuFormat uses AI on broken JSON, what stays deterministic, and what you stay in control of.',
    cta: 'Fix My Input →',
    before: ex('input.json', 'json', '{\n  "user": {\n    "id": 7,\n    "roles": ["admin", "dev"\n  },\n  "active": true\n}', { badge: 'Detected: JSON ✗', footKind: 'bad', foot: '✗ 1 error · AI Fix available' }),
    after: ex('suggested.json', 'json', '{\n  "user": {\n    "id": 7,\n    "roles": ["admin", "dev"]\n  },\n  "active": true\n}', { badge: 'AI suggestion', badgeKind: 'ai', foot: '✓ Passes local re-validation' }),
    sections: [
      { h2: 'Deterministic first, AI second', html: `<p>DocuFormat detects the format, parses, validates and pretty-prints without a model. The AI step is separate and optional. When validation fails, the local diagnostics (line, column, message) are passed along with your input so the model can target the real problem instead of guessing.</p>` },
      { h2: 'What happens when you click AI Fix', html: `<ol><li>You click <strong>AI Fix</strong>. Nothing is sent before this.</li><li>The first time in a session, DocuFormat shows a notice that your content will be sent to an external AI provider, and asks you to confirm.</li><li>The request goes through DocuFormat’s server to the AI provider.</li><li>You get a proposed correction, a plain-language explanation and a list of problems found.</li><li>DocuFormat validates the proposal locally and shows the result.</li><li>You decide: <strong>Use as input</strong>, <strong>Format suggestion</strong> or <strong>Discard</strong>.</li></ol>` },
      { h2: 'What it is told to do', html: `<p>The repair instructions tell the model to treat your content as data, not instructions; to preserve the original intent; to make the smallest changes needed; and not to invent data or remove content unless required for validity.</p>
<p><strong>Secrets are not redacted.</strong> Tokens and keys in your input are passed as written, so remove anything sensitive before using an AI action.</p>` },
      { h2: 'Limits worth knowing', html: `<ul><li>AI requests accept up to 512 KB of input.</li><li>AI output can be wrong. That is why it is never applied automatically and is always re-validated.</li><li>AI Fix needs the application’s AI provider to be configured; basic formatting and validation do not.</li></ul>
<p>For the plain formatting side, see the <a href="/json-formatter/">JSON formatter</a>; for common causes of invalid JSON, the <a href="/json-fixer/">JSON fixer</a>.</p>` }
    ],
    faq: [
      ['Does DocuFormat send my JSON to an AI automatically?', 'No. Content is only sent after you click AI Fix or Explain, and the first time you are asked to confirm.'],
      ['Is the AI-fixed JSON guaranteed valid?', 'No guarantee, which is why DocuFormat re-validates it locally and shows you the result before you use it.'],
      ['Which AI provider does it use?', 'The server forwards requests to an AI provider (currently Anthropic). The application shows which model is in use.'],
      ['Can I use it for formats other than JSON?', 'Yes. AI Fix and Explain work for YAML, XML, CSV, SQL, cURL and shell commands as well.']
    ],
    related: ['json-fixer', 'json-validator', 'sql-fixer', 'curl-explainer']
  },

  // ───────────────────────── YAML ─────────────────────────
  {
    slug: 'yaml-formatter',
    format: 'yaml',
    nav: 'YAML Formatter',
    title: 'YAML Formatter: Clean Up and Validate YAML Online | DocuFormat',
    description: 'Format YAML with consistent indentation and catch syntax problems at the same time. Handles multi-document files; runs locally in your browser with optional AI repair.',
    h1: 'YAML formatter',
    lead: 'Tidy YAML configuration files and normalize their indentation and spacing. If the file does not parse, DocuFormat tells you where, instead of guessing.',
    cta: 'Format YAML →',
    before: ex('config.yaml', 'yaml', 'server:\n    host: localhost\n    port:   8080\nfeatures: [auth,   logging]\nlist:\n- alpha\n-   beta', { badge: 'Detected: YAML ✓' }),
    after: ex('output.yaml', 'yaml', 'server:\n  host: localhost\n  port: 8080\nfeatures: [auth, logging]\nlist:\n  - alpha\n  - beta', { foot: '✓ Valid YAML · formatted locally' }),
    sections: [
      { h2: 'What gets cleaned up', html: `<p>DocuFormat parses your YAML and writes it back out in a consistent style: two-space indentation, list items indented under their key, and no stray padding around values. Inline collections such as <code>[auth, logging]</code> stay inline, tidied but not restructured.</p>` },
      { h2: 'Multi-document files', html: `<p>Files with several documents separated by <code>---</code>, common in Kubernetes manifests, are parsed and formatted document by document, and the separators are kept.</p>` },
      { h2: 'Review the output', html: `<p>Because formatting re-serializes the parsed document rather than editing text in place, it is worth glancing over the result, especially for files that rely on a particular style such as quoting, anchors or long folded strings. Compare it with the original before committing.</p>` },
      { h2: 'Why format YAML at all?', html: `<p>In YAML, indentation <em>is</em> the structure. A config that is consistently indented is easier to review, and mis-nested keys are easier to see. If the file is already broken, start with the <a href="/yaml-validator/">YAML validator</a>.</p>` }
    ],
    faq: [
      ['Does it support multiple YAML documents?', 'Yes. Documents separated by --- are formatted individually.'],
      ['Can it minify YAML?', 'No. Minifying does not make sense for indentation-based YAML, so that option is not offered.'],
      ['Does my YAML leave my browser?', 'Not for formatting or validation. Content is only sent to an AI provider if you click AI Fix or Explain.']
    ],
    related: ['yaml-validator', 'json-formatter', 'ai-json-fixer', 'xml-formatter']
  },
  {
    slug: 'yaml-validator',
    format: 'yaml',
    nav: 'YAML Validator',
    title: 'YAML Validator: Find Indentation and Syntax Errors | DocuFormat',
    description: 'Validate YAML and locate indentation, tab and syntax errors by line and column. A deterministic local parser does the checking; AI Fix is optional.',
    h1: 'YAML validator',
    lead: 'YAML errors are usually one misplaced space. DocuFormat parses the file, reports where it stops making sense, and highlights the line.',
    cta: 'Validate YAML →',
    before: ex('app.yaml', 'yaml', 'server:\n  host: localhost\n«   port: 8080»\n', { badge: 'Detected: YAML ✓', footKind: 'bad', foot: '✗ line 2: Nested mappings are not allowed in compact mappings' }),
    after: null,
    sections: [
      { h2: 'Where YAML usually goes wrong', html: `<ul><li><strong>Inconsistent indentation.</strong> A key indented one space further than its siblings turns into a parse error.</li><li><strong>Tabs.</strong> YAML indentation must use spaces.</li><li><strong>Duplicate keys.</strong> The same key twice in one mapping is rejected.</li><li><strong>Unquoted special characters.</strong> A value containing <code>: </code> or starting with <code>*</code>, <code>&amp;</code> or <code>@</code> needs quotes.</li><li><strong>Unclosed flow collections.</strong> A <code>[</code> or <code>{</code> that never closes.</li></ul>` },
      { h2: 'Errors with positions', html: `<p>Each reported problem includes a line and column where the parser noticed it. Note that the position is where the parser <em>noticed</em> the issue, which can be a line or two after the real mistake, so read the lines just above it too.</p>` },
      { h2: 'Deterministic, then optional AI', html: `<p>Parsing is done locally with a standard YAML library. If the cause still is not clear, <strong>Explain</strong> can describe what is wrong in plain language, and <strong>AI Fix</strong> can propose a corrected file. Both are explicit, and neither is needed to validate. Once the file parses, run it through the <a href="/yaml-formatter/">YAML formatter</a>.</p>` }
    ],
    faq: [
      ['Does it validate Kubernetes or CI schemas?', 'No. It checks that the file is valid YAML, not that its keys match any particular tool’s schema.'],
      ['Why does the error point to the wrong line?', 'Parsers report where they detect the problem, which can be after the actual mistake. Check the lines above the reported one.'],
      ['Are tabs allowed?', 'No. YAML indentation must use spaces.']
    ],
    related: ['yaml-formatter', 'json-validator', 'xml-validator', 'ai-json-fixer']
  },

  // ───────────────────────── XML ─────────────────────────
  {
    slug: 'xml-formatter',
    format: 'xml',
    nav: 'XML Formatter',
    title: 'XML Formatter: Pretty Print and Indent XML Online | DocuFormat',
    description: 'Pretty-print XML with clean indentation, keep comments and CDATA intact, and catch malformed tags and nesting. Local, deterministic formatting with optional AI repair.',
    h1: 'XML formatter',
    lead: 'Turn single-line XML responses and config files into properly nested, readable markup, and find out right away if the document is well-formed.',
    cta: 'Format XML →',
    before: ex('response.xml', 'xml', '<?xml version="1.0"?><order id="1042"><customer>Ada</customer><items><item sku="B-1">Book</item><item sku="P-9">Pen</item></items></order>', { badge: 'Detected: XML ✓' }),
    after: ex('output.xml', 'xml', '<?xml version="1.0"?>\n<order id="1042">\n  <customer>Ada</customer>\n  <items>\n    <item sku="B-1">Book</item>\n    <item sku="P-9">Pen</item>\n  </items>\n</order>', { foot: '✓ Well-formed XML · formatted locally' }),
    sections: [
      { h2: 'Readable nesting', html: `<p>XML responses from SOAP services, feeds and legacy systems are often delivered on a single line. The formatter indents each nested element so the structure is visible, keeping short text-only elements like <code>&lt;customer&gt;Ada&lt;/customer&gt;</code> on one line.</p>` },
      { h2: 'Comments, CDATA and declarations', html: `<p>XML comments, CDATA sections, processing instructions, doctype declarations and the <code>&lt;?xml ?&gt;</code> prolog are preserved as written rather than being reinterpreted.</p>` },
      { h2: 'Minify when size matters', html: `<p>Need the opposite? Minify removes the whitespace between elements. Use <strong>Swap</strong> to move formatted output back to the input and continue editing.</p>` },
      { h2: 'Formatting needs well-formed XML', html: `<p>A formatter cannot sensibly indent markup that does not nest correctly, so DocuFormat checks well-formedness first. If something is off, you get the reason and position. See the <a href="/xml-validator/">XML validator</a> for what it catches.</p>` }
    ],
    faq: [
      ['Does it validate against an XSD or DTD?', 'No. It checks that the XML is well-formed, not that it conforms to a schema.'],
      ['Are comments and CDATA kept?', 'Yes, they are preserved as written.'],
      ['Can it minify XML?', 'Yes. Use Minify to remove whitespace between elements.']
    ],
    related: ['xml-validator', 'yaml-formatter', 'json-formatter', 'curl-parser']
  },
  {
    slug: 'xml-validator',
    format: 'xml',
    nav: 'XML Validator',
    title: 'XML Validator: Check Well-Formedness and Fix Tag Errors | DocuFormat',
    description: 'Check whether XML is well-formed and find mismatched tags, unescaped ampersands and multiple root elements, with line and column. Deterministic and local; AI Fix optional.',
    h1: 'XML validator',
    lead: 'Find out whether your XML is well-formed and exactly where it is not. Mismatched closing tags, unescaped characters and extra root elements are reported with positions.',
    cta: 'Validate XML →',
    before: ex('order.xml', 'xml', '<order id="1">\n  <item>Book</item>\n  <item>Pen«</order>»', { badge: 'Detected: XML ✓', footKind: 'bad', foot: '✗ line 3: Mismatched closing tag: expected &lt;/item&gt; but found &lt;/order&gt;' }),
    after: null,
    sections: [
      { h2: 'What “well-formed” means', html: `<p>A well-formed XML document has exactly one root element, properly nested and closed tags, quoted attribute values and escaped special characters. DocuFormat’s checker covers the problems that cause real-world parse failures:</p>
<ul><li>mismatched closing tags (the error names the tag it expected and the one it found)</li><li>unescaped <code>&amp;</code> (it must be written <code>&amp;amp;</code>)</li><li>a literal <code>&lt;</code> in text or attribute values</li><li>multiple root elements</li><li>text outside the root element</li><li>documents with no root element at all</li></ul>` },
      { h2: 'Well-formed is not the same as valid', html: `<p>Validating against a schema (XSD, DTD) is a different job and is not what this tool does. If the XML is well-formed, the <a href="/xml-formatter/">XML formatter</a> will indent it for reading.</p>` },
      { h2: 'Getting unstuck', html: `<p>When the cause is not obvious, <strong>Explain</strong> can describe the problem in plain language, and <strong>AI Fix</strong> can suggest a corrected document. Both are opt-in; checking is always local.</p>` }
    ],
    faq: [
      ['Does it check against an XSD or DTD?', 'No. DocuFormat checks well-formedness only.'],
      ['Why is a bare & invalid?', 'In XML, & begins an entity reference. A literal ampersand must be written as &amp;.'],
      ['Does it change my XML while validating?', 'No. Validate reports results and leaves your input untouched.']
    ],
    related: ['xml-formatter', 'yaml-validator', 'json-validator', 'ai-json-fixer']
  },

  // ───────────────────────── CSV ─────────────────────────
  {
    slug: 'csv-formatter',
    format: 'csv',
    nav: 'CSV Formatter',
    title: 'CSV Formatter & Viewer: Validate and Inspect CSV | DocuFormat',
    description: 'Detect the delimiter, preview CSV as a table and find rows with the wrong number of columns or broken quotes. Local, deterministic CSV checking with optional AI help.',
    h1: 'CSV formatter and table preview',
    lead: 'Paste CSV and see it as a table. DocuFormat detects the delimiter, notices when rows do not line up, and points at quoting problems.',
    cta: 'Format CSV →',
    before: ex('people.csv', 'csv', 'name;age;city\nAda;36;London\nLinus;54\nGrace;85;New York', { badge: 'Detected: CSV ✓', footKind: 'bad', foot: '✗ line 3: Expected 3 columns but found 2' }),
    after: null,
    sections: [
      { h2: 'Delimiter detection', html: `<p>Not all “CSV” uses commas. DocuFormat detects comma, tab, semicolon and pipe delimiters by checking which one gives consistent column counts across the first rows, and reports which it chose.</p>` },
      { h2: 'See the structure', html: `<p>The <strong>Table</strong> view shows your data in rows and columns, with missing cells highlighted. Ragged rows are very hard to spot in raw text and obvious in a table. The first row is treated as a header when it looks like one.</p>` },
      { h2: 'What gets flagged', html: `<ul><li>rows with more or fewer columns than the rest</li><li>quoted fields that are never closed</li><li>characters after a closing quote</li><li>unescaped quotes inside unquoted fields</li></ul>
<p>Quoted fields containing delimiters or line breaks, and doubled quotes (<code>""</code>) as escapes, are parsed correctly.</p>` },
      { h2: 'Nothing to run, nothing to upload', html: `<p>Parsing happens in your browser. If a file is inconsistent in a way you do not want to untangle by hand, you can opt in to <strong>Explain</strong> or <strong>AI Fix</strong>. For structured, nested data, the <a href="/json-formatter/">JSON formatter</a> may be a better fit.</p>` }
    ],
    faq: [
      ['Which delimiters are detected?', 'Comma, tab, semicolon and pipe.'],
      ['Can it minify CSV?', 'No. There is nothing to minify in CSV, so that option is not offered.'],
      ['How large a file can I paste?', 'Local parsing has no server limit, though very large inputs are limited by your browser. AI requests accept up to 512 KB.']
    ],
    related: ['json-formatter', 'sql-formatter', 'yaml-formatter', 'ai-json-fixer']
  },

  // ───────────────────────── SQL ─────────────────────────
  {
    slug: 'sql-formatter',
    format: 'sql',
    nav: 'SQL Formatter',
    title: 'SQL Formatter: Format and Beautify SQL Queries Online | DocuFormat',
    description: 'Format SQL queries with consistent keyword case and indentation for PostgreSQL, MySQL, SQL Server, Oracle or SQLite. Pasted SQL is never executed; AI can explain or repair it.',
    h1: 'SQL formatter',
    lead: 'Turn one-line queries from logs and ORMs into readable SQL. Pick your dialect, format, and read the query the way it was meant to be read.',
    cta: 'Format SQL →',
    before: ex('query.sql', 'sql', "select u.name,count(*) as orders from users u join orders o on o.user_id=u.id where u.active=true group by u.id,u.name having count(*)>5 order by orders desc", { badge: 'Detected: SQL ✓' }),
    after: ex('output.sql', 'sql', 'SELECT\n  u.name,\n  count(*) AS orders\nFROM\n  users u\n  JOIN orders o ON o.user_id = u.id\nWHERE\n  u.active = TRUE\nGROUP BY\n  u.id,\n  u.name\nHAVING\n  count(*) > 5\nORDER BY\n  orders DESC', { foot: '✓ Formatted locally · never executed' }),
    sections: [
      { h2: 'Dialect-aware formatting', html: `<p>Choose Generic, PostgreSQL, MySQL, SQL Server, Oracle or SQLite. Dialect matters for quoting, operators and keywords, so formatting follows the rules of the database you actually use. Keywords are uppercased (note <code>true</code> becoming <code>TRUE</code> above) and each clause starts on its own line.</p>` },
      { h2: 'Read the query, not the line', html: `<p>Generated SQL often arrives as one long line. Formatted, a query reads top-down, with each join and condition on its own row, so mistakes in a <code>JOIN … ON</code> or a <code>HAVING</code> are easy to see. Minify is available when you need the compact form back.</p>` },
      { h2: 'Pasted SQL is never run', html: `<p>DocuFormat parses and prints SQL text. It does not connect to a database and never executes what you paste, so it is safe for queries that contain <code>DELETE</code> or <code>DROP</code>.</p>` },
      { h2: 'Structural checks, not a full SQL parser', html: `<p>Local checks catch problems such as unbalanced parentheses, unterminated strings and comments, and statements that end right after a clause keyword. It is not a full parse for every dialect, so a query can pass these checks and still be rejected by your database. When a query is clearly wrong, see the <a href="/sql-fixer/">SQL fixer</a>.</p>` }
    ],
    faq: [
      ['Does it run my query?', 'No. SQL is only parsed and formatted as text. It is never executed and there is no database connection.'],
      ['Which SQL dialects are supported?', 'Generic, PostgreSQL, MySQL, SQL Server, Oracle and SQLite.'],
      ['Can AI explain a query?', 'Yes. Click Explain to get a step-by-step description of what the query does. It is only sent after you click, and the query is never run.'],
      ['Will it validate my query against my schema?', 'No. It has no access to your database or schema.']
    ],
    related: ['sql-fixer', 'json-formatter', 'curl-formatter', 'csv-formatter']
  },
  {
    slug: 'sql-fixer',
    format: 'sql',
    nav: 'SQL Fixer',
    title: 'SQL Fixer: Repair and Explain Broken SQL Queries | DocuFormat',
    description: 'Find unbalanced parentheses, unterminated strings and dangling clauses in SQL, then use AI to propose a fix or explain a complex query. Nothing runs against a database.',
    h1: 'SQL fixer and explainer',
    lead: 'When a query will not run, or you inherited one you cannot read, DocuFormat can point at structural problems locally and use AI, when you ask, to repair or explain it.',
    cta: 'Fix My SQL →',
    before: ex('broken.sql', 'sql', "SELECT id, name\nFROM users\nWHERE (status = 'active' AND role = 'admin'«\nORDER BY name", { badge: 'Detected: SQL ✓', footKind: 'bad', foot: '✗ line 3: Unclosed "("' }),
    after: ex('suggested.sql', 'sql', "SELECT id, name\nFROM users\nWHERE (status = 'active' AND role = 'admin')\nORDER BY name;", { badge: 'AI suggestion', badgeKind: 'ai', foot: '✓ Illustrative output · review before use' }),
    sections: [
      { h2: 'What the local checks find', html: `<ul><li>unclosed or unmatched parentheses</li><li>unterminated string literals and quoted identifiers</li><li>unterminated block comments</li><li>text that does not start with a recognizable SQL statement</li><li>statements that stop right after <code>WHERE</code>, <code>JOIN</code>, <code>AND</code> and similar</li></ul>
<p>These run instantly in your browser. They cover common structural slips, not every dialect-specific syntax rule.</p>` },
      { h2: 'Where AI helps', html: `<p>For anything subtler, choose <strong>AI Fix</strong>. Your selected dialect is sent along, so a suggestion can follow PostgreSQL or SQL Server conventions. You get a corrected query, an explanation and a list of changes, and nothing is applied until you accept it.</p>` },
      { h2: 'Explain a query you did not write', html: `<p><strong>Explain</strong> describes what a query does in plain language, step by step: which tables are joined, how rows are filtered and grouped, and what the result looks like. The query is analysed as text and never executed.</p>` },
      { h2: 'Safe by construction', html: `<p>DocuFormat has no database connection. Whether you format, check, fix or explain, your SQL is never run. Start with the <a href="/sql-formatter/">SQL formatter</a> if the query is valid but hard to read.</p>` }
    ],
    faq: [
      ['Will AI Fix run my SQL to test it?', 'No. DocuFormat never executes SQL, and the AI is instructed not to claim to run anything.'],
      ['Does AI Fix know my schema?', 'No. It only sees the text you submit, so suggestions are based on syntax and apparent intent.'],
      ['Is AI required to check my SQL?', 'No. The structural checks are local and deterministic. AI is used only when you click AI Fix or Explain.']
    ],
    related: ['sql-formatter', 'ai-json-fixer', 'curl-explainer', 'json-fixer']
  },

  // ───────────────────────── cURL ─────────────────────────
  {
    slug: 'curl-formatter',
    format: 'curl',
    nav: 'cURL Formatter',
    title: 'cURL Command Formatter: Pretty Print and Explain cURL | DocuFormat',
    description: 'Format long cURL commands into readable, multi-line requests and see the method, URL, headers, auth and body. Commands are parsed, never executed.',
    h1: 'cURL command formatter',
    lead: 'cURL commands copied from docs, browser dev tools or a teammate’s message are often one unreadable line. DocuFormat lays them out clearly and shows the request they describe.',
    cta: 'Format cURL →',
    before: ex('command.sh', 'curl', "curl -X POST https://api.example.com/users -H 'Content-Type: application/json' -H 'Authorization: Bearer YOUR_TOKEN' -d '{\"name\":\"Steve\",\"active\":true}'", { badge: 'Detected: cURL ✓' }),
    after: ex('output.sh', 'curl', "curl \\\n  https://api.example.com/users \\\n  -H 'Content-Type: application/json' \\\n  -H 'Authorization: Bearer YOUR_TOKEN' \\\n  --data-raw '{\n  \"name\": \"Steve\",\n  \"active\": true\n}\n'", { foot: '✓ Parsed locally · never executed' }),
    sections: [
      { h2: 'One option per line', html: `<p>The formatter puts the URL and each option on its own line with a trailing backslash, the way people write cURL by hand, and pretty-prints a JSON or XML request body so it is readable too. Because POST is implied by a body, the explicit <code>-X POST</code> is dropped; the method is still shown in the Request view. A compact one-line form is available through Minify.</p>` },
      { h2: 'See the request, not the flags', html: `<p>Switch to the <strong>Request</strong> view to see the same command broken down into its parts: method, URL, query parameters, headers, authentication, cookies and body. It is quicker than decoding <code>-H</code>, <code>-u</code> and <code>-d</code> by eye. The <a href="/curl-parser/">cURL parser</a> page covers that view in detail.</p>` },
      { h2: 'Not every command is cURL', html: `<p>If what you pasted is a Docker, kubectl, Git or other shell command rather than an HTTP request, use the <a href="/shell-command-formatter/">shell command formatter</a>. It converts long commands between single-line and multi-line forms. cURL is a shell command too, so it works there as well, but this page adds the HTTP-level view.</p>` },
      { h2: 'Never executed', html: `<p>A cURL command is parsed as text. DocuFormat never runs it and never makes the request, so you can inspect commands you do not fully trust, including ones that contain shell operators. Anything after a shell operator such as <code>|</code> or <code>&amp;&amp;</code> is ignored and flagged.</p>` },
      { h2: 'Mind the secrets', html: `<p>Authorization headers and tokens are shown as written, not masked. Formatting is local, but if you choose an AI action, the command is sent to the AI provider, so remove real credentials first.</p>` }
    ],
    faq: [
      ['Does DocuFormat send the request?', 'No. cURL commands are parsed and displayed only. Nothing is executed or sent.'],
      ['Can it convert cURL to fetch or Python?', 'Not today. DocuFormat formats and explains cURL commands; conversion to other languages is not currently offered.'],
      ['What if my command has unsupported options?', 'Unknown options are ignored and listed as warnings, so you can see what was skipped.']
    ],
    related: ['shell-command-formatter', 'curl-parser', 'curl-explainer', 'json-formatter']
  },
  {
    slug: 'curl-parser',
    format: 'curl',
    nav: 'cURL Parser',
    title: 'cURL Parser: Extract Method, URL, Headers and Body | DocuFormat',
    description: 'Parse a cURL command into method, URL, query parameters, headers, authentication, cookies and body. Understands common cURL options; never executes the command.',
    h1: 'cURL parser',
    lead: 'A cURL command is a request in disguise. The parser reads the options and shows you the HTTP request underneath: what is sent, where, and with which credentials.',
    cta: 'Parse cURL →',
    before: ex('command.sh', 'curl', "curl 'https://api.example.com/search?q=widgets&page=2' \\\n  -u admin:s3cret \\\n  -H 'Accept: application/json' \\\n  -b 'session=abc123'", { badge: 'Detected: cURL ✓' }),
    after: {
      file: 'Request view',
      lang: 'text',
      code: 'GET  https://api.example.com/search\n\nQuery parameters\n  q       widgets\n  page    2\n\nHeaders\n  Accept  application/json\n\nAuthentication\n  Basic · admin\n\nCookies\n  session abc123',
      foot: '✓ Parsed locally · never executed'
    },
    sections: [
      { h2: 'What the parser extracts', html: `<ul><li><strong>Method</strong>: from <code>-X</code>, or inferred (a body implies POST; <code>-I</code> implies HEAD)</li><li><strong>URL</strong> and its <strong>query parameters</strong></li><li><strong>Headers</strong> from <code>-H</code></li><li><strong>Authentication</strong>: <code>-u</code> basic auth, bearer tokens, other Authorization schemes</li><li><strong>Cookies</strong> from <code>-b</code></li><li><strong>Body</strong> from <code>-d</code>, <code>--data-raw</code>, <code>--data-binary</code>, <code>--data-urlencode</code>, <code>--json</code> and <code>-F</code> forms</li></ul>` },
      { h2: 'Options it understands', html: `<p>Common flags like <code>-L</code>, <code>-k</code>, <code>--compressed</code>, <code>-A</code>, <code>-e</code> and <code>-x</code> are recognized. Output and logging flags such as <code>-o</code>, <code>-s</code> and <code>-v</code> do not change the request and are skipped without noise. Anything unrecognized is reported as a warning rather than silently dropped.</p>` },
      { h2: 'Bodies, typed', html: `<p>The body is classified as JSON, XML, form or multipart from the Content-Type or its content, and JSON and XML bodies are pretty-printed. If a JSON body is invalid, that is reported as an error against the request body, which is the kind of mistake that is hard to spot inside shell quoting. If a body is read from a file (<code>@file</code>), DocuFormat shows the file reference and never reads the file.</p>` },
      { h2: 'Security by design', html: `<p>Parsing is plain text processing. The command is not run, no network request is made, and referenced files are not read. See the <a href="/curl-formatter/">cURL formatter</a> for the readable rewrite, or <a href="/curl-explainer/">explain a cURL command</a> in plain language.</p>` }
    ],
    faq: [
      ['Does it support multiple URLs in one command?', 'No. Only the first URL is used, and extras are reported as ignored.'],
      ['Does it read files referenced with @?', 'No. It shows the file reference but never reads files.'],
      ['Can I paste a command that starts with a $ prompt?', 'Yes. A leading shell prompt is recognized and removed.']
    ],
    related: ['curl-formatter', 'shell-command-formatter', 'curl-explainer', 'json-validator']
  },
  {
    slug: 'curl-explainer',
    format: 'curl',
    nav: 'cURL Explainer',
    title: 'Explain cURL Commands in Plain Language | DocuFormat',
    description: 'Understand what a cURL command will do before you run it. DocuFormat parses it deterministically and, when you ask, uses AI to explain the request in plain language.',
    h1: 'Explain a cURL command',
    lead: 'Copied a cURL command you do not quite trust, or fully understand? Get the facts first from the parser, then a plain-language explanation if you want one, all without running anything.',
    cta: 'Explain My cURL →',
    before: ex('command.sh', 'curl', "curl -sSL -X PUT https://api.example.com/v2/items/58 \\\n  -H 'X-Api-Key: YOUR_KEY' \\\n  --data-raw '{\"status\":\"archived\"}' | jq .", { badge: 'Detected: cURL ✓' }),
    after: {
      file: 'Explain · AI-generated',
      lang: 'text',
      code: 'Sends an HTTP PUT request to\nhttps://api.example.com/v2/items/58\n\n• Header X-Api-Key supplies an API key\n• Body is JSON: {"status":"archived"}\n• -L follows redirects; -s and -S control\n  progress and error output only\n\nThe "| jq ." part is a shell pipe and is\nnot part of the HTTP request.',
      foot: 'Illustrative output · generated only when you click Explain'
    },
    sections: [
      { h2: 'Two layers: facts, then explanation', html: `<p>The deterministic <a href="/curl-parser/">parser</a> gives you the request’s structure without AI: method, URL, headers, authentication and body. That is often all you need. If you want the meaning spelled out, <strong>Explain</strong> adds a short plain-language description of the request the command would send.</p>` },
      { h2: 'Useful for commands you did not write', html: `<ul><li>Examples in API docs and issue threads</li><li>“Copy as cURL” output from browser dev tools</li><li>One-liners in runbooks and CI scripts</li><li>Commands pasted into support tickets</li></ul>` },
      { h2: 'Explanation is described, not run', html: `<p>The explanation prompt asks the model to describe the HTTP request the command would send, without running it. DocuFormat does not execute cURL, and no request is made at any point.</p>` },
      { h2: 'You stay in control', html: `<p>Explain only runs when you click it, and you confirm the first time that your content will go to an AI provider. Credentials in the command are not masked, so replace real tokens with placeholders before asking. For a deterministic, AI-free view, use the <a href="/curl-formatter/">cURL formatter</a>.</p>` }
    ],
    faq: [
      ['Is the explanation generated by AI?', 'Yes, and it is labelled as AI-generated. The structural breakdown (method, URL, headers, body) is produced by the deterministic parser, with no AI.'],
      ['Does it execute the command to find out what it does?', 'No. The command is never run and no request is sent.'],
      ['Can I explain a command that has an error?', 'Yes. AI Fix can also propose a corrected command, which you review before using.']
    ],
    related: ['curl-formatter', 'curl-parser', 'shell-command-formatter', 'ai-json-fixer']
  }
  ,
  shellPage
];
