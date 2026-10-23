/**
 * Tenant and Store Configuration Types
 * Ensures strict isolation between clients/stores
 */

export interface BrandConfig {
  companyName: string;
  assistantName: string;
  logoUrl?: string;
  avatarUrl?: string;
  primaryColor: string; // Hex color code e.g. '#2563eb'
  secondaryColor?: string;
  fontFamily?: string;
  launcherPosition: 'bottom-right' | 'bottom-left';
  welcomeMessage: string;
  suggestedQuestions: string[];
  whatsAppNumber?: string; // Optional WhatsApp shortcut e.g. "+923001234567"
  badgeText?: string;
}

export interface CompanyFaq {
  question: string;
  answer: string;
  category?: string;
}

export interface CompanyProfile {
  businessName: string;
  tagline?: string;
  aboutUs: string; // What the company does ("Hum kya kaam karte hain")
  industry: string; // e.g. "Peptides & Research Solutions", "Tiles & Ceramics", "Fashion"
  services: string[];
  shippingPolicy?: string;
  deliveryEstimate?: string;
  paymentMethods?: string[];
  returnPolicy?: string;
  supportEmail?: string;
  supportPhone?: string;
  businessAddress?: string;
  businessHours?: string;
  faqs?: CompanyFaq[];
}

export type CommercePlatformType = 'woocommerce' | 'shopify' | 'odoo' | 'mock';

export interface WooCommerceCredentials {
  storeUrl: string; // e.g. "https://colbolt.hawksnfox.com"
  consumerKey?: string;
  consumerSecret?: string;
  useStoreApi: boolean; // default true for public WooCommerce Store API
}

export interface ShopifyCredentials {
  storeDomain: string; // e.g. "example.myshopify.com"
  storefrontAccessToken: string;
}

export interface OdooCredentials {
  hostUrl: string;
  database: string;
  username: string;
  apiKey: string;
  odooVersion?: number;
}

export interface CommerceConnectorConfig {
  type: CommercePlatformType;
  woocommerce?: WooCommerceCredentials;
  shopify?: ShopifyCredentials;
  odoo?: OdooCredentials;
}

export type LLMProviderType = 'openrouter' | 'gemini' | 'openai' | 'mock';

export interface AIConfig {
  provider: LLMProviderType;
  model: string; // e.g. "meta-llama/llama-3.3-70b-instruct:free", "google/gemini-2.0-flash-exp:free"
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
  systemPromptOverride?: string;
  supportedLanguages: string[]; // ['en', 'ur', 'roman_ur', 'hi']
}

export type AvailableToolName = 
  | 'search_products'
  | 'get_product_details'
  | 'compare_products'
  | 'add_to_cart'
  | 'get_company_info'
  | 'tile_calculator'
  | 'shoe_size_finder';

export interface TenantConfig {
  tenantId: string;
  siteKey: string; // Public identifier for widget initialization
  secretApiKey?: string; // Private key for server admin APIs
  allowedOrigins: string[]; // Domains allowed to query chatbot (CORS whitelist)
  brand: BrandConfig;
  company: CompanyProfile;
  commerce: CommerceConnectorConfig;
  ai: AIConfig;
  activeTools: AvailableToolName[];
  createdAt: string;
  updatedAt: string;
}
