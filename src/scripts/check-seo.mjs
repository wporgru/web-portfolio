import fs from 'node:fs';
import path from 'node:path';
import { services } from '../content/services.mjs';
import { serviceDetails } from '../content/service-details.mjs';
import { caseHighlights } from '../content/case-highlights.mjs';
import { serviceGroups } from '../content/service-groups.mjs';
import { createEnquiry, enquiryPrompts } from '../content/enquiry.mjs';
import { servicePaths } from '../content/service-paths.mjs';
import { migrationGuide } from '../content/migration-guide.mjs';
import { guides } from '../content/guides.mjs';
import { latestCaseRevision, readCaseRevisions } from './case-revisions.mjs';

const root = 'dist';
const read = file => fs.readFileSync(file, 'utf8');
const fail = (file, why) => { throw Error(file + ': ' + why); };
const htmlFiles = fs.readdirSync(root, {recursive:true}).filter(file => path.basename(file)==='index.html');
const sitemapEntries = new Map();
const sitemapRevisions = new Map();
for (const file of fs.readdirSync(root).filter(file=>/^sitemap-\d+\.xml$/.test(file))) {
  const xml = read(path.join(root,file));
  if (xml.includes('<image:image>') && !xml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')) {
    fail(file,'missing image sitemap namespace');
  }
  for (const [,entry] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const url = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!url || sitemapEntries.has(url)) fail(file,'missing or repeated sitemap URL');
    sitemapEntries.set(url,[...entry.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(m=>m[1]));
    const revisions=[...entry.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)];
    if (revisions.length>1) fail(url,'multiple sitemap revision dates');
    if (revisions.length) sitemapRevisions.set(url,revisions[0][1]);
  }
}
const sitemap = new Set(sitemapEntries.keys());
const textSitemap=read(path.join(root,'sitemap.txt')).split('\n');
if (textSitemap.pop()!=='' || textSitemap.length!==sitemap.size ||
    new Set(textSitemap).size!==sitemap.size ||
    textSitemap.some(url=>!sitemap.has(url))) fail('sitemap.txt','expected exactly the same canonical URLs as XML');
