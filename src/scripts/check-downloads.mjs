import fs from 'node:fs';
const expected={
  pdf: Buffer.from('%PDF-'),
  docx: Buffer.from([0x50,0x4b,0x03,0x04]),
};
for (const lang of ['ru','en']) {
  const stem = `resume_${lang}`;
  const page = fs.readFileSync(lang==='ru'?'dist/index.html':'dist/en/index.html','utf8');
  const catalog = fs.readFileSync(lang==='ru'?'dist/showcase/index.html':'dist/showcase/en/index.html','utf8');
  if (!page.includes('id="resume"')) throw Error('Missing resume section: '+lang);
  const resumeLink = lang==='ru' ? /href="[^"]*\/(?<!\/en\/)#resume"/ : /href="[^"]*\/en\/#resume"/;
  if (!resumeLink.test(page) || !resumeLink.test(catalog)) throw Error('Missing localized resume navigation: '+lang);
  for (const [suffix,format] of [['.pdf','pdf'],['_ats.pdf','pdf'],['.docx','docx'],['.txt','txt']]) {
    const file=stem+suffix;
    if(!page.includes('/downloads/'+file+'"')) throw Error('Missing download link: '+file);
    const data=fs.readFileSync('dist/downloads/'+file);
    if(data.length<200 || (expected[format] && !data.subarray(0,expected[format].length).equals(expected[format]))) throw Error('Invalid download: '+file);
    if(format==='txt' && !data.toString('utf8').includes(lang==='ru'?'Олег Тишин':'Oleg Tishin')) throw Error('Wrong resume: '+file);
  }
}
console.log('Verified all eight localized resume downloads.');
