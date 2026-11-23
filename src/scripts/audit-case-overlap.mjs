import {readFileSync} from 'node:fs';
import {parse} from 'yaml';

const args=process.argv.slice(2);
if(args.length>1 || args.some(x=>!/^--against=[a-z0-9-]+$/.test(x))) {
  throw Error('Usage: node src/scripts/audit-case-overlap.mjs [--against=case-slug]');
}
const focus=args[0]?.slice('--against='.length);
const read=lang=>parse(readFileSync(new URL('../content/showcase/projects_'+lang+'.yaml',import.meta.url),'utf8')).projects;
const tokenize=text=>new Set((text??'').normalize('NFKC').toLowerCase().replaceAll('ё','е').match(/[\p{L}\p{N}]{3,}/gu)??[]);

function compare(projects,lang) {
  const records=projects.map(project=>({
    slug:project.slug, date:project.year,
    full:tokenize(project.name+' '+(project.description??'')),
    title:tokenize(project.name),
  }));
  if(focus&&!records.some(record=>record.slug===focus))throw Error('Unknown '+lang+' slug: '+focus);
  const documentFrequency=new Map();
  for(const record of records) for(const token of record.full) {
    documentFrequency.set(token,(documentFrequency.get(token)??0)+1);
  }
  const weight=token=>Math.log1p(records.length/(documentFrequency.get(token)??1));
  const size=set=>[...set].reduce((total,token)=>total+weight(token),0);
  const overlap=(a,b)=>size(new Set([...a].filter(word=>b.has(word))));
  for(const record of records) {
    record.fullWeight=size(record.full);
    record.titleWeight=size(record.title);
  }
  const candidates=[];
  for(const [i,a] of records.entries())for(const b of records.slice(i+1)){
    if(focus&&a.slug!==focus&&b.slug!==focus)continue;
    const shared=overlap(a.full,b.full);
    const similarity=shared/(a.fullWeight+b.fullWeight-shared||1);
    const sameDate=Boolean(a.date&&a.date===b.date);
    const sharedTitle=overlap(a.title,b.title);
    const similarTitle=sharedTitle/(a.titleWeight+b.titleWeight-sharedTitle||1);
    const score=similarity*0.7+similarTitle*0.3;
    if(score<0.07&&!focus)continue;
    if(score===0)continue;
    candidates.push({pair:[a.slug,b.slug],signal:score*(sameDate?1.25:1),sameDate});
  }
  return candidates.sort((a,b)=>b.signal-a.signal).slice(0,focus?12:25).map(({signal,...match})=>({...match,signal:+signal.toFixed(3)}));
}

console.log(JSON.stringify({
  note:'Text overlap is only a review signal. Match the underlying client work and period before merging; separate stages can share vocabulary.',
  reviewedSlug:focus??null,
  candidates:Object.fromEntries(['ru','en'].map(lang=>[lang,compare(read(lang),lang)])),
}, null, 2));
