// Build-time syntax highlighter: emits static <span> markup, so pages ship no highlighting JavaScript.
// Wrap text in «…» to mark it as an error span (rendered as <mark class="err">).
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const SQL_KEYWORDS = 'SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|AS|AND|OR|NOT|IN|IS|NULL|LIKE|BETWEEN|EXISTS|CASE|WHEN|THEN|ELSE|END|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|WITH|UNION|ALL|DISTINCT|COUNT|SUM|AVG|MIN|MAX|DESC|ASC';

// Each rule is [pattern source (no capture groups), css class]. First matching rule at the earliest position wins.
const RULES = {
  json: [
    ['"(?:[^"\\\\\\n]|\\\\.)*"(?=\\s*:)', 'k'],
    ['"(?:[^"\\\\\\n]|\\\\.)*"', 's'],
    ['\\b(?:true|false|null)\\b', 'b'],
    ['-?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?', 'n'],
    ['[A-Za-z_][\\w]*(?=\\s*:)', 'k'],
    ['[{}\\[\\],:]', 'p']
  ],
  yaml: [
    ['#[^\\n]*', 'c'],
    ['[\\w.\\-]+(?=:(?:\\s|$))', 'k'],
    ['"(?:[^"\\\\\\n]|\\\\.)*"|\'[^\'\\n]*\'', 's'],
    ['\\b(?:true|false|null)\\b', 'b'],
    ['-?\\d+(?:\\.\\d+)?\\b', 'n'],
    ['^\\s*-(?=\\s)|---|[:\\[\\]{},]', 'p']
  ],
  xml: [
    ['<!--[\\s\\S]*?-->', 'c'],
    ['</?[\\w:.-]+|/?>', 'k'],
    ['"[^"\\n]*"', 's'],
    ['[\\w:.-]+(?==)', 'a']
  ],
  sql: [
    ['--[^\\n]*', 'c'],
    ["'(?:[^'\\n]|'')*'", 's'],
    [`\\b(?:${SQL_KEYWORDS})\\b`, 'kw'],
    ['\\b\\d+(?:\\.\\d+)?\\b', 'n'],
    ['[(),;*=<>]', 'p']
  ],
  curl: [
    ['^curl\\b', 'kw'],
    ["'(?:[^'\\\\]|\\\\.)*'|\"(?:[^\"\\\\]|\\\\.)*\"", 's'],
    ['(?<=\\s)--?[A-Za-z][\\w-]*', 'k'],
    ['https?://[^\\s\'"\\\\]+', 'u'],
    ['\\\\$', 'p']
  ],
  shell: [
    ['#[^\\n]*', 'c'],
    ["'(?:[^'\\\\]|\\\\.)*'|\"(?:[^\"\\\\]|\\\\.)*\"", 's'],
    ['^[A-Za-z][\\w.-]*(?=\\s|$)|(?<=[|&;]\\s)[A-Za-z][\\w.-]*', 'kw'],
    ['(?<=\\s)--?[A-Za-z][\\w-]*', 'k'],
    ['\\$\\{?\\w+\\}?', 'a'],
    ['\\|\\||&&|[|;]|[12]?>>?|<|\\\\$', 'p'],
    ['https?://[^\\s\'"\\\\]+', 'u']
  ],
  csv: [
    ['"(?:[^"\\n]|"")*"', 's'],
    ['-?\\b\\d+(?:\\.\\d+)?\\b', 'n'],
    ['[,;|]', 'p']
  ],
  text: []
};

function tokenize(code, lang) {
  const rules = RULES[lang] ?? [];
  if (!rules.length) return esc(code);
  const re = new RegExp(rules.map(([src]) => `(${src})`).join('|'), 'gm');
  let out = '';
  let last = 0;
  for (const m of code.matchAll(re)) {
    if (m[0] === '') continue;
    const i = m.slice(1).findIndex((g) => g !== undefined);
    out += esc(code.slice(last, m.index)) + `<span class="t-${rules[i][1]}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}

/** Returns highlighted HTML for `code`, split into one <span class="l"> per line (for CSS line numbers). */
export function highlight(code, lang = 'text') {
  const lines = code.replace(/\n$/, '').split('\n');
  let inErr = false;
  return lines
    .map((line) => {
      let html = '';
      // Split on «/» markers; error state can carry across lines.
      for (const part of line.split(/([«»])/)) {
        if (part === '«') inErr = true;
        else if (part === '»') inErr = false;
        else if (part) html += inErr ? `<mark class="err">${tokenize(part, lang)}</mark>` : tokenize(part, lang);
      }
      return `<span class="l">${html}</span>`;
    })
    .join('');
}
