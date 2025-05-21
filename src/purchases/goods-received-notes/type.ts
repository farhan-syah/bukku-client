// src/purchases/goods-received-notes/type.ts

import {
  BukkuEmailDetails,
  BukkuFileAttachment,
  BukkuAttachedFileResponse,
  BukkuFormItem, // For response form items
  BukkuListPagination,
} from "../../common/type";

/**
 * Represents a form item for creating or updating a Bukku Goods Received Note.
 * Note: `id` is required for `form_items` when updating existing items within a GRN.
 */
export interface BukkuGoodsReceivedNoteFormItemUpdateParams {
  /** The id of the item, required when you're updating an item. */
  id?: number; // Optional for new items during an update, required for existing items.
  /** The transferred item's id, required for transfer items. Obtained from the to be transferred transaction's form_item's ID. */
  transfer_item_id?: number;
  /** The type of the item, leave null for normal item. */
  type?: "bundle" | "subtitle" | "subtotal" | null;
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
  /** The child items, used by bundle. */
  children?: BukkuGoodsReceivedNoteFormItemUpdateParams[]; // Recursive for bundles
}

/**
 * Parameters for creating a Bukku Goods Received Note.
 * Based on POST /purchases/goods_received_notes
 */
export interface BukkuGoodsReceivedNoteCreateParams {
  contact_id: number;
  number?: string;
  number2?: string;
  date: string; // YYYY-MM-DD
  currency_code: string;
  exchange_rate: number;
  billing_party?: string;
  show_shipping?: boolean; // Default: false
  shipping_party?: string;
  shipping_info?: string; // <= 100 chars
  tag_ids?: number[]; // <= 4 items
  title?: string; // <= 255 chars
  description?: string; // <= 255 chars
  remarks?: string;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuGoodsReceivedNoteFormItemUpdateParams[]; // Re-using update for broader compatibility
  status: "draft" | "pending_approval" | "ready";
  email?: BukkuEmailDetails;
  files?: BukkuFileAttachment[];
}

/**
 * Represents a Bukku Goods Received Note object as returned by the API.
 */
export interface BukkuGoodsReceivedNote {
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
  show_shipping: boolean;
  shipping_info: string | null;
  shipping_party: string | null;
  tag_ids: number[] | null;
  tag_names: string[] | null;
  title: string | null;
  description: string | null;
  remarks: string | null;
  tax_mode: "inclusive" | "exclusive";
  form_items: BukkuFormItem[]; // Using common BukkuFormItem for response
  amount: number;
  status: string;
  type: string; // e.g., "purchase_goods_received"
  short_link: string;
  files: BukkuAttachedFileResponse[] | null;
}

/**
 * Represents the API response structure when a goods received note is created or retrieved.
 */
export interface BukkuGoodsReceivedNoteResponse {
  transaction: BukkuGoodsReceivedNote;
}

/**
 * Parameters for updating a Bukku Goods Received Note.
 * Based on PUT /purchases/goods_received_notes/{id}
 */
export interface BukkuGoodsReceivedNoteUpdateParams {
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
  form_items: BukkuGoodsReceivedNoteFormItemUpdateParams[];
  email?: BukkuEmailDetails;
  files?: BukkuFileAttachment[];
  // Status is updated via a separate PATCH request
}

/**
 * Parameters for updating the status of a Bukku Goods Received Note.
 * Based on PATCH /purchases/goods_received_notes/{id}
 */
export interface BukkuGoodsReceivedNoteStatusUpdateParams {
  status: "draft" | "pending_approval" | "ready" | "void";
}


/**
 * Parameters for listing Bukku Goods Received Notes (GET /purchases/goods_received_notes).
 */
export interface BukkuGoodsReceivedNoteListParams {
  search?: string;
  custom_search?: string;
  contact_id?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  status?: "all" | "draft" | "pending_approval" | "ready" | "void";
  email_status?:
    | "UNSENT"
    | "PENDING"
    | "SENT"
    | "BOUNCED"
    | "OPENED"
    | "VIEWED";
  transfer_status?: 
    | "ALL"
    | "OUTSTANDING"
    | "NOT_TRANSFERRED"
    | "PARTIAL_TRANSFERRED"
    | "TRANSFERRED";
  page?: number;
  page_size?: number;
  sort_by?: 
    | "number" 
    | "date" 
    | "contact_name" 
    | "number2" 
    | "title" 
    | "description" 
    | "amount" 
    | "created_at";
  sort_dir?: "asc" | "desc";
  [key: string]: any; // For any other potential query params
}

/**
 * Represents a summary of a Bukku Goods Received Note as it appears in a list.
 * This is based on the general structure of list items in Bukku and might need adjustments
 * if the actual API response for GRN list items differs significantly.
 */
export interface BukkuGoodsReceivedNoteListItem {
  id: number;
  contact_id: number;
  contact_name: string;
  number: string;
  number2: string | null;
  date: string; // YYYY-MM-DD
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  billing_party?: string | null;
  shipping_party?: string | null;
  tag_names?: string[] | null;
  title?: string | null;
  description?: string | null;
  amount: number;
  status: string;
  transfer_status?: string;
  email_status?: string;
  file_count?: number;
  short_link?: string;
  created_by?: string;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure for listing goods received notes.
 */
export interface BukkuGoodsReceivedNoteListApiResponse {
  paging: BukkuListPagination;
  transactions: BukkuGoodsReceivedNoteListItem[];
}
