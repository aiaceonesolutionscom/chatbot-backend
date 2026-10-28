import { ConversationEngine } from '../packages/backend/dist/modules/ai/conversation.engine.js';
import { TenantStore } from '../packages/backend/dist/modules/tenant/tenant.store.js';

async function testLanguageMirroring() {
  TenantStore.initializeDefaults();
  const tenant = TenantStore.getBySiteKey('colbolt_live');

  console.log('================================================================');
  console.log('🧪 TESTING DYNAMIC LANGUAGE MIRRORING (EN / UR / ES)');
  console.log('================================================================\n');

  // Test 1: English Greeting
  const enConvId = `lang_test_en_${Date.now()}`;
  console.log('--- Case 1: English greeting ("hello") ---');
  let resEn = await ConversationEngine.processMessage({
    conversationId: enConvId,
    message: 'hello',
    tenant
  });
  console.log('Bot Response:', resEn.message);
  console.log('Quick Replies:', resEn.quickReplies?.map(q => q.label));
  const hasUrduWordsInEn = /\b(walaikum|assalam|shukriya|dastyab|hai|hain|karein|apka|aapka|hamare)\b/i.test(resEn.message);
  if (hasUrduWordsInEn) {
    console.error('❌ FAILED: English response contains Urdu words!');
  } else {
    console.log('✅ PASSED: Pure English response!\n');
  }

  // Test 2: English Product Inquiry
  console.log('--- Case 2: English Inquiry ("What products do you offer and what is the shipping time?") ---');
  let resEn2 = await ConversationEngine.processMessage({
    conversationId: enConvId,
    message: 'What products do you offer and what is the shipping time?',
    tenant
  });
  console.log('Bot Response:', resEn2.message);
  const hasUrduWordsInEn2 = /\b(walaikum|assalam|shukriya|dastyab|hai|hain|karein|apka|aapka|hamare)\b/i.test(resEn2.message);
  if (hasUrduWordsInEn2) {
    console.error('❌ FAILED: English inquiry returned Urdu words!');
  } else {
    console.log('✅ PASSED: Pure English inquiry response!\n');
  }

  // Test 3: Roman Urdu Greeting & Inquiry
  const urConvId = `lang_test_ur_${Date.now()}`;
  console.log('--- Case 3: Roman Urdu inquiry ("mujhay products tumharay kon kon sia hai??") ---');
  let resUr = await ConversationEngine.processMessage({
    conversationId: urConvId,
    message: 'mujhay products tumharay kon kon sia hai??',
    tenant
  });
  console.log('Bot Response:', resUr.message.substring(0, 250) + '...');
  console.log('Quick Replies:', resUr.quickReplies?.map(q => q.label));
  const isUrduNatural = /\b(hum|hamare|paas|dastyab|karsakte|karein|hai|hain|baraye|meherbani)\b/i.test(resUr.message);
  if (isUrduNatural) {
    console.log('✅ PASSED: Natural Roman Urdu response!\n');
  } else {
    console.warn('⚠️ Warning: Expected Roman Urdu markers not found.');
  }

  // Test 4: Spanish Greeting & Inquiry
  const esConvId = `lang_test_es_${Date.now()}`;
  console.log('--- Case 4: Spanish inquiry ("Hola, ¿qué productos tienen disponibles?") ---');
  let resEs = await ConversationEngine.processMessage({
    conversationId: esConvId,
    message: 'Hola, ¿qué productos tienen disponibles?',
    tenant
  });
  console.log('Bot Response:', resEs.message.substring(0, 250) + '...');
  console.log('Quick Replies:', resEs.quickReplies?.map(q => q.label));
  const isSpanishNatural = /\b(hola|ofrecemos|productos|disponibles|investigación|laboratorio|precios)\b/i.test(resEs.message);
  if (isSpanishNatural) {
    console.log('✅ PASSED: Natural Spanish response!\n');
  } else {
    console.warn('⚠️ Warning: Expected Spanish markers not found.');
  }

  console.log('================================================================');
  console.log('🎉 LANGUAGE MIRRORING VERIFICATION COMPLETE');
  console.log('================================================================');
}

testLanguageMirroring().catch(console.error);
