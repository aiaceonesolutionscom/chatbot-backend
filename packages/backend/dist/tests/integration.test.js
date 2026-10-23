import { describe, it } from 'node:test';
import assert from 'node:assert';
import { TenantStore } from '../modules/tenant/tenant.store.js';
import { CommerceAdapterFactory } from '../modules/commerce/adapter.factory.js';
import { ConversationEngine } from '../modules/ai/conversation.engine.js';
import { calculateTiles } from '../modules/tools/tile-calculator.js';
describe('Universal Commerce Chatbot - Integration & Verification', () => {
    TenantStore.initializeDefaults();
    it('1. Tenant resolution succeeds for colbolt_live', () => {
        const tenant = TenantStore.getBySiteKey('colbolt_live');
        assert.ok(tenant, 'Tenant colbolt_live should exist');
        assert.strictEqual(tenant.brand.companyName, 'Colbolt');
        assert.strictEqual(tenant.commerce.type, 'woocommerce');
    });
    it('2. WooCommerce Live Adapter fetches real products from colbolt.hawksnfox.com', async () => {
        const tenant = TenantStore.getBySiteKey('colbolt_live');
        const adapter = CommerceAdapterFactory.getAdapter(tenant);
        const products = await adapter.searchProducts({ limit: 4 });
        assert.ok(products.length > 0, 'Should fetch live products from colbolt.hawksnfox.com');
        const first = products[0];
        assert.ok(first.id, 'Product should have an ID');
        assert.ok(first.title, 'Product should have a title');
        assert.ok(first.price.formatted, 'Product should have formatted price');
        console.log(`[Test] Successfully retrieved live product: "${first.title}" - ${first.price.formatted}`);
    });
    it('3. Conversation Engine answers company info questions (What we do / Hum kya kaam karte hain)', async () => {
        const tenant = TenantStore.getBySiteKey('colbolt_live');
        const response = await ConversationEngine.processMessage({
            conversationId: 'test-conv-01',
            message: 'What does Colbolt do? Hum kya kaam karte hain?',
            tenant
        });
        assert.ok(response.message.length > 20, 'Response should contain detailed company information');
        assert.ok(response.message.includes('Colbolt') || response.message.includes('research'), 'Should mention Colbolt or research solutions');
        console.log('[Test] Company Info Response preview:\n' + response.message.substring(0, 150) + '...');
    });
    it('4. Conversation Engine handles live product query and returns product cards', async () => {
        const tenant = TenantStore.getBySiteKey('colbolt_live');
        const response = await ConversationEngine.processMessage({
            conversationId: 'test-conv-02',
            message: 'Show me Tirz products',
            tenant
        });
        assert.ok(response.productCards, 'Should attach product cards');
        assert.ok(response.productCards.length > 0, 'Should return at least 1 Tirz product');
        console.log(`[Test] Product cards attached: ${response.productCards.map(p => p.title).join(', ')}`);
    });
    it('5. Add to Cart generates verified WooCommerce Storefront Bridge payload', async () => {
        const tenant = TenantStore.getBySiteKey('colbolt_live');
        const adapter = CommerceAdapterFactory.getAdapter(tenant);
        const result = await adapter.addToCart('7092', undefined, 1, {});
        assert.strictEqual(result.success, true);
        assert.ok(result.clientBridgePayload, 'Client bridge payload must be provided');
        assert.strictEqual(result.clientBridgePayload.action, 'woocommerce_store_api');
        assert.strictEqual(result.clientBridgePayload.endpoint, 'https://colbolt.hawksnfox.com/wp-json/wc/store/v1/cart/add-item');
        assert.deepStrictEqual(result.clientBridgePayload.domEventsToTrigger, ['added_to_cart', 'wc_fragment_refresh']);
        console.log('[Test] Verified Add to Cart payload generated:', result.clientBridgePayload);
    });
    it('6. Deterministic Tile Calculator executes accurately', () => {
        const result = calculateTiles({
            totalAreaSqFt: 500,
            wastagePercent: 10,
            boxCoverageSqFt: 15.5,
            boxPrice: 40.00
        });
        assert.strictEqual(result.roomAreaSqFt, 500);
        assert.strictEqual(result.wastageSqFt, 50);
        assert.strictEqual(result.totalRequiredAreaSqFt, 550);
        assert.strictEqual(result.boxesNeeded, 36); // Math.ceil(550 / 15.5) = 36
        assert.strictEqual(result.estimatedTotalCost, 1440.00); // 36 * 40
        console.log('[Test] Tile calculation verified:', result.breakdown);
    });
});
