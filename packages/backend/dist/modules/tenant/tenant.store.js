import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class TenantStore {
    static tenants = new Map();
    static tenantsDir = path.resolve(__dirname, '../../../tenants');
    static initializeDefaults() {
        // 1. Try loading all file-based tenants from the tenants/ directory
        this.loadFromDisk();
        // 2. Fallback in-memory default if disk has no colbolt configuration
        if (!this.tenants.has('colbolt_live')) {
            const colboltTenant = {
                tenantId: 'colbolt-store-01',
                siteKey: 'colbolt_live',
                secretApiKey: 'sec_colbolt_demo_key_2026',
                allowedOrigins: [
                    'https://colbolt.hawksnfox.com',
                    'http://localhost:3000',
                    'http://localhost:5173',
                    'http://localhost:8080',
                    'http://127.0.0.1:5500'
                ],
                brand: {
                    companyName: 'Colbolt',
                    assistantName: 'COLBOLT.',
                    logoUrl: 'https://colbolt.hawksnfox.com/wp-content/uploads/2024/10/7.jpg',
                    primaryColor: '#16408a',
                    secondaryColor: '#248acc',
                    fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    launcherPosition: 'bottom-right',
                    welcomeMessage: 'Hello! Welcome to Colbolt. I can help you find products (like Bacteriostatic Water, Tirz, Retatrutide), check prices within your budget, or add items directly to your cart. How can I help you today?',
                    suggestedQuestions: [
                        'What does Colbolt do?',
                        'Show me Tirz products',
                        'What is Bacteriostatic Water?',
                        'What are your shipping policies?'
                    ],
                    whatsAppNumber: '',
                    badgeText: 'Online'
                },
                company: {
                    businessName: 'Colbolt',
                    tagline: 'Premium Research Solutions & Compounds',
                    aboutUs: 'Colbolt provides premium quality research solutions, laboratory compounds, and peptides with rigorous quality control, verified purity, and discreet fast delivery. Hum scientific aur research purposes ke liye verified products provide karte hain.',
                    industry: 'Research Solutions & Laboratory Compounds',
                    services: [
                        'Certified Research Compound Distribution',
                        'Batch Quality and Purity Testing',
                        'Discreet & Fast Order Fulfillment',
                        'Dedicated Customer Inquiries & Order Assistance'
                    ],
                    shippingPolicy: 'Orders are processed securely and dispatched within 24-48 business hours with tracking provided.',
                    deliveryEstimate: 'Standard US shipping takes 3-5 business days; expedited options available at checkout.',
                    paymentMethods: ['Direct Bank Transfer (BACS)', 'Cash on Delivery (COD) where available'],
                    returnPolicy: 'Due to the nature of research products, returns are handled individually if items arrive damaged or incorrect.',
                    supportEmail: 'support@hawksnfox.com',
                    businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM (PST)',
                    faqs: [
                        {
                            question: 'What does Colbolt do? / Aap kya kaam karte hain?',
                            answer: 'Colbolt is an online store offering laboratory research compounds, peptides, and solutions such as Tirz (10mg/30mg), Retatrutide, and Bacteriostatic Water with verified quality.'
                        },
                        {
                            question: 'How do I buy or add items to cart?',
                            answer: 'You can simply ask me about any product or click the "Add to Cart" button on the product cards in our chat. The item is directly added to your website cart!'
                        },
                        {
                            question: 'Where can I see my cart and checkout?',
                            answer: 'Once you add an item, you can click "View Cart" or proceed directly to checkout at https://colbolt.hawksnfox.com/checkout/.'
                        },
                        {
                            question: 'Do you ship discreetly?',
                            answer: 'Yes, all packages are shipped discreetly and securely.'
                        }
                    ]
                },
                commerce: {
                    type: 'woocommerce',
                    woocommerce: {
                        storeUrl: 'https://colbolt.hawksnfox.com',
                        useStoreApi: true
                    }
                },
                ai: {
                    provider: 'openrouter',
                    model: process.env.OPENROUTER_MODEL || 'recursive/flint-v1.0:free',
                    apiKey: process.env.OPENROUTER_API_KEY || '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',
                    temperature: 0.3,
                    supportedLanguages: ['en', 'ur', 'roman_ur', 'hi']
                },
                activeTools: [
                    'search_products',
                    'get_product_details',
                    'compare_products',
                    'add_to_cart',
                    'get_company_info',
                    'tile_calculator'
                ],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.tenants.set(colboltTenant.siteKey, colboltTenant);
            this.tenants.set(colboltTenant.tenantId, colboltTenant);
        }
    }
    /**
     * Scans the tenants/ folder on disk and registers each tenant found.
     * Enables adding/editing clients in isolated folders without code changes!
     */
    static loadFromDisk() {
        // Search possible locations for tenants/
        const candidateDirs = [
            path.resolve(__dirname, '../../../tenants'),
            path.resolve(process.cwd(), 'packages/backend/tenants'),
            path.resolve(process.cwd(), 'tenants')
        ];
        let foundDir = '';
        for (const d of candidateDirs) {
            if (fs.existsSync(d) && fs.statSync(d).isDirectory()) {
                foundDir = d;
                break;
            }
        }
        if (!foundDir) {
            return;
        }
        this.tenantsDir = foundDir;
        try {
            const entries = fs.readdirSync(this.tenantsDir, { withFileTypes: true });
            for (const entry of entries) {
                if (entry.isDirectory()) {
                    const configPath = path.join(this.tenantsDir, entry.name, 'config.json');
                    if (fs.existsSync(configPath)) {
                        try {
                            const fileContent = fs.readFileSync(configPath, 'utf-8');
                            const tenant = JSON.parse(fileContent);
                            if (tenant && tenant.siteKey) {
                                // Ensure required defaults
                                if (!tenant.ai) {
                                    tenant.ai = {
                                        provider: 'openrouter',
                                        model: process.env.OPENROUTER_MODEL || 'recursive/flint-v1.0:free',
                                        temperature: 0.3,
                                        supportedLanguages: ['en', 'ur', 'roman_ur', 'hi']
                                    };
                                }
                                if (!tenant.allowedOrigins) {
                                    tenant.allowedOrigins = ['*'];
                                }
                                this.tenants.set(tenant.siteKey, tenant);
                                if (tenant.tenantId) {
                                    this.tenants.set(tenant.tenantId, tenant);
                                }
                                console.log(`[TenantStore] Loaded tenant: ${tenant.brand?.companyName || entry.name} (siteKey: ${tenant.siteKey}) from tenants/${entry.name}/config.json`);
                            }
                        }
                        catch (err) {
                            console.warn(`[TenantStore] Failed to parse ${configPath}:`, err);
                        }
                    }
                }
            }
        }
        catch (err) {
            console.warn('[TenantStore] Error reading tenants folder:', err);
        }
    }
    static getBySiteKey(siteKey) {
        let tenant = this.tenants.get(siteKey);
        if (!tenant) {
            // Re-scan disk in case a new client folder was added while server is running!
            this.loadFromDisk();
            tenant = this.tenants.get(siteKey);
        }
        return tenant;
    }
    static getById(tenantId) {
        return this.tenants.get(tenantId);
    }
    static save(tenant) {
        this.tenants.set(tenant.siteKey, tenant);
        this.tenants.set(tenant.tenantId, tenant);
    }
    static listAll() {
        const unique = new Map();
        for (const t of this.tenants.values()) {
            unique.set(t.tenantId || t.siteKey, t);
        }
        return Array.from(unique.values());
    }
}
