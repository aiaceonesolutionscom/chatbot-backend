/**
 * High-End YANA-Inspired Shadow DOM Styles
 * Clean, modern e-commerce conversational UI with branded banner header,
 * floating mascot launcher pill, avatar bubbles, and interactive product cards.
 */

export function getWidgetStyles(primaryColor: string = '#16408a', position: 'bottom-right' | 'bottom-left' = 'bottom-right'): string {
  const isRight = position === 'bottom-right';

  return `
    :host {
      --primary: ${primaryColor};
      --primary-hover: #12336e;
      --primary-light: #eff6ff;
      --accent: #248acc;
      --bg: #ffffff;
      --card-bg: #f8fafc;
      --text-main: #0f172a;
      --text-sub: #475569;
      --text-muted: #94a3b8;
      --border-color: #e2e8f0;
      --shadow-lg: 0 24px 45px -8px rgba(22, 64, 138, 0.22), 0 12px 20px -4px rgba(0, 0, 0, 0.08);
      --font-family: 'Jost', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-family: var(--font-family);
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-main);
      box-sizing: border-box;
      z-index: 2147483647;
      position: fixed;
      ${isRight ? 'right: 24px;' : 'left: 24px;'};
      bottom: 24px;
    }

    *, *::before, *::after {
      box-sizing: inherit;
      margin: 0;
      padding: 0;
    }

    @keyframes launcherPulse {
      0%, 100% {
        box-shadow: 0 8px 24px rgba(22, 64, 138, 0.16), 0 0 0 0 rgba(36, 138, 204, 0.4);
      }
      50% {
        box-shadow: 0 12px 30px rgba(22, 64, 138, 0.26), 0 0 0 7px rgba(36, 138, 204, 0);
      }
    }

    @keyframes pulseBeacon {
      0% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
      100% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
    }

    @keyframes windowPopIn {
      0% {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes msgSlideUp {
      0% {
        opacity: 0;
        transform: translateY(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Floating Pill Launcher with Mascot */
    .launcher-pill {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #ffffff;
      color: var(--text-main);
      border-radius: 40px;
      padding: 8px 18px 8px 22px;
      box-shadow: 0 8px 24px rgba(22, 64, 138, 0.16);
      border: 1.5px solid rgba(22, 64, 138, 0.12);
      cursor: pointer;
      transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease;
      user-select: none;
      animation: launcherPulse 4s infinite ease-in-out;
    }

    .launcher-pill:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 14px 32px rgba(22, 64, 138, 0.24);
      border-color: var(--accent);
    }

    .launcher-text {
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.2px;
      white-space: nowrap;
      color: var(--primary);
    }

    .launcher-avatar-wrap {
      position: relative;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .launcher-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(22, 64, 138, 0.25);
      overflow: hidden;
      border: 2px solid #ffffff;
    }

    .launcher-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .online-badge {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 13px;
      height: 13px;
      background: #22c55e;
      border: 2.5px solid #ffffff;
      border-radius: 50%;
      animation: pulseBeacon 2s infinite ease-in-out;
    }

    /* Chat Window Container */
    .chat-window {
      position: fixed;
      ${isRight ? 'right: 24px;' : 'left: 24px;'};
      bottom: 96px;
      width: 410px;
      max-width: calc(100vw - 32px);
      height: 640px;
      max-height: calc(100vh - 120px);
      background: var(--bg);
      border-radius: 22px;
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid rgba(22, 64, 138, 0.15);
      transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.22s;
      transform-origin: ${isRight ? 'bottom right' : 'bottom left'};
    }

    .chat-window:not(.hidden) {
      animation: windowPopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .chat-window.hidden {
      opacity: 0;
      visibility: hidden;
      transform: scale(0.92) translateY(14px);
      pointer-events: none;
    }

    /* Branded Banner Header (Colbolt Uomo Theme Style Gradient) */
    .chat-header-banner {
      background: linear-gradient(135deg, #0d2958 0%, #16408a 60%, #1f64c6 100%);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
    }

    .banner-brand-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .banner-mascot {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
    }

    .banner-mascot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .banner-text-group {
      display: flex;
      flex-direction: column;
    }

    .banner-greeting {
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.1;
    }

    .banner-assistant-name {
      font-size: 24px;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.1;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .banner-tagline {
      font-size: 11.5px;
      font-weight: 500;
      color: #93c5fd;
      margin-top: 3px;
    }

    .banner-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .banner-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.35);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s ease, transform 0.15s ease;
      text-decoration: none;
    }

    .banner-btn:hover {
      background: rgba(255, 255, 255, 0.35);
      transform: scale(1.08);
      color: #ffffff;
    }

    .banner-btn.whatsapp {
      color: #ffffff;
      background: #22c55e;
      border-color: #22c55e;
      box-shadow: 0 2px 8px rgba(34, 197, 94, 0.35);
    }

    /* Store Introduction Subheader */
    .store-sub-intro {
      padding: 14px 20px 8px;
      background: #ffffff;
    }

    .store-title {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.3px;
    }

    .store-subtitle {
      font-size: 13px;
      color: var(--text-sub);
      margin-top: 2px;
    }

    /* Message Thread Area */
    .chat-body {
      flex: 1;
      padding: 16px 18px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: #ffffff;
      scroll-behavior: smooth;
    }

    .message-row {
      display: flex;
      gap: 10px;
      align-items: flex-end;
      animation: msgSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .message-row.user {
      justify-content: flex-end;
    }

    .message-row.assistant {
      justify-content: flex-start;
    }

    .message-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      margin-bottom: 16px;
    }

    .message-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .message-content-group {
      display: flex;
      flex-direction: column;
      max-width: 82%;
    }

    .message-bubble {
      padding: 12px 16px;
      font-size: 13.5px;
      line-height: 1.5;
      word-break: break-word;
    }

    .message-bubble.user {
      background: var(--primary);
      color: #ffffff;
      border-radius: 20px 20px 4px 20px;
      box-shadow: 0 2px 8px rgba(30, 115, 190, 0.25);
    }

    .message-bubble.assistant {
      background: #f8fafc;
      color: var(--text-main);
      border: 1px solid var(--border-color);
      border-radius: 20px 20px 20px 4px;
    }

    .message-bubble p {
      margin-bottom: 6px;
    }
    .message-bubble p:last-child {
      margin-bottom: 0;
    }
    .message-bubble strong {
      font-weight: 700;
      color: inherit;
    }
    .message-bubble ul {
      margin-left: 18px;
      margin-top: 4px;
      margin-bottom: 4px;
    }

    .message-timestamp {
      font-size: 10.5px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .message-row.user .message-timestamp {
      align-self: flex-end;
    }

    .message-row.assistant .message-timestamp {
      align-self: flex-start;
      margin-left: 6px;
    }

    /* Typing Indicator */
    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 10px 14px;
      background: #f8fafc;
      border: 1px solid var(--border-color);
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      width: fit-content;
      margin-left: 44px;
    }

    .typing-dot {
      width: 6px;
      height: 6px;
      background: var(--text-muted);
      border-radius: 50%;
      animation: typingBounce 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }

    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    /* Quick Reply Chips */
    .quick-replies {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
      margin-left: 44px;
    }

    .quick-reply-btn {
      background: #ffffff;
      border: 1px solid var(--primary);
      color: var(--primary);
      border-radius: 20px;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .quick-reply-btn:hover {
      background: var(--primary);
      color: #ffffff;
    }

    /* Product Cards Container */
    .product-cards-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 10px;
      width: 100%;
    }

    .product-card {
      background: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      display: flex;
      flex-direction: column;
    }

    .product-card:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.09);
    }

    .product-img-wrap {
      width: 100%;
      height: 145px;
      background: #f1f5f9;
      position: relative;
      overflow: hidden;
    }

    .product-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-stock-tag {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #22c55e;
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    .product-details {
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .product-title {
      font-weight: 700;
      font-size: 14.5px;
      color: var(--text-main);
      line-height: 1.3;
    }

    .product-price-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .product-price {
      font-size: 16px;
      font-weight: 800;
      color: var(--primary);
    }

    .product-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }

    .qty-picker {
      display: flex;
      align-items: center;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: #f8fafc;
    }

    .qty-btn {
      width: 26px;
      height: 30px;
      border: none;
      background: transparent;
      cursor: pointer;
      font-weight: bold;
      color: var(--text-main);
    }

    .qty-display {
      font-size: 12.5px;
      font-weight: 700;
      padding: 0 4px;
      min-width: 18px;
      text-align: center;
    }

    .add-to-cart-btn {
      flex: 1;
      background: var(--primary);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.15s ease, transform 0.1s ease;
    }

    .add-to-cart-btn:hover {
      background: var(--primary-hover);
    }

    .add-to-cart-btn.added {
      background: #16a34a;
    }

    /* Modern Bottom Input Bar (YANA Style with + button) */
    .chat-footer {
      padding: 12px 16px;
      background: #ffffff;
      border-top: 1px solid var(--border-color);
    }

    .input-pill-container {
      display: flex;
      align-items: center;
      background: #ffffff;
      border: 1.5px solid var(--border-color);
      border-radius: 30px;
      padding: 4px 6px 4px 12px;
      gap: 8px;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .input-pill-container:focus-within {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(30, 115, 190, 0.12);
    }

    .action-plus-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: #f1f5f9;
      color: #475569;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s ease;
    }

    .action-plus-btn:hover {
      background: #e2e8f0;
      color: var(--text-main);
    }

    .chat-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 13.5px;
      font-family: inherit;
      color: var(--text-main);
      background: transparent;
      padding: 6px 0;
    }

    .chat-input::placeholder {
      color: var(--text-muted);
    }

    .send-icon-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--primary);
      border: none;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.15s ease, background 0.15s ease;
    }

    .send-icon-btn:hover {
      background: var(--primary-hover);
      transform: scale(1.06);
    }

    .send-icon-btn svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }

    /* Quick Actions Menu (opened via + button) */
    .action-menu {
      position: absolute;
      bottom: 74px;
      left: 16px;
      right: 16px;
      background: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: 16px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 20;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }

    .action-menu.hidden {
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      pointer-events: none;
    }

    .action-menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 10px;
      border: none;
      background: transparent;
      color: var(--text-main);
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      text-align: left;
      transition: background 0.12s ease;
    }

    .action-menu-item:hover {
      background: #f1f5f9;
      color: var(--primary);
    }

    .action-menu-item svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
      flex-shrink: 0;
    }

    /* Interactive Tile Calculator Card */
    .tile-calc-card {
      background: #ffffff;
      border: 1.5px solid #cbd5e1;
      border-radius: 14px;
      padding: 14px;
      margin-top: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .tile-calc-title {
      font-size: 14px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .tile-calc-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
    }

    .tile-calc-field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .tile-calc-field label {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-sub);
    }

    .tile-calc-field input {
      padding: 7px 10px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 13px;
      outline: none;
      background: #f8fafc;
    }

    .tile-calc-field input:focus {
      border-color: var(--primary);
      background: #ffffff;
    }

    .tile-calc-btn {
      width: 100%;
      padding: 9px;
      background: var(--primary);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .tile-calc-btn:hover {
      background: var(--primary-hover);
    }

    .tile-calc-result {
      margin-top: 10px;
      padding: 10px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      font-size: 12.5px;
      color: #166534;
      display: none;
    }

    /* Mobile Responsive */
    @media (max-width: 480px) {
      .chat-window {
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        bottom: 0;
        right: 0;
        left: 0;
        border-radius: 0;
      }
    }
  `;
}
