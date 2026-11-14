import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = 'public/media/projects';
const output = 'public/media/previews';
await fs.mkdir(output, { recursive: true });
const manifest = {};
for (const dir of (await fs.readdir(root, {withFileTypes:true})).filter(entry=>entry.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name,'en'))) {
  const files = await fs.readdir(path.join(root,dir.name), {withFileTypes:true});
  for (const file of files.filter(entry=>entry.isFile() && /\.(?:png|jpe?g|webp)$/i.test(entry.name)).sort((a,b)=>a.name.localeCompare(b.name,'en'))) {
    const src = `/media/projects/${dir.name}/${file.name}`;
    const input = path.join(root,dir.name,file.name);
    const image = sharp(input);
    const meta = await image.metadata();
    if (!meta.width || !meta.height || (meta.pages ?? 1) > 1 || (meta.orientation ?? 1) !== 1) continue;
    const {width,height} = meta;
    const prefix = `${dir.name}--${file.name}`;
    const save = async (suffix, pipeline, quality)=>{
      const name = `${prefix}--${suffix}.webp`;
      const data = await pipeline.webp({quality}).toBuffer();
      return {name,data,url:`/media/previews/${name}`};
    };
    const cover = await save('cover',image.clone().resize({width:640,height:480,fit:'cover',position:'north'}),82);
    await fs.writeFile(path.join(output,cover.name),cover.data);
    const originalSize = (await fs.stat(input)).size;
    const variants = [];
    for (const w of [480,960]) {
      if (w >= width) continue;
      const version = await save(w,image.clone().resize({width:w}),83);
      if (version.data.length >= originalSize) continue;
      await fs.writeFile(path.join(output,version.name),version.data);
      variants.push({url:version.url,width:w});
    }
    manifest[src] = {width,height,cover:cover.url,variants};
  }
}
await fs.mkdir('.astro', {recursive:true});
await fs.writeFile('.astro/project-images.json',JSON.stringify(manifest));
console.log(`Prepared portfolio covers and responsive images for ${Object.keys(manifest).length} originals.`);
