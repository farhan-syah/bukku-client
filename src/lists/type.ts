// bukku/src/lists/type.ts
/**
 * Represents a contact address item as returned by the API.
 */
export interface ContactAddressItem {
  id: number;
  name: string;
  address: string;
}
/**
 * Represents a company address item as returned by the API.
 */
export interface CompanyAddressItem {
  id: number;
  name: string;
  address: string;
  is_default_billing: boolean;
  is_default_shipping: boolean;
}
/**
 * Represents a contact group item as returned by the API.
 */
export interface ContactGroupItem {
  id: number;
  name: string;
  customers: number;
  suppliers: number;
  employees: number;
}
/**
 * Represents a classification code item as returned by the API.
 */
export interface ClassificationCodeItem {
  code: string;
  description: string;
}
/**
 * Represents a unit item within a product as returned by the API.
 */
export interface ProductUnitItem {
  id: number;
  label: string;
  rate: number;
  sale_price: number;
  purchase_price: number;
  is_base: boolean;
  is_sale_default: boolean;
  is_purchase_default: boolean;
}
/**
 * Represents a product item as returned by the API.
 */
export interface ProductItem {
  id: number;
  thumbnail_url: string | null;
  sku: string | null;
  name: string;
  track_inventory: boolean;
  inventory_account_id: number | null;
  quantity: number | null;
  is_selling: boolean;
  sale_description: string | null;
  sale_account_id: number | null;
  sale_tax_code_id: number | null;
  is_buying: boolean;
  purchase_description: string | null;
  purchase_account_id: number | null;
  purchase_tax_code_id: number | null;
  units: ProductUnitItem[];
  type: "product" | "bundle" | string; // Using string for flexibility
  is_archived: boolean;
}
/**
 * Represents a unit item within a product_list item as returned by the API.
 */
export interface ProductListUnitItem {
  id: number;
  label: string;
  rate: number;
  is_base: boolean;
}
/**
 * Represents a product_list item as returned by the API.
 */
export interface ProductListItem {
  id: number;
  thumbnail_url: string | null;
  sku: string | null;
  name: string;
  track_inventory: boolean;
  inventory_account_id: number | null; // Sample shows number, but could be null if track_inventory is false
  quantity: number | null;
  is_selling: boolean;
  is_buying: boolean;
  units: ProductListUnitItem[];
  type: "product" | "bundle" | "service" | string; // Added service based on common patterns, adjust if needed
  group_names: string[];
  is_archived: boolean;
}
/**
 * Represents a child item within a product (bundle) as returned by the API.
 */
export interface ProductChildItem {
  id: number;
  name: string;
  description: string | null;
  unit_id: number;
  quantity: number;
  unit_price: number;
  prices: any[]; // Sample shows empty array, use 'any[]' for flexibility
  account_id: number;
  track_inventory: boolean;
  inventory_account_id: number;
  tax_code_id: number;
}
/**
 * Represents a detailed product item (often a bundle with children)
 * as returned by the API under the 'product.item' path.
 */
export interface ProductDetailItem {
  id: number;
  type: "bundle" | string; // Sample shows 'bundle', add others if known
  name: string;
  description: string | null;
  children: ProductChildItem[];
}
/**
 * Specific structure for the "product" (singular) list response.
 */
export interface ProductDetailResponseData {
  item: ProductDetailItem[];
}
/**
 * Represents a product group item as returned by the API.
 */
export interface ProductGroupItem {
  id: number;
  name: string;
}
/**
 * Represents the currency details within an account item.
 */
export interface AccountCurrency {
  code: string;
  symbol: string;
}
/**
 * Represents an account item as returned by the API.
 * This interface is recursive to handle nested child accounts.
 */
export interface AccountItem {
  id: number;
  code: string;
  name: string;
  currency_code: string;
  currency: AccountCurrency;
  balance: number;
  type: string; // Consider creating a more specific type if these are fixed values
  parent_id: number | null;
  system_type: string | null; // Consider creating a more specific type if these are fixed values
  is_locked: boolean;
  is_archived: boolean;
  children: AccountItem[] | null;
}
/**
 * Represents a payment method item as returned by the API.
 */
export interface PaymentMethodItem {
  id: number;
  name: string;
  slug: string;
  is_archived: boolean;
  account_id: number | null;
}
/**
 * Represents a price level item as returned by the API.
 */
