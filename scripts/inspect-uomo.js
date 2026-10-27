async function inspectUomo() {
  try {
    const res = await fetch('https://colbolt.hawksnfox.com/wp-content/themes/uomo/js/woocommerce.js');
    const text = await res.text();
    console.log('Uomo woocommerce.js length:', text.length);
    
    // Look for cart, fragment, added_to_cart, count
    const lines = text.split('\n');
    lines.forEach((l, idx) => {
      if (l.includes('cart') || l.includes('count') || l.includes('added_to_cart') || l.includes('fragments')) {
        console.log(`L${idx + 1}: ${l.slice(0, 150)}`);
      }
    });
  } catch (e) {
    console.error(e);
  }
}
inspectUomo();
