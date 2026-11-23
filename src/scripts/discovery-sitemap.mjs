// Small, stable comparison group for the Search Console Sitemap report.
// It does not replace the complete sitemap or signal ranking priority.
const routes = [
  '', 'showcase/', 'services/', 'guides/',
  'services/website-redesign/',
  'services/woocommerce-store-development/',
  'services/catalog-automation/',
  'services/woocommerce-shipping/',
  'services/wordpress-performance/',
  'services/technical-seo/',
  'showcase/78-dosok/',
  'showcase/wellland-facets/',
  'showcase/arenda-pm-home-performance/',
  'guides/woocommerce-shipping-not-showing/',
];

export function discoveryUrls(base) {
  return routes.flatMap(route => ['', 'en/'].map(locale => new URL(route + locale, base).href));
}

export function discoverySitemapXml(urls) {
  const escape = url => url.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&apos;');
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.map(url => '  <url><loc>' + escape(url) + '</loc></url>\n').join('')
    + '</urlset>\n';
}
