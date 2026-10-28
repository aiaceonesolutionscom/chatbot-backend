import { ConversationEngine } from '../packages/backend/dist/modules/ai/conversation.engine.js';
import { TenantStore } from '../packages/backend/dist/modules/tenant/tenant.store.js';

async function testUserFlow() {
  TenantStore.initializeDefaults();
  const tenant = TenantStore.getBySiteKey('colbolt_live');
  const conversationId = `user_flow_${Date.now()}`;

  console.log('================================================================');
  console.log('🧪 TESTING USER EXACT 8-TURN CONVERSATION FLOW');
  console.log('================================================================\n');

  // Turn 1
  console.log('--- Turn 1: "hello" ---');
  let res = await ConversationEngine.processMessage({ conversationId, message: 'hello', tenant });
  console.log('Bot:', res.message.substring(0, 150) + '...\n');

  // Turn 2
  console.log('--- Turn 2: "mujhay products tumharay kon kon sia hai??" ---');
  res = await ConversationEngine.processMessage({ conversationId, message: 'mujhay products tumharay kon kon sia hai??', tenant });
  console.log('Bot:', res.message.substring(0, 200) + '...');
  console.log('Cards:', res.productCards?.length, 'products\n');

  // Turn 3: Negation test!
  console.log('--- Turn 3: "products add nhin akrnay product hai kon kons ai tumharay apas" ---');
  res = await ConversationEngine.processMessage({ conversationId, message: 'products add nhin akrnay product hai kon kons ai tumharay apas', tenant });
  console.log('Bot:', res.message.substring(0, 250) + '...');
  console.log('Cart Action:', res.cartAction || 'None');
  if (res.cartAction) {
    console.error('❌ FAILED: Unexpected cart action on negation!');
  } else {
    console.log('✅ PASSED: No cart action on "add nhin akrnay"!\n');
  }

  // Turn 4
  console.log('--- Turn 4: "tumharay paas tirz hai??" ---');
  res = await ConversationEngine.processMessage({ conversationId, message: 'tumharay paas tirz hai??', tenant });
  console.log('Bot:', res.message.substring(0, 200) + '...\n');

  // Turn 5: Compound Add
  console.log('--- Turn 5: "1 tirz 30 mg and 4 tirz 10 mg" ---');
  res = await ConversationEngine.processMessage({ conversationId, message: '1 tirz 30 mg and 4 tirz 10 mg', tenant });
  console.log('Bot:', res.message.substring(0, 200) + '...');
  let cart = ConversationEngine.getSessionCart(conversationId);
  console.log('Session Cart:', JSON.stringify(cart));
  console.log('Cart Actions:', JSON.stringify(res.cartActions || res.cartAction));
  console.log('--------------------------------------------------\n');

  // Turn 6: Relative Increment
  console.log('--- Turn 6: "tirz 30 mg ki quantiy 1 barha do" ---');
  res = await ConversationEngine.processMessage({ conversationId, message: 'tirz 30 mg ki quantiy 1 barha do', tenant });
  console.log('Bot:', res.message.substring(0, 200) + '...');
  cart = ConversationEngine.getSessionCart(conversationId);
  console.log('Session Cart after Increment:', JSON.stringify(cart));
  const t30 = cart.find(it => it.title.toLowerCase().includes('30mg') || it.title.toLowerCase().includes('30 mg'));
  if (t30 && t30.quantity === 2) {
    console.log('✅ PASSED: Tirz 30mg incremented from 1x to 2x!\n');
  } else {
    console.error('❌ FAILED: Tirz 30mg quantity is', t30?.quantity, '(expected 2)\n');
  }

  // Turn 7: Contextual Increment
  console.log('--- Turn 7: "1 or plus akrdo" ---');
  res = await ConversationEngine.processMessage({ conversationId, message: '1 or plus akrdo', tenant });
  console.log('Bot:', res.message.substring(0, 200) + '...');
  cart = ConversationEngine.getSessionCart(conversationId);
  console.log('Session Cart after Turn 7:', JSON.stringify(cart));
  console.log('--------------------------------------------------\n');

  // Turn 8: Compound Multi-Item Quantity Set
  console.log('--- Turn 8: "tirz 10 mg ki qty 5 kardoo or tirz 30 mg ki qty 10 akrdoo" ---');
  res = await ConversationEngine.processMessage({ conversationId, message: 'tirz 10 mg ki qty 5 kardoo or tirz 30 mg ki qty 10 akrdoo', tenant });
  console.log('Bot:', res.message.substring(0, 200) + '...');
  cart = ConversationEngine.getSessionCart(conversationId);
  console.log('Session Cart after Compound Update:', JSON.stringify(cart));
  console.log('Cart Actions:', JSON.stringify(res.cartActions || res.cartAction));
  const t10Final = cart.find(it => it.title.toLowerCase().includes('10mg') || it.title.toLowerCase().includes('10 mg'));
  const t30Final = cart.find(it => it.title.toLowerCase().includes('30mg') || it.title.toLowerCase().includes('30 mg'));
  if (t10Final && t10Final.quantity === 5 && t30Final && t30Final.quantity === 10) {
    console.log('✅ PASSED: Both Tirz 10mg (5x) and Tirz 30mg (10x) successfully updated!\n');
  } else {
    console.error('❌ FAILED: Final quantities: Tirz 10mg =', t10Final?.quantity, '(expected 5), Tirz 30mg =', t30Final?.quantity, '(expected 10)\n');
  }
}

testUserFlow().catch(console.error);
