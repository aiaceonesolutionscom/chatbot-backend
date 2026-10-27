async function testStoreApi() {
  try {
    const res = await fetch('https://colbolt.hawksnfox.com/wp-json/wc/store/v1/cart');
    console.log('GET /wp-json/wc/store/v1/cart status:', res.status);
    const data = await res.json();
    console.log('Response keys:', Object.keys(data));
    console.log('Items count:', data.items?.length);
    console.log('Totals:', data.totals);
  } catch (e) {
    console.error('Store API error:', e);
  }
}
testStoreApi();
