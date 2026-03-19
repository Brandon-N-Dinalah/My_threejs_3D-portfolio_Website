import sharp from 'sharp';

const svgImage = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0a0a0a"/>
  <text x="600" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="96" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-2">BND Labs</text>
  <text x="600" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="500" fill="#c0c0c0" text-anchor="middle">Growth systems for Zambian businesses</text>
  <text x="600" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="400" fill="#666666" text-anchor="middle" letter-spacing="1">brandon-dinalah.vercel.app</text>
</svg>
`;

const svgBuffer = Buffer.from(svgImage);

sharp(svgBuffer)
  .jpeg({ quality: 95 })
  .toFile('./public/og-image.jpg')
  .then(() => console.log('OG image created successfully!'))
  .catch(err => console.error(err));
