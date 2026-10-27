/**
 * Elite High-End Shadow DOM Styles for Colbolt Chatbot
 * Modern biotechnology & premium e-commerce conversational UI.
 * Features:
 * - Fluid spring animations and micro-interactions
 * - Radiant Cobalt / Cyan theme palette matching Colbolt Uomo storefront
 * - Standout clickable action buttons (Checkout, Cart, Track Order)
 * - Elevated interactive product cards with quantity pickers
 * - Live slide-over cart drawer & real-time sticky cart summary
 * - Mobile-first responsive layout with safe touch targets
 */

export function getWidgetStyles(primaryColor: string = '#0d2958', position: 'bottom-right' | 'bottom-left' = 'bottom-right'): string {
  const isRight = position === 'bottom-right';

  return `
    :host {
      --primary: ${primaryColor};
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
      ${isRight ? 'right: 24px;' : 'left: 24px;'};
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
      ${isRight ? 'right: 24px;' : 'left: 24px;'};
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
      transform-origin: ${isRight ? 'bottom right' : 'bottom left'};
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
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 18px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;
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
  `;
}
