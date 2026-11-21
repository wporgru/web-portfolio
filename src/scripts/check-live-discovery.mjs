import assert from 'node:assert/strict';

const site = new URL('https://wporgru.github.io/web-portfolio/');
const samples = ['', 'en/', 'showcase/', 'showcase/en/', 'services/', 'services/en/'];

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
    if (attempt < 4) await new Promise(resolve => setTimeout(resolve, 3000));
  }
  assert.equal(observed, expected, 'The expected revision did not reach GitHub Pages');
}

const xmlTypes = ['application/xml', 'text/xml'];
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
  const html = await get(route, ['text/html']);
  assert.ok(html.includes('<link rel="canonical" href="' + canonical + '"'), 'Wrong canonical on ' + canonical);
  assert.doesNotMatch(html, /<meta name="robots" content="[^"]*\bnoindex\b/i, 'Sample has noindex: ' + canonical);
}
console.log('Live discovery: ' + children.length + ' XML sitemap(s), ' + known.size + ' URLs in matching XML and TXT, ' + samples.length + ' canonical HTML samples.');
console.log('This checks live delivery, not search engine processing or indexing.');
