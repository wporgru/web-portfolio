import fs from 'node:fs';
import path from 'node:path';

const root = 'dist';
const read = file => fs.readFileSync(file, 'utf8');
const fail = (file, why) => { throw Error(file + ': ' + why); };
const htmlFiles = fs.readdirSync(root, {recursive:true}).filter(file => path.basename(file)==='index.html');
const sitemap = new Set(fs.readdirSync(root).filter(file=>/^sitemap-\d+\.xml$/.test(file))
  .flatMap(file=>[...read(path.join(root,file)).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1])));
const pages = new Map();
const internalTargets = new Map();
const breadcrumbTargets = new Map();
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
  if (/^services[\\/](?!en[\\/])[^\\/]+[\\/](?:en[\\/])?index\.html$/.test(file)) {
    for (const marker of ['data-service-scenario','data-service-deliverables','mailto:zakaz@wp.org.ru?subject=']) {
      if (!html.includes(marker)) fail(file,'missing service content: '+marker);
    }
  }
  const alternates=new Map([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m=>[m[1],m[2]]));
  if(alternates.size!==3||!['ru','en'].includes(lang)||alternates.get(lang)!==canonical||alternates.get('x-default')!==alternates.get('ru')) fail(file,'invalid locale alternates');
  pages.set(canonical,alternates);
  const trail = html.match(/<nav\b[^>]*\bdata-breadcrumbs(?:\s|>)[\s\S]*?<\/nav>/)?.[0];
  if (trail) {
    const structured = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map(([, value]) => JSON.parse(value)).filter(data=>data['@type']==='BreadcrumbList');
    const items=structured[0]?.itemListElement;
    if(structured.length!==1||!Array.isArray(items)||items.length<2||items.at(-1)?.item!==canonical||
      items.some((item,i)=>item['@type']!=='ListItem'||item.position!==i+1||!item.name?.trim()||!sitemap.has(item.item))) fail(file,'invalid BreadcrumbList');
    const links = [...trail.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(([, href])=>new URL(href,canonical).href);
    if(!trail.includes('aria-current="page"')||links.length!==items.length-1||
      links.some((target,i)=>target!==items[i].item))fail(file,'visible breadcrumbs differ from BreadcrumbList');
    breadcrumbTargets.set(canonical,items.map(item=>item.item));
  }
  const links = [...html.matchAll(/<(?:a|img)\b[^>]*\s(?:href|src)="([^"]+)"/gi)]
    .map(([,url])=>url.replaceAll('&amp;','&'))
    .filter(url=>url.startsWith('/')&&!url.startsWith('//'));
  internalTargets.set(canonical,links);
}
if(!pages.size||sitemap.size!==pages.size) fail(root,'sitemap and HTML counts differ');
const home = [...pages.values()].find(group=>group.get('ru')?.endsWith('/showcase/'));
if(!home) fail(root,'Russian catalog missing');
const base = new URL(home.get('ru')).pathname.slice(0,-'showcase/'.length);
const exists = relative => {
  const direct = path.join(root,relative);
  return [direct,path.join(direct,'index.html')].some(file=>fs.statSync(file,{throwIfNoEntry:false})?.isFile());
};
for(const [canonical,alternates] of pages){
  const relative = new URL(canonical).pathname.slice(base.length);
  const isDetail = /^services\//.test(relative) || /^showcase\/(?!en\/$)[a-z0-9-]+\/(?:en\/)?$/.test(relative);
  if(isDetail&&!breadcrumbTargets.has(canonical))fail(canonical,'missing visible breadcrumbs');
  const locale = canonical===alternates.get('ru')?'ru':'en';
  for(const target of breadcrumbTargets.get(canonical)??[]){
    if(pages.get(target)?.get(locale)!==target)fail(canonical,'breadcrumb leads to wrong locale: '+target);
  }
  for(const link of internalTargets.get(canonical)){
    const target = decodeURIComponent(new URL(link,canonical).pathname);
    if(target.startsWith(base)&&!exists(target.slice(base.length))) fail(canonical,'broken local URL '+link);
  }
  for(const target of alternates.values()){
    const peer=pages.get(target);
    if(!peer||[...alternates].some(([lang,href])=>peer.get(lang)!==href)) fail(canonical,'nonreciprocal alternate '+target);
  }
}
console.log('SEO checks passed for '+pages.size+' HTML pages and '+breadcrumbTargets.size+' breadcrumb trails.');
