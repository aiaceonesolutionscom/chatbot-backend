// scripts/live-shopper-simulation.js
// Realistic End-to-End Live Shopper Simulation against https://api.hawksnfox.com

const API_URL = 'https://api.hawksnfox.com/api/chat/message';
const SITE_KEY = 'colbolt_live';

async function sendLiveMessage(conversationId, message) {
  const startTime = Date.now();
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Site-Key': SITE_KEY
    },
    body: JSON.stringify({
      siteKey: SITE_KEY,
      conversationId,
      message
    })
  });

  const latency = Date.now() - startTime;
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return { ...data, latency };
}

function printTurn(turnNum, language, userMsg, botRes) {
  console.log(`\n================================================================`);
  console.log(`[Turn ${turnNum}] [${language}] 👤 USER: "${userMsg}"`);
  console.log(`⏱️ Latency: ${botRes.latency}ms`);
  console.log(`🤖 BOT RESPONSE:`);
  console.log(botRes.message.trim());
  if (botRes.cartAction) {
    console.log(`🛒 LIVE CART ACTION TRIGGERED:`, JSON.stringify(botRes.cartAction));
  } else {
    console.log(`🛒 CART ACTION: None (pure conversational/discovery)`);
  }
  if (botRes.productCards && botRes.productCards.length > 0) {
    console.log(`📦 ATTACHED PRODUCT CARDS: ${botRes.productCards.map(p => `${p.title} ($${p.price?.regular || p.price})`).join(' | ')}`);
  }
}

async function runLiveShopperSimulation() {
  console.log('================================================================');
  console.log('🛍️ STARTING REALISTIC MULTILINGUAL LIVE SHOPPER SIMULATION');
  console.log(`🎯 Target API: ${API_URL} (Tenant: ${SITE_KEY})`);
  console.log('================================================================');

  const convId = `shopper_live_${Date.now()}`;

  // TURN 1: English Greeting
  let res = await sendLiveMessage(convId, 'hello there!');
  printTurn(1, 'English', 'hello there!', res);

  // TURN 2: English Discovery (Must NOT add anything to cart!)
  res = await sendLiveMessage(convId, 'i want to add a product but i didnt know what you have?');
  printTurn(2, 'English', 'i want to add a product but i didnt know what you have?', res);

  // TURN 3: Roman Urdu Budget Query
  res = await sendLiveMessage(convId, 'mera budget 15 dollar hai kia milega idhar');
  printTurn(3, 'Roman Urdu', 'mera budget 15 dollar hai kia milega idhar', res);

  // TURN 4: Roman Urdu Add with Typo & Multi-item (tirz 30 mg or tirz 10 mg yh add akroo)
  res = await sendLiveMessage(convId, 'tirz 30 mg or tirz 10 mg yh add akroo');
  printTurn(4, 'Roman Urdu', 'tirz 30 mg or tirz 10 mg yh add akroo', res);

  // TURN 5: Typo Quantity Update (trirz 30 mg ki qty 2 kardo)
  res = await sendLiveMessage(convId, 'trirz 30 mg ki qty 2 kardo');
  printTurn(5, 'Roman Urdu', 'trirz 30 mg ki qty 2 kardo', res);

  // TURN 6: Roman Urdu Minus / Decrement (1 kam akrdooo)
  res = await sendLiveMessage(convId, '1 kam akrdooo');
  printTurn(6, 'Roman Urdu', '1 kam akrdooo', res);

  // TURN 7: Roman Urdu Complex Compound Swap with Typo (tirz 30 mg ko hata do ro iski jagah bacteriostatic water add akrdo)
  res = await sendLiveMessage(convId, 'tirz 30 mg ko hata do ro iski jagah bacteriostatic water add akrdo');
  printTurn(7, 'Roman Urdu', 'tirz 30 mg ko hata do ro iski jagah bacteriostatic water add akrdo', res);

  // TURN 8: Roman Urdu Add with Specific Quantity (semaglutide 10 mg yh add akro qty 2)
  res = await sendLiveMessage(convId, 'semaglutide 10 mg yh add akro qty 2');
  printTurn(8, 'Roman Urdu', 'semaglutide 10 mg yh add akro qty 2', res);

  // TURN 9: Roman Urdu View Cart Inspection (mere cart mai ktinay product hai)
  res = await sendLiveMessage(convId, 'mere cart mai ktinay product hai');
  printTurn(9, 'Roman Urdu', 'mere cart mai ktinay product hai', res);

  // TURN 10: Spanish Language Shopping (hola cuanto cuesta retatrutide?)
  res = await sendLiveMessage(convId, 'hola cuanto cuesta retatrutide?');
  printTurn(10, 'Spanish', 'hola cuanto cuesta retatrutide?', res);

  // TURN 11: Spanish Add (agrega retatrutide al carrito)
  res = await sendLiveMessage(convId, 'agrega retatrutide al carrito');
  printTurn(11, 'Spanish', 'agrega retatrutide al carrito', res);

  // TURN 12: Spanish Checkout (ir a pagar)
  res = await sendLiveMessage(convId, 'ir a pagar por favor');
  printTurn(12, 'Spanish', 'ir a pagar por favor', res);

  // TURN 13: Roman Urdu Checkout (bill banao payment karni hai)
  res = await sendLiveMessage(convId, 'bill banao payment karni hai');
  printTurn(13, 'Roman Urdu', 'bill banao payment karni hai', res);

  // TURN 14: Clear Cart (cart khali kar do)
  res = await sendLiveMessage(convId, 'cart khali kar do');
  printTurn(14, 'Roman Urdu', 'cart khali kar do', res);

  // TURN 15: Warm Farewell (allah hafiz byee)
  res = await sendLiveMessage(convId, 'allah hafiz byee');
  printTurn(15, 'Roman Urdu', 'allah hafiz byee', res);

  console.log('\n================================================================');
  console.log('🎉 LIVE MULTILINGUAL SHOPPER SIMULATION COMPLETED SUCCESSFULLY!');
  console.log('================================================================\n');
}

runLiveShopperSimulation().catch(err => {
  console.error('Simulation Error:', err);
});
