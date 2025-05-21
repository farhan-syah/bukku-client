// src/accounting/journal-entries/type.ts

import {
  BukkuFileAttachment,
  BukkuAttachedFileResponse,
  BukkuListPagination,
} from "../../common/type";

/**
 * Represents a journal item when creating or updating a Journal Entry.
 * Based on the `journal_items` array in the POST/PUT /journal_entries request body.
 */
export interface BukkuJournalItemParams {
  /** The id of the journal item, required when updating an existing item within a journal entry. Omit for new items. */
  id?: number; 
  account_id: number;
  credit_amount?: number | null; // float or null
  debit_amount?: number | null; // float or null
  description?: string;
  line: number;
  tax_code_id?: number;
}

/**
 * Parameters for creating a new Journal Entry.
 * Based on POST /journal_entries
 */
export interface BukkuJournalEntryCreateParams {
  contact_id?: number;
  currency_code: string;
  date: string; // YYYY-MM-DD
  description?: string; // <= 255 characters
  exchange_rate: number;
  files?: BukkuFileAttachment[];
  internal_note?: string;
  journal_items: BukkuJournalItemParams[]; // Re-using for create and update items
  number?: string; // <= 50 characters
  number2?: string; // <= 50 characters
  remarks?: string;
  status: "draft" | "pending_approval" | "ready";
  tag_ids?: number[]; // <= 4 items
}

/**
 * Parameters for updating an existing Journal Entry.
 * Based on PUT /journal_entries/{transactionId}
 * Note: The API documentation implies the request body schema is the same as create.
 * `number` is typically required for PUT, and `status` is also listed as required.
 */
export interface BukkuJournalEntryUpdateParams {
  contact_id?: number;
  currency_code: string;
  date: string; // YYYY-MM-DD
  description?: string; // <= 255 characters
  exchange_rate: number;
  files?: BukkuFileAttachment[];
  internal_note?: string;
  journal_items: BukkuJournalItemParams[]; // For existing items, their 'id' should be included
  number: string; // Required for PUT, as per typical REST patterns, even if API doc says optional for POST
  number2?: string; // <= 50 characters
  remarks?: string;
  status: "draft" | "pending_approval" | "ready"; // Required as per API doc for update
  tag_ids?: number[]; // <= 4 items
}

/**
 * Parameters for updating the status of an existing Journal Entry.
 * Based on PATCH /journal_entries/{transactionId}
 */
export interface BukkuJournalEntryStatusUpdateParams {
  status: "draft" | "pending_approval" | "ready" | "void";
}


/**
 * Represents a journal item as returned by the API within a Journal Entry.
 */
export interface BukkuJournalItemResponse {
  id: number;
  line: number;
  account_id: number;
  account_name: string;
  account_code: string;
  description: string | null; // Sample shows string, can be null
  debit_amount: number | null;
  credit_amount: number | null;
}

/**
 * Represents a Journal Entry object as returned by the API.
 * Based on the `transaction` object in the response sample for POST /journal_entries.
 */
export interface BukkuJournalEntry {
  id: number;
  contact_id: number | null; // Sample shows 1, can be null if not provided
  number: string;
  number2: string | null; // Sample shows "ref no", can be null
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  tag_ids: number[] | null; // Sample shows [1], can be null
  tag_names: string[] | null; // Sample shows ["transfer"], can be null
  journal_items: BukkuJournalItemResponse[];
  remarks: string | null; // Sample shows "Remarks", can be null
  description: string | null; // Sample shows "Description", can be null
  internal_note: string | null; // Sample shows "Internal Note", can be null
  files: BukkuAttachedFileResponse[] | null; // Sample shows array of arrays, flattening to array of responses
  amount: number; // Sample shows 120
  status: string; // e.g., "ready"
  type: string; // e.g., "journal_entry"
  reconciliations: any[]; // Sample shows empty array, define more specifically if structure is known
  void_reason: string | null;
  voided_at: string | null; // Timestamp
  snapshotted_at: string | null; // Timestamp "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure when a journal entry is created or retrieved.
 */
export interface BukkuJournalEntryResponse {
  transaction: BukkuJournalEntry;
}

// --- List Operation Types ---

/**
 * Parameters for listing Journal Entries.
 * Based on GET /journal_entries query parameters.
 */
export interface BukkuJournalEntryListParams {
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  search?: string; // <= 100 characters
  status?: "all" | "draft" | "pending_approval" | "ready" | "void";
  page?: number; // >= 1, Default: 1
  page_size?: number; // Default: 30
  sort_dir?: "asc" | "desc";
  // sort_by is not specified in the API doc, so omitting it for now
  [key: string]: any; // Allow for other potential query params
}

/**
 * Represents a summary of a Journal Entry as it appears in a list.
 * This structure needs to be confirmed with an actual API response sample for the list endpoint.
 * For now, using fields commonly found in list items and from the detailed BukkuJournalEntry.
 */
export interface BukkuJournalEntryListItem {
  id: number;
  number: string;
  number2: string | null;
  date: string; // YYYY-MM-DD
  contact_id: number | null;
  // contact_name: string | null; // Not in detailed response, might be in list
  description: string | null;
  remarks: string | null;
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  amount: number; // Total debit/credit amount for the entry
  status: string;
  tag_names: string[] | null;
  // created_at: string; // Add if present in actual list response
  // updated_at: string; // Add if present in actual list response
}

/**
 * Represents the API response structure for listing journal entries.
 */
export interface BukkuJournalEntryListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuJournalEntryListItem[]; // Assuming the list key is 'transactions'
}