export interface PriceLevelItem {
  id: number;
  name: string;
  is_archived: boolean;
}
/**
 * Represents an individual tag within a tag group.
 */
export interface TagItem {
  id: number;
  name: string;
  is_archived: boolean;
}
/**
 * Represents a tag group item with its nested tags,
 * as returned by the API under the 'tag_groups.item' path.
 */
export interface TagGroupDetailItem {
  id: number;
  name: string;
  tags: TagItem[];
  is_archived: boolean;
}
/**
 * Specific structure for the "tag_groups" list response.
 */
export interface TagGroupsResponseData {
  item: TagGroupDetailItem[];
}
/**
 * Represents an asset type item as returned by the API.
 */
export interface AssetTypeItem {
  id: number;
  name: string;
  asset_account_id: number;
  depreciation_account_id: number;
  expense_account_id: number;
  default_depreciation_method: string; // Consider specific string literal types if known
  default_depreciation_convention: string; // Consider specific string literal types if known
  default_depreciate_mode: string; // Consider specific string literal types if known
  default_depreciation_rate: number;
  default_useful_years: number;
  default_useful_months: number;
  assets_count: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
/**
 * Represents an individual field item (for contact or transaction).
 */
export interface FieldItem {
  id: number;
  name: string;
  type: "CONTACT" | "TRANSACTION" | string; // Consider specific string literal types
  data_type: "TEXT" | string; // Consider specific string literal types
  data_options: any | null; // Type accordingly if structure is known
  is_required: boolean;
  sale_quote_show: boolean;
  sale_order_show: boolean;
  sale_delivery_order_show: boolean;
  sale_invoice_show: boolean;
  sale_credit_note_show: boolean;
  sale_payment_show: boolean;
  sale_refund_show: boolean;
  purchase_order_show: boolean;
  purchase_goods_received_note_show: boolean;
  purchase_bill_show: boolean;
  purchase_credit_note_show: boolean;
  purchase_payment_show: boolean;
  purchase_refund_show: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
/**
 * Specific structure for the "fields" list response.
 * The items are grouped by field type (e.g., "contact", "transaction").
 */
export interface FieldsResponseData {
  version: string;
  items: {
    contact?: FieldItem[];
    transaction?: FieldItem[];
    // Add other field types here if they exist
    [key: string]: FieldItem[] | undefined; // For any other dynamic keys
  };
}
/**
 * Represents a numbering item as returned by the API.
 */
export interface NumberingItem {
  id: number;
  type: string; // Consider specific string literal types if known (e.g., "sale_quote")
  format: string;
  is_default: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
/**
 * Represents a form design item as returned by the API.
 */
export interface FormDesignItem {
  id: number;
  name: string;
  template: string; // Consider specific string literal types if known
}
/**
 * Represents a location item as returned by the API.
 */
export interface LocationItem {
  id: number;
  code?: string; // Present in first sample item
  name?: string; // Present in first sample item
  type?: string; // Present in second sample item (seems like 'code')
  format?: string; // Present in second sample item (seems like 'name')
  is_archived?: boolean; // Present in first sample item
  is_default?: boolean; // Present in second sample item
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
/**
 * Represents a location item within the stock_balances list.
 */
export interface StockBalanceLocationItem {
  id: number;
  code?: string; // Present in first sample item
  name?: string; // Present in first sample item
  type?: string; // Present in second sample item (seems like 'code')
  format?: string; // Present in second sample item (seems like 'name')
  balance: number;
}
/**
 * Specific structure for the "stock_balances" list response.
 */
export interface StockBalancesResponseData {
  product_id: number;
  items: StockBalanceLocationItem[];
}
/**
 * Represents a tax code item as returned by the API.
 */
export interface TaxCodeItem {
  id: number;
  code: string;
  rate: number;
  tax_system: string; // Consider specific string literal types if known
  type: "purchase" | "sale" | string; // Consider specific string literal types
  is_archived: boolean;
  is_exempted: boolean;
}
/**
 * Specific structure for the "tax_codes" list response.
 */
export interface TaxCodesResponseData {
  items: TaxCodeItem[];
}
/**
 * Represents the various settings items within the "settings" list response.
 * This is a large object with many optional fields of varying types.
 */
export interface SettingsItems {
  account_list_version?: string;
  api_access_on?: boolean;
  api_access_token?: string;
  asset_list_version?: string;
  asset_number_format_id?: number;
  bank_expense_email_message?: string | null;
  bank_expense_form_design_id?: number;
  bank_expense_number_format_id?: number;
  bank_income_email_message?: string | null;
  bank_income_form_design_id?: number;
  bank_income_number_format_id?: number;
  bank_transfer_form_design_id?: number;
  bank_transfer_number_format_id?: number;
  business_digest_frequency?: string;
  business_digest_on?: boolean;
  coming_due_email_message?: string | null;
  coming_due_email_on?: boolean;
  coming_due_email_schedule?: string;
  company_addresses_list_version?: string;
  contact_group_list_version?: string;
  contact_list_version?: string;
  contra_form_design_id?: number;
  contra_number_format_id?: number;
  contra_remarks?: string | null;
  contra_signatures?: any | null; // Type properly if structure is known
  credit_limit_passcode?: string | null;
  credit_note_email_message?: string | null;
  currency_list_version?: string;
  custom_transaction_number_on?: boolean;
  dashboard_bank_account_ids?: number[];
  dashboard_cashflow_forecast_preset?: string;
  dashboard_cashflow_trend_preset?: string;
  dashboard_expense_breakdown_preset?: string;
  dashboard_expense_hide_sub_accounts?: boolean;
  dashboard_income_breakdown_preset?: string;
  dashboard_income_hide_sub_accounts?: boolean;
  dashboard_profit_loss_trend_preset?: string;
  dashboard_sales_trend_preset?: string;
  default_asset_capital_gain_account_id?: number | null;
  default_asset_gain_account_id?: number | null;
  default_asset_loss_account_id?: number | null;
  default_bank_adjustment_account_id?: number;
  default_bank_cash_account_id?: number;
  default_cos_account_id?: number;
  default_email_subject?: string;
  default_expense_account_id?: number;
  default_income_account_id?: number;
  default_inventory_account_id?: number;
  default_inventory_adjustment_account_id?: number;
  default_location_id?: number;
  default_payable_account_id?: number;
  default_payment_method_id?: number | null;
  default_product_unit_label?: string;
  default_purchase_tax_code_id?: number;
  default_receivable_account_id?: number;
  default_rounding_on?: boolean;
  default_sales_tax_code_id?: number;
  default_tax_mode?: string;
  default_term_id?: number;
  default_transaction_fee_account_id?: number;
  description_contra?: string | null;
  description_expense?: string | null;
  description_income?: string | null;
  description_journal_entry?: string | null;
  description_purchase_bill?: string | null;
  description_purchase_credit_note?: string | null;
  description_purchase_goods_received?: string | null;
  description_purchase_order?: string | null;
  description_purchase_payment?: string | null;
  description_purchase_refund?: string | null;
  description_sale_credit_note?: string | null;
  description_sale_delivery_order?: string | null;
  description_sale_invoice?: string | null;
  description_sale_order?: string | null;
  description_sale_payment?: string | null;
  description_sale_quote?: string | null;
  description_sale_refund?: string | null;
  description_stock_adjustment?: string | null;
  description_stock_transfer?: string | null;
  description_tax_deemed_payment?: string | null;
  description_transfer?: string | null;
  e_invoice_attachment_on?: boolean;
  e_invoice_cc_email_addresses?: string | null;
  email_footer?: string | null;
  field_list_version?: string;
  financial_year_end_month?: number;
  form_design_list_version?: string;
  fs_facility_code?: string | null;
  inventory_grni_date?: string | null;
  inventory_grni_on?: boolean;
  invoice_email_message?: string | null;
  journal_entry_form_design_id?: number;
  journal_entry_number_format_id?: number;
  journal_entry_remarks?: string | null;
  location_list_version?: string;
  mysst_exempted_tax_code_show?: boolean;
  mysst_sales_tax_id?: string;
  mysst_sales_tax_on?: boolean;
  mysst_service_tax_id?: string;
  mysst_service_tax_on?: boolean;
  numbering_list_version?: string;
  official_receipt_remarks?: string | null;
  order_email_message?: string | null;
  overdue_email_message?: string | null;
  overdue_email_on?: boolean;
  overdue_email_schedule?: string;
  payment_email_message?: string | null;
  payment_gateway_deposit_account_id?: number;
  payment_gateway_fee_account_id?: number | null;
  payment_gateway_payment_method_id?: number;
  payment_gateway_provider?: string;
  payment_gateway_secret?: string;
  payment_gateway_settlement_account_id?: number | null;
  payment_gateway_switch?: boolean;
  payment_gateway_track_fee?: boolean;
  payment_gateway_track_settlement?: boolean;
  payment_gateway_username?: string | null;
  payment_method_list_version?: string;
  payment_voucher_remarks?: string | null;
  period_lock_date?: string | null;
  period_lock_passcode?: string | null;
  price_level_list_version?: string;
  product_group_list_version?: string;
  product_list_version?: string;
  purchase_bill_form_design_id?: number;
  purchase_bill_number_format_id?: number;
  purchase_credit_note_form_design_id?: number;
  purchase_credit_note_number_format_id?: number;
  purchase_goods_received_note_email_message?: string | null;
  purchase_goods_received_note_form_design_id?: number;
  purchase_goods_received_note_number_format_id?: number;
  purchase_goods_received_note_remarks?: string | null;
  purchase_order_form_design_id?: number;
  purchase_order_number_format_id?: number;
  purchase_order_remarks?: string | null;
  purchase_payment_email_message?: string | null;
  purchase_payment_form_design_id?: number;
  purchase_payment_number_format_id?: number;
  purchase_refund_email_message?: string | null;
  purchase_refund_form_design_id?: number;
  purchase_refund_number_format_id?: number;
  quote_email_message?: string | null;
  refund_email_message?: string | null;
  sale_credit_note_form_design_id?: number;
  sale_credit_note_number_format_id?: number;
  sale_credit_note_remarks?: string | null;
  sale_delivery_note_remarks?: string | null;
  sale_delivery_order_email_message?: string | null;
  sale_delivery_order_form_design_id?: number;
  sale_delivery_order_number_format_id?: number;
  sale_delivery_order_remarks?: string;
  sale_invoice_form_design_id?: number;
  sale_invoice_number_format_id?: number;
  sale_invoice_remarks?: string | null;
  sale_order_email_message?: string | null;
  sale_order_form_design_id?: number;
  sale_order_number_format_id?: number;
  sale_order_remarks?: string;
  sale_payment_form_design_id?: number;
  sale_payment_number_format_id?: number;
  sale_quote_form_design_id?: number;
  sale_quote_number_format_id?: number;
  sale_quote_remarks?: string;
  sale_refund_form_design_id?: number;
  sale_refund_number_format_id?: number;
  service_date_on?: boolean;
  setting_list_version?: string;
  signature_bank_transfer?: any | null; // Type properly if structure is known
  signature_journal_entry?: number[];
  signature_official_receipt?: number[];
  signature_payment_voucher?: number[];
  signature_purchase_bill?: number[];
  signature_purchase_credit_note?: number[];
  signature_purchase_goods_received_note?: number[];
  signature_purchase_order?: number[];
  signature_sale_credit_note?: number[];
  signature_sale_delivery_note?: number[];
  signature_sale_delivery_order?: number[];
  signature_sale_invoice?: number[];
  signature_sale_order?: number[];
  signature_sale_quote?: number[];
  signature1_bottom_label?: string;
  signature1_file_id?: number;
  signature1_file_url?: string;
  signature1_is_override?: boolean;
  signature1_top_label?: string | null;
  signature2_bottom_label?: string;
  signature2_file_id?: number;
  signature2_file_url?: string;
  signature2_is_override?: boolean;
  signature2_top_label?: string | null;
  signature3_bottom_label?: string;
  signature3_file_id?: number;
  signature3_file_url?: string;
  signature3_is_override?: boolean;
  signature3_top_label?: string | null;
  signature4_bottom_label?: string;
  signature4_file_id?: number;
  signature4_file_url?: string;
  signature4_is_override?: boolean;
  signature4_top_label?: string | null;
  signature5_bottom_label?: string;
  signature5_file_id?: number;
  signature5_file_url?: string;
  signature5_is_override?: boolean;
  signature5_top_label?: string | null;
  signature6_bottom_label?: string;
  signature6_file_id?: number;
  signature6_file_url?: string;
  signature6_is_override?: boolean;
  signature6_top_label?: string | null;
  statement_email_message?: string | null;
  statement_email_reply_to?: string | null;
  statement_email_subject?: string;
  statement_form_design_id?: number;
  statement_interest_show?: boolean;
  statement_remarks?: string | null;
  statement_send_day?: number;
  statement_send_on?: boolean;
  statement_send_outstanding_only?: boolean;
  statement_send_period_from?: string;
  statement_send_period_to?: string;
  stock_adjustment_form_design_id?: number;
  stock_adjustment_number_format_id?: number;
  stock_transfer_form_design_id?: number;
  stock_transfer_number_format_id?: number;
  store_allow_negative_inventory?: boolean;
  store_banner_file_id?: number | null;
  store_contact_id?: number;
  store_hide_out_of_stock_items?: boolean;
  store_on?: boolean;
  store_online_payment?: boolean;
  store_order_number_format_id?: number;
  store_order_received_notification_recipients?: string[];
  store_payment_instructions?: string;
  support_access?: boolean;
  tag_list_version?: string;
  tax_deemed_payment_number_format_id?: number;
  term_list_version?: string;
  transaction_email_master_on?: boolean;
  transaction_email_reply_to?: string | null;
  transaction_email_reply_to_user?: boolean;
  // Add any other settings keys here
  [key: string]: any; // Fallback for any other dynamic keys
}
/**
 * Represents the usage and limit for a specific feature (e.g., transaction, email).
 */
export interface LimitDetail {
  usage: number;
  limit: number | boolean; // Sample shows number or boolean (false)
}
/**
 * Represents a user item as returned by the API.
 */
export interface UserItem {
  id: number;
  first_name: string;
  last_name: string;
}
/**
 * Specific structure for the "users" list response.
 */
export interface UsersResponseData {
  items: UserItem[];
}
/**
 * Represents an advisor item as returned by the API.
 */
export interface AdvisorItem {
  id: number;
  first_name: string;
  email: string;
}
/**
 * Specific structure for the "advisors" list response.
 */
export interface AdvisorsResponseData {
  items: AdvisorItem[];
}
/**
 * Represents a state item as returned by the API for the "state_list".
 */
export interface StateListItem {
  state_code: string;
  name: string;
}
/**
 * Specific structure for the "state_list" response.
 */
export interface StateListResponseData {
  items: StateListItem[];
}

/**
 * Represents a limit item as returned by the API for the "limits" list.
 */
export interface LimitItem {
  plan_type: string;
  limit_period_type: string;
  transaction: LimitDetail;
  shoebox: LimitDetail;
  email: LimitDetail;
  storage: LimitDetail;
  // Add other limit categories if they exist
  [key: string]: any; // Fallback for other dynamic keys
}

/**
 * Specific structure for the "limits" list response.
 * It's a direct array of LimitItem.
 */
export type LimitsResponseData = LimitItem[];

/**
 * Specific structure for the "settings" list response.
 */
export interface SettingsResponseData {
  version: string;
  items: SettingsItems;
}

/**
 * Represents the types of lists that can be fetched.
 * These correspond to the valid string values for the 'lists' array in the request body.
 */
export type ListType =
  | "countries"
  | "currencies"
  | "contacts"
  | "contact_addresses"
  | "company_addresses"
  | "contact_groups"
  | "classification_code_list"
  | "products"
  | "product_list"
  | "product"
  | "product_groups"
  | "accounts"
  | "terms"
  | "payment_methods"
  | "price_levels"
  | "tag_groups"
  | "asset_types"
  | "fields"
  | "numberings"
  | "form_designs"
  | "locations"
  | "stock_balances"
  | "tax_codes"
  | "settings"
  | "limits"
  | "users"
  | "advisors"
  | "state_list";

/**
 * Request body for the Get Lists API (POST /v2/lists).
 */
export interface GetListsRequestBody {
  /** An array of specific list types to fetch. */
  lists: ListType[];
  /** 
   * Optional array of parameter objects. 
   * Contains data needed for specific sub-endpoints if required by any of the requested list types.
   * The structure of objects within this array can vary.
   */
  params?: Record<string, any>[];
}

// --- Response Item Types ---

/**
 * Represents a contact item as returned by the API.
 */
export interface ContactItem {
  id: number;
  legal_name: string;
  other_name: string | null;
  reg_no: string | null;
  billing_first_name: string | null;
  billing_last_name: string | null;
  shipping_first_name: string | null;
  shipping_last_name: string | null;
  types: string[]; // Consider creating a more specific type if these are fixed values
  email: string | null;
  phone_no: string | null;
  receivable_account_id: number | null;
  payable_account_id: number | null;
  billing_party: string | null;
  shipping_party: string | null;
  default_currency_code: string | null;
  default_term_id: number | null;
  default_income_account_id: number | null;
  default_expense_account_id: number | null;
  tag_ids: number[];
  key: string | null;
  is_archived: boolean;
  field_1?: string; // Optional field based on sample
  field_8?: string; // Optional field based on sample
  // Add any other fields that might appear in a contact item
}


/**
 * Represents a country item as returned by the API.
 */
export interface CountryItem {
  code: string;
  name: string;
}

/**
 * Represents a term item as returned by the API.
 */
export interface TermItem {
  id: number;
  name: string;
  type: "in_days" | "day_of_month" | string; // Using string for flexibility with potential new types
  value: number;
  interest_on: boolean;
  interest_rate: number | null;
  is_archived: boolean;
}

/**
 * Represents a currency item as returned by the API.
 */
export interface CurrencyItem {
  code: string;
  symbol: string;
  name: string;
}

/**
 * Specific structure for the "currencies" list response.
 */
export interface CurrenciesList {
  version: string;
  favourite_items: CurrencyItem[];
  popular_items: CurrencyItem[];
  other_items: CurrencyItem[];
}

/**
 * Generic structure for the data associated with a list type in the response
 * for lists that follow the simple "items" array pattern.
 * @template T The type of items contained in the list.
 */
export interface StandardListData<T> {
  items: T[];
  version?: string; // Optional: some lists like 'terms' include a version
}

/**
 * Represents the overall response structure for the Get Lists API.
 * It's a dynamic object where keys are the requested list types.
 */
export type GetListsResponse = {
  countries?: StandardListData<CountryItem>;
  terms?: StandardListData<TermItem>;
  currencies?: CurrenciesList;
  contacts?: StandardListData<ContactItem>;
  contact_addresses?: StandardListData<ContactAddressItem>;
  company_addresses?: StandardListData<CompanyAddressItem>;
  contact_groups?: StandardListData<ContactGroupItem>;
  classification_code_list?: StandardListData<ClassificationCodeItem>;
  products?: StandardListData<ProductItem>;
  product_list?: StandardListData<ProductListItem>;
  product?: ProductDetailResponseData;
  product_groups?: StandardListData<ProductGroupItem>;
  accounts?: StandardListData<AccountItem>;
  payment_methods?: StandardListData<PaymentMethodItem>;
  price_levels?: StandardListData<PriceLevelItem>;
  tag_groups?: TagGroupsResponseData;
  asset_types?: StandardListData<AssetTypeItem>;
  fields?: FieldsResponseData;
  numberings?: StandardListData<NumberingItem>;
  form_designs?: StandardListData<FormDesignItem>;
  locations?: StandardListData<LocationItem>;
  stock_balances?: StockBalancesResponseData;
  tax_codes?: TaxCodesResponseData;
  settings?: SettingsResponseData;
  limits?: LimitsResponseData;
  users?: UsersResponseData;
  advisors?: AdvisorsResponseData;
  state_list?: StateListResponseData; // Note: state_list has a custom structure
  // Add other explicitly typed list responses here as needed for unique structures
} & {
  // Fallback for other list types not explicitly defined above,
  // assuming they follow the StandardListData structure.
  [K in Exclude<ListType, "countries" | "terms" | "currencies" | "contacts" | "contact_addresses" | "company_addresses" | "contact_groups" | "classification_code_list" | "products" | "product_list" | "product" | "product_groups" | "accounts" | "payment_methods" | "price_levels" | "tag_groups" | "asset_types" | "fields" | "numberings" | "form_designs" | "locations" | "stock_balances" | "tax_codes" | "settings" | "limits" | "users" | "advisors" | "state_list">]?: StandardListData<Record<string, any>>;
};
