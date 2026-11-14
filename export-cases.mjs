import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { stringify } from 'yaml';
import { addEngineeringCases } from './engineering-export.mjs';

const root = path.resolve(process.argv[2] ?? '..');
const read = p => fs.readFileSync(p,'utf8').replace(/^\uFEFF/, '');
const save = (p,data) => { fs.mkdirSync(path.dirname(p),{recursive:true}); fs.writeFileSync(p,stringify(data)); };
const index = new Map(JSON.parse(read(path.join(root,'orders/index.json'))).map(row=>[row.order_id,row]));
const languages = ['ru','en'];
const projects = {ru:[],en:[]};
const slugs = new Set();
const details = new Map(read('case-details.psv').trim().split(/\r?\n/).map(line=>{
  const [slug,ru,en]=line.split('|'); return [slug,{ru,en}];
}));
for (const [n,line] of read('selected-cases.psv').trim().split(/\r?\n/).entries()) {
  const fields = line.split('|');
  if(fields.length !== 9 || fields.some(x=>!x.trim())) throw Error('Malformed case on line '+(n+1));
  const [ids,slug,stack,tRu,tEn,qRu,qEn,aRu,aEn] = fields;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slugs.has(slug) || !/^\d+(?:,\d+)*$/.test(ids)) throw Error('Invalid case id or slug: '+slug);
  slugs.add(slug);
  const orders = ids.split(',').map(id=>index.get(id));
  if (orders.some(x=>!x?.description_prepared)) throw Error('Order not verified in local index: '+ids);
  const order = orders[0];
  const dir = 'public/media/projects/'+slug;
  const assets = '/media/projects/'+slug;
  // Only copy public-site captures and explicitly allowlisted public portfolio
  // images. Never publish transcripts, credentials or private attachments.
  const shot = [...order.site_screenshots].reverse().find(x=>x.full_page_capture && x.visual_inspection_complete && x.sha256 &&
    order.domains.some(d=>d.domain===x.domain && d.status==='available'));
  let src;
  if (shot) {
    if (path.basename(shot.filename)!==shot.filename || !/\.(png|jpe?g|webp)$/i.test(shot.filename)) throw Error('Unsafe filename');
    const input = path.join(root,'orders',order.order_id,shot.filename);
    const bytes = fs.readFileSync(input);
    if (createHash('sha256').update(bytes).digest('hex')!==shot.sha256) throw Error('Capture hash mismatch: '+input);
    const name='site'+path.extname(shot.filename).toLowerCase();
    fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(dir+'/'+name,bytes);
    src=assets+'/'+name;
  }
  const redesignShots = slug==='78-dosok' ? [
    ['23517585','before-redesign.webp','628b8c891ee5c03e82e830f74feb94b4668c0d60591f87b59b81ed7e98126da0'],
    ['23517588','after-redesign.webp','bee1f21bfb1bc612103fdd4ffe8bd69dfcd06b57d06b8f7bb9d2e0c3601c4a55'],
  ].map(([id,name,sha])=>{
    const bytes=fs.readFileSync(path.join(root,'orders',order.order_id,'historical-portfolio-'+id+'.webp'));
    if(createHash('sha256').update(bytes).digest('hex')!==sha)throw Error('Historical portfolio image hash mismatch: '+id);
    fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(dir+'/'+name,bytes);
    return assets+'/'+name;
  }) : [];
  for(const lang of languages) {
    const ru=lang==='ru', title=ru?tRu:tEn, task=ru?qRu:qEn, result=ru?aRu:aEn;
    const tags=stack.split(', ');
    const alt=ru?'Публичная версия сайта проекта':'Public website snapshot';
    const blocks=[
      {type:'text', title:ru?'Задача':'Brief', body:task},
      {type:'text', title:ru?'Что сделано':'Work delivered', body:result},
    ];
    if(!details.get(slug)?.[lang]) throw Error('Missing localized technical detail: '+slug);
    blocks.push({type:'text',title:ru?'Как решалась задача':'Implementation and scope',body:details.get(slug)[lang]});
    if(slug==='78-dosok') blocks.push({type:'text',title:ru?'Что вошло в комплексное обновление':'What the overhaul covered',
      bullets:ru?[
        'Смена темы и полный редизайн: сохранил узнаваемый зелёный цвет, но изменил первый экран, структуру каталога и навигацию.',
        'Обновление и очистка: убрал устаревшие и дублирующие расширения вместо того, чтобы переносить весь старый набор плагинов в новую витрину.',
        'Мобильный сценарий покупки: переработал меню и добавил плавающую корзину, чтобы к заказу можно было вернуться при прокрутке.',
        'Работы по ускорению вошли в технический этап. Сопоставимых замеров до и после нет, поэтому точный прирост не указываю.',
      ]:[
        'Theme replacement and a full redesign: kept the recognizable green palette while changing the hero, catalog structure and navigation.',
        'Updates and cleanup: removed obsolete and redundant extensions rather than carrying the entire legacy plugin stack into the new storefront.',
        'Mobile shopping: revised navigation and added a floating cart so shoppers could return to their order while scrolling.',
        'Performance work was part of the technical overhaul. Comparable before-and-after measurements are not available.',
      ]});
    if(slug==='78-dosok') blocks.push({type:'text',title:ru?'Главная до и после':'Homepage before and after',
      body:ru?'В старой версии акцент был на слайдере и плотном списке категорий; после редизайна — на крупном первом экране, укрупнённых разделах каталога и блоках доверия, включая отзывы и FAQ.':'The original homepage emphasized a slider and a dense category list. The redesign uses a larger opening section, clearer catalog groupings and trust-building sections such as reviews and FAQs.',
      links:[{label:ru?'До редизайна':'Before redesign',url:'https://kwork.ru/portfolio/23517585'},{label:ru?'После редизайна':'After redesign',url:'https://kwork.ru/portfolio/23517588'}]});
    if(redesignShots.length) blocks.push(
      {type:'image',src:redesignShots[0],title:ru?'Прежняя главная':'Original homepage',alt:ru?'Старая главная магазина 78 Досок со слайдером и списком категорий':'Original 78 Dosok homepage with slider and category list',
        caption:ru?'Исторический снимок до смены темы. Оригинал из портфолио Kwork без обрезки.':'Historical capture before the theme replacement. Uncropped original from Kwork.'},
      {type:'image',src:redesignShots[1],title:ru?'Главная после смены темы':'Homepage after the theme replacement',alt:ru?'Новая главная 78 Досок: крупный первый экран, каталог, отзывы и FAQ':'Redesigned 78 Dosok homepage with a larger hero, catalog, reviews and FAQ',
        caption:ru?'Исторический снимок после редизайна. Верхняя панель WordPress сохранена как на оригинале.':'Historical capture after the redesign. The WordPress toolbar is retained as in the original.'},
    );
    if(slug==='78-dosok') blocks.push({type:'text',title:ru?'Что получил магазин':'What the store gained',
      bullets:ru?['Новая тема и обновлённая витрина вместо точечных правок старого шаблона.','Меньше дублирующих расширений, которые приходится поддерживать и проверять после обновлений.','Более заметный каталог на главной и быстрый доступ к корзине на мобильном.']:
      ['A new theme and a redesigned storefront instead of isolated patches to the old template.','Fewer overlapping extensions to maintain and check after updates.','A more prominent homepage catalog and easier access to the cart on mobile.']});
    if(slug==='78-dosok') blocks.push({type:'text',title:ru?'Как оценить редизайн своего магазина':'How to scope your own store redesign',
      body:ru?'Если каждое обновление задевает шапку, меню или корзину, начните с разбора шаблонов и расширений, которые ими управляют. Для оценки пришлите адрес магазина, две-три проблемные страницы и список функций, которые нужно сохранить. По этим данным можно определить, какие части витрины обновлять, что проверить на мобильном и какие замеры скорости снять до и после.':'If updates keep breaking the header, menu or cart, start by mapping the templates and extensions behind them. For an estimate, send the store URL, two or three problem pages and a list of features that must be retained. This helps define what to redesign, what to test on mobile and what performance measurements to capture before and after.',
      links:[{label:ru?'Обсудить редизайн магазина':'Discuss a store redesign',url:'https://wp.org.ru/contacts/'}]});
    if(src) blocks.push({type:'image',title:ru?'Публичный вид сайта':'Public website snapshot',src,alt,
      caption:ru?'Снимок на дату проверки. Он показывает публичную версию сайта, а не обязательно вид на момент сдачи.':'Captured during a later availability check; it may differ from the site at handoff.'});
    const role=ru?'Веб-разработка':'Web development';
    const year=order.month_year;
    save(dir+'/'+slug.replaceAll('-','_')+'_'+lang+'.yaml',{title,tagline:task,role,year,stack:tags,blocks});
    projects[lang].push({slug,name:title,description:result,year,role,stack:tags,order:n+1,featured:n<3,theme:['blue','cyan','emerald'][n%3],
      media:src?[{type:'image',src,alt,featured:true}]:[],
      links:[{label:ru?'Читать кейс':'Read case study',url:'/showcase/'+slug+(ru?'':'/en'),type:'product'}]});
  }
}
addEngineeringCases(projects);
for(const lang of languages) {
  save('src/content/showcase/projects_'+lang+'.yaml',{projects:projects[lang]});

}
save('src/content/languages/languages.yml',{default:'ru',languages:[{id:'ru',label:'Русский'},{id:'en',label:'English'}]});
save('src/content/profiles/profiles.yml',{profiles:[{id:'default',label:'Portfolio',slug:'',spec:null}]});
save('src/content/site/site.yml',{downloads:[],footerCredit:true});
console.log(projects.ru.length+' cases exported in both languages');
