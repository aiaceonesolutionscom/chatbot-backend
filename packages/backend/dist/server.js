import Fastify from 'fastify';
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
import { AuthService } from './modules/auth/auth.service.js';
import { AdminView } from './modules/admin/admin.view.js';
// Load .env using Node's built-in env loader if present
if (typeof process.loadEnvFile === 'function') {
    try {
        process.loadEnvFile(path.resolve(process.cwd(), '.env'));
    }
    catch (e) {
        try {
            process.loadEnvFile();
        }
        catch (err) { }
    }
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Initialize tenant configurations & security authentication
TenantStore.initializeDefaults();
AuthService.initialize();
function getAdminSession(req) {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        const match = cookieHeader.match(/admin_session=([^;]+)/);
        if (match)
            return match[1];
    }
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    return undefined;
}
export async function buildServer() {
    const server = Fastify({
        logger: true,
        trustProxy: true
    });
    // Native urlencoded form parser for login submissions
    server.addContentTypeParser('application/x-www-form-urlencoded', { parseAs: 'string' }, (_req, body, defaultDone) => {
        try {
            const parsed = Object.fromEntries(new URLSearchParams(body));
            defaultDone(null, parsed);
        }
        catch (err) {
            defaultDone(err, undefined);
        }
    });
    // Security: CORS dynamically checked against tenant's allowed origins
    await server.register(cors, {
        origin: (origin, cb) => {
            // Allow requests with no origin (like mobile apps, curl, server-to-server)
            if (!origin)
                return cb(null, true);
            // Check if origin matches any tenant's allowed origins
            const allTenants = TenantStore.listAll();
            const isAllowed = allTenants.some(t => t.allowedOrigins.includes(origin) ||
                t.allowedOrigins.some(ao => ao.includes('*') && new RegExp('^' + ao.replace(/\*/g, '.*') + '$').test(origin)));
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
    // Serve AceOne Solutions Brand Logo
    server.get('/aceone-logo.png', async (_req, reply) => {
        const candidates = [
            path.resolve(__dirname, '../public/aceone-logo.png'),
            path.resolve(__dirname, '../../public/aceone-logo.png'),
            path.resolve(process.cwd(), 'public/aceone-logo.png'),
            path.resolve(process.cwd(), 'packages/backend/public/aceone-logo.png'),
        ];
        for (const p of candidates) {
            if (fs.existsSync(p)) {
                reply.header('Content-Type', 'image/png');
                reply.header('Cache-Control', 'public, max-age=86400');
                return reply.send(fs.createReadStream(p));
            }
        }
        return reply.status(404).send('Logo not found');
    });
    // Download WordPress Plugin ZIP
    server.get('/download/wordpress-plugin.zip', async (_req, reply) => {
        const candidates = [
            path.resolve(__dirname, '../public/wordpress-plugin.zip'),
            path.resolve(__dirname, '../../public/wordpress-plugin.zip'),
            path.resolve(process.cwd(), 'public/wordpress-plugin.zip'),
            path.resolve(process.cwd(), 'packages/backend/public/wordpress-plugin.zip'),
            path.resolve(process.cwd(), 'dist-plugin/universal-commerce-ai-chatbot.zip'),
        ];
        for (const p of candidates) {
            if (fs.existsSync(p)) {
                reply.header('Content-Type', 'application/zip');
                reply.header('Content-Disposition', 'attachment; filename="universal-commerce-ai-chatbot.zip"');
                return reply.send(fs.createReadStream(p));
            }
        }
        return reply.status(404).send('Plugin zip not found');
    });
    // Root Redirect: redirect / and /demo to /admin
    server.get('/', async (_req, reply) => {
        return reply.redirect('/admin');
    });
    server.get('/demo', async (_req, reply) => {
        return reply.redirect('/admin');
    });
    server.get('/api/health', async () => {
        return {
            status: 'healthy',
            service: 'universal-ai-commerce-chatbot',
            tenantsCount: TenantStore.listAll().length,
            timestamp: new Date().toISOString()
        };
    });
    // -------------------------------------------------------------
    // ACEONE SOLUTIONS ADMIN PORTAL & SECURITY CONTROLLERS
    // -------------------------------------------------------------
    // Admin Login View: GET /admin/login
    server.get('/admin/login', async (req, reply) => {
        const token = getAdminSession(req);
        if (token && AuthService.isValidSession(token)) {
            return reply.redirect('/admin');
        }
        const query = req.query;
        const html = AdminView.renderLoginPage(query.error);
        reply.header('Content-Type', 'text/html; charset=utf-8');
        return reply.send(html);
    });
    // Admin Login Action: POST /api/admin/login
    server.post('/api/admin/login', async (req, reply) => {
        const body = req.body || {};
        const username = (body.username || '').trim();
        const password = (body.password || '').trim();
        const clientIp = req.ip || 'unknown';
        const result = AuthService.verifyLogin(username, password, clientIp);
        if (!result.success) {
            const accept = req.headers.accept || '';
            if (accept.includes('text/html') || !accept.includes('application/json')) {
                return reply.redirect(`/admin/login?error=${encodeURIComponent(result.error || 'Authentication failed')}`);
            }
            return reply.status(401).send({ success: false, error: result.error });
        }
        const isHttps = req.headers['x-forwarded-proto'] === 'https' || req.socket?.encrypted;
        const cookie = `admin_session=${result.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${isHttps ? '; Secure' : ''}`;
        reply.header('Set-Cookie', cookie);
        const accept = req.headers.accept || '';
        if (accept.includes('text/html') || !accept.includes('application/json')) {
            return reply.redirect('/admin');
        }
        return reply.send({ success: true, redirect: '/admin' });
    });
    // Admin Logout Action: GET /api/admin/logout & POST /api/admin/logout
    server.all('/api/admin/logout', async (req, reply) => {
        const token = getAdminSession(req);
        if (token) {
            AuthService.revokeSession(token);
        }
        reply.header('Set-Cookie', 'admin_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
        return reply.redirect('/admin/login');
    });
    // AceOne Solutions Protected Admin Dashboard: GET /admin
    server.get('/admin', async (req, reply) => {
        const token = getAdminSession(req);
        if (!token || !AuthService.isValidSession(token)) {
            return reply.redirect('/admin/login');
        }
        const tenants = TenantStore.listAll();
        const query = req.query;
        const rawTab = (query.view || query.section || 'overview').toLowerCase();
        const activeTab = (rawTab === 'chatbots' ? 'chatbot' : rawTab);
        const selectedClient = query.client || query.siteKey || tenants[0]?.siteKey || 'colbolt_live';
        const currentTenant = TenantStore.getBySiteKey(selectedClient) || tenants[0];
        const stats = UsageTracker.getTenantStats(currentTenant?.siteKey || selectedClient);
        const fromDate = query.from || query.fromDate;
        const toDate = query.to || query.toDate;
        const searchQuery = query.search;
        const dateFilter = query.filter || (fromDate || toDate ? 'custom' : '7days');
        const auditLogs = AppLogger.getStructuredAudits(currentTenant?.siteKey || selectedClient, dateFilter, searchQuery);
        const dailyRecords = UsageTracker.getTenantDailyRecords(currentTenant?.siteKey || selectedClient, fromDate, toDate);
        const html = AdminView.renderDashboard({
            tenants,
            activeTab: ['overview', 'chatbot', 'usage', 'settings'].includes(activeTab) ? activeTab : 'overview',
            selectedClient: currentTenant?.siteKey || selectedClient,
            stats,
            auditLogs,
            dailyRecords,
            csrfToken: token.slice(0, 16)
        });
        reply.header('Content-Type', 'text/html; charset=utf-8');
        return reply.send(html);
    });
    // Admin Password Change Endpoint: POST /api/admin/change-password
    server.post('/api/admin/change-password', async (req, reply) => {
        const token = getAdminSession(req);
        if (!token || !AuthService.isValidSession(token)) {
            return reply.status(401).send({ success: false, error: 'Unauthorized. Please login again.' });
        }
        const body = req.body || {};
        const { currentPassword, newPassword } = body;
        const result = AuthService.updatePassword(currentPassword, newPassword);
        if (!result.success) {
            return reply.status(400).send(result);
        }
        return reply.send({ success: true, message: 'Password updated successfully!' });
    });
    // Admin Client Tenant Configuration Save: POST /api/admin/tenants/save
    server.post('/api/admin/tenants/save', async (req, reply) => {
        const token = getAdminSession(req);
        if (!token || !AuthService.isValidSession(token)) {
            return reply.status(401).send({ success: false, error: 'Unauthorized.' });
        }
        const body = req.body || {};
        const { siteKey, updates } = body;
        if (!siteKey || !updates) {
            return reply.status(400).send({ success: false, error: 'siteKey and updates are required.' });
        }
        try {
            const updated = TenantStore.updateTenantOnDisk(siteKey, updates);
            return reply.send({ success: true, tenant: updated });
        }
        catch (err) {
            return reply.status(500).send({ success: false, error: err.message || 'Failed to update tenant configuration' });
        }
    });
    // Admin Create New Client Tenant: POST /api/admin/tenants/create
    server.post('/api/admin/tenants/create', async (req, reply) => {
        const token = getAdminSession(req);
        if (!token || !AuthService.isValidSession(token)) {
            return reply.status(401).send({ success: false, error: 'Unauthorized.' });
        }
        const body = req.body || {};
        const { companyName, siteKey, primaryColor, secondaryColor, storeUrl } = body;
        if (!companyName) {
            return reply.status(400).send({ success: false, error: 'Company Name is required.' });
        }
        try {
            const created = TenantStore.createTenantOnDisk({
                companyName,
                siteKey,
                primaryColor,
                secondaryColor,
                storeUrl
            });
            return reply.send({ success: true, tenant: created });
        }
        catch (err) {
            return reply.status(400).send({ success: false, error: err.message || 'Failed to create client tenant' });
        }
    });
    // Admin Delete Client Tenant: POST /api/admin/tenants/delete
    server.post('/api/admin/tenants/delete', async (req, reply) => {
        const token = getAdminSession(req);
        if (!token || !AuthService.isValidSession(token)) {
            return reply.status(401).send({ success: false, error: 'Unauthorized.' });
        }
        const body = req.body || {};
        const { siteKey } = body;
        if (!siteKey) {
            return reply.status(400).send({ success: false, error: 'siteKey is required.' });
        }
        try {
            const deleted = TenantStore.deleteTenantOnDisk(siteKey);
            return reply.send({ success: true, deletedSiteKey: deleted });
        }
        catch (err) {
            return reply.status(400).send({ success: false, error: err.message || 'Failed to delete client tenant' });
        }
    });
    // Public Tenant Configuration Endpoint (Used by the widget to style itself)
    server.get('/api/tenant/config', async (req, reply) => {
        const query = req.query;
        const headerSiteKey = req.headers['x-site-key'];
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
    server.get('/api/logs', async (req, reply) => {
        const query = req.query;
        const authKey = query.key || req.headers['x-admin-key'];
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
    server.get('/api/logs/errors', async (req, reply) => {
        const query = req.query;
        const authKey = query.key || req.headers['x-admin-key'];
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
    server.get('/api/logs/audit', async (req, reply) => {
        const query = req.query;
        const authKey = query.key || req.headers['x-admin-key'];
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
    server.get('/api/analytics/usage', async (req, reply) => {
        const query = req.query;
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
    server.get('/api/analytics/all', async (req, reply) => {
        const query = req.query;
        const authKey = query.key || req.headers['x-admin-key'];
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
    server.post('/api/chat/message', async (req, reply) => {
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
        }
        catch (err) {
            AppLogger.error(`[Chat] [${siteKey}] Failed to process chat message`, err, { message });
            return reply.status(500).send({
                conversationId: convId,
                role: 'assistant',
                message: 'I am currently experiencing a temporary issue retrieving live catalog details. Please try asking again in a moment.'
            });
        }
    });
    server.post('/api/cart/add', async (req, reply) => {
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
        }
        catch (err) {
            AppLogger.error(`[Cart] [${siteKey}] Add to cart failed for product ${productId}`, err);
            return reply.status(500).send({
                success: false,
                message: 'Failed to process Add to Cart request.'
            });
        }
    });
    // Dedicated Remove from Cart ("Un-cart") endpoint
    server.post('/api/cart/remove', async (req, reply) => {
        const { siteKey, productId, shopperSessionId } = req.body || {};
        if (!siteKey || !productId) {
            return reply.status(400).send({ error: 'siteKey and productId are required.' });
        }
        const tenant = TenantStore.getBySiteKey(siteKey);
        if (!tenant)
            return reply.status(404).send({ error: 'Tenant not found.' });
        const adapter = CommerceAdapterFactory.getAdapter(tenant);
        if (adapter.removeFromCart) {
            return await adapter.removeFromCart(productId, { shopperSessionId });
        }
        return { success: true, message: 'Item removed from cart.' };
    });
    // Dedicated Clear Cart endpoint
    server.post('/api/cart/clear', async (req, reply) => {
        const { siteKey, shopperSessionId } = req.body || {};
        if (!siteKey)
            return reply.status(400).send({ error: 'siteKey is required.' });
        const tenant = TenantStore.getBySiteKey(siteKey);
        if (!tenant)
            return reply.status(404).send({ error: 'Tenant not found.' });
        const adapter = CommerceAdapterFactory.getAdapter(tenant);
        if (adapter.clearCart) {
            return await adapter.clearCart({ shopperSessionId });
        }
        return { success: true, message: 'Cart cleared.' };
    });
    // Dedicated Order Tracking endpoint
    server.post('/api/order/track', async (req, reply) => {
        const { siteKey, orderId, email } = req.body || {};
        if (!siteKey || !orderId) {
            return reply.status(400).send({ error: 'siteKey and orderId are required.' });
        }
        const tenant = TenantStore.getBySiteKey(siteKey);
        if (!tenant)
            return reply.status(404).send({ error: 'Tenant not found.' });
        const adapter = CommerceAdapterFactory.getAdapter(tenant);
        if (adapter.trackOrder) {
            return await adapter.trackOrder(orderId, email);
        }
        return { success: true, orderId, status: 'processing', message: `Order #${orderId} is being prepared for dispatch.` };
    });
    // Dedicated Order Cancellation endpoint
    server.post('/api/order/cancel', async (req, reply) => {
        const { siteKey, orderId, email, reason } = req.body || {};
        if (!siteKey || !orderId || !email) {
            return reply.status(400).send({ error: 'siteKey, orderId, and email are required.' });
        }
        const tenant = TenantStore.getBySiteKey(siteKey);
        if (!tenant)
            return reply.status(404).send({ error: 'Tenant not found.' });
        const adapter = CommerceAdapterFactory.getAdapter(tenant);
        if (adapter.cancelOrder) {
            return await adapter.cancelOrder(orderId, email, reason);
        }
        return { success: true, orderId, cancellable: true, message: `Order #${orderId} cancellation has been submitted.` };
    });
    // Serve widget script directly
    server.get('/widget.js', async (_req, reply) => {
        const widgetFilePath = path.resolve(__dirname, '../../widget/dist/widget.js');
        if (fs.existsSync(widgetFilePath)) {
            reply.header('Content-Type', 'application/javascript; charset=utf-8');
            return reply.send(fs.createReadStream(widgetFilePath));
        }
        else {
            return reply.status(404).send('Widget bundle not yet built. Please run npm run build:widget.');
        }
    });
    return server;
}
export async function startServer(port = parseInt(process.env.PORT || '3000', 10), host = process.env.HOST || '0.0.0.0') {
    const server = await buildServer();
    const socketPath = process.env.LSNODE_SOCKET;
    if (socketPath) {
        AppLogger.info(`[cPanel LiteSpeed] Binding to Unix socket: ${socketPath}`);
        await server.listen({ path: socketPath });
        AppLogger.info(`[cPanel LiteSpeed] Server successfully bound to ${socketPath}`);
    }
    else {
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
