async function testCartAdd() {
  // 1. First get initial cart to get session cookies and nonce
  const initRes = await fetch('https://colbolt.hawksnfox.com/wp-json/wc/store/v1/cart');
  const cookies = initRes.headers.getSetCookie ? initRes.headers.getSetCookie() : [initRes.headers.get('set-cookie')].filter(Boolean);
  const nonce = initRes.headers.get('nonce');
  console.log('Cart GET Nonce header:', nonce);
  console.log('Cookies:', cookies);

  const cookieHeader = cookies.map(c => c.split(';')[0]).join('; ');

  // 2. Try POST /wp-json/wc/store/v1/cart/add-item
  const addRes = await fetch('https://colbolt.hawksnfox.com/wp-json/wc/store/v1/cart/add-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Nonce': nonce || '',
      'Cookie': cookieHeader
    },
    body: JSON.stringify({ id: 7092, quantity: 1 })
  });

  console.log('Add-item status:', addRes.status);
  const addData = await addRes.json();
  console.log('Add-item response:', addData.items?.map(it => `${it.id}: ${it.name} x${it.quantity}`));

  // 3. Try wc-ajax=add_to_cart as well
  const formData = new URLSearchParams();
  formData.append('product_id', '7088');
  formData.append('quantity', '1');

  const ajaxRes = await fetch('https://colbolt.hawksnfox.com/?wc-ajax=add_to_cart', {
    method: 'POST',
    headers: {
      'Cookie': cookieHeader
    },
    body: formData
  });

  console.log('\nwc-ajax=add_to_cart status:', ajaxRes.status);
  const ajaxData = await ajaxRes.json();
  console.log('wc-ajax keys:', Object.keys(ajaxData));
  console.log('wc-ajax fragments keys:', Object.keys(ajaxData.fragments || {}));
}

testCartAdd();
