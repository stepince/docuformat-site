# DocuFormat marketing site

Static, dependency-free marketing site for DocuFormat (**Format. Validate. Fix. Explain.**). It follows the conventions of the sibling `*-site` repos: plain Node generator, no framework, deployable as static files.

## Commands

Requires Node 18+. No dependency installation is needed.

```sh
npm run dev       # build, then serve http://localhost:4321 (PORT=... to change)
npm run build     # regenerate the HTML pages at the repo root (commit them)
npm run preview   # serve the existing build
npm test          # run after building: unique titles/descriptions, one h1, canonicals, internal links, sitemap, inbound links, icons
npm run lint      # JavaScript syntax checks
```

## Deployment

Same model as the other sites (Knowdexia, PerfLoad): **GitHub Pages from `main`** (Settings → Pages → Deploy from a branch → `main` / `/ (root)`). The generated pages live at the repo root next to `styles.css`, the icons, `CNAME`, `.nojekyll`, `robots.txt` and `sitemap.xml`. After editing `src/`, run `npm run build` and commit the result. Pushing to `main` deploys; there is no CI step.

`CNAME` is written by the build from `DOCUFORMAT_SITE_URL`, so it currently contains the placeholder `docuformat.com`. Confirm the real domain before enabling Pages (and point DNS at GitHub Pages). Removing a page from `src/` does not delete its old folder at the root; delete it by hand.

## Configuration (confirm before launch)

| Variable | Default | Used for |
|---|---|---|
| `DOCUFORMAT_SITE_URL` | `https://docuformat.com` (placeholder) | canonical URLs, Open Graph, structured data, sitemap, robots, `CNAME` |
| `DOCUFORMAT_APP_URL` | *(unset)* | While unset, every CTA reads **Coming soon ↗** and links to `/coming-soon/`. Set it at launch and the CTAs become real "Try DocuFormat →" / "Format X →" links (HTTPS, or HTTP on localhost) |
| `DOCUFORMAT_FORM_URL` | *(unset)* | Updates sign-up form on `/coming-soon/`. A `docs.google.com/forms/...` link is embedded; any other HTTPS link becomes a button; unset shows "Sign-up opens soon" |

To preview live CTAs locally: `DOCUFORMAT_APP_URL=http://localhost:5173/ npm run dev` (the app's Vite dev server). Rebuild and commit after changing any value.

## Structure

- `src/site.mjs`: config, format list, footer links
- `src/components.mjs`: layout, header, footer, editor window, CTA, SEO metadata, JSON-LD helpers
- `src/highlight.mjs`: build-time syntax highlighter (the site ships no JavaScript)
- `src/home.mjs`, `src/info-pages.mjs`: homepage; features, privacy, about, coming-soon, 404
- `src/tool-page.mjs` + `src/content/tools.mjs`, `src/content/shell.mjs`: the 15 tool landing pages (add a page by adding an entry)
- `scripts/build.mjs`: renders pages, `sitemap.xml`, `robots.txt`, `CNAME`, `.nojekyll`; `scripts/serve.mjs`: preview server (serves only published files); `scripts/verify.mjs`: the `npm test` checks; `scripts/create-favicons.py`: regenerates PNG/ICO icons from `icon.svg`
- Root: `styles.css`, `favicon.ico`, `icon.svg`, `icon-{48,192,512}.png`, `apple-touch-icon.png`, `site.webmanifest`, `assets/` (social image), and the generated pages

## Verified behavior (audit against the app, 2026-10-06)

Claims were checked against `../docuformat` source and by running its formatters on every on-page example. Keep copy within this list:

- Detection, parse, validate, format, minify run in the browser. Minify exists for JSON, XML, SQL, cURL only (not YAML/CSV).
- **Shell (not yet in the app when written):** the Shell pages are written to the product brief, not verified against the app. Re-verify every Shell example and claim once the feature ships (see "Shell re-verification" below).
- JSON is strict (no comments/trailing commas). YAML formatting does not expand flow collections or change quoting. SQL "validation" is structural only (parens, strings, comments, dangling clauses), and keywords are uppercased. XML checks well-formedness only. CSV delimiters: comma, tab, semicolon, pipe.
- cURL is parsed, never executed; `@file` is never read; values (tokens) are **not masked** in the UI. The app has internal cURL emitters for other languages, but the UI does not expose them, so the site does not advertise conversion.
- AI Fix / Explain: explicit click, first-use consent notice, request goes browser → DocuFormat server → Anthropic; 512 KB limit; prompts do not redact secrets; fix output is re-validated locally and never auto-applied. Server logs only method, route, status, duration, body size.
- No account in the app today ("no sign-up needed to try").

Re-check `privacy` and AI claims against the production deployment (provider, logging, retention) before launch. Re-run the example check if formatter output changes.

## Shell re-verification

`src/content/shell.mjs` and the Shell sections of `src/home.mjs` were written from the product brief before the Shell formatter existed in the app. When it ships, run its formatter on every Shell example (and the cURL embedded-JSON example, which uses the *cURL* formatter's real output) and confirm: both directions' exact output, preservation of quotes/env vars/pipes/redirects/chaining, whether shell input auto-detects cURL, whether cURL is handled by Shell or hands off to the cURL formatter, the supported-commands list, AI Fix/Explain for Shell, and that the privacy copy matches. Remove this note once verified.
