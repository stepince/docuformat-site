# DocuFormat marketing site

Static, dependency-free marketing site for DocuFormat (**Format. Validate. Fix. Explain.**). It follows the conventions of the sibling `*-site` repos: plain Node generator, no framework, deployable as static files.

## Commands

```sh
npm run dev      # build, then preview at http://localhost:3000 (PORT=... to change)
npm run build    # render everything to dist/
npm run check    # syntax checks + SEO/integrity verification of dist/ (run build first)
SERVE_DIST=1 npm start   # preview production output (app links unchanged)
```

Deploy `dist/` to any static host that serves directory index pages, redirects `/route` to `/route/`, and uses `404.html` for misses.

## Configuration (confirm before launch)

The production domain and app URL were not available in the repo, so these are placeholders:

| Variable | Default | Used for |
|---|---|---|
| `DOCUFORMAT_SITE_URL` | `https://docuformat.com` | canonical URLs, Open Graph, sitemap, robots |
| `DOCUFORMAT_APP_URL` | `https://app.docuformat.com/` | every "Try DocuFormat" / "Format X →" CTA |

`npm run dev` rewrites CTAs to `http://localhost:5173/` (the app's Vite dev server; override with `DOCUFORMAT_DEV_APP`).

## Structure

- `lib/site.mjs`: config, format list, footer links
- `lib/components.mjs`: layout, header, footer, editor window, CTA, SEO metadata, JSON-LD helpers
- `lib/highlight.mjs`: build-time syntax highlighter (no client JS; the site ships none)
- `lib/home.mjs`, `lib/info-pages.mjs`: homepage; features, privacy, about, 404
- `lib/tool-page.mjs` + `content/tools.mjs`: the 14 tool landing pages (add a page by adding an entry)
- `build.mjs`: renders pages, `sitemap.xml`, `robots.txt`; `verify.mjs`: unique titles/descriptions, one h1, canonicals, no broken internal links, sitemap coverage, inbound links

## Verified behavior (audit against the app, 2026-10-06)

Claims were checked against `../docuformat` source and by running its formatters on every on-page example. Keep copy within this list:

- Detection, parse, validate, format, minify run in the browser. Minify exists for JSON, XML, SQL, cURL only (not YAML/CSV).
- JSON is strict (no comments/trailing commas). YAML formatting does not expand flow collections or change quoting. SQL "validation" is structural only (parens, strings, comments, dangling clauses), and keywords are uppercased. XML checks well-formedness only. CSV delimiters: comma, tab, semicolon, pipe.
- cURL is parsed, never executed; `@file` is never read; values (tokens) are **not masked** in the UI. The app has internal cURL emitters for other languages, but the UI does not expose them, so the site does not advertise conversion.
- AI Fix / Explain: explicit click, first-use consent notice, request goes browser → DocuFormat server → Anthropic; 512 KB limit; prompts do not redact secrets; fix output is re-validated locally and never auto-applied. Server logs only method, route, status, duration, body size.
- No account in the app today ("no sign-up needed to try").

Re-check `privacy` and AI claims against the production deployment (provider, logging, retention) before launch. Re-run the example check if formatter output changes.
