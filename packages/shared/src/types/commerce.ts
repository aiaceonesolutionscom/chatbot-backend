/**
 * Universal Commerce Product Model and Types
 * Normalizes products across WooCommerce, Odoo, Shopify, and custom APIs
 */

export interface ProductImage {
  id?: string | number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  name?: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku?: string;
  price: number;
  formattedPrice: string;
  salePrice?: number;
  formattedSalePrice?: string;
  inStock: boolean;
  stockQuantity?: number;
  attributes: Record<string, string>; // e.g., { "Size": "24x24", "Color": "Ivory" }
  image?: ProductImage;
}

export type NormalizedVariant = ProductVariant;

export interface ProductPackaging {
  piecesPerBox?: number;
  coveragePerBox?: number; // e.g., 15.5 sq ft per box
  coverageUnit?: 'sq_ft' | 'sq_m' | 'sq_yd';
  weightKg?: number;
}

export interface ProductDimensions {
  length?: number;
  width?: number;
  height?: number;
  unit: 'in' | 'cm' | 'mm' | 'm' | 'ft';
}

export interface NormalizedProduct {
  id: string;
  platformId: string;
  tenantId: string;
  title: string;
  slug?: string;
  sku?: string;
  description: string;
  shortDescription?: string;
  permalink?: string;
  categories: { id: string | number; name: string; slug?: string }[];
  tags?: string[];
  images: ProductImage[];
  featuredImage?: string;
  price: {
    regular: number;
    sale?: number;
    currency: string;
    formatted: string;
  };
  inStock: boolean;
  stockQuantity?: number;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  variants: ProductVariant[];
  hasVariants: boolean;
  attributes: Record<string, string[]>; // e.g., { "Color": ["Red", "Blue"], "Size": ["10mg", "30mg"] }
  dimensions?: ProductDimensions;
  packaging?: ProductPackaging;
  unit?: string; // 'piece', 'box', 'vial', 'pair', 'sq_ft'
  rawMetadata?: Record<string, unknown>;
}

export interface ProductSearchCriteria {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  limit?: number;
  page?: number;
  attributes?: Record<string, string>;
}

export interface PriceQuote {
  productId: string;
  variantId?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  currency: string;
  formattedTotalPrice: string;
  unit?: string;
}

export interface StockStatus {
  productId: string;
  variantId?: string;
  inStock: boolean;
  quantity?: number;
  statusText: string;
  leadTimeDays?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  formattedUnitPrice: string;
  formattedTotalPrice: string;
  currency: string;
  image?: string;
  permalink?: string;
  attributes?: Record<string, string>;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  currency: string;
  formattedSubtotal: string;
  checkoutUrl?: string;
  cartUrl?: string;
  needsShipping?: boolean;
  rawPayload?: Record<string, unknown>;
}

export interface CartOperationResult {
  success: boolean;
  message: string;
  cart?: CartState;
  addedItem?: CartItem;
  clientBridgePayload?: {
    action: 'woocommerce_store_api' | 'woocommerce_ajax' | 'shopify_cart' | 'custom_redirect';
    endpoint: string;
    method: 'POST' | 'GET';
    body: Record<string, unknown>;
    nonceRequired?: boolean;
    nonceName?: string;
    domEventsToTrigger?: string[];
  };
}
