// src/index.ts

import { URL } from "url"; // Using 'url' module for robust URL handling
import { SalesAPI } from "./sales";
import { PurchasesAPI } from "./purchases";
import { ContactsAPI } from "./contacts";
import { ProductsAPI } from "./products";
import { AccountingAPI } from "./accounting";
import { ListsAPI } from "./lists";
import type {
  ListType,
  GetListsRequestBody,
  GetListsResponse,
  CountryItem,
  TermItem,
  CurrencyItem,
  CurrenciesList,
  StandardListData,
} from "./lists/type";

/**
 * Configuration options for the BukkuClient.
 */
export interface BukkuClientOptions {
  /**
   * Your Bukku API Access Token.
   * Can be retrieved from Control Panel -> Integrations in your Bukku web app.
   */
  accessToken: string;

  /**
   * The subdomain of the company account you are accessing (e.g., "example" if your Bukku URL is example.bukku.my).
   */
  companySubdomain: string;

  /**
   * The base URL for the Bukku API.
   * For production server, use: https://api.bukku.my
   * For staging server, use: https://api.bukku.fyi
   */
  apiBaseUrl: string;

  /**
   * Optional fetch implementation. If not provided, uses global fetch.
   * This is useful for Node.js environments prior to v18 or for using custom fetch libraries.
   */
  fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

/**
 * BukkuAPIError class for handling API specific errors.
 */
export class BukkuAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public responseData?: any,
  ) {
    super(message);
    this.name = "BukkuAPIError";
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BukkuAPIError.prototype);
  }
}

// Export List API related types for easier consumption
export type {
  ListType,
  GetListsRequestBody,
  GetListsResponse,
  CountryItem,
  TermItem,
  CurrencyItem,
  CurrenciesList,
  StandardListData,
};

/**
 * A TypeScript client for interacting with the Bukku REST API.
 */
export class BukkuClient {
  private readonly accessToken: string;
  private readonly companySubdomain: string;
  private readonly apiBaseUrl: string;
  private readonly fetchImplementation: (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => Promise<Response>;

  public readonly sales: SalesAPI;
  public readonly purchases: PurchasesAPI;
  public readonly contacts: ContactsAPI;
  public readonly products: ProductsAPI;
  public readonly accounting: AccountingAPI;
  public readonly lists: ListsAPI;

  /**
   * Creates an instance of the BukkuClient.
   * @param options - Configuration options for the client.
   */
  constructor(options: BukkuClientOptions) {
    if (!options.accessToken) {
      throw new Error("Bukku API Access Token (accessToken) is required.");
    }
    if (!options.companySubdomain) {
      throw new Error(
        "Bukku Company Subdomain (companySubdomain) is required.",
      );
    }

    this.accessToken = options.accessToken;
    this.companySubdomain = options.companySubdomain;
    this.apiBaseUrl = options.apiBaseUrl;

    if (options.fetch) {
      this.fetchImplementation = options.fetch;
    } else if (typeof fetch !== "undefined") {
      this.fetchImplementation = fetch;
    } else {
      // This error will be thrown if global fetch is not available and no polyfill is provided.
      // For Node.js < 18, users will need to pass a fetch polyfill (e.g., node-fetch).
      throw new Error(
        "Global fetch is not available. Please provide a fetch implementation in BukkuClientOptions or use Node.js v18+.",
      );
    }

    // Validate apiBaseUrl
    try {
      new URL(this.apiBaseUrl);
    } catch (error) {
      throw new Error(
        `Invalid apiBaseUrl: ${this.apiBaseUrl}. It must be a valid URL.`,
      );
    }

    // Initialize API modules
    this.sales = new SalesAPI(this._request.bind(this));
    this.purchases = new PurchasesAPI(this._request.bind(this));
    this.contacts = new ContactsAPI(this._request.bind(this));
    this.products = new ProductsAPI(this._request.bind(this));
    this.accounting = new AccountingAPI(this._request.bind(this));
    this.lists = new ListsAPI(this._request.bind(this));
  }

  /**
   * A private helper method to make authenticated requests to the Bukku API.
   * @param endpoint - The API endpoint (e.g., '/v1/invoices').
   * @param method - HTTP method (GET, POST, PUT, DELETE, etc.).
   * @param body - Optional request body for POST/PUT requests.
   * @param queryParams - Optional query parameters.
   * @returns A Promise resolving to the JSON response from the API.
   * @throws BukkuAPIError if the API returns an error.
   */
  private async _request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", // Add other methods as needed
    body?: Record<string, any>,
    queryParams?: Record<string, string | number | boolean>,
  ): Promise<T> {
    const url = new URL(endpoint, this.apiBaseUrl);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.accessToken}`,
      "Company-Subdomain": this.companySubdomain,
      Accept: "application/json",
    };

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const config: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await this.fetchImplementation(url.toString(), config);
      if (!response.ok) {
        // Attempt to parse error response, but don't fail if it's not JSON
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // If response is not JSON, use text
          errorData = await response.text();
        }
        throw new BukkuAPIError(
          `API request failed: ${response.status} ${response.statusText}`,
          response.status,
          errorData,
        );
      }

      // Handle cases where response might be empty (e.g., 204 No Content)
      if (response.status === 204) {
        return {} as T; // Or handle as undefined based on preference
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof BukkuAPIError) {
        throw error;
      }
      // Catch network errors or other issues not originating from the API's HTTP response
      throw new BukkuAPIError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
