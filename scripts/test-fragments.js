async function testRefreshedFragments() {
  const res = await fetch('https://colbolt.hawksnfox.com/?wc-ajax=get_refreshed_fragments', {
    method: 'POST'
  });
  console.log('get_refreshed_fragments status:', res.status);
  const data = await res.json();
  console.log('Fragments keys:', Object.keys(data.fragments || {}));
  for (const [k, v] of Object.entries(data.fragments || {})) {
    console.log(`Key [${k}]: ${v.slice(0, 150)}...`);
  }
}
testRefreshedFragments();
