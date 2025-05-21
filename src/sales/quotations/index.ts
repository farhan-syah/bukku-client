// src/sales/quotations/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuQuotationCreateParams,
  BukkuQuotation,
  BukkuQuotationResponse,
  BukkuQuotationListParams,
  BukkuQuotationListApiResponse,
  BukkuQuotationUpdateParams,
  BukkuQuotationStatusUpdateParams,
} from "./type";

export class QuotationsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new quotation.
   * Endpoint: POST /sales/quotes
   * @param data - The data for the new quotation.
   * @returns A promise that resolves to the created quotation.
   */
  async create(
    data: BukkuQuotationCreateParams,
  ): Promise<BukkuQuotation> {
    const response = await this._request<BukkuQuotationResponse>(
      "/sales/quotes",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of quotations.
   * Endpoint: GET /sales/quotes
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing quotations.
   */
  async list(
    params?: BukkuQuotationListParams,
  ): Promise<BukkuQuotationListApiResponse> {
    return this._request<BukkuQuotationListApiResponse>(
      "/sales/quotes",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific quotation by its ID.
   * Endpoint: GET /sales/quotes/{id}
   * @param id - The ID of the quotation to retrieve.
   * @returns A promise that resolves to the quotation.
   */
  async get(id: string | number): Promise<BukkuQuotation> {
    const response = await this._request<BukkuQuotationResponse>(
      `/sales/quotes/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing quotation.
   * Endpoint: PUT /sales/quotes/{id}
   * @param id - The ID of the quotation to update.
   * @param data - The data to update the quotation with.
   * @returns A promise that resolves to the updated quotation.
   */
  async update(
    id: string | number,
    data: BukkuQuotationUpdateParams,
  ): Promise<BukkuQuotation> {
    const response = await this._request<BukkuQuotationResponse>(
      `/sales/quotes/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a quotation.
   * Endpoint: DELETE /sales/quotes/{id}
   * @param id - The ID of the quotation to delete.
   * @returns A promise that resolves when the quotation is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/sales/quotes/${id}`, "DELETE");
  }

  /**
   * Updates the status of an existing quotation.
   * Endpoint: PATCH /sales/quotes/{id}
   * @param id - The ID of the quotation to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated quotation.
   */
  async updateStatus(
    id: string | number,
    data: BukkuQuotationStatusUpdateParams,
  ): Promise<BukkuQuotation> {
    const response = await this._request<BukkuQuotationResponse>(
      `/sales/quotes/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }
}