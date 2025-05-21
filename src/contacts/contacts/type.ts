// src/contacts/type.ts

import {
  BukkuListPagination,
  BukkuFileAttachment, // Re-evaluate if this is best for create params
  BukkuAttachedFileResponse, // Re-evaluate for response files
} from "../../common/type";

// --- Enums for stricter type checking ---
export type BukkuContactEntityType =
  | "MALAYSIAN_COMPANY"
  | "MALAYSIAN_INDIVIDUAL"
  | "FOREIGN_COMPANY"
  | "FOREIGN_INDIVIDUAL"
  | "EXEMPTED_PERSON";

export type BukkuContactRegNoType = "NRIC" | "BRN" | "PASSPORT" | "ARMY" | null;

export type BukkuContactType = "customer" | "supplier" | "employee";

// --- Request Parameter Types for Creation ---

/**
 * Contact Person details for creating a contact.
 */
export interface BukkuContactPersonCreateParams {
  // id is not part of create, but for update
  first_name?: string | null; // <= 50 chars
  last_name?: string | null; // <= 50 chars
  is_default_billing?: boolean;
  is_default_shipping?: boolean;
}

/**
 * Custom Field details for creating a contact.
 */
export interface BukkuContactCustomFieldCreateParams {
  // id is not part of create, but for update
  field_id: number; // The id of the Custom Field definition
  value?: string | null;
}

/**
 * Address details for creating a contact.
 */
export interface BukkuContactAddressCreateParams {
  // id is not part of create, but for update
  name?: string; // <= 50 chars
  street?: string; // <= 255 chars
  city?: string; // <= 100 chars
  state?: string; // <= 50 chars (API doc had <date> typo)
  postcode?: string; // <= 10 chars
  country_code?: string;
  is_default_billing?: boolean;
  is_default_shipping?: boolean;
}

/**
 * File attachment details for creating a contact.
 * The API documentation specifies only file_id.
 */
export interface BukkuContactFileItemParams {
  file_id: number;
}

/**
 * Parameters for creating a new Contact.
 * Based on POST /contacts
 */
export interface BukkuContactCreateParams {
  entity_type: BukkuContactEntityType;
  legal_name: string; // <= 100 chars
  other_name?: string; // <= 100 chars
  reg_no_type?: BukkuContactRegNoType;
  reg_no?: string; // <= 30 chars, Required if reg_no_type is provided
  old_reg_no?: string | null;
  tax_id_no?: string | null; // [ 11 .. 14 ] chars
  sst_reg_no?: string | null;
  contact_persons?: Array<BukkuContactPersonCreateParams>;
  group_ids?: number[]; // <= 4 items
  price_level_id?: number;
  email?: string; // <= 255 chars
  phone_no?: string; // <= 60 chars, e.g., 60123456789
  types: Array<BukkuContactType>; // Required
  tag_ids?: number[]; // <= 4 items
  default_currency_code?: string;
  default_term_id?: number;
  default_income_account_id?: number;
  default_expense_account_id?: number;
  fields?: Array<BukkuContactCustomFieldCreateParams>;
  remarks?: string;
  receive_monthly_statement?: boolean; // Defaults to true
  receive_invoice_reminder?: boolean; // Defaults to true
  key?: string;
  addresses?: Array<BukkuContactAddressCreateParams>;
  receivable_account_id?: number;
  debtor_credit_limit?: number;
  payable_account_id?: number;
  files?: Array<BukkuContactFileItemParams>;
}

// --- Response Object Types ---

/**
 * Represents a Contact Person as returned by the API.
 */
export interface BukkuContactPersonResponse {
  id: number;
  first_name: string | null;
  last_name: string | null;
  is_default_billing: boolean;
  is_default_shipping: boolean;
}

/**
 * Represents a Custom Field for a contact as returned by the API.
 */
