import fs from 'node:fs';
import {stringify} from 'yaml';
const read=p=>fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
const publicSources = {
  'dme-english-service-site': 'https://kwork.ru/portfolio/4093977',
};
const caseImages = {
  'kabanchik-restaurant-website': ['homepage-20261102.webp', 'Полностраничный снимок сайта ресторана «Кабанчик»', 'Full-page screenshot of the Kabanchik restaurant website', 'Главная без обрезки, захват 2 ноября 2026 года. На снимке более поздняя версия, не сдача первого этапа в июне.', 'Uncropped homepage captured November 2, 2026. It shows a later version, not the June first-stage handover.'],
  'kabanchik-delivery-catalog': ['delivery-desktop.webp', 'Каталог доставки «Кабанчика» с блюдами и корзиной справа', 'Kabanchik delivery catalog with dishes and a cart on the right', 'Архивный полностраничный снимок доставки на десктопе, без обрезки. Снимок показывает интерфейс, но не подтверждает оплату или работу службы доставки.', 'Uncropped archival desktop capture of the delivery page. It shows the storefront, not payment processing or delivery operations.'],
  'ibike-scooter-rental-website': ['historical-rental.webp', 'Исторический экран сайта проката iBike', 'Archived iBike rental website screen', 'Снимок из исторической карточки Kwork; не проверка отправки формы или доступности сайта сегодня.', 'Image from the historical Kwork listing; not a test of form delivery or current site availability.'],
  'foodsfact-equipment-catalog': ['historical-storefront.webp', 'Главная англоязычного каталога FoodsFact', 'Homepage of the English-language FoodsFact catalog', 'Исторический снимок из портфолио Kwork: категории оборудования, объявление раздела Bulletin board и контактные элементы. Дата съёмки не установлена.', 'Historical Kwork portfolio image showing equipment categories, Bulletin board navigation and contact elements. Capture date unknown.'],
  'vector-dobra-social-services': ['historical-first-screen.webp', 'Шапка и первый экран сайта «Вектор Добра»', 'Header and first screen of the Vector Dobra website', 'Исторический фрагмент из портфолио Kwork: контактная шапка, навигация и блок услуг.', 'Historical Kwork portfolio excerpt showing the contact header, navigation and services block.'],
  'industrial-builder-landing': ['historical-landing.webp', 'Промышленная фотография и заголовок сайта «Нефтехимик-Н»', 'Industrial photograph and heading on the Neftekhimik-N website', 'Историческая карточка портфолио Kwork: видны согласованная композиция и отметка REG Website Builder.', 'Historical Kwork portfolio image showing the approved layout and the REG Website Builder mark.'],
  'bite-news-wordpress-launch': ['historical-first-screen.webp', 'Тёмный первый экран Bite News', 'Dark Bite News homepage hero', 'Первый экран из исторической карточки Kwork. Это не снимок всего сайта.', 'Homepage hero from the historical Kwork entry, not a full-page capture.'],
  'inegolhome-furniture-store': ['historical-storefront.webp', 'Мебельные карточки и баннеры Inegol Home', 'Inegol Home furniture cards and banners', 'Фрагмент исторической витрины из портфолио Kwork, сохранён без редактирования.', 'Historical storefront excerpt from the Kwork portfolio, preserved without editing.'],
  'garland-catalog-import-training': ['historical-variants.webp', 'Выбор цвета в карточке гирлянды', 'Color selection on a garland product page', 'Исторический фрагмент из портфолио Kwork: виден выбор цвета. Это не тест корзины.', 'Historical Kwork portfolio excerpt showing color selection. It is not a cart test.'],
  'hyperstroy-tool-store': ['historical-storefront.webp', 'Главная магазина «ГиперСтрой»: категории и товары', 'HyperStroy homepage with categories and products', 'Исторический длинный снимок витрины из портфолио Kwork, июнь 2024. Сохранён без обрезки.', 'Historical storefront screenshot from the Kwork portfolio, June 2024. Preserved without cropping.'],
  'arenda-pm-home-performance': ['mobile-viewport.png', 'Мобильный первый экран после оптимизации', 'Mobile first screen after optimization', 'Снимок браузерной проверки, ширина 390 px. Это не отчёт PageSpeed и не полностраничный снимок.', 'Browser verification screenshot at 390 px. This is not a PageSpeed report or a full-page capture.'],
  'marketplace-photo-batch': ['processed-sample.webp', 'Пример обработанных товарных фотографий', 'Sample of processed product photographs', 'Выборка из публичной карточки Kwork, ноябрь 2024. Не весь архив и не сравнение до/после.', 'Sample from the public Kwork entry, November 2024. Not the entire archive or a before-and-after comparison.'],
};
const projectStages = {
  'klimat-profi-server-storage': ['klimat-profi-backup-automation', 'Связанная работа: автоматизация резервных копий', 'Related work: backup automation'],
  'klimat-profi-backup-automation': ['klimat-profi-server-storage', 'Связанная работа: освобождение места и аудит медиа', 'Related work: storage recovery and media audit'],
  'diskprices-comparison-platform': ['ramprices-memory-offer-normalization', 'Продолжение: адаптация ядра под оперативную память', 'Follow-up: adapting the catalog to memory products'],
  'ramprices-memory-offer-normalization': ['diskprices-comparison-platform', 'Основа проекта: платформа сравнения цен DiskPrices', 'Project foundation: the DiskPrices comparison platform'],
  'kabanchik-restaurant-website': ['kabanchik-delivery-catalog', 'Следующий этап: каталог доставки и корзина', 'Next stage: delivery catalog and cart'],
  'kabanchik-menu-data': ['kabanchik-delivery-catalog', 'Связанная работа: интерфейс доставки', 'Related work: delivery storefront'],
  'kabanchik-delivery-catalog': ['kabanchik-menu-data', 'Связанная работа: подготовка ведомости меню', 'Related work: preparing the menu register'],
  'salt-switch-cross-border-checkout': ['salt-switch-order-recovery', 'Связанный этап: восстановление заказов и писем', 'Related stage: restoring orders and email'],
  'salt-switch-order-recovery': ['salt-switch-cross-border-checkout', 'Связанный этап: международная доставка и счета', 'Related stage: international shipping and invoices'],
  'aravia-mobile-catalog-bulk-editor': ['aravia-postcode-delivery-checkout', 'Предыдущий этап: доставка по индексам и самовывоз', 'Previous stage: postcode delivery and pickup'],
  'aravia-postcode-delivery-checkout': ['aravia-mobile-catalog-bulk-editor', 'Следующий этап: мобильный каталог и пакетное редактирование', 'Next stage: mobile catalog and bulk editing'],
  'goa-tours-interface-copy': ['goa-tours-stripe-setup', 'Другой этап Goa Tours: настройка Stripe', 'Another Goa Tours stage: Stripe setup'],
  'goa-tours-stripe-setup': ['goa-tours-interface-copy', 'Другой этап Goa Tours: тексты интерфейса', 'Another Goa Tours stage: storefront copy'],
  'bgtgroup-pl-multilingual-redirects': ['bgtgroup-technical-seo-performance', 'Другой сайт BGT Group: техническое SEO и скорость', 'Another BGT Group website: technical SEO and performance'],
  'bgtgroup-technical-seo-performance': ['bgtgroup-pl-multilingual-redirects', 'Другой сайт BGT Group: ссылки и языковые редиректы', 'Another BGT Group website: links and language redirects'],
  'sugarlips-supplier-csv-import': ['sugarlips-category-navigation', 'Следующий этап: навигация по категориям', 'Next stage: category navigation'],
  'sugarlips-category-navigation': ['sugarlips-supplier-csv-import', 'Предыдущий этап: импорт CSV поставщика', 'Previous stage: supplier CSV import'],
  'sugarlips-boxberry-city-mapping': ['sugarlips-supplier-csv-import', 'Другой этап Sugarlips: обновление каталога', 'Another Sugarlips stage: catalog updates'],
  'woocommerce-document-pack-product-page': ['metrica-ecommerce-purchase-goals', 'Связанный этап: электронная торговля и цели покупки', 'Related stage: e-commerce tracking and purchase goals'],
  'metrica-ecommerce-purchase-goals': ['woocommerce-document-pack-product-page', 'Связанный этап: оформление карточки пакета документов', 'Related stage: document bundle product page'],
  'woocommerce-excerpt-import-repair': ['woocommerce-stock-waitlist-localization', 'Следующий этап: лист ожидания и письма магазина', 'Next stage: the waitlist and store emails'],
  'woocommerce-stock-waitlist-localization': ['woocommerce-excerpt-import-repair', 'Предыдущий этап: импорт атрибутов и описаний', 'Previous stage: importing attributes and descriptions'],
  'woocommerce-admin-email-items': ['woocommerce-native-order-statuses', 'Следующий этап: штатные статусы заказов', 'Next stage: restoring native order statuses'],
  'woocommerce-native-order-statuses': ['woocommerce-admin-email-items', 'Предыдущий этап: состав заказа в письмах', 'Previous stage: order items in admin emails'],
  'fastener-specification-display': ['fastener-catalog-attribute-filters', 'Следующий этап: фильтры каталога по характеристикам', 'Next stage: attribute filters for the catalog'],
  'fastener-catalog-attribute-filters': ['fastener-specification-display', 'Предыдущий этап: восстановление вывода характеристик', 'Previous stage: restoring specification display'],
  'lighting-catalog-staged-import': ['lighting-catalog-navigation', 'Связанный этап: навигация и фильтры витрины', 'Related stage: storefront navigation and filters'],
  'lighting-catalog-navigation': ['lighting-catalog-staged-import', 'Связанный этап: сбор и поэтапный импорт', 'Related stage: data collection and staged import'],
  'taxi-vehicle-booking': ['taxi-mobile-car-cards', 'Следующий этап: карточки автомобилей и мобильная вёрстка', 'Next stage: car cards and mobile layout'],
  'taxi-mobile-car-cards': ['taxi-vehicle-booking', 'Предыдущий этап: форма выбора автомобиля и FAQ', 'Previous stage: vehicle selection form and FAQ'],
  'fashion-data-preparation': ['circa-outlet-catalog', 'Следующий этап: загрузка каталога и вывод размеров', 'Next stage: catalog import and size display'],
  'circa-outlet-catalog': ['fashion-data-preparation', 'Предыдущий этап: сбор и проверка товарных данных', 'Previous stage: collecting and validating product data'],
  'hockey-insales-woodmart': ['hockey-storefront-ux', 'Следующий этап: карточки и мобильная витрина', 'Next stage: product cards and mobile storefront'],
  'hockey-storefront-ux': ['hockey-insales-woodmart', 'Предыдущий этап: перенос каталога из InSales', 'Previous stage: catalog migration from InSales'],
};
export function addEngineeringCases(projects){
  for(const line of read('engineering-cases.psv').trim().split(/\r?\n/)){
    const fields=line.split('|');
    if(fields.length!==11 || fields.some(x=>!x.trim()))throw Error('Invalid engineering case');
    const [slug,year,stack,...t]=fields;
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw Error('Invalid slug');
    const dir='public/media/projects/'+slug;
    fs.mkdirSync(dir,{recursive:true});
    for(const [lang,k] of [['ru',0],['en',1]]){
      const ru=lang==='ru', name=t[k], brief=t[2+k], implementation=t[4+k], result=t[6+k];
      const role=ru?'Веб-разработка и автоматизация':'Web development and automation';
      const tags=stack.split(', ');
      const blocks=[
        {type:'text',title:ru?'Задача и ограничения':'Brief and constraints',body:brief},
        {type:'text',title:ru?'Как устроено решение':'How it works',body:implementation},
        {type:'text',title:ru?'Результат и проверка':'Result and verification',body:result}
      ];
      const proof = caseImages[slug];
      if (proof) {
        const [file, ruAlt, enAlt, ruCaption, enCaption] = proof;
        if (!fs.existsSync(dir+'/'+file)) throw Error('Missing case image: '+slug+'/'+file);
        blocks.push({type:'image',src:'/media/projects/'+slug+'/'+file,alt:ru?ruAlt:enAlt,caption:ru?ruCaption:enCaption});
      }
      const stage = projectStages[slug];
      if (stage) {
        blocks.push({
          type:'text', title:slug.startsWith('bgtgroup-') ? (ru?'Связанный проект':'Related project') : (ru?'Другой этап этого проекта':'Another stage of this project'),
          links:[{label:stage[ru?1:2],url:'/showcase/'+stage[0]+(ru?'/':'/en/')}],
        });
      }
      if (publicSources[slug]) {
        blocks.push({
          type:'text', title:ru?'Проект в портфолио Kwork':'Original Kwork portfolio entry',
          body:ru?'Март 2021 года — дата публикации карточки; точная дата сдачи не установлена.':'March 2021 is the publication date; the exact delivery date is unknown.',
          links:[{label:ru?'Посмотреть оригинальную карточку':'View the original entry',url:publicSources[slug]}],
        });
      }
      fs.writeFileSync(dir+'/'+slug.replaceAll('-','_')+'_'+lang+'.yaml',stringify({title:name,tagline:brief,year,role,stack:tags,blocks}));
      projects[lang].push({slug,name,year,role,description:brief,stack:tags,order:projects[lang].length+1,theme:'cyan',links:[{label:ru?'Читать кейс':'Read case study',url:'/showcase/'+slug+(ru?'':'/en'),type:'product'}]});
    }
  }
}