const pages = new Map();
const internalTargets = new Map();
const navigationTargets = new Map();
const breadcrumbTargets = new Map();
const sharingCards = new Map();
const originalImages = new Map();
const titles = new Set(), descriptions = new Set();
let enquiryPages = 0;
let telegramPages = 0;
const enquiryKinds = new Map(services.map(service=>[service.slug,service]));
function telegramDrafts(html, expected, count, label) {
  const links=[...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*\bdata-enquiry-telegram\b[^>]*>/g)];
  const template=new URL(expected).searchParams.get('text');
  if (links.length!==count || links.some(([,raw]) => {
    const url=URL.parse(raw.replaceAll('&amp;','&'));
    return url?.origin!=='https://t.me' || url.pathname!=='/wporgru' || url.hash ||
      url.searchParams.size!==1 || url.searchParams.get('text')!==template;
  })) fail(label,'missing or mismatched contextual Telegram draft');
  telegramPages++;
}
if (Object.keys(enquiryPrompts).length!==services.length || services.some(service=>!enquiryPrompts[service.slug])) {
  fail('enquiry','expected bilingual prompts for every service');
}
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
  const enquiryRoute=/(?:^|\/)(services|showcase)\/([a-z0-9-]+)(?:\/en)?\/$/.exec(new URL(canonical).pathname);
  if(enquiryRoute && !['ru','en'].includes(enquiryRoute[2])){
    const [,section,slug]=enquiryRoute;
    const isService=section==='services';
    const group=isService?enquiryKinds.get(slug):services.find(service=>service.cases.includes(slug));
    const templates=[...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*\bdata-enquiry-email\b[^>]*>/g)];
    if(templates.length!==(isService?2:1)||(!isService&&!html.includes('href="#enquiry"'))) fail(file,'missing enquiry action');
    const mail=new URL(templates[0][1].replaceAll('&amp;','&'));
    const expectedTelegram='https://t.me/wporgru?text='+encodeURIComponent(
      mail.searchParams.get('subject')+'\n\n'+(mail.searchParams.get('body')??'').replaceAll('\r\n','\n'));
    telegramDrafts(html,expectedTelegram,isService?2:1,file);
    for(const [,raw] of templates){
      const draft=new URL(raw.replaceAll('&amp;','&'));
      const body=draft.searchParams.get('body')??'';
      const prompts=enquiryPrompts[group?.slug]?.[lang==='ru'?0:1]??[];
      const first=lang==='ru'?'Адрес сайта или ссылка на пример:':'Website or reference URL:';
      const source=lang==='ru'?(isService?'Страница услуги: ':'Кейс, на который я ссылаюсь: '):(isService?'Service page: ':'Reference case: ');
      if(draft.protocol!=='mailto:'||draft.pathname!=='zakaz@wp.org.ru'||!draft.searchParams.get('subject')||
          !body.startsWith(first+'\r\n\r\n')||!body.endsWith(source+canonical)||
          !prompts.every(prompt=>body.includes(prompt+':'))) fail(file,'wrong recipient, locale, source or enquiry prompts');
    }
    enquiryPages++;
  }
  if (/^services[\\/](?!en[\\/])[^\\/]+[\\/](?:en[\\/])?index\.html$/.test(file)) {
    for (const marker of ['data-service-scenario','data-service-deliverables','mailto:zakaz@wp.org.ru?subject=']) {
      if (!html.includes(marker)) fail(file,'missing service content: '+marker);
    }
  }
  const alternates=new Map([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m=>[m[1],m[2]]));
  if(alternates.size!==3||!['ru','en'].includes(lang)||alternates.get(lang)!==canonical||alternates.get('x-default')!==alternates.get('ru')) fail(file,'invalid locale alternates');
  pages.set(canonical,alternates);
  originalImages.set(canonical,[...html.matchAll(/<a\b[^>]*\bdata-original-image(?=\s|>)[^>]*>/g)]
    .map(([tag])=>tag.match(/\bhref="([^"]+)"/)?.[1])
    .filter(Boolean));
  const social = (attribute, key) => html.match(new RegExp('<meta '+attribute+'="'+key+'" content="([^"]+)"'))?.[1];
  const image = social('property','og:image');
  if(!image||social('name','twitter:image')!==image||
    !social('property','og:image:alt')||social('property','og:image:alt')!==social('name','twitter:image:alt')||
    social('property','og:url')!==canonical||social('property','og:image:type')!=='image/png'||
    social('property','og:image:width')!=='1200'||social('property','og:image:height')!=='630')fail(file,'invalid sharing metadata');
  sharingCards.set(canonical,image);
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
  navigationTargets.set(canonical,{
    lang,
    links:[...html.matchAll(/<a\b([^>]+)>/gi)].flatMap(([,attrs])=>{
      const raw=attrs.match(/\shref="([^"]+)"/i)?.[1];
      if (!raw || /\srel="[^"]*\bnofollow\b/i.test(attrs)) return [];
      const target=URL.parse(raw.replaceAll('&amp;','&'),canonical);
      if (!target || target.search) return [];
      target.hash='';
      return [target.href];
    }),
  });
}
if(!pages.size||sitemap.size!==pages.size) fail(root,'sitemap and HTML counts differ');
const home = [...pages.values()].find(group=>group.get('ru')?.endsWith('/showcase/'));
if(!home) fail(root,'Russian catalog missing');
const base = new URL(home.get('ru')).pathname.slice(0,-'showcase/'.length);
const profileUrl = new URL(base,home.get('ru')).href;
// Count direct HTML navigation, not sitemap submissions, scripts or language switches.
let checkedNavigationPages=0;
for (const lang of ['ru','en']) {
  const start=new URL(lang==='ru'?'':'en/',profileUrl).href;
  if (navigationTargets.get(start)?.lang!==lang) fail(start,'localized homepage missing');
  const depth=new Map([[start,0]]);
  const queue=[start];
  for (const source of queue) {
    for (const target of navigationTargets.get(source).links) {
      if (navigationTargets.get(target)?.lang!==lang || depth.has(target)) continue;
      depth.set(target,depth.get(source)+1);
      queue.push(target);
    }
  }
  for (const [url,page] of navigationTargets) {
    if (page.lang!==lang) continue;
    if (!depth.has(url)) fail(url,'no same-language HTML navigation path from homepage');
    if (depth.get(url)>3) fail(url,'more than three HTML links from the localized homepage');
    checkedNavigationPages++;
  }
  console.log(lang+': '+depth.size+' pages reachable by HTML links; maximum depth '+Math.max(...depth.values())+'.');
}
for (const item of guides) for (const suffix of ['', 'en/']) {
  const route=`guides/${item.slug}/${suffix}`;
  const html=read(path.join(root,route,'index.html'));
  const lang=suffix?'en':'ru';
  const enquiry=createEnquiry({lang,title:item[lang].action,url:new URL(route,profileUrl).href,
    kind:'guide',serviceSlug:item.primaryService,customPrompts:item[lang].enquiry});
  telegramDrafts(html,enquiry.telegramHref,1,route);
  if (!sitemap.has(new URL(route,profileUrl).href) ||
      !html.includes(`href="${base}services/${item.primaryService}/${suffix}"`)) fail(route,'missing sitemap entry or primary service');
  for (const slug of item.services) {
    const servicePath=`services/${slug}/${suffix}`;
    if (!read(path.join(root,servicePath,'index.html')).includes(`href="${base}${route}"`)) fail(route,'missing contextual link from '+servicePath);
  }
  for (const slug of item.cases) {
    const casePath=`showcase/${slug}/${suffix}`;
    if (!html.includes(`href="${base}${casePath}"`) ||
        !read(path.join(root,casePath,'index.html')).includes(`href="${base}${route}"`)) fail(route,'missing reciprocal case link '+slug);
  }
}
for (const suffix of ['', 'en/']) {
  const route=`guides/${migrationGuide.slug}/${suffix}`;
  const guide=read(path.join(root,route,'index.html'));
  const steps=guide.match(/<ol\b[^>]*class="guide-steps"[^>]*>([\s\S]*?)<\/ol>/)?.[1]??'';
  if ([...steps.matchAll(/<li\b/g)].length!==5 || !sitemap.has(new URL(route,profileUrl).href)) fail(route,'incomplete guide or sitemap entry');
  for (const ref of [...migrationGuide.cases.map(slug=>'showcase/'+slug),...migrationGuide.services.map(slug=>'services/'+slug)]) {
    const refPath=ref+'/'+suffix;
    const html=read(path.join(root,refPath,'index.html'));
    if (!html.includes(`href="${base}${route}"`) ||
        (!guide.includes(`href="${base}${refPath}"`) && !ref.startsWith('services/'))) {
      fail(route,'missing contextual case or service link: '+refPath);
    }
  }
  if (!guide.includes(`href="${base}services/hosting-migration/${suffix}"`)) fail(route,'missing next step for migration');
}
const caseRevisions=readCaseRevisions({required:process.env.GITHUB_ACTIONS==='true'});
let verifiedRevisions=0;
for (const [url,images] of sitemapEntries){
  const route=new URL(url).pathname.slice(base.length);
  const match=/^showcase\/([a-z0-9-]+)(\/en)?\/$/.exec(route);
  const lastmod=sitemapRevisions.get(url);
  if (!match || ['ru','en'].includes(match[1])) {
    if (lastmod) fail(url,'non-case route has a synthesized lastmod');
    continue;
  }
  const [,slug,en]=match;
  const file=`public/media/projects/${slug}/${slug.replaceAll('-','_')}_${en?'en':'ru'}.yaml`;
  const expected=latestCaseRevision(caseRevisions,[file,...images.map(src=>'public/'+new URL(src).pathname.slice(base.length))]);
  if (process.env.GITHUB_ACTIONS==='true' && !expected) fail(url,'missing case content history in release checkout');
  if (lastmod!==expected || (lastmod && Date.parse(lastmod)>Date.now())) fail(url,'sitemap revision does not match the case content history');
  if (lastmod) verifiedRevisions++;
}
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
if (googleVerification) {
  const homeHtml=read(path.join(root,'index.html'));
  if (!homeHtml.includes('<meta name="google-site-verification" content="'+googleVerification+'"')) {
    fail('home','configured Google ownership proof is missing');
  }
}
for (const suffix of ['', 'en/']) {
  const homepage = read(path.join(root,suffix,'index.html'));
  const examples = [...homepage.matchAll(/<a\b[^>]*data-skill-example\b[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
  if (examples.length!==6 || new Set(examples.map(([,href])=>href)).size!==6 ||
      examples.some(([,href,label])=>!label.trim() || !href.startsWith(base+'showcase/') ||
        (suffix ? !href.endsWith('/en/') : href.endsWith('/en/')) ||
        !sitemap.has(new URL(href,profileUrl).href))) fail('home/'+suffix,'expected six distinct localized skill examples');
}
const personId = profileUrl+'#oleg-tishin';
const jsonLdOf = (html,type) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map(([,value])=>JSON.parse(value)).filter(node=>node['@type']===type);
const decode = value => value?.replace(/&(?:#(\d+)|#x([\da-f]+)|(amp|lt|gt|quot|apos));/gi, (_, decimal, hex, named) =>
  decimal ? String.fromCodePoint(Number(decimal)) : hex ? String.fromCodePoint(parseInt(hex,16)) :
    ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"})[named.toLowerCase()]);
let verifiedArticles = 0;
for (const [url,alternates] of pages) {
  const route = new URL(url).pathname.slice(base.length);
  if (!/^(?:showcase|guides)\/(?!en\/)[a-z0-9-]+\/(?:en\/)?$/.test(route)) continue;
  const html = read(path.join(root,route,'index.html'));
  const [article,...extras] = jsonLdOf(html,'Article');
  const locale = alternates.get('ru') === url ? 'ru' : 'en';
  const authorName = locale === 'ru' ? 'Олег Тишин' : 'Oleg Tishin';
  const authorHome = base+(locale === 'en'?'en/':'');
  const byline = html.match(/<a\b([^>]*\bdata-article-author(?:\s|>)[^>]*)>([^<]+)<\/a>/);
  if (!article || extras.length || article['@id'] !== url+'#article' || article.url !== url ||
      article.mainEntityOfPage?.['@type'] !== 'WebPage' || article.mainEntityOfPage?.['@id'] !== url ||
      article.inLanguage !== locale || article.headline !== decode(html.match(/<h1\b[^>]*>([^<]+)<\/h1>/i)?.[1]) ||
      article.description !== decode(html.match(/<meta name="description" content="([^"]+)"/)?.[1]) ||
      article.author?.['@type'] !== 'Person' || article.author?.['@id'] !== personId ||
      article.author?.url !== profileUrl || article.author?.name !== authorName ||
      !byline?.[1].includes(`href="${authorHome}"`) || decode(byline?.[2]) !== authorName ||
      !html.includes('<meta property="og:type" content="article"') ||
      ['datePublished','dateModified','review','aggregateRating'].some(key=>key in article)) fail(url,'invalid article schema or byline');
  if (article.image !== undefined) {
    const image = Array.isArray(article.image) && article.image.length === 1 ? URL.parse(article.image[0]) : null;
    if (!image || image.origin !== new URL(url).origin || !image.pathname.startsWith(base+'media/projects/') ||
        !originalImages.get(url)?.includes(image.pathname) ||
        !fs.existsSync(path.join(root,image.pathname.slice(base.length)))) fail(url,'article image is not a visible case asset');
  }
  verifiedArticles++;
}
for (const lang of ['ru','en']) {
  const suffix = lang==='en'?'en/':'';
  const providerName = lang==='en'?'Oleg Tishin':'Олег Тишин';
  const people = jsonLdOf(read(path.join(root,suffix,'index.html')),'Person');
  if (people.length!==1 || people[0]['@id']!==personId || people[0].url!==profileUrl || people[0].name!==providerName) fail(lang,'invalid author identity');
  const index = read(path.join(root,'services',suffix,'index.html'));
  const [list,...extra] = jsonLdOf(index,'ItemList');
  const catalogUrl = new URL('services/'+suffix,profileUrl).href;
  const sorted = serviceGroups.flatMap(group=>group.slugs);
  if (!list || extra.length || list['@id']!==catalogUrl+'#services' || list.numberOfItems!==services.length ||
      list.itemListElement?.length!==sorted.length) fail(catalogUrl,'invalid service list structured data');
  for (const [i,slug] of sorted.entries()) {
    const service = services.find(item=>item.slug===slug);
    const [name,description] = service[lang];
    const route = 'services/'+slug+'/'+suffix;
    const url = new URL(route,profileUrl).href;
    const item = list.itemListElement[i];
    if (item?.['@type']!=='ListItem' || item.position!==i+1 || item.name!==name || item.url!==url ||
        !index.includes(`href="${base}${route}"`) || !sitemap.has(url)) fail(url,'invalid service list item');
    const html = read(path.join(root,route,'index.html'));
    const [node,...others] = jsonLdOf(html,'Service');
    if (!node || others.length || node['@id']!==url+'#service' || node.url!==url ||
        node.name!==name || node.description!==description ||
        node.provider?.['@type']!=='Person' || node.provider?.['@id']!==personId ||
        node.provider?.url!==profileUrl || node.provider?.name!==providerName ||
        ['offers','review','aggregateRating'].some(key=>key in node)) fail(url,'invalid service entity or unverified offer and review');
  }
}
for (const [slug, localized] of Object.entries(caseHighlights)) {
  for (const lang of ['ru','en']) {
    const html = read(path.join(root,'showcase',slug,lang==='en'?'en':'','index.html'));
    const expected = localized[lang];
    const lead = html.match(/<p\b[^>]*\bdata-case-highlight[^>]*>([^<]+)<\/p>/)?.[1];
    const meta = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    const share = html.match(/<meta property="og:description" content="([^"]+)"/)?.[1];
    if (!expected?.trim() || lead!==expected || meta!==expected || share!==expected) fail(slug+'/'+lang,'case highlight differs from the visible lead or metadata');
  }
}
let canonicalInternalLinks = 0;
let imageEntries = 0;
const distinctSitemapImages = new Set();
for (const suffix of ['', 'en/']) {
  const catalog = read(path.join(root,'showcase',suffix,'index.html'));
  const searchForm=catalog.match(/<form\b[^>]*class="card case-search"[^>]*>/)?.[0];
  if (!searchForm || /\bhidden\b/.test(searchForm) ||
      !/<fieldset\b[^>]*disabled/.test(catalog)) {
    fail('showcase/'+suffix,'catalog filters must reserve their layout before JavaScript runs');
  }
  if (/\bdata-(?:search|tech)="/.test(catalog) ||
      !catalog.includes('data-project-stack') || !catalog.includes('data-project-year')) {
    fail('showcase/'+suffix,'catalog search should reuse the rendered descriptions, dates and stack tags');
  }
  const tasks = new Map(services.map(service=>[service.slug,new Set()]));
  for (const [tag,slug] of catalog.matchAll(/<div\b[^>]*\bdata-case="([^"]+)"[^>]*>/g)) {
    for (const task of (tag.match(/\bdata-tasks="([^"]+)"/)?.[1] ?? '').split(' ').filter(Boolean)) {
      if (!tasks.has(task)) fail(slug,'unknown catalog task: '+task);
      tasks.get(task).add(slug);
    }
  }
  for (const service of services) {
    const actual = tasks.get(service.slug);
    if (!new RegExp(`<option\\b[^>]*\\bvalue="${service.slug}"`).test(catalog) || actual.size!==service.cases.length ||
        service.cases.some(slug=>!actual.has(slug))) fail(service.slug,'catalog task does not match service cases');
    const html = read(path.join(root,'services',service.slug,suffix,'index.html'));
    if (!html.includes(`href="${base}showcase/${suffix}?task=${service.slug}"`)) fail(service.slug,'missing localized catalog task link');
  }
}
const imageManifest = JSON.parse(read('.astro/project-images.json'));
for (const [src, image] of Object.entries(imageManifest)) {
  const original = fs.statSync(path.join(root,src)).size;
  const cover = fs.statSync(path.join(root,image.cover)).size;
  if (cover > 160_000) fail(src,'catalog cover exceeds 160 KB');
  for (const variant of image.variants) {
    if (variant.width>=image.width || fs.statSync(path.join(root,variant.url)).size>=original) fail(src,'responsive variant is not smaller');
  }
}
for (const suffix of ['', 'en/']) {
  const catalog = read(path.join(root,'showcase',suffix,'index.html'));
  if (!catalog.includes('/media/previews/') || /class="media__el" src="[^"]*\/media\/projects\/[^"]+\.(?:png|jpe?g|webp)"/i.test(catalog)) fail('showcase/'+suffix,'catalog must use compact covers');
  const detail = read(path.join(root,'showcase','78-dosok',suffix,'index.html'));
  for (const name of ['before-redesign.webp','after-redesign.webp','site.png']) {
    const src = '/media/projects/78-dosok/'+name;
    const image = imageManifest[src];
    if (!image || !detail.includes(`href="${base.slice(0,-1)}${src}"`) || !detail.includes(`width="${image.width}" height="${image.height}"`)) fail(src,'missing original link or reserved image dimensions');
  }
}
for (const service of services) {
  const choices=servicePaths[service.slug];
  if (choices?.length!==2 || new Set(choices.map(([target])=>target)).size!==2 ||
      choices.some(([target,ru,en])=>target===service.slug||!enquiryKinds.has(target)||!ru?.trim()||!en?.trim())) {
    fail(service.slug,'expected two distinct editorial service alternatives in both languages');
  }
  for (const suffix of ['', 'en/']) {
    const route = `services/${service.slug}/${suffix}`;
    const detail = read(path.join(root,route,'index.html'));
    const paths=detail.match(/<section\b[^>]*data-service-paths[^>]*>([\s\S]*?)<\/section>/)?.[1]??'';
    const linked=[...paths.matchAll(/<a\b[^>]*data-related-service="([^"]+)" href="([^"]+)"/g)];
    if (linked.length!==choices.length || choices.some(([target],idx)=>
      linked[idx][1]!==target || linked[idx][2]!==`${base}services/${target}/${suffix}` ||
      !sitemap.has(new URL(linked[idx][2],profileUrl).href))) {
      fail(route,'missing canonical localized related service links');
    }
    const index = read(path.join(root,'services',suffix,'index.html'));
    const homepage = read(path.join(root,suffix,'index.html'));
    if (![index,homepage].every(html => html.includes(`href="${base}${route}"`))) fail(route,'service is not linked from the homepage and services index');
    const questions = serviceDetails[service.slug].questions?.[suffix ? 'en' : 'ru'];
    if (questions?.length && !detail.includes('data-service-questions')) fail(route,'missing service questions');
    const steps = serviceDetails[service.slug].steps?.[suffix ? 'en' : 'ru'] ?? [];
    const stepMarkup = detail.match(/<section\b[^>]*\bdata-service-steps[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? '';
    if ([...stepMarkup.matchAll(/<li\b/g)].length !== steps.length ||
        steps.some(([heading])=>!stepMarkup.includes(heading+'.'))) fail(route,'missing or unexpected service process steps');
    for (const slug of service.cases) {
      const caseRoute = `showcase/${slug}/${suffix}`;
      const casePage = read(path.join(root,caseRoute,'index.html'));
      if (!detail.includes(`href="${base}${caseRoute}"`) || !casePage.includes(`href="${base}${route}"`)) fail(route,'missing reciprocal service and case links: '+caseRoute);
    }
  }
}
const exists = relative => {
  const direct = path.join(root,relative);
  return [direct,path.join(direct,'index.html')].some(file=>fs.statSync(file,{throwIfNoEntry:false})?.isFile());
};
for(const [canonical,alternates] of pages){
  const relative = new URL(canonical).pathname.slice(base.length);
  const isDetail = /^services\//.test(relative) || /^showcase\/(?!en\/$)[a-z0-9-]+\/(?:en\/)?$/.test(relative);
  if(isDetail&&!breadcrumbTargets.has(canonical))fail(canonical,'missing visible breadcrumbs');
  const locale = canonical===alternates.get('ru')?'ru':'en';
  const sharingUrl=new URL(sharingCards.get(canonical));
  const expectedCard=relative.startsWith('showcase/78-dosok/')?'78-dosok':'portfolio';
  if(sharingUrl.origin!==new URL(canonical).origin||sharingUrl.pathname!==base+'media/sharing/'+expectedCard+'-'+locale+'.png')fail(canonical,'sharing image locale or route mismatch');
  const caseSlug = /^showcase\/([a-z0-9-]+)\/(?:en\/)?$/.exec(relative)?.[1];
  const prefix = base+'media/projects/'+caseSlug+'/';
  const expectedImages = new Set((caseSlug ? originalImages.get(canonical) : [])
    .filter(src=>src.startsWith(prefix) && /^[a-z0-9_.-]+\.(?:png|jpe?g|webp|gif|avif)$/i.test(src.slice(prefix.length)))
    .map(src=>new URL(src,canonical).href));
  const listedImages = sitemapEntries.get(canonical);
  if (listedImages.length!==expectedImages.size || new Set(listedImages).size!==expectedImages.size ||
      listedImages.some(src=>!expectedImages.has(src) || !exists(new URL(src).pathname.slice(base.length)))) {
    fail(canonical,'image sitemap differs from original images in HTML');
  }
  if (listedImages.length) imageEntries++;
  for (const image of listedImages) distinctSitemapImages.add(image);
  for(const target of breadcrumbTargets.get(canonical)??[]){
    if(pages.get(target)?.get(locale)!==target)fail(canonical,'breadcrumb leads to wrong locale: '+target);
  }
  for(const link of internalTargets.get(canonical)){
    const linked = new URL(link,canonical);
    const target = decodeURIComponent(linked.pathname);
    if(target.startsWith(base)&&!exists(target.slice(base.length))) fail(canonical,'broken local URL '+link);
    const pathWithSlash = linked.pathname.endsWith('/') ? linked.pathname : linked.pathname+'/';
    if(pages.has(linked.origin+pathWithSlash)){
      if(linked.pathname!==pathWithSlash) fail(canonical,'internal page link is not canonical: '+link);
      canonicalInternalLinks++;
    }
  }
  for(const target of alternates.values()){
    const peer=pages.get(target);
    if(!peer||[...alternates].some(([lang,href])=>peer.get(lang)!==href)) fail(canonical,'nonreciprocal alternate '+target);
  }
}
for (const url of new Set(sharingCards.values())) {
  const bytes=fs.readFileSync(path.join(root,new URL(url).pathname.slice(base.length)));
  if(bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||bytes.readUInt32BE(16)!==1200||bytes.readUInt32BE(20)!==630)fail(url,'sharing image must be a 1200×630 PNG');
}
console.log('SEO checks passed for '+pages.size+' HTML pages and '+breadcrumbTargets.size+' breadcrumb trails.');
console.log('Verified '+canonicalInternalLinks+' canonical internal page links.');
console.log('Verified '+distinctSitemapImages.size+' original images across '+imageEntries+' localized image sitemap entries.');
console.log('Verified contextual enquiry templates for '+enquiryPages+' localized case and service pages.');
console.log('Verified Telegram drafts on '+telegramPages+' localized case, service and guide pages.');
console.log('Verified versioned sitemap revision dates for '+verifiedRevisions+' localized case pages.');
console.log('Verified homepage navigation for '+checkedNavigationPages+' localized pages without JavaScript.');
console.log('Verified '+verifiedArticles+' localized articles with visible bylines and canonical author linkage.');
