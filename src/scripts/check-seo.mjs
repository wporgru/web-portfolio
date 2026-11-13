import fs from 'node:fs';
import path from 'node:path';

const root = 'dist';
const read = file => fs.readFileSync(file, 'utf8');
const fail = (file, why) => { throw Error(file + ': ' + why); };
const htmlFiles = fs.readdirSync(root, {recursive:true}).filter(file => path.basename(file)==='index.html');
const sitemap = new Set(fs.readdirSync(root).filter(file=>/^sitemap-\d+\.xml$/.test(file))
  .flatMap(file=>[...read(path.join(root,file)).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1])));
const pages = new Map();
const titles = new Set(), descriptions = new Set();
for(const file of htmlFiles){
  const html=read(path.join(root,file));
  const lang=html.match(/<html lang="([^"]+)"/)?.[1];
  const title=html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
  const desc=html.match(/<meta name="description" content="([^"]+)"/)?.[1]?.trim();
  if(!title||!desc||titles.has(title)||descriptions.has(desc)) fail(file,'missing or duplicate title or description');
  titles.add(title); descriptions.add(desc);
  const headings=[...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)];
  const length=headings[0]?.[2].replace(/<[^>]*>/g,'').replace(/&(?:#\d+|#x[0-9a-f]+|\w+);/gi,'_').trim().length;
  if(headings[0]?.[1]!=='1'||headings.filter(m=>m[1]==='1').length!==1||!(length>=20&&length<=70)) fail(file,'expected a single first H1 of 20–70 characters');
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if(!canonical||pages.has(canonical)||!sitemap.has(canonical)||/<meta name="robots" content="[^"]*noindex/i.test(html)) fail(file,'indexable canonical missing from sitemap or duplicated');
  const alternates=new Map([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m=>[m[1],m[2]]));
  if(alternates.size!==3||!['ru','en'].includes(lang)||alternates.get(lang)!==canonical||alternates.get('x-default')!==alternates.get('ru')) fail(file,'invalid locale alternates');
  pages.set(canonical,alternates);
}
if(!pages.size||sitemap.size!==pages.size) fail(root,'sitemap and HTML counts differ');
for(const [canonical,alternates] of pages){
  for(const target of alternates.values()){
    const peer=pages.get(target);
    if(!peer||[...alternates].some(([lang,href])=>peer.get(lang)!==href)) fail(canonical,'nonreciprocal alternate '+target);
  }
}
console.log('SEO checks passed for '+pages.size+' HTML pages.');
