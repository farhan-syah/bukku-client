// src/control-panel/locations/type.ts

/**
 * Parameters for creating a new Location.
 * Based on POST /locations request body schema.
 */
export interface BukkuLocationCreateParams {
  code: string;
  name: string;
  street?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country_code?: string;
  remarks?: string;
}

/**
 * Represents a Location object as returned by the API.
 * Based on the response sample for POST /locations.
 */
export interface BukkuLocation {
  id: number;
  code: string;
  name: string;
  street: string | null;
  city: string | null;
  state: string | null;
  postcode: string | null;
  country_code: string | null;
  remarks: string | null;
  is_archived: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
}

/**
 * Represents the API response structure when a location is created.
 */
export interface BukkuLocationResponse {
  location: BukkuLocation;
}

/**
 * Parameters for listing Locations.
 * Based on GET /locations query parameters.
 */
export interface BukkuLocationListParams {
  include_archived?: boolean; // Include archived locations
  [key: string]: any; // Allow any other string keys for compatibility
}

/**
 * Represents a Location item as it appears in a list.
 * Based on the response sample for GET /locations.
 */
export interface BukkuLocationListItem {
  id: number;
  code: string;
  name: string;
  is_archived: boolean;
  created_at: string; // "YYYY-MM-DD HH:MM:SS"
  updated_at: string; // "YYYY-MM-DD HH:MM:SS"
  // Note: street, city, state, postcode, country_code, remarks are not in the list sample.
}

/**
 * Represents the API response structure for listing locations.
 */
export interface BukkuLocationListApiResponse {
  locations: BukkuLocationListItem[];
  paging: {
    page: number;
    pageSize: number;
    total: number;
  };
}

/**
 * Parameters for updating an existing Location.
 * Based on PUT /locations/{id} request body schema.
 */
export interface BukkuLocationUpdateParams {
  code: string;
  name: string;
  street?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country_code?: string;
  remarks?: string;
  // is_archived is not part of the update schema based on user prompt, typically handled by a separate archive/unarchive endpoint or PATCH
}

/**
 * Parameters for archiving/unarchiving a Location.
 * Based on PATCH /locations/{id} request body schema.
 */
export interface BukkuLocationArchiveParams {
  is_archived: boolean;
}
