// src/sales/invoices/type.ts

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  // Assuming BukkuAttachedFileResponse might be similar to BukkuInvoiceFileEntry or common.
  // For now, we define specific types for Invoice files based on the sample.
  BukkuListPagination,
  // BukkuFormItem, // We'll define a specific BukkuInvoiceFormItem for response.
} from "../../common/type";

/**
 * Represents a form item for creating or updating a Bukku Invoice.
 */
export interface BukkuInvoiceFormItemCreateParams {
  id?: number;
  transfer_item_id?: number;
  type?: null | "bundle" | "subtitle" | "subtotal";
  account_id?: number; // Required for normal item
  description?: string; // Required for normal / bundle & subtitle items
  service_date?: string; // YYYY-MM-DD
  product_id?: number;
  product_unit_id?: number;
  location_id?: number;
  unit_price?: number; // Required for normal items
  quantity?: number; // Required for normal items
  discount?: string; // <= 14 chars
  tax_code_id?: number;
  classification_code?: string; // Conditionally required
  children?: BukkuInvoiceFormItemCreateParams[];
}

/**
 * Represents a term item for creating a Bukku Invoice.
 * Required when payment_mode is "credit".
 */
export interface BukkuInvoiceTermItemCreateParams {
  id?: number;
  term_id?: number; // Due date auto-calculated if supplied
  date?: string; // YYYY-MM-DD, required if term_id is missing
  payment_due?: string; // Value (e.g., "100.25") or percentage (e.g., "20%")
  description?: string;
}

/**
 * Represents a deposit item for creating a Bukku Invoice.
 * Required when payment_mode is "cash".
 */
export interface BukkuInvoiceDepositItemCreateParams {
  id?: number;
  payment_method_id?: number;
  account_id: number; // Required
  amount: number; // Required
  number?: string;
  fee_text?: string; // Include '%' if percentage
  fee_account_id?: number; // Required if fee_text is present
}

/**
 * Parameters for creating a Bukku Invoice.
 * Based on POST /sales/invoices
 */
export interface BukkuInvoiceCreateParams {
  payment_mode: "cash" | "credit";
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
  tag_ids?: number[]; // Array of integers, <= 4 items
  title?: string;
  description?: string;
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: Array<BukkuInvoiceFormItemCreateParams>;
  term_items?: Array<BukkuInvoiceTermItemCreateParams>; // Required if payment_mode is "credit"
  deposit_items?: Array<BukkuInvoiceDepositItemCreateParams>; // Required if payment_mode is "cash"
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails;
  files?: Array<BukkuFileAttachment>;
  customs_form_no?: string | null;
  customs_k2_form_no?: string | null;
  incoterms?: string | null;
  myinvois_action?: "NORMAL" | "VALIDATE" | "EXTERNAL"; // Conditionally required
}

// --- Response Types ---

/**
 * Represents a form item within a Bukku Invoice response.
 */
export interface BukkuInvoiceFormItem {
  id: number;
  type: "bundle" | "subtitle" | "subtotal" | null; // Assuming type can be null from sample context
  line: number;
  account_id: number;
  account_name: string;
  description: string;
  service_date: string; // YYYY-MM-DD
  product_id: number;
  product_name: string;
  product_sku: string;
  product_bin_location: string;
  product_unit_id: number;
  product_unit_label: string;
  location_id: number;
  location_code: string;
  quantity: number;
  unit_price: number;
  amount: number;
  discount: string;
  discount_amount: number;
  tax_code_id: number;
  tax_code: string;
  tax_amount: number;
  net_amount: number;
  classification_code: string;
  classification_name: string;
  // children might appear here if type is bundle, similar to create params
  children?: BukkuInvoiceFormItem[]; // Assuming children follow the same structure
}

/**
 * Represents a term item within a Bukku Invoice response.
 */
export interface BukkuInvoiceTermItem {
  id: number;
  term_id: number;
  term_name: string;
  date: string; // YYYY-MM-DD
  payment_due: string;
  description: string;
  amount: number;
  balance: number;
}

/**
 * Represents a deposit item within a Bukku Invoice response.
 */
export interface BukkuInvoiceDepositItem {
  id: number;
  line: number;
  payment_method_id: number;
  account_id: number;
  amount: number;
  number: string;
  fee_text: number | string; // Sample shows number, docs imply string for fee_text in create
  fee_account_id: number;
}

/**
 * Represents a linked item within a Bukku Invoice response.
 */
export interface BukkuInvoiceLinkedItem {
  id: number;
  origin_transaction_id: number;
  type: string; // e.g., "sale_invoice"
  number: string;
  date: string; // YYYY-MM-DD
  amount: number;
  balance: number;
  apply_amount: number;
}

/**
 * Represents the detailed file information within a Bukku Invoice's file entry.
 * This is similar to BukkuDeliveryOrderFileDetail.
 */
