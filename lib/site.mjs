// Site-wide configuration and shared navigation data.
// SITE_URL and APP_URL are build-time settings; the defaults are placeholders until the
// production domain and application URL are confirmed (see README).
export const SITE_URL = (process.env.DOCUFORMAT_SITE_URL || 'https://docuformat.com').replace(/\/$/, '');
// While APP_URL is unset the app is not public: every CTA reads "Coming soon" and leads to /coming-soon.
export const APP_URL = process.env.DOCUFORMAT_APP_URL || '';
export const LIVE = Boolean(APP_URL);
// Share link of the updates sign-up form (docs.google.com/forms/... is embedded; other HTTPS links become a button).
export const FORM_URL = process.env.DOCUFORMAT_FORM_URL || '';
export const NAME = 'DocuFormat';
export const TAGLINE = 'Format. Validate. Fix. Explain.';
export const DEFAULT_DESCRIPTION = 'DocuFormat formats, validates, fixes and explains JSON, YAML, XML, CSV, SQL and cURL. Deterministic parsers for routine work; AI repair only when you ask for it.';

// Marker the dev server and build rewrite when pointing at a different app URL.
export const APP_LINK_ATTR = 'data-app-link';

export const FORMATS = [
  { id: 'json', label: 'JSON', slug: 'json-formatter', cta: 'Format JSON →', blurb: 'Pretty-print, minify, validate and repair JSON.' },
  { id: 'yaml', label: 'YAML', slug: 'yaml-formatter', cta: 'Format YAML →', blurb: 'Clean up YAML and identify indentation and syntax problems.' },
  { id: 'xml', label: 'XML', slug: 'xml-formatter', cta: 'Format XML →', blurb: 'Pretty-print XML and identify malformed tags and nesting.' },
  { id: 'csv', label: 'CSV', slug: 'csv-formatter', cta: 'Format CSV →', blurb: 'Inspect, format and validate CSV with structured table previews.' },
  { id: 'sql', label: 'SQL', slug: 'sql-formatter', cta: 'Format SQL →', blurb: 'Format SQL queries and use AI to explain or help repair problematic SQL.' },
  { id: 'curl', label: 'cURL', slug: 'curl-formatter', cta: 'Format cURL →', blurb: 'Turn difficult-to-read cURL commands into understandable API requests.' }
];

// Footer "Product" links go to the pages that explain each capability.
export const PRODUCT_LINKS = [
  ['Formatter', '/json-formatter/'],
  ['AI Fix', '/ai-json-fixer/'],
  ['Explain', '/curl-explainer/']
];
export const RESOURCE_LINKS = [
  ['Features', '/features/'],
  ['Privacy', '/privacy/'],
  ['About', '/about/'],
  ['Get updates', '/coming-soon/']
];
