const backendMsg = `✅ The quantity for Semaglutide 5mg has been successfully updated to 7x!

💵 Updated Total: $2625.00

🔗 [View Full Cart](https://colbolt.hawksnfox.com/cart/)
💳 [Proceed to Checkout](https://colbolt.hawksnfox.com/checkout/)`;

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function formatMarkdown(str) {
  if (!str) return '';
  let out = escapeHtml(str);

  // 1. Process Markdown Bold: **text**
  out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 2. Process Highlighted Subtotal Banner: 💵 **Estimated Subtotal**: $... or 💵 Estimated Subtotal: $...
  out = out.replace(/💵\s*(?:<strong>)?(?:Estimated\s*Subtotal|Updated\s*Total)(?:<\/strong>)?:\s*(?:<strong>)?(\$[\d,.]+(?:\.\d{2})?)(?:<\/strong>)?/gi, (_match, price) => {
    return `<div class="subtotal-highlight-badge"><span class="subtotal-icon">💵</span><span class="subtotal-text">Estimated Subtotal: <strong>${price}</strong></span></div>`;
  });

  // 3. Process Markdown Links: [label](url) -> Standout Action Buttons
  out = out.replace(/(?:(?:🔗|💳|📦)\s*)?\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/gu, (_match, rawLabel, rawUrl) => {
    const url = rawUrl.trim();
    const label = rawLabel.trim();
    const lowerUrl = url.toLowerCase();
    const lowerLabel = label.toLowerCase();

    if (lowerUrl.includes('checkout') || lowerLabel.includes('checkout')) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-action-btn chat-checkout-btn"><span class="btn-icon">💳</span><span class="btn-text">${label}</span><span class="btn-arrow">➔</span></a>`;
    }

    if (lowerUrl.includes('cart') || lowerLabel.includes('cart') || lowerLabel.includes('basket')) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-action-btn chat-cart-btn"><span class="btn-icon">🛒</span><span class="btn-text">${label}</span><span class="btn-arrow">➔</span></a>`;
    }

    if (lowerUrl.includes('order') || lowerUrl.includes('track') || lowerLabel.includes('order') || lowerLabel.includes('track')) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-action-btn chat-track-btn"><span class="btn-icon">📦</span><span class="btn-text">${label}</span><span class="btn-arrow">➔</span></a>`;
    }

    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-inline-link">${label} <span class="ext-icon">↗</span></a>`;
  });

  // 4. Clean Bullet Lists
  out = out.replace(/^[•\-\*]\s+(.*)$/gm, '<li>$1</li>');
  out = out.replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>');

  // 5. Paragraphs and Linebreaks
  const paragraphs = out.split(/\n\s*\n/);
  out = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<div') || trimmed.startsWith('<ul') || trimmed.startsWith('<a')) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).filter(Boolean).join('');

  return out;
}

console.log(formatMarkdown(backendMsg));