export interface BukkuContactCustomFieldResponse {
  id: number; // ID of the contact custom field value instance
  field_id: number; // ID of the custom field definition
  data_type: string; // e.g., "TEXT"
  name: string; // Name of the custom field definition
  value: string | null;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents an Address for a contact as returned by the API.
 */
export interface BukkuContactAddressResponse {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  postcode: string;
  country_code: string;
  is_default_billing: boolean;
  is_default_shipping: boolean;
}

/**
 * Detailed information about an uploaded file, specific to Contact response.
 */
export interface BukkuContactFileDetailResponse {
  id: number; // This is the actual file_id
  name: string; // 'name' in contact sample, 'filename' in common BukkuFileDetailsResponse
  url: string;
  mime_type: string;
  size: number;
  data?: any | null; // From contact sample, usually null in response
  created_at: string;
  updated_at: string;
}

/**
 * Represents a file attached to a Contact, as returned in API responses.
 */
export interface BukkuContactFileResponseItem {
  id: number; // ID of the contact-to-file link
  file_id: number; // The actual file ID
  file: BukkuContactFileDetailResponse[]; // Array, usually one item
  created_at: string;
  updated_at: string;
}

/**
 * Represents a Contact object as returned by the API.
 */
export interface BukkuContact {
  id: number;
  billing_first_name: string | null; // Derived from default billing contact person
  billing_last_name: string | null;  // Derived from default billing contact person
  shipping_first_name: string | null; // Derived from default shipping contact person
  shipping_last_name: string | null; // Derived from default shipping contact person
  contact_persons: BukkuContactPersonResponse[] | null;
  entity_type: BukkuContactEntityType;
  legal_name: string;
  other_name: string | null;
  reg_no_type: BukkuContactRegNoType | null;
  reg_no: string | null;
  old_reg_no: string | null;
  tax_id_no: string | null;
  sst_reg_no: string | null;
  group_ids: number[] | null;
  price_level_id: number | null;
  email: string | null;
  phone_no: string | null;
  types: Array<BukkuContactType>;
  tag_ids: number[] | null;
  default_currency_code: string | null;
  default_term_id: number | null;
  default_income_account_id: number | null;
  default_expense_account_id: number | null;
  fields: BukkuContactCustomFieldResponse[] | null;
  remarks: string | null;
  receive_monthly_statement: boolean;
  receive_invoice_reminder: boolean;
  key: string | null;
  addresses: BukkuContactAddressResponse[] | null;
  receivable_account_id: number | null;
  debtor_credit_limit: number | null;
  payable_account_id: number | null;
  billing_party: string | null; // Formatted default billing address
  shipping_party: string | null; // Formatted default shipping address
  files: BukkuContactFileResponseItem[] | null;
  is_archived: boolean;
  is_myinvois_ready: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure when a contact is created or retrieved.
 */
export interface BukkuContactResponse {
  contact: BukkuContact;
}

// --- Request Parameter Types for Update ---

/**
 * Contact Person details for updating a contact. ID is required if updating an existing person.
 */
export interface BukkuContactPersonUpdateParams extends BukkuContactPersonCreateParams {
  id?: number; // Required to update an existing contact person
}

/**
 * Custom Field details for updating a contact. ID is required if updating an existing field value.
 */
export interface BukkuContactCustomFieldUpdateParams extends BukkuContactCustomFieldCreateParams {
  id?: number; // Required to update an existing custom field value for the contact
}

/**
 * Address details for updating a contact. ID is required.
 */
export interface BukkuContactAddressUpdateParams extends BukkuContactAddressCreateParams {
  id: number; // Required to update an existing address
}

/**
 * Parameters for updating an existing Contact.
 * Based on PUT /contacts/{id}
 */
export interface BukkuContactUpdateParams {
  entity_type: BukkuContactEntityType; // Required
  legal_name: string; // Required
  other_name?: string;
  reg_no_type?: BukkuContactRegNoType;
  reg_no?: string;
  old_reg_no?: string | null;
  tax_id_no?: string | null;
  sst_reg_no?: string | null;
  contact_persons?: Array<BukkuContactPersonUpdateParams>; // Use ID for existing, omit for new
  group_ids?: number[];
  price_level_id?: number;
  email?: string;
  phone_no?: string;
  types: Array<BukkuContactType>; // Required
  tag_ids?: number[];
  default_currency_code?: string;
  default_term_id?: number;
  default_income_account_id?: number;
  default_expense_account_id?: number;
  fields?: Array<BukkuContactCustomFieldUpdateParams>; // Use ID for existing, omit for new
  remarks?: string;
  receive_monthly_statement?: boolean;
  receive_invoice_reminder?: boolean;
  key?: string;
  addresses?: Array<BukkuContactAddressUpdateParams>; // Use ID for existing, omit for new. New addresses are added.
  receivable_account_id?: number;
  debtor_credit_limit?: number;
  payable_account_id?: number;
  files?: Array<BukkuContactFileItemParams>; // For new files. Existing files might be managed differently (e.g. by removing and re-adding)
  is_archived?: boolean; // Assuming this can be updated
}

// --- List Operation Types ---

/**
 * Parameters for listing Bukku Contacts.
 */
export interface BukkuContactListParams {
  /** Search for keywords in Name, Receivable, Payable, Created At. Max 100 chars. */
  search?: string;
  /** Search by group ID. */
  group_id?: number;
  /** The current page number. Default: 1, Min: 1. */
  page?: number;
  /** Number of records per page. Default: 30. */
  page_size?: number;
  /** Sort by field. */
  sort_by?: "name" | "receivable" | "payable" | "created_at";
  /** Sort the list in ascending or descending order. */
  sort_dir?: "asc" | "desc";
  /** Include all, non-archived, or archived contacts only, null returns active only. */
  status?: "ALL" | "ACTIVE" | "INACTIVE" | null;
  /** (Malaysia only) Include contacts that are MyInvois ready. */
  is_myinvois_ready?: boolean | null;
  /** Search by contact type, defaults to All if left empty. */
  type?: BukkuContactType;
  // Note: custom_search, entity_type, tag_ids from previous version are not in the GET /contacts API doc.
  // They might be supported via a different endpoint or a generic search mechanism if available.
  // For now, aligning strictly with the provided GET /contacts parameters.
  [key: string]: any; // For any other potential query params not explicitly defined
}

/**
 * Represents a summary of a Bukku Contact as it appears in a list.
 */
export interface BukkuContactListItem {
  id: number;
  entity_type: BukkuContactEntityType;
  legal_name: string;
  other_name: string | null;
  email: string | null;
  phone_no: string | null;
  types: Array<BukkuContactType>;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Represents the API response structure for listing contacts.
 */
export interface BukkuContactListApiResponse {
  paging: BukkuListPagination;
  contacts: BukkuContactListItem[]; // Using 'contacts' (plural) consistent with other list responses
}
