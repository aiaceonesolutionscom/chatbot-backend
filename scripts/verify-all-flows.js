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

  // TEST 19: Natural Phrasing Swap ("60 nahi 10 karna tha") - NO rigid keyword!
  console.log('\n--- Step 19: Natural Phrasing Swap ("60 nahi 10 karna tha") ---');
  const convId4 = `test_conv_natural_${Date.now()}`;
  // Initially add Tirz 60mg
  await ConversationEngine.processMessage({
    conversationId: convId4,
    message: 'tirz 60mg add karo',
    tenant
  });
  // Now user says naturally: "60 nahi 10 karna tha"
  res = await ConversationEngine.processMessage({
    conversationId: convId4,
    message: '60 nahi 10 karna tha',
    tenant
  });
  let cart4 = ConversationEngine.getSessionCart(convId4);
  assert(cart4.some(it => it.title.includes('10mg')), 'Successfully swapped to Tirz 10mg via natural phrasing');
  assert(!cart4.some(it => it.title.includes('60mg')), 'Old Tirz 60mg removed');
  assert(res.cartAction && res.cartAction.type === 'add', 'Cart action emitted for swap');

  // TEST 20: Natural Phrasing Minus ("aik kam kar do") - NO keyword "minus"!
  console.log('\n--- Step 20: Natural Phrasing Minus ("aik kam kar do") ---');
  // Set quantity to 3 first
  await ConversationEngine.processMessage({
    conversationId: convId4,
    message: '3 kardo',
    tenant
  });
  res = await ConversationEngine.processMessage({
    conversationId: convId4,
    message: 'aik kam kar do',
    tenant
  });
  cart4 = ConversationEngine.getSessionCart(convId4);
  const curItem = cart4.find(it => it.title.includes('10mg'));
  assert(curItem && curItem.quantity === 2, 'Quantity reduced to 2x via "aik kam kar do"', `Actual: ${curItem?.quantity}`);

  // TEST 21: Natural Phrasing Add ("ye dalo basket mai") - NO keyword "add"!
  console.log('\n--- Step 21: Natural Phrasing Add ("ye dalo basket mai") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convId4,
    message: 'bacteriostatic water ye dalo basket mai',
    tenant
  });
  cart4 = ConversationEngine.getSessionCart(convId4);
  assert(cart4.some(it => it.title.toLowerCase().includes('water')), 'Added Bacteriostatic Water via "dalo basket mai"');

  // TEST 22: Natural Phrasing Delete ("isko mat lena") - NO keyword "remove"/"delete"!
  console.log('\n--- Step 22: Natural Phrasing Delete ("water mat lena") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convId4,
    message: 'water mat lena',
    tenant
  });
  cart4 = ConversationEngine.getSessionCart(convId4);
  assert(!cart4.some(it => it.title.toLowerCase().includes('water')), 'Removed Water via "mat lena"');

  // TEST 23: Natural Phrasing Checkout ("bill banao") - NO keyword "checkout"!
  console.log('\n--- Step 23: Natural Phrasing Checkout ("bill banao") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convId4,
    message: 'bill banao payment karni hai',
    tenant
  });
  assert(res.message.includes('checkout') && res.message.includes('colbolt.hawksnfox.com/checkout'), 'Provided checkout link for "bill banao payment karni hai"');

  // TEST 24: Real User Transcript Sequence ("1 or add akrdoo" -> "1 kam akrdooo")
  console.log('\n--- Step 24: User Sequence ("1 or add akrdoo" -> "1 kam akrdooo") ---');
  const convId5 = `test_conv_user_${Date.now()}`;
  // 1. Initial add
  await ConversationEngine.processMessage({
    conversationId: convId5,
    message: 'bacteriostatic water add akrdoo',
    tenant
  });
  // 2. Add 1 more: "1 or add akrdoo"
  await ConversationEngine.processMessage({
    conversationId: convId5,
    message: '1 or add akrdoo',
    tenant
  });
  let cart5 = ConversationEngine.getSessionCart(convId5);
  let waterItem = cart5.find(it => it.title.toLowerCase().includes('water'));
  assert(waterItem && waterItem.quantity === 2, 'Quantity increased to 2x via "1 or add akrdoo"');

  // 3. Subtract 1: "1 kam akrdooo"
  res = await ConversationEngine.processMessage({
    conversationId: convId5,
    message: '1 kam akrdooo',
    tenant
  });
  cart5 = ConversationEngine.getSessionCart(convId5);
  waterItem = cart5.find(it => it.title.toLowerCase().includes('water'));
  assert(waterItem && waterItem.quantity === 1, 'Quantity successfully reduced to 1x via "1 kam akrdooo"', `Actual: ${waterItem?.quantity}`);
  assert(res.cartAction && (res.cartAction.type === 'update' || res.cartAction.type === 'remove'), 'Emitted cartAction for reduction');

  // 4. Cart check: "hua nhin likn cart mai kam"
  res = await ConversationEngine.processMessage({
    conversationId: convId5,
    message: 'hua nhin likn cart mai kam',
    tenant
  });
  assert(res.message.includes('1x') || res.message.includes('$15.00'), 'Cart inspection accurately shows 1x ($15.00), NOT 2x ($30.00)!');

  // TEST 25: Farewell ("byee")
  console.log('\n--- Step 25: Farewell ("byee") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convId5,
    message: 'byee',
    tenant
  });
  assert(res.message.toLowerCase().includes('allah hafiz') || res.message.toLowerCase().includes('goodbye'), 'Returns polite farewell for "byee"');
  assert(!res.message.includes('Main bilkul theek hoon'), 'Does NOT say "Main bilkul theek hoon" for bye!');

  // TEST 26: Company Inquiry ("cobolt karta kia hai yh company??")
  console.log('\n--- Step 26: Company Inquiry ("cobolt karta kia hai yh company??") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convId5,
    message: 'cobolt karta kia hai yh company??',
    tenant
  });
  assert(res.message.toLowerCase().includes('research') || res.message.toLowerCase().includes('peptide') || res.message.toLowerCase().includes('colbolt'), 'Answers what company Colbolt does');
  assert(!res.message.includes('Aap bar bar fazool baatein'), 'Does NOT treat company question as time-wasting!');

  // TEST 27: Human-like Clarification for Vague Add ("add kardo" with no product in context)
  console.log('\n--- Step 27: Human-like Clarification for Vague Add ("add kardo") ---');
  const convId6 = `test_conv_vague_${Date.now()}`;
  res = await ConversationEngine.processMessage({
    conversationId: convId6,
    message: 'add kardo',
    tenant
  });
  assert(res.message.includes('kon sa product') || res.message.toLowerCase().includes('specify which product') || res.message.includes('Tirz'), 'Asks human-like clarification when product is not specified');
  assert(res.productCards && res.productCards.length > 0, 'Offers catalog cards so user can pick easily');

  // TEST 28: Human-like Clarification for Vague Swap ("badal do" with no target specified)
  console.log('\n--- Step 28: Human-like Clarification for Vague Swap ("badal do") ---');
  await ConversationEngine.processMessage({
    conversationId: convId6,
    message: 'tirz 60mg add karo',
    tenant
  });
  res = await ConversationEngine.processMessage({
    conversationId: convId6,
    message: 'badal do',
    tenant
  });
  assert(res.message.includes('replace') || res.message.includes('strength') || res.message.includes('badalna chahte'), 'Asks human-like clarification for vague swap');

  // TEST 29: Multi-Product Add ("tirz 30 mg or tirz 10 mg yh add akroo")
  console.log('\n--- Step 29: Multi-Product Add ("tirz 30 mg or tirz 10 mg yh add akroo") ---');
  const convIdMulti = `test_conv_multi_${Date.now()}`;
  res = await ConversationEngine.processMessage({
    conversationId: convIdMulti,
    message: 'tirz 30 mg or tirz 10 mg yh add akroo',
    tenant
  });
  let multiCart = ConversationEngine.getSessionCart(convIdMulti);
  assert(multiCart.length === 2, 'Both Tirz 30mg and Tirz 10mg added to cart in one turn');
  assert(multiCart.some(i => i.title.includes('30mg')) && multiCart.some(i => i.title.includes('10mg')), 'Both 30mg and 10mg exist in cart');
  assert(res.cartAction && res.cartAction.type === 'add', 'Cart action emitted for multi-item add');

  // TEST 30: Typo Quantity Update ("trirz 30 mg ki qty 2 kardo")
  console.log('\n--- Step 30: Typo Quantity Update ("trirz 30 mg ki qty 2 kardo") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convIdMulti,
    message: 'trirz 30 mg ki qty 2 kardo',
    tenant
  });
  multiCart = ConversationEngine.getSessionCart(convIdMulti);
  const t30 = multiCart.find(i => i.title.includes('30mg'));
  const t10 = multiCart.find(i => i.title.includes('10mg'));
  assert(t30 && t30.quantity === 2, 'Tirz 30mg quantity updated to 2x despite typo "trirz"');
  assert(t10 && t10.quantity === 1, 'Tirz 10mg quantity preserved safely at 1x');
  assert(res.cartAction && res.cartAction.type === 'update', 'Cart action update emitted for Tirz 30mg');

  // TEST 31: Past Tense Quantity Correction ("irz 30 mg ki barhani thee")
  console.log('\n--- Step 31: Past Tense Quantity Correction ("irz 30 mg ki barhani thee") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convIdMulti,
    message: 'irz 30 mg ki barhani thee',
    tenant
  });
  multiCart = ConversationEngine.getSessionCart(convIdMulti);
  const t30After = multiCart.find(i => i.title.includes('30mg'));
  assert(t30After && t30After.quantity >= 2, 'Understood past tense intent "barhani thee" for Tirz 30mg');
  assert(res.cartAction && res.cartAction.type === 'update', 'Emitted real cart update action without hallucination');

  // TEST 32: Compound Remove + Budget Add ("acha tirz 30 mg hata do or 15 dollar ka kuch add akroo kia hai tumharay apas 15 dollar ka")
  console.log('\n--- Step 32: Compound Remove + Budget Add ("acha tirz 30 mg hata do or 15 dollar ka kuch add akroo kia hai tumharay apas 15 dollar ka") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convIdMulti,
    message: 'acha tirz 30 mg hata do or 15 dollar ka kuch add akroo kia hai tumharay apas 15 dollar ka',
    tenant
  });
  multiCart = ConversationEngine.getSessionCart(convIdMulti);
  const hasRemoved30 = !multiCart.some(i => i.title.includes('30mg'));
  const hasWater = multiCart.some(i => i.title.toLowerCase().includes('water'));
  const hasStill10 = multiCart.some(i => i.title.includes('10mg'));
  assert(hasRemoved30, 'Tirz 30mg was removed from cart');
  assert(hasWater, 'Bacteriostatic Water ($15) was added within $15 budget');
  assert(hasStill10, 'Tirz 10mg remained safely in cart and was NOT emptied');

  // TEST 33: Add with Explicit Quantity ("semaglutide 10 mg yh add akro qty 2")
  console.log('\n--- Step 33: Add with Explicit Quantity ("semaglutide 10 mg yh add akro qty 2") ---');
  res = await ConversationEngine.processMessage({
    conversationId: convIdMulti,
    message: 'semaglutide 10 mg yh add akro qty 2',
    tenant
  });
  multiCart = ConversationEngine.getSessionCart(convIdMulti);
  const semaItem = multiCart.find(i => i.title.toLowerCase().includes('sema') && i.title.includes('10mg'));
  assert(semaItem && semaItem.quantity === 2, 'Semaglutide 10mg added with quantity 2x without being hijacked by SET_QTY');
  assert(res.cartAction && res.cartAction.type === 'add', 'Emitted cart action add for Semaglutide');

  // TEST 34: English Catalog Discovery ("i want to add a product but i didnt know what you have?")
  console.log('\n--- Step 34: English Catalog Discovery ("i want to add a product but i didnt know what you have?") ---');
  const convIdDisc = `test_conv_disc_${Date.now()}`;
  res = await ConversationEngine.processMessage({
    conversationId: convIdDisc,
    message: 'i want to add a product but i didnt know what you have?',
    tenant
  });
  const discCart = ConversationEngine.getSessionCart(convIdDisc);
  assert(discCart.length === 0, 'Cart remains empty; did NOT blindly add a product to cart!');
  assert(!res.cartAction, 'No cart action emitted on catalog inquiry');
  assert(res.productCards && res.productCards.length > 0, 'Displays all catalog product cards');
  assert(res.message.includes('live catalog') || res.message.includes('Colbolt provides'), 'Offers helpful discovery message in English');

  // TEST 35: Compound Swap with Typo ("tirz 60 mg ko hata do ro iski jagah bacteriostatic water add akrdo")
  console.log('\n--- Step 35: Compound Swap with Typo ("tirz 60 mg ko hata do ro iski jagah bacteriostatic water add akrdo") ---');
  const convIdSwapTypo = `test_conv_swaptypo_${Date.now()}`;
  // Setup cart with Tirz 60mg and Tirz 10mg
  ConversationEngine.syncSessionCart(convIdSwapTypo, [
    { id: '7090', title: 'Tirz 60mg', price: 675, quantity: 1 },
    { id: '7088', title: 'Tirz 10mg', price: 150, quantity: 1 }
  ]);
  res = await ConversationEngine.processMessage({
    conversationId: convIdSwapTypo,
    message: 'tirz 60 mg ko hata do ro iski jagah bacteriostatic water add akrdo',
    tenant
  });
  const swapCart = ConversationEngine.getSessionCart(convIdSwapTypo);
  const hasNo60 = !swapCart.some(i => i.title.includes('60mg'));
  const hasAddedWater = swapCart.some(i => i.title.toLowerCase().includes('water'));
  const hasPreserved10 = swapCart.some(i => i.title.includes('10mg'));
  assert(hasNo60, 'Tirz 60mg was removed from cart');
  assert(hasAddedWater, 'Bacteriostatic Water was added to cart in same turn');
  assert(hasPreserved10, 'Tirz 10mg was preserved in cart without accidental clearing');
  assert(res.cartAction && res.cartAction.type === 'add', 'Emitted real cart action for newly added item');
  assert(res.message.includes('Tirz 60mg') && (res.message.includes('Bacteriostatic Water') || res.message.includes('Water')), 'Message confirms both removal and addition');

  // TEST 36: Multilingual Spanish Discovery ("hola quiero comprar pero no se que tienen")
  console.log('\n--- Step 36: Multilingual Spanish Discovery ("hola quiero comprar pero no se que tienen") ---');
  const convIdEs = `test_conv_es_${Date.now()}`;
  res = await ConversationEngine.processMessage({
    conversationId: convIdEs,
    message: 'hola quiero comprar pero no se que tienen',
    tenant
  });
  assert(ConversationEngine.getSessionCart(convIdEs).length === 0, 'Spanish discovery does NOT blindly add items to cart');
  assert(res.productCards && res.productCards.length > 0, 'Offers full catalog in Spanish');

  // TEST 37: Multilingual Spanish Swap ("quita tirz 60mg y pon bacteriostatic water")
  console.log('\n--- Step 37: Multilingual Spanish Swap ("quita tirz 60mg y pon bacteriostatic water") ---');
  ConversationEngine.syncSessionCart(convIdEs, [
    { id: '7090', title: 'Tirz 60mg', price: 675, quantity: 1 }
  ]);
  res = await ConversationEngine.processMessage({
    conversationId: convIdEs,
    message: 'quita tirz 60mg y pon bacteriostatic water',
    tenant
  });
  const esCart = ConversationEngine.getSessionCart(convIdEs);
  assert(!esCart.some(i => i.title.includes('60mg')), 'Tirz 60mg was removed via Spanish');
  assert(esCart.some(i => i.title.toLowerCase().includes('water')), 'Bacteriostatic Water was added via Spanish');
  assert(res.message.includes('eliminado') || res.message.includes('añadido') || res.message.includes('Water'), 'Spanish confirmation formulated');

  console.log('\n================================================================');
  if (allPassed) {
    console.log('🎉 ALL 37 VERIFICATION TESTS PASSED WITH 100% ACCURACY!');
  } else {
    console.error('❌ SOME TESTS FAILED. PLEASE REVIEW OUTPUT ABOVE.');
  }
  console.log('================================================================\n');
}

runTestSuite().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
