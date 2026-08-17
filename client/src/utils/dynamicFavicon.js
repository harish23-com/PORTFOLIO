export const generateFaviconSvg = (firstInitial = 'H', secondInitial = 'K') => {
  return `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="orbit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#00f2fe"/>
      <stop offset="50%" stopColor="#7c5cff"/>
      <stop offset="100%" stopColor="#ec4899"/>
    </linearGradient>
    <linearGradient id="gradH" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#ffffff"/>
      <stop offset="100%" stopColor="#cbd5e1"/>
    </linearGradient>
    <linearGradient id="gradK" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#00f2fe"/>
      <stop offset="50%" stopColor="#38bdf8"/>
      <stop offset="100%" stopColor="#6366f1"/>
    </linearGradient>
    <linearGradient id="swoosh" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#00f2fe"/>
      <stop offset="50%" stopColor="#ffffff"/>
      <stop offset="100%" stopColor="#38bdf8"/>
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="84" stroke="url(#orbit)" stroke-width="14" stroke-linecap="round" stroke-dasharray="410 80"/>
  <text x="62" y="142" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="108" font-weight="900" fill="url(#gradH)" text-anchor="middle" style="letter-spacing:-2px">${firstInitial}</text>
  <text x="136" y="142" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="108" font-weight="900" fill="url(#gradK)" text-anchor="middle" style="letter-spacing:-2px">${secondInitial}</text>
  <path d="M 28 108 C 50 130, 92 114, 116 92 C 142 70, 168 96, 174 108 C 158 90, 130 82, 106 96 C 76 114, 48 122, 28 108 Z" fill="url(#swoosh)"/>
</svg>`;
};

export const updateFaviconFromSiteName = (rawName) => {
  if (!rawName) return;
  const cleaned = rawName
    .replace(/[|•–—].*$/, '')
    .replace(/portfolio/gi, '')
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  let firstInitial = 'H';
  let secondInitial = 'K';

  if (words.length >= 2) {
    firstInitial = words[0][0]?.toUpperCase() || 'H';
    secondInitial = words[words.length - 1][0]?.toUpperCase() || 'K';
  } else if (words.length === 1) {
    firstInitial = words[0][0]?.toUpperCase() || 'H';
    secondInitial = words[0][1]?.toUpperCase() || 'K';
  }

  const svg = generateFaviconSvg(firstInitial, secondInitial);
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    document.head.appendChild(link);
  }
  link.href = dataUrl;
};
