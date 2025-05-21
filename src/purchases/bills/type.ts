// src/purchases/bills/type.ts

import {
  BukkuEmailDetails, // Assuming this might be needed for update/create later
  BukkuFileAttachment, // For create/update
  BukkuAttachedFileResponse, // For response
  BukkuListPagination,
  BukkuFormItem, // For response form items (general one)
} from "../../common/type";

/**
 * Represents a form item for creating a Bukku Bill.
 * Based on the form_items array in the POST /purchases/bills request body.
 */
export interface BukkuBillFormItemCreateParams {
  id?: number; // Required for updating an item
  transfer_item_id?: number;
  type?: "bundle" | "subtitle" | "subtotal" | null;
  account_id?: number; // Required for normal item
  description?: string; // Required for normal / bundle & subtitle items
  service_date?: string; // YYYY-MM-DD
  product_id?: number;
  product_unit_id?: number;
  location_id?: number;
  unit_price?: number; // Required for normal items
  quantity?: number; // Required for normal items
  discount?: string; // Max 14 chars, value (e.g., 255.12) or percentage (e.g., 10%)
  tax_code_id?: number;
  classification_code?: string; // Required if MyInvois VALIDATE and item type is null
  children?: BukkuBillFormItemCreateParams[]; // For bundle items
}

/**
 * Represents a deposit item for creating a Bukku Bill.
 * Based on the deposit_items array in the POST /purchases/bills request body.
 */
export interface BukkuBillDepositItemCreateParams {
  id?: number; // Required for updating an item
  payment_method_id?: number;
  account_id: number; // Required
  amount: number; // Required
  number?: string;
  fee_text?: string;
  fee_account_id?: number; // Required if fee_text is present
}

/**
 * Parameters for creating a Bukku Bill.
 * Based on POST /purchases/bills
 */
export interface BukkuBillCreateParams {
  payment_mode: "cash" | "credit" | "claim";
  contact_id: number;
  contact2_id?: number;
  number?: string; // <= 50 chars
  number2?: string; // <= 50 chars
  date: string; // YYYY-MM-DD
  term_id?: number; // Supported only when payment_mode is credit
  due_date?: string; // YYYY-MM-DD, supported only when payment_mode is credit
  currency_code: string;
  exchange_rate: number;
  billing_party?: string;
  tag_ids?: number[]; // <= 4 items
  description?: string; // <= 255 chars
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuBillFormItemCreateParams[];
  deposit_items?: BukkuBillDepositItemCreateParams[]; // Required when payment_mode is cash
  status: "draft" | "pending_approval" | "ready";
  files?: BukkuFileAttachment[];
  customs_form_no?: string | null;
  customs_k2_form_no?: string | null;
  incoterms?: string | null;
  myinvois_action?: "NORMAL" | "VALIDATE" | "EXTERNAL";
}

/**
 * Represents a term item within a Bukku Bill response.
 */
export interface BukkuBillTermItem {
  id: number;
  term_id: number;
  term_name: string;
  date: string; // YYYY-MM-DD
  payment_due: string; // e.g., "20%" or amount
  description: string;
  amount: number;
  balance: number;
}

/**
 * Represents a deposit item as returned in a Bukku Bill response.
 */
export interface BukkuBillDepositItem {
  id: number;
  line: number;
  payment_method_id: number;
  account_id: number;
  amount: number;
  number: string;
  fee_text: string | null; // Sample shows string, can be number
  fee_account_id: number | null;
}

/**
 * Represents a linked item as returned in a Bukku Bill response.
 */
export interface BukkuBillLinkedItem {
  id: number;
  origin_transaction_id: number;
  type: string; // e.g., "purchase_bill"
  number: string;
  date: string; // YYYY-MM-DD
  amount: number;
  balance: number;
  apply_amount: number;
}

/**
 * Represents a Bukku Bill object as returned by the API.
 * Based on the response sample for POST /purchases/bills
 */
export interface BukkuBill {
  id: number;
  payment_mode: "cash" | "credit" | "claim";
  contact_id: number;
  contact_name: string;
  contact2_id: number | null;
  contact2_name: string | null;
  number: string;
  number2: string | null;
  date: string; // YYYY-MM-DD
  term_id: number | null;
  term_name: string | null;
  term_items: BukkuBillTermItem[] | null; // Sample shows array, can be null if not credit term
  due_date: string | null; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  billing_party: string | null;
  tag_ids: number[] | null;
  tag_names: string[] | null;
  description: string | null;
  remarks: string | null;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuFormItem[]; // Using common BukkuFormItem from common/type.ts
  deposit_items: BukkuBillDepositItem[] | null; // Sample shows array, can be null
  linked_items: BukkuBillLinkedItem[] | null; // Sample shows array, can be null
  amount: number;
  balance: number; // This seems to be present for credit term bills
  status: string;
  type: string; // e.g., "purchase_bill"
  files: BukkuAttachedFileResponse[] | null;
  customs_form_no: string | null;
  customs_k2_form_no: string | null;
  incoterms: string | null;
  myinvois_action: "NORMAL" | "VALIDATE" | "EXTERNAL" | null;
  myinvois_document_uuid: string | null;
  myinvois_document_long_id: string | null;
  myinvois_document_status: string | null; // e.g., "VALID"
  issued_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  validated_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  rejected_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  reject_message: string | null;
  cancelled_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  cancel_message: string | null;
  // Ensure short_link is included if it's standard, though not in this specific sample
  short_link?: string;
}

/**
 * Represents the API response structure when a bill is created or retrieved.
 */
export interface BukkuBillResponse {
  transaction: BukkuBill;
}

/**
 * Parameters for updating a Bukku Bill.
 * Based on PUT /purchases/bills/{id}
 */
export interface BukkuBillUpdateParams {
  payment_mode: "cash" | "credit" | "claim";
  contact_id: number;
  contact2_id?: number;
  number: string; // <= 50 chars
  number2?: string; // <= 50 chars
  date: string; // YYYY-MM-DD
  term_id?: number; // Supported only when payment_mode is credit
  due_date?: string; // YYYY-MM-DD, supported only when payment_mode is credit
  currency_code: string;
  exchange_rate: number;
  billing_party?: string;
  tag_ids?: number[]; // <= 4 items
  description?: string; // <= 255 chars
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuBillFormItemCreateParams[]; // Use id in items for existing, omit for new
  deposit_items?: BukkuBillDepositItemCreateParams[]; // Required when payment_mode is cash. Use id in items for existing, omit for new
  files?: BukkuFileAttachment[];
  customs_form_no?: string | null;
  customs_k2_form_no?: string | null;
  incoterms?: string | null;
  myinvois_action?: "NORMAL" | "VALIDATE" | "EXTERNAL";
  // Status is typically updated via a separate PATCH request and not included here.
  // email field is not present in the provided API doc for update.
}

/**
 * Parameters for updating the status of a Bukku Bill.
 * Typically includes a status field.
 */
export interface BukkuBillStatusUpdateParams {
  status: "draft" | "pending_approval" | "ready" | "void"; // "void" is a common status
}

/**
 * Parameters for listing Bukku Bills.
 * This would include filters, pagination, sorting.
 */
export interface BukkuBillListParams {
  search?: string; // <= 100 characters
  custom_search?: string; // <= 100 characters
  contact_id?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  status?: "all" | "draft" | "pending_approval" | "ready" | "void"; // Default to All but Void
  payment_mode?: "credit" | "cash" | "claim";
  payment_status?: "PAID" | "OUTSTANDING" | "OVERDUE";
  page?: number; // >= 1, Default: 1
  page_size?: number; // Default: 30
  sort_by?:
    | "number"
    | "date"
    | "contact_name"
    | "contact2_name"
    | "number2"
    | "description"
    | "amount"
    | "balance"
    | "created_at";
  sort_dir?: "asc" | "desc";
  [key: string]: any; // For any other potential query params
}

/**
 * Represents a summary of a Bukku Bill as it appears in a list.
 */
export interface BukkuBillListItem {
  id: number;
  payment_mode: string; // "cash", "credit", "claim"
  contact_id: number;
  contact_name: string;
  contact2_name?: string | null;
  number: string;
  number2: string | null;
  date: string; // YYYY-MM-DD
  due_date?: string | null; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  billing_party?: string | null;
  tag_names?: string[] | null;
  description?: string | null;
  amount: number;
  balance?: number; // Relevant for credit bills
  status: string;
  // transfer_status?: string; // If bills can be transferred
  // email_status?: string; // If bills have email status
  file_count?: number;
  short_link?: string;
  created_by?: string;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
  // myinvois related fields if shown in list
  myinvois_document_status?: string | null;
  myinvois_document_uuid?: string | null;
}

/**
 * Represents the API response structure for listing bills.
 */
export interface BukkuBillListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuBillListItem[];
}