export interface BukkuInvoiceFileDetail {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a file entry attached to a Bukku Invoice.
 * This is similar to BukkuDeliveryOrderFileEntry.
 */
export interface BukkuInvoiceFileEntry {
  id: number;
  file_id: number;
  file: BukkuInvoiceFileDetail[]; // Array of file details
  is_shared: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a Bukku Invoice object as returned by the API.
 */
export interface BukkuInvoice {
  id: number;
  payment_mode: "cash" | "credit";
  contact_id: number;
  contact_name: string;
  number: string;
  number2: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  billing_party: string;
  show_shipping: boolean;
  shipping_info: string;
  shipping_party: string;
  tag_ids: number[];
  tag_names: string[];
  title: string;
  description: string;
  remarks: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuInvoiceFormItem[];
  term_items: BukkuInvoiceTermItem[];
  deposit_items: BukkuInvoiceDepositItem[];
  linked_items: BukkuInvoiceLinkedItem[];
  amount: number;
  balance: number;
  rounding_on: boolean;
  rounding_amount: number;
  status: string; // "draft", "pending_approval", "ready", etc.
  type: string; // e.g., "sale_invoice"
  short_link: string;
  files: BukkuInvoiceFileEntry[];
  customs_form_no: string | null;
  customs_k2_form_no: string | null;
  incoterms: string | null;
  myinvois_action: "NORMAL" | "VALIDATE" | "EXTERNAL" | null; // Sample implies it can be one of these, or potentially null if not applicable
  myinvois_document_uuid: string | null;
  myinvois_document_long_id: string | null;
  myinvois_document_status: string | null; // e.g., "VALID"
  issued_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  validated_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  rejected_at: string | null;
  reject_message: string | null;
  cancelled_at: string | null;
  cancel_message: string | null;
}

/**
 * Represents the API response structure when an invoice is created or retrieved.
 */
export interface BukkuInvoiceResponse {
  transaction: BukkuInvoice;
}

/**
 * Parameters for listing Bukku Invoices (GET /sales/invoices).
 */
export interface BukkuInvoiceListParams {
  payment_status?: "PAID" | "OUTSTANDING" | "OVERDUE";
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  search?: string; // <= 100 characters
  custom_search?: string; // <= 100 characters
  contact_id?: number;
  payment_mode?: "credit" | "cash";
  status?: "all" | "draft" | "pending_approval" | "ready" | "void";
  email_status?:
    | "UNSENT"
    | "PENDING"
    | "SENT"
    | "BOUNCED"
    | "OPENED"
    | "VIEWED";
  sort_by?:
    | "number"
    | "date"
    | "contact_name"
    | "number2"
    | "title"
    | "description"
    | "amount"
    | "balance"
    | "created_at";
  sort_dir?: "asc" | "desc";
  page?: number; // >= 1, Default: 1
  page_size?: number; // Default: 30
  [key: string]: any; // For any other potential filters
}

/**
 * Represents a summary of a Bukku Invoice as it appears in a list.
 */
export interface BukkuInvoiceListItem {
  id: number;
  number: string;
  number2: string;
  contact_id: number;
  contact_name: string;
  contact_email: string;
  date: string; // YYYY-MM-DD
  billing_party: string;
  shipping_party: string;
  tag_names?: string[]; // Optional as it might not always be present or could be empty
  title: string;
  description: string;
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  amount: number;
  status: string;
  email_status: string;
  file_count: number;
  short_link: string;
  created_by: string;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
  customs_form_no: string | null;
  customs_k2_form_no: string | null;
  incoterms: string | null;
  myinvois_action: string | null; // e.g., "VALIDATE" or null
  myinvois_document_uuid: string | null;
  myinvois_document_long_id: string | null;
  myinvois_document_status: string | null; // e.g., "VALID" or null
  issued_at: string | null; // "YYYY-MM-DD HH:MM:SS" or null
  validated_at: string | null; // "YYYY-MM-DD HH:MM:SS" or null
  rejected_at: string | null;
  reject_message: string | null;
  cancelled_at: string | null;
  cancel_message: string | null;
  // Note: Balance is mentioned in sort_by but not in the sample list item.
  // It might be available or implied. Add if confirmed.
  // balance?: number;
}

/**
 * Represents the API response structure for listing invoices.
 */
export interface BukkuInvoiceListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuInvoiceListItem[];
}

/**
 * Parameters for updating a Bukku Invoice.
 * Based on PUT /sales/invoices/{transactionId}
 * 'status' and 'payment_mode' are typically not updatable via this kind of request.
 * 'number' becomes a required field.
 */
export interface BukkuInvoiceUpdateParams {
  payment_mode: "cash" | "credit";
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
  tag_ids?: number[]; // Array of integers, <= 4 items
  title?: string;
  description?: string;
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: Array<BukkuInvoiceFormItemCreateParams>; // Items might need 'id' for existing ones
  term_items?: Array<BukkuInvoiceTermItemCreateParams>; // Conditional on payment_mode (which is not updatable here but part of the original invoice logic)
  deposit_items?: Array<BukkuInvoiceDepositItemCreateParams>; // Conditional on payment_mode
  email?: BukkuEmailDetails;
  files?: Array<BukkuFileAttachment>;
  customs_form_no?: string | null;
  customs_k2_form_no?: string | null;
  incoterms?: string | null;
  myinvois_action?: "NORMAL" | "VALIDATE" | "EXTERNAL"; // Conditionally required
}

/**
 * Parameters for updating the status of a Bukku Invoice.
 * Based on PATCH /sales/invoices/{transactionId} request body schema.
 */
export interface BukkuInvoiceStatusUpdateParams {
  /** The new status for the invoice. */
  status: "ready" | "draft" | "pending_approval" | "void";
}
