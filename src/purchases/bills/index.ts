// src/purchases/bills/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuBill,
  BukkuBillCreateParams,
  BukkuBillResponse,
  BukkuBillListParams,
  BukkuBillListApiResponse,
  BukkuBillUpdateParams,
  BukkuBillStatusUpdateParams,
} from "./type";

export class BillsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new bill.
   * Endpoint: POST /purchases/bills
   * @param data - The data for the new bill.
   * @returns A promise that resolves to the created bill.
   */
  async create(data: BukkuBillCreateParams): Promise<BukkuBill> {
    const response = await this._request<BukkuBillResponse>(
      "/purchases/bills",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of bills.
   * Endpoint: GET /purchases/bills
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing bills.
   */
  async list(params?: BukkuBillListParams): Promise<BukkuBillListApiResponse> {
    return this._request<BukkuBillListApiResponse>(
      "/purchases/bills",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific bill by its ID.
   * Endpoint: GET /purchases/bills/{id}
   * @param id - The ID of the bill to retrieve.
   * @returns A promise that resolves to the bill.
   */
  async get(id: string | number): Promise<BukkuBill> {
    const response = await this._request<BukkuBillResponse>(
      `/purchases/bills/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing bill.
   * Endpoint: PUT /purchases/bills/{id}
   * @param id - The ID of the bill to update.
   * @param data - The data to update the bill with.
   * @returns A promise that resolves to the updated bill.
   */
  async update(id: string | number, data: BukkuBillUpdateParams): Promise<BukkuBill> {
    const response = await this._request<BukkuBillResponse>(
      `/purchases/bills/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Updates the status of an existing bill.
   * Endpoint: PATCH /purchases/bills/{id}
   * @param id - The ID of the bill to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated bill.
   */
  async updateStatus(id: string | number, data: BukkuBillStatusUpdateParams): Promise<BukkuBill> {
    // Assuming the PATCH endpoint for status update follows a similar pattern
    // and the response returns the full bill object.
    // The API documentation for PATCH /purchases/bills/{id} would confirm this.
    const response = await this._request<BukkuBillResponse>(
      `/purchases/bills/${id}`, // Or a specific status endpoint like /purchases/bills/{id}/status
      "PATCH",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a bill.
   * Endpoint: DELETE /purchases/bills/{id}
   * @param id - The ID of the bill to delete.
   * @returns A promise that resolves when the bill is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/purchases/bills/${id}`, "DELETE");
  }
}
