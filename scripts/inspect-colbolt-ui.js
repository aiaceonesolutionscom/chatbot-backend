async function main() {
  const res = await fetch('https://colbolt.hawksnfox.com/');
  const text = await res.text();
  
  // Find all images in header or logo classes
  const imgMatches = [...text.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  console.log('All image sources found (first 25):', imgMatches.slice(0, 25));
  
  // Find CSS stylesheets
  const cssMatches = [...text.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log('\nMain CSS stylesheets:', cssMatches.filter(s => s.includes('theme') || s.includes('style') || s.includes('uomo')));

  // Look for brand logo
  const logoMatch = text.match(/class=["'][^"']*logo[^"']*["'][\s\S]*?<img[^>]+src=["']([^"']+)["']/i);
  console.log('\nLogo in .logo class:', logoMatch ? logoMatch[1] : 'None');

  // Look for theme colors
  const themeColors = text.match(/--[\w-]+:\s*#[0-9a-fA-F]{3,8}/gi);
  console.log('\nCSS Variables for colors:', themeColors ? themeColors.slice(0, 15) : 'None');
}

main().catch(console.error);
