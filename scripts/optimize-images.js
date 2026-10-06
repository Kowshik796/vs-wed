import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('public/assets');
const publicDir = path.resolve('public');

async function optimizeFolder(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) continue;

    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const nameWithoutExt = path.basename(file, ext);
      const webpPath = path.join(dir, `${nameWithoutExt}.webp`);
      
      const beforeSize = stat.size;
      
      // Generate optimized WebP
      await sharp(fullPath)
        .webp({ quality: 86, effort: 6 })
        .toFile(webpPath);
      
      const webpStat = fs.statSync(webpPath);
      console.log(`Converted ${file}: ${(beforeSize / 1024 / 1024).toFixed(2)}MB -> ${(webpStat.size / 1024 / 1024).toFixed(2)}MB WebP (${((1 - webpStat.size / beforeSize) * 100).toFixed(1)}% reduction)`);
    }
  }
}

async function run() {
  console.log('--- Optimizing public/assets ---');
  await optimizeFolder(assetsDir);
  console.log('--- Optimizing public root ---');
  await optimizeFolder(publicDir);
  console.log('Optimization complete!');
}

run().catch(console.error);
