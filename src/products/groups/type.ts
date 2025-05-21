// bukku/src/products/groups/type.ts

import { BukkuListPagination } from "../../common/type";

/**
 * Parameters for creating a new Product Group.
 * Based on POST /products/groups
 */
export interface BukkuProductGroupCreateParams {
  name: string; // <= 32 characters
  /** The array of product IDs in the product group. Sample: [[1, 2]] */
  product_ids: number[][]; // Array of arrays of numbers
}

/**
 * Represents a Product Group object as returned by the API in GET (single), POST, and PUT responses.
 */
export interface BukkuProductGroup {
  id: number;
  name: string;
  /** Product IDs, sample shows an array containing an array of numbers: [[1, 3]] */
  product_ids: number[][] | null;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
  products_count?: number; // Included for consistency, though sample for single GET might not have it
}

/**
 * Represents a summary of a Product Group as it appears in a list (GET /products/groups response).
 */
export interface BukkuProductGroupListItem {
  id: number;
  name: string;
  products_count: number;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure when a product group is created or retrieved individually.
 */
export interface BukkuProductGroupResponse {
  group: BukkuProductGroup;
}

/**
 * Represents the API response structure for listing product groups.
 */
export interface BukkuProductGroupListApiResponse {
  // paging: BukkuListPagination; // The provided sample does not show pagination. Add if confirmed.
  groups: BukkuProductGroupListItem[];
}

/**
 * Parameters for updating an existing Product Group.
 * Based on PUT /products/groups/{productGroupId}
 */
export interface BukkuProductGroupUpdateParams {
  name: string; // <= 32 characters
  /** The array of product IDs in the product group. Sample: [[1, 2]] */
  product_ids: number[][]; // Array of arrays of numbers
}

// TODO: Add BukkuProductGroupListParams if list endpoint supports query parameters (e.g., pagination).
