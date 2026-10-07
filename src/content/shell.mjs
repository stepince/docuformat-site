// Shell / Bash command formatter landing page.
// Written to the product brief before the feature existed in the app: re-verify every example and claim
// once it ships (see README, "Shell re-verification"). Commands are only ever formatted, never executed.
import { appLink, editor, esc } from '../components.mjs';

const ex = (file, lang, code, extra = {}) => ({ file, lang, code, ...extra });
const ed = (file, code, extra = {}) => editor({ file, lang: 'shell', code, ...extra });
const flow = (items) => `<ol class="flow" aria-label="Workflow">${items.map((s) => `<li>${esc(s)}</li>`).join('<li class="sep" aria-hidden="true">→</li>')}</ol>`;
const pair = (a, b) => `<div class="before-after"><div>${a}</div><div class="arrow" aria-hidden="true">→</div><div>${b}</div></div>`;

const CURL_IN = `curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d '{"name":"Steve","active":true}'`;
// Real output of the app's cURL formatter for the command above (verified 2026-10-06).
const CURL_OUT = `curl \\\n  https://api.example.com/users \\\n  -H 'Content-Type: application/json' \\\n  --data-raw '{\n  "name": "Steve",\n  "active": true\n}\n'`;

export const shellPage = {
  slug: 'shell-command-formatter',
  format: 'shell',
  nav: 'Shell Command Formatter',
  title: 'Shell Command Formatter: Bash Single & Multi Line | DocuFormat',
  description: 'Format Bash and shell commands online. Convert long commands between single-line and multi-line formats for easier copying, pasting, debugging, and documentation.',
  h1: 'Shell Command Formatter',
  lead: 'Convert long Bash and shell commands between single-line and readable multi-line formats, without fixing line continuations by hand. Paste a command. Format it. Copy it. Done.',
  cta: 'Format a Shell Command →',
  toggle: true,
  pairs: [
    {
      h: 'Single line → multi line',
      before: ex('command.sh', 'shell', 'docker run --rm -p 8080:8080 -e APP_ENV=production -e LOG_LEVEL=info myapp:latest', { badge: 'Single line' }),
      after: ex('multi-line.sh', 'shell', 'docker run --rm \\\n  -p 8080:8080 \\\n  -e APP_ENV=production \\\n  -e LOG_LEVEL=info \\\n  myapp:latest', { badge: 'Multi line', foot: '✓ Formatted · never executed' })
    },
    {
      h: 'Multi line → single line',
      before: ex('multi-line.sh', 'shell', 'kubectl create deployment myapp \\\n  --image=mycompany/myapp:latest \\\n  --replicas=3 \\\n  --namespace=production', { badge: 'Multi line' }),
      after: ex('single-line.sh', 'shell', 'kubectl create deployment myapp --image=mycompany/myapp:latest --replicas=3 --namespace=production', { badge: 'Single line', foot: '✓ Ready to paste into a terminal' })
    }
  ],
  note: 'Use multi-line mode when readability matters. Use single-line mode when you just want to paste the command into a terminal.',
  sections: [
    {
      h2: 'Make long shell commands readable',
      html: `<p>Long commands are great for terminals but terrible for documentation. Multi-line commands are easier to read, review and edit, but they can be frustrating to copy and paste, because every line has to end with the right continuation character. DocuFormat lets you switch between the two instantly.</p>
<p>Turning <strong>a Bash command from a single line into multiple lines</strong> puts each option on its own row, so you can see what a Docker, kubectl or AWS CLI call is actually doing. Going the other way, you can <strong>convert a shell command to one line</strong> and paste it straight into a terminal, a script or a chat message with no stray backslashes.</p>
<p>Whether you call it formatting, pretty-printing or beautifying a command, the result is the same command, laid out for the place you are about to use it.</p>`
    },
    {
      h2: 'Built for developer copy and paste',
      html: `<p>Commands rarely stay in one place. You find them in one environment and need them in another, and a layout that works in one is often awkward in the next:</p>
<ul class="link-list"><li><strong>Documentation → Terminal</strong></li><li><strong>Terminal → Documentation</strong></li><li><strong>Slack → Terminal</strong></li><li><strong>GitHub → Terminal</strong></li><li><strong>AI assistant → Terminal</strong></li><li><strong>Terminal → Support ticket</strong></li></ul>
<p>The usual fix is manual cleanup: adding or deleting backslashes, rejoining lines, hoping nothing was lost. DocuFormat removes that step.</p>
${flow(['Paste', 'Format', 'Copy'])}
<p>Common sources include READMEs, Stack Overflow answers, cloud documentation, CI/CD configuration and your own terminal history. It is designed for everyday developer commands such as Docker, kubectl, AWS CLI, Git, npm, Maven, Java, SSH, grep, find and cURL.</p>`
    },
    {
      h2: 'More than line wrapping',
      html: `<p>A formatter that only inserts a newline every eighty characters will happily cut a quoted string in half. DocuFormat is meant to understand how a shell command is structured, so it breaks the command at argument and option boundaries instead. Where supported, formatting preserves:</p>
<ul><li>arguments and options</li><li>quoted strings</li><li>environment variables</li><li>pipes and redirects</li><li>command chaining</li><li>shell escaping</li></ul>
<p>The aim is simple: <strong>formatting should improve readability without changing what the command means.</strong> As with any tool that rewrites a command, read it over before you run it, especially when it involves unusual quoting or escaping.</p>
${ed('formatted.sh', 'docker run \\\n  --name myapp \\\n  --restart unless-stopped \\\n  -p 8080:8080 \\\n  -e APP_ENV=production \\\n  mycompany/myapp:latest', { badge: 'Multi line', label: 'Multi-line docker run example' })}`
    },
    {
      h2: 'Shell formatting meets cURL intelligence',
      html: `<p>cURL commands are shell commands, but DocuFormat can understand them at a deeper level. For ordinary shell commands it cleans up the presentation. For cURL it can also identify the HTTP method, URL, headers, request body and authentication, which is what the <a href="/curl-formatter/">cURL formatter</a> and <a href="/curl-parser/">cURL parser</a> show.</p>
<ol class="flow" aria-label="From shell to cURL"><li>Shell formatter</li><li class="sep" aria-hidden="true">↓</li><li class="ai">cURL detected</li><li class="sep" aria-hidden="true">↓</li><li>Method</li><li>URL</li><li>Headers</li><li>Body</li></ol>
<p>That is the difference between treating a command as generic text and treating it as developer input.</p>`
    },
    {
      h2: 'Format the command. Format the data inside it.',
      html: `<p>A cURL command often carries a JSON body squashed into one quoted string. DocuFormat’s cURL formatter lays out the command and pretty-prints the JSON inside it. Here is a real example:</p>
${pair(ed('command.sh', CURL_IN, { badge: 'Single line' }), ed('formatted.sh', CURL_OUT, { badge: 'cURL formatter', foot: '✓ JSON body formatted · never executed' }))}
<p>Notice that the explicit <code>-X POST</code> is dropped because a request body already implies POST; the method is still shown in the cURL Request view. More in the <a href="/curl-formatter/">cURL command formatter</a> guide.</p>`
    },
    {
      h2: 'Broken shell command?',
      html: `<p>Formatting helps when a command is valid. When quoting, escaping, continuations or syntax are broken, DocuFormat’s optional <strong>AI Fix</strong> can help identify the problem and propose a corrected command. Typical problems include:</p>
<ul><li>broken or unbalanced quotes</li><li>bad escaping</li><li>incorrect line continuations</li><li>malformed cURL</li><li>damaged commands copied from documentation</li></ul>
<p>AI Fix is optional and only runs when you click it. Your command is not sent to an AI provider before that, you confirm the first time, and the suggestion is a proposal you review, not something applied automatically. See <a href="/ai-json-fixer/">how AI Fix works</a>.</p>
<div class="cta-row">${appLink('Fix a Shell Command →')}</div>`
    },
    {
      h2: 'Understand before you run',
      html: `<p>Some commands are hard to read even when they are tidy. <strong>Explain</strong> describes a complicated command in plain language, covering its commands, arguments, options, pipes and redirects, and for commands that contain potentially destructive operations the explanation should make that obvious.</p>
${ed('command.sh', 'find . -type f -name "*.log" -mtime +7 -print0 | xargs -0 rm', { badge: 'Explain', badgeKind: 'ai', label: 'Command to explain' })}
<p class="caption">Illustrative explanation, generated only when you click Explain: <em>finds regular files named *.log under the current directory that were modified more than 7 days ago, and pipes their names to <code>rm</code>, which deletes them.</em></p>
<p>The command is analysed as text. DocuFormat does not execute or test it.</p>
<div class="cta-row">${appLink('Explain a Command →')}</div>`
    },
    {
      h2: 'DocuFormat formats shell commands. It does not execute them.',
      html: `<p>Shell commands can contain API tokens, passwords, private URLs, authentication headers, environment variables and infrastructure details. So routine formatting is meant to be deterministic and to need no AI, and a command is only sent to an AI provider after you explicitly choose an AI feature.</p>
<ul><li>Shell commands are treated as data and are never executed.</li><li>SQL is never executed.</li><li>cURL requests are never executed.</li></ul>
<p>Secrets are not redacted for you, so remove real credentials before using an AI action. Details are on the <a href="/privacy/">privacy page</a>.</p>`
    }
  ],
  faq: [
    ['How do I convert a bash command to one line?', 'Paste the multi-line command and choose single-line output. DocuFormat joins the lines and removes the line continuations, so you can paste the result straight into a terminal.'],
    ['How do I format a long shell command?', 'Paste it and choose multi-line output. DocuFormat breaks the command at argument and option boundaries and adds the continuation characters for you.'],
    ['Does DocuFormat run my command?', 'No. Shell commands are formatted as text and are never executed.'],
    ['Will formatting change what my command does?', 'The goal is that formatting changes only layout, not meaning. It is still sensible to read a rewritten command before you run it, particularly if it uses complicated quoting or escaping.'],
    ['Which commands does it work with?', 'It is designed for everyday developer commands such as Docker, kubectl, AWS CLI, Git, npm, Maven, Java, SSH, grep, find and cURL.'],
    ['Is my command sent to an AI?', 'Not for formatting. A command is only sent to an AI provider if you click AI Fix or Explain.'],
    ['Does it work for cURL?', 'Yes, and cURL gets extra treatment: DocuFormat can identify the method, URL, headers, body and authentication. See the cURL formatter.']
  ],
  related: ['curl-formatter', 'curl-parser', 'curl-explainer', 'ai-json-fixer']
};
