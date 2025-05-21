import { BukkuEmailDetails } from "../../common/type";
import { BukkuFileAttachment } from "../../common/type";
import { BukkuListPagination } from "../../common/type";
import { BukkuAttachedFileResponse } from "../../common/type";

/**
 * Represents a form item for creating or updating a Bukku Quotation.
 * This defines the fields expected when providing form items in a create/update payload.
 */
export interface BukkuQuotationFormItemCreateParams {
  /** The id of the item, required when you're updating an item. */
  id?: number;
  /** The type of the item, leave null for normal item. */
  type?: "bundle" | "subtitle" | "subtotal" | "bundle_item" | null;
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
  children?: BukkuQuotationFormItemCreateParams[];
}

/**
 * Parameters for creating a Bukku Quotation.
 * Based on POST /sales/quotes
 */
export interface BukkuQuotationCreateParams {
  contact_id: number; // Customer only
  number?: string; // <= 50 chars, supports format e.g., KT-[5DIGIT] or actual KT-00012. Blank for default.
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
  form_items: Array<BukkuQuotationFormItemCreateParams>; // Array of form item objects
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails; // Object for email sending, sends email if present
  files?: Array<BukkuFileAttachment>; // Files attached
}

/**
 * Parameters for updating a Bukku Quotation.
 * This is similar to BukkuQuotationCreateParams but typically omits fields like 'status'
 * which are managed by specific actions (e.g., PATCH for status update).
 */
export interface BukkuQuotationUpdateParams {
  contact_id: number; // Customer only
  number?: string; // <= 50 chars, supports format e.g., KT-[5DIGIT] or actual KT-00012. Blank for default.
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
  form_items: Array<BukkuQuotationFormItemCreateParams>; // Array of form item objects
  email?: BukkuEmailDetails; // Object for email sending, sends email if present
  files?: Array<BukkuFileAttachment>; // Files attached
  // 'status' is intentionally omitted as it's usually handled by a dedicated status update endpoint.
}

/**
 * Represents a Bukku Quotation object as returned by the API (e.g., in the 'transaction' field of a response).
 */
export interface BukkuQuotation {
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
  amount?: number; // Overall transaction amount
  status: string; // e.g., "ready", "draft", "pending_approval", etc.
  type?: string; // e.g., "sale_quote"
  short_link?: string;
  files?: BukkuAttachedFileResponse[];
  created_at?: string; // ISO 8601 timestamp, e.g., "YYYY-MM-DD HH:MM:SS" or full ISO
  updated_at?: string; // ISO 8601 timestamp
  // Fields from CreateParams not typically in main response object (e.g. `email` for sending)
  // are omitted here unless confirmed to be part of the returned `transaction` object.
}

/**
 * Represents the API response structure when a quotation is created or retrieved.
 */
export interface BukkuQuotationResponse {
  transaction: BukkuQuotation;
}

/**
 * Parameters for listing Bukku Quotations (GET /sales/quotes).
 */
export interface BukkuQuotationListParams {
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
  // Allow other specific filters if any emerge, though the API doc is quite specific
  [key: string]: any;
}

/**
 * Represents a summary of a Bukku Quotation as it appears in a list.
 */
export interface BukkuQuotationListItem {
  id: number;
  number?: string;
  number2?: string;
  contact_id: number;
  contact_name?: string;
  contact_email?: string;
  date: string; // YYYY-MM-DD
  billing_party?: string;
  shipping_party?: string;
  tag_names?: string[];
  title?: string;
  description?: string;
  currency_code: string;
  currency_symbol?: string;
  exchange_rate: number;
  amount?: number; // Overall transaction amount
  status: string; // e.g., "ready"
  transfer_status?: string; // e.g., "NOT_TRANSFERRED"
  email_status?: string; // e.g., "NOT_SENT"
  file_count?: number;
  short_link?: string;
  created_by?: string;
  created_at: string; // e.g., "2022-06-23 15:42:41"
  updated_at: string; // e.g., "2022-06-23 15:42:41"
  // Note: This is a summary type. Detailed fields like form_items or full file details
  // are typically not present in list items but in the full object (BukkuQuotation).
}

/**
 * Represents the API response structure for listing quotations.
 */
export interface BukkuQuotationListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuQuotationListItem[];
}

/**
 * Parameters for updating the status of a Bukku Quotation.
 * Based on PATCH /sales/quotes/{id}
 */
export interface BukkuQuotationStatusUpdateParams {
  /** The new status for the quotation. */
  status: "ready" | "draft" | "pending_approval" | "void";
}
