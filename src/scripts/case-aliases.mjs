// Case URL aliases are not indexable entries. Static GitHub Pages serves
// these HTML redirects with HTTP 200, so also emit a canonical and a link.
export const caseAliases = [
  {from:'mastergrem-boxberry-cart-recovery', to:'boxberry-cart-recovery'},
  {from:'woodmart-product-page-recovery', to:'wavesnwind-woodmart-product-recovery'},
];

export function localizedCaseAliases(publication) {
  return caseAliases.flatMap(({from,to})=>['ru','en'].map(lang=>{
    const trailing=lang==='en'?'/en/':'/';
    const route='showcase/'+from+trailing;
    return {
      route,lang,
      from:new URL(route,publication).href,
      to:new URL('showcase/'+to+trailing,publication).href,
    };
  }));
}

export function caseAliasHtml({lang,to}) {
  const label=lang==='ru'?'Открыть актуальный кейс':'Open the canonical case study';
  return '<!doctype html>\n<html lang="'+lang+'"><head><meta charset="utf-8">\n'
    + '<title>'+label+'</title>\n'
    + '<meta http-equiv="refresh" content="0; url='+to+'">\n'
    + '<link rel="canonical" href="'+to+'">\n'
    + '</head><body><a href="'+to+'">'+label+'</a></body></html>\n';
}
