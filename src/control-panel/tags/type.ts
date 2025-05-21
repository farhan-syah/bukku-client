// src/control-panel/tags/type.ts

/**
 * Parameters for creating a new Tag.
 * Based on POST /tags request body schema.
 */
export interface BukkuTagCreateParams {
  name: string;
  tag_group_id: number;
}

/**
 * Represents a Tag object as returned by the API.
 * Based on the provided sample response for POST /tags.
 */
export interface BukkuTag {
  id: number;
  name: string;
  tag_group_id: number;
  is_archived: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure when a tag is created or retrieved.
 */
export interface BukkuTagResponse {
  tag: BukkuTag;
}

/**
 * Parameters for listing Tags.
 * Based on GET /tags query parameters.
 */
export interface BukkuTagListParams {
  include_archived?: boolean; // Include archived tags
  [key: string]: any; // Allow any other string keys for compatibility
}

/**
 * Represents a Tag item as it appears in a list.
 * Assuming it's the same as BukkuTag for now, adjust if a specific list item schema is provided.
 */
export type BukkuTagListItem = BukkuTag;

/**
 * Represents the API response structure for listing tags.
 * Assuming a pagination structure similar to other list endpoints.
 */
export interface BukkuTagListApiResponse {
  tags: BukkuTagListItem[];
  paging: {
    page: number;
    pageSize: number;
    total: number;
  };
}

/**
 * Parameters for updating an existing Tag.
 * Based on PUT /tags/{id} request body schema.
 */
export interface BukkuTagUpdateParams {
  name: string;
  tag_group_id: number;
  // is_archived is typically handled by a separate archive/unarchive endpoint or PATCH
  // If it can be updated via PUT, it should be added here.
}
