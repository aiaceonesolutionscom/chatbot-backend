import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TenantConfig } from '@universal-chatbot/shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class TenantStore {
  private static tenants: Map<string, TenantConfig> = new Map();
  private static tenantsDir: string = path.resolve(__dirname, '../../../tenants');

  static initializeDefaults(): void {
    // 1. Try loading all file-based tenants from the tenants/ directory
    this.loadFromDisk();

    // 2. Fallback in-memory default if disk has no colbolt configuration
    if (!this.tenants.has('colbolt_live')) {
      const colboltTenant: TenantConfig = {
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
          logoUrl: 'https://colbolt.hawksnfox.com/wp-content/uploads/2021/05/colbol.png',
          primaryColor: '#0d2958',
          secondaryColor: '#0284c7',
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
  static loadFromDisk(): void {
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
              const tenant = JSON.parse(fileContent) as TenantConfig;
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
            } catch (err) {
              console.warn(`[TenantStore] Failed to parse ${configPath}:`, err);
            }
          }
        }
      }
    } catch (err) {
      console.warn('[TenantStore] Error reading tenants folder:', err);
    }
  }

  static getBySiteKey(siteKey: string): TenantConfig | undefined {
    let tenant = this.tenants.get(siteKey);
    if (!tenant) {
      // Re-scan disk in case a new client folder was added while server is running!
      this.loadFromDisk();
      tenant = this.tenants.get(siteKey);
    }
    return tenant;
  }

  static getById(tenantId: string): TenantConfig | undefined {
    return this.tenants.get(tenantId);
  }

  static save(tenant: TenantConfig): void {
    this.tenants.set(tenant.siteKey, tenant);
    if (tenant.tenantId) {
      this.tenants.set(tenant.tenantId, tenant);
    }
  }

  /**
   * Persist tenant updates back to disk in tenants/<folder>/config.json
   */
  static updateTenantOnDisk(siteKey: string, updates: Partial<TenantConfig>): TenantConfig | null {
    const cleanSiteKey = siteKey.replace(/[^a-z0-9_-]/gi, '');
    const tenant = this.getBySiteKey(cleanSiteKey);
    if (!tenant) return null;

    // Deep merge updates safely
    if (updates.brand) {
      tenant.brand = { ...tenant.brand, ...updates.brand };
    }
    if (updates.company) {
      tenant.company = { ...tenant.company, ...updates.company };
    }
    if (updates.commerce) {
      tenant.commerce = { ...tenant.commerce, ...updates.commerce };
    }
    if (updates.ai) {
      tenant.ai = { ...tenant.ai, ...updates.ai };
    }
    if (updates.allowedOrigins) {
      tenant.allowedOrigins = updates.allowedOrigins;
    }
    tenant.updatedAt = new Date().toISOString();

    // Determine tenant directory
    const slug = cleanSiteKey.replace(/_live$/i, '').replace(/_/g, '-');
    const tenantFolder = path.join(this.tenantsDir, slug);
    if (!fs.existsSync(tenantFolder)) {
      fs.mkdirSync(tenantFolder, { recursive: true });
    }
    const configPath = path.join(tenantFolder, 'config.json');
    fs.writeFileSync(configPath, JSON.stringify(tenant, null, 2), 'utf-8');

    // Update in memory
    this.save(tenant);
    return tenant;
  }

  /**
   * Create a new client tenant folder and configuration
   */
  static createTenantOnDisk(data: {
    companyName: string;
    siteKey: string;
    storeUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    welcomeMessage?: string;
    assistantName?: string;
  }): TenantConfig {
    const cleanSiteKey = data.siteKey.replace(/[^a-z0-9_-]/gi, '').toLowerCase();
    const slug = cleanSiteKey.replace(/_live$/i, '').replace(/_/g, '-');
    const tenantFolder = path.join(this.tenantsDir, slug);

    if (!fs.existsSync(tenantFolder)) {
      fs.mkdirSync(tenantFolder, { recursive: true });
    }

    const newTenant: TenantConfig = {
      tenantId: `${slug}-store-01`,
      siteKey: cleanSiteKey,
      secretApiKey: `sec_${slug}_${Date.now().toString(36)}`,
      allowedOrigins: ['*'],
      brand: {
        companyName: data.companyName,
        assistantName: data.assistantName || `${data.companyName.toUpperCase()}.`,
        logoUrl: '/aceone-logo.png',
        primaryColor: data.primaryColor || '#1e3a8a',
        secondaryColor: data.secondaryColor || '#3b82f6',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        launcherPosition: 'bottom-right',
        welcomeMessage: data.welcomeMessage || `Hello! Welcome to ${data.companyName}. How can I assist you with our products and services today?`,
        suggestedQuestions: [
          `What does ${data.companyName} do?`,
          'Show me all products',
          'What is your shipping policy?'
        ],
        whatsAppNumber: '',
        badgeText: 'Online'
      },
      company: {
        businessName: data.companyName,
        tagline: `${data.companyName} Official Customer Assistant`,
        aboutUs: `${data.companyName} provides high quality products and dedicated customer service.`,
        industry: 'E-Commerce & Retail',
        services: ['Product Guidance', 'Order Assistance', 'Live Store Support'],
        shippingPolicy: 'Standard orders are securely processed and dispatched within 24-48 business hours with tracking provided.',
        deliveryEstimate: 'Standard delivery takes 3-5 business days.',
        supportEmail: 'support@aceonesolutions.com',
        faqs: []
      },
      commerce: {
        type: 'woocommerce',
        woocommerce: {
          storeUrl: data.storeUrl || `https://${slug}.com`,
          useStoreApi: true
        }
      },
      ai: {
        provider: 'groq',
        model: 'openai/gpt-oss-120b',
        temperature: 0.25,
        maxTokens: 3000,
        supportedLanguages: ['en', 'ur', 'roman_ur', 'hi']
      },
      activeTools: ['search_products', 'get_product_details', 'add_to_cart'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const configPath = path.join(tenantFolder, 'config.json');
    fs.writeFileSync(configPath, JSON.stringify(newTenant, null, 2), 'utf-8');

    this.save(newTenant);
    console.log(`[TenantStore] Successfully created new client tenant: ${data.companyName} (${cleanSiteKey})`);
    return newTenant;
  }

  /**
   * Delete tenant from disk and memory
   */
  static deleteTenantOnDisk(siteKey: string): boolean {
    const cleanSiteKey = siteKey.replace(/[^a-z0-9_-]/gi, '');
    const tenant = this.getBySiteKey(cleanSiteKey);
    if (!tenant) return false;

    const slug = cleanSiteKey.replace(/_live$/i, '').replace(/_/g, '-');
    const tenantFolder = path.join(this.tenantsDir, slug);

    try {
      if (fs.existsSync(tenantFolder)) {
        fs.rmSync(tenantFolder, { recursive: true, force: true });
      }
      this.tenants.delete(cleanSiteKey);
      if (tenant.tenantId) {
        this.tenants.delete(tenant.tenantId);
      }
      console.log(`[TenantStore] Deleted tenant ${cleanSiteKey}`);
      return true;
    } catch (e) {
      console.error(`[TenantStore] Error deleting tenant ${cleanSiteKey}:`, e);
      return false;
    }
  }

  static listAll(): TenantConfig[] {
    // Re-scan disk to ensure all folder tenants are captured
    this.loadFromDisk();
    const unique = new Map<string, TenantConfig>();
    for (const t of this.tenants.values()) {
      unique.set(t.siteKey, t);
    }
    return Array.from(unique.values());
  }
}
