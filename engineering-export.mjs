import fs from 'node:fs';
import {stringify} from 'yaml';
const read=p=>fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
const publicSources = {
  'faeton-rental-catalog-recovery': 'https://faetonclean.ru/arenda-polomoechnoy-mashiny/',
  'faeton-blog-tag-archive-recovery': 'https://faetonclean.ru/blog/',
  'apteka-optika-price-comparison': 'https://apteka-optika.ru/',
  'dme-english-service-site': 'https://kwork.ru/portfolio/4093977',
};
const caseImages = {
  'nomad-spain-landing-figma': ['archive-full.webp', 'Полная страница программы Digital Nomad: Испания', 'Full Digital Nomad page for the Spain program', 'Архивный полностраничный снимок проверенной версии без обрезки, 1680 × 12327. Показаны интерфейс и вёрстка, а не актуальные условия программы.', 'Uncropped full-page archive image of the verified version, 1680 × 12327. It documents the interface, not current program terms.'],
  'nomad-english-megamenu-localization': ['archive-menu.webp', 'Английское меню Digital Nomad с пятью колонками', 'English Digital Nomad megamenu with five columns', 'Снимок раскрытого меню из отчёта проверки. Это фрагмент шапки, не снимок всей страницы.', 'Expanded menu from the verification report. This is a header excerpt, not a full-page capture.', false],
  'arenda-pm-catalog-indexability': ['seo-release-viewport.webp', 'Главная «Аренда-ПМ» после правки заголовков', 'Arenda-PM homepage after heading updates', 'Фрагмент браузерной проверки после правки заголовков. Показывает сохранённое оформление, а не состояние поисковой выдачи.', 'Browser viewport captured after the heading edits. It shows the preserved design, not search visibility.'],
  'wellland-editorial-ai-production': ['editorial-illustration.webp', 'Редакционная ИИ-иллюстрация поломоечной машины для статьи Wellland', 'AI-generated illustration of a scrubber dryer for the Wellland article', 'Одна из шести редакционных обложек. Сгенерирована по референсам техники; не фотография клиента или объекта.', 'One of six editorial covers. Generated from equipment references; not a photograph of a client or site.'],
  'wellland-native-catalog-pagination': ['pagination-control.webp', 'Штатная пагинация WooCommerce на мобильном Wellland', 'Native WooCommerce pagination on mobile Wellland', 'Архивный снимок элемента интерфейса при ширине окна 390 px, 29 октября 2026 года. Это не снимок всей страницы или текущей версии.', 'Archive capture of the control at a 390 px viewport on October 29, 2026. Not a full-page screenshot or a current-version capture.', false],
  'artred-woocommerce-migration-readiness': ['archive-viewport.webp', 'Главная ARTRED после переключения, архивный вид в браузере', 'ARTRED homepage after cutover, archived browser view', 'Сохранённый десктопный вид главной на основном домене от 7 сентября 2026 года. Снимок области окна 1440 × 1000, не всей страницы.', 'Archived desktop homepage on the production domain, September 7, 2026. The 1440 × 1000 browser viewport is not a full-page capture.'],
  'artred-b2b-equipment-catalog': ['archive-viewport.webp', 'Карточка техники ARTRED с характеристиками и кнопкой консультации', 'ARTRED equipment page with specifications and a consultation button', 'Десктопный снимок проверки 28 августа 2026 года: область окна 1440 × 1100. Не подтверждает отправку формы или текущий вид сайта.', 'Desktop QA capture from August 28, 2026: 1440 × 1100 browser viewport. It does not verify form delivery or the current site.'],
  'faeton-rental-catalog-recovery': ['public-full.webp', 'Полная страница аренды машин «Фаэтон» с карточками техники', 'Full Faeton equipment rental page with product cards', 'Публичная страница целиком, снимок без обрезки от 15 ноября 2026 года. Это вид после работ, а не тест отправки заявки.', 'Uncropped public page captured November 15, 2026. It shows the later interface, not a submission test.'],
  'faeton-blog-tag-archive-recovery': ['public-full.webp', 'Блог «Фаэтон» со списком статей, рубриками и пагинацией', 'Faeton blog with posts, categories and pagination', 'Публичный блог целиком, снимок без обрезки от 15 ноября 2026 года. Статистика архивов относится к отдельной проверке в октябре.', 'Uncropped public blog captured November 15, 2026. Archive counts are from the separate October verification.'],
  'apteka-optika-price-comparison': ['homepage-full.webp', 'Полностраничный снимок витрины «Аптека & Оптика»', 'Full-page screenshot of the Apteka & Optika storefront', 'Полностраничный снимок действующей главной в браузере, ширина 1440 px, без обрезки. Это текущий вид, а не исторический снимок запуска.', 'Uncropped browser capture of the current live homepage at 1440 px width. This is not an archival launch screenshot.'],
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
  'seo-dashboard': ['trends-search-demand-history', 'Связанный модуль: история спроса и Google Trends', 'Related module: search demand and Google Trends history'],
  'trends-search-demand-history': ['admitad-order-click-reconciliation', 'Связанный модуль: сверка партнёрских кликов и заказов', 'Related module: matching affiliate clicks to orders'],
  'admitad-order-click-reconciliation': ['seo-dashboard', 'Связанная работа: основной SEO-дашборд', 'Related work: the core SEO dashboard'],
  'medimarket-ci-recrawl-resilience': ['medimarket-catalog', 'Основа проекта: сборка каталога из фидов', 'Project foundation: building the catalog from feeds'],
  'medimarket-source-content-validation': ['medimarket-image-fallback-recovery', 'Связанная работа: восстановление изображений', 'Related work: restoring catalog images'],
  'affiliate-feed-readiness-audit': ['medimarket-catalog', 'Связанная работа: сборка каталога из фидов', 'Related work: building a storefront from feeds'],
  'medimarket-catalog': ['medimarket-image-fallback-recovery', 'Связанная работа: восстановление изображений каталога', 'Related work: restoring catalog images'],
  'medimarket-image-fallback-recovery': ['medimarket-affiliate-click-attribution', 'Связанная работа: аналитика партнёрских переходов', 'Related work: affiliate click attribution'],
  'medimarket-affiliate-click-attribution': ['medimarket-ci-recrawl-resilience', 'Связанная работа: устойчивость ежедневных релизов', 'Related work: resilient daily deployments'],
  'nomad-spain-landing-figma': ['nomad-english-megamenu-localization', 'Связанная работа: локализация мегаменю', 'Related work: megamenu localization'],
  'nomad-english-megamenu-localization': ['nomad-spain-landing-figma', 'Связанная работа: вёрстка лендинга по Figma', 'Related work: implementing the Figma landing page'],
  'tara-bergman-gallery-batches': ['tara-bergman-hreflang-page-mapping', 'Связанная работа: языковые адреса фотосайта', 'Related work: localized photography URLs'],
  'tara-bergman-hreflang-page-mapping': ['tara-bergman', 'Предыдущий этап: перенос фотосайта в WordPress', 'Earlier stage: moving the photography site to WordPress'],
  'psy343-gutenberg-site-redesign': ['psy343-seo-redirect-mapping', 'Связанный этап: карта старых адресов и редиректы', 'Related stage: legacy URL mapping and redirects'],
  'psy343-seo-redirect-mapping': ['psy343-gutenberg-site-redesign', 'Связанный этап: редизайн на Gutenberg', 'Related stage: Gutenberg redesign'],
  'arenda-pm-catalog-indexability': ['arenda-pm-legacy-js-cleanup', 'Связанный этап: исправление JavaScript и проверка форм', 'Related stage: JavaScript repair and form verification'],
  'arenda-pm-legacy-js-cleanup': ['arenda-pm-home-performance', 'Связанный этап: ускорение мобильной главной', 'Related stage: mobile homepage performance'],
  'arenda-pm-home-performance': ['arenda-pm-catalog-indexability', 'Связанный этап: техническое SEO каталога', 'Related stage: technical SEO for the catalog'],
  'megawatt-service-template-migration': ['megawatt-content', 'Похожая работа: перенос материалов и настройка редиректов', 'Related work: content migration and redirects'],
  'wellland-native-catalog-pagination': ['wellland-facets', 'Связанная работа: фильтры и атрибуты каталога', 'Related work: catalog attributes and filters'],
  'artred-woocommerce-migration-readiness': ['artred-b2b-equipment-catalog', 'Связанная работа: каталог техники и консультации', 'Related work: equipment catalog and consultations'],
  'artred-b2b-equipment-catalog': ['artred-woocommerce-migration-readiness', 'Связанная работа: подготовка сайта к переключению', 'Related work: preparing the site cutover'],
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
      let media;
      if (proof) {
        const [file, ruAlt, enAlt, ruCaption, enCaption, catalogCover = true] = proof;
        if (!fs.existsSync(dir+'/'+file)) throw Error('Missing case image: '+slug+'/'+file);
        const src = '/media/projects/'+slug+'/'+file;
        const alt = ru?ruAlt:enAlt;
        blocks.push({type:'image',src,alt,caption:ru?ruCaption:enCaption});
        if (catalogCover) media = [{type:'image',src,alt,featured:true}];
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
          type:'text', title:slug==='dme-english-service-site'?(ru?'Проект в портфолио Kwork':'Original Kwork portfolio entry'):(ru?'Действующий сайт':'Live website'),
          ...(slug==='dme-english-service-site' && {body:ru?'Март 2021 года — дата публикации карточки; точная дата сдачи не установлена.':'March 2021 is the publication date; the exact delivery date is unknown.'}),
          links:[{label:slug==='dme-english-service-site'?(ru?'Посмотреть оригинальную карточку':'View the original entry'):(ru?'Открыть страницу проекта':'Open the project page'),url:publicSources[slug]}],
        });
      }
      fs.writeFileSync(dir+'/'+slug.replaceAll('-','_')+'_'+lang+'.yaml',stringify({title:name,tagline:brief,year,role,stack:tags,blocks}));
      projects[lang].push({slug,name,year,role,description:brief,stack:tags,order:projects[lang].length+1,theme:'cyan',...(media && {media}),links:[{label:ru?'Читать кейс':'Read case study',url:'/showcase/'+slug+(ru?'/':'/en/'),type:'product'}]});
    }
  }
}
