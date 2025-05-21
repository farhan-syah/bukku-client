// src/sales/delivery-orders/type.ts

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  // BukkuAttachedFileResponse, // Replaced by specific type below
  BukkuListPagination,
  BukkuFormItem, // This common type is suitable for returned form items
} from "../../common/type";

/**
 * Represents a form item for creating or updating a Bukku Delivery Order.
 * Based on the detailed schema provided for `form_items`.
 */
export interface BukkuDeliveryOrderFormItemCreateParams {
  /** The id of the item, required when you're updating an item. */
  id?: number;
  /** The transferred item's id, required for transfer items. Obtained from the to be transferred transaction's form_item's ID. */
  transfer_item_id?: number; // Common in sales orders, may or may not apply here
  /** The type of the item, leave null for normal item. */
  type?: null | "bundle" | "subtitle" | "subtotal"; // From API schema
  /** The account of the item, required for normal item. (Potentially not applicable for DO if purely inventory) */
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
  /** The unit price of the item, supports up to 4 decimal points. (May not be relevant for DO if not priced) */
  unit_price?: number;
  /** The quantity of the item, supports up to 4 decimal points, required for normal items. */
  quantity?: number;
  /** The discount of the item. (May not be relevant for DO) */
  discount?: string;
  /** The tax code of the item. (May not be relevant for DO) */
  tax_code_id?: number;
  /** The child items, used by bundle. */
  children?: BukkuDeliveryOrderFormItemCreateParams[];
}

/**
 * Parameters for creating a Bukku Delivery Order.
 * Based on POST /sales/delivery_orders
 */
export interface BukkuDeliveryOrderCreateParams {
  contact_id: number;
  number?: string;
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  billing_party?: string;
  show_shipping?: boolean;
  shipping_party?: string;
  shipping_info?: string;
  tag_ids?: number[];
  title?: string;
  description?: string;
  remarks?: string;
  tax_mode: "inclusive" | "exclusive"; // Note: tax_mode might be less relevant if DOs don't have prices/taxes
  form_items: Array<BukkuDeliveryOrderFormItemCreateParams>;
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails;
  files?: Array<BukkuFileAttachment>;
}

/**
 * Represents a Bukku Delivery Order object as returned by the API.
 * This is a general structure and should be verified with actual API responses.
 */
export interface BukkuDeliveryOrder {
  id: number;
  contact_id: number;
  contact_name: string; // From sample
  number: string; // From sample
  number2?: string; // Optional in create, sample shows it
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string; // From sample
  exchange_rate: number;
  billing_party?: string;
  show_shipping?: boolean;
  shipping_info?: string;
  shipping_party?: string;
  tag_ids?: number[];
  tag_names?: string[];
  term_id?: number; // From sample
  term_name?: string; // From sample
  title: string | null; // From sample
  description?: string;
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuFormItem[]; // Common BukkuFormItem matches sample structure
  amount?: number; // Overall transaction amount, present in sample
  status: string; // e.g., "ready"
  type?: string; // e.g., "sale_delivery_order"
  short_link: string; // From sample
  files: BukkuDeliveryOrderFileEntry[]; // Specific type for DO files
  // created_at and updated_at are not in the top-level sample response for transaction
  // Add any other fields specific to Delivery Order responses
}

/**
 * Represents the detailed file information within a Bukku Delivery Order's file entry.
 */
export interface BukkuDeliveryOrderFileDetail {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string; // "YYYY-MM-DD HH:MM:SS" in sample
}

/**
 * Represents a file entry attached to a Bukku Delivery Order.
 * This structure is specific to how files are returned in the DO sample response.
 */
export interface BukkuDeliveryOrderFileEntry {
  id: number;
  file_id: number;
  file: BukkuDeliveryOrderFileDetail[]; // Array of file details
  is_shared: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS" in sample
}

/**
 * Represents the API response structure when a delivery order is created or retrieved.
 */
export interface BukkuDeliveryOrderResponse {
  transaction: BukkuDeliveryOrder;
}

/**
 * Parameters for updating a Bukku Delivery Order.
 * Based on PUT /sales/delivery_orders/{transactionId}
 * 'status' is typically managed by a separate PATCH endpoint.
 */
export interface BukkuDeliveryOrderUpdateParams {
  contact_id: number;
  number: string; // The transaction number.
  number2?: string;
  date: string;
  currency_code: string;
  exchange_rate: number;
  billing_party?: string;
  show_shipping?: boolean;
  shipping_party?: string;
  shipping_info?: string;
  tag_ids?: number[];
  title?: string;
  description?: string;
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: Array<BukkuDeliveryOrderFormItemCreateParams>; // Items might need 'id' for existing ones
  email?: BukkuEmailDetails; // For re-sending or updating email details
  files?: Array<BukkuFileAttachment>; // For updating attachments
}

/**
 * Parameters for updating the status of a Bukku Delivery Order.
 * Based on PATCH /sales/delivery_orders/{transactionId} request body schema.
 */
export interface BukkuDeliveryOrderStatusUpdateParams {
  /** The new status for the delivery order. */
  status: "ready" | "draft" | "pending_approval" | "void";
}

/**
 * Parameters for listing Bukku Delivery Orders (GET /sales/delivery_orders).
 * Refined based on the provided API documentation for list parameters.
 */
export interface BukkuDeliveryOrderListParams {
  search?: string;
  custom_search?: string;
  contact_id?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  /** Search by status, default to All but Void. */
  status?: "all" | "draft" | "pending_approval" | "ready" | "void"; // Adjusted to match API docs
  email_status?:
    | "UNSENT"
    | "PENDING"
    | "SENT"
    | "BOUNCED"
    | "OPENED"
    | "VIEWED"; // If applicable
  transfer_status?: // If DOs can be transferred from/to other documents
    | "ALL"
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
    | "amount" // From API docs
    | "created_at";
  sort_dir?: "asc" | "desc";
  [key: string]: any; // For any other potential filters
}

/**
 * Represents a summary of a Bukku Delivery Order as it appears in a list.
 * Refined based on the provided sample response for list items.
 */
export interface BukkuDeliveryOrderListItem {
  id: number;
  number: string;
  number2: string;
  contact_id: number;
  contact_name: string;
  contact_email: string; 
  date: string; 
  billing_party: string;
  shipping_party: string;
  tag_names?: string[]; // Kept optional as it might not always be present or could be empty array
  title: string | null;
  description: string;
  currency_code: string; 
  currency_symbol: string; 
  exchange_rate: number; 
  amount: number; 
  status: string;
  transfer_status: string; 
  email_status: string; 
  file_count: number;
  short_link: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

/**
 * Represents the API response structure for listing delivery orders.
 */
export interface BukkuDeliveryOrderListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuDeliveryOrderListItem[];
}