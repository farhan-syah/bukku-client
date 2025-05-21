// src/contacts/groups/groups.type.ts

import { BukkuListPagination } from "../../common/type";

/**
 * Parameters for creating a new Contact Group.
 * Based on POST /contacts/groups
 */
export interface BukkuContactGroupCreateParams {
  name: string; // <= 32 characters
  contact_ids?: number[];
}

/**
 * Represents a Contact Group object as returned by the API.
 */
export interface BukkuContactGroup {
  id: number;
  name: string;
  contact_ids: number[] | null; // API sample shows array, can be null if no contacts
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure when a contact group is created.
 */
export interface BukkuContactGroupResponse {
  group: BukkuContactGroup;
}

// --- List Operation Types ---

/**
 * Represents the API response structure for listing contact groups.
 * Assumes pagination structure is similar to other list APIs.
 */
export interface BukkuContactGroupListApiResponse {
  paging: BukkuListPagination;
  groups: BukkuContactGroup[];
}
