// src/accounting/accounts/type.ts

import { BukkuListPagination } from "../../common/type"; // Added for list response

/**
 * Enum for Account Type (used in Create/Update and Get Single).
 */
export type BukkuAccountTypeForDetail =
  | "current_assets"
  | "non_current_assets"
  | "other_assets"
  | "current_liabilities"
  | "non_current_liabilities"
  | "equity"
  | "income"
  | "other_income"
  | "cost_of_sales"
  | "expenses"
  | "taxation";

/**
 * Enum for Account Type (used in List filter).
 */
export type BukkuAccountTypeForListFilter =
  | "assets"
  | "liabilities"
  | "equity"
  | "income"
  | "expenses";

/**
 * Enum for Account System Type.
 */
export type BukkuAccountSystemType =
  | "bank_cash"
  | "accounts_receivable"
  | "accounts_payable"
  | "inventory"
  | "credit_card"
  | "fixed_assets"
  | "depreciation"
  | "my_epf_expense"
  | "my_socso_expense"
  | "my_eis_expense"
  | "my_salary_expense";

/**
 * Enum for Account Classification.
 */
export type BukkuAccountClassification = "OPERATING" | "INVESTING" | "FINANCING";

/**
 * Parameters for creating a new Account.
 * Based on POST /accounts request body schema.
 */
export interface BukkuAccountCreateParams {
  name: string; // <= 255 characters
  type: BukkuAccountTypeForDetail; // Use detailed type for creation
  system_type?: BukkuAccountSystemType;
  parent_id?: number;
  classification?: BukkuAccountClassification; // Required only for balance sheet accounts
  code?: string; // <= 12 characters
  description?: string;
}

/**
 * Parameters for updating an existing Account.
 * Based on PUT /accounts/{id} request body schema.
 */
export interface BukkuAccountUpdateParams {
  name: string; // <= 255 characters
  type: BukkuAccountTypeForDetail;
  system_type?: BukkuAccountSystemType;
  parent_id?: number;
  classification?: BukkuAccountClassification; // Required only for balance sheet accounts
  code: string; // <= 12 characters, Required for update
  description?: string;
}

/**
 * Parameters for archiving/unarchiving an Account.
 * Based on PATCH /accounts/{id} request body schema.
 */
export interface BukkuAccountArchiveParams {
  is_archived: boolean;
}

/**
 * Represents currency details for an Account as returned by the API.
 */
export interface BukkuAccountCurrencyDetail {
  code: string; // e.g., "MYR"
  symbol: string; // e.g., "RM"
  name: string; // e.g., "Malaysian Ringgit"
}

/**
 * Represents an Account object as returned by the API (for Get Single, Create/Update response).
 * Based on the `account` object in the response sample for POST /accounts.
 */
export interface BukkuAccount {
  id: number;
  code: string | null;
  name: string;
  description: string | null;
  currency_code: string;
  currency: BukkuAccountCurrencyDetail;
  balance: number | null;
  type: BukkuAccountTypeForDetail; // Detailed type
  system_type: BukkuAccountSystemType | null;
  parent_id: number | null;
  classification: BukkuAccountClassification | null;
  is_locked: boolean;
  is_archived: boolean; // Corrected from "is_archieved" in sample
  created_at: string;
  updated_at: string;
}

/**
 * Represents the API response structure when an account is created, retrieved or updated.
 */
export interface BukkuAccountResponse {
  account: BukkuAccount;
}

// --- List Operation Types ---

/**
 * Parameters for listing Accounts.
 * Based on GET /accounts query parameters.
 */
export interface BukkuAccountListParams {
  search?: string; // <= 100 characters
  type?: BukkuAccountTypeForListFilter; // Broader categories for list filter
  is_archived?: boolean; // Default: false
  sort_by?: "code" | "name" | "balance"; // Default: "code"
  sort_dir?: "asc" | "desc";
  [key: string]: any; // Allow for other potential query params
}

/**
 * Represents a summary of an Account as it might appear in a list.
 * This structure is based on the detailed `BukkuAccount` and common list item patterns.
 * Actual API response for the list endpoint might differ.
 */
export interface BukkuAccountListItem {
  id: number;
  code: string | null;
  name: string;
  description: string | null;
  currency_code: string;
  // currency detail might be too verbose for a list, often just currency_code is present
  // currency?: BukkuAccountCurrencyDetail; 
  balance: number | null;
  type: BukkuAccountTypeForDetail; // API might return detailed type even in list
  system_type: BukkuAccountSystemType | null;
  parent_id: number | null;
  // classification might be omitted in list view
  // classification?: BukkuAccountClassification | null;
  is_locked: boolean;
  is_archived: boolean; // Corrected from "is_archieved"
  created_at: string;
  updated_at: string;
}

/**
 * Represents the API response structure for listing accounts.
 */
export interface BukkuAccountListApiResponse {
  paging: BukkuListPagination;
  accounts: BukkuAccountListItem[]; // Assuming the list key is 'accounts'
}
