var I=Object.defineProperty;var A=(x,m,f)=>m in x?I(x,m,{enumerable:!0,configurable:!0,writable:!0,value:f}):x[m]=f;var u=(x,m,f)=>A(x,typeof m!="symbol"?m+"":m,f);(function(x){"use strict";function m(k="#0d2958",t="bottom-right"){const e=t==="bottom-right";return`
    :host {
      --primary: ${k};
      --primary-dark: #07152b;
      --primary-light: #16408a;
      --accent-cyan: #0284c7;
      --accent-cyan-light: #38bdf8;
      --accent-cyan-subtle: #f0f9ff;
      --emerald: #10b981;
      --emerald-dark: #059669;
      --emerald-subtle: #ecfdf5;
      --bg: #ffffff;
      --surface-canvas: #f8fafc;
      --surface-card: #ffffff;
      --text-main: #0f172a;
      --text-sub: #475569;
      --text-muted: #94a3b8;
      --border-color: #e2e8f0;
      --border-focus: #38bdf8;
      --shadow-floating: 0 20px 45px -8px rgba(13, 41, 88, 0.28), 0 8px 16px -4px rgba(0, 0, 0, 0.08);
      --shadow-card: 0 4px 18px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04);
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

    /* Core Fluid Keyframes */
    @keyframes launcherBreath {
      0%, 100% {
        box-shadow: 0 10px 30px rgba(13, 41, 88, 0.18), 0 0 0 0 rgba(2, 132, 199, 0.45);
        transform: translateY(0);
      }
      50% {
        box-shadow: 0 14px 38px rgba(13, 41, 88, 0.28), 0 0 0 7px rgba(2, 132, 199, 0);
        transform: translateY(-2px);
      }
    }

    @keyframes pulseBeacon {
      0% { transform: scale(0.94); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1.04); box-shadow: 0 0 0 7px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.94); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    @keyframes windowPopIn {
      0% {
        opacity: 0;
        transform: scale(0.92) translateY(24px);
      }
      70% {
        transform: scale(1.01) translateY(-2px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes bubbleSlideIn {
      0% {
        opacity: 0;
        transform: translateY(14px) scale(0.98);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes chipEntrance {
      from {
        opacity: 0;
        transform: translateY(8px) scale(0.94);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes avatarHalo {
      0%, 100% {
        filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.45));
      }
      50% {
        filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.85));
      }
    }

    /* Floating Pill Launcher (Mascot + Text) */
    .launcher-pill {
      display: flex;
      align-items: center;
      gap: 13px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: var(--text-main);
      border-radius: 44px;
      padding: 8px 20px 8px 10px;
      box-shadow: 0 12px 34px rgba(15, 23, 42, 0.16), 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1.5px solid rgba(226, 232, 240, 0.95);
      cursor: pointer;
      transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
      user-select: none;
      animation: launcherBreath 4s infinite ease-in-out;
    }

    .launcher-pill:hover {
      transform: translateY(-4px) scale(1.03);
      box-shadow: 0 18px 42px rgba(13, 41, 88, 0.25);
      border-color: var(--accent-cyan);
    }

    .launcher-pill:active {
      transform: scale(0.97);
    }

    .launcher-text-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
    }

    .launcher-headline {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .launcher-title {
      font-weight: 800;
      font-size: 15px;
      letter-spacing: -0.3px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .launcher-pill-status {
      font-size: 10px;
      font-weight: 700;
      color: var(--emerald-dark);
      background: var(--emerald-subtle);
      padding: 1.5px 7px;
      border-radius: 12px;
      border: 1px solid #bbf7d0;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    .launcher-sub {
      font-size: 11.5px;
      font-weight: 500;
      color: var(--text-sub);
      white-space: nowrap;
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
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-light) 60%, var(--accent-cyan) 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(13, 41, 88, 0.25);
      overflow: hidden;
      border: 2px solid #ffffff;
      transition: transform 0.25s ease;
    }

    .launcher-pill:hover .launcher-avatar {
      transform: rotate(6deg) scale(1.05);
    }

    .launcher-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .online-badge {
      position: absolute;
      bottom: -1px;
      right: -1px;
      width: 13px;
      height: 13px;
      background: var(--emerald);
      border: 2.5px solid #ffffff;
      border-radius: 50%;
      animation: pulseBeacon 2.2s infinite ease-in-out;
    }

    /* Chat Window Container */
    .chat-window {
      position: fixed;
      ${e?"right: 24px;":"left: 24px;"};
      bottom: 96px;
      width: 420px;
      max-width: calc(100vw - 32px);
      height: 660px;
      max-height: calc(100vh - 120px);
      background: var(--bg);
      border-radius: 24px;
      box-shadow: var(--shadow-floating);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid rgba(13, 41, 88, 0.16);
      transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1), visibility 0.24s;
      transform-origin: ${e?"bottom right":"bottom left"};
      z-index: 999999;
    }

    .chat-window:not(.hidden) {
      animation: windowPopIn 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .chat-window.hidden {
      opacity: 0;
      visibility: hidden;
      transform: scale(0.90) translateY(20px);
      pointer-events: none;
    }

    /* Branded Banner Header (Colbolt Bio-Research Gradient) */
    .chat-header-banner {
      flex-shrink: 0;
      background: linear-gradient(135deg, #07152b 0%, #0d2958 45%, #16408a 80%, #0284c7 100%);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      position: relative;
      box-shadow: 0 4px 16px rgba(7, 21, 43, 0.35);
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
      border: 2px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      animation: avatarHalo 4s infinite ease-in-out;
    }

    .banner-mascot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .banner-text-group {
      display: flex;
      flex-direction: column;
    }

    .banner-greeting {
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.1;
      letter-spacing: 0.2px;
    }

    .banner-assistant-name {
      font-size: 23px;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.15;
      letter-spacing: -0.4px;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }

    .banner-tagline {
      font-size: 11px;
      font-weight: 600;
      color: #93c5fd;
      margin-top: 2px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .banner-tagline-dot {
      width: 6px;
      height: 6px;
      background: #4ade80;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 6px #4ade80;
    }

    .banner-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .banner-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.35);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      text-decoration: none;
    }

    .banner-btn:hover {
      background: rgba(255, 255, 255, 0.35);
      transform: scale(1.1);
      color: #ffffff;
    }

    .banner-btn.whatsapp {
      color: #ffffff;
      background: #22c55e;
      border-color: #22c55e;
      box-shadow: 0 2px 10px rgba(34, 197, 94, 0.4);
    }

    /* Store Sub-Intro Banner */
    .store-sub-intro {
      flex-shrink: 0;
      padding: 12px 18px 8px;
      background: #ffffff;
      border-bottom: 1px solid #f1f5f9;
    }

    .store-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.3px;
    }

    .store-subtitle {
      font-size: 12px;
      color: var(--text-sub);
      margin-top: 2px;
    }

    /* Message Thread Area */
    .chat-body {
      flex: 1 1 0%;
      min-height: 0;
      max-height: 100%;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: var(--surface-canvas);
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }

    .message-row {
      display: flex;
      gap: 10px;
      align-items: flex-end;
      animation: bubbleSlideIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .message-row.user {
      justify-content: flex-end;
    }

    .message-row.assistant {
      justify-content: flex-start;
    }

    .message-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #ffffff;
      border: 1.5px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      margin-bottom: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .message-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .message-content-group {
      display: flex;
      flex-direction: column;
      max-width: 86%;
    }

    .message-bubble {
      padding: 13px 17px;
      font-size: 13.5px;
      line-height: 1.55;
      word-break: break-word;
    }

    .message-bubble.user {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: #ffffff;
      border-radius: 20px 20px 4px 20px;
      box-shadow: 0 4px 14px rgba(13, 41, 88, 0.24);
    }

    .message-bubble.assistant {
      background: #ffffff;
      color: var(--text-main);
      border: 1px solid var(--border-color);
      border-radius: 20px 20px 20px 4px;
      box-shadow: var(--shadow-card);
    }

    .message-bubble p {
      margin-bottom: 7px;
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
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .message-bubble li {
      margin-bottom: 3px;
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

    /* STANDOUT CLICKABLE ACTION BUTTONS & CHIPS IN CHAT (PRO-MAX) */
    .chat-action-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 10px;
      width: 100%;
    }

    .chat-action-btn {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 11px 18px;
      margin: 8px 0;
      border-radius: 24px;
      text-decoration: none;
      font-weight: 700;
      font-size: 13.5px;
      letter-spacing: -0.1px;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: none;
      outline: none;
    }

    .chat-action-btn:focus-visible {
      outline: 2px solid var(--border-focus);
      outline-offset: 2px;
    }

    /* Checkout Standout Button (Emerald Radiant Glow) */
    .chat-action-btn.chat-checkout-btn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.25);
    }

    .chat-action-btn.chat-checkout-btn:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 10px 24px rgba(16, 185, 129, 0.45);
      color: #ffffff;
    }

    /* Cart Standout Button (Cobalt Gradient) */
    .chat-action-btn.chat-cart-btn {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 60%, var(--accent-cyan) 100%);
      color: #ffffff;
      box-shadow: 0 6px 18px rgba(13, 41, 88, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .chat-action-btn.chat-cart-btn:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 10px 24px rgba(2, 132, 199, 0.4);
      color: #ffffff;
    }

    /* Tracking Standout Button (Dark Sleek) */
    .chat-action-btn.chat-track-btn {
      background: #0f172a;
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.35);
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25);
    }

    .chat-action-btn.chat-track-btn:hover {
      background: #1e293b;
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(56, 189, 248, 0.3);
    }

    .btn-icon {
      font-size: 15px;
      display: inline-flex;
      align-items: center;
    }

    .btn-text {
      flex: 1;
      text-align: left;
    }

    .btn-arrow {
      font-size: 13px;
      transition: transform 0.2s ease;
    }

    .chat-action-btn:hover .btn-arrow {
      transform: translateX(3px);
    }

    /* Inline Markdown Link Styling */
    .chat-inline-link {
      color: var(--accent-cyan);
      font-weight: 600;
      text-decoration: none;
      border-bottom: 1.5px solid rgba(2, 132, 199, 0.35);
      padding-bottom: 1px;
      transition: all 0.18s ease;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    .chat-inline-link:hover {
      color: var(--primary);
      border-color: var(--primary);
    }

    .ext-icon {
      font-size: 11px;
      opacity: 0.75;
    }

    /* Subtotal Highlight Callout Card */
    .subtotal-highlight-badge {
      background: linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%);
      border: 1.5px solid #bae6fd;
      border-radius: 14px;
      padding: 10px 14px;
      margin: 8px 0;
      display: flex;
      align-items: center;
      gap: 9px;
      color: var(--text-main);
      font-size: 13.5px;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.08);
    }

    .subtotal-icon {
      font-size: 18px;
    }

    .subtotal-text {
      flex: 1;
    }

    .subtotal-text strong {
      color: var(--emerald-dark);
      font-size: 15px;
      font-weight: 800;
    }

    /* Typing Indicator */
    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 12px 16px;
      background: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: 18px;
      border-bottom-left-radius: 4px;
      width: fit-content;
      margin-left: 46px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .typing-dot {
      width: 7px;
      height: 7px;
      background: var(--accent-cyan);
      border-radius: 50%;
      animation: typingBounce 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }

    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }
      40% { transform: scale(1.1); opacity: 1; }
    }

    /* Quick Reply Suggestion Chips */
    .quick-replies {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-top: 10px;
      margin-left: 46px;
    }

    .quick-reply-btn {
      background: #ffffff;
      border: 1.5px solid rgba(13, 41, 88, 0.2);
      color: var(--primary);
      border-radius: 24px;
      padding: 7px 15px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
      animation: chipEntrance 0.25s ease-out;
    }

    .quick-reply-btn:hover {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: #ffffff;
      border-color: transparent;
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(13, 41, 88, 0.2);
    }

    .quick-reply-btn:active {
      transform: scale(0.96);
    }

    /* Interactive Product Cards */
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
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
      transition: transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.24s ease;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .product-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(13, 41, 88, 0.12);
      border-color: #cbd5e1;
    }

    .product-img-wrap {
      width: 100%;
      height: 195px;
      background: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
      border-bottom: 1px solid #f1f5f9;
    }

    .product-img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      object-position: center;
      transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .product-card:hover .product-img {
      transform: scale(1.06);
    }

    .product-stock-tag {
      position: absolute;
      top: 10px;
      right: 10px;
      background: var(--emerald);
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 800;
      padding: 3px 9px;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.35);
      letter-spacing: 0.2px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .product-details {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      background: #ffffff;
    }

    .product-title {
      font-weight: 800;
      font-size: 15px;
      color: var(--text-main);
      line-height: 1.3;
      letter-spacing: -0.2px;
    }

    .product-price-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .product-price {
      font-size: 17px;
      font-weight: 900;
      color: var(--primary);
    }

    .product-actions {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-top: 6px;
    }

    .qty-picker {
      display: flex;
      align-items: center;
      border: 1.5px solid var(--border-color);
      border-radius: 10px;
      background: #f8fafc;
      overflow: hidden;
    }

    .qty-btn {
      width: 28px;
      height: 32px;
      border: none;
      background: transparent;
      cursor: pointer;
      font-weight: 800;
      font-size: 14px;
      color: var(--text-main);
      transition: background 0.15s ease, color 0.15s ease;
    }

    .qty-btn:hover {
      background: #e2e8f0;
      color: var(--primary);
    }

    .qty-display {
      font-size: 13px;
      font-weight: 800;
      padding: 0 6px;
      min-width: 20px;
      text-align: center;
      color: var(--text-main);
    }

    .add-to-cart-btn {
      flex: 1;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 60%, var(--accent-cyan) 100%);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      padding: 9px 14px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      box-shadow: 0 4px 12px rgba(13, 41, 88, 0.2);
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .add-to-cart-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(2, 132, 199, 0.35);
    }

    .add-to-cart-btn:active {
      transform: scale(0.97);
    }

    .add-to-cart-btn.added {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
    }

    /* Sticky In-Chat Cart Bar */
    .inchat-cart-strip {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 16px;
      background: #07152b;
      color: #ffffff;
      font-size: 12px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
      animation: bubbleSlideIn 0.25s ease-out;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
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
      font-size: 16px;
    }

    .cart-strip-count {
      font-weight: 600;
    }

    .cart-strip-total {
      color: #38bdf8;
      font-weight: 800;
    }

    .cart-strip-actions {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .cart-strip-manage-btn {
      background: rgba(255, 255, 255, 0.16);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.24);
      padding: 5px 11px;
      border-radius: 8px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.18s ease;
    }

    .cart-strip-manage-btn:hover {
      background: rgba(255, 255, 255, 0.28);
    }

    .cart-strip-checkout-btn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 5px 13px;
      border-radius: 8px;
      font-size: 11.5px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
      transition: all 0.18s ease;
    }

    .cart-strip-checkout-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.45);
    }

    /* Slide-over Cart Drawer */
    .cart-drawer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      z-index: 50;
      display: flex;
      flex-direction: column;
      border-radius: 24px;
      box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.16);
      animation: bubbleSlideIn 0.24s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }

    .cart-drawer.hidden {
      display: none;
    }

    .cart-drawer-header {
      padding: 16px 20px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drawer-title-wrap {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .drawer-title {
      font-weight: 800;
      font-size: 16px;
      color: var(--text-main);
      letter-spacing: -0.2px;
    }

    .drawer-badge {
      background: var(--primary);
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 12px;
    }

    .cart-drawer-close-btn {
      background: #e2e8f0;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: var(--text-sub);
      transition: all 0.18s ease;
    }

    .cart-drawer-close-btn:hover {
      background: #cbd5e1;
      color: var(--text-main);
      transform: scale(1.08);
    }

    .cart-drawer-items {
      flex: 1;
      overflow-y: auto;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 11px;
    }

    .cart-drawer-empty {
      text-align: center;
      padding: 44px 20px;
      color: var(--text-muted);
      font-size: 14px;
    }

    .cart-drawer-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }

    .drawer-item-img {
      width: 52px;
      height: 52px;
      border-radius: 10px;
      object-fit: contain;
      background: #f8fafc;
      padding: 5px;
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
      font-size: 13px;
      color: var(--primary);
      font-weight: 800;
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
      transform: scale(1.08);
    }

    .cart-drawer-footer {
      padding: 16px 20px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .drawer-subtotal-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14.5px;
      font-weight: 700;
      color: var(--text-main);
    }

    .drawer-total-price {
      font-size: 19px;
      font-weight: 900;
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
      padding: 11px 14px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .drawer-clear-btn:hover {
      background: #f1f5f9;
      color: #dc2626;
      border-color: #fca5a5;
    }

    .drawer-checkout-btn {
      flex: 2;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      border: none;
      padding: 11px 18px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 14px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
    }

    .drawer-checkout-btn:hover {
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.45);
      transform: translateY(-2px);
      color: #ffffff;
    }

    /* Modern Bottom Input Bar */
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
      border-radius: 32px;
      padding: 4px 6px 4px 12px;
      gap: 8px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .input-pill-container:focus-within {
      border-color: var(--accent-cyan);
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
    }

    .action-plus-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;
      background: #f1f5f9;
      color: #475569;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.18s ease;
    }

    .action-plus-btn:hover {
      background: #e2e8f0;
      color: var(--primary);
      transform: rotate(90deg);
    }

    .chat-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 13.5px;
      font-family: inherit;
      color: var(--text-main);
      background: transparent;
      padding: 7px 0;
    }

    .chat-input::placeholder {
      color: var(--text-muted);
    }

    .send-icon-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 60%, var(--accent-cyan) 100%);
      border: none;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
      box-shadow: 0 2px 8px rgba(13, 41, 88, 0.25);
    }

    .send-icon-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
    }

    .send-icon-btn:active {
      transform: scale(0.95);
    }

    .send-icon-btn svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }

    /* Quick Actions Menu (opened via + button) */
    .action-menu {
      position: absolute;
      bottom: 76px;
      left: 16px;
      right: 16px;
      background: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: 18px;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 20;
      transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .action-menu.hidden {
      opacity: 0;
      visibility: hidden;
      transform: translateY(12px) scale(0.96);
      pointer-events: none;
    }

    .action-menu-item {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 11px 15px;
      border-radius: 12px;
      border: none;
      background: transparent;
      color: var(--text-main);
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      text-align: left;
      transition: all 0.15s ease;
    }

    .action-menu-item:hover {
      background: #f1f5f9;
      color: var(--accent-cyan);
      transform: translateX(3px);
    }

    .action-menu-item svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
      flex-shrink: 0;
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
      .launcher-pill {
        bottom: 16px;
        right: 16px;
      }
    }
  `}class f{static isWpStorefront(){return typeof window<"u"&&(window.location.hostname.includes("colbolt.hawksnfox.com")||!!window.wc_store_api_nonce||!!window.wc_add_to_cart_params||!!window.woocommerce_params)}static getHeaders(){var e,i;const t={"Content-Type":"application/json",Accept:"application/json"};if(typeof window<"u"){const o=window.wc_store_api_nonce||((e=window.UniversalChatbotConfig)==null?void 0:e.nonce)||((i=document.querySelector('meta[name="wc-store-api-nonce"]'))==null?void 0:i.content);o&&(t.Nonce=o)}return t}static async fetchLiveCart(){if(!this.isWpStorefront())return null;try{const t=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart`,{method:"GET",headers:this.getHeaders(),credentials:"include"});if(t.ok)return((await t.json()).items||[]).map(i=>{var o,a,n;return{key:i.key,id:String(i.id),title:i.name,quantity:i.quantity,price:(o=i.prices)!=null&&o.price?Number(i.prices.price)/Math.pow(10,i.prices.currency_minor_unit||2):0,image:((n=(a=i.images)==null?void 0:a[0])==null?void 0:n.src)||""}})}catch(t){console.warn("[WooCommerceBridge] fetchLiveCart error:",t)}return null}static async applyFragmentsAndUpdateDOM(t,e){if(typeof document>"u")return;if(t&&typeof t=="object")for(const[a,n]of Object.entries(t))try{document.querySelectorAll(a).forEach(r=>{const c=document.createElement("div");c.innerHTML=n.trim();const l=c.firstElementChild;l&&r.parentNode&&r.parentNode.replaceChild(l,r)})}catch{}let i=0;try{const a=await this.fetchLiveCart();a&&a.length>0&&(i=a.reduce((n,s)=>n+(s.quantity||1),0))}catch{}if(document.querySelectorAll(".cart .count, .apus-topcart .count, .footer-mini-cart .count, .mini-cart .count, .header-cart .count, .cart-count, span.count, .elementor-button-icon-qty").forEach(a=>{a.textContent=String(i)}),this.triggerWooCommerceEvents({fragments:t,cart_hash:e},"added_to_cart"),typeof window<"u"){const a=window.location.pathname.toLowerCase();if(a.includes("cart")||a.includes("checkout")){const n=window;n.jQuery&&(n.jQuery(document.body).trigger("update_checkout"),n.jQuery(document.body).trigger("update_wc_div"))}}}static async refreshAndApplyFragments(t){if(!(typeof window>"u")){try{const e=await fetch(`${window.location.origin}/?wc-ajax=get_refreshed_fragments`,{method:"POST",credentials:"include"});if(e.ok){const i=await e.json();await this.applyFragmentsAndUpdateDOM(i==null?void 0:i.fragments,i==null?void 0:i.cart_hash);return}}catch(e){console.warn("[WooCommerceBridge] get_refreshed_fragments failed:",e)}typeof t=="number"&&document.querySelectorAll(".cart .count, .apus-topcart .count, .footer-mini-cart .count, .mini-cart .count, .header-cart .count, .cart-count, span.count, .elementor-button-icon-qty").forEach(i=>{i.textContent=String(t)})}}static async executeCartAddition(t,e=1,i){if(this.isWpStorefront()){try{const o=new FormData;o.append("product_id",String(t)),o.append("quantity",String(e));const a=await fetch(`${window.location.origin}/?wc-ajax=add_to_cart`,{method:"POST",credentials:"include",body:o});if(a.ok){const n=await a.json().catch(()=>({}));return await this.applyFragmentsAndUpdateDOM(n==null?void 0:n.fragments,n==null?void 0:n.cart_hash),{success:!0,message:"Added to cart!",cartData:n}}}catch(o){console.warn("[WooCommerceBridge] wc-ajax add_to_cart error, trying Store API:",o)}try{const o=i||`${window.location.origin}/wp-json/wc/store/v1/cart/add-item`,a=await fetch(o,{method:"POST",headers:this.getHeaders(),credentials:"include",body:JSON.stringify({id:Number(t),quantity:e})});if(a.ok){const n=await a.json();return await this.refreshAndApplyFragments(n==null?void 0:n.items_count),{success:!0,message:"Added to cart!",cartCount:n==null?void 0:n.items_count,cartData:n}}}catch(o){console.warn("[WooCommerceBridge] Direct Store API call failed:",o)}}return this.triggerWooCommerceEvents({items_count:1},"added_to_cart"),{success:!0,message:"Item added to your shopping cart!"}}static async executeCartRemoval(t){if(this.isWpStorefront()){try{const e=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart`,{method:"GET",headers:this.getHeaders(),credentials:"include"});if(e.ok){const o=((await e.json()).items||[]).find(s=>s.key===String(t)||String(s.id)===String(t)||s.name.toLowerCase().includes(String(t).toLowerCase())),a=o?o.key:String(t),n=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart/remove-item`,{method:"POST",headers:this.getHeaders(),credentials:"include",body:JSON.stringify({key:a})});if(n.ok){const s=await n.json();return await this.refreshAndApplyFragments(s==null?void 0:s.items_count),{success:!0,message:"Item removed from cart!",cartCount:s==null?void 0:s.items_count,cartData:s}}}}catch(e){console.warn("[WooCommerceBridge] Store API removal failed, trying fallback:",e)}try{const e=new FormData;e.append("cart_item_key",String(t));const i=await fetch(`${window.location.origin}/?wc-ajax=remove_from_cart`,{method:"POST",credentials:"include",body:e});if(i.ok){const o=await i.json().catch(()=>({}));return await this.applyFragmentsAndUpdateDOM(o==null?void 0:o.fragments,o==null?void 0:o.cart_hash),{success:!0,message:"Item removed from cart."}}}catch{}}return await this.refreshAndApplyFragments(0),{success:!0,message:"Item removed from cart."}}static async executeCartUpdate(t,e){if(e<=0)return this.executeCartRemoval(t);if(this.isWpStorefront())try{const i=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart`,{method:"GET",headers:this.getHeaders(),credentials:"include"});if(i.ok){const a=((await i.json()).items||[]).find(r=>r.key===String(t)||String(r.id)===String(t)||r.name.toLowerCase().includes(String(t).toLowerCase())),n=a?a.key:String(t),s=await fetch(`${window.location.origin}/wp-json/wc/store/v1/cart/update-item`,{method:"POST",headers:this.getHeaders(),credentials:"include",body:JSON.stringify({key:n,quantity:Number(e)})});if(s.ok){const r=await s.json();return await this.refreshAndApplyFragments(r==null?void 0:r.items_count),{success:!0,message:"Cart updated successfully!",cartCount:r==null?void 0:r.items_count,cartData:r}}}}catch(i){console.warn("[WooCommerceBridge] Store API update-item error:",i)}return await this.refreshAndApplyFragments(e),{success:!0,message:"Cart quantity updated."}}static async clearStoreCart(){if(this.isWpStorefront())try{const t=await this.fetchLiveCart();if(t&&t.length>0)for(const e of t)await this.executeCartRemoval(e.key);await this.refreshAndApplyFragments(0)}catch(t){console.warn("[WooCommerceBridge] clearStoreCart error:",t)}}static triggerWooCommerceEvents(t,e="added_to_cart"){if(typeof window>"u")return;const i=window;if(i.jQuery)try{i.jQuery(document.body).trigger("wc_fragment_refresh"),i.jQuery(document.body).trigger(e,[t==null?void 0:t.fragments,t==null?void 0:t.cart_hash]),i.jQuery(document.body).trigger("wc_fragments_refreshed"),i.jQuery(document.body).trigger("wc_fragments_loaded"),i.jQuery(document.body).trigger("update_checkout")}catch{}try{window.dispatchEvent(new CustomEvent("woocommerce:cart_updated",{detail:t})),document.body.dispatchEvent(new CustomEvent(e,{detail:t})),document.body.dispatchEvent(new CustomEvent("wc_fragment_refresh")),document.body.dispatchEvent(new CustomEvent("wc_fragments_refreshed"))}catch{}}}class C{constructor(){u(this,"siteKey","colbolt_live");u(this,"apiUrl","http://localhost:3000");u(this,"customLogoUrl");u(this,"shadowRoot");u(this,"isOpen",!1);u(this,"isActionMenuOpen",!1);u(this,"conversationId",`conv_${Date.now()}`);u(this,"config",null);u(this,"isWaitingForResponse",!1);u(this,"cartItems",[]);this.extractAttributes()}extractAttributes(){const t=document.querySelectorAll("script");for(let i=t.length-1;i>=0;i--){const o=t[i];if(o.src&&(o.src.includes("widget.js")||o.getAttribute("data-site-key"))){const a=o.getAttribute("data-site-key");a&&(this.siteKey=a);const n=o.getAttribute("data-api-url");if(n)this.apiUrl=n.replace(/\/+$/,"");else try{const s=new URL(o.src);s.hostname.includes("colbolt.hawksnfox.com")||(this.apiUrl=s.origin)}catch{}break}}const e=window.UniversalChatbotConfig;e&&(e.siteKey&&(this.siteKey=e.siteKey),e.apiUrl&&(this.apiUrl=e.apiUrl.replace(/\/+$/,"")),e.logoUrl&&(this.customLogoUrl=e.logoUrl))}async init(){const t=document.createElement("div");t.id="universal-chatbot-root",document.body.appendChild(t),this.shadowRoot=t.attachShadow({mode:"open"}),await this.fetchConfig(),this.render(),this.bindEvents(),f.fetchLiveCart().then(e=>{e&&e.length>0&&(this.cartItems=e,this.updateCartUI())}).catch(()=>{})}async fetchConfig(){try{const t=await fetch(`${this.apiUrl}/api/tenant/config?siteKey=${encodeURIComponent(this.siteKey)}`);t.ok&&(this.config=await t.json())}catch(t){console.warn("[UniversalChatbot] Using fallback default config:",t)}this.config?this.customLogoUrl&&(this.customLogoUrl.includes("assistance.gif")||(this.config.brand.logoUrl=this.customLogoUrl)):this.config={siteKey:this.siteKey,brand:{companyName:"Colbolt",assistantName:"COLBOLT.",logoUrl:this.customLogoUrl||"https://colbolt.hawksnfox.com/wp-content/uploads/2021/05/colbol.png",primaryColor:"#0d2958",launcherPosition:"bottom-right",welcomeMessage:"Hello! Welcome to Colbolt. I can help you find products (like Bacteriostatic Water, Tirz, Retatrutide), check prices within your budget, or add items directly to your cart. How can I help you today?",suggestedQuestions:["What does Colbolt do?","Show me Tirz products","What is Bacteriostatic Water?","What are your shipping policies?"]},company:{businessName:"Colbolt",aboutUs:"Colbolt provides premium quality research solutions and peptides."},commerceType:"woocommerce",activeTools:["search_products","add_to_cart","tile_calculator"]}}getAvatarHtml(t=36){var o,a;const e=this.customLogoUrl||((a=(o=this.config)==null?void 0:o.brand)==null?void 0:a.logoUrl);return`<img src="${e&&!e.includes("assistance.gif")?e:"https://colbolt.hawksnfox.com/wp-content/uploads/2021/05/colbol.png"}" alt="Colbolt" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;background:#ffffff;">`}getTimeString(){return new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}render(){var r;const t=(r=this.config)==null?void 0:r.brand,e=(t==null?void 0:t.primaryColor)||"#0d2958",i=(t==null?void 0:t.launcherPosition)||"bottom-right",o=(t==null?void 0:t.companyName)||"Colbolt",a=(t==null?void 0:t.assistantName)||"COLBOLT.",n=document.createElement("style");n.textContent=m(e,i),this.shadowRoot.appendChild(n);const s=document.createElement("div");s.className="chatbot-container",s.innerHTML=`
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
            <span class="launcher-title">${this.escapeHtml(a)}</span>
            <span class="launcher-pill-status">● Live</span>
          </div>
          <div class="launcher-sub">Order & Research Specialist</div>
        </div>
      </div>

      <!-- Chat Window -->
      <div class="chat-window hidden" id="chatWindow">
        <!-- Branded Gradient Banner Header -->
        <div class="chat-header-banner">
          <div class="banner-brand-info">
            <div class="banner-mascot">
              ${this.getAvatarHtml(52)}
            </div>
            <div class="banner-text-group">
              <span class="banner-greeting">Verified Assistant</span>
              <span class="banner-assistant-name">${this.escapeHtml(a)}</span>
              <span class="banner-tagline"><span class="banner-tagline-dot"></span> Research Concierge • Online</span>
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
          <div class="store-title">Welcome to ${this.escapeHtml(o)}</div>
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
    `,this.shadowRoot.appendChild(s)}bindEvents(){const t=this.shadowRoot.getElementById("launcherBtn"),e=this.shadowRoot.getElementById("closeBtn"),i=this.shadowRoot.getElementById("sendBtn"),o=this.shadowRoot.getElementById("actionPlusBtn"),a=this.shadowRoot.getElementById("actionMenu"),n=this.shadowRoot.getElementById("chatInput"),s=this.shadowRoot.getElementById("chatBody");t==null||t.addEventListener("click",()=>this.toggle()),e==null||e.addEventListener("click",()=>this.toggle(!1)),o==null||o.addEventListener("click",g=>{g.stopPropagation(),this.isActionMenuOpen=!this.isActionMenuOpen,this.isActionMenuOpen?a==null||a.classList.remove("hidden"):a==null||a.classList.add("hidden")}),s==null||s.addEventListener("click",()=>{this.isActionMenuOpen&&(this.isActionMenuOpen=!1,a==null||a.classList.add("hidden"))}),a==null||a.addEventListener("click",g=>{const d=g.target.closest(".action-menu-item");if(!d)return;const p=d.getAttribute("data-action");this.isActionMenuOpen=!1,a.classList.add("hidden"),p==="manage_cart"?this.openCartDrawer():p==="track_order"?this.sendMessage("Track my order"):p==="all_products"?this.sendMessage("Show me all products"):p==="tile_calculator"?this.renderTileCalculatorWidget():p==="shipping"?this.sendMessage("What is your shipping policy?"):p==="clear_chat"&&this.clearChat()});const r=this.shadowRoot.getElementById("cartStripToggle"),c=this.shadowRoot.getElementById("cartStripManageBtn"),l=this.shadowRoot.getElementById("closeCartDrawerBtn"),w=this.shadowRoot.getElementById("drawerClearCartBtn"),b=this.shadowRoot.getElementById("cartDrawerItems");r==null||r.addEventListener("click",()=>this.openCartDrawer()),c==null||c.addEventListener("click",()=>this.openCartDrawer()),l==null||l.addEventListener("click",()=>this.closeCartDrawer()),w==null||w.addEventListener("click",()=>this.handleClearAllCart()),b==null||b.addEventListener("click",g=>{const d=g.target,p=d.classList.contains("drawer-item-remove-btn")?d:d.closest(".drawer-item-remove-btn");if(p){const h=p.getAttribute("data-product-id"),v=p.getAttribute("data-product-title");h&&this.handleRemoveFromCart(h,v||"Item")}}),i==null||i.addEventListener("click",()=>this.handleUserSend()),n==null||n.addEventListener("keydown",g=>{g.key==="Enter"?(g.preventDefault(),this.handleUserSend()):g.key==="Escape"&&this.isOpen&&this.toggle(!1)}),s==null||s.addEventListener("click",g=>{var p;const d=g.target;if(d.classList.contains("quick-reply-btn")){const h=d.getAttribute("data-text");h&&this.sendMessage(h)}else if(d.classList.contains("add-to-cart-btn")||d.closest(".add-to-cart-btn")){const h=d.classList.contains("add-to-cart-btn")?d:d.closest(".add-to-cart-btn"),v=h.getAttribute("data-product-id"),y=h.closest(".product-card"),S=y==null?void 0:y.querySelector(".qty-display"),B=S?parseInt(S.textContent||"1",10):1;v&&this.handleAddToCart(h,v,B)}else if(d.classList.contains("qty-btn")){const h=d.getAttribute("data-action")==="plus",v=(p=d.parentElement)==null?void 0:p.querySelector(".qty-display");if(v){let y=parseInt(v.textContent||"1",10);y=h?y+1:Math.max(1,y-1),v.textContent=String(y)}}else d.classList.contains("tile-calc-submit-btn")&&this.handleTileCalculation(d)})}toggle(t){this.isOpen=t!==void 0?t:!this.isOpen;const e=this.shadowRoot.getElementById("chatWindow"),i=this.shadowRoot.getElementById("launcherBtn"),o=this.shadowRoot.getElementById("chatInput");this.isOpen?(e==null||e.classList.remove("hidden"),i&&(i.style.opacity="0.9"),setTimeout(()=>o==null?void 0:o.focus(),150)):(e==null||e.classList.add("hidden"),i&&(i.style.opacity="1"))}handleUserSend(){const t=this.shadowRoot.getElementById("chatInput"),e=t.value.trim();!e||this.isWaitingForResponse||(t.value="",this.sendMessage(e))}async sendMessage(t){const e=this.shadowRoot.getElementById("chatBody");if(!e)return;const i=document.createElement("div");i.className="message-row user",i.innerHTML=`
      <div class="message-content-group">
        <div class="message-bubble user">${this.escapeHtml(t)}</div>
        <span class="message-timestamp">${this.getTimeString()}</span>
      </div>
    `,e.appendChild(i);const o=document.createElement("div");o.className="typing-indicator",o.id="activeTypingIndicator",o.innerHTML=`
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `,e.appendChild(o),e.scrollTop=e.scrollHeight,this.isWaitingForResponse=!0;try{const a=await fetch(`${this.apiUrl}/api/chat/message`,{method:"POST",headers:{"Content-Type":"application/json","X-Site-Key":this.siteKey},body:JSON.stringify({siteKey:this.siteKey,conversationId:this.conversationId,message:t,cartItems:this.cartItems})});if(o.remove(),this.isWaitingForResponse=!1,!a.ok)throw new Error(`Server returned ${a.status}`);const n=await a.json();this.renderBotResponse(n)}catch{o.remove(),this.isWaitingForResponse=!1,this.renderBotResponse({message:"I am currently having trouble reaching the store catalog. Please try again in a moment."})}}renderBotResponse(t){const e=this.shadowRoot.getElementById("chatBody");if(!e)return;const i=Array.isArray(t.cartActions)&&t.cartActions.length>0?t.cartActions:t.cartAction?[t.cartAction]:[];if(i.length>0){for(const r of i)if(!(!r||!r.type))if(r.type==="remove")f.executeCartRemoval(r.productId||r.title).catch(()=>{}),this.cartItems=this.cartItems.filter(c=>c.id!==String(r.productId)&&(!r.title||!c.title.toLowerCase().includes(String(r.title).toLowerCase())));else if(r.type==="add"&&r.item){f.executeCartAddition(r.item.id,r.item.quantity||1).catch(()=>{});const c=this.cartItems.find(l=>l.id===String(r.item.id));c?c.quantity+=r.item.quantity||1:this.cartItems.push({id:String(r.item.id),title:r.item.title,price:Number(r.item.price||0),quantity:r.item.quantity||1})}else if(r.type==="update"&&r.item){f.executeCartUpdate(r.item.id,r.item.quantity).catch(()=>{});const c=this.cartItems.find(l=>l.id===String(r.item.id));c?c.quantity=r.item.quantity:this.cartItems.push({id:String(r.item.id),title:r.item.title,price:Number(r.item.price||0),quantity:r.item.quantity||1})}else r.type==="clear"&&(f.clearStoreCart().catch(()=>{}),this.cartItems=[]);this.updateCartUI()}const o=document.createElement("div");o.className="message-row assistant";const a=this.formatMarkdown(t.message||"");let n="";Array.isArray(t.productCards)&&t.productCards.length>0&&(n=`
        <div class="product-cards-container">
          ${t.productCards.map(r=>{var c;return`
            <div class="product-card">
              ${r.featuredImage?`
                <div class="product-img-wrap">
                  <img class="product-img" src="${r.featuredImage}" alt="${this.escapeHtml(r.title)}" loading="lazy">
                  <span class="product-stock-tag">${r.inStock?"In Stock":"Out of Stock"}</span>
                </div>
              `:""}
              <div class="product-details">
                <span class="product-title">${this.escapeHtml(r.title)}</span>
                <div class="product-price-row">
                  <span class="product-price">${((c=r.price)==null?void 0:c.formatted)||"$0.00"}</span>
                </div>
                <div class="product-actions">
                  <div class="qty-picker">
                    <button class="qty-btn" data-action="minus" aria-label="Decrease quantity">-</button>
                    <span class="qty-display">1</span>
                    <button class="qty-btn" data-action="plus" aria-label="Increase quantity">+</button>
                  </div>
                  <button class="add-to-cart-btn" data-product-id="${r.id}">
                    <svg style="width:14px;height:14px;fill:currentColor" viewBox="0 0 24 24"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/></svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          `}).join("")}
        </div>
      `);let s="";Array.isArray(t.quickReplies)&&t.quickReplies.length>0&&(s=`
        <div class="quick-replies">
          ${t.quickReplies.map(r=>`
            <button class="quick-reply-btn" data-text="${this.escapeHtml(r.actionText||r.label)}">${this.escapeHtml(r.label)}</button>
          `).join("")}
        </div>
      `),o.innerHTML=`
      <div class="message-avatar">
        ${this.getAvatarHtml(34)}
      </div>
      <div class="message-content-group">
        <div class="message-bubble assistant">
          ${a}
          ${n}
        </div>
        <span class="message-timestamp">${this.getTimeString()}</span>
        ${s}
      </div>
    `,e.appendChild(o),e.scrollTop=e.scrollHeight}renderTileCalculatorWidget(){const t=this.shadowRoot.getElementById("chatBody");if(!t)return;const e=document.createElement("div");e.className="message-row assistant",e.innerHTML=`
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
    `,t.appendChild(e),t.scrollTop=t.scrollHeight}handleTileCalculation(t){var b,g,d,p;const e=t.closest(".tile-calc-card");if(!e)return;const i=parseFloat(((b=e.querySelector(".tile-input-len"))==null?void 0:b.value)||"0"),o=parseFloat(((g=e.querySelector(".tile-input-wid"))==null?void 0:g.value)||"0"),a=parseFloat(((d=e.querySelector(".tile-input-box"))==null?void 0:d.value)||"16"),n=parseFloat(((p=e.querySelector(".tile-input-waste"))==null?void 0:p.value)||"10"),s=e.querySelector(".tile-calc-result");if(!s)return;if(i<=0||o<=0){s.style.display="block",s.style.background="#fef2f2",s.style.color="#991b1b",s.style.borderColor="#fecaca",s.textContent="Please enter valid room dimensions greater than 0.";return}const r=i*o,c=r*n/100,l=r+c,w=Math.ceil(l/(a||16));s.style.display="block",s.style.background="#f0fdf4",s.style.color="#166534",s.style.borderColor="#bbf7d0",s.innerHTML=`
      <strong>Calculation Result:</strong><br>
      • Room Floor Area: <strong>${r.toFixed(1)} sq ft</strong><br>
      • Recommended Wastage (${n}%): <strong>+${c.toFixed(1)} sq ft</strong><br>
      • Total Area to Cover: <strong>${l.toFixed(1)} sq ft</strong><br>
      • Boxes Needed (${a} sq ft/box): <strong>${w} boxes</strong>
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
    `)}async handleAddToCart(t,e,i){var w,b;if(t.getAttribute("data-loading")==="true")return;t.setAttribute("data-loading","true");const o=t.innerHTML;t.innerHTML="Adding...",t.style.opacity="0.7";const a=t.closest(".product-card"),n=a==null?void 0:a.querySelector(".product-title"),s=((w=n==null?void 0:n.textContent)==null?void 0:w.trim())||"Selected Product",r=a==null?void 0:a.querySelector(".product-price"),c=((b=r==null?void 0:r.textContent)==null?void 0:b.replace(/[^0-9.]/g,""))||"0",l=parseFloat(c)||0;try{const g=await f.executeCartAddition(e,i);t.innerHTML="✓ Added to Cart",t.classList.add("added"),t.style.opacity="1";const d=this.cartItems.find(h=>h.id===e);d?d.quantity+=i:this.cartItems.push({id:e,title:s,price:l,quantity:i}),this.updateCartUI(),fetch(`${this.apiUrl}/api/cart/add`,{method:"POST",headers:{"Content-Type":"application/json","X-Site-Key":this.siteKey},body:JSON.stringify({siteKey:this.siteKey,conversationId:this.conversationId,productId:e,quantity:i})}).catch(()=>{});const p=this.shadowRoot.getElementById("chatBody");if(p){const h=document.createElement("div");h.className="message-row assistant",h.innerHTML=`
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
        `,p.appendChild(h),p.scrollTop=p.scrollHeight}setTimeout(()=>{t.innerHTML=o,t.classList.remove("added"),t.removeAttribute("data-loading")},3500)}catch{t.innerHTML="Error",t.removeAttribute("data-loading"),setTimeout(()=>{t.innerHTML=o,t.style.opacity="1"},2e3)}}updateCartUI(){const t=this.shadowRoot.getElementById("inchatCartStrip"),e=this.shadowRoot.getElementById("cartStripCountText"),i=this.shadowRoot.getElementById("cartStripTotalText"),o=this.shadowRoot.getElementById("drawerCartBadge"),a=this.shadowRoot.getElementById("drawerTotalPrice"),n=this.shadowRoot.getElementById("cartDrawerItems"),s=this.cartItems.reduce((c,l)=>c+(l.quantity||1),0),r=this.cartItems.reduce((c,l)=>c+(l.price||0)*(l.quantity||1),0);t&&(s>0?(t.classList.remove("hidden"),e&&(e.innerHTML=`<strong>${s}</strong> ${s===1?"item":"items"}`),i&&(i.textContent=`• $${r.toFixed(2)}`)):t.classList.add("hidden")),o&&(o.textContent=String(s)),a&&(a.textContent=`$${r.toFixed(2)}`),n&&(this.cartItems.length===0?n.innerHTML=`
          <div class="cart-drawer-empty">
            <div style="font-size:32px; margin-bottom:8px;">🛒</div>
            <p style="font-weight:700; color:var(--text-main); font-size:14px;">Your cart is empty</p>
            <p style="font-size:12px; margin-top:4px;">Add research compounds or Bacteriostatic Water to get started.</p>
          </div>
        `:n.innerHTML=this.cartItems.map(c=>`
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
        `).join(""))}openCartDrawer(){const t=this.shadowRoot.getElementById("cartDrawer");t&&(this.updateCartUI(),t.classList.remove("hidden"))}closeCartDrawer(){const t=this.shadowRoot.getElementById("cartDrawer");t&&t.classList.add("hidden")}async handleRemoveFromCart(t,e){const i=this.cartItems.findIndex(a=>String(a.id)===String(t)||a.title.toLowerCase().includes(e.toLowerCase()));i!==-1&&this.cartItems.splice(i,1),this.updateCartUI(),f.executeCartRemoval(t).catch(()=>{}),fetch(`${this.apiUrl}/api/cart/remove`,{method:"POST",headers:{"Content-Type":"application/json","X-Site-Key":this.siteKey},body:JSON.stringify({siteKey:this.siteKey,conversationId:this.conversationId,productId:t})}).catch(()=>{});const o=this.shadowRoot.getElementById("chatBody");if(o){const a=document.createElement("div");a.className="message-row assistant",a.innerHTML=`
        <div class="message-avatar">${this.getAvatarHtml(34)}</div>
        <div class="message-content-group">
          <div class="message-bubble assistant" style="border-left: 3px solid #dc2626;">
            <p>🗑️ <strong>${this.escapeHtml(e)}</strong> has been removed from your shopping cart.</p>
          </div>
          <span class="message-timestamp">${this.getTimeString()}</span>
        </div>
      `,o.appendChild(a),o.scrollTop=o.scrollHeight}}async handleClearAllCart(){this.cartItems=[],this.updateCartUI(),f.clearStoreCart().catch(()=>{}),fetch(`${this.apiUrl}/api/cart/clear`,{method:"POST",headers:{"Content-Type":"application/json","X-Site-Key":this.siteKey},body:JSON.stringify({siteKey:this.siteKey,conversationId:this.conversationId})}).catch(()=>{}),setTimeout(()=>this.closeCartDrawer(),300);const t=this.shadowRoot.getElementById("chatBody");if(t){const e=document.createElement("div");e.className="message-row assistant",e.innerHTML=`
        <div class="message-avatar">${this.getAvatarHtml(34)}</div>
        <div class="message-content-group">
          <div class="message-bubble assistant" style="border-left: 3px solid #dc2626;">
            <p>🗑️ Your shopping cart has been cleared.</p>
          </div>
          <span class="message-timestamp">${this.getTimeString()}</span>
        </div>
      `,t.appendChild(e),t.scrollTop=t.scrollHeight}}escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}formatMarkdown(t){if(!t)return"";let e=this.escapeHtml(t);return e=e.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/💵\s*(?:<strong>)?(?:Estimated\s*Subtotal|Updated\s*Total)(?:<\/strong>)?:\s*(?:<strong>)?(\$[\d,.]+(?:\.\d{2})?)(?:<\/strong>)?/gi,(o,a)=>`<div class="subtotal-highlight-badge"><span class="subtotal-icon">💵</span><span class="subtotal-text">Estimated Subtotal: <strong>${a}</strong></span></div>`),e=e.replace(/(?:(?:🔗|💳|📦)\s*)?\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/gu,(o,a,n)=>{const s=n.trim(),r=a.trim(),c=s.toLowerCase(),l=r.toLowerCase();return c.includes("checkout")||l.includes("checkout")?`<a href="${s}" target="_blank" rel="noopener noreferrer" class="chat-action-btn chat-checkout-btn"><span class="btn-icon">💳</span><span class="btn-text">${r}</span><span class="btn-arrow">➔</span></a>`:c.includes("cart")||l.includes("cart")||l.includes("basket")?`<a href="${s}" target="_blank" rel="noopener noreferrer" class="chat-action-btn chat-cart-btn"><span class="btn-icon">🛒</span><span class="btn-text">${r}</span><span class="btn-arrow">➔</span></a>`:c.includes("order")||c.includes("track")||l.includes("order")||l.includes("track")?`<a href="${s}" target="_blank" rel="noopener noreferrer" class="chat-action-btn chat-track-btn"><span class="btn-icon">📦</span><span class="btn-text">${r}</span><span class="btn-arrow">➔</span></a>`:`<a href="${s}" target="_blank" rel="noopener noreferrer" class="chat-inline-link">${r} <span class="ext-icon">↗</span></a>`}),e=e.replace(/^[•\-\*]\s+(.*)$/gm,"<li>$1</li>"),e=e.replace(/((?:<li>.*<\/li>\s*)+)/g,"<ul>$1</ul>"),e=e.split(/\n\s*\n/).map(o=>{const a=o.trim();return a?a.startsWith("<div")||a.startsWith("<ul")||a.startsWith("<a")?a:`<p>${a.replace(/\n/g,"<br>")}</p>`:""}).filter(Boolean).join(""),e}}if(typeof window<"u"){const k=new C;window.UniversalChatbot=k,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>k.init()):k.init()}x.UniversalCommerceWidget=C,Object.defineProperty(x,Symbol.toStringTag,{value:"Module"})})(this.UniversalChatbot=this.UniversalChatbot||{});
