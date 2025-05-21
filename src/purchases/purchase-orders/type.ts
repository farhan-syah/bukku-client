// src/purchases/purchase-orders/type.ts

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  BukkuAttachedFileResponse,
  BukkuListPagination,
  BukkuFormItem, // For response form items
} from "../../common/type";

/**
 * Represents a form item for creating or updating a Bukku Purchase Order.
 */
export interface BukkuPurchaseOrderFormItemCreateParams {
  /** The id of the item, required when you're updating an item. */
  id?: number;
  /** The type of the item, leave null for normal item. */
  type?: "bundle" | "subtitle" | "subtotal" | null;
  /** The account of the item, required for normal item. */
  account_id?: number;
  /** The description of the item, required for normal / bundle & subtitle items. */
  description?: string;
  /** The service date of the item, following format YYYY-MM-DD. */
  service_date?: string;
  /** The product of the item. */
  product_id?: number;
  /** The product unit / UOM of the product, leave blank to use the product's default unit. */
  product_unit_id?: number;
  /** The location of the product, used for inventory product, leave blank to use the system default location. */
  location_id?: number;
  /** The unit price of the item, supports up to 4 decimal points, required for normal items. */
  unit_price?: number;
  /** The quantity of the item, supports up to 4 decimal points, required for normal items. */
  quantity?: number;
  /** The discount of the item, supports value (eg. 255.12) or percentage (eg. 10%). Max 14 chars. */
  discount?: string;
  /** The tax code of the item. */
  tax_code_id?: number;
  /** The child items, used by bundle. */
  children?: BukkuPurchaseOrderFormItemCreateParams[];
}

/**
 * Parameters for creating a Bukku Purchase Order.
 * Based on POST /purchases/orders
 */
export interface BukkuPurchaseOrderCreateParams {
  contact_id: number; // Supplier only
  number?: string; // <= 50 chars
  number2?: string; // <= 50 chars
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  billing_party?: string;
  show_shipping?: boolean; // Default: false
  shipping_party?: string;
  shipping_info?: string; // <= 100 chars
  tag_ids?: number[]; // <= 4 items
  term_id?: number;
  title?: string; // <= 255 chars
  description?: string; // <= 255 chars
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuPurchaseOrderFormItemCreateParams[];
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails;
  files?: BukkuFileAttachment[];
}

/**
 * Represents a Bukku Purchase Order object as returned by the API.
 */
export interface BukkuPurchaseOrder {
  id: number;
  contact_id: number;
  contact_name: string;
  number: string;
  number2: string | null; // Sample response shows string, but can be null if not provided
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  billing_party: string | null; // Sample shows string, but can be null
  show_shipping: boolean;
  shipping_info: string | null; // Sample shows string, but can be null
  shipping_party: string | null; // Sample shows string, but can be null
  tag_ids: number[] | null; // Sample shows array, can be null
  tag_names: string[] | null; // Sample shows array, can be null
  term_id: number | null; // Sample shows number, can be null
  term_name: string | null; // Sample shows string, can be null
  title: string | null;
  description: string | null; // Sample shows string, can be null
  remarks: string | null; // Sample shows string, can be null
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuFormItem[]; // Using common BukkuFormItem for response
  amount: number;
  status: string;
  type: string; // e.g., "purchase_order"
  short_link: string;
  files: BukkuAttachedFileResponse[] | null; // Sample shows array, can be null
}

/**
 * Represents the API response structure when a purchase order is created or retrieved.
 */
export interface BukkuPurchaseOrderResponse {
  transaction: BukkuPurchaseOrder;
}

/**
 * Parameters for updating a Bukku Purchase Order.
 * Based on PUT /purchases/orders/{id}
 */
export interface BukkuPurchaseOrderUpdateParams {
  contact_id: number;
  number: string; // Required for update
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  billing_party?: string;
  show_shipping?: boolean;
  shipping_party?: string;
  shipping_info?: string;
  tag_ids?: number[];
  term_id?: number;
  title?: string;
  description?: string;
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuPurchaseOrderFormItemCreateParams[];
  email?: BukkuEmailDetails;
  files?: BukkuFileAttachment[];
  // Status is typically updated via a separate PATCH request
}

/**
 * Parameters for updating the status of a Bukku Purchase Order.
 * Based on PATCH /purchases/orders/{id}
 */
export interface BukkuPurchaseOrderStatusUpdateParams {
  status: "draft" | "pending_approval" | "ready" | "void"; // Added "void" as a common status option
}

/**
 * Parameters for listing Bukku Purchase Orders (GET /purchases/orders).
 */
export interface BukkuPurchaseOrderListParams {
  search?: string;
  custom_search?: string;
  contact_id?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  status?: "all" | "draft" | "pending_approval" | "ready" | "void";
  email_status?:
    | "UNSENT"
    | "PENDING"
    | "SENT"
    | "BOUNCED"
    | "OPENED"
    | "VIEWED";
  transfer_status?: // Assuming similar to sales orders
  | "ALL"
    | "OUTSTANDING" // Added from API details
    | "NOT_TRANSFERRED"
    | "PARTIAL_TRANSFERRED"
    | "TRANSFERRED";
  page?: number;
  page_size?: number;
  sort_by?:
    | "number"
    | "date"
    | "contact_name"
    | "number2"
    | "title"
    | "description"
    | "amount"
    | "created_at";
  sort_dir?: "asc" | "desc";
  [key: string]: any;
}

/**
 * Represents a summary of a Bukku Purchase Order as it appears in a list.
 */
export interface BukkuPurchaseOrderListItem {
  id: number;
  contact_id: number;
  contact_name: string;
  number: string;
  number2: string | null;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  billing_party?: string | null;
  shipping_party?: string | null;
  tag_names?: string[] | null;
  title?: string | null;
  description?: string | null;
  amount: number;
  status: string;
  transfer_status?: string; // If applicable and available in API response
  email_status?: string; // If applicable
  file_count?: number; // Common in list items
  short_link?: string;
  created_by?: string; // Common in list items
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
  // Any other fields specific to purchase order list items from API
}

/**
 * Represents the API response structure for listing purchase orders.
 */
export interface BukkuPurchaseOrderListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuPurchaseOrderListItem[];
}
