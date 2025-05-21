// src/accounting/accounts/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuAccount,
  BukkuAccountCreateParams,
  BukkuAccountUpdateParams,
  BukkuAccountArchiveParams,
  BukkuAccountResponse,
  BukkuAccountListParams,
  BukkuAccountListApiResponse,
} from "./type";

export class AccountsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new account.
   * Endpoint: POST /accounts
   * @param data - The data for the new account.
   * @returns A promise that resolves to the created account.
   */
  async create(data: BukkuAccountCreateParams): Promise<BukkuAccount> {
    const response = await this._request<BukkuAccountResponse>(
      "/accounts",
      "POST",
      data,
    );
    return response.account;
  }

  /**
   * Retrieves a paginated list of accounts.
   * Endpoint: GET /accounts
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing accounts.
   */
  async list(params?: BukkuAccountListParams): Promise<BukkuAccountListApiResponse> {
    return this._request<BukkuAccountListApiResponse>(
      "/accounts",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific account by its ID.
   * Endpoint: GET /accounts/{id}
   * @param id - The ID of the account to retrieve.
   * @returns A promise that resolves to the account.
   */
  async get(id: string | number): Promise<BukkuAccount> {
    const response = await this._request<BukkuAccountResponse>(
      `/accounts/${id}`,
      "GET",
    );
    return response.account;
  }

  /**
   * Updates an existing account.
   * Endpoint: PUT /accounts/{id}
   * @param id - The ID of the account to update.
   * @param data - The data to update the account with.
   * @returns A promise that resolves to the updated account.
   */
  async update(id: string | number, data: BukkuAccountUpdateParams): Promise<BukkuAccount> {
    const response = await this._request<BukkuAccountResponse>(
      `/accounts/${id}`,
      "PUT",
      data,
    );
    return response.account;
  }

  /**
   * Archives or unarchives an account.
   * Endpoint: PATCH /accounts/{id}
   * @param id - The ID of the account to archive/unarchive.
   * @param data - The archive status.
   * @returns A promise that resolves to the updated account.
   */
  async updateArchiveStatus(id: string | number, data: BukkuAccountArchiveParams): Promise<BukkuAccount> {
    const response = await this._request<BukkuAccountResponse>(
      `/accounts/${id}`,
      "PATCH",
      data,
    );
    return response.account;
  }

  /**
   * Deletes an account.
   * Endpoint: DELETE /accounts/{id}
   * Note: Only accounts that are not assigned to locked system type, have no children or not used can be deleted.
   * @param id - The ID of the account to delete.
   * @returns A promise that resolves when the account is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/accounts/${id}`, "DELETE");
  }
}
