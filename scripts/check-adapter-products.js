import { TenantStore } from '../packages/backend/dist/modules/tenant/tenant.store.js';
import { CommerceAdapterFactory } from '../packages/backend/dist/modules/commerce/adapter.factory.js';

async function checkProducts() {
  TenantStore.initializeDefaults();
  const tenant = TenantStore.getBySiteKey('colbolt_live');
  const adapter = CommerceAdapterFactory.getAdapter(tenant);
  const products = await adapter.searchProducts({ limit: 10 });
  console.log('Adapter products:');
  products.forEach(p => console.log(`ID: "${p.id}", platformId: "${p.platformId}", title: "${p.title}"`));
}

checkProducts();
