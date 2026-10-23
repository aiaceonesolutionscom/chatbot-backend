export class ShopifyAdapter {
    platformName = 'shopify';
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
            'inventory_check',
            'storefront_cart_bridge'
        ];
        return supported.includes(capability);
    }
    async searchProducts(criteria) {
        if (!this.credentials?.storefrontAccessToken)
            return [];
        // Storefront GraphQL query structure
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
            statusText: 'Shopify connection pending'
        };
    }
    async addToCart(productId, variantId, quantity, _context) {
        const targetVariantId = variantId || productId;
        return {
            success: true,
            message: `Added ${quantity} item(s) to Shopify cart.`,
            clientBridgePayload: {
                action: 'shopify_cart',
                endpoint: `https://${this.credentials?.storeDomain}/cart/add.js`,
                method: 'POST',
                body: {
                    items: [{ id: targetVariantId, quantity }]
                },
                domEventsToTrigger: ['cart:updated']
            }
        };
    }
}
