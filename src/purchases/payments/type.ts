// src/purchases/payments/type.ts

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  BukkuAttachedFileResponse,
  BukkuListPagination,
  BukkuFormItem, // Assuming this might be needed if payments can be linked to form items in detail views
} from "../../common/type";
import { BukkuBillLinkedItem } from "../bills/type"; // For linked_items in response

/**
 * Represents a link item for creating/updating a Bukku Purchase Payment.
 * Specifies which transactions the payment is applied to.
 */
export interface BukkuPaymentLinkItemCreateParams {
  id?: number; // Required for updating an existing link item
  target_transaction_id: number;
  apply_amount: number;
}

/**
 * Represents a deposit item for creating/updating a Bukku Purchase Payment.
 */
export interface BukkuPaymentDepositItemCreateParams {
  id?: number; // Required for updating an item
  payment_method_id?: number;
  account_id: number; // Required
  amount: number; // Required
  number?: string;
  fee_text?: string; // Include '%', if it's a percentage.
  fee_account_id?: number; // Required if fee_text is present
}

/**
 * Parameters for creating a Bukku Purchase Payment.
 * Based on POST /purchases/payments
 */
export interface BukkuPaymentCreateParams {
  contact_id: number; // Supplier or Employee only
  number?: string; // <= 50 chars
  number2?: string; // <= 50 chars
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  amount: number; // The amount paid
  tag_ids?: number[]; // <= 4 items
  description?: string; // <= 255 chars
  remarks?: string;
  link_items?: BukkuPaymentLinkItemCreateParams[];
  deposit_items: BukkuPaymentDepositItemCreateParams[]; // Required
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails; // Will send email if field is present
  files?: BukkuFileAttachment[];
}

/**
 * Represents a link item as returned in a Bukku Payment response (how payment is applied).
 */
export interface BukkuPaymentAppliedLinkItem {
  id: number;
  target_transaction_id: number;
  type: string; // e.g., "purchase_bill"
  number: string;
  date: string; // YYYY-MM-DD
  description: string; // Description of the target transaction
  amount: number; // Original amount of the target transaction
  balance: number; // Balance of the target transaction
}

/**
 * Represents a deposit item as returned in a Bukku Payment response.
 */
export interface BukkuPaymentDepositItem {
  id: number;
  line: number;
  payment_method_id: number; // Sample shows number, assuming it's the ID
  account_id: number;
  amount: number;
  number: string; // Payment reference number
  fee_text: string | number | null; // Sample shows number, API doc says string
  fee_account_id: number | null;
}

/**
 * Represents a Bukku Purchase Payment object as returned by the API.
 * Based on the response sample for POST /purchases/payments
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
  number2: string | null;
  tag_ids: number[] | null;
  tag_names: string[] | null;
  link_items: BukkuPaymentAppliedLinkItem[] | null; // How this payment is applied
  linked_items: BukkuBillLinkedItem[] | null; // Other transactions linked to this payment (e.g. bills linked to this payment) - reusing Bill's type
  deposit_items: BukkuPaymentDepositItem[] | null; // Breakdown of payment
  remarks: string | null;
  description: string | null;
  balance: number; // This might represent unapplied amount or could be context-dependent
  status: string;
  type: string; // e.g., "purchase_payment"
  short_link: string | null;
  files: BukkuAttachedFileResponse[] | null;
  // myinvois related fields are not in the sample, add if they become relevant
}

/**
 * Represents the API response structure when a payment is created or retrieved.
 */
export interface BukkuPaymentResponse {
  transaction: BukkuPayment;
}

/**
 * Parameters for updating a Bukku Purchase Payment.
 * (Assumed structure, similar to other PUT endpoints and create parameters)
 */
export interface BukkuPaymentUpdateParams {
  contact_id: number;
  number: string; // Typically required for updates
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  amount: number;
  tag_ids?: number[];
  description?: string;
  remarks?: string;
  link_items?: BukkuPaymentLinkItemCreateParams[]; // Items may need 'id' for existing ones
  deposit_items: BukkuPaymentDepositItemCreateParams[]; // Items may need 'id' for existing ones
  // Status is usually updated via a separate PATCH request.
  email?: BukkuEmailDetails; // Allow updating email details or re-sending
  files?: BukkuFileAttachment[]; // Allow updating attachments
}

/**
 * Parameters for updating the status of a Bukku Purchase Payment.
 */
export interface BukkuPaymentStatusUpdateParams {
  status: "draft" | "pending_approval" | "ready" | "void"; // Added "void"
}

/**
 * Parameters for listing Bukku Purchase Payments.
 * Based on GET /purchases/payments
 */
export interface BukkuPaymentListParams {
  search?: string; // <= 100 characters
  custom_search?: string; // <= 100 characters
  contact_id?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  status?: "all" | "draft" | "pending_approval" | "ready" | "void"; // Default to All but Void
  payment_status?: "paid" | "outstanding";
  email_status?: "UNSENT" | "PENDING" | "SENT" | "BOUNCED" | "OPENED" | "VIEWED";
  account_id?: string; // API doc says string, typically an ID
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
 * Represents a summary of a Bukku Purchase Payment as it might appear in a list.
 * (Assumed structure, similar to other list items)
 */
export interface BukkuPaymentListItem {
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
  balance?: number; // Unapplied amount or context-dependent
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
 * Represents the API response structure for listing purchase payments.
 */
export interface BukkuPaymentListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuPaymentListItem[];
}
