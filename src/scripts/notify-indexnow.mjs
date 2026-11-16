import {readdir,readFile} from 'node:fs/promises';

const site = new URL('https://wporgru.github.io/web-portfolio/');
const endpoint = 'https://yandex.com/indexnow';
const input = process.argv.slice(2);
const send = input.includes('--send');
const routes = [...new Set(input.filter(arg => arg !== '--send'))];
if (routes.length < 1 || routes.length > 20 || routes.some(route =>
  !/^(?:showcase|services)\/[a-z0-9-]+\/(?:en\/)?$/.test(route) || /^(?:showcase|services)\/(?:en|ru)\//.test(route)
)) {
  throw new Error('Pass 1–20 changed canonical routes (e.g. showcase/78-dosok/). Use --send to submit.');
}

const publicDir = new URL('../../public/',import.meta.url);
const files = (await readdir(publicDir)).filter(name => /^[a-f0-9]{48}\.txt$/.test(name));
if (files.length !== 1) throw new Error('Expected exactly one public IndexNow proof file.');
const [filename] = files;
const key = filename.slice(0,-4);
if ((await readFile(new URL(filename,publicDir),'utf8')).trim() !== key) {
  throw new Error('Local proof does not match its filename.');
}
const keyLocation = new URL(filename,site).href;
const urlList = routes.map(route=>new URL(route,site).href);
const fetchStrict=(url,options={})=>fetch(url,{redirect:'error',signal:AbortSignal.timeout(20_000),...options});
async function getText(url) {
  const response = await fetchStrict(url);
  if (!response.ok) throw new Error('Live verification failed: '+response.status+' '+url);
  return response.text();
}

const proof = await getText(keyLocation);
if (proof.trim() !== key) throw new Error('Proof file exists on Pages but does not contain the expected value.');
const sitemapIndex = await getText(new URL('sitemap-index.xml',site).href);
const childSitemaps = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([,loc])=>loc);
if (!childSitemaps.length || childSitemaps.some(loc =>
  !loc.startsWith(site.href) || !/^sitemap-\d+\.xml$/.test(loc.slice(site.href.length))
)) throw new Error('Unexpected sitemap index layout.');
const canonicalUrls = new Set();
for (const sitemap of childSitemaps) {
  const xml = await getText(sitemap);
  for (const [,loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) canonicalUrls.add(loc);
}
for (const url of urlList) {
  if (!canonicalUrls.has(url)) throw new Error('Not in the live sitemap: '+url);
  const html = await getText(url);
  if (!html.includes('<link rel="canonical" href="'+url+'"') ||
      /<meta name="robots" content="[^"]*\bnoindex\b/i.test(html)) {
    throw new Error('Not a live indexable canonical page: '+url);
  }
}

const result = {provider:'Yandex IndexNow',liveProof:'verified',urlList,mode:send?'send':'dry-run'};
if (send) {
  const response = await fetchStrict(endpoint,{
    method:'POST',
    headers:{'Content-Type':'application/json; charset=utf-8'},
    body:JSON.stringify({host:site.hostname,key,keyLocation,urlList}),
  });
  result.httpStatus = response.status;
  result.outcome = response.status===200?'submitted':response.status===202?'pending-key-validation':'rejected';
  if (response.status!==200 && response.status!==202) {
    result.providerResponse = (await response.text()).slice(0,300);
    process.exitCode=1;
  }
}
console.log(JSON.stringify(result,null,2));
