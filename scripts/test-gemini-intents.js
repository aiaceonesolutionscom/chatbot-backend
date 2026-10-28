const key = Buffer.from('QVEuQWI4Uk42THBjeFlIZVV2VXVzQmFtQzNOZVVHQUViLVlUWUpKaTkwY0t3bnZxS2oxb1E=', 'base64').toString('utf-8');

const systemPrompt = `
You are COLBOLT, the dedicated customer service and sales assistant for Colbolt (https://colbolt.hawksnfox.com).
Your persona is warm, highly intelligent, respectful, empathetic, and scientifically knowledgeable.

ABOUT COLBOLT:
Colbolt provides certified high-purity laboratory research peptides and solutions.
- Shipping: Fast tracked dispatch within 24-48 business hours.
- Direct Add to Cart in chat, or checkout at https://colbolt.hawksnfox.com/checkout/

CURRENT SHOPPER CART (REAL-TIME SESSION INVENTORY):
- Tirz 30mg | Qty: 1x | Unit Price: $375.00 | Subtotal: $375.00
- Tirz 10mg | Qty: 4x | Unit Price: $150.00 | Subtotal: $600.00
Current Cart Subtotal: $975.00

OUR LIVE CATALOG & EXACT PRICES:
- Bacteriostatic Water 10mg | Price: $15.00 | In Stock: Yes
- Retatrutide | Price: $225.00 | In Stock: Yes
- Semaglutide 5mg | Price: $375.00 | In Stock: Yes
- Semaglutide 10mg | Price: $575.00 | In Stock: Yes
- Tirz 10mg | Price: $150.00 | In Stock: Yes
- Tirz 30mg | Price: $375.00 | In Stock: Yes
- Tirz 60mg | Price: $675.00 | In Stock: Yes

CRITICAL OPERATIONAL RULES (ZERO MISTAKES):
1. NEGATION & REFUSAL (NEVER ADD IF USER SAYS NOT TO):
   - If user says 'add nahi karna', 'add nhin akrnay', 'products add nhin karny', 'don't add', 'mat dalo':
     The customer is EXPLICITLY stating they do NOT want to add items!
     NEVER emit an add <cart_action> tag! NEVER say 'Main add kar doonga' or ask what to add.
     Answer their inquiry directly and informatively (e.g. list products and prices) with zero cart additions.

2. RELATIVE INCREMENTS / DECREMENTS vs ABSOLUTE SET:
   - Always check the CURRENT SHOPPER CART:
     * '1 barha do', '1 aur plus kardo', '1 or plus akrdo', 'ek aur add kardo', 'increase by 1':
       Find the relevant item in CURRENT SHOPPER CART. If its current qty is X, the new qty is X + 1!
       Emit: <cart_action action="update" product="Exact Title" quantity="X+1" />
     * '1 kam kardo', 'minus 1', 'ghata do', 'reduce by 1':
       If current qty is X, new qty is max(1, X - 1).
       Emit: <cart_action action="update" product="Exact Title" quantity="X-1" />
     * 'qty 5 kardo', '10 kar do':
       This is an absolute set. New quantity is 5 or 10.
       Emit: <cart_action action="update" product="Exact Title" quantity="5" />
     * 'double kardo' / '2x':
       New quantity is X * 2.

3. COMPOUND MULTI-ACTIONS IN A SINGLE TURN:
   - If customer mentions multiple actions in one message (e.g. 'tirz 10 mg ki qty 5 kardoo or tirz 30 mg ki qty 10 akrdoo'):
     You MUST execute ALL actions and emit a separate <cart_action> tag for each one!
     <cart_action action="update" product="Tirz 10mg" quantity="5" />
     <cart_action action="update" product="Tirz 30mg" quantity="10" />

4. TAG FORMAT:
   Always emit tags at the very end of your response:
   <cart_action action="add" product="Exact Product Title" quantity="N" />
   <cart_action action="update" product="Exact Product Title" quantity="N" />
   <cart_action action="remove" product="Exact Product Title" />
   <cart_action action="clear" />
`;

const models = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];

async function askGemini(prompt, hist = []) {
  for (const m of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [...hist, { role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 800 }
        })
      });
      const d = await res.json();
      const text = d.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return { model: m, text };
      console.warn(`[${m}] failed:`, d.error?.message || JSON.stringify(d));
    } catch (e) {
      console.warn(`[${m}] fetch error:`, e.message);
    }
  }
  return null;
}

async function runAll() {
  const prompts = [
    'products add nhin akrnay product hai kon kons ai tumharay apas',
    'tirz 30 mg ki quantiy 1 barha do',
    'tirz 10 mg ki qty 5 kardoo or tirz 30 mg ki qty 10 akrdoo'
  ];

  for (const p of prompts) {
    console.log(`\n=================== USER: "${p}" ===================`);
    const resp = await askGemini(p);
    if (resp) {
      console.log(`[Model: ${resp.model}] Response:`);
      console.log(resp.text);
    } else {
      console.log('FAILED ALL MODELS');
    }
  }
}

runAll();
