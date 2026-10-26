/**
 * Universal Commerce Adapter Contract
 * All platform connectors (WooCommerce, Odoo, Shopify, Mock) implement this interface.
 */

import { 
  NormalizedProduct, 
  NormalizedVariant, 
  ProductSearchCriteria, 
  PriceQuote, 
  StockStatus, 
  CartState, 
  CartOperationResult,
  OrderTrackingResult,
  OrderCancelResult
} from './commerce.js';

export type CommerceCapability = 
  | 'search_products'
  | 'get_product_details'
  | 'get_variants'
  | 'live_pricing'
  | 'inventory_check'
  | 'server_cart_read'
  | 'server_cart_write'
  | 'storefront_cart_bridge'
  | 'remove_from_cart'
  | 'update_cart'
  | 'clear_cart'
  | 'track_order'
  | 'cancel_order';

export interface CartContext {
  shopperSessionId?: string;
  cartToken?: string;
  currency?: string;
  storeOrigin?: string;
  nonce?: string;
}

export interface ICommerceAdapter {
  readonly platformName: string;

  /**
   * Capability discovery: Check if an operation is supported by this platform.
   */
  supportsCapability(capability: CommerceCapability): boolean;

  /**
   * Search catalog products by keywords, categories, or filters.
   */
  searchProducts(criteria: ProductSearchCriteria): Promise<NormalizedProduct[]>;

  /**
   * Retrieve a single product by ID or slug.
   */
  getProduct(productId: string): Promise<NormalizedProduct | null>;

  /**
   * Retrieve available variations for a variable product.
   */
  getVariants(productId: string): Promise<NormalizedVariant[]>;

  /**
   * Calculate or retrieve the current applicable price for product/variant.
   */
  getPrice(productId: string, variantId?: string, quantity?: number): Promise<PriceQuote>;

  /**
   * Check real-time inventory and availability.
   */
  checkAvailability(productId: string, variantId?: string, quantity?: number): Promise<StockStatus>;

  /**
   * Retrieve active cart contents if server-side cart operations are supported.
   */
  getCart?(context: CartContext): Promise<CartState>;

  /**
   * Add a product or variant to cart.
   * May return a direct server cart state OR a client bridge payload for browser execution.
   */
  addToCart(
    productId: string, 
    variantId: string | undefined, 
    quantity: number, 
    context: CartContext
  ): Promise<CartOperationResult>;

  /**
   * Remove a product or variant from active cart ("un-cart").
   */
  removeFromCart?(
    itemKeyOrProductId: string, 
    context: CartContext
  ): Promise<CartOperationResult>;

  /**
   * Update quantity of a cart line item.
   */
  updateCartQuantity?(
    itemKeyOrProductId: string, 
    quantity: number, 
    context: CartContext
  ): Promise<CartOperationResult>;

  /**
   * Clear all items from active cart.
   */
  clearCart?(context: CartContext): Promise<CartOperationResult>;

  /**
   * Track order by Order ID and optional verification email/phone.
   */
  trackOrder?(
    orderId: string, 
    emailOrPhone?: string
  ): Promise<OrderTrackingResult>;

  /**
   * Cancel an order if it is in a cancellable state.
   */
  cancelOrder?(
    orderId: string, 
    emailOrPhone: string, 
    reason?: string
  ): Promise<OrderCancelResult>;
}
