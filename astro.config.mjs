import { defineConfig } from 'astro/config';
import { cpSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { latestContentRevision, readContentRevisions } from './src/scripts/content-revisions.mjs';
import { rootRobots } from './src/scripts/publication.mjs';
import { guides } from './src/content/guides.mjs';

import sitemap from '@astrojs/sitemap';

const repo = process.env.GITHUB_REPOSITORY;
const [owner, name] = repo ? repo.split('/') : [null, null];

// A canonical custom origin is opt-in; the GitHub Pages project path stays the default.
const customSite = process.env.SITE_URL?.trim();
if (customSite) {
  const url = new URL(customSite);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.username || url.password || url.search || url.hash) {
    throw Error('SITE_URL must be an HTTPS origin with no path, credentials, query or fragment');
  }
}
const site = customSite || (owner ? `https://${owner}.github.io` : 'http://localhost:4321');
const base = process.env.BASE_PATH ?? (customSite ? '/' : name ? `/${name}` : undefined);
const mount = (base ?? '').replace(/\/$/, '');
const guideSources=new Map(guides.map(guide=>[guide.slug,guide.contentFile]));
const revisions=readContentRevisions({required:process.env.GITHUB_ACTIONS==='true', guideFiles:[...guideSources.values()]});
const sitemapUrls=new Set();

function addContentMetadata(item) {
  const url = new URL(item.url);
  const route = url.pathname.slice(mount.length);
  const guide = /^\/guides\/([a-z0-9-]+)(?:\/en)?\/$/.exec(route);
  if (guideSources.has(guide?.[1])) {
    const lastmod = revisions.get(guideSources.get(guide[1]));
    return lastmod ? {...item,lastmod} : item;
  }
  const match = /^\/showcase\/([a-z0-9-]+)(\/en)?\/$/.exec(route);
  if (!match || ['ru','en'].includes(match[1])) return item;
  const [,slug,englishSuffix] = match;
  const locale = englishSuffix ? 'en' : 'ru';
  const projectDir = path.posix.join('public','media','projects',slug);
  const file = path.posix.join(projectDir,`${slug.replaceAll('-','_')}_${locale}.yaml`);
  if (!statSync(file,{throwIfNoEntry:false})?.isFile()) return item;
  const project = parse(readFileSync(file,'utf8'));
  const prefix = `/media/projects/${slug}/`;
  const images = new Set();
  const sourcePaths=[file];
  for (const block of project?.blocks ?? []) {
    const src = block?.src;
    if (block?.type !== 'image' || typeof src !== 'string' || !src.startsWith(prefix)) continue;
    const basename = src.slice(prefix.length);
    if (!/^[a-z0-9_.-]+\.(?:png|jpe?g|webp|gif|avif)$/i.test(basename)) continue;
    if (!statSync(path.join(projectDir,basename),{throwIfNoEntry:false})?.isFile()) {
      throw new Error('Missing project image: '+src);
    }
    images.add(new URL(mount+src,url).href);
    sourcePaths.push(path.posix.join(projectDir,basename));
  }
  const lastmod=latestContentRevision(revisions,sourcePaths);
  return {
    ...item,
    ...(images.size ? {img:[...images]} : {}),
    ...(lastmod ? {lastmod} : {}),
  };
}

export default defineConfig({
  site,
  base,

  vite: {
    plugins: [{
      name: 'copy-themes',
      configResolved() {
        cpSync('src/styles/themes', 'public/themes', { recursive: true });
      }
    }]
  },

  integrations: [
    sitemap({
      serialize: item=>{
        const entry=addContentMetadata(item);
        sitemapUrls.add(entry.url);
        return entry;
      },
      filter: (page) =>
        // og-preview renders sample/mock data for the OG-image screenshot
        // pipeline and is deleted from dist/ before deploy — never a real page.
        !page.includes('/og-preview') &&
        // quickstart and get-started are both short redirect stubs to
        // /showcase/cv-hub#quickstart (two aliases, kept for presentation
        // variety) — same content, avoid duplicate-content sitemap entries.
        !page.includes('/quickstart') &&
        !page.includes('/get-started'),
    }),
    {
      name:'portfolio-text-sitemap',
      hooks:{
        'astro:build:start':()=>sitemapUrls.clear(),
        'astro:build:done':({dir})=>{
          if (!sitemapUrls.size) throw Error('No canonical URLs collected for the text sitemap.');
          writeFileSync(new URL('sitemap.txt',dir),[...sitemapUrls].sort().join('\n')+'\n','utf8');
          const robots = rootRobots(new URL(mount+'/',site));
          if (robots) writeFileSync(new URL('robots.txt',dir),robots,'utf8');
        },
      },
    },
  ]
});
