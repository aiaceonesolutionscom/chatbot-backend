import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { TenantStore } from './modules/tenant/tenant.store.js';
import { ConversationEngine } from './modules/ai/conversation.engine.js';
import { CommerceAdapterFactory } from './modules/commerce/adapter.factory.js';
import { AppLogger } from './utils/logger.js';
import { UsageTracker } from './modules/analytics/usage.tracker.js';

// Load .env using Node's built-in env loader if present
if (typeof (process as any).loadEnvFile === 'function') {
  try {
    (process as any).loadEnvFile(path.resolve(process.cwd(), '.env'));
  } catch (e) {
    try { (process as any).loadEnvFile(); } catch (err) {}
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize tenant configurations (including Colbolt live store)
TenantStore.initializeDefaults();

export async function buildServer(): Promise<FastifyInstance> {
  const server = Fastify({
    logger: true,
    trustProxy: true
  });

  // Security: CORS dynamically checked against tenant's allowed origins
  await server.register(cors, {
    origin: (origin, cb) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return cb(null, true);

      // Check if origin matches any tenant's allowed origins
      const allTenants = TenantStore.listAll();
      const isAllowed = allTenants.some(t => 
        t.allowedOrigins.includes(origin) ||
        t.allowedOrigins.some(ao => ao.includes('*') && new RegExp('^' + ao.replace(/\*/g, '.*') + '$').test(origin))
      );

      if (isAllowed || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return cb(null, true);
      }

      // Allow colbolt origin unconditionally
      if (origin.includes('colbolt.hawksnfox.com')) {
        return cb(null, true);
      }

      cb(new Error(`Origin ${origin} not allowed by CORS`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
  });

  // Security: Rate limiting per IP to prevent spam and abuse
  await server.register(rateLimit, {
    max: 60, // 60 requests per minute
    timeWindow: '1 minute'
  });

  // Serve static widget file if built
  const widgetDistPath = path.resolve(__dirname, '../../widget/dist');
  if (fs.existsSync(widgetDistPath)) {
    await server.register(fastifyStatic, {
      root: widgetDistPath,
      prefix: '/static/'
    });
  }

  // Serve demo storefront
  const demoPath = path.resolve(__dirname, '../../../demo');
  if (fs.existsSync(demoPath)) {
    server.get('/', async (_req, reply) => {
      const html = fs.readFileSync(path.join(demoPath, 'index.html'), 'utf-8');
      reply.header('Content-Type', 'text/html; charset=utf-8');
      return reply.send(html);
    });

    server.get('/demo', async (_req, reply) => {
      const html = fs.readFileSync(path.join(demoPath, 'index.html'), 'utf-8');
      reply.header('Content-Type', 'text/html; charset=utf-8');
      return reply.send(html);
    });
  }
  server.get('/api/health', async () => {
    return {
      status: 'healthy',
      service: 'universal-ai-commerce-chatbot',
      tenantsCount: TenantStore.listAll().length,
      timestamp: new Date().toISOString()
    };
  });

  // Standalone Multi-Client Admin & Analytics Dashboard: /admin
  server.get('/admin', async (req: FastifyRequest, reply: FastifyReply) => {
    const tenants = TenantStore.listAll();
    const query = req.query as { siteKey?: string };
    const currentSiteKey = query.siteKey || tenants[0]?.siteKey || 'colbolt_live';
    const currentStats = UsageTracker.getTenantStats(currentSiteKey);
    const currentTenant = TenantStore.getBySiteKey(currentSiteKey);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Universal AI Commerce Platform — Admin & Analytics</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f19;
      --card-bg: #111827;
      --border: #1f2937;
      --text: #f9fafb;
      --text-muted: #9ca3af;
      --primary: #3b82f6;
      --success: #10b981;
      --danger: #ef4444;
      --font: 'Plus Jakarta Sans', sans-serif;
      --mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font); padding: 28px; line-height: 1.5; }
    .container { max-width: 1200px; margin: 0 auto; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
    .logo-area { display: flex; align-items: center; gap: 14px; }
    .logo-badge { background: linear-gradient(135deg, #2563eb, #38bdf8); width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; }
    h1 { font-size: 22px; font-weight: 800; }
    .subtitle { color: var(--text-muted); font-size: 13px; }
    .status-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.12); color: #34d399; padding: 6px 14px; border-radius: 30px; font-size: 13px; font-weight: 600; border: 1px solid rgba(16, 185, 129, 0.25); }
    .pulse-dot { width: 8px; height: 8px; background: #34d399; border-radius: 50%; box-shadow: 0 0 10px #34d399; }
    
    .client-selector-bar { background: var(--card-bg); padding: 14px 20px; border-radius: 14px; border: 1px solid var(--border); margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .client-select-group { display: flex; align-items: center; gap: 10px; }
    .select-label { font-size: 13px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
    select.client-dropdown { background: #1f2937; color: #fff; border: 1px solid #374151; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; outline: none; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; margin-bottom: 28px; }
    .stat-card { background: var(--card-bg); padding: 20px; border-radius: 16px; border: 1px solid var(--border); }
    .stat-title { font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .stat-val { font-size: 32px; font-weight: 800; color: #ffffff; line-height: 1.1; margin-bottom: 4px; }
    .stat-sub { font-size: 12px; color: var(--text-muted); }
    .stat-sub.positive { color: #34d399; }

    .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
    @media (max-width: 900px) { .content-grid { grid-template-columns: 1fr; } }
    .panel { background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border); padding: 22px; }
    .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
    .panel-title { font-size: 16px; font-weight: 700; }

    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { text-align: left; padding: 10px 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); font-size: 11px; text-transform: uppercase; }
    td { padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
    tr:last-child td { border-bottom: none; }

    .log-box { background: #080c14; border: 1px solid var(--border); border-radius: 10px; padding: 14px; font-family: var(--mono); font-size: 12px; height: 260px; overflow-y: auto; color: #cbd5e1; white-space: pre-wrap; line-height: 1.6; }
    .btn { background: #2563eb; color: #fff; border: none; padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; text-decoration: none; display: inline-block; }
    .btn:hover { opacity: 0.9; }
    .btn.secondary { background: #1f2937; border: 1px solid #374151; color: #e2e8f0; }

    .tenant-badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo-area">
        <div class="logo-badge">⚡</div>
        <div>
          <h1>Universal AI Commerce Platform</h1>
          <div class="subtitle">Multi-Tenant Management, Usage Metrics & Error Logs</div>
        </div>
      </div>
      <div class="status-pill">
        <span class="pulse-dot"></span>
        Server 24/7 Live
      </div>
    </header>

    <div class="client-selector-bar">
      <div class="client-select-group">
        <span class="select-label">Select Client / Tenant:</span>
        <select class="client-dropdown" onchange="window.location.href='/admin?siteKey=' + this.value">
          ${tenants.map(t => `
            <option value="${t.siteKey}" ${t.siteKey === currentSiteKey ? 'selected' : ''}>
              ${t.brand?.companyName || t.siteKey} (${t.siteKey})
            </option>
          `).join('')}
        </select>
      </div>
      <div>
        <span class="tenant-badge">Tenant ID: ${currentTenant?.tenantId || currentSiteKey}</span>
        <span class="tenant-badge" style="margin-left: 6px;">Commerce: ${currentTenant?.commerce?.type || 'woocommerce'}</span>
      </div>
    </div>

    <!-- AI USAGE STATS CARDS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-title">Today's Usage (Roz Ka)</div>
        <div class="stat-val">${currentStats.today.messages}</div>
        <div class="stat-sub positive">~${currentStats.today.tokens.toLocaleString()} tokens consumed today</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">This Month (Per Mahina)</div>
        <div class="stat-val">${currentStats.thisMonth.messages}</div>
        <div class="stat-sub positive">Month: ${currentStats.thisMonth.month} (~${currentStats.thisMonth.tokens.toLocaleString()} tokens)</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">Total Lifetime Turns</div>
        <div class="stat-val">${currentStats.allTime.totalMessages}</div>
        <div class="stat-sub">Across all conversations</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">Active Clients (Tenants)</div>
        <div class="stat-val">${tenants.length}</div>
        <div class="stat-sub">Zero-interference file isolation</div>
      </div>
    </div>

    <div class="content-grid">
      <!-- 7-DAY USAGE BREAKDOWN -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">📅 7-Day Usage Activity (${currentTenant?.brand?.companyName || currentSiteKey})</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Conversations</th>
              <th>Est. Tokens</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${currentStats.recentDays.map(d => `
              <tr>
                <td><strong>${d.date}</strong></td>
                <td>${d.messages}</td>
                <td>~${d.tokens.toLocaleString()}</td>
                <td><span style="color: ${d.messages > 0 ? '#34d399' : '#64748b'}; font-weight: 600;">${d.messages > 0 ? 'Active' : 'Idle'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- SERVER ERROR & SYSTEM LOGS -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">🛠️ Live Server Logs (${currentSiteKey})</div>
          <div>
            <button class="btn secondary" onclick="loadLogs('error')">Error Log</button>
            <button class="btn" onclick="loadLogs('audit')">💬 Customer Q&A Audit</button>
            <button class="btn secondary" onclick="loadLogs('app')">All Logs</button>
          </div>
        </div>
        <div class="log-box" id="logBox">Loading live logs...</div>
      </div>
    </div>

    <!-- CLIENTS DEPLOYMENT LIST -->
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">👥 Multi-Tenant Client Deployment Status</div>
        <span class="select-label">Add new clients via folder in packages/backend/tenants/</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Site Key</th>
            <th>Allowed Domains</th>
            <th>Store URL</th>
            <th>Monthly Usage</th>
          </tr>
        </thead>
        <tbody>
          ${tenants.map(t => {
            const st = UsageTracker.getTenantStats(t.siteKey);
            return `
              <tr>
                <td><strong>${t.brand?.companyName || t.siteKey}</strong></td>
                <td><code>${t.siteKey}</code></td>
                <td>${t.allowedOrigins.slice(0, 2).join(', ')}</td>
                <td><a href="${t.commerce?.woocommerce?.storeUrl || '#'}" target="_blank" style="color: #60a5fa; text-decoration: none;">${t.commerce?.woocommerce?.storeUrl || 'N/A'}</a></td>
                <td><span class="tenant-badge">${st.thisMonth.messages} msgs</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <script>
    async function loadLogs(type) {
      const box = document.getElementById('logBox');
      box.textContent = 'Fetching ' + type + ' logs...';
      try {
        let endpoint = '/api/logs?key=admin';
        if (type === 'error') endpoint = '/api/logs/errors?key=admin';
        if (type === 'audit') endpoint = '/api/logs/audit?key=admin';
        const res = await fetch(endpoint);
        const text = await res.text();
        box.textContent = text || '(No log entries recorded yet)';
      } catch (e) {
        box.textContent = 'Error loading logs: ' + e;
      }
    }
    // Auto load logs on open
    loadLogs('audit');
  </script>
</body>
</html>`;

    reply.header('Content-Type', 'text/html; charset=utf-8');
    return reply.send(html);
  });

  // Public Tenant Configuration Endpoint (Used by the widget to style itself)
  server.get('/api/tenant/config', async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as { siteKey?: string };
    const headerSiteKey = req.headers['x-site-key'] as string | undefined;
    const siteKey = query.siteKey || headerSiteKey;

    if (!siteKey) {
      return reply.status(400).send({ error: 'Missing siteKey in query or X-Site-Key header' });
    }

    const tenant = TenantStore.getBySiteKey(siteKey);
    if (!tenant) {
      return reply.status(404).send({ error: `Tenant not found for siteKey: ${siteKey}` });
    }

    // Return safe public config (NO SECRETS!)
    return {
      siteKey: tenant.siteKey,
      brand: tenant.brand,
      company: {
        businessName: tenant.company.businessName,
        tagline: tenant.company.tagline,
        aboutUs: tenant.company.aboutUs,
        industry: tenant.company.industry,
        services: tenant.company.services,
        shippingPolicy: tenant.company.shippingPolicy,
        deliveryEstimate: tenant.company.deliveryEstimate,
        faqs: tenant.company.faqs
      },
      commerceType: tenant.commerce.type,
      activeTools: tenant.activeTools
    };
  });

  // Admin Log Viewer Endpoint: /api/logs?key=sec_colbolt_demo_key_2026
  server.get('/api/logs', async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as { key?: string; lines?: string };
    const authKey = query.key || (req.headers['x-admin-key'] as string);

    const allTenants = TenantStore.listAll();
    const isValid = allTenants.some(t => t.secretApiKey === authKey) || authKey === process.env.ADMIN_KEY || authKey === 'admin';
    if (!isValid) {
      return reply.status(401).send({ error: 'Unauthorized. Please provide ?key=<secretApiKey>' });
    }

    const linesCount = parseInt(query.lines || '80', 10);
    const logs = AppLogger.getRecentLogs(linesCount);
    reply.header('Content-Type', 'text/plain; charset=utf-8');
    return reply.send(logs.join('\n'));
  });

  // Admin Error Log Viewer Endpoint: /api/logs/errors?key=sec_colbolt_demo_key_2026
  server.get('/api/logs/errors', async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as { key?: string; lines?: string };
    const authKey = query.key || (req.headers['x-admin-key'] as string);

    const allTenants = TenantStore.listAll();
    const isValid = allTenants.some(t => t.secretApiKey === authKey) || authKey === process.env.ADMIN_KEY || authKey === 'admin';
    if (!isValid) {
      return reply.status(401).send({ error: 'Unauthorized. Please provide ?key=<secretApiKey>' });
    }

    const linesCount = parseInt(query.lines || '80', 10);
    const errors = AppLogger.getRecentErrors(linesCount);
    reply.header('Content-Type', 'text/plain; charset=utf-8');
    return reply.send(errors.join('\n'));
  });

  // Admin Chat Audit & User Questions Endpoint (Used to review customer questions and upgrade the bot!):
  // GET /api/logs/audit?key=sec_colbolt_demo_key_2026
  server.get('/api/logs/audit', async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as { key?: string; blocks?: string };
    const authKey = query.key || (req.headers['x-admin-key'] as string);

    const allTenants = TenantStore.listAll();
    const isValid = allTenants.some(t => t.secretApiKey === authKey) || authKey === process.env.ADMIN_KEY || authKey === 'admin';
    if (!isValid) {
      return reply.status(401).send({ error: 'Unauthorized. Please provide ?key=<secretApiKey>' });
    }

    const blocksCount = parseInt(query.blocks || '25', 10);
    const audits = AppLogger.getRecentAudits(blocksCount);
    reply.header('Content-Type', 'text/plain; charset=utf-8');
    return reply.send(audits);
  });

  // Client AI Usage Endpoint (Used by WordPress Admin & Admin Dashboard):
  // GET /api/analytics/usage?siteKey=colbolt_live
  server.get('/api/analytics/usage', async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as { siteKey?: string };
    const siteKey = query.siteKey || 'colbolt_live';
    const tenant = TenantStore.getBySiteKey(siteKey);

    const stats = UsageTracker.getTenantStats(siteKey);
    return {
      companyName: tenant?.brand?.companyName || tenant?.company?.businessName || siteKey,
      ...stats
    };
  });

  // Multi-Tenant Usage Overview:
  // GET /api/analytics/all?key=sec_colbolt_demo_key_2026
  server.get('/api/analytics/all', async (req: FastifyRequest, reply: FastifyReply) => {
    const query = req.query as { key?: string };
    const authKey = query.key || (req.headers['x-admin-key'] as string);

    const allTenants = TenantStore.listAll();
    const isValid = allTenants.some(t => t.secretApiKey === authKey) || authKey === process.env.ADMIN_KEY || authKey === 'admin';
    if (!isValid) {
      return reply.status(401).send({ error: 'Unauthorized.' });
    }

    return allTenants.map(t => ({
      tenantId: t.tenantId,
      companyName: t.brand?.companyName || t.company?.businessName || t.siteKey,
      ...UsageTracker.getTenantStats(t.siteKey)
    }));
  });

  // Chat message endpoint
  interface ChatMessageBody {
    siteKey: string;
    conversationId?: string;
    message: string;
    shopperSessionId?: string;
    userLanguage?: string;
  }

  server.post('/api/chat/message', async (req: FastifyRequest<{ Body: ChatMessageBody }>, reply: FastifyReply) => {
    const { siteKey, conversationId, message, shopperSessionId, userLanguage } = req.body || {};

    if (!siteKey || !message) {
      return reply.status(400).send({ error: 'siteKey and message are required fields.' });
    }

    const tenant = TenantStore.getBySiteKey(siteKey);
    if (!tenant) {
      return reply.status(404).send({ error: `Tenant not found for siteKey: ${siteKey}` });
    }

    const convId = conversationId || `conv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const startTime = Date.now();

    try {
      const response = await ConversationEngine.processMessage({
        conversationId: convId,
        message,
        tenant,
        shopperSessionId,
        userLanguage
      });

      const durationMs = Date.now() - startTime;
      const tokensEstimate = Math.ceil(((message?.length || 0) + (response.message?.length || 0)) / 4) + 80;

      // Track usage per client (Roz ka aur Mahina ka)
      UsageTracker.record({
        siteKey,
        tokensEstimate,
        durationMs
      });

      // Audit log every conversation turn for review and bot improvements
      AppLogger.auditChat({
        siteKey,
        conversationId: convId,
        userMessage: message,
        assistantReply: response.message,
        durationMs,
        productCards: response.productCards
      });

      AppLogger.info(`[Chat] [${siteKey}] processed in ${durationMs}ms`, {
        message: message.substring(0, 50),
        cardsCount: response.productCards?.length || 0
      });

      return response;
    } catch (err: unknown) {
      AppLogger.error(`[Chat] [${siteKey}] Failed to process chat message`, err, { message });
      return reply.status(500).send({
        conversationId: convId,
        role: 'assistant',
        message: 'I am currently experiencing a temporary issue retrieving live catalog details. Please try asking again in a moment.'
      });
    }
  });

  // Dedicated Add to Cart endpoint
  interface AddToCartBody {
    siteKey: string;
    productId: string;
    variantId?: string;
    quantity?: number;
    shopperSessionId?: string;
  }

  server.post('/api/cart/add', async (req: FastifyRequest<{ Body: AddToCartBody }>, reply: FastifyReply) => {
    const { siteKey, productId, variantId, quantity = 1, shopperSessionId } = req.body || {};

    if (!siteKey || !productId) {
      return reply.status(400).send({ error: 'siteKey and productId are required.' });
    }

    const tenant = TenantStore.getBySiteKey(siteKey);
    if (!tenant) {
      return reply.status(404).send({ error: `Tenant not found for siteKey: ${siteKey}` });
    }

    const adapter = CommerceAdapterFactory.getAdapter(tenant);
    try {
      const result = await adapter.addToCart(productId, variantId, quantity, { shopperSessionId });
      AppLogger.info(`[Cart] [${siteKey}] Added product ${productId} (qty: ${quantity})`);
      return result;
    } catch (err: unknown) {
      AppLogger.error(`[Cart] [${siteKey}] Add to cart failed for product ${productId}`, err);
      return reply.status(500).send({
        success: false,
        message: 'Failed to process Add to Cart request.'
      });
    }
  });

  // Serve widget script directly
  server.get('/widget.js', async (_req, reply) => {
    const widgetFilePath = path.resolve(__dirname, '../../widget/dist/widget.js');
    if (fs.existsSync(widgetFilePath)) {
      reply.header('Content-Type', 'application/javascript; charset=utf-8');
      return reply.send(fs.createReadStream(widgetFilePath));
    } else {
      return reply.status(404).send('Widget bundle not yet built. Please run npm run build:widget.');
    }
  });

  return server;
}

export async function startServer(
  port: number = parseInt(process.env.PORT || '3000', 10),
  host: string = process.env.HOST || '0.0.0.0'
): Promise<FastifyInstance> {
  const server = await buildServer();
  const socketPath = process.env.LSNODE_SOCKET;

  if (socketPath) {
    AppLogger.info(`[cPanel LiteSpeed] Binding to Unix socket: ${socketPath}`);
    await server.listen({ path: socketPath });
    AppLogger.info(`[cPanel LiteSpeed] Server successfully bound to ${socketPath}`);
  } else {
    await server.listen({ port, host });
    AppLogger.info(`[Universal Chatbot Backend] Server running at http://${host}:${port}`);
  }

  AppLogger.info(`[Tenant Registered] ${TenantStore.listAll().map(t => `${t.brand?.companyName || t.siteKey} (${t.siteKey})`).join(', ')}`);
  return server;
}

// Server startup if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const HOST = process.env.HOST || '0.0.0.0';

  startServer(PORT, HOST).catch(err => {
    AppLogger.error('Failed to start server directly', err);
    process.exit(1);
  });
}
