import assert from 'node:assert/strict';
import {setTimeout as delay} from 'node:timers/promises';
import {livePublicationUrl,rootRobots} from './publication.mjs';

if (process.env.GITHUB_ACTIONS === 'true') {
  assert.ok(process.env.PORTFOLIO_LIVE_URL?.trim(),'GitHub Pages did not report a deployment URL');
}
const site = livePublicationUrl();
const samples = ['', 'en/', 'showcase/', 'showcase/en/', 'services/', 'services/en/', 'guides/', 'guides/en/'];
const args = process.argv.slice(2);
assert.ok(!args.length || (args.length === 1 && args[0] === '--all'), 'Usage: node src/scripts/check-live-discovery.mjs [--all]');
const fullCrawl = args.length === 1;

async function get(route, mime) {
  const url = new URL(route, site);
  const response = await fetch(url, {
    redirect: 'manual',
    headers: { 'Cache-Control': 'no-cache' },
    signal: AbortSignal.timeout(12_000),
  });
  assert.equal(response.status, 200, url.href + ': expected HTTP 200 without redirection');
  const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  assert.ok(mime.includes(type), url.href + ': unexpected Content-Type ' + type);
  assert.ok(!/\b(?:noindex|none)\b/i.test(response.headers.get('x-robots-tag') ?? ''), url.href + ': X-Robots-Tag blocks indexing');
  return response.text();
}

const expected = process.env.GITHUB_ACTIONS === 'true' ? process.env.GITHUB_SHA : undefined;
if (expected) {
  let observed;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      observed = (await get('release-revision.txt?sha=' + expected, ['text/plain'])).trim();
    } catch (error) {
      if (attempt === 4) throw error;
    }
    if (observed === expected) break;
    if (attempt < 4) await delay(3000);
  }
  assert.equal(observed, expected, 'The expected revision did not reach GitHub Pages');
}

const startRevision = fullCrawl ? (await get('release-revision.txt', ['text/plain'])).trim() : undefined;
const xmlTypes = ['application/xml', 'text/xml'];
const robots = rootRobots(site);
if (robots) assert.equal(await get('robots.txt',['text/plain']),robots,'Root robots.txt must point to the published sitemap');
const locations = source => [...source.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url.trim());
const index = await get('sitemap-index.xml', xmlTypes);
assert.match(index, /<sitemapindex\b/, 'Sitemap index is not an XML sitemap index');
const children = locations(index);
assert.ok(children.length && children.length === new Set(children).size, 'Missing or repeated sitemap children');
const urls = [];
for (const child of children) {
  assert.ok(child.startsWith(site.href) && /^sitemap-\d+\.xml$/.test(child.slice(site.href.length)), 'Unexpected sitemap child ' + child);
  const xml = await get(child, xmlTypes);
  assert.match(xml, /<urlset\b/, 'Unexpected document for ' + child);
  const pages = locations(xml);
  assert.ok(pages.length > 0, 'Empty sitemap child ' + child);
  urls.push(...pages);
}
const known = new Set(urls);
assert.equal(known.size, urls.length, 'Duplicate URLs in live XML sitemaps');
for (const url of known) {
  const parsed = new URL(url);
  assert.ok(url.startsWith(site.href) && !parsed.search && !parsed.hash, 'Non-canonical sitemap URL ' + url);
}
const plain = (await get('sitemap.txt', ['text/plain'])).trim().split(/\r?\n/);
assert.equal(new Set(plain).size, urls.length, 'TXT/XML URL counts differ');
assert.ok(plain.length === urls.length && plain.every(url => known.has(url)), 'TXT/XML URL sets differ');

for (const route of samples) {
  const canonical = new URL(route, site).href;
  assert.ok(known.has(canonical), 'Sample missing from sitemap: ' + canonical);
}

const targets = fullCrawl ? urls : samples.map(route => new URL(route, site).href);
const byPage = new Map();
const errors = [];
async function checkPage(url) {
  const html = await get(url, ['text/html']);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const canonicals = [...head.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(([,href]) => href);
  assert.deepEqual(canonicals, [url], 'Expected one self-referencing canonical');
  assert.doesNotMatch(head, /<meta name="(?:robots|googlebot|bingbot|yandex)" content="[^"]*\b(?:noindex|none)\b/i, 'HTML robots directive blocks indexing');
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  assert.ok(lang === 'ru' || lang === 'en', 'Missing or unexpected HTML language');
  const links = [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  const alternates = Object.fromEntries(links.map(([,label,href]) => [label,href]));
  assert.equal(links.length, 3, 'Expected RU, EN and x-default declarations');
  assert.ok(known.has(alternates.ru) && known.has(alternates.en) && alternates.ru !== alternates.en, 'Language counterparts must be distinct sitemap URLs');
  assert.equal(alternates[lang], url, 'Missing self-reference for HTML language');
  assert.equal(alternates['x-default'], alternates.ru, 'Unexpected x-default');
  byPage.set(url, {lang, alternates});
}

let next = 0;
async function crawl() {
  while (next < targets.length) {
    const url = targets[next++];
    try {
      await checkPage(url);
    } catch (error) {
      errors.push(url + ': ' + error.message);
    }
    if (fullCrawl && next < targets.length) await delay(200);
  }
}
await Promise.all(Array.from({length:fullCrawl ? 4 : 1}, crawl));

for (const [url, {alternates}] of byPage) {
  for (const lang of ['ru', 'en']) {
    const counterpart = byPage.get(alternates[lang]);
    if (!counterpart && !fullCrawl) continue;
    if (counterpart?.lang !== lang ||
        ['ru','en','x-default'].some(key => counterpart.alternates[key] !== alternates[key])) {
      errors.push(url + ': inconsistent ' + lang + ' language counterpart ' + alternates[lang]);
    }
  }
}
const confirmedRevision = (await get('release-revision.txt', ['text/plain'])).trim();
// A full crawl must describe one published release, not pages mixed across deployments.
if (fullCrawl) assert.equal(confirmedRevision, startRevision, 'Published revision changed during crawl; rerun the audit');
if (expected) assert.equal(confirmedRevision, expected, 'Published revision changed during the release check');
if (errors.length) {
  console.error(errors.sort().join('\n'));
  process.exitCode = 1;
}
console.log('Live discovery: ' + children.length + ' XML sitemap(s), ' + known.size + ' URLs in matching XML and TXT.');
console.log(byPage.size + '/' + targets.length + ' HTML responses passed status, canonical, robots and localized metadata checks (' + errors.length + ' total issues). Revision: ' + confirmedRevision);
console.log('This checks live delivery, not search engine processing or indexing.');
