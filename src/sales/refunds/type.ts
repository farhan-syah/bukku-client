// src/sales/refunds/type.ts

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  BukkuListPagination,
} from "../../common/type";

// --- Create Parameter Types ---

/**
 * Represents a link item for creating/updating a Bukku Refund, specifying where credit is applied from or to.
 * (Typically, a refund itself is a source of credit, so these might link to invoices or other documents being refunded).
 */
export interface BukkuRefundLinkItemCreateParams {
  /** The id of the link item, required when you're updating an item. */
  id?: number;
  /** The target transaction to apply the amount to (e.g., an invoice being paid by this refund, or a credit note being consumed). */
  target_transaction_id: number;
  /** The amount to apply. */
  apply_amount: number;
}

/**
 * Represents a deposit item for creating/updating a Bukku Refund (how the money is being returned).
 */
export interface BukkuRefundDepositItemCreateParams {
  /** The id of the deposit item, required when you're updating an item. */
  id?: number;
  /** The id of the payment method. */
  payment_method_id?: number;
  /** The deposit account for the payment (e.g., bank account money is paid from). */
  account_id: number;
  /** The amount refunded/paid out via this method. */
  amount: number;
  /** The payment reference number for this deposit item. */
  number?: string;
  /** The fee incurred for this part of the refund. Include '%', if it's a percentage. */
  fee_text?: string;
  /** The account for the fee incurred, required if the fee_text is present. */
  fee_account_id?: number;
}

/**
 * Parameters for creating a Bukku Refund.
 * Based on POST /sales/refunds
 */
export interface BukkuRefundCreateParams {
  contact_id: number;
  number?: string;
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  tag_ids?: number[]; // Array of integers, <= 4 items
  description?: string;
  remarks?: string;
  link_items?: Array<BukkuRefundLinkItemCreateParams>; // Where credit (this refund) is applied to
  deposit_items: Array<BukkuRefundDepositItemCreateParams>; // How the refund is paid out
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails;
  files?: Array<BukkuFileAttachment>;
}

// --- Response Types ---

/**
 * Represents a link item in a Bukku Refund response (e.g., an invoice this refund is paying off).
 * Based on `link_items` in the sample response.
 */
export interface BukkuRefundLinkItem {
  id: number;
  target_transaction_id: number;
  type: string; // e.g., "sale_invoice"
  number: string;
  date: string; // YYYY-MM-DD
  description?: string;
  amount: number; // Original amount of the target transaction
  balance: number; // Balance of the target transaction after this refund's application
}

/**
 * Represents a deposit item within a Bukku Refund response.
 */
export interface BukkuRefundDepositItem {
  id: number;
  line: number;
  payment_method_id: number | null; // Sample shows number, can be null if not specified
  account_id: number;
  amount: number;
  number: string | null; // Sample shows "REF", can be null
  fee_text: number | string | null; // Sample shows number, docs imply string for create
  fee_account_id: number | null; // Sample shows number, can be null
}

/**
 * Represents the detailed file information within a Bukku Refund's file entry.
 */
export interface BukkuRefundFileDetail {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a file entry attached to a Bukku Refund.
 */
export interface BukkuRefundFileEntry {
  id: number;
  file_id: number;
  file: BukkuRefundFileDetail[]; // Array of file details
  is_shared: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents a Bukku Refund object as returned by the API.
 */
export interface BukkuRefund {
  id: number;
  contact_id: number;
  contact_name: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  number: string;
  number2: string | null;
  tag_ids: number[];
  tag_names: string[];
  link_items: BukkuRefundLinkItem[]; // Transactions this refund is applied to
  deposit_items: BukkuRefundDepositItem[];
  remarks: string | null;
  description: string | null;
  amount: number; // Total amount refunded
  balance: number; // Remaining unapplied amount of this refund (if it can be partially applied)
  status: string;
  type: string; // e.g., "sale_refund"
  short_link: string;
  files: BukkuRefundFileEntry[];
}

/**
 * Represents the API response structure when a refund is created or retrieved.
 */
export interface BukkuRefundResponse {
  transaction: BukkuRefund;
}

// --- Update Parameter Types ---

/**
 * Parameters for updating a Bukku Refund.
 * 'status' is typically managed by a separate PATCH endpoint.
 * 'number' becomes a required field for update.
 */
export interface BukkuRefundUpdateParams {
  contact_id: number;
  number: string; // Required for update
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  tag_ids?: number[];
  description?: string;
  remarks?: string;
  link_items?: Array<BukkuRefundLinkItemCreateParams>; // Items might need 'id' for existing ones
  deposit_items: Array<BukkuRefundDepositItemCreateParams>; // Items might need 'id' for existing ones
  email?: BukkuEmailDetails;
  files?: Array<BukkuFileAttachment>;
}

/**
 * Parameters for updating the status of a Bukku Refund.
 */
export interface BukkuRefundStatusUpdateParams {
  /** The new status for the refund. */
  status: "ready" | "draft" | "pending_approval" | "void"; // Assuming "void" is possible
}

// --- List Parameter and Response Types ---

/**
 * Parameters for listing Bukku Refunds (GET /sales/refunds - assumed endpoint naming convention).
 */
export interface BukkuRefundListParams {
  /** Search for keywords in No., Reference No., Title, Remarks, Description, Contact Name, Billing Party & Shipping Party. Max 100 chars. */
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
 * Represents a summary of a Bukku Refund as it appears in a list.
 */
export interface BukkuRefundListItem {
  id: number;
  number: string;
  number2: string | null;
  contact_id: number;
  contact_name: string;
  contact_email?: string; // Assuming this might be available
  date: string; // YYYY-MM-DD
  tag_names?: string[];
  description: string | null;
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
}

/**
 * Represents the API response structure for listing refunds.
 */
export interface BukkuRefundListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuRefundListItem[];
}