async function printWcAddToCart() {
  const res = await fetch('https://colbolt.hawksnfox.com/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.js');
  const text = await res.text();
  console.log(text);
}
printWcAddToCart();
