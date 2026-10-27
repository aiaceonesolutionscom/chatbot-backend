async function checkTopCart() {
  const res = await fetch('https://colbolt.hawksnfox.com/');
  const html = await res.text();
  const match = html.match(/<div[^>]*class=["'][^"']*apus-topcart[^"']*["'][\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
  if (match) {
    console.log(match[0].slice(0, 800));
  } else {
    const idx = html.indexOf('apus-topcart');
    console.log(html.slice(idx, idx + 800));
  }
}
checkTopCart();
