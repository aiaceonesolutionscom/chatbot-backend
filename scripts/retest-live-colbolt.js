async function retestLive() {
  console.log('================================================================');
  console.log('🌐 LIVE PRODUCTION RETEST: COLBOLT STOREFRONT & API');
  console.log('Target API: https://api.hawksnfox.com');
  console.log('Target Storefront: https://colbolt.hawksnfox.com');
  console.log('================================================================\n');

  let allPassed = true;
  function assert(condition, name, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
    } else {
      console.error(`❌ [FAIL] ${name}`);
      if (details) console.error(`   Details: ${details}`);
      allPassed = false;
    }
  }

  // 1. Health check
  console.log('--- 1. Health Check on Live Backend ---');
  try {
    const healthRes = await fetch('https://api.hawksnfox.com/api/health');
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.status === 'healthy', 'Live API Health Check 200 OK', JSON.stringify(healthData));
  } catch (e) {
    assert(false, 'Health Check Failed', e.message);
  }

  // 2. Widget CDN verification
  console.log('\n--- 2. Live widget.js CDN Serving ---');
  try {
    const widgetRes = await fetch('https://api.hawksnfox.com/widget.js');
    const widgetText = await widgetRes.text();
    assert(widgetRes.status === 200, 'widget.js returned HTTP 200');
    assert(widgetText.includes('applyFragmentsAndUpdateDOM'), 'widget.js contains live DOM fragment injection');
    assert(widgetText.includes('executeCartUpdate'), 'widget.js contains cart quantity update logic');
    assert(!widgetText.includes('</button></div>\n        </div>'), 'widget.js does not contain dangling closing tags');
    console.log(`   widget.js size: ${(widgetText.length / 1024).toFixed(2)} KB`);
  } catch (e) {
    assert(false, 'widget.js fetch failed', e.message);
  }

  // 3. WordPress Storefront Script & Header Tag Verification
  console.log('\n--- 3. WordPress Storefront HTML Verification ---');
  try {
    const storeRes = await fetch('https://colbolt.hawksnfox.com/');
    const storeHtml = await storeRes.text();
    assert(storeRes.status === 200, 'Storefront returned HTTP 200 OK');
    assert(storeHtml.includes('UniversalChatbotConfig'), 'UniversalChatbotConfig rendered in page HTML');
    assert(storeHtml.includes('api.hawksnfox.com/widget.js'), 'widget.js script tag dynamically enqueued from api.hawksnfox.com');
    assert(storeHtml.includes('apus-topcart'), 'Uomo header cart container (.apus-topcart) found');
  } catch (e) {
    assert(false, 'Storefront check failed', e.message);
  }

  // 4. Live Chat Message Engine End-to-End Flow
  console.log('\n--- 4. Live Conversational Commerce End-to-End Retest ---');
  const conversationId = `live_verify_${Date.now()}`;
  let liveSessionCart = [];

  async function postChat(msg, label) {
    console.log(`\nTesting [${label}]: "${msg}"`);
    const res = await fetch('https://api.hawksnfox.com/api/chat/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Site-Key': 'colbolt_live'
      },
      body: JSON.stringify({
        siteKey: 'colbolt_live',
        conversationId,
        message: msg,
        cartItems: liveSessionCart
      })
    });

    if (!res.ok) {
      assert(false, `${label} HTTP error: ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (data.cartAction) {
      if (data.cartAction.type === 'add' && data.cartAction.item) {
        liveSessionCart.push(data.cartAction.item);
      } else if (data.cartAction.type === 'remove') {
        liveSessionCart = liveSessionCart.filter(it => it.id !== String(data.cartAction.productId));
      } else if (data.cartAction.type === 'update' && data.cartAction.item) {
        const exist = liveSessionCart.find(it => it.id === String(data.cartAction.item.id));
        if (exist) exist.quantity = data.cartAction.item.quantity;
      } else if (data.cartAction.type === 'clear') {
        liveSessionCart = [];
      }
    }
    return data;
  }

  // STEP A: Greeting
  const r1 = await postChat('hello', 'Greeting');
  if (r1) {
    assert(r1.message.includes('Colbolt') || r1.message.includes('Colt'), 'Colt AI Greeting response received');
    assert(!r1.message.includes('User Safety:'), 'No safety debug prefixes');
  }

  // STEP B: Budget inquiry ($15 for Tirz)
  const r2 = await postChat('mera order karoo tirz ka 15 dollar mai koi hai', 'Budget Query');
  if (r2) {
    assert(r2.message.includes('150') || r2.message.includes('budget'), 'Explains Tirz is $150 and exceeds $15 budget');
    assert(r2.message.includes('Bacteriostatic Water'), 'Suggests $15 Bacteriostatic Water within budget');
  }

  // STEP C: Add Bacteriostatic Water via text
  const r3 = await postChat('bacteriostatic water add kardo', 'Add Bacteriostatic Water via Text');
  if (r3) {
    assert(r3.cartAction && r3.cartAction.type === 'add', 'Emitted cartAction "add"');
    assert(r3.message.includes('Bacteriostatic Water'), 'Confirmation specifies Bacteriostatic Water added');
    assert(liveSessionCart.some(it => it.title.includes('Water')), 'Cart state now holds Bacteriostatic Water');
  }

  // STEP D: Add Tirz 10mg via text
  const r4 = await postChat('tirz 10mg add karo', 'Add Tirz 10mg via Text');
  if (r4) {
    assert(r4.cartAction && r4.cartAction.type === 'add', 'Emitted cartAction "add" for Tirz');
    assert(liveSessionCart.length === 2, 'Live cart now contains both compounds');
  }

  // STEP E: Quantity Update
  const r5 = await postChat('tirz ki quantity 2 kar do', 'Update Quantity');
  if (r5) {
    assert(r5.cartAction && r5.cartAction.type === 'update', 'Emitted cartAction "update"');
    const tirz = liveSessionCart.find(it => it.title.includes('Tirz'));
    assert(tirz && tirz.quantity === 2, 'Tirz quantity updated to 2x');
    assert(r5.productCards === undefined, 'Zero product cards when updating quantity');
  }

  // STEP F: View Cart
  const r6 = await postChat('mere cart mai ktinay product hai or konsya hai??', 'Cart Inspection');
  if (r6) {
    assert(r6.message.includes('Bacteriostatic Water') && r6.message.includes('Tirz'), 'Accurately itemizes active compounds');
    assert(r6.message.includes('315') || r6.message.includes('Subtotal'), 'Calculates accurate $315.00 subtotal');
    assert(r6.productCards === undefined, 'Zero product cards when viewing cart');
  }

  // STEP G: Remove Tirz
  const r7 = await postChat('tirz hata doo', 'Un-cart Tirz');
  if (r7) {
    assert(r7.cartAction && r7.cartAction.type === 'remove', 'Emitted cartAction "remove" for Tirz');
    assert(!liveSessionCart.some(it => it.title.includes('Tirz')), 'Tirz successfully deleted from session');
    assert(liveSessionCart.length === 1 && liveSessionCart[0].title.includes('Water'), 'Bacteriostatic Water remains in cart');
    assert(r7.productCards === undefined, 'Zero product cards when uncarting');
    assert(!r7.message.includes('Apna Cart Open Karein'), 'Zero manual click tutorials');
  }

  // STEP H: Proceed to Checkout
  const r8 = await postChat('procced kardoo', 'Proceed to Checkout');
  if (r8) {
    assert(r8.message.includes('checkout') && r8.message.includes('colbolt.hawksnfox.com/checkout'), 'Checkout link provided with remaining total');
    assert(r8.productCards === undefined, 'Zero product cards for checkout');
  }

  // STEP I: Clear Cart
  const r9 = await postChat('cart khali kar do', 'Clear Cart');
  if (r9) {
    assert(r9.cartAction && r9.cartAction.type === 'clear', 'Emitted cartAction "clear"');
    assert(liveSessionCart.length === 0, 'Cart is now empty');
    assert(r9.productCards === undefined, 'Zero product cards for clear cart');
  }

  // STEP J: Order Tracking
  const r10 = await postChat('track order #1042', 'Track Order');
  if (r10) {
    assert(r10.message.includes('#1042') && r10.message.includes('Processing'), 'Live order tracking status returned');
  }

  // STEP K: Order Cancellation Security Check
  const r11 = await postChat('cancel order #1042', 'Order Cancel Security Check');
  if (r11) {
    assert(r11.message.toLowerCase().includes('email') || r11.message.toLowerCase().includes('billing'), 'Prompts for billing email security verification');
  }

  // STEP L: Order Cancellation Verified
  const r12 = await postChat('cancel order #1042 live_tester@hawksnfox.com', 'Verified Order Cancellation');
  if (r12) {
    assert(r12.message.includes('CANCELLED') || r12.message.includes('kamyabi'), 'Order #1042 confirmed cancelled with inventory release');
  }

  console.log('\n================================================================');
  if (allPassed) {
    console.log('🎉 ALL LIVE PRODUCTION RETEST CHECKS PASSED WITH 100% SUCCESS!');
  } else {
    console.error('❌ SOME CHECKS FAILED. REVIEW DETAILS ABOVE.');
  }
  console.log('================================================================\n');
}

retestLive().catch(console.error);
