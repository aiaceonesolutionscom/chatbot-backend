import { 
  ICommerceAdapter, 
  CommerceCapability, 
  NormalizedProduct, 
  NormalizedVariant, 
  ProductSearchCriteria, 
  PriceQuote, 
  StockStatus, 
  CartContext, 
  CartOperationResult 
} from '@universal-chatbot/shared';

export class MockCommerceAdapter implements ICommerceAdapter {
  readonly platformName = 'mock';
  private tenantId: string;
  private products: NormalizedProduct[] = [];

  constructor(tenantId: string) {
    this.tenantId = tenantId;
    this.seedMockData();
  }

  private seedMockData(): void {
    this.products = [
      {
        id: 'tile-001',
        platformId: 'tile-001',
        tenantId: this.tenantId,
        title: 'Calacatta Gold Glazed Porcelain Tile',
        slug: 'calacatta-gold-glazed-porcelain-tile',
        sku: 'TILE-CAL-2448',
        description: 'Luxurious Italian-inspired Calacatta Gold porcelain floor and wall tile with high-definition veining and polished high-gloss finish. Perfect for living rooms, bathrooms, and modern kitchens.',
        shortDescription: 'Premium polished porcelain tile with gold and grey marble veining.',
        categories: [{ id: 1, name: 'Floor Tiles' }, { id: 2, name: 'Porcelain' }],
        tags: ['marble look', 'polished', 'large format', 'luxury'],
        images: [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', alt: 'Calacatta Gold Tile' }
        ],
        featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        price: { regular: 42.50, currency: 'USD', formatted: '$42.50' },
        inStock: true,
        stockQuantity: 1200,
        stockStatus: 'instock',
        unit: 'box',
        packaging: {
          piecesPerBox: 2,
          coveragePerBox: 15.5, // 15.5 sq ft per box
          coverageUnit: 'sq_ft'
        },
        dimensions: { length: 48, width: 24, unit: 'in' },
        hasVariants: true,
        variants: [
          {
            id: 'tile-001-gloss',
            title: 'Calacatta Gold - Polished Glossy (24x48 in)',
            price: 42.50,
            formattedPrice: '$42.50',
            inStock: true,
            attributes: { Finish: 'Polished Glossy', Size: '24x48' }
          },
          {
            id: 'tile-001-matte',
            title: 'Calacatta Gold - Matte Satin (24x48 in)',
            price: 39.50,
            formattedPrice: '$39.50',
            inStock: true,
            attributes: { Finish: 'Matte Satin', Size: '24x48' }
          }
        ],
        attributes: {
          Finish: ['Polished Glossy', 'Matte Satin'],
          Size: ['24x48 in'],
          Material: ['Porcelain']
        }
      },
      {
        id: 'tile-002',
        platformId: 'tile-002',
        tenantId: this.tenantId,
        title: 'Modern Matte Concrete Slate Tile',
        slug: 'modern-matte-concrete-slate-tile',
        sku: 'TILE-CONC-1224',
        description: 'Contemporary minimalist grey concrete-look porcelain tile. Slip-resistant textured surface ideal for high-traffic areas, outdoor patios, and modern bathrooms.',
        shortDescription: 'Minimalist slip-resistant grey concrete porcelain tile.',
        categories: [{ id: 1, name: 'Floor Tiles' }, { id: 3, name: 'Bathroom Tiles' }],
        tags: ['concrete look', 'matte', 'grey', 'slip resistant'],
        images: [
          { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800', alt: 'Concrete Slate Tile' }
        ],
        featuredImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        price: { regular: 28.00, currency: 'USD', formatted: '$28.00' },
        inStock: true,
        stockQuantity: 850,
        stockStatus: 'instock',
        unit: 'box',
        packaging: {
          piecesPerBox: 8,
          coveragePerBox: 16.0,
          coverageUnit: 'sq_ft'
        },
        dimensions: { length: 24, width: 12, unit: 'in' },
        hasVariants: false,
        variants: [],
        attributes: {
          Finish: ['Matte Textured'],
          Size: ['12x24 in'],
          Color: ['Medium Grey', 'Charcoal']
        }
      },
      {
        id: 'shoe-001',
        platformId: 'shoe-001',
        tenantId: this.tenantId,
        title: 'Air Flex Pro Running Shoes',
        slug: 'air-flex-pro-running-shoes',
        sku: 'SHOE-AFP-01',
        description: 'Ultra-lightweight breathable mesh running shoes with responsive shock-absorbing cushioning and durable anti-slip rubber outsole.',
        shortDescription: 'Lightweight breathable performance running shoes.',
        categories: [{ id: 4, name: 'Footwear' }, { id: 5, name: 'Running Shoes' }],
        tags: ['running', 'breathable', 'cushioned'],
        images: [
          { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', alt: 'Air Flex Pro' }
        ],
        featuredImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
        price: { regular: 89.00, sale: 75.00, currency: 'USD', formatted: '$75.00' },
        inStock: true,
        stockQuantity: 45,
        stockStatus: 'instock',
        unit: 'pair',
        hasVariants: true,
        variants: [
          {
            id: 'shoe-001-42-red',
            title: 'Air Flex Pro - Size 42 (US 9) - Red',
            price: 75.00,
            formattedPrice: '$75.00',
            inStock: true,
            attributes: { Size: '42 (US 9)', Color: 'Crimson Red' }
          },
          {
            id: 'shoe-001-43-black',
            title: 'Air Flex Pro - Size 43 (US 10) - Black',
            price: 75.00,
            formattedPrice: '$75.00',
            inStock: true,
            attributes: { Size: '43 (US 10)', Color: 'Stealth Black' }
          }
        ],
        attributes: {
          Size: ['40 (US 7.5)', '41 (US 8)', '42 (US 9)', '43 (US 10)', '44 (US 11)'],
          Color: ['Crimson Red', 'Stealth Black', 'Pure White']
        }
      }
    ];
  }

  supportsCapability(capability: CommerceCapability): boolean {
    return true;
  }

  async searchProducts(criteria: ProductSearchCriteria): Promise<NormalizedProduct[]> {
    let results = [...this.products];

    if (criteria.query) {
      const q = criteria.query.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q)) ||
        p.categories.some(c => c.name.toLowerCase().includes(q))
      );
    }

