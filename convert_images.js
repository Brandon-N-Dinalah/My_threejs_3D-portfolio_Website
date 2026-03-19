import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'public';

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach(file => {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk(dir);

files.forEach(file => {
  if (file.match(/\.(png|jpg|jpeg)$/i)) {
    const webpPath = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    sharp(file)
      .webp({ quality: 80 })
      .toFile(webpPath)
      .then(() => console.log(`Converted ${file} to ${webpPath}`))
      .catch(err => console.error(`Error converting ${file}: ${err}`));
  }
});
