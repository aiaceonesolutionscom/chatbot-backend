async function checkWcAddToCart() {
  const res = await fetch('https://colbolt.hawksnfox.com/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.js');
  if (res.ok) {
    const text = await res.text();
    console.log(text.slice(0, 800));
  } else {
    const res2 = await fetch('https://colbolt.hawksnfox.com/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.min.js');
    const text2 = await res2.text();
    console.log(text2.slice(0, 800));
  }
}
checkWcAddToCart();
