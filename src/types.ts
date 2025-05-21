// src/types.ts

/**
 * Defines the signature for the internal API request function.
 * This function is passed from the main BukkuClient to sub-API classes.
 * @template T The expected return type of the API call.
 * @param endpoint The API endpoint path (e.g., '/v1/invoices').
 * @param method The HTTP method.
 * @param body Optional request body for POST/PUT/PATCH requests.
 * @param queryParams Optional query parameters.
 * @returns A Promise resolving to the API response.
 */
export type BukkuAPIRequestFunction = <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: Record<string, any> | { file: string; fileName: string }, // Allow specific object for file uploads
  queryParams?: Record<string, string | number | boolean>,
) => Promise<T>;

// Re-export types from other modules for a single point of import if desired
export type {
  ListType,
  GetListsRequestBody,
  GetListsResponse,
  CountryItem,
  TermItem,
  CurrencyItem,
  CurrenciesList,
  StandardListData,
} from "./lists/type";
