async function checkProductIds() {
  const res = await fetch('https://colbolt.hawksnfox.com/wp-json/wc/store/v1/products');
  const products = await res.json();
  console.log('Products found:');
  products.forEach(p => console.log(`ID: ${p.id} - ${p.name} - $${p.prices.price}`));
}
checkProductIds();
