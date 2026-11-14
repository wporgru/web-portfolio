import fs from 'node:fs';

type ProjectImage = {
  width: number;
  height: number;
  cover: string;
  variants: {url: string; width: number}[];
};
const manifestPath = '.astro/project-images.json';
const images: Record<string,ProjectImage> = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath,'utf8')) : {};

export const projectImage = (src?: string) => src ? images[src] : undefined;
