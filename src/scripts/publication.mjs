const defaultPublication = 'https://wporgru.github.io/web-portfolio/';

export function livePublicationUrl(input = process.env.PORTFOLIO_LIVE_URL || defaultPublication) {
  const url = new URL(input);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('Publication URL must be HTTPS with no credentials, query or fragment');
  }
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  return url;
}

export function rootRobots(url) {
  if (url.protocol !== 'https:' || url.pathname !== '/') return null;
  return 'User-agent: *\nAllow: /\nSitemap: ' + new URL('sitemap-index.xml', url).href + '\n';
}
