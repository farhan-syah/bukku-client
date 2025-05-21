// src/sales/invoices/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuInvoice,
  BukkuInvoiceCreateParams,
  BukkuInvoiceResponse,
  BukkuInvoiceListParams,
  BukkuInvoiceListApiResponse,
  BukkuInvoiceUpdateParams,
  BukkuInvoiceStatusUpdateParams,
} from "./type";

export class InvoicesAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new invoice.
   * Endpoint: POST /sales/invoices
   * @param data - The data for the new invoice.
   * @returns A promise that resolves to the created invoice.
   */
  async create(data: BukkuInvoiceCreateParams): Promise<BukkuInvoice> {
    const response = await this._request<BukkuInvoiceResponse>(
      "/sales/invoices",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of invoices.
   * Endpoint: GET /sales/invoices
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing invoices.
   */
  async list(
    params?: BukkuInvoiceListParams,
  ): Promise<BukkuInvoiceListApiResponse> {
    return this._request<BukkuInvoiceListApiResponse>(
      "/sales/invoices",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific invoice by its ID.
   * Endpoint: GET /sales/invoices/{id}
   * @param id - The ID of the invoice to retrieve.
   * @returns A promise that resolves to the invoice.
   */
  async get(id: string | number): Promise<BukkuInvoice> {
    const response = await this._request<BukkuInvoiceResponse>(
      `/sales/invoices/${id}`,
      "GET",
    );
    return response.transaction;
  }

  // --- Placeholder for other Invoice methods ---

  /**
   * Updates an existing invoice.
   * Endpoint: PUT /sales/invoices/{id}
   * @param id - The ID of the invoice to update.
   * @param data - The data to update the invoice with.
   * @returns A promise that resolves to the updated invoice.
   */
  async update(
    id: string | number,
    data: BukkuInvoiceUpdateParams,
  ): Promise<BukkuInvoice> {
    const response = await this._request<BukkuInvoiceResponse>(
      `/sales/invoices/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes an invoice.
   * Endpoint: DELETE /sales/invoices/{id}
   * Note: Only transactions with draft and void statuses can be deleted.
   * @param id - The ID of the invoice to delete.
   * @returns A promise that resolves when the invoice is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/sales/invoices/${id}`, "DELETE");
  }

  /**
   * Updates the status of an existing invoice.
   * Endpoint: PATCH /sales/invoices/{id}
   * @param id - The ID of the invoice to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated invoice.
   */
  async updateStatus(
    id: string | number,
    data: BukkuInvoiceStatusUpdateParams,
  ): Promise<BukkuInvoice> {
    const response = await this._request<BukkuInvoiceResponse>(
      `/sales/invoices/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }
}