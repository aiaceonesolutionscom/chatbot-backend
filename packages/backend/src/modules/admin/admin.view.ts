import { TenantConfig } from '@universal-chatbot/shared';
import { TenantUsageStats } from '../analytics/usage.tracker.js';

export class AdminView {
  /**
   * Render Enterprise Login Page
   */
  static renderLoginPage(errorMsg?: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AceOne Solutions — Enterprise Admin Login</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card: #0f172a;
      --border: #1e293b;
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --danger: #ef4444;
      --font: 'Plus Jakarta Sans', sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 20%, #1e293b 0%, #090d16 80%);
      color: var(--text);
      font-family: var(--font);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-container {
      width: 100%;
      max-width: 440px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 40px 36px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
      text-align: center;
    }
    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;
    }
    .logo-img {
      max-width: 180px;
      height: auto;
      object-fit: contain;
      filter: drop-shadow(0 4px 12px rgba(37, 99, 235, 0.3));
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 13px;
      margin-bottom: 28px;
    }
    .error-banner {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
      padding: 12px 14px;
      border-radius: 10px;
      font-size: 13px;
      margin-bottom: 20px;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .form-group {
      text-align: left;
      margin-bottom: 18px;
    }
    label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    input[type="text"], input[type="password"] {
      width: 100%;
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 16px;
      color: #fff;
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    input[type="text"]:focus, input[type="password"]:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
    }
    .btn-submit {
      width: 100%;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 13px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 10px;
      transition: all 0.2s;
    }
    .btn-submit:hover {
      opacity: 0.95;
      transform: translateY(-1px);
    }
    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .security-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="logo-container">
      <img src="/aceone-logo.png" alt="AceOne Solutions" class="logo-img" onerror="this.onerror=null; this.src='/static/assistance.gif';">
    </div>
    <h1>AceOne Solutions</h1>
    <div class="subtitle">AI Commerce Management Hub • Master Authentication</div>

    ${errorMsg ? `<div class="error-banner"><span>⚠️</span> <div>${errorMsg}</div></div>` : ''}

    <form method="POST" action="/api/admin/login" onsubmit="document.getElementById('loginBtn').disabled = true;">
      <div class="form-group">
        <label>Admin Username</label>
        <input type="text" name="username" required autocomplete="username" placeholder="e.g. admin" autofocus>
      </div>
      <div class="form-group">
        <label>Secure Master Password</label>
        <input type="password" name="password" required autocomplete="current-password" placeholder="Enter password">
      </div>
      <button type="submit" class="btn-submit" id="loginBtn">Authenticate & Enter Hub →</button>
    </form>

    <div class="security-badge">
      <span>🛡️</span> Protected by AceOne Shield Security • Rate-Limited & PBKDF2 Encrypted
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Render Enterprise Multi-Tenant Admin Portal
   */
  static renderDashboard(params: {
    tenants: TenantConfig[];
    activeTab: 'overview' | 'chatbot' | 'usage' | 'settings';
    selectedClient?: string;
    stats: TenantUsageStats;
    auditLogs: Array<any>;
    dailyRecords: Array<any>;
    csrfToken: string;
  }): string {
    const { tenants, activeTab, selectedClient, stats, auditLogs, dailyRecords, csrfToken } = params;

    const currentTenant = tenants.find(t => t.siteKey === selectedClient) || tenants[0];
    const clientKey = currentTenant ? currentTenant.siteKey : 'colbolt_live';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AceOne Solutions — AI Commerce Multi-Tenant Control Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f19;
      --sidebar: #090d16;
      --card: #111827;
      --card-hover: #162032;
      --border: #1f2937;
      --border-focus: #3b82f6;
      --primary: #2563eb;
      --primary-gradient: linear-gradient(135deg, #2563eb, #38bdf8);
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --font: 'Plus Jakarta Sans', sans-serif;
      --mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font);
      height: 100vh;
      overflow: hidden;
      display: flex;
    }

    /* SIDEBAR */
    .sidebar {
      width: 280px;
      background: var(--sidebar);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 100vh;
      user-select: none;
    }
    .sidebar-brand {
      padding: 20px 22px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo {
      height: 38px;
      max-width: 140px;
      object-fit: contain;
    }
    .brand-text {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: -0.3px;
      color: #fff;
    }
    .brand-sub {
      font-size: 11px;
      color: var(--text-muted);
    }
    .sidebar-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 18px 14px;
    }
    .nav-label {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 10px 10px 6px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 8px;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.15s;
      margin-bottom: 3px;
      cursor: pointer;
    }
    .nav-item:hover {
      background: #1e293b;
      color: #fff;
    }
    .nav-item.active {
      background: rgba(37, 99, 235, 0.15);
      color: #60a5fa;
      border: 1px solid rgba(37, 99, 235, 0.3);
    }
    .nav-sub-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px 8px 30px;
      border-radius: 8px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.15s;
      margin-bottom: 2px;
    }
    .nav-sub-item:hover {
      background: #1e293b;
      color: #fff;
    }
    .nav-sub-item.active {
      background: #1e293b;
      color: #38bdf8;
      font-weight: 700;
    }
    .client-badge-sm {
      background: rgba(59, 130, 246, 0.15);
      color: #93c5fd;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-family: var(--mono);
    }
    .btn-add-client {
      background: rgba(16, 185, 129, 0.15);
      border: 1px dashed rgba(16, 185, 129, 0.4);
      color: #34d399;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-add-client:hover {
      background: rgba(16, 185, 129, 0.25);
    }
    .sidebar-footer {
      padding: 14px 16px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #080c14;
    }
    .admin-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 600;
      color: #e2e8f0;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
    }
    .btn-icon-logout {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-muted);
      border-radius: 8px;
      padding: 6px 10px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }
    .btn-icon-logout:hover {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
    }

    /* MAIN CONTENT VIEWPORT */
    .main-viewport {
      flex: 1;
      height: 100vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    .topbar {
      padding: 16px 28px;
      border-bottom: 1px solid var(--border);
      background: rgba(17, 24, 39, 0.7);
      backdrop-filter: blur(12px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 20;
    }
    .topbar-title {
      font-size: 17px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .topbar-badges {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      background: #1e293b;
      border: 1px solid var(--border);
      color: #cbd5e1;
    }
    .badge.success {
      background: rgba(16, 185, 129, 0.12);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.25);
    }

    .content-area {
      padding: 28px;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }

    /* STATS KPI CARDS */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }
    .stat-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 18px 20px;
      transition: border 0.2s;
    }
    .stat-card:hover {
      border-color: #374151;
    }
    .stat-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: 6px;
    }
    .stat-number {
      font-size: 26px;
      font-weight: 800;
      color: #fff;
      line-height: 1.1;
      margin-bottom: 4px;
    }
    .stat-sub {
      font-size: 12px;
      color: #64748b;
    }

    /* CHATBOT WORKSPACE SPLIT */
    .workspace-split {
      display: grid;
      grid-template-columns: 460px 1fr;
      gap: 24px;
    }
    @media (max-width: 1100px) {
      .workspace-split { grid-template-columns: 1fr; }
    }

    /* PLAYGROUND CONTAINER */
    .playground-box {
      background: #080c14;
      border: 1px solid var(--border);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      height: 680px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }
    .playground-header {
      padding: 14px 18px;
      background: var(--card);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .playground-header-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .playground-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #2563eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
    }
    .playground-title {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
    }
    .playground-messages {
      flex: 1;
      padding: 18px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .msg-bubble {
      max-width: 82%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.5;
      word-wrap: break-word;
    }
    .msg-bubble.bot {
      align-self: flex-start;
      background: #1e293b;
      color: #f1f5f9;
      border: 1px solid #334155;
    }
    .msg-bubble.user {
      align-self: flex-end;
      background: var(--primary);
      color: #fff;
    }
    .playground-cards {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding: 8px 0;
    }
    .p-card {
      min-width: 170px;
      max-width: 170px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 10px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
    }
    .p-card img {
      width: 100%;
      height: 90px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 6px;
    }
    .p-card-title {
      font-weight: 700;
      margin-bottom: 4px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .p-card-price {
      color: #38bdf8;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .p-card-btn {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 5px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
    }
    .playground-input-bar {
      padding: 12px 14px;
      border-top: 1px solid var(--border);
      background: #0d131f;
      display: flex;
      gap: 10px;
    }
    .playground-input {
      flex: 1;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 10px 14px;
      color: #fff;
      font-size: 13px;
      outline: none;
    }
    .playground-input:focus {
      border-color: var(--primary);
    }
    .btn-send {
      background: var(--primary);
      color: #fff;
      border: none;
      padding: 0 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    /* CONFIG & STYLING EDITOR */
    .editor-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
    }
    .editor-section-title {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 20px;
    }
    .form-col-full {
      grid-column: span 2;
    }
    .field-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 6px;
    }
    .field-input, .field-textarea {
      width: 100%;
      background: #090d16;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 14px;
      color: #fff;
      font-size: 13px;
      outline: none;
      font-family: inherit;
    }
    .field-input:focus, .field-textarea:focus {
      border-color: var(--primary);
    }
    .color-picker-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .color-swatch {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid var(--border);
      cursor: pointer;
      padding: 0;
      background: transparent;
    }
    .btn-action-primary {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #fff;
      border: none;
      padding: 11px 22px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .btn-action-primary:hover {
      opacity: 0.95;
      transform: translateY(-1px);
    }
    .btn-action-danger {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      padding: 9px 16px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-action-danger:hover {
      background: rgba(239, 68, 68, 0.25);
    }
    .wp-box {
      margin-top: 24px;
      background: #090d16;
      border: 1px solid var(--border);
      border-left: 4px solid var(--primary);
      border-radius: 10px;
      padding: 16px 20px;
    }

    /* AUDIT & LOGS TABLE */
    .filter-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 14px;
    }
    .filter-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .table-container {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    th {
      text-align: left;
      padding: 12px 16px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #0d131f;
    }
    td {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      vertical-align: top;
    }
    tr:last-child td { border-bottom: none; }
    .q-box {
      font-weight: 600;
      color: #fff;
      margin-bottom: 4px;
    }
    .a-box {
      color: #94a3b8;
      font-size: 12px;
      line-height: 1.5;
      white-space: pre-line;
      max-height: 120px;
      overflow-y: auto;
    }

    /* CONFIRMATION MODAL ("ARE YOU SURE?") */
    .modal-backdrop {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-card {
      width: 100%;
      max-width: 480px;
      background: #0f172a;
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 28px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.6);
      animation: popIn 0.2s ease-out;
    }
    @keyframes popIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .modal-title {
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
    }
    .modal-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn-secondary {
      background: #1e293b;
      border: 1px solid #334155;
      color: #e2e8f0;
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <!-- SIDEBAR NAVIGATION -->
  <aside class="sidebar">
    <div class="sidebar-brand">
      <img src="/aceone-logo.png" alt="AceOne Solutions" class="brand-logo" onerror="this.onerror=null; this.src='/static/assistance.gif';">
      <div>
        <div class="brand-text">AceOne Hub</div>
        <div class="brand-sub">AI Commerce Engine</div>
      </div>
    </div>

    <div class="sidebar-scroll">
      <!-- GENERAL NAVIGATION -->
      <a href="/admin?view=overview" class="nav-item ${activeTab === 'overview' ? 'active' : ''}">
        <span>📊</span> Dashboard Overview
      </a>

      <!-- CHATBOTS SECTION -->
      <div class="nav-label" style="margin-top: 14px;">
        <span>🤖 Client Chatbots</span>
        <button class="btn-add-client" onclick="openNewClientModal()">+ New</button>
      </div>
      ${tenants.map(t => `
        <a href="/admin?view=chatbot&client=${t.siteKey}" class="nav-sub-item ${activeTab === 'chatbot' && selectedClient === t.siteKey ? 'active' : ''}">
          <span>📁 ${t.brand?.companyName || t.siteKey}</span>
          <span class="client-badge-sm">${t.siteKey.substring(0, 8)}</span>
        </a>
      `).join('')}

      <!-- USAGE PER USER SECTION -->
      <div class="nav-label" style="margin-top: 16px;">
        <span>📈 Usage Per User</span>
      </div>
      ${tenants.map(t => `
        <a href="/admin?view=usage&client=${t.siteKey}" class="nav-sub-item ${activeTab === 'usage' && selectedClient === t.siteKey ? 'active' : ''}">
          <span>📊 ${t.brand?.companyName || t.siteKey}</span>
          <span class="client-badge-sm">Usage</span>
        </a>
      `).join('')}

      <!-- SETTINGS -->
      <div class="nav-label" style="margin-top: 16px;">
        <span>⚙️ Security & Admin</span>
      </div>
      <a href="/admin?view=settings" class="nav-item ${activeTab === 'settings' ? 'active' : ''}">
        <span>🔒</span> Settings & Password
      </a>
    </div>

    <!-- SIDEBAR FOOTER -->
    <div class="sidebar-footer">
      <div class="admin-pill">
        <span class="status-dot"></span>
        <span>admin</span>
      </div>
      <button class="btn-icon-logout" onclick="confirmLogout()">Logout ⎋</button>
    </div>
  </aside>

  <!-- MAIN VIEWPORT -->
  <main class="main-viewport">
    <header class="topbar">
      <div class="topbar-title">
        ${activeTab === 'overview' ? '📊 System Performance & Overview' : ''}
        ${activeTab === 'chatbot' ? `🤖 Chatbot Workspace: <span style="color: #60a5fa;">${currentTenant?.brand?.companyName || clientKey}</span>` : ''}
        ${activeTab === 'usage' ? `📈 Usage & Token Analytics: <span style="color: #38bdf8;">${currentTenant?.brand?.companyName || clientKey}</span>` : ''}
        ${activeTab === 'settings' ? '🔒 Master Security & Admin Settings' : ''}
      </div>

      <div class="topbar-badges">
        <span class="badge success">● Live: api.hawksnfox.com</span>
        <span class="badge">Groq Cloud (14.4k/day)</span>
        <span class="badge">AceOne Shield v2.4</span>
      </div>
    </header>

    <div class="content-area">
      <!-- 1. OVERVIEW TAB -->
      ${activeTab === 'overview' ? `
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-label">Active Client Workspaces</div>
            <div class="stat-number">${tenants.length}</div>
            <div class="stat-sub">Multi-tenant isolated</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Today's Messages (${stats.today.date})</div>
            <div class="stat-number">${stats.today.messages}</div>
            <div class="stat-sub">~${stats.today.tokens.toLocaleString()} tokens</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">This Month's Usage</div>
            <div class="stat-number">${stats.thisMonth.messages}</div>
            <div class="stat-sub">~${stats.thisMonth.tokens.toLocaleString()} tokens</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Lifetime Platform Turns</div>
            <div class="stat-number">${stats.allTime.totalMessages}</div>
            <div class="stat-sub">Total: ${stats.allTime.totalTokens.toLocaleString()} tokens</div>
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Company / Tenant</th>
                <th>Site Key</th>
                <th>Store URL</th>
                <th>This Month Usage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${tenants.map(t => `
                <tr>
                  <td><strong>${t.brand?.companyName || t.siteKey}</strong></td>
                  <td><code>${t.siteKey}</code></td>
                  <td><a href="${t.commerce?.woocommerce?.storeUrl || '#'}" target="_blank" style="color: #60a5fa; text-decoration: none;">${t.commerce?.woocommerce?.storeUrl || 'N/A'}</a></td>
                  <td><span class="client-badge-sm">Active</span></td>
                  <td>
                    <a href="/admin?view=chatbot&client=${t.siteKey}" class="btn-action-primary" style="padding: 5px 10px; font-size: 11px;">Customize & Test ↗</a>
                    <a href="/admin?view=usage&client=${t.siteKey}" class="btn-secondary" style="padding: 5px 10px; font-size: 11px; margin-left: 6px; text-decoration: none;">Usage 📊</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- 2. CHATBOT WORKSPACE TAB -->
      ${activeTab === 'chatbot' ? `
        <div style="margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
          <a href="/admin?view=overview" class="btn-secondary" style="text-decoration: none;">← Back to All Clients</a>
          <div>
            <span style="font-size: 12px; color: var(--text-muted); margin-right: 12px;">Client: <strong>${currentTenant.siteKey}</strong></span>
            <button class="btn-action-danger" onclick="confirmDeleteTenant('${currentTenant.siteKey}')">Delete Client</button>
          </div>
        </div>

        <div class="workspace-split">
          <!-- LEFT: LIVE INTERACTIVE TEST PLAYGROUND -->
          <div class="playground-box">
            <div class="playground-header">
              <div class="playground-header-info">
                <div class="playground-avatar" style="background: ${currentTenant.brand?.primaryColor || '#2563eb'};">
                  ${(currentTenant.brand?.assistantName || 'AI')[0]}
                </div>
                <div>
                  <div class="playground-title">${currentTenant.brand?.assistantName || 'COLBOLT.'}</div>
                  <div style="font-size: 11px; color: #10b981;">● Live Test Bed</div>
                </div>
              </div>
              <button class="btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="clearPlaygroundChat()">Clear Chat</button>
            </div>

            <div class="playground-messages" id="playMessages">
              <div class="msg-bubble bot">
                ${currentTenant.brand?.welcomeMessage || 'Hello! How can I help you today?'}
              </div>
            </div>

            <div class="playground-input-bar">
              <input type="text" id="playInput" class="playground-input" placeholder="Type test message (e.g. Salam, Semaglutide 5mg, shipping)..." onkeydown="if(event.key==='Enter') sendTestMsg()">
              <button class="btn-send" onclick="sendTestMsg()">Send</button>
            </div>
          </div>

          <!-- RIGHT: LIVE CONFIG & STYLING CUSTOMIZER -->
          <div class="editor-card">
            <div class="editor-section-title">🎨 Chatbot Branding, Styling & Store Adapter</div>
            <form id="tenantConfigForm" onsubmit="event.preventDefault(); confirmSaveConfig();">
              <input type="hidden" name="siteKey" value="${currentTenant.siteKey}">

              <div class="form-grid">
                <div>
                  <label class="field-label">Company / Brand Name</label>
                  <input type="text" class="field-input" id="cfgCompanyName" value="${currentTenant.brand?.companyName || ''}" required>
                </div>
                <div>
                  <label class="field-label">Assistant Name</label>
                  <input type="text" class="field-input" id="cfgAssistantName" value="${currentTenant.brand?.assistantName || ''}" required>
                </div>

                <div>
                  <label class="field-label">Primary Brand Color</label>
                  <div class="color-picker-group">
                    <input type="color" class="color-swatch" id="cfgColorPicker" value="${currentTenant.brand?.primaryColor || '#16408a'}" oninput="document.getElementById('cfgColorHex').value = this.value">
                    <input type="text" class="field-input" id="cfgColorHex" value="${currentTenant.brand?.primaryColor || '#16408a'}" oninput="document.getElementById('cfgColorPicker').value = this.value">
                  </div>
                </div>

                <div>
                  <label class="field-label">Secondary Color</label>
                  <div class="color-picker-group">
                    <input type="color" class="color-swatch" id="cfgSecPicker" value="${currentTenant.brand?.secondaryColor || '#248acc'}" oninput="document.getElementById('cfgSecHex').value = this.value">
                    <input type="text" class="field-input" id="cfgSecHex" value="${currentTenant.brand?.secondaryColor || '#248acc'}" oninput="document.getElementById('cfgSecPicker').value = this.value">
                  </div>
                </div>

                <div class="form-col-full">
                  <label class="field-label">WooCommerce Store URL</label>
                  <input type="text" class="field-input" id="cfgStoreUrl" value="${currentTenant.commerce?.woocommerce?.storeUrl || ''}">
                </div>

                <div class="form-col-full">
                  <label class="field-label">Welcome Message</label>
                  <textarea rows="3" class="field-textarea" id="cfgWelcome">${currentTenant.brand?.welcomeMessage || ''}</textarea>
                </div>

                <div class="form-col-full">
                  <label class="field-label">Suggested Questions (Chips, comma separated)</label>
                  <input type="text" class="field-input" id="cfgQuestions" value="${(currentTenant.brand?.suggestedQuestions || []).join(', ')}">
                </div>

                <div class="form-col-full">
                  <label class="field-label">AI System Prompt Override (Rules, tone, disclaimers)</label>
                  <textarea rows="4" class="field-textarea" id="cfgPrompt">${currentTenant.ai?.systemPromptOverride || ''}</textarea>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 18px;">
                <span id="saveStatus" style="font-size: 12px; color: #10b981;"></span>
                <button type="submit" class="btn-action-primary">💾 Save Configuration</button>
              </div>
            </form>

            <!-- WORDPRESS INTEGRATION INSTRUCTIONS -->
            <div class="wp-box">
              <div style="font-weight: 700; font-size: 13px; color: #fff; margin-bottom: 6px;">🔌 WordPress Integration Details for ${currentTenant.brand?.companyName || currentTenant.siteKey}:</div>
              <div style="font-size: 12px; color: #cbd5e1; margin-bottom: 10px;">To connect this chatbot to the client's WordPress site, install the plugin and use these exact settings:</div>
              <div style="display: flex; gap: 14px; flex-wrap: wrap;">
                <div><strong>Backend API URL:</strong> <code>https://api.hawksnfox.com</code></div>
                <div><strong>Site Key:</strong> <code>${currentTenant.siteKey}</code></div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 3. USAGE PER USER TAB -->
      ${activeTab === 'usage' ? `
        <div style="margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
          <a href="/admin?view=overview" class="btn-secondary" style="text-decoration: none;">← Back to Overview</a>
          <span style="font-size: 13px; color: var(--text-muted);">Client Workspace: <strong>${clientKey}</strong></span>
        </div>

        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-label">Today's Turns (${stats.today.date})</div>
            <div class="stat-number">${stats.today.messages}</div>
            <div class="stat-sub">${stats.today.tokens.toLocaleString()} tokens</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">This Month (${stats.thisMonth.month})</div>
            <div class="stat-number">${stats.thisMonth.messages}</div>
            <div class="stat-sub">${stats.thisMonth.tokens.toLocaleString()} tokens</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">All-Time Consumption</div>
            <div class="stat-number">${stats.allTime.totalMessages}</div>
            <div class="stat-sub">${stats.allTime.totalTokens.toLocaleString()} tokens</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Est. Cost (USD)</div>
            <div class="stat-number">$${(stats.allTime.totalTokens * 0.0000005).toFixed(3)}</div>
            <div class="stat-sub">Groq Free Tier ($0.00 actual)</div>
          </div>
        </div>

        <!-- DATE FILTER CONTROLS -->
        <div class="filter-bar">
          <div class="filter-group">
            <span style="font-size: 12px; font-weight: 700; color: var(--text-muted);">FILTER BY DATE:</span>
            <input type="date" id="filterFromDate" class="field-input" style="width: 150px; padding: 6px 10px;">
            <span style="color: var(--text-muted); font-size: 12px;">to</span>
            <input type="date" id="filterToDate" class="field-input" style="width: 150px; padding: 6px 10px;">
            <button class="btn-secondary" onclick="applyDateFilter()">Apply Filter</button>
            <button class="btn-secondary" onclick="resetDateFilter()">Reset</button>
          </div>

          <div class="filter-group">
            <input type="text" id="auditSearch" class="field-input" placeholder="Search questions & answers..." style="width: 260px; padding: 6px 12px;" oninput="filterAuditTable()">
          </div>
        </div>

        <!-- DAILY TOKEN CONSUMPTION BREAKDOWN -->
        <div class="table-container" style="margin-bottom: 28px;">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Conversation Turns</th>
                <th>Tokens Consumed</th>
                <th>Estimated Cost ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="dailyTableBody">
              ${dailyRecords.map(r => `
                <tr>
                  <td><strong>${r.date}</strong></td>
                  <td>${r.messages} turns</td>
                  <td>~${r.tokens.toLocaleString()}</td>
                  <td>$${r.estimatedCostUsd.toFixed(4)}</td>
                  <td><span class="client-badge-sm" style="color: #34d399;">Recorded</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- SEARCHABLE CUSTOMER Q&A AUDIT LOG -->
        <div class="editor-section-title">💬 Live Customer Q&A Audit Log (${clientKey})</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="width: 160px;">Timestamp</th>
                <th style="width: 250px;">Customer Query</th>
                <th>AI Response</th>
                <th style="width: 200px;">Attached Cards</th>
              </tr>
            </thead>
            <tbody id="auditTableBody">
              ${auditLogs.length > 0 ? auditLogs.map(l => `
                <tr class="audit-row">
                  <td style="font-family: var(--mono); font-size: 11px; color: var(--text-muted);">${l.timestamp}<br><span style="color:#64748b;">${l.latency}</span></td>
                  <td><div class="q-box">"${l.userAsked}"</div></td>
                  <td><div class="a-box">${l.botReplied}</div></td>
                  <td style="font-size: 11px; color: #38bdf8;">${l.cardsAttached}</td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 24px;">No customer conversation records found for this period.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- 4. SETTINGS & SECURITY TAB -->
      ${activeTab === 'settings' ? `
        <div class="workspace-split">
          <div class="editor-card">
            <div class="editor-section-title">🔒 Master Admin Password Update</div>
            <form onsubmit="event.preventDefault(); confirmPasswordChange();">
              <div class="form-group" style="margin-bottom: 14px;">
                <label class="field-label">Current Master Password</label>
                <input type="password" id="currPass" class="field-input" required>
              </div>
              <div class="form-group" style="margin-bottom: 14px;">
                <label class="field-label">New Password (Min 8 characters)</label>
                <input type="password" id="newPass" class="field-input" required minlength="8">
              </div>
              <div class="form-group" style="margin-bottom: 20px;">
                <label class="field-label">Confirm New Password</label>
                <input type="password" id="confirmPass" class="field-input" required minlength="8">
              </div>
              <button type="submit" class="btn-action-primary">Update Master Password</button>
              <div id="passMsg" style="margin-top: 10px; font-size: 12px;"></div>
            </form>
          </div>

          <div class="editor-card">
            <div class="editor-section-title">🛡️ Security Diagnostics & AI Provider Status</div>
            <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13px;">
              <div class="wp-box" style="margin-top: 0;">
                <div><strong>Primary AI Provider:</strong> Groq Cloud API (Llama 3.3 70B & GPT-OSS 120B)</div>
                <div><strong>Daily Free Limit:</strong> 14,400 Requests per day</div>
                <div><strong>Secondary Provider:</strong> OpenRouter Failover Active</div>
                <div><strong>Local Knowledge Fallback:</strong> Multi-layer Intelligent Zero-Dumb Engine</div>
              </div>

              <div class="wp-box" style="margin-top: 0; border-left-color: #10b981;">
                <div><strong>Brute Force Shield:</strong> 5 Max Attempts $\rightarrow$ 15-min IP lock</div>
                <div><strong>Password Encryption:</strong> PBKDF2 (100,000 Iterations SHA-512 + Salt)</div>
                <div><strong>Session Policy:</strong> HttpOnly, SameSite=Strict, 24-hr Expiry</div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  </main>

  <!-- UNIVERSAL "ARE YOU SURE?" CONFIRMATION MODAL -->
  <div class="modal-backdrop" id="confirmModal">
    <div class="modal-card">
      <div class="modal-title" id="modalTitle">⚠️ Confirm Action</div>
      <div class="modal-desc" id="modalDesc">Are you sure you want to proceed with this action?</div>
      <div class="modal-actions">
        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn-action-primary" id="modalConfirmBtn">Yes, Proceed</button>
      </div>
    </div>
  </div>

  <!-- CREATE NEW CLIENT MODAL -->
  <div class="modal-backdrop" id="newClientModal">
    <div class="modal-card" style="max-width: 520px;">
      <div class="modal-title">➕ Add New Client Workspace</div>
      <div class="modal-desc">Create a new isolated client tenant folder with full branding and WooCommerce adapter.</div>
      <form onsubmit="event.preventDefault(); submitCreateClient();">
        <div class="form-group" style="margin-bottom: 12px;">
          <label class="field-label">Client / Company Name</label>
          <input type="text" id="newClientName" class="field-input" placeholder="e.g. Moltyfoam" required>
        </div>
        <div class="form-group" style="margin-bottom: 12px;">
          <label class="field-label">Site Key (Unique Identifier)</label>
          <input type="text" id="newClientKey" class="field-input" placeholder="e.g. moltyfoam_live" required>
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label class="field-label">WooCommerce Store URL</label>
          <input type="text" id="newClientUrl" class="field-input" placeholder="https://moltyfoam.com.pk">
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="document.getElementById('newClientModal').style.display = 'none';">Cancel</button>
          <button type="submit" class="btn-action-primary">Create Client Folder</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    const currentSiteKey = '${clientKey}';

    // MODAL HANDLERS
    let pendingConfirmAction = null;

    function showConfirmModal(title, desc, actionFn) {
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalDesc').textContent = desc;
      pendingConfirmAction = actionFn;
      document.getElementById('modalConfirmBtn').onclick = () => {
        closeModal();
        if (typeof pendingConfirmAction === 'function') pendingConfirmAction();
      };
      document.getElementById('confirmModal').style.display = 'flex';
    }

    function closeModal() {
      document.getElementById('confirmModal').style.display = 'none';
      pendingConfirmAction = null;
    }

    function confirmLogout() {
      showConfirmModal(
        'Confirm Admin Logout',
        'Are you sure you want to log out of the AceOne Solutions Admin Hub?',
        () => {
          fetch('/api/admin/logout', { method: 'POST' }).then(() => {
            window.location.href = '/admin/login';
          });
        }
      );
    }

    function confirmSaveConfig() {
      showConfirmModal(
        'Confirm Configuration Save',
        'Are you sure you want to update live settings for client: ' + currentSiteKey + '? Changes take effect immediately.',
        saveConfigExecution
      );
    }

    function saveConfigExecution() {
      const payload = {
        siteKey: currentSiteKey,
        companyName: document.getElementById('cfgCompanyName').value,
        assistantName: document.getElementById('cfgAssistantName').value,
        primaryColor: document.getElementById('cfgColorHex').value,
        secondaryColor: document.getElementById('cfgSecHex').value,
        storeUrl: document.getElementById('cfgStoreUrl').value,
        welcomeMessage: document.getElementById('cfgWelcome').value,
        suggestedQuestions: document.getElementById('cfgQuestions').value.split(',').map(s=>s.trim()).filter(Boolean),
        promptOverride: document.getElementById('cfgPrompt').value
      };

      const statusEl = document.getElementById('saveStatus');
      statusEl.textContent = 'Saving...';
      fetch('/api/admin/tenants/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json()).then(d => {
        if (d.success) {
          statusEl.textContent = '✅ Saved successfully!';
          setTimeout(() => statusEl.textContent = '', 3000);
        } else {
          statusEl.textContent = '❌ Error: ' + (d.error || 'Failed');
        }
      });
    }

    function openNewClientModal() {
      document.getElementById('newClientModal').style.display = 'flex';
    }

    function submitCreateClient() {
      const name = document.getElementById('newClientName').value.trim();
      const siteKey = document.getElementById('newClientKey').value.trim();
      const storeUrl = document.getElementById('newClientUrl').value.trim();

      document.getElementById('newClientModal').style.display = 'none';

      showConfirmModal(
        'Confirm New Client Creation',
        'Are you sure you want to initialize new client tenant: ' + name + ' (' + siteKey + ')?',
        () => {
          fetch('/api/admin/tenants/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyName: name, siteKey, storeUrl })
          }).then(r => r.json()).then(d => {
            if (d.success) {
              window.location.href = '/admin?view=chatbot&client=' + d.tenant.siteKey;
            } else {
              alert('Error creating client: ' + (d.error || 'Unknown error'));
            }
          });
        }
      );
    }

    function confirmDeleteTenant(siteKey) {
      showConfirmModal(
        'Confirm Client Deletion',
        '⚠️ DANGER: Are you sure you want to delete client workspace: ' + siteKey + '? All client files will be permanently removed.',
        () => {
          fetch('/api/admin/tenants/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ siteKey })
          }).then(r => r.json()).then(d => {
            if (d.success) {
              window.location.href = '/admin?view=overview';
            } else {
              alert('Error: ' + d.error);
            }
          });
        }
      );
    }

    function confirmPasswordChange() {
      showConfirmModal(
        'Confirm Password Change',
        'Are you sure you want to change the Master Admin password? You will need the new password for future logins.',
        () => {
          const currentPass = document.getElementById('currPass').value;
          const newPass = document.getElementById('newPass').value;
          const confirmPass = document.getElementById('confirmPass').value;
          const msgEl = document.getElementById('passMsg');

          fetch('/api/admin/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPass, newPass, confirmPass })
          }).then(r => r.json()).then(d => {
            if (d.success) {
              msgEl.style.color = '#10b981';
              msgEl.textContent = '✅ Password successfully updated!';
              document.getElementById('currPass').value = '';
              document.getElementById('newPass').value = '';
              document.getElementById('confirmPass').value = '';
            } else {
              msgEl.style.color = '#ef4444';
              msgEl.textContent = '❌ ' + (d.error || 'Failed to update');
            }
          });
        }
      );
    }

    // PLAYGROUND TEST ENGINE
    const playConvId = 'admin-test-' + Date.now();

    function sendTestMsg() {
      const input = document.getElementById('playInput');
      const text = input.value.trim();
      if (!text) return;

      appendPlayBubble('user', text);
      input.value = '';

      fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteKey: currentSiteKey, message: text, conversationId: playConvId })
      }).then(r => r.json()).then(d => {
        appendPlayBubble('bot', d.message, d.productCards);
      }).catch(e => {
        appendPlayBubble('bot', 'Error contacting backend: ' + e);
      });
    }

    function appendPlayBubble(role, text, cards) {
      const box = document.getElementById('playMessages');
      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble ' + role;
      bubble.textContent = text;
      box.appendChild(bubble);

      if (cards && cards.length > 0) {
        const cBox = document.createElement('div');
        cBox.className = 'playground-cards';
        cards.forEach(c => {
          const cardEl = document.createElement('div');
          cardEl.className = 'p-card';
          cardEl.innerHTML = \`
            <img src="\${c.featuredImage || '/static/assistance.gif'}" onerror="this.onerror=null; this.src='/static/assistance.gif';">
            <div class="p-card-title">\${c.title}</div>
            <div class="p-card-price">\${c.price?.formatted || '$' + c.price?.regular}</div>
            <button class="p-card-btn" onclick="alert('Cart simulation: Added ' + '\${c.title}')">Add to Cart</button>
          \`;
          cBox.appendChild(cardEl);
        });
        box.appendChild(cBox);
      }
      box.scrollTop = box.scrollHeight;
    }

    function clearPlaygroundChat() {
      document.getElementById('playMessages').innerHTML = '<div class="msg-bubble bot">Chat history cleared. You can start a new test turn!</div>';
    }

    // DATE FILTERING IN USAGE TAB
    function applyDateFilter() {
      const from = document.getElementById('filterFromDate').value;
      const to = document.getElementById('filterToDate').value;
      if (!from && !to) return;
      window.location.href = '/admin?view=usage&client=' + currentSiteKey + '&from=' + from + '&to=' + to;
    }

    function resetDateFilter() {
      window.location.href = '/admin?view=usage&client=' + currentSiteKey;
    }

    function filterAuditTable() {
      const term = document.getElementById('auditSearch').value.toLowerCase();
      const rows = document.querySelectorAll('.audit-row');
      rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        r.style.display = text.includes(term) ? '' : 'none';
      });
    }
  </script>
</body>
</html>`;
  }
}
