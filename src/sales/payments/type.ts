// src/sales/payments/type.ts

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  BukkuListPagination,
} from "../../common/type";

// --- Create Parameter Types ---

/**
 * Represents a link item for creating a Bukku Payment, specifying where credit is applied.
 */
export interface BukkuPaymentLinkItemCreateParams {
  /** The id of the link item, required when you're updating an item. */
  id?: number;
  /** The target transaction to apply the amount to. */
  target_transaction_id: number;
  /** The amount to apply. */
  apply_amount: number;
}

/**
 * Represents a deposit item for creating a Bukku Payment.
 */
export interface BukkuPaymentDepositItemCreateParams {
  /** The id of the deposit item, required when you're updating an item. */
  id?: number;
  /** The id of the payment method. */
  payment_method_id?: number;
  /** The deposit account for the payment. */
  account_id: number;
  /** The amount received. */
  amount: number;
  /** The payment reference number. */
  number?: string;
  /** The fee incurred for the amount paid. Include '%', if it's a percentage. */
  fee_text?: string;
  /** The account for the fee incurred, required if the fee_text is present. */
  fee_account_id?: number;
}

/**
 * Parameters for creating a Bukku Payment.
 * Based on POST /sales/payments
 */
export interface BukkuPaymentCreateParams {
  contact_id: number;
  number?: string;
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  amount: number; // The total amount paid
  tag_ids?: number[]; // Array of integers, <= 4 items
  description?: string;
  remarks?: string;
  link_items?: Array<BukkuPaymentLinkItemCreateParams>;
  deposit_items: Array<BukkuPaymentDepositItemCreateParams>;
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails;
  files?: Array<BukkuFileAttachment>;
}

// --- Response Types ---

/**
 * Represents a link item in a Bukku Payment response (credit applied to).
 * Based on `link_items` in the sample response.
 */
export interface BukkuPaymentLinkItem {
  id: number;
  target_transaction_id: number;
  type: string; // e.g., "sale_invoice"
  number: string;
  date: string; // YYYY-MM-DD
  description?: string;
  amount: number; // Original amount of the target transaction
  balance: number; // Balance of the target transaction after this payment
}

/**
 * Represents a linked item in a Bukku Payment response (origin of credit).
 * Based on `linked_items` in the sample response. Note: This appears to show what this payment is linked FROM,
 * which is unusual for a payment creation but present in the sample.
 * It might represent allocations if this payment is e.g. from a credit note.
 * For a standard payment against an invoice, `link_items` is more typical for "what this payment pays".
 */
export interface BukkuPaymentLinkedItem {
  id: number;
  origin_transaction_id: number;
  type: string;
  number: string;
  date: string; // YYYY-MM-DD
  amount: number;
  balance: number;
  apply_amount: number;
}

/**
 * Represents a deposit item within a Bukku Payment response.
 */
export interface BukkuPaymentDepositItem {
  id: number;
  line: number;
  payment_method_id: number; // Sample shows number, can be null if not specified
  account_id: number;
  amount: number;
  number: string | null; // Sample shows "REF", can be null
  fee_text: number | string | null; // Sample shows number, docs imply string
  fee_account_id: number | null; // Sample shows number, can be null
}

/**
 * Represents the detailed file information within a Bukku Payment's file entry.
 */
export interface BukkuPaymentFileDetail {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a file entry attached to a Bukku Payment.
 */
export interface BukkuPaymentFileEntry {
  id: number;
  file_id: number;
  file: BukkuPaymentFileDetail[]; // Array of file details
  is_shared: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a Bukku Payment object as returned by the API.
 */
export interface BukkuPayment {
  id: number;
  contact_id: number;
  contact_name: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  amount: number; // Total amount paid
  number: string;
  number2?: string | null; // Assuming number2 can be part of the response
  tag_ids: number[];
  tag_names: string[];
  link_items: BukkuPaymentLinkItem[]; // Transactions this payment is applied to
  linked_items: BukkuPaymentLinkedItem[]; // Transactions this payment is linked from (e.g. credit notes used)
  deposit_items: BukkuPaymentDepositItem[];
  remarks: string | null;
  description: string | null;
  balance: number; // Remaining unapplied amount of this payment
  status: string;
  type: string; // e.g., "sale_payment"
  short_link: string;
  files: BukkuPaymentFileEntry[];
}

/**
 * Represents the API response structure when a payment is created or retrieved.
 */
export interface BukkuPaymentResponse {
  transaction: BukkuPayment;
}

// --- Update Parameter Types ---

/**
 * Parameters for updating a Bukku Payment.
 * 'status' is typically managed by a separate PATCH endpoint.
 * 'number' becomes a required field for update.
 */
export interface BukkuPaymentUpdateParams {
  contact_id: number;
  number: string; // Required for update
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  amount: number;
  tag_ids?: number[];
  description?: string;
  remarks?: string;
  link_items?: Array<BukkuPaymentLinkItemCreateParams>; // Items might need 'id' for existing ones
  deposit_items: Array<BukkuPaymentDepositItemCreateParams>; // Items might need 'id' for existing ones
  email?: BukkuEmailDetails; // For re-sending or updating email details
  files?: Array<BukkuFileAttachment>; // For updating attachments
}

/**
 * Parameters for updating the status of a Bukku Payment.
 */
export interface BukkuPaymentStatusUpdateParams {
  /** The new status for the payment. */
  status: "ready" | "draft" | "pending_approval" | "void"; // Assuming "void" is possible
}

// --- List Parameter and Response Types ---

/**
 * Parameters for listing Bukku Payments (GET /sales/payments - assumed endpoint).
 */
export interface BukkuPaymentListParams {
  /** Search for keywords in No., Reference No., Description, Contact Name. Max 100 chars. */
  search?: string;
  /** Search for keywords within custom fields. Max 100 chars. */
  custom_search?: string;
  /** Search by contact ID. */
  contact_id?: number;
  /** Search for transactions on and after the date (YYYY-MM-DD). */
  date_from?: string;
  /** Search for transactions on and before the date (YYYY-MM-DD). */
  date_to?: string;
  /** Search by status, default to All but Void. */
  status?: "all" | "draft" | "pending_approval" | "ready" | "void";
  /** Filter by payment status. */
  payment_status?: "paid" | "outstanding";
  /** Search by the latest email status. */
  email_status?:
    | "UNSENT"
    | "PENDING"
    | "SENT"
    | "BOUNCED"
    | "OPENED"
    | "VIEWED";
  /** Filter by accounts in Current Assets, Non-Current Assets, Current Liabilities and Equity. */
  account_id?: string;
  /** Sort by field. */
  sort_by?:
    | "number"
    | "date"
    | "contact_name"
    | "number2"
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
  [key: string]: any; // Allow other specific filters
}

/**
 * Represents a summary of a Bukku Payment as it appears in a list.
 */
export interface BukkuPaymentListItem {
  id: number;
  number: string;
  number2?: string | null;
  contact_id: number;
  contact_name: string;
  contact_email?: string; // Assuming this might be available
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  amount: number;
  balance?: number; // Remaining unapplied amount, if available in list
  status: string;
  email_status?: string;
  file_count?: number;
  short_link?: string;
  created_by?: string;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
  // Any other fields relevant for a list view
}

/**
 * Represents the API response structure for listing payments.
 */
export interface BukkuPaymentListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuPaymentListItem[];
}