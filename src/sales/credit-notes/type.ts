// src/sales/credit-notes/type.ts

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  BukkuListPagination,
  BukkuFormItem, // Common response type for form items
} from "../../common/type";

/**
 * Represents a form item for creating or updating a Bukku Credit Note.
 */
export interface BukkuCreditNoteFormItemCreateParams {
  /** The id of the item, required when you're updating an item. */
  id?: number;
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
  /**
   * The classification code, required for bundle items. Retrieve values from Lists API of item classification_code_list.
   * Conditionally required based on MyInvois settings.
   */
  classification_code?: string;
  /** The child items, used by bundle. */
  children?: BukkuCreditNoteFormItemCreateParams[];
}

/**
 * Represents a link item for creating a Bukku Credit Note, specifying where credit is applied.
 */
export interface BukkuCreditNoteLinkItemCreateParams {
  /** The id of the link item, required when you're updating an item. */
  id?: number;
  /** The target transaction to apply the amount to. */
  target_transaction_id: number;
  /** The amount to apply. */
  apply_amount: number;
}

/**
 * Parameters for creating a Bukku Credit Note.
 * Based on POST /sales/credit_notes
 */
export interface BukkuCreditNoteCreateParams {
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
  form_items: Array<BukkuCreditNoteFormItemCreateParams>;
  link_items?: Array<BukkuCreditNoteLinkItemCreateParams>;
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails;
  files?: Array<BukkuFileAttachment>;
  /** The customs form number. Present only if myinvois_action is present. */
  customs_form_no?: string | null;
  /** The customs K2 form number. Present only if myinvois_action is present. */
  customs_k2_form_no?: string | null;
  /** The incoterms value. Present only if myinvois_action is present. */
  incoterms?: string | null;
  /** Determines if the current transaction will be submitted to MyInvois. Conditionally required. */
  myinvois_action?: "NORMAL" | "VALIDATE" | "EXTERNAL";
}

// --- Response Types ---

/**
 * Represents an item this Credit Note is applied to, in a Bukku Credit Note response.
 * Based on the `link_items` array in the sample response.
 */
export interface BukkuCreditNoteAppliedToItem {
  id: number; // ID of the link record itself
  target_transaction_id: number; // ID of the invoice/document this CN is applied to
  type: string; // e.g., "sale_invoice"
  number: string; // Number of the target document
  date: string; // YYYY-MM-DD, date of the target document
  description?: string; // Description of the target document
  amount: number; // Original total amount of the target document
  balance: number; // Remaining balance on the target document after this CN's application
}

/**
 * Represents an origin transaction linked to this Credit Note, in a Bukku Credit Note response.
 * Based on the `linked_items` array in the sample response.
 */
export interface BukkuCreditNoteOriginLinkItem {
  id: number; // ID of the link record itself
  origin_transaction_id: number; // ID of the source transaction
  type: string; // Type of the source transaction
  number: string; // Number of the source transaction
  date: string; // YYYY-MM-DD, date of the source transaction
  amount: number; // Amount from the origin transaction
  balance: number; // Balance of the origin transaction
  apply_amount: number; // Amount from the origin transaction applied/linked to this CN
}

/**
 * Represents the detailed file information within a Bukku Credit Note's file entry.
 */
export interface BukkuCreditNoteFileDetail {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a file entry attached to a Bukku Credit Note.
 */
export interface BukkuCreditNoteFileEntry {
  id: number;
  file_id: number;
  file: BukkuCreditNoteFileDetail[]; // Array of file details, as per sample
  is_shared: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a Bukku Credit Note object as returned by the API.
 */
export interface BukkuCreditNote {
  id: number;
  contact_id: number;
  contact_name: string;
  number: string;
  number2: string; // Sample shows it, assuming it's part of the main object
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
  title: string | null;
  description: string;
  remarks: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuFormItem[]; // Using common BukkuFormItem for response
  link_items: BukkuCreditNoteAppliedToItem[]; // Transactions this CN is applied to
  linked_items: BukkuCreditNoteOriginLinkItem[]; // Transactions that are origins for this CN
  amount: number;
  balance: number;
  status: string;
  type: string; // e.g., "sale_credit_note"
  short_link: string;
  files: BukkuCreditNoteFileEntry[];
  customs_form_no: string | null;
  customs_k2_form_no: string | null;
  incoterms: string | null;
  myinvois_action: "NORMAL" | "VALIDATE" | "EXTERNAL" | null;
  myinvois_document_uuid: string | null;
  myinvois_document_long_id: string | null;
  myinvois_document_status: string | null;
  issued_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  validated_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  rejected_at: string | null;
  reject_message: string | null;
  cancelled_at: string | null;
  cancel_message: string | null;
}

/**
 * Represents the API response structure when a credit note is created or retrieved.
 */
export interface BukkuCreditNoteResponse {
  transaction: BukkuCreditNote;
}

/**
 * Parameters for updating a Bukku Credit Note.
 * Based on PUT /sales/credit_notes/{transactionId}
 * 'status' is typically managed by a separate PATCH endpoint.
 * 'number' becomes a required field.
 */
export interface BukkuCreditNoteUpdateParams {
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
  title?: string;
  description?: string;
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: Array<BukkuCreditNoteFormItemCreateParams>; // Items might need 'id' for existing ones
  link_items?: Array<BukkuCreditNoteLinkItemCreateParams>; // Items might need 'id' for existing ones
  email?: BukkuEmailDetails;
  files?: Array<BukkuFileAttachment>;
  customs_form_no?: string | null;
  customs_k2_form_no?: string | null;
  incoterms?: string | null;
  myinvois_action?: "NORMAL" | "VALIDATE" | "EXTERNAL";
}

/**
 * Parameters for updating the status of a Bukku Credit Note.
 * Based on PATCH /sales/credit_notes/{transactionId} (assumption, common pattern).
 */
export interface BukkuCreditNoteStatusUpdateParams {
  /** The new status for the credit note. */
  status: "ready" | "draft" | "pending_approval" | "void";
}

/**
 * Parameters for listing Bukku Credit Notes (GET /sales/credit_notes).
 */
export interface BukkuCreditNoteListParams {
  /** Filter by payment status. */
  payment_status?: "PAID" | "OUTSTANDING" | "OVERDUE";
  /** Search for transactions on and after the date (YYYY-MM-DD). */
  date_from?: string;
  /** Search for transactions on and before the date (YYYY-MM-DD). */
  date_to?: string;
  /** Search for keywords in No., Reference No., Title, Remarks, Description, Contact Name, Billing Party & Shipping Party. Max 100 chars. */
  search?: string;
  /** Search for keywords within custom fields, use format DD/MM/YYYY for a date. Max 100 chars. */
  custom_search?: string;
  /** Search by contact ID. */
  contact_id?: number;
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
  /** Sort by field. */
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
  /** Sort the list in ascending or descending order. */
  sort_dir?: "asc" | "desc";
  /** The current page number. Default: 1, Min: 1. */
  page?: number;
  /** Number of records per page. Default: 30. */
  page_size?: number;
  [key: string]: any; // Allow other specific filters or for compatibility
}

/**
 * Represents a summary of a Bukku Credit Note as it appears in a list.
 * Based on the sample response for GET /sales/credit_notes.
 */
export interface BukkuCreditNoteListItem {
  id: number;
  number: string;
  number2: string;
  contact_id: number;
  contact_name: string;
  contact_email: string;
  date: string; // YYYY-MM-DD
  billing_party: string;
  shipping_party: string;
  tag_names?: string[];
  title: string | null;
  description: string;
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  amount: number;
  /** Balance may not always be present in list items, though it's sortable. Made optional based on sample. */
  balance?: number;
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
  myinvois_action: string | null;
  myinvois_document_uuid: string | null;
  myinvois_document_long_id: string | null;
  myinvois_document_status: string | null;
  issued_at: string | null;
  validated_at: string | null;
  rejected_at: string | null;
  reject_message: string | null;
  cancelled_at: string | null;
  cancel_message: string | null;
}

/**
 * Represents the API response structure for listing credit notes.
 */
export interface BukkuCreditNoteListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuCreditNoteListItem[];
}
