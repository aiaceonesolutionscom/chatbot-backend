async function inspect() {
  try {
    const res = await fetch('https://colbolt.hawksnfox.com/');
    const html = await res.text();
    console.log('Status:', res.status);
    
    // Check WooCommerce scripts
    const scriptMatches = [...html.matchAll(/<script[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
    console.log('\nWooCommerce scripts found:');
    scriptMatches.filter(s => s.toLowerCase().includes('woo') || s.toLowerCase().includes('cart') || s.toLowerCase().includes('bot')).forEach(s => console.log(' -', s));

    // Check cart elements
    console.log('\nCart HTML snippets:');
    const snippets = [...html.matchAll(/<[^>]+(?:class|id)=["'][^"']*(?:cart|count|badge)[^"']*["'][^>]*>/gi)].map(m => m[0]);
    snippets.slice(0, 15).forEach(s => console.log(' *', s));

    // Check wc_store_api or wc_add_to_cart_params in inline scripts
    console.log('\nInline WC configurations:');
    const inlines = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
    inlines.forEach(code => {
      if (code.includes('wc_add_to_cart') || code.includes('woocommerce_params') || code.includes('UniversalChatbotConfig')) {
        console.log('--- Config snippet ---');
        console.log(code.slice(0, 300));
      }
    });

  } catch (err) {
    console.error('Inspect error:', err);
  }
}

inspect();
