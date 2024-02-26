export default function myImageLoader({ src, width, quality }) {
  if (src.startsWith('/_')) return src;
  return `https://images.ratersapp.com/?url=${src}&w=${
    width > 640 ? 640 : width
  }&q=${quality || 75}`;
}
