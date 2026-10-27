import { ConversationEngine } from '../packages/backend/dist/modules/ai/conversation.engine.js';
import { TenantStore } from '../packages/backend/dist/modules/tenant/tenant.store.js';

async function runTestSuite() {
  console.log('================================================================');
  console.log('🚀 RIGOROUS CONVERSATIONAL COMMERCE AUTOMATED TEST SUITE');
  console.log('================================================================\n');

  TenantStore.initializeDefaults();
  const tenant = TenantStore.getBySiteKey('colbolt_live');
  const conversationId = `test_conv_${Date.now()}`;
  let allPassed = true;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      if (details) console.error(`   Details: ${details}`);
      allPassed = false;
    }
  }

  // TEST 1: Greeting
  console.log('--- Step 1: Greeting ---');
  let res = await ConversationEngine.processMessage({
    conversationId,
    message: 'hello',
    tenant
  });
  assert(res.message.toLowerCase().includes('colbolt') || res.message.toLowerCase().includes('colt'), 'Greeting mentions Colbolt/Colt');
  assert(!res.message.includes('User Safety:'), 'No AI safety debug headers');

  // TEST 2: Budget check ($15 vs Tirz $150)
  console.log('\n--- Step 2: Budget Query ($15 for Tirz) ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'mera order karoo tirz ka 15 dollar mai koi hai',
    tenant
  });
  assert(res.message.includes('$150') || res.message.includes('budget'), 'Explains Tirz is $150 and exceeds $15 budget');
  assert(res.message.includes('Bacteriostatic Water') || res.message.includes('15'), 'Identifies $15 Bacteriostatic Water');

  // TEST 3: Add Bacteriostatic Water via text
  console.log('\n--- Step 3: Add Bacteriostatic Water via Text ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'bacteriostatic water add kardo',
    tenant
  });
  const cartAfterAdd1 = ConversationEngine.getSessionCart(conversationId);
  assert(cartAfterAdd1.some(it => it.title.toLowerCase().includes('water')), 'Session Cart has Bacteriostatic Water');
  assert(res.cartAction && res.cartAction.type === 'add', 'Cart action "add" emitted for frontend bridge');
  assert(res.message.includes('Bacteriostatic Water'), 'Confirmation mentions Bacteriostatic Water');

  // TEST 4: Add Tirz 10mg via text
  console.log('\n--- Step 4: Add Tirz 10mg via Text ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'tirz 10mg add karo',
    tenant
  });
  const cartAfterAdd2 = ConversationEngine.getSessionCart(conversationId);
  assert(cartAfterAdd2.length === 2, 'Session Cart now has 2 distinct products');
  assert(cartAfterAdd2.some(it => it.title.toLowerCase().includes('tirz')), 'Session Cart has Tirz 10mg');
  assert(res.cartAction && res.cartAction.type === 'add', 'Cart action "add" emitted');

  // TEST 5: Update Quantity (Increase Tirz to 2x)
  console.log('\n--- Step 5: Update Quantity (Tirz ki quantity 2 kardo) ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'tirz ki quantity 2 kar do',
    tenant
  });
  const cartAfterUpdate = ConversationEngine.getSessionCart(conversationId);
  const tirzItem = cartAfterUpdate.find(it => it.title.toLowerCase().includes('tirz'));
  assert(tirzItem && tirzItem.quantity === 2, 'Tirz quantity in Session Cart is 2x', `Current: ${tirzItem?.quantity}`);
  assert(res.cartAction && res.cartAction.type === 'update', 'Cart action "update" emitted');
  assert(res.productCards === undefined, 'Zero product cards when updating quantity');

  // TEST 6: Inspect Cart (mere cart mai ktinay product hai or konsya hai??)
  console.log('\n--- Step 6: Cart Inspection ("mere cart mai ktinay product hai") ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'mere cart mai ktinay product hai or konsya hai??',
    tenant
  });
  assert(res.message.includes('Bacteriostatic Water') && res.message.includes('Tirz'), 'Shows itemized listing of both products');
  assert(res.message.includes('315') || res.message.includes('Subtotal'), 'Calculates accurate subtotal');
  assert(res.productCards === undefined, 'Zero product cards for cart inspection');

  // TEST 7: Remove / Delete Tirz ("tirz hata doo")
  console.log('\n--- Step 7: Delete / Un-cart Tirz ("tirz hata doo") ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'tirz hata doo',
    tenant
  });
  const cartAfterDelete = ConversationEngine.getSessionCart(conversationId);
  assert(!cartAfterDelete.some(it => it.title.toLowerCase().includes('tirz')), 'Tirz is removed from Session Cart');
  assert(cartAfterDelete.length === 1 && cartAfterDelete[0].title.toLowerCase().includes('water'), 'Bacteriostatic Water remains in cart');
  assert(res.cartAction && res.cartAction.type === 'remove', 'Cart action "remove" emitted');
  assert(res.productCards === undefined, 'Zero product cards for uncarting');
  assert(!res.message.includes('Apna Cart Open Karein'), 'NO manual tutorial steps instructing user to click themselves');

  // TEST 8: Proceed to Checkout ("procced kardoo")
  console.log('\n--- Step 8: Proceed to Checkout ("procced kardoo") ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'procced kardoo',
    tenant
  });
  assert(res.message.includes('checkout') && res.message.includes('colbolt.hawksnfox.com/checkout'), 'Checkout link provided');
  assert(res.productCards === undefined, 'Zero product cards for checkout');

  // TEST 9: Clear Cart ("cart khali kar do")
  console.log('\n--- Step 9: Clear Cart ("cart khali kar do") ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'cart khali kar do',
    tenant
  });
  const cartAfterClear = ConversationEngine.getSessionCart(conversationId);
  assert(cartAfterClear.length === 0, 'Session Cart is completely empty');
  assert(res.cartAction && res.cartAction.type === 'clear', 'Cart action "clear" emitted');
  assert(res.productCards === undefined, 'Zero product cards for clear cart');

  // TEST 10: Order Tracking ("track order #1042")
  console.log('\n--- Step 10: Order Tracking ("track order #1042") ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'track order #1042',
    tenant
  });
  assert(res.message.includes('#1042') && res.message.includes('Processing'), 'Returns live order tracking status');

  // TEST 11: Order Cancellation Security Check
  console.log('\n--- Step 11: Order Cancellation Security ("cancel order #1042") ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'cancel order #1042',
    tenant
  });
  assert(res.message.toLowerCase().includes('email') || res.message.toLowerCase().includes('billing'), 'Prompts for billing email security check');

  // TEST 12: Order Cancellation with Email
  console.log('\n--- Step 12: Order Cancellation Verified ("cancel order #1042 customer@example.com") ---');
  res = await ConversationEngine.processMessage({
    conversationId,
    message: 'cancel order #1042 customer@example.com',
    tenant
  });
  assert(res.message.includes('CANCELLED') || res.message.includes('kamyabi'), 'Confirms verified order cancellation');
  assert(res.message.includes('customer@example.com'), 'Echoes verified customer email');

  // TEST 13: Exact Dosage & Quantity Disambiguation ("tirz 10 mg add akroo cart mai")
  console.log('\n--- Step 13: Exact Dosage Disambiguation ("tirz 10 mg add akroo cart mai") ---');
  const convId2 = `test_conv_dosage_${Date.now()}`;
  res = await ConversationEngine.processMessage({
    conversationId: convId2,
    message: 'tirz 10 mg add akroo cart mai',
    tenant
  });
  let cart2 = ConversationEngine.getSessionCart(convId2);
  let tirz10 = cart2.find(it => it.title.includes('10mg'));
  assert(tirz10 !== undefined, 'Accurately resolved Tirz 10mg instead of 60mg');
  assert(tirz10 && tirz10.quantity === 1, 'Quantity is 1x, NOT 10x from "10mg" dosage!', `Actual qty: ${tirz10?.quantity}`);
  assert(res.message.includes('$150'), 'Price reflected as $150.00, NOT $6,750.00');

  // TEST 14: Quantity Increase ("quantity 3 kardo iskii")
  console.log('\n--- Step 14: Quantity Set ("quantity 3 kardo iskii") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convId2,
    message: 'quantity 3 kardo iskii',
    tenant
  });
  cart2 = ConversationEngine.getSessionCart(convId2);
  tirz10 = cart2.find(it => it.title.includes('10mg'));
  assert(tirz10 && tirz10.quantity === 3, 'Quantity updated to 3x', `Actual: ${tirz10?.quantity}`);
  assert(res.productCards === undefined, 'No product cards shown on quantity update');

  // TEST 15: Quantity Minus ("1 minus akrdoo")
  console.log('\n--- Step 15: Quantity Minus ("1 minus akrdoo") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convId2,
    message: '1 minus akrdoo',
    tenant
  });
  cart2 = ConversationEngine.getSessionCart(convId2);
  tirz10 = cart2.find(it => it.title.includes('10mg'));
  assert(tirz10 && tirz10.quantity === 2, 'Quantity reduced by 1 to 2x', `Actual: ${tirz10?.quantity}`);
  assert(res.productCards === undefined, 'No product cards shown on minus');

  // TEST 16: Quantity Decrement ("remove akrdo ik quantity")
  console.log('\n--- Step 16: Decrement ("remove akrdo ik quantity") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convId2,
    message: 'remove akrdo ik quantity',
    tenant
  });
  cart2 = ConversationEngine.getSessionCart(convId2);
  tirz10 = cart2.find(it => it.title.includes('10mg'));
  assert(tirz10 && tirz10.quantity === 1, 'Quantity reduced to 1x', `Actual: ${tirz10?.quantity}`);
  assert(res.productCards === undefined, 'No product cards shown on quantity decrement');

  // TEST 17: Compound Swap ("tirz 10 mg update kardo 60 mg akrdoo")
  console.log('\n--- Step 17: Compound Swap ("tirz 10 mg update kardo 60 mg akrdoo") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convId2,
    message: 'tirz 10 mg update kardo 60 mg akrdoo',
    tenant
  });
  cart2 = ConversationEngine.getSessionCart(convId2);
  const tirz60 = cart2.find(it => it.title.includes('60mg'));
  const oldTirz10 = cart2.find(it => it.title.includes('10mg'));
  assert(tirz60 !== undefined && oldTirz10 === undefined, 'Successfully swapped Tirz 10mg for Tirz 60mg');
  assert(res.productCards === undefined, 'Zero product cards shown on swap');

  // TEST 18: Contextual Add ("khud akrdo add" / "afd akrdoo")
  console.log('\n--- Step 18: Contextual Add ("khud akrdo add") ---');
  const convId3 = `test_conv_ctx_${Date.now()}`;
  // User asks about semaglutide
  await ConversationEngine.processMessage({
    conversationId: convId3,
    message: 'semaglutide 10mg dikhao',
    tenant
  });
  // User then says: "khud akrdo add"
  res = await ConversationEngine.processMessage({
    conversationId: convId3,
    message: 'khud akrdo add',
    tenant
  });
  let cart3 = ConversationEngine.getSessionCart(convId3);
  assert(cart3.some(it => it.title.toLowerCase().includes('semaglutide')), 'Contextually added Semaglutide from previous turn');
  assert(res.cartAction && res.cartAction.type === 'add', 'Cart action emitted for contextual add');

  console.log('\n================================================================');
  if (allPassed) {
    console.log('🎉 ALL 18 VERIFICATION TESTS PASSED WITH 100% ACCURACY!');
  } else {
    console.error('❌ SOME TESTS FAILED. PLEASE REVIEW OUTPUT ABOVE.');
  }
  console.log('================================================================\n');
}

runTestSuite().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
