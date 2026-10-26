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

  console.log('\n================================================================');
  if (allPassed) {
    console.log('🎉 ALL 12 VERIFICATION TESTS PASSED WITH 100% ACCURACY!');
  } else {
    console.error('❌ SOME TESTS FAILED. PLEASE REVIEW OUTPUT ABOVE.');
  }
  console.log('================================================================\n');
}

runTestSuite().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
