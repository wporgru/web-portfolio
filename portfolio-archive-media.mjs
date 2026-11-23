import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

// Only named originals from the author's public portfolio, not order attachments.
const archive = {
  'haier-woocommerce-catalog-import': [
    '40905177','historical-fragment-portfolio-11899043.webp','11899043',
    'd952d41a2c56db62f6ba2c6110824c797cabb907cdaa7c89ad769ddc827c25ec',
    ['Сетка кондиционеров Haier с названиями моделей, ценами и кнопками корзины',
      'Оригинальный фрагмент 1234 × 1199 из портфолио Kwork, опубликованного 27 января 2024 года. Цены относятся к архивной витрине; снимок не показывает полный каталог и не подтверждает работу покупки.'],
    ['Haier air conditioner listings with model names, prices and cart buttons',
      'Original 1234 × 1199 excerpt from the January 27, 2024 Kwork entry. Prices are historical. The image does not show the entire catalog or verify checkout.'],
    'archive-storefront.webp',
  ],
  'ecopol-woodmart-flooring-store': [
    '41070613','historical-fragment-portfolio-11998730.webp','11998730',
    '948f349d70fe8dde8c14ec0e43b988a925eafdfde0a10e0e305e0152cf8abbda',
    ['Первый экран магазина напольных покрытий «ЭКОПОЛ» на WoodMart',
      'Необрезанный оригинал архивного фрагмента 1400 × 514: логотип, баннеры и категории. Это первый экран, а не полная страница; показанные акции относятся к архивной версии.'],
    ['First screen of the Ecopol flooring storefront on WoodMart',
      'Unedited 1400 × 514 archival excerpt showing the logo, banners and categories. This is the first screen, not the full page; promotions belong to the archived version.'],
    'archive-storefront.webp',
  ],
  'llp-pigment-woocommerce-shipping': [
    '38802345','historical-portfolio-10894541.webp','10894541',
    'beaa93ea78d880f07ce52f2475930e602adae5bd18ea18232a168f355a0c3d80',
    ['Экран оформления заказа LLP Pigment с Boxberry и Почтой России',
      'Архивный экран 1400 × 661. Видны варианты доставки и пустые поля оформления. Суммы и сроки исторические; снимок не подтверждает оплату, отправление или настройку других показанных служб.'],
    ['LLP Pigment checkout showing Boxberry and Russian Post',
      'Archived 1400 × 661 viewport showing shipping options and empty checkout fields. Prices and timings are historical; the image does not verify payment, shipment or implementation of other listed carriers.'],
    'archive-storefront.webp',
  ],
  'taro-praktik-editorial-wordpress': [
    '40882732','historical-fragment-portfolio-11843733.webp','11843733',
    '22d2cf2c78711a96111a7aa637b1b5b8fee5f53bfa3fd348bf594d4a0d761c0d',
    ['Сетка статей «Таро Практик» и боковая колонка с рубриками',
      'Архивный фрагмент 1400 × 1076 из карточки от 21 января 2024 года. Снимок показывает шаблон с тестовыми публикациями и зарезервированными местами под рекламу, а не наполнение или запуск монетизации.'],
    ['Taro Praktik article grid and category sidebar',
      'Archived 1400 × 1076 excerpt from the January 21, 2024 portfolio entry. It shows the template with sample posts and ad placeholders, not completed content or a monetization launch.'],
    'archive-storefront.webp',
  ],
  'anta-yml-size-variant-import': [
    '34382083','historical-portfolio-9349165.webp','9349165',
    '0266e310ec8a7d83bfe7f9adb5dd571b42bc25e0b68e2ae2ea5bb7fa7a622189',
    ['Карточки баскетбольных кроссовок ANTA с фильтром и сортировкой',
      'Оригинальный архивный фрагмент 1400 × 680. Показаны карточки каталога, цены и элементы фильтрации. Один экран не показывает полноту импорта и работу всех размерных вариаций.'],
    ['ANTA basketball shoe listings with filter and sort controls',
      'Original archived excerpt, 1400 × 680. It shows listings, prices and filter controls, not the full import or verification of every size variation.'],
    'archive-storefront.webp',
  ],
  'porogov-woodmart-contact-redesign': [
    '40231935','historical-portfolio-11549314.webp','11549314',
    '2f9ec8191686a41ce2f14628e9e1a7c1315fcae1ed5a0ff8669e2936f42efef9',
    ['Шапка Porogov.by с телефонами и каталог кузовных запчастей',
      'Оригинальный архивный фрагмент 1400 × 515: шапка, навигация и карточки ремонтных арок. Это верхняя часть витрины, не полная страница.'],
    ['Porogov.by header with phone numbers and auto body parts',
      'Original archived excerpt, 1400 × 515: header, navigation and repair panel listings. This shows the upper part of the storefront, not the full page.'],
    'archive-storefront.webp',
  ],
  'sovo-sova': [
    '56411105','historical-homepage-portfolio-19774603.webp','19774603',
    'f73dfaab0856ee1c35d28a3f825063a23e530a752a1a38e6143b36d54ee534ea',
    ['Главная «Сово Сова» на WoodMart: категории, товары, новости и подвал',
      'Архивная главная целиком, 1400 × 3744, опубликована 25 ноября 2025 года. На снимке виден результат оформления витрины; адрес открытой страницы не установлен, поэтому снимок не подтверждает переключение основного домена.'],
    ['Sovo Sova WoodMart homepage with product categories, listings, news and footer',
      'Full archived homepage, 1400 × 3744, published on November 25, 2025. It shows the storefront layout; the address used for the screenshot is unknown, so it does not verify a production cutover.'],
  ],
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
  const [order,file,id,hash,ruCopy,enCopy,output='archive-homepage.webp']=archive[slug];
  const bytes=fs.readFileSync(path.join(root,'orders',order,file));
  if (createHash('sha256').update(bytes).digest('hex')!==hash) throw Error('Archive image hash mismatch: '+slug);
  const dir=path.join('public','media','projects',slug);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,output),bytes);
  const ru=lang==='ru';
  const [alt,caption]=ru?ruCopy:enCopy;
  const src='/media/projects/'+slug+'/'+output;
  const title=output==='archive-homepage.webp'
    ? (ru?'Главная из архива проекта':'Archived project homepage')
    : (ru?'Фрагмент витрины из архива проекта':'Archived storefront excerpt');
  return {
    blocks:[
      {type:'text',title,
        links:[{label:ru?'Оригинал в портфолио Kwork':'Original Kwork portfolio entry',url:'https://kwork.ru/portfolio/'+id}]},
      {type:'image',src,alt,caption},
    ],
    cover:{type:'image',src,alt,featured:true},
  };
}
