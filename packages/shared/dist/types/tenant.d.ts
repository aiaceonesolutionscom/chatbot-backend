/**
 * Tenant and Store Configuration Types
 * Ensures strict isolation between clients/stores
 */
export interface BrandConfig {
    companyName: string;
    assistantName: string;
    logoUrl?: string;
    avatarUrl?: string;
    primaryColor: string;
    secondaryColor?: string;
    fontFamily?: string;
    launcherPosition: 'bottom-right' | 'bottom-left';
    welcomeMessage: string;
    suggestedQuestions: string[];
    whatsAppNumber?: string;
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
    aboutUs: string;
    industry: string;
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
    storeUrl: string;
    consumerKey?: string;
    consumerSecret?: string;
    useStoreApi: boolean;
}
export interface ShopifyCredentials {
    storeDomain: string;
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
export type LLMProviderType = 'openrouter' | 'groq' | 'gemini' | 'openai' | 'mock';
export interface AIConfig {
    provider: LLMProviderType;
    model: string;
    apiKey?: string;
    temperature?: number;
    maxTokens?: number;
    systemPromptOverride?: string;
    supportedLanguages: string[];
}
export type AvailableToolName = 'search_products' | 'get_product_details' | 'compare_products' | 'add_to_cart' | 'get_company_info' | 'tile_calculator' | 'shoe_size_finder';
export interface TenantConfig {
    tenantId: string;
    siteKey: string;
    secretApiKey?: string;
    allowedOrigins: string[];
    brand: BrandConfig;
    company: CompanyProfile;
    commerce: CommerceConnectorConfig;
    ai: AIConfig;
    activeTools: AvailableToolName[];
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=tenant.d.ts.map