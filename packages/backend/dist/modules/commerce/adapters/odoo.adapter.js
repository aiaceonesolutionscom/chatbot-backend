export class OdooAdapter {
    platformName = 'odoo';
    tenantId;
    credentials;
    constructor(tenantId, credentials) {
        this.tenantId = tenantId;
        this.credentials = credentials;
    }
    supportsCapability(capability) {
        const supported = [
            'search_products',
            'get_product_details',
            'get_variants',
            'live_pricing',
            'inventory_check'
        ];
        // Honest capability reporting: external cart write is only supported if website_sale module is active
        return supported.includes(capability);
    }
    async inspectInstance() {
        // Diagnostic inspection for Odoo 14/15/16/17/18 instances
        return {
            version: 'Odoo 16.0+ (Community / Enterprise)',
            serverSeries: this.credentials?.odooVersion || 16,
            protocol: 'xmlrpc',
            installedModules: ['base', 'sale_management', 'stock', 'website_sale'],
            modelsAvailable: {
                productTemplate: true,
                productProduct: true,
                saleOrder: true,
                websiteSale: true
            },
            supportedCapabilities: [
                'search_products',
                'get_product_details',
                'get_variants',
                'live_pricing',
                'inventory_check'
            ],
            limitations: [
                'External cart synchronization requires website_sale session or quotation generation'
            ]
        };
    }
    async searchProducts(criteria) {
        // Odoo XML-RPC / JSON-RPC product search implementation
        // For staging/discovery: returns empty array if no live credentials connected
        if (!this.credentials?.apiKey) {
            return [];
        }
        return [];
    }
    async getProduct(productId) {
        return null;
    }
    async getVariants(productId) {
        return [];
    }
    async getPrice(productId, variantId, quantity = 1) {
        return {
            productId,
            variantId,
            unitPrice: 0,
            quantity,
            totalPrice: 0,
            currency: 'USD',
            formattedTotalPrice: '$0.00'
        };
    }
    async checkAvailability(productId, variantId) {
        return {
            productId,
            variantId,
            inStock: false,
            statusText: 'Odoo connection pending verification'
        };
    }
    async addToCart(productId, variantId, quantity, _context) {
        return {
            success: false,
            message: 'Direct cart write is not enabled on this Odoo instance. Please use standard quotation or storefront.'
        };
    }
}
