/**
 * Represents a file attached to a transaction, as returned in API responses.
 */
export interface BukkuAttachedFileResponse {
  id: number; // The ID of the attachment link itself
  file_id: number; // The ID of the actual file
  file: BukkuFileDetailsResponse[]; // Response sample shows an array, typically containing one file
  is_shared: boolean;
  created_at: string; // e.g., "2022-06-23 15:42:41"
}

/**
 * Detailed information about an uploaded file, as returned in API responses.
 */
export interface BukkuFileDetailsResponse {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
  created_at: string; // e.g., "2022-06-23 15:42:41"
}

/**
 * Details for sending an email with a transaction.
 * This object is used if an email should be sent when the transaction (e.g., quotation) is created/updated.
 */
export interface BukkuEmailDetails {
  /** The recipient email addresses in an array, required if email object is present. */
  to_addresses: string[];
  /** The cc email address recipients in an array. */
  cc_addresses?: string[];
  /** The reply-to email address for the email. */
  reply_to_address?: string;
  /** The email subject, if not provided, it will be taking the system default. */
  subject?: string;
  /** The personal message that can be appended to the email content. */
  message?: string;
  /** Whether to attach the transaction PDF to email, default to false. */
  attach_pdf?: boolean;
  /** The form design of the attached pdf, if not provided, it will be taking the system default. */
  form_design_id?: number;
}

/**
 * Represents a file to be attached to a transaction.
 * This structure is used when specifying existing files (by file_id) to attach.
 */
export interface BukkuFileAttachment {
  /** The id of the file to be attached to the transaction. */
  file_id: number;
  /** Set to true to attach the file when sharing the transaction. */
  is_shared: boolean;
}

/**
 * Represents the pagination information returned by Bukku list APIs.
 */
export interface BukkuListPagination {
  current_page: number;
  per_page: number;
  total: number;
}

/**
 * Represents a form item in a transaction like a quotation or invoice.
 * Based on the detailed schema for form_items.
 */
export interface BukkuFormItem {
  /** The id of the item, required when you're updating an item. */
  id?: number;
  /** The type of the item, leave null for normal item. */
  type?: "bundle" | "subtitle" | "subtotal" | "bundle_item" | null;
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
  children?: BukkuFormItem[];

  // Fields typically found in API responses for form items:
  line?: number;
  account_name?: string;
  product_name?: string;
  product_sku?: string;
  product_bin_location?: string;
  product_unit_label?: string;
  location_code?: string;
  /** The total amount for this line item before tax and net amount, usually (quantity * unit_price). */
  amount?: number;
  discount_amount?: number;
  tax_code?: string;
  tax_amount?: number;
  net_amount?: number;
}
