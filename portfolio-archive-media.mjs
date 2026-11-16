import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

// Only named originals from the author's public portfolio, not order attachments.
const archive = {
  'tara-bergman': [
    '62611119','historical-homepage-portfolio-22781455.webp','22781455',
    '54fbd3e2061da3d0e34ac26102bc1ca01911b4ac4a3e07ccdbdb7827cfd077b9',
    ['Главная сайта фотографа Tara Bergman: галерея, тарифы и форма записи',
      'Главная целиком, 1400 × 5219. Снимок опубликован в портфолио после приёмки, 9 июня 2026 года. Фотографии предоставлены клиентом; снимок показывает вёрстку, а не работу формы.'],
    ['Tara Bergman photography homepage with galleries, pricing and a booking form',
      'Full homepage, 1400 × 5219. Published in the portfolio after acceptance on June 9, 2026. The client supplied the photographs; the screenshot shows the layout, not form delivery.'],
  ],
  'promarko-astra-foundation': [
    '64353447','historical-homepage-portfolio-23500194.webp','23500194',
    'fffa53077a5c99962c756b5f1eeaee4a0480530bd430a852ed6a82073ed4e27e',
    ['Главная шаблона Astra для «ПРОМАРКО» в зелёно-белой палитре',
      'Главная целиком, 1400 × 4461. На снимке установленный шаблон с согласованной палитрой, до наполнения. Отзывы, портреты и контакты в демосекциях — заполнители, а не сведения о компании.'],
    ['Promarko Astra homepage in the approved green and white palette',
      'Full homepage, 1400 × 4461. This is the installed template with the approved colors, before content was added. Demo testimonials, headshots and contact details are placeholders, not company information.'],
  ],
  'cosmetics-woodmart-migration': [
    '55559203','historical-portfolio-18848055.webp','18848055',
    '9b360c89072e771158d43b24242ddcfde917e3b3f2a5eb9d7a081038141ea4b2',
    ['Главная магазина косметики ABCE Store с товарными подборками, брендами и статьями',
      'Главная целиком, 1400 × 3606, с доменом abcestore.ru в подвале. Точная дата снимка и стадия переключения неизвестны. Снимок показывает витрину, а не работу оплаты или полноту переноса URL.'],
    ['ABCE Store cosmetics homepage with product selections, brands and articles',
      'Full homepage, 1400 × 3606, with abcestore.ru in the footer. The exact capture date and cutover stage are unknown. The image shows the storefront, not payment functionality or complete URL migration.'],
  ],
};

export function archiveMedia(root, slug, lang) {
  if (!Object.hasOwn(archive, slug)) return;
  const [order,file,id,hash,ruCopy,enCopy]=archive[slug];
  const bytes=fs.readFileSync(path.join(root,'orders',order,file));
  if (createHash('sha256').update(bytes).digest('hex')!==hash) throw Error('Archive image hash mismatch: '+slug);
  const dir=path.join('public','media','projects',slug);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'archive-homepage.webp'),bytes);
  const ru=lang==='ru';
  const [alt,caption]=ru?ruCopy:enCopy;
  const src='/media/projects/'+slug+'/archive-homepage.webp';
  return {
    blocks:[
      {type:'text',title:ru?'Главная из архива проекта':'Archived project homepage',
        links:[{label:ru?'Оригинал в портфолио Kwork':'Original Kwork portfolio entry',url:'https://kwork.ru/portfolio/'+id}]},
      {type:'image',src,alt,caption},
    ],
    cover:{type:'image',src,alt,featured:true},
  };
}
