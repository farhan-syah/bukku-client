// src/purchases/credit-notes/type.ts

import {
  BukkuFileAttachment,
  BukkuAttachedFileResponse,
  BukkuFormItem, // Common form item structure for responses
  BukkuListPagination,
} from "../../common/type";
import { BukkuBillLinkedItem } from "../bills/type"; // Reusing for linked_items in response

/**
 * Represents a form item for creating/updating a Bukku Purchase Credit Note.
 * Based on the form_items array in the POST /purchases/credit_notes request body.
 */
export interface BukkuCreditNoteFormItemCreateParams {
  id?: number; // Required for updating an existing item
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
  classification_code?: string; // Conditionally required for MyInvois
  children?: BukkuCreditNoteFormItemCreateParams[]; // For bundle items
}

/**
 * Represents a link item for creating/updating a Bukku Purchase Credit Note,
 * specifying which transactions the credit note is applied to.
 * Based on the link_items array in the POST /purchases/credit_notes request body.
 */
export interface BukkuCreditNoteLinkItemCreateParams {
  id?: number; // Required for updating an existing link item
  target_transaction_id: number;
  apply_amount: number;
}

/**
 * Parameters for creating a Bukku Purchase Credit Note.
 * Based on POST /purchases/credit_notes
 */
export interface BukkuCreditNoteCreateParams {
  contact_id: number;
  number?: string; // <= 50 chars
  number2?: string; // <= 50 chars
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  billing_party?: string;
  tag_ids?: number[]; // <= 4 items
  description?: string; // <= 255 chars
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuCreditNoteFormItemCreateParams[];
  link_items?: BukkuCreditNoteLinkItemCreateParams[];
  status: "draft" | "pending_approval" | "ready";
  files?: BukkuFileAttachment[];
  customs_form_no?: string | null;
  customs_k2_form_no?: string | null;
  incoterms?: string | null;
  myinvois_action?: "NORMAL" | "VALIDATE" | "EXTERNAL";
}

/**
 * Represents an item in the `link_items` array of a Bukku Credit Note response.
 * This shows how the credit note is applied to other transactions.
 */
export interface BukkuCreditNoteAppliedLinkItem {
  id: number;
  target_transaction_id: number;
  type: string; // e.g., "purchase_bill"
  number: string;
  date: string; // YYYY-MM-DD
  description: string;
  amount: number; // Original amount of the target transaction?
  balance: number; // Balance of the target transaction before this CN?
}

/**
 * Represents a Bukku Purchase Credit Note object as returned by the API.
 * Based on the response sample for POST /purchases/credit_notes
 */
export interface BukkuCreditNote {
  id: number;
  contact_id: number;
  contact_name: string;
  number: string;
  number2: string | null;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  billing_party: string | null;
  tag_ids: number[] | null;
  tag_names: string[] | null;
  description: string | null;
  remarks: string | null;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuFormItem[]; // Using common BukkuFormItem
  link_items: BukkuCreditNoteAppliedLinkItem[] | null; // Transactions this CN is applied to
  linked_items: BukkuBillLinkedItem[] | null; // Other transactions linked (reusing Bill's type for now)
  amount: number;
  balance: number;
  status: string;
  type: string; // e.g., "purchase_credit_note"
  files: BukkuAttachedFileResponse[] | null;
  customs_form_no: string | null;
  customs_k2_form_no: string | null;
  incoterms: string | null;
  myinvois_action: "NORMAL" | "VALIDATE" | "EXTERNAL" | null;
  myinvois_document_uuid: string | null;
  myinvois_document_long_id: string | null;
  myinvois_document_status: string | null;
  issued_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  validated_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  rejected_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  reject_message: string | null;
  cancelled_at: string | null; // "YYYY-MM-DD HH:MM:SS"
  cancel_message: string | null;
  short_link?: string; // Often present, though not in this specific sample
}

/**
 * Represents the API response structure when a credit note is created or retrieved.
 */
export interface BukkuCreditNoteResponse {
  transaction: BukkuCreditNote;
}

/**
 * Parameters for updating a Bukku Purchase Credit Note.
 * (Assumed structure, similar to other PUT endpoints)
 */
export interface BukkuCreditNoteUpdateParams {
  contact_id: number;
  number: string; // Typically required for updates
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  billing_party?: string;
  tag_ids?: number[];
  description?: string;
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuCreditNoteFormItemCreateParams[]; // Items may need 'id' for existing ones
  link_items?: BukkuCreditNoteLinkItemCreateParams[]; // Items may need 'id' for existing ones
  files?: BukkuFileAttachment[];
  customs_form_no?: string | null;
  customs_k2_form_no?: string | null;
  incoterms?: string | null;
  myinvois_action?: "NORMAL" | "VALIDATE" | "EXTERNAL";
  // Status is usually updated via a separate PATCH request.
}

/**
 * Parameters for updating the status of a Bukku Purchase Credit Note.
 * (Assumed structure, similar to other PATCH endpoints)
 */
export interface BukkuCreditNoteStatusUpdateParams {
  status: "draft" | "pending_approval" | "ready" | "void"; // Added "void" as a common status
}

/**
 * Parameters for listing Bukku Purchase Credit Notes.
 * (Assumed structure, similar to other list params)
 */
export interface BukkuCreditNoteListParams {
  search?: string; // <= 100 characters
  custom_search?: string; // <= 100 characters
  contact_id?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  status?: "all" | "draft" | "pending_approval" | "ready" | "void"; // Default to All but Void
  payment_status?: "PAID" | "OUTSTANDING" | "OVERDUE";
  page?: number; // >= 1, Default: 1
  page_size?: number; // Default: 30
  sort_by?:
    | "number"
    | "date"
    | "contact_name"
    | "number2"
    | "description"
    | "amount"
    | "balance"
    | "created_at";
  sort_dir?: "asc" | "desc";
  [key: string]: any; // For any other potential query params
}

/**
 * Represents a summary of a Bukku Purchase Credit Note as it might appear in a list.
 * (Assumed structure, similar to other list items)
 */
export interface BukkuCreditNoteListItem {
  id: number;
  contact_id: number;
  contact_name: string;
  number: string;
  number2: string | null;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  description?: string | null;
  amount: number;
  balance?: number;
  status: string;
  file_count?: number;
  short_link?: string;
  created_by?: string;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
  myinvois_document_status?: string | null;
  myinvois_document_uuid?: string | null;
}

/**
 * Represents the API response structure for listing purchase credit notes.
 */
export interface BukkuCreditNoteListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuCreditNoteListItem[];
}
