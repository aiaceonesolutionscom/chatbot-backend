async function searchUomoCart() {
  const res = await fetch('https://colbolt.hawksnfox.com/wp-content/themes/uomo/js/woocommerce.js');
  const text = await res.text();
  const lines = text.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('apus-topcart') || l.includes('mini-cart') || l.includes('widget_shopping_cart') || l.includes('cart-2')) {
      console.log(`L${idx+1}: ${l}`);
    }
  });
}
searchUomoCart();
