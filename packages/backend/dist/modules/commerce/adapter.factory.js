import { WooCommerceAdapter } from './adapters/woocommerce.adapter.js';
import { MockCommerceAdapter } from './adapters/mock.adapter.js';
import { OdooAdapter } from './adapters/odoo.adapter.js';
import { ShopifyAdapter } from './adapters/shopify.adapter.js';
export class CommerceAdapterFactory {
    static adapterCache = new Map();
    static getAdapter(tenant) {
        const cacheKey = `${tenant.tenantId}-${tenant.commerce.type}-${tenant.updatedAt}`;
        const cached = this.adapterCache.get(cacheKey);
        if (cached)
            return cached;
        let adapter;
        switch (tenant.commerce.type) {
            case 'woocommerce':
                adapter = new WooCommerceAdapter(tenant.tenantId, tenant.commerce.woocommerce || { storeUrl: 'https://colbolt.hawksnfox.com', useStoreApi: true });
                break;
            case 'odoo':
                adapter = new OdooAdapter(tenant.tenantId, tenant.commerce.odoo);
                break;
            case 'shopify':
                adapter = new ShopifyAdapter(tenant.tenantId, tenant.commerce.shopify);
                break;
            case 'mock':
            default:
                adapter = new MockCommerceAdapter(tenant.tenantId);
                break;
        }
        this.adapterCache.set(cacheKey, adapter);
        return adapter;
    }
}
