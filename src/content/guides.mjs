import { migrationGuide } from './migration-guide.mjs';
import { filtersGuide } from './woocommerce-filters-guide.mjs';
import { ymlFeedGuide } from './yml-feed-guide.mjs';
import { woocommerceThemeChangeGuide } from './woocommerce-theme-change-guide.mjs';
import { priceListGuide } from './woocommerce-price-list-guide.mjs';
import { migrationIndexingGuide } from './migration-indexing-guide.mjs';
import { importTimeoutGuide } from './import-timeout-guide.mjs';
import { b2bQuoteGuide } from './b2b-catalog-quote-guide.mjs';
import { orderEmailGuide } from './woocommerce-order-email-guide.mjs';
import { wordpressPhpUpdateGuide } from './wordpress-php-update-guide.mjs';
import { repairOrRedesignGuide } from './wordpress-repair-or-redesign-guide.mjs';
import { contactForm7MailGuide } from './contact-form-7-mail-guide.mjs';
import { wordpressMobileLcpGuide } from './wordpress-mobile-lcp-guide.mjs';

const versioned = (contentFile, guide) => ({...guide, contentFile: 'src/content/'+contentFile});

export const guides = [
  versioned('migration-guide.mjs', {
    ...migrationGuide,
    primaryService:'hosting-migration',
    sourceUrls:[
      'https://woocommerce.com/document/backup-wordpress-content/',
      'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
    ],
    ru:{...migrationGuide.ru,context:'Если планируете перенос',action:'Обсудить перенос магазина',serviceLabel:'Посмотреть услугу переноса'},
    en:{...migrationGuide.en,context:'Planning a store migration',action:'Discuss your migration',serviceLabel:'Explore migration services'},
  }),
  versioned('woocommerce-filters-guide.mjs', filtersGuide),
  versioned('yml-feed-guide.mjs', ymlFeedGuide),
  versioned('woocommerce-theme-change-guide.mjs', woocommerceThemeChangeGuide),
  versioned('woocommerce-price-list-guide.mjs', priceListGuide),
  versioned('migration-indexing-guide.mjs', migrationIndexingGuide),
  versioned('import-timeout-guide.mjs', importTimeoutGuide),
  versioned('b2b-catalog-quote-guide.mjs', b2bQuoteGuide),
  versioned('woocommerce-order-email-guide.mjs', orderEmailGuide),
  versioned('wordpress-php-update-guide.mjs', wordpressPhpUpdateGuide),
  versioned('wordpress-repair-or-redesign-guide.mjs', repairOrRedesignGuide),
  versioned('contact-form-7-mail-guide.mjs', contactForm7MailGuide),
  versioned('wordpress-mobile-lcp-guide.mjs', wordpressMobileLcpGuide),
];
