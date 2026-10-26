var B=Object.defineProperty;var T=(x,m,g)=>m in x?B(x,m,{enumerable:!0,configurable:!0,writable:!0,value:g}):x[m]=g;var u=(x,m,g)=>T(x,typeof m!="symbol"?m+"":m,g);(function(x){"use strict";function m(k="#16408a",t="bottom-right"){const e=t==="bottom-right";return`
    :host {
      --primary: ${k};
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
      ${e?"right: 24px;":"left: 24px;"};
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
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      color: var(--text-main);
      border-radius: 40px;
      padding: 7px 18px 7px 10px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.14), 0 2px 6px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(226, 232, 240, 0.9);
      cursor: pointer;
      transition: all 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
      user-select: none;
      animation: launcherPulse 4s infinite ease-in-out;
    }

    .launcher-pill:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 16px 36px rgba(22, 64, 138, 0.22);
      border-color: var(--accent);
    }

    .launcher-text-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1px;
    }

    .launcher-headline {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .launcher-title {
      font-weight: 800;
      font-size: 14.5px;
      letter-spacing: -0.2px;
      color: var(--primary);
    }

    .launcher-pill-status {
      font-size: 10px;
      font-weight: 700;
      color: #16a34a;
      background: #f0fdf4;
      padding: 1px 6px;
      border-radius: 10px;
      border: 1px solid #bbf7d0;
    }

    .launcher-sub {
      font-size: 11.5px;
      font-weight: 500;
      color: var(--text-sub);
      white-space: nowrap;
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
      ${e?"right: 24px;":"left: 24px;"};
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
      transform-origin: ${e?"bottom right":"bottom left"};
      z-index: 999999;
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
      flex-shrink: 0;
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
      flex-shrink: 0;
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
      flex: 1 1 0%;
      min-height: 0;
      max-height: 100%;
      padding: 16px 18px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: #ffffff;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
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
      height: 190px;
      background: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      border-bottom: 1px solid #f1f5f9;
    }

    .product-img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      object-position: center;
      transition: transform 0.28s ease;
    }

    .product-card:hover .product-img {
      transform: scale(1.04);
    }

    /* Sticky In-Chat Cart Bar */
    .inchat-cart-strip {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
      background: #0f172a;
      color: #ffffff;
      font-size: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      animation: msgSlideUp 0.25s ease-out;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 10;
    }

    .inchat-cart-strip.hidden {
      display: none;
    }

    .cart-strip-left {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .cart-strip-icon {
      font-size: 15px;
    }

    .cart-strip-count {
      font-weight: 600;
    }

    .cart-strip-total {
      color: #38bdf8;
      font-weight: 700;
    }

    .cart-strip-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .cart-strip-manage-btn {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .cart-strip-manage-btn:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    .cart-strip-checkout-btn {
      background: #16a34a;
      color: #ffffff;
      text-decoration: none;
      padding: 4px 11px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .cart-strip-checkout-btn:hover {
      background: #15803d;
    }

    /* Slide-over Cart Drawer */
    .cart-drawer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 50;
      display: flex;
      flex-direction: column;
      border-radius: 22px;
      box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.15);
      animation: msgSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }

    .cart-drawer.hidden {
      display: none;
    }

    .cart-drawer-header {
      padding: 14px 18px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drawer-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .drawer-title {
      font-weight: 800;
      font-size: 15px;
      color: var(--text-main);
    }

    .drawer-badge {
      background: var(--primary);
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 12px;
    }

    .cart-drawer-close-btn {
      background: #e2e8f0;
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: var(--text-sub);
      transition: all 0.15s ease;
    }

    .cart-drawer-close-btn:hover {
      background: #cbd5e1;
      color: var(--text-main);
    }

    .cart-drawer-items {
      flex: 1;
      overflow-y: auto;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .cart-drawer-empty {
      text-align: center;
      padding: 40px 20px;
      color: var(--text-muted);
    }

    .cart-drawer-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    }

    .drawer-item-img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: contain;
      background: #f8fafc;
      padding: 4px;
      border: 1px solid #f1f5f9;
      flex-shrink: 0;
    }

    .drawer-item-info {
      flex: 1;
      min-width: 0;
    }

    .drawer-item-title {
      font-weight: 700;
      font-size: 13.5px;
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .drawer-item-price {
      font-size: 12.5px;
      color: var(--primary);
      font-weight: 700;
      margin-top: 2px;
    }

    .drawer-item-qty {
      font-size: 11.5px;
      color: var(--text-sub);
    }

    .drawer-item-remove-btn {
      background: #fef2f2;
      border: 1px solid #fee2e2;
      color: #dc2626;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .drawer-item-remove-btn:hover {
      background: #fee2e2;
      border-color: #fca5a5;
      transform: scale(1.05);
    }

    .cart-drawer-footer {
      padding: 14px 18px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .drawer-subtotal-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-main);
    }

    .drawer-total-price {
      font-size: 17px;
      font-weight: 800;
      color: var(--primary);
    }

    .drawer-cta-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .drawer-clear-btn {
      flex: 1;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: var(--text-sub);
      padding: 10px 14px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .drawer-clear-btn:hover {
      background: #f1f5f9;
      color: #dc2626;
      border-color: #fca5a5;
    }

    .drawer-checkout-btn {
      flex: 2;
      background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
      color: #ffffff;
      border: none;
      padding: 10px 16px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13.5px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(22, 163, 74, 0.28);
      transition: all 0.18s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .drawer-checkout-btn:hover {
      box-shadow: 0 6px 16px rgba(22, 163, 74, 0.38);
      transform: translateY(-1px);
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
      flex-shrink: 0;
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
  `}class g{static isWpStorefront(){return typeof window<"u"&&(window.location.hostname.includes("colbolt.hawksnfox.com")||!!window.wc_store_api_nonce||!!window.wc_add_to_cart_params||!!window.woocommerce_params)}static getHeaders(){var e,i;const t={"Content-Type":"application/json",Accept:"application/json"};if(typeof window<"u"){const r=window.wc_store_api_nonce||((e=window.UniversalChatbotConfig)==null?void 0:e.nonce)||((i=document.querySelector('meta[name="wc-store-api-nonce"]'))==null?void 0:i.content);r&&(t.Nonce=r)}return t}static async fetchLiveCart(){if(!this.isWpStorefront())return null;try{const t=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart`,{method:"GET",headers:this.getHeaders(),credentials:"include"});if(t.ok)return((await t.json()).items||[]).map(i=>{var r,s,o;return{key:i.key,id:String(i.id),title:i.name,quantity:i.quantity,price:(r=i.prices)!=null&&r.price?Number(i.prices.price)/Math.pow(10,i.prices.currency_minor_unit||2):0,image:((o=(s=i.images)==null?void 0:s[0])==null?void 0:o.src)||""}})}catch(t){console.warn("[WooCommerceBridge] fetchLiveCart error:",t)}return null}static async executeCartAddition(t,e=1,i){if(this.isWpStorefront()){try{const r=i||`${window.location.origin}/wp-json/wc/store/v1/cart/add-item`,s=await fetch(r,{method:"POST",headers:this.getHeaders(),credentials:"include",body:JSON.stringify({id:Number(t),quantity:e})});if(s.ok){const o=await s.json();return this.triggerWooCommerceEvents(o,"added_to_cart"),{success:!0,message:"Added to cart!",cartCount:o==null?void 0:o.items_count,cartData:o}}}catch(r){console.warn("[WooCommerceBridge] Direct Store API call failed, trying wc-ajax fallback:",r)}try{const r=new FormData;r.append("product_id",String(t)),r.append("quantity",String(e));const s=await fetch(`${window.location.origin}/?wc-ajax=add_to_cart`,{method:"POST",credentials:"include",body:r});if(s.ok){const o=await s.json().catch(()=>({}));return this.triggerWooCommerceEvents(o,"added_to_cart"),{success:!0,message:"Added to cart!",cartData:o}}}catch(r){console.error("[WooCommerceBridge] wc-ajax fallback error:",r)}}return this.triggerWooCommerceEvents({items_count:1},"added_to_cart"),{success:!0,message:"Item added to your shopping cart!"}}static async executeCartRemoval(t){if(this.isWpStorefront()){try{const e=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart`,{method:"GET",headers:this.getHeaders(),credentials:"include"});if(e.ok){const r=((await e.json()).items||[]).find(a=>a.key===String(t)||String(a.id)===String(t)||a.name.toLowerCase().includes(String(t).toLowerCase())),s=r?r.key:String(t),o=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart/remove-item`,{method:"POST",headers:this.getHeaders(),credentials:"include",body:JSON.stringify({key:s})});if(o.ok){const a=await o.json();return this.triggerWooCommerceEvents(a,"removed_from_cart"),{success:!0,message:"Item removed from cart!",cartCount:a==null?void 0:a.items_count,cartData:a}}}}catch(e){console.warn("[WooCommerceBridge] Store API removal failed, trying fallback:",e)}try{const e=new FormData;e.append("cart_item_key",String(t)),await fetch(`${window.location.origin}/?wc-ajax=remove_from_cart`,{method:"POST",credentials:"include",body:e})}catch{}}return this.triggerWooCommerceEvents({items_count:0},"removed_from_cart"),{success:!0,message:"Item removed from cart."}}static async executeCartUpdate(t,e){if(e<=0)return this.executeCartRemoval(t);if(this.isWpStorefront())try{const i=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart`,{method:"GET",headers:this.getHeaders(),credentials:"include"});if(i.ok){const s=((await i.json()).items||[]).find(n=>n.key===String(t)||String(n.id)===String(t)||n.name.toLowerCase().includes(String(t).toLowerCase())),o=s?s.key:String(t),a=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart/update-item`,{method:"POST",headers:this.getHeaders(),credentials:"include",body:JSON.stringify({key:o,quantity:Number(e)})});if(a.ok){const n=await a.json();return this.triggerWooCommerceEvents(n,"added_to_cart"),{success:!0,message:"Cart updated successfully!",cartCount:n==null?void 0:n.items_count,cartData:n}}}}catch(i){console.warn("[WooCommerceBridge] Store API update-item error:",i)}return this.triggerWooCommerceEvents({items_count:e},"added_to_cart"),{success:!0,message:"Cart quantity updated."}}static async clearStoreCart(){if(this.isWpStorefront())try{const t=await this.fetchLiveCart();if(t&&t.length>0)for(const e of t)await this.executeCartRemoval(e.key)}catch(t){console.warn("[WooCommerceBridge] clearStoreCart error:",t)}}static triggerWooCommerceEvents(t,e="added_to_cart"){if(typeof window>"u")return;const i=window;if(i.jQuery)try{i.jQuery(document.body).trigger("wc_fragment_refresh"),i.jQuery(document.body).trigger(e,[t==null?void 0:t.fragments,t==null?void 0:t.cart_hash]),i.jQuery(document.body).trigger("update_checkout")}catch{}try{window.dispatchEvent(new CustomEvent("woocommerce:cart_updated",{detail:t})),document.body.dispatchEvent(new CustomEvent(e,{detail:t})),document.body.dispatchEvent(new CustomEvent("wc_fragment_refresh"))}catch{}}}class C{constructor(){u(this,"siteKey","colbolt_live");u(this,"apiUrl","http://localhost:3000");u(this,"customLogoUrl");u(this,"shadowRoot");u(this,"isOpen",!1);u(this,"isActionMenuOpen",!1);u(this,"conversationId",`conv_${Date.now()}`);u(this,"config",null);u(this,"isWaitingForResponse",!1);u(this,"cartItems",[]);this.extractAttributes()}extractAttributes(){const t=document.querySelectorAll("script");for(let i=t.length-1;i>=0;i--){const r=t[i];if(r.src&&(r.src.includes("widget.js")||r.getAttribute("data-site-key"))){const s=r.getAttribute("data-site-key");s&&(this.siteKey=s);const o=r.getAttribute("data-api-url");if(o)this.apiUrl=o.replace(/\/+$/,"");else try{const a=new URL(r.src);a.hostname.includes("colbolt.hawksnfox.com")||(this.apiUrl=a.origin)}catch{}break}}const e=window.UniversalChatbotConfig;e&&(e.siteKey&&(this.siteKey=e.siteKey),e.apiUrl&&(this.apiUrl=e.apiUrl.replace(/\/+$/,"")),e.logoUrl&&(this.customLogoUrl=e.logoUrl))}async init(){const t=document.createElement("div");t.id="universal-chatbot-root",document.body.appendChild(t),this.shadowRoot=t.attachShadow({mode:"open"}),await this.fetchConfig(),this.render(),this.bindEvents(),g.fetchLiveCart().then(e=>{e&&e.length>0&&(this.cartItems=e,this.updateCartUI())}).catch(()=>{})}async fetchConfig(){try{const t=await fetch(`${this.apiUrl}/api/tenant/config?siteKey=${encodeURIComponent(this.siteKey)}`);t.ok&&(this.config=await t.json())}catch(t){console.warn("[UniversalChatbot] Using fallback default config:",t)}this.config?this.customLogoUrl&&(this.config.brand.logoUrl=this.customLogoUrl):this.config={siteKey:this.siteKey,brand:{companyName:"Colbolt",assistantName:"COLBOLT.",logoUrl:this.customLogoUrl||`${this.apiUrl}/static/assistance.gif`,primaryColor:"#16408a",launcherPosition:"bottom-right",welcomeMessage:"Hello! Welcome to Colbolt. I can help you find products (like Bacteriostatic Water, Tirz, Retatrutide), check prices within your budget, or add items directly to your cart. How can I help you today?",suggestedQuestions:["What does Colbolt do?","Show me Tirz products","What is Bacteriostatic Water?","What are your shipping policies?"]},company:{businessName:"Colbolt",aboutUs:"Colbolt provides premium quality research solutions and peptides."},commerceType:"woocommerce",activeTools:["search_products","add_to_cart","tile_calculator"]}}getAvatarHtml(t=36){var i,r;const e=this.customLogoUrl||((r=(i=this.config)==null?void 0:i.brand)==null?void 0:r.logoUrl)||`${this.apiUrl}/static/assistance.gif`;return e?`<img src="${e}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;" onerror="this.onerror=null;this.src='${this.apiUrl}/static/assistance.gif';">`:`
      <svg viewBox="0 0 24 24" style="width:${t*.6}px;height:${t*.6}px;fill:currentColor">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h2a7 7 0 0 1 7 7v1a3 3 0 0 1-3 3h-1.17l-2.41 2.41A2 2 0 0 1 14 21H10a2 2 0 0 1-1.41-.59L6.17 18H5a3 3 0 0 1-3-3v-1a7 7 0 0 1 7-7h2V5.72c-.6-.34-1-.98-1-1.72a2 2 0 0 1 2-2z"/>
      </svg>
    `}getTimeString(){return new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}render(){var n;const t=(n=this.config)==null?void 0:n.brand,e=(t==null?void 0:t.primaryColor)||"#1e73be",i=(t==null?void 0:t.launcherPosition)||"bottom-right",r=(t==null?void 0:t.companyName)||"Colbolt",s=(t==null?void 0:t.assistantName)||"COLBOLT.",o=document.createElement("style");o.textContent=m(e,i),this.shadowRoot.appendChild(o);const a=document.createElement("div");a.className="chatbot-container",a.innerHTML=`
      <!-- High-End Liquid Glass Floating Pill Launcher -->
      <div class="launcher-pill" id="launcherBtn" role="button" tabindex="0" aria-label="Open Chat">
        <div class="launcher-avatar-wrap">
          <div class="launcher-avatar">
            ${this.getAvatarHtml(42)}
          </div>
          <span class="online-badge"></span>
        </div>
        <div class="launcher-text-wrap">
          <div class="launcher-headline">
            <span class="launcher-title">${this.escapeHtml(s)}</span>
            <span class="launcher-pill-status">● Live</span>
          </div>
          <div class="launcher-sub">Order & Research Specialist</div>
        </div>
      </div>

      <!-- Chat Window -->
      <div class="chat-window hidden" id="chatWindow">
        <!-- Branded Gradient Banner Header (YANA Style) -->
        <div class="chat-header-banner">
          <div class="banner-brand-info">
            <div class="banner-mascot">
              ${this.getAvatarHtml(52)}
            </div>
            <div class="banner-text-group">
              <span class="banner-greeting">Hi, I am</span>
              <span class="banner-assistant-name">${this.escapeHtml(s)}</span>
              <span class="banner-tagline">Research Concierge & Support</span>
            </div>
          </div>
          <div class="banner-controls">
            ${t!=null&&t.whatsAppNumber?`
              <a href="https://wa.me/${t.whatsAppNumber}" target="_blank" class="banner-btn whatsapp" title="Chat on WhatsApp" rel="noopener noreferrer">
                <svg style="width:17px;height:17px;fill:currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/></svg>
              </a>
            `:""}
            <button class="banner-btn" id="closeBtn" aria-label="Close Chat">
              <svg style="width:15px;height:15px;fill:currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </div>
        </div>

        <!-- Store Sub-Intro Banner -->
        <div class="store-sub-intro">
          <div class="store-title">Welcome to ${this.escapeHtml(r)}</div>
          <div class="store-subtitle">Ask anything about compounds, research, live orders, or cart</div>
        </div>

        <!-- Sticky In-Chat Cart Bar (Real-Time Synchronized) -->
        <div class="inchat-cart-strip hidden" id="inchatCartStrip">
          <div class="cart-strip-left" id="cartStripToggle">
            <span class="cart-strip-icon">🛒</span>
            <span class="cart-strip-count" id="cartStripCountText"><strong>0</strong> items</span>
            <span class="cart-strip-total" id="cartStripTotalText">• $0.00</span>
          </div>
          <div class="cart-strip-actions">
            <button class="cart-strip-manage-btn" id="cartStripManageBtn" type="button">Manage</button>
            <a href="https://colbolt.hawksnfox.com/checkout/" target="_blank" class="cart-strip-checkout-btn">Checkout →</a>
          </div>
        </div>

        <!-- Slide-over Cart Drawer / Quick Manager Modal -->
        <div class="cart-drawer hidden" id="cartDrawer">
          <div class="cart-drawer-header">
            <div class="drawer-title-wrap">
              <span class="drawer-icon">🛒</span>
              <span class="drawer-title">Shopping Cart</span>
              <span class="drawer-badge" id="drawerCartBadge">0</span>
            </div>
            <button class="cart-drawer-close-btn" id="closeCartDrawerBtn" type="button" aria-label="Close Cart">✕</button>
          </div>
          <div class="cart-drawer-items" id="cartDrawerItems">
            <!-- Dynamically populated items -->
          </div>
          <div class="cart-drawer-footer">
            <div class="drawer-subtotal-row">
              <span>Estimated Subtotal:</span>
              <span class="drawer-total-price" id="drawerTotalPrice">$0.00</span>
            </div>
            <div class="drawer-cta-row">
              <button class="drawer-clear-btn" id="drawerClearCartBtn" type="button">Empty Cart</button>
              <a href="https://colbolt.hawksnfox.com/checkout/" target="_blank" class="drawer-checkout-btn">Proceed to Checkout 💳</a>
            </div>
          </div>
        </div>

        <!-- Body / Message Thread -->
        <div class="chat-body" id="chatBody">
          <!-- Initial Assistant Message -->
          <div class="message-row assistant">
            <div class="message-avatar">
              ${this.getAvatarHtml(34)}
            </div>
            <div class="message-content-group">
              <div class="message-bubble assistant">
                <p>${(t==null?void 0:t.welcomeMessage)||"Hello! How can I assist you today?"}</p>
              </div>
              <span class="message-timestamp">${this.getTimeString()}</span>
              <!-- Initial Suggested Quick Replies -->
              <div class="quick-replies" id="initialSuggestions">
                ${((t==null?void 0:t.suggestedQuestions)||[]).map(c=>`
                  <button class="quick-reply-btn" data-text="${this.escapeHtml(c)}">${this.escapeHtml(c)}</button>
                `).join("")}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Popover Menu (Toggled by + button) -->
        <div class="action-menu hidden" id="actionMenu">
          <button class="action-menu-item" data-action="manage_cart">
            <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
            My Cart & Checkout
          </button>
          <button class="action-menu-item" data-action="all_products">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Browse All Products
          </button>
          <button class="action-menu-item" data-action="track_order">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
            Track My Order
          </button>
          <button class="action-menu-item" data-action="shipping">
            <svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
            Shipping Policy & Timing
          </button>
          <button class="action-menu-item" data-action="clear_chat">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            Clear Conversation
          </button>
        </div>

        <!-- Modern Bottom Input Bar (YANA Style with + button) -->
        <div class="chat-footer">
          <div class="input-pill-container">
            <button class="action-plus-btn" id="actionPlusBtn" title="More options" type="button">
              <svg style="width:15px;height:15px;fill:currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
            <input type="text" class="chat-input" id="chatInput" placeholder="Ask about products, orders, what we do..." autocomplete="off">
            <button class="send-icon-btn" id="sendBtn" aria-label="Send">
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      </div>
    `,this.shadowRoot.appendChild(a)}bindEvents(){const t=this.shadowRoot.getElementById("launcherBtn"),e=this.shadowRoot.getElementById("closeBtn"),i=this.shadowRoot.getElementById("sendBtn"),r=this.shadowRoot.getElementById("actionPlusBtn"),s=this.shadowRoot.getElementById("actionMenu"),o=this.shadowRoot.getElementById("chatInput"),a=this.shadowRoot.getElementById("chatBody");t==null||t.addEventListener("click",()=>this.toggle()),e==null||e.addEventListener("click",()=>this.toggle(!1)),r==null||r.addEventListener("click",h=>{h.stopPropagation(),this.isActionMenuOpen=!this.isActionMenuOpen,this.isActionMenuOpen?s==null||s.classList.remove("hidden"):s==null||s.classList.add("hidden")}),a==null||a.addEventListener("click",()=>{this.isActionMenuOpen&&(this.isActionMenuOpen=!1,s==null||s.classList.add("hidden"))}),s==null||s.addEventListener("click",h=>{const d=h.target.closest(".action-menu-item");if(!d)return;const l=d.getAttribute("data-action");this.isActionMenuOpen=!1,s.classList.add("hidden"),l==="manage_cart"?this.openCartDrawer():l==="track_order"?this.sendMessage("Track my order"):l==="all_products"?this.sendMessage("Show me all products"):l==="tile_calculator"?this.renderTileCalculatorWidget():l==="shipping"?this.sendMessage("What is your shipping policy?"):l==="clear_chat"&&this.clearChat()});const n=this.shadowRoot.getElementById("cartStripToggle"),c=this.shadowRoot.getElementById("cartStripManageBtn"),f=this.shadowRoot.getElementById("closeCartDrawerBtn"),v=this.shadowRoot.getElementById("drawerClearCartBtn"),b=this.shadowRoot.getElementById("cartDrawerItems");n==null||n.addEventListener("click",()=>this.openCartDrawer()),c==null||c.addEventListener("click",()=>this.openCartDrawer()),f==null||f.addEventListener("click",()=>this.closeCartDrawer()),v==null||v.addEventListener("click",()=>this.handleClearAllCart()),b==null||b.addEventListener("click",h=>{const d=h.target,l=d.classList.contains("drawer-item-remove-btn")?d:d.closest(".drawer-item-remove-btn");if(l){const p=l.getAttribute("data-product-id"),w=l.getAttribute("data-product-title");p&&this.handleRemoveFromCart(p,w||"Item")}}),i==null||i.addEventListener("click",()=>this.handleUserSend()),o==null||o.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),this.handleUserSend()):h.key==="Escape"&&this.isOpen&&this.toggle(!1)}),a==null||a.addEventListener("click",h=>{var l;const d=h.target;if(d.classList.contains("quick-reply-btn")){const p=d.getAttribute("data-text");p&&this.sendMessage(p)}else if(d.classList.contains("add-to-cart-btn")||d.closest(".add-to-cart-btn")){const p=d.classList.contains("add-to-cart-btn")?d:d.closest(".add-to-cart-btn"),w=p.getAttribute("data-product-id"),y=p.closest(".product-card"),S=y==null?void 0:y.querySelector(".qty-display"),I=S?parseInt(S.textContent||"1",10):1;w&&this.handleAddToCart(p,w,I)}else if(d.classList.contains("qty-btn")){const p=d.getAttribute("data-action")==="plus",w=(l=d.parentElement)==null?void 0:l.querySelector(".qty-display");if(w){let y=parseInt(w.textContent||"1",10);y=p?y+1:Math.max(1,y-1),w.textContent=String(y)}}else d.classList.contains("tile-calc-submit-btn")&&this.handleTileCalculation(d)})}toggle(t){this.isOpen=t!==void 0?t:!this.isOpen;const e=this.shadowRoot.getElementById("chatWindow"),i=this.shadowRoot.getElementById("launcherBtn"),r=this.shadowRoot.getElementById("chatInput");this.isOpen?(e==null||e.classList.remove("hidden"),i&&(i.style.opacity="0.9"),setTimeout(()=>r==null?void 0:r.focus(),150)):(e==null||e.classList.add("hidden"),i&&(i.style.opacity="1"))}handleUserSend(){const t=this.shadowRoot.getElementById("chatInput"),e=t.value.trim();!e||this.isWaitingForResponse||(t.value="",this.sendMessage(e))}async sendMessage(t){const e=this.shadowRoot.getElementById("chatBody");if(!e)return;const i=document.createElement("div");i.className="message-row user",i.innerHTML=`
      <div class="message-content-group">
        <div class="message-bubble user">${this.escapeHtml(t)}</div>
        <span class="message-timestamp">${this.getTimeString()}</span>
      </div>
    `,e.appendChild(i);const r=document.createElement("div");r.className="typing-indicator",r.id="activeTypingIndicator",r.innerHTML=`
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `,e.appendChild(r),e.scrollTop=e.scrollHeight,this.isWaitingForResponse=!0;try{const s=await fetch(`${this.apiUrl}/api/chat/message`,{method:"POST",headers:{"Content-Type":"application/json","X-Site-Key":this.siteKey},body:JSON.stringify({siteKey:this.siteKey,conversationId:this.conversationId,message:t,cartItems:this.cartItems})});if(r.remove(),this.isWaitingForResponse=!1,!s.ok)throw new Error(`Server returned ${s.status}`);const o=await s.json();this.renderBotResponse(o)}catch{r.remove(),this.isWaitingForResponse=!1,this.renderBotResponse({message:"I am currently having trouble reaching the store catalog. Please try again in a moment."})}}renderBotResponse(t){const e=this.shadowRoot.getElementById("chatBody");if(!e)return;if(t.cartAction){const a=t.cartAction;if(a.type==="remove")g.executeCartRemoval(a.productId||a.title).catch(()=>{}),this.cartItems=this.cartItems.filter(n=>n.id!==String(a.productId)&&(!a.title||!n.title.toLowerCase().includes(String(a.title).toLowerCase()))),this.updateCartUI();else if(a.type==="add"&&a.item){g.executeCartAddition(a.item.id,a.item.quantity||1).catch(()=>{});const n=this.cartItems.find(c=>c.id===String(a.item.id));n?n.quantity+=a.item.quantity||1:this.cartItems.push({id:String(a.item.id),title:a.item.title,price:Number(a.item.price||0),quantity:a.item.quantity||1}),this.updateCartUI()}else if(a.type==="update"&&a.item){g.executeCartUpdate(a.item.id,a.item.quantity).catch(()=>{});const n=this.cartItems.find(c=>c.id===String(a.item.id));n&&(n.quantity=a.item.quantity),this.updateCartUI()}else a.type==="clear"&&(g.clearStoreCart().catch(()=>{}),this.cartItems=[],this.updateCartUI())}const i=document.createElement("div");i.className="message-row assistant";const r=this.formatMarkdown(t.message||"");let s="";Array.isArray(t.productCards)&&t.productCards.length>0&&(s=`
        <div class="product-cards-container">
          ${t.productCards.map(a=>{var n;return`
            <div class="product-card">
              ${a.featuredImage?`
                <div class="product-img-wrap">
                  <img class="product-img" src="${a.featuredImage}" alt="${this.escapeHtml(a.title)}" loading="lazy">
                  <span class="product-stock-tag">${a.inStock?"In Stock":"Out of Stock"}</span>
                </div>
              `:""}
              <div class="product-details">
                <span class="product-title">${this.escapeHtml(a.title)}</span>
                <div class="product-price-row">
                  <span class="product-price">${((n=a.price)==null?void 0:n.formatted)||"$0.00"}</span>
                </div>
                <div class="product-actions">
                  <div class="qty-picker">
                    <button class="qty-btn" data-action="minus" aria-label="Decrease quantity">-</button>
                    <span class="qty-display">1</span>
                    <button class="qty-btn" data-action="plus" aria-label="Increase quantity">+</button>
                  </div>
                  <button class="add-to-cart-btn" data-product-id="${a.id}">
                    <svg style="width:14px;height:14px;fill:currentColor" viewBox="0 0 24 24"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/></svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          `}).join("")}
        </div>
      `);let o="";Array.isArray(t.quickReplies)&&t.quickReplies.length>0&&(o=`
        <div class="quick-replies">
          ${t.quickReplies.map(a=>`
            <button class="quick-reply-btn" data-text="${this.escapeHtml(a.actionText||a.label)}">${this.escapeHtml(a.label)}</button>
          `).join("")}
        </div>
      `),i.innerHTML=`
      <div class="message-avatar">
        ${this.getAvatarHtml(34)}
      </div>
      <div class="message-content-group">
        <div class="message-bubble assistant">
          ${r}
          ${s}
        </div>
        <span class="message-timestamp">${this.getTimeString()}</span>
        ${o}
      </div>
    `,e.appendChild(i),e.scrollTop=e.scrollHeight}renderTileCalculatorWidget(){const t=this.shadowRoot.getElementById("chatBody");if(!t)return;const e=document.createElement("div");e.className="message-row assistant",e.innerHTML=`
      <div class="message-avatar">
        ${this.getAvatarHtml(34)}
      </div>
      <div class="message-content-group" style="width:100%;">
        <div class="message-bubble assistant">
          <p><strong>📐 Interactive Tile & Area Calculator</strong></p>
          <p>Enter your room dimensions to calculate the exact square footage, recommended 10% wastage allowance, and number of boxes required:</p>
          <div class="tile-calc-card">
            <div class="tile-calc-inputs">
              <div class="tile-calc-field">
                <label>Room Length (ft)</label>
                <input type="number" class="tile-input-len" placeholder="e.g. 15" value="15" min="1">
              </div>
              <div class="tile-calc-field">
                <label>Room Width (ft)</label>
                <input type="number" class="tile-input-wid" placeholder="e.g. 12" value="12" min="1">
              </div>
              <div class="tile-calc-field">
                <label>Box Coverage (sq ft)</label>
                <input type="number" class="tile-input-box" placeholder="e.g. 16" value="16" min="1">
              </div>
              <div class="tile-calc-field">
                <label>Wastage Allowance</label>
                <input type="number" class="tile-input-waste" placeholder="%" value="10" min="0" max="30">
              </div>
            </div>
            <button class="tile-calc-btn tile-calc-submit-btn" type="button">Calculate Boxes Needed</button>
            <div class="tile-calc-result"></div>
          </div>
        </div>
        <span class="message-timestamp">${this.getTimeString()}</span>
      </div>
    `,t.appendChild(e),t.scrollTop=t.scrollHeight}handleTileCalculation(t){var b,h,d,l;const e=t.closest(".tile-calc-card");if(!e)return;const i=parseFloat(((b=e.querySelector(".tile-input-len"))==null?void 0:b.value)||"0"),r=parseFloat(((h=e.querySelector(".tile-input-wid"))==null?void 0:h.value)||"0"),s=parseFloat(((d=e.querySelector(".tile-input-box"))==null?void 0:d.value)||"16"),o=parseFloat(((l=e.querySelector(".tile-input-waste"))==null?void 0:l.value)||"10"),a=e.querySelector(".tile-calc-result");if(!a)return;if(i<=0||r<=0){a.style.display="block",a.style.background="#fef2f2",a.style.color="#991b1b",a.style.borderColor="#fecaca",a.textContent="Please enter valid room dimensions greater than 0.";return}const n=i*r,c=n*o/100,f=n+c,v=Math.ceil(f/(s||16));a.style.display="block",a.style.background="#f0fdf4",a.style.color="#166534",a.style.borderColor="#bbf7d0",a.innerHTML=`
      <strong>Calculation Result:</strong><br>
      • Room Floor Area: <strong>${n.toFixed(1)} sq ft</strong><br>
      • Recommended Wastage (${o}%): <strong>+${c.toFixed(1)} sq ft</strong><br>
      • Total Area to Cover: <strong>${f.toFixed(1)} sq ft</strong><br>
      • Boxes Needed (${s} sq ft/box): <strong>${v} boxes</strong>
    `}clearChat(){const t=this.shadowRoot.getElementById("chatBody");t&&(this.cartItems=[],this.conversationId=`conv_${Date.now()}`,fetch(`${this.apiUrl}/api/cart/clear`,{method:"POST",headers:{"Content-Type":"application/json","X-Site-Key":this.siteKey},body:JSON.stringify({siteKey:this.siteKey,conversationId:this.conversationId})}).catch(()=>{}),t.innerHTML=`
      <div class="message-row assistant">
        <div class="message-avatar">
          ${this.getAvatarHtml(34)}
        </div>
        <div class="message-content-group">
          <div class="message-bubble assistant">
            <p>Conversation refreshed! How can I assist you with our catalog today?</p>
          </div>
          <span class="message-timestamp">${this.getTimeString()}</span>
          <div class="quick-replies">
            <button class="quick-reply-btn" data-text="Show all products">Show all products</button>
            <button class="quick-reply-btn" data-text="What is Bacteriostatic Water?">What is Bacteriostatic Water?</button>
            <button class="quick-reply-btn" data-text="What are your shipping policies?">Shipping Info</button>
          </div>
        </div>
      </div>
    `)}async handleAddToCart(t,e,i){var v,b;if(t.getAttribute("data-loading")==="true")return;t.setAttribute("data-loading","true");const r=t.innerHTML;t.innerHTML="Adding...",t.style.opacity="0.7";const s=t.closest(".product-card"),o=s==null?void 0:s.querySelector(".product-title"),a=((v=o==null?void 0:o.textContent)==null?void 0:v.trim())||"Selected Product",n=s==null?void 0:s.querySelector(".product-price"),c=((b=n==null?void 0:n.textContent)==null?void 0:b.replace(/[^0-9.]/g,""))||"0",f=parseFloat(c)||0;try{const h=await g.executeCartAddition(e,i);t.innerHTML="✓ Added to Cart",t.classList.add("added"),t.style.opacity="1";const d=this.cartItems.find(p=>p.id===e);d?d.quantity+=i:this.cartItems.push({id:e,title:a,price:f,quantity:i}),this.updateCartUI(),fetch(`${this.apiUrl}/api/cart/add`,{method:"POST",headers:{"Content-Type":"application/json","X-Site-Key":this.siteKey},body:JSON.stringify({siteKey:this.siteKey,conversationId:this.conversationId,productId:e,quantity:i})}).catch(()=>{});const l=this.shadowRoot.getElementById("chatBody");if(l){const p=document.createElement("div");p.className="message-row assistant",p.innerHTML=`
          <div class="message-avatar">
            ${this.getAvatarHtml(34)}
          </div>
          <div class="message-content-group">
            <div class="message-bubble assistant" style="border-left: 3px solid #16a34a;">
              <p><strong>Item Added!</strong> ${i}x added to your cart.</p>
              <p style="margin-top:6px; display:flex; gap:12px;">
                <a href="/cart" style="color:var(--primary); font-weight:700; text-decoration:underline;">View Cart</a>
                <a href="/checkout" style="color:#16a34a; font-weight:700; text-decoration:underline;">Checkout Now</a>
              </p>
            </div>
            <span class="message-timestamp">${this.getTimeString()}</span>
          </div>
        `,l.appendChild(p),l.scrollTop=l.scrollHeight}setTimeout(()=>{t.innerHTML=r,t.classList.remove("added"),t.removeAttribute("data-loading")},3500)}catch{t.innerHTML="Error",t.removeAttribute("data-loading"),setTimeout(()=>{t.innerHTML=r,t.style.opacity="1"},2e3)}}updateCartUI(){const t=this.shadowRoot.getElementById("inchatCartStrip"),e=this.shadowRoot.getElementById("cartStripCountText"),i=this.shadowRoot.getElementById("cartStripTotalText"),r=this.shadowRoot.getElementById("drawerCartBadge"),s=this.shadowRoot.getElementById("drawerTotalPrice"),o=this.shadowRoot.getElementById("cartDrawerItems"),a=this.cartItems.reduce((c,f)=>c+(f.quantity||1),0),n=this.cartItems.reduce((c,f)=>c+(f.price||0)*(f.quantity||1),0);t&&(a>0?(t.classList.remove("hidden"),e&&(e.innerHTML=`<strong>${a}</strong> ${a===1?"item":"items"}`),i&&(i.textContent=`• $${n.toFixed(2)}`)):t.classList.add("hidden")),r&&(r.textContent=String(a)),s&&(s.textContent=`$${n.toFixed(2)}`),o&&(this.cartItems.length===0?o.innerHTML=`
          <div class="cart-drawer-empty">
            <div style="font-size:32px; margin-bottom:8px;">🛒</div>
            <p style="font-weight:700; color:var(--text-main); font-size:14px;">Your cart is empty</p>
            <p style="font-size:12px; margin-top:4px;">Add research compounds or Bacteriostatic Water to get started.</p>
          </div>
        `:o.innerHTML=this.cartItems.map(c=>`
          <div class="cart-drawer-item">
            <div class="drawer-item-info">
              <div class="drawer-item-title" title="${this.escapeHtml(c.title)}">${this.escapeHtml(c.title)}</div>
              <div class="drawer-item-price">$${((c.price||0)*(c.quantity||1)).toFixed(2)}</div>
              <div class="drawer-item-qty">Quantity: <strong>${c.quantity||1}</strong></div>
            </div>
            <button class="drawer-item-remove-btn" data-product-id="${this.escapeHtml(String(c.id))}" data-product-title="${this.escapeHtml(c.title)}" title="Remove from Cart" aria-label="Remove item">
              <svg style="width:16px;height:16px;fill:currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>
        `).join(""))}openCartDrawer(){const t=this.shadowRoot.getElementById("cartDrawer");t&&(this.updateCartUI(),t.classList.remove("hidden"))}closeCartDrawer(){const t=this.shadowRoot.getElementById("cartDrawer");t&&t.classList.add("hidden")}async handleRemoveFromCart(t,e){const i=this.cartItems.findIndex(s=>String(s.id)===String(t)||s.title.toLowerCase().includes(e.toLowerCase()));i!==-1&&this.cartItems.splice(i,1),this.updateCartUI(),g.executeCartRemoval(t).catch(()=>{}),fetch(`${this.apiUrl}/api/cart/remove`,{method:"POST",headers:{"Content-Type":"application/json","X-Site-Key":this.siteKey},body:JSON.stringify({siteKey:this.siteKey,conversationId:this.conversationId,productId:t})}).catch(()=>{});const r=this.shadowRoot.getElementById("chatBody");if(r){const s=document.createElement("div");s.className="message-row assistant",s.innerHTML=`
        <div class="message-avatar">${this.getAvatarHtml(34)}</div>
        <div class="message-content-group">
          <div class="message-bubble assistant" style="border-left: 3px solid #dc2626;">
            <p>🗑️ <strong>${this.escapeHtml(e)}</strong> has been removed from your shopping cart.</p>
          </div>
          <span class="message-timestamp">${this.getTimeString()}</span>
        </div>
      `,r.appendChild(s),r.scrollTop=r.scrollHeight}}async handleClearAllCart(){this.cartItems=[],this.updateCartUI(),g.clearStoreCart().catch(()=>{}),fetch(`${this.apiUrl}/api/cart/clear`,{method:"POST",headers:{"Content-Type":"application/json","X-Site-Key":this.siteKey},body:JSON.stringify({siteKey:this.siteKey,conversationId:this.conversationId})}).catch(()=>{}),setTimeout(()=>this.closeCartDrawer(),300);const t=this.shadowRoot.getElementById("chatBody");if(t){const e=document.createElement("div");e.className="message-row assistant",e.innerHTML=`
        <div class="message-avatar">${this.getAvatarHtml(34)}</div>
        <div class="message-content-group">
          <div class="message-bubble assistant" style="border-left: 3px solid #dc2626;">
            <p>🗑️ Your shopping cart has been cleared.</p>
          </div>
          <span class="message-timestamp">${this.getTimeString()}</span>
        </div>
      `,t.appendChild(e),t.scrollTop=t.scrollHeight}}escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}formatMarkdown(t){let e=this.escapeHtml(t);return e=e.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/^[•\-\*]\s+(.*)$/gm,"<li>$1</li>"),e=e.replace(/(<li>.*<\/li>)/s,"<ul>$1</ul>"),e=e.split(`

`).map(i=>`<p>${i.replace(/\n/g,"<br>")}</p>`).join(""),e}}if(typeof window<"u"){const k=new C;window.UniversalChatbot=k,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>k.init()):k.init()}x.UniversalCommerceWidget=C,Object.defineProperty(x,Symbol.toStringTag,{value:"Module"})})(this.UniversalChatbot=this.UniversalChatbot||{});
