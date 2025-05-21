// src/purchases/refunds/type.ts

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  BukkuAttachedFileResponse,
  BukkuListPagination,
  BukkuFormItem, // Though not directly in refund create, might appear in linked transactions or future detailed views
} from "../../common/type";
import { BukkuBillLinkedItem } from "../bills/type"; // For linked_items in response, assuming similar structure

/**
 * Represents a link item for creating/updating a Bukku Purchase Refund.
 * Specifies which transactions the refund is applied to (e.g., linking to a credit note or payment).
 */
export interface BukkuRefundLinkItemCreateParams {
  id?: number; // Required for updating an existing link item
  target_transaction_id: number; // The ID of the transaction to link against (e.g., a credit note)
  apply_amount: number; // The amount of the refund to apply to this transaction
}

/**
 * Represents a deposit item for creating/updating a Bukku Purchase Refund.
 * This details how the refund is being issued (e.g., back to a bank account).
 */
export interface BukkuRefundDepositItemCreateParams {
  id?: number; // Required for updating an item
  payment_method_id?: number; // Method used for the refund
  account_id: number; // Required: The account from which the refund is made
  amount: number; // Required: The amount refunded via this item
  number?: string; // Reference number for this deposit item
  fee_text?: string; // Description of any fee (e.g., "Bank Fee", "5% processing fee"). Include '%', if it's a percentage.
  fee_account_id?: number; // Required if fee_text is present: Account for the fee
}

/**
 * Parameters for creating a Bukku Purchase Refund.
 * Based on POST /purchases/refunds
 */
export interface BukkuRefundCreateParams {
  contact_id: number; // Supplier or Employee only
  number?: string; // <= 50 chars
  number2?: string; // <= 50 chars
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  // amount: number; // The API doc doesn't explicitly list a top-level amount for create, it's likely sum of deposit_items
  tag_ids?: number[]; // <= 4 items
  description?: string; // <= 255 chars
  remarks?: string;
  link_items?: BukkuRefundLinkItemCreateParams[]; // Optional: links to transactions like credit notes
  deposit_items: BukkuRefundDepositItemCreateParams[]; // Required: How the refund is paid out
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails; // Will send email if field is present
  files?: BukkuFileAttachment[];
}

/**
 * Represents a link item as returned in a Bukku Refund response (how refund is applied).
 */
export interface BukkuRefundAppliedLinkItem {
  id: number;
  target_transaction_id: number;
  type: string; // e.g., "purchase_credit_note"
  number: string;
  date: string; // YYYY-MM-DD
  description: string; // Description of the target transaction
  amount: number; // Original amount of the target transaction
  balance: number; // Balance of the target transaction
}

/**
 * Represents a deposit item as returned in a Bukku Refund response.
 */
export interface BukkuRefundDepositItem {
  id: number;
  line: number;
  payment_method_id: number | null;
  account_id: number;
  amount: number;
  number: string | null;
  fee_text: string | number | null;
  fee_account_id: number | null;
}

/**
 * Represents a Bukku Purchase Refund object as returned by the API.
 * (Assumed structure based on other transaction types like Payment)
 */
export interface BukkuRefund {
  id: number;
  contact_id: number;
  contact_name: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  amount: number; // Total amount refunded
  number: string;
  number2: string | null;
  tag_ids: number[] | null;
  tag_names: string[] | null;
  link_items: BukkuRefundAppliedLinkItem[] | null; // How this refund is applied
  linked_items: BukkuBillLinkedItem[] | null; // Other transactions linked to this refund
  deposit_items: BukkuRefundDepositItem[] | null; // Breakdown of refund payment
  remarks: string | null;
  description: string | null;
  balance: number; // This might represent unapplied amount or could be context-dependent (often 0 for refunds)
  status: string;
  type: string; // e.g., "purchase_refund"
  short_link: string | null;
  files: BukkuAttachedFileResponse[] | null;
  // myinvois related fields are not in the refund POST schema, add if they become relevant for GET
}

/**
 * Represents the API response structure when a refund is created or retrieved.
 */
export interface BukkuRefundResponse {
  transaction: BukkuRefund;
}

/**
 * Parameters for updating a Bukku Purchase Refund.
 * (Assumed structure, similar to BukkuPaymentUpdateParams and refund create parameters)
 */
export interface BukkuRefundUpdateParams {
  contact_id: number;
  number: string; // Typically required for updates
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  // amount: number; // Similar to create, likely derived from deposit_items
  tag_ids?: number[];
  description?: string;
  remarks?: string;
  link_items?: BukkuRefundLinkItemCreateParams[]; // Items may need 'id' for existing ones
  deposit_items: BukkuRefundDepositItemCreateParams[]; // Items may need 'id' for existing ones
  email?: BukkuEmailDetails;
  files?: BukkuFileAttachment[];
  // Status is usually updated via a separate PATCH request.
}

/**
 * Parameters for updating the status of a Bukku Purchase Refund.
 */
export interface BukkuRefundStatusUpdateParams {
  status: "draft" | "pending_approval" | "ready" | "void"; // Added "void"
}

/**
 * Parameters for listing Bukku Purchase Refunds.
 * (Assumed structure, similar to BukkuPaymentListParams)
 */
export interface BukkuRefundListParams {
  search?: string; // <= 100 characters
  custom_search?: string; // <= 100 characters
  contact_id?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  status?: "all" | "draft" | "pending_approval" | "ready" | "void"; // Default to All but Void
  payment_status?: "paid" | "outstanding"; // Filter by payment status
  email_status?: "UNSENT" | "PENDING" | "SENT" | "BOUNCED" | "OPENED" | "VIEWED";
  account_id?: string; // To filter by deposit account
  page?: number; // >= 1, Default: 1
  page_size?: number; // Default: 30
  sort_by?:
    | "number"
    | "date"
    | "contact_name"
    | "number2"
    | "description"
    | "amount"
    | "created_at";
  sort_dir?: "asc" | "desc";
  [key: string]: any; // For any other potential query params
}

/**
 * Represents a summary of a Bukku Purchase Refund as it might appear in a list.
 * (Assumed structure, similar to BukkuPaymentListItem)
 */
export interface BukkuRefundListItem {
  id: number;
  contact_id: number;
  contact_name: string;
  number: string;
  number2: string | null;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  amount: number;
  // balance?: number; // Unapplied amount or context-dependent
  status: string;
  description?: string | null;
  tag_names?: string[] | null;
  file_count?: number;
  short_link?: string;
  created_by?: string;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure for listing purchase refunds.
 */
export interface BukkuRefundListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuRefundListItem[];
}
