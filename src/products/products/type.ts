// bukku/src/products/products/type.ts

import { BukkuListPagination } from "../../common/type";

/**
 * Represents a unit for a product when creating or updating.
 */
export interface BukkuProductUnitParams {
  /** The ID of the unit, required when updating an existing unit. Omit for new units. */
  id?: number;
  label: string; // <= 8 characters
  rate: number;
  sale_price?: number; // Required if product is_selling is true
  purchase_price?: number; // Required if product is_buying is true
  is_base?: boolean;
  is_sale_default?: boolean;
  is_purchase_default?: boolean;
}

/**
 * Represents a custom sale price for a product when creating or updating.
 */
export interface BukkuProductSalePriceParams {
  /** The ID of the sale price entry, required when updating an existing one. Omit for new entries. */
  id?: number;
  price_level_id?: number; // Exclude for create, include for update (this seems to be Bukku's own price level ID)
  contact_id?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  product_unit_id: number;
  minimum_quantity: number; // >= 0
  currency_code: string; // ISO standard
  unit_price?: number;
}

/**
 * Represents a custom purchase price for a product when creating or updating.
 */
export interface BukkuProductPurchasePriceParams {
  /** The ID of the purchase price entry, required when updating an existing one. Omit for new entries. */
  id?: number;
  price_level_id?: number; // Exclude for create, include for update
  contact_id?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  product_unit_id: number;
  minimum_quantity: number; // >= 0
  currency_code: string; // ISO standard
  unit_price?: number;
}

/**
 * Parameters for creating a new Product.
 * Based on POST /products
 */
export interface BukkuProductCreateParams {
  name: string; // <= 255 characters
  sku?: string; // <= 50 characters
  classification_code?: string | null; // <= 3 characters (Malaysia only)
  is_selling: boolean;
  sale_description?: string;
  sale_account_id?: number; // Required if is_selling is true
  sale_tax_code_id?: number;
  is_buying: boolean;
  purchase_description?: string;
  purchase_account_id?: number; // Required if is_buying is true
  purchase_tax_code_id?: number;
  track_inventory: boolean;
  inventory_account_id?: number; // Required if track_inventory is true
  quantity_low_alert?: number;
  bin_location?: string; // <= 60 characters
  remarks?: string;
  units: BukkuProductUnitParams[];
  group_ids?: number[];
  sale_prices?: BukkuProductSalePriceParams[];
  purchase_prices?: BukkuProductPurchasePriceParams[];
}

/**
 * Represents a Unit of a Product as returned by the API.
 */
export interface BukkuProductUnitResponse {
  id: number;
  label: string;
  rate: number;
  sale_price: number | null;
  purchase_price: number | null;
  is_base: boolean;
  is_sale_default: boolean;
  is_purchase_default: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a Custom Sale Price of a Product as returned by the API.
 */
export interface BukkuProductSalePriceResponse {
  id: number;
  price_level_id: number | null;
  contact_id: number | null;
  date_from: string | null; // YYYY-MM-DD
  date_to: string | null; // YYYY-MM-DD
  minimum_quantity: number;
  product_unit_id: number;
  currency_code: string;
  unit_price: number | null;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a Custom Purchase Price of a Product as returned by the API.
 */
export interface BukkuProductPurchasePriceResponse {
  id: number;
  price_level_id: number | null;
  contact_id: number | null;
  date_from: string | null; // YYYY-MM-DD
  date_to: string | null; // YYYY-MM-DD
  minimum_quantity: number;
  product_unit_id: number;
  currency_code: string;
  unit_price: number | null;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a Product object as returned by the API.
 */
export interface BukkuProduct {
  id: number;
  name: string;
  sku: string | null;
  classification_code: string | null;
  type: string; // e.g., "product"
  is_selling: boolean;
  sale_description: string | null;
  sale_account_id: number | null;
  sale_tax_code_id: number | null;
  is_buying: boolean;
  purchase_description: string | null;
  purchase_account_id: number | null;
  purchase_tax_code_id: number | null;
  track_inventory: boolean;
  inventory_account_id: number | null;
  quantity_low_alert: number | null;
  quantity: number | null; // Current quantity, likely from inventory tracking
  bin_location: string | null;
  remarks: string | null;
  units: BukkuProductUnitResponse[] | null;
  group_ids: number[] | null;
  sale_prices: BukkuProductSalePriceResponse[] | null;
  purchase_prices: BukkuProductPurchasePriceResponse[] | null;
  is_archived: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure when a product is created or retrieved.
 */
export interface BukkuProductResponse {
  product: BukkuProduct;
}

/**
 * Parameters for listing Bukku Products.
 * Based on GET /products query parameters
 */
export interface BukkuProductListParams {
  /** Search for keywords in Name, SKU, Sale Description, Purchase Description, Remarks. <= 60 characters */
  search?: string;
  /** Search by the stock level of product. */
  stock_level?: "all" | "no_stock" | "low_stock";
  /** Search by product mode. */
  mode?: "sale" | "purchase";
  /** Search by product type. */
  type?: "product" | "bundle";
  /** Whether to include soft deleted products. */
  include_archived?: boolean;
  /** The current page number. Default: 1, Min: 1. */
  page?: number;
  /** Number of records per page. Default: 30. */
  page_size?: number;
  /** Sort by field. */
  sort_by?: "name" | "sku" | "sale_price" | "purchase_price" | "quantity";
  /** Sort the list in ascending or descending order. */
  sort_dir?: "asc" | "desc";
  [key: string]: any; // For any other potential query params not explicitly defined
}

/**
 * Represents a summary of a Bukku Product as it appears in a list.
 * This should align with the fields returned by the GET /products endpoint for list items.
 * Based on the full BukkuProduct, but might be a subset.
 */
export interface BukkuProductListItem {
  id: number;
  name: string;
  sku: string | null;
  classification_code: string | null;
  type: string; // "product" or "bundle"
  is_selling: boolean;
  sale_description: string | null;
  sale_account_id: number | null;
  sale_tax_code_id: number | null;
  is_buying: boolean;
  purchase_description: string | null;
  purchase_account_id: number | null;
  purchase_tax_code_id: number | null;
  track_inventory: boolean;
  inventory_account_id: number | null;
  quantity_low_alert: number | null;
  quantity: number | null;
  bin_location: string | null;
  remarks: string | null;
  // units, group_ids, sale_prices, purchase_prices might be too detailed for a list view,
  // but the API response structure will confirm this.
  // For now, assuming they are not in the list item, add if they are.
  is_archived: boolean;
  created_at: string; 
  updated_at: string; 
  // Add sale_price and purchase_price if they are top-level fields in the list item response
  sale_price?: number | null; // Assuming this might be the default sale price from base unit
  purchase_price?: number | null; // Assuming this might be the default purchase price from base unit
}

/**
 * Represents the API response structure for listing products.
 */
export interface BukkuProductListApiResponse {
  paging: BukkuListPagination;
  products: BukkuProductListItem[];
}

/**
 * Parameters for updating an existing Product.
 * Based on PUT /products/{productId}
 * Fields that are required for creation are also required for update.
 */
export interface BukkuProductUpdateParams {
  name: string; // <= 255 characters
  sku?: string; // <= 50 characters
  classification_code?: string | null; // <= 3 characters (Malaysia only)
  is_selling: boolean;
  sale_description?: string;
  sale_account_id?: number; // Required if is_selling is true
  sale_tax_code_id?: number;
  is_buying: boolean;
  purchase_description?: string;
  purchase_account_id?: number; // Required if is_buying is true
  purchase_tax_code_id?: number;
  track_inventory: boolean;
  inventory_account_id?: number; // Required if track_inventory is true
  quantity_low_alert?: number;
  bin_location?: string; // <= 60 characters
  remarks?: string;
  /** 
   * Array of product units. 
   * When updating, include 'id' for existing units to modify them. 
   * Omit 'id' for new units to add them. 
   * Units not included in the array might be removed (API behavior dependent).
   */
  units: BukkuProductUnitParams[]; 
  group_ids?: number[];
  /** 
   * Array of product custom sale prices. 
   * Include 'id' for existing entries to modify. Omit for new entries. 
   * Entries not included might be removed.
   */
  sale_prices?: BukkuProductSalePriceParams[];
  /** 
   * Array of product custom purchase prices. 
   * Include 'id' for existing entries to modify. Omit for new entries. 
   * Entries not included might be removed.
   */
  purchase_prices?: BukkuProductPurchasePriceParams[];
  is_archived?: boolean; // To archive or unarchive a product
}

/**
 * Parameters for archiving or unarchiving a Product.
 * Based on PATCH /products/{productId}
 */
export interface BukkuProductArchiveParams {
  is_archived: boolean;
}
