async function printUomoSnippet() {
  const res = await fetch('https://colbolt.hawksnfox.com/wp-content/themes/uomo/js/woocommerce.js');
  const text = await res.text();
  const lines = text.split('\n');
  console.log(lines.slice(144, 175).join('\n'));
}
printUomoSnippet();
