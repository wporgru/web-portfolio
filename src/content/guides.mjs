import { migrationGuide } from './migration-guide.mjs';
import { filtersGuide } from './woocommerce-filters-guide.mjs';
import { ymlFeedGuide } from './yml-feed-guide.mjs';
import { woocommerceThemeChangeGuide } from './woocommerce-theme-change-guide.mjs';
import { priceListGuide } from './woocommerce-price-list-guide.mjs';
import { migrationIndexingGuide } from './migration-indexing-guide.mjs';
import { importTimeoutGuide } from './import-timeout-guide.mjs';
import { b2bQuoteGuide } from './b2b-catalog-quote-guide.mjs';

export const guides = [
  {
    ...migrationGuide,
    primaryService:'hosting-migration',
    sourceUrls:[
      'https://woocommerce.com/document/backup-wordpress-content/',
      'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
    ],
    ru:{...migrationGuide.ru,context:'Если планируете перенос',action:'Обсудить перенос магазина',serviceLabel:'Посмотреть услугу переноса'},
    en:{...migrationGuide.en,context:'Planning a store migration',action:'Discuss your migration',serviceLabel:'Explore migration services'},
  },
  filtersGuide,
  ymlFeedGuide,
  woocommerceThemeChangeGuide,
  priceListGuide,
  migrationIndexingGuide,
  importTimeoutGuide,
  b2bQuoteGuide,
];
