import { migrationGuide } from './migration-guide.mjs';
import { filtersGuide } from './woocommerce-filters-guide.mjs';
import { ymlFeedGuide } from './yml-feed-guide.mjs';

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
];
