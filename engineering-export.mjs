import fs from 'node:fs';
import {stringify} from 'yaml';
const read=p=>fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
const publicSources = {
  'dme-english-service-site': 'https://kwork.ru/portfolio/4093977',
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
      if (publicSources[slug]) {
        blocks.push({
          type:'text', title:ru?'Проект в портфолио Kwork':'Original Kwork portfolio entry',
          body:ru?'Март 2021 года — дата публикации карточки; точная дата сдачи не установлена.':'March 2021 is the publication date; the exact delivery date is unknown.',
          links:[{label:ru?'Посмотреть оригинальную карточку':'View the original entry',url:publicSources[slug]}],
        });
      }
      fs.writeFileSync(dir+'/'+slug.replaceAll('-','_')+'_'+lang+'.yaml',stringify({title:name,tagline:brief,year,role,stack:tags,blocks}));
      projects[lang].push({slug,name,year,role,description:brief,stack:tags,order:projects[lang].length+1,theme:'cyan',links:[{label:ru?'Читать кейс':'Read case study',url:'/showcase/'+slug+(ru?'':'/en'),type:'product'}]});
    }
  }
}
