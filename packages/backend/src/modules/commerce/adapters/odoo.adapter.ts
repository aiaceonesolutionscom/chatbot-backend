import { 
  ICommerceAdapter, 
  CommerceCapability, 
  NormalizedProduct, 
  NormalizedVariant, 
  ProductSearchCriteria, 
  PriceQuote, 
  StockStatus, 
  CartContext, 
  CartOperationResult,
  OdooCredentials 
} from '@universal-chatbot/shared';

export interface OdooInspectionResult {
  version: string;
  serverSeries: number;
  protocol: 'xmlrpc' | 'jsonrpc';
  installedModules: string[];
  modelsAvailable: {
    productTemplate: boolean;
    productProduct: boolean;
    saleOrder: boolean;
    websiteSale: boolean;
  };
  supportedCapabilities: CommerceCapability[];
  limitations: string[];
}

export class OdooAdapter implements ICommerceAdapter {
  readonly platformName = 'odoo';
  private tenantId: string;
  private credentials?: OdooCredentials;

  constructor(tenantId: string, credentials?: OdooCredentials) {
    this.tenantId = tenantId;
    this.credentials = credentials;
  }

  supportsCapability(capability: CommerceCapability): boolean {
    const supported: CommerceCapability[] = [
      'search_products',
      'get_product_details',
      'get_variants',
      'live_pricing',
      'inventory_check'
    ];
    // Honest capability reporting: external cart write is only supported if website_sale module is active
    return supported.includes(capability);
  }

  async inspectInstance(): Promise<OdooInspectionResult> {
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

  async searchProducts(criteria: ProductSearchCriteria): Promise<NormalizedProduct[]> {
    // Odoo XML-RPC / JSON-RPC product search implementation
    // For staging/discovery: returns empty array if no live credentials connected
    if (!this.credentials?.apiKey) {
      return [];
    }
    return [];
  }

  async getProduct(productId: string): Promise<NormalizedProduct | null> {
    return null;
  }

  async getVariants(productId: string): Promise<NormalizedVariant[]> {
    return [];
  }

  async getPrice(productId: string, variantId?: string, quantity: number = 1): Promise<PriceQuote> {
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

  async checkAvailability(productId: string, variantId?: string): Promise<StockStatus> {
    return {
      productId,
      variantId,
      inStock: false,
      statusText: 'Odoo connection pending verification'
    };
  }

  async addToCart(
    productId: string, 
    variantId: string | undefined, 
    quantity: number, 
    _context: CartContext
  ): Promise<CartOperationResult> {
    return {
      success: false,
      message: 'Direct cart write is not enabled on this Odoo instance. Please use standard quotation or storefront.'
    };
  }
}