    if (criteria.minPrice !== undefined) {
      results = results.filter(p => p.price.regular >= criteria.minPrice!);
    }
    if (criteria.maxPrice !== undefined) {
      results = results.filter(p => (p.price.sale || p.price.regular) <= criteria.maxPrice!);
    }

    const limit = criteria.limit || 10;
    return results.slice(0, limit);
  }

  async getProduct(productId: string): Promise<NormalizedProduct | null> {
    const product = this.products.find(p => p.id === productId || p.slug === productId);
    return product || null;
  }

  async getVariants(productId: string): Promise<NormalizedVariant[]> {
    const p = await this.getProduct(productId);
    return p?.variants || [];
  }

  async getPrice(productId: string, variantId?: string, quantity: number = 1): Promise<PriceQuote> {
    const p = await this.getProduct(productId);
    if (!p) throw new Error(`Product not found: ${productId}`);

    let unitPrice = p.price.sale || p.price.regular;
    if (variantId) {
      const v = p.variants.find(item => item.id === variantId);
      if (v) unitPrice = v.price;
    }

    const total = unitPrice * quantity;
    return {
      productId,
      variantId,
      unitPrice,
      quantity,
      totalPrice: total,
      currency: p.price.currency,
      formattedTotalPrice: `$${total.toFixed(2)}`
    };
  }

  async checkAvailability(productId: string, variantId?: string): Promise<StockStatus> {
    const p = await this.getProduct(productId);
    if (!p) return { productId, variantId, inStock: false, statusText: 'Not found' };
    return {
      productId,
      variantId,
      inStock: p.inStock,
      quantity: p.stockQuantity,
      statusText: p.inStock ? 'In Stock' : 'Out of Stock'
    };
  }

  async addToCart(
    productId: string, 
    variantId: string | undefined, 
    quantity: number, 
    _context: CartContext
  ): Promise<CartOperationResult> {
    const p = await this.getProduct(productId);
    const targetId = variantId || productId;
    return {
      success: true,
      message: `Added ${quantity}x ${p ? p.title : 'item'} to cart (Mock Mode).`,
      addedItem: {
        id: targetId,
        productId,
        variantId,
        title: p?.title || 'Mock Item',
        quantity,
        unitPrice: p?.price.regular || 10,
        totalPrice: (p?.price.regular || 10) * quantity,
        formattedUnitPrice: p?.price.formatted || '$10.00',
        formattedTotalPrice: `$${((p?.price.regular || 10) * quantity).toFixed(2)}`,
        currency: p?.price.currency || 'USD',
        image: p?.featuredImage
      }
    };
  }
}
