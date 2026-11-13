import fs from 'node:fs';
import {stringify} from 'yaml';
const read=p=>fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
const publicSources = {
  'dme-english-service-site': 'https://kwork.ru/portfolio/4093977',
};
const caseImages = {
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
          type:'text', title:ru?'Другой этап этого проекта':'Another stage of this project',
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
