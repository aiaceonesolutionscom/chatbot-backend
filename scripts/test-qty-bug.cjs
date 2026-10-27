const { ConversationEngine } = require('../packages/backend/dist/modules/ai/conversation.engine');
const { TenantStore } = require('../packages/backend/dist/modules/tenant/tenant.store');

const tenant = TenantStore.getBySiteKey('colbolt_live');

async function test() {
  const convId = 'test_qty_bug_' + Date.now();
  
  // 1. Suppose user previously had Semaglutide 5mg in cart
  console.log('--- Step 1: Add Semaglutide 5mg ---');
  await ConversationEngine.processMessage({
    conversationId: convId,
    message: 'semaglutide 5mg add kardo',
    tenant
  });
  console.log('Cart now:', ConversationEngine.getSessionCart(convId));

  // 2. User says: "okay tirz 10 mg ki qty 7 kardoo"
  console.log('\n--- Step 2: "okay tirz 10 mg ki qty 7 kardoo" ---');
  const res = await ConversationEngine.processMessage({
    conversationId: convId,
    message: 'okay tirz 10 mg ki qty 7 kardoo',
    tenant
  });
  console.log('Assistant Message:\n', res.message);
  console.log('Cart now:', ConversationEngine.getSessionCart(convId));
}

test().catch(console.error);
