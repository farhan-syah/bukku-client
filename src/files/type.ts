// bukku/src/files/type.ts

import { BukkuListPagination } from "../common/type";

/**
 * Represents the structure of the uploaded file details as returned by the API.
 * Based on the 'file' object in the POST /files response sample.
 */
export interface BukkuUploadedFile {
  id: number;
  filename: string;
  url: string;
  mime_type: string;
  size: number;
  created_at: string; // e.g., "2022-06-23 15:42:41"
  updated_at: string; // e.g., "2022-06-23 15:42:41"
}

/**
 * Represents the API response structure when a file is successfully uploaded.
 */
export interface BukkuFileResponse {
  file: BukkuUploadedFile;
}

// --- List Operation Types ---

/**
 * Enum for file types for filtering.
 */
export type BukkuFileTypeFilter = "IMAGE" | "VIDEO" | "EXCEL" | "PDF";

/**
 * Parameters for listing files.
 * Based on GET /files query parameters.
 */
export interface BukkuFileListParams {
  search?: string; // <= 128 characters
  type?: BukkuFileTypeFilter;
  is_used?: boolean;
  page?: number; // Default: 1
  page_size?: number; // Min 10, Max 100, Default: by system (e.g. 30)
  // Add other potential query params like sort_by, sort_dir if they become available
  [key: string]: any;
}

/**
 * Represents a file item as it appears in a list.
 * This might be identical to BukkuUploadedFile, but defined separately for clarity in list contexts.
 */
export interface BukkuFileListItem extends BukkuUploadedFile {
  // Potentially add other summary fields if the list response differs from the single file response
  // For now, assuming it's the same as BukkuUploadedFile
}

/**
 * Represents the API response structure for listing files.
 */
export interface BukkuFileListApiResponse {
  paging: BukkuListPagination;
  files: BukkuFileListItem[]; // Assuming the list key is 'files'
}
