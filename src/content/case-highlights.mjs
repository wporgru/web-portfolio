// Short, case-specific results for the page lead and search/share metadata.
// Longer briefs and the evidence behind these statements stay in the case.
export const caseHighlights = {
  'medimarket-ci-recrawl-resilience': {
    ru: 'Разделил публикацию и переобход в GitHub Actions. Каталог обновляется, а временная недоступность API Яндекса отмечается в журнале.',
    en: 'Separated publishing and recrawl status in GitHub Actions. The catalog can still deploy while a temporary Yandex API outage is recorded.',
  },
  'medimarket-source-content-validation': {
    ru: 'Восстановил справочные данные для 140 карточек из 144. Сверял источник и упаковку, а четыре позиции без материала оставил без подмены.',
    en: 'Recovered reference data for 140 of 144 listings. Checked source and packaging, leaving four items without usable data unchanged.',
  },
  '78-dosok': {
    ru: 'Полный редизайн WooCommerce-магазина: смена темы, обновление, ускорение и очистка плагинов. Исторические снимки до и после.',
    en: 'Full WooCommerce store redesign: theme replacement, updates, performance work and plugin cleanup, with archival before-and-after screenshots.',
  },
  'stalex-feed': {
    ru: 'Импорт STALEX: 719 позиций в первичном отчёте. Сохранил ручные правки товаров, исправил остатки и проверил первый запуск автообновления.',
    en: 'STALEX import: 719 products in the initial report. Preserved manual edits, corrected stock mapping and verified the first scheduled update.',
  },
  'wellland-facets': {
    ru: 'Перенёс характеристики в глобальные атрибуты WooCommerce. Проверил фильтры и видимость 198 товаров в 33 категориях Wellland.',
    en: 'Migrated specifications to global WooCommerce attributes and verified filters and visibility for 198 products across 33 Wellland categories.',
  },
  'arenda-pm-home-performance': {
    ru: 'Ускорил мобильную главную «Аренда-ПМ»: PageSpeed 72 → 96, LCP 6,8 → 2,7 с в лаборатории. Сохранил меню, слайдер и подбор категории.',
    en: 'Improved the Arenda-PM mobile homepage: PageSpeed 72 to 96, lab LCP 6.8 to 2.7 s. Preserved navigation, the slider and category selection.',
  },
  'diskprices-comparison-platform': {
    ru: 'Агрегатор накопителей на Laravel: импорт XML/YML, сопоставление моделей и ёмкостей, история цен и учёт переходов к продавцам.',
    en: 'Laravel price comparison for storage devices: XML and YML imports, model and capacity matching, price history and merchant click tracking.',
  },
  'codex-marketing-skills-workflow': {
    ru: 'Подготовил и проверил три локальных навыка Codex: позиционирование, брейншторм и планирование Telegram. Убрал скрытые рекламные инструкции.',
    en: 'Adapted and validated three local Codex skills for positioning, brainstorming and Telegram planning. Removed hidden promotional instructions.',
  },
  'tara-bergman': {
    ru: 'Восстановил сайт фотографа с Firebase по публичным страницам на стенде WordPress. Для воркшопа подготовил адреса EN, RU и ES.',
    en: 'Reconstructed a Firebase photography site from public pages on WordPress staging, with English, Russian and Spanish workshop URLs.',
  },
  'seo-dashboard': {
    ru: 'Объединил Метрику, Вебмастер, GA4 и Search Console в локальном SEO-дашборде. История в SQLite сохраняется, если источник временно недоступен.',
    en: 'Combined Metrica, Yandex Webmaster, GA4 and Search Console in a local SEO dashboard. SQLite history is retained when a source fails.',
  },
  'medicine-data': {
    ru: 'Подготовил схему Directus, импорт и проверку сопоставлений: действующее вещество, препарат и товарная упаковка хранятся раздельно.',
    en: 'Built a Directus schema, reference imports and matching checks, with separate records for active ingredients, medicines and retail packs.',
  },
  'faeton-blog-tag-archive-recovery': {
    ru: 'Вернул 81 архив тегов «Фаэтона». Исправил редиректы и сортировку: при проверке на восьми страницах Wellland была 91 уникальная запись.',
    en: 'Restored 81 Faeton tag archives. Fixed redirects and ordering so all 91 expected Wellland posts appeared once across eight archive pages.',
  },
  'medimarket-image-fallback-recovery': {
    ru: 'Восстановил 120 изображений MediMarket24 и исправил сборку: временный сбой поставщика больше не убирает проверенный файл того же товара.',
    en: 'Restored 120 MediMarket24 images and fixed the build so a temporary supplier outage no longer drops a verified image for the same product.',
  },
  'megawatt-service-template-migration': {
    ru: 'Перенёс 136 страниц услуг «Мегаватта» на новый шаблон WordPress на стенде. Проверил все страницы; 135 из 136 сохранили адреса.',
    en: 'Moved 136 Megawatt service pages to a new WordPress template on staging. Verified every page; 135 of 136 retained their URLs.',
  },
};
