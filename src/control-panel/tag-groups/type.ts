// src/control-panel/tag-groups/type.ts

/**
 * Parameters for creating a new Tag Group.
 * Based on POST /tags/groups request body schema.
 */
export interface BukkuTagGroupCreateParams {
  name: string;
}

/**
 * Represents a Tag Group object as returned by the API.
 * Based on the sample response for POST /tags/groups.
 */
export interface BukkuTagGroup {
  id: number;
  name: string;
  is_archived: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure when a tag group is created.
 * Based on the sample response for POST /tags/groups.
 */
export interface BukkuTagGroupResponse {
  tag_group: BukkuTagGroup[];
}

/**
 * Represents the API response structure for a single tag group item (e.g., for get, update).
 */
export interface BukkuTagGroupItemResponse {
  tag_group: BukkuTagGroup;
}

/**
 * Parameters for listing Tag Groups.
 * Based on GET /tags/groups query parameters.
 */
export interface BukkuTagGroupListParams {
  include_archived?: boolean; // Include archived tag groups
  [key: string]: any; // Allow any other string keys for compatibility
}

/**
 * Represents a Tag Group item as it appears in a list.
 * Assuming it's the same as BukkuTagGroup for now.
 */
export type BukkuTagGroupListItem = BukkuTagGroup;

/**
 * Represents the API response structure for listing tag groups.
 * Assuming a pagination structure similar to other list endpoints.
 */
export interface BukkuTagGroupListApiResponse {
  tag_groups: BukkuTagGroupListItem[]; // Note: "tag_groups" as key, assuming plural
  paging: {
    page: number;
    pageSize: number;
    total: number;
  };
}

/**
 * Parameters for updating an existing Tag Group.
 * Based on PUT /tags/groups/{id} request body schema.
 */
export interface BukkuTagGroupUpdateParams {
  name: string;
  // is_archived is typically handled by a separate archive/unarchive endpoint or PATCH
}
