// --- Sales Order Specific Types ---

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  BukkuAttachedFileResponse,
  BukkuListPagination,
  BukkuFormItem,
} from "../../common/type";

/**
 * Parameters for creating a Bukku Sales Order.
 * Based on POST /sales/orders
 */
export interface BukkuSalesOrderCreateParams {
  contact_id: number; // Customer only
  number?: string; // <= 50 chars, supports format e.g., SO-[5DIGIT] or actual SO-00012. Blank for default.
  number2?: string; // <= 50 chars, reference number
  date: string; // YYYY-MM-DD
  currency_code: string; // ISO standard, e.g., MYR
  exchange_rate: number; // 1 if home currency
  billing_party?: string; // Attention to and address for billing
  show_shipping?: boolean; // Default: false
  shipping_party?: string; // Attention to and address for shipping
  shipping_info?: string; // <= 100 chars, shipping instructions, tracking no, etc.
  tag_ids?: number[]; // Array of integers, <= 4 items
  term_id?: number; // Payment term
  title?: string; // <= 255 chars, title of transaction
  description?: string; // <= 255 chars, description for reports
  remarks?: string; // Additional remarks for bottom of form
  tax_mode: "inclusive" | "exclusive";
  form_items: Array<BukkuSalesOrderFormItemCreateParams>; // Array of form item objects
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails; // Object for email sending, sends email if present
  files?: Array<BukkuFileAttachment>; // Files attached
}

/**
 * Represents a form item for creating a Bukku Sales Order.
 */
export interface BukkuSalesOrderFormItemCreateParams {
  /** The id of the item, required when you're updating an item. */
  id?: number;
  /** The transferred item's id, required for transfer items. Obtained from the to be transferred transaction's form_item's ID. */
  transfer_item_id?: number;
  /** The type of the item, leave null for normal item. */
  type?: null | "bundle" | "subtitle" | "subtotal";
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
  children?: BukkuSalesOrderFormItemCreateParams[]; // Recursive definition for children
}

/**
 * Represents a Bukku Sales Order object as returned by the API (e.g., in the 'transaction' field of a response).
 */
export interface BukkuSalesOrder {
  id: number;
  contact_id: number;
  contact_name?: string;
  number?: string;
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol?: string;
  exchange_rate: number;
  billing_party?: string;
  show_shipping?: boolean;
  shipping_info?: string;
  shipping_party?: string;
  tag_ids?: number[];
  tag_names?: string[];
  term_id?: number;
  term_name?: string;
  title?: string;
  description?: string;
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuFormItem[]; // Array of detailed form item objects
  amount?: number; // Overall transaction amount
  status: string; // e.g., "ready", "draft", "pending_approval"
  type?: string; // e.g., "sales_order"
  short_link?: string;
  files?: BukkuAttachedFileResponse[];
  created_at?: string; // ISO 8601 timestamp
  updated_at?: string; // ISO 8601 timestamp
}

/**
 * Represents the API response structure when a sales order is created or retrieved.
 */
export interface BukkuSalesOrderResponse {
  transaction: BukkuSalesOrder;
}

/**
 * Parameters for updating a Bukku Sales Order.
 * Based on PUT /sales/orders/{id}
 * Similar to CreateParams, but 'number' is required and 'status' is omitted.
 */
export interface BukkuSalesOrderUpdateParams {
  contact_id: number; // Customer only
  number: string; // <= 50 chars, The transaction number. (Required for update)
  number2?: string; // <= 50 chars, reference number
  date: string; // YYYY-MM-DD
  currency_code: string; // ISO standard, e.g., MYR
  exchange_rate: number; // 1 if home currency
  billing_party?: string; // Attention to and address for billing
  show_shipping?: boolean; // Default: false
  shipping_party?: string; // Attention to and address for shipping
  shipping_info?: string; // <= 100 chars, shipping instructions, tracking no, etc.
  tag_ids?: number[]; // Array of integers, <= 4 items
  term_id?: number; // Payment term
  title?: string; // <= 255 chars, title of transaction
  description?: string; // <= 255 chars, description for reports
  remarks?: string; // Additional remarks for bottom of form
  tax_mode: "inclusive" | "exclusive";
  form_items: Array<BukkuSalesOrderFormItemCreateParams>; // Array of form item objects
  email?: BukkuEmailDetails; // Object for email sending, sends email if present
  files?: Array<BukkuFileAttachment>; // Files attached
  // 'status' field is typically not part of an update payload,
  // as status changes are often handled by specific actions or business logic.
}

/**
 * Parameters for updating the status of a Bukku Sales Order.
 * Based on PATCH /sales/orders/{id}
 */
export interface BukkuSalesOrderStatusUpdateParams {
  /** The new status for the sales order. */
  status: "ready" | "draft" | "pending_approval" | "void";
}

/**
 * Parameters for listing Bukku Sales Orders (GET /sales/orders).
 */
export interface BukkuSalesOrderListParams {
  /** Search for keywords in No., Reference No., Title, Remarks, Description, Contact Name, Billing Party & Shipping Party. Max 100 chars. */
  search?: string;
  /** Search for keywords within custom fields, use format DD/MM/YYYY for a date. Max 100 chars. */
  custom_search?: string;
  /** Search by contact ID. */
  contact_id?: number;
  /** Search for transactions on and after the date (YYYY-MM-DD). */
  date_from?: string;
  /** Search for transactions on and before the date (YYYY-MM-DD). */
  date_to?: string;
  /** Search by status, default to All but Void. */
  status?: "all" | "draft" | "pending_approval" | "ready" | "void";
  /** Search by the latest email status. */
  email_status?:
    | "UNSENT"
    | "PENDING"
    | "SENT"
    | "BOUNCED"
    | "OPENED"
    | "VIEWED";
  /** Search by transfer status. */
  transfer_status?:
    | "ALL"
    | "NOT_TRANSFERRED"
    | "PARTIAL_TRANSFERRED"
    | "TRANSFERRED";
  /** The current page number. Default: 1, Min: 1. */
  page?: number;
  /** Number of records per page. Default: 30. */
  page_size?: number;
  /** Sort by field. */
  sort_by?:
    | "number"
    | "date"
    | "contact_name"
    | "number2"
    | "title"
    | "description"
    | "amount"
    | "created_at";
  /** Sort the list in ascending or descending order. */
  sort_dir?: "asc" | "desc";
  // Allow other specific filters if any emerge
  [key: string]: any;
}

/**
 * Represents a summary of a Bukku Sales Order as it appears in a list.
 * This structure is an assumption based on typical list item summaries and quotation list items.
 */
export interface BukkuSalesOrderListItem {
  id: number;
  number?: string;
  number2?: string;
  contact_id: number;
  contact_name?: string;
  contact_email?: string; // Assuming this might be present like in quotations
  date: string; // YYYY-MM-DD
  billing_party?: string;
  shipping_party?: string;
  tag_names?: string[]; // Assuming tags might be present
  title?: string;
  description?: string;
  currency_code: string;
  currency_symbol?: string;
  exchange_rate: number;
  amount?: number; // Overall transaction amount
  status: string;
  transfer_status?: string;
  email_status?: string;
  file_count?: number; // Assuming file count might be present
  short_link?: string; // Assuming short link might be present
  created_by?: string; // Assuming created_by might be present
  created_at: string;
  updated_at: string;
}

/**
 * Represents the API response structure for listing sales orders.
 */
export interface BukkuSalesOrderListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuSalesOrderListItem[];
}
