// src/sales/refunds/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuRefund,
  BukkuRefundCreateParams,
  BukkuRefundResponse,
  BukkuRefundListParams,
  BukkuRefundListApiResponse,
  BukkuRefundUpdateParams,
  BukkuRefundStatusUpdateParams,
} from "./type";

export class RefundsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new refund.
   * Endpoint: POST /sales/refunds
   * @param data - The data for the new refund.
   * @returns A promise that resolves to the created refund.
   */
  async create(data: BukkuRefundCreateParams): Promise<BukkuRefund> {
    const response = await this._request<BukkuRefundResponse>(
      "/sales/refunds",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of refunds.
   * Endpoint: GET /sales/refunds
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing refunds.
   */
  async list(
    params?: BukkuRefundListParams,
  ): Promise<BukkuRefundListApiResponse> {
    return this._request<BukkuRefundListApiResponse>(
      "/sales/refunds",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific refund by its ID.
   * Endpoint: GET /sales/refunds/{id}
   * @param id - The ID of the refund to retrieve.
   * @returns A promise that resolves to the refund.
   */
  async get(id: string | number): Promise<BukkuRefund> {
    const response = await this._request<BukkuRefundResponse>(
      `/sales/refunds/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing refund.
   * Endpoint: PUT /sales/refunds/{id}
   * @param id - The ID of the refund to update.
   * @param data - The data to update the refund with.
   * @returns A promise that resolves to the updated refund.
   */
  async update(
    id: string | number,
    data: BukkuRefundUpdateParams,
  ): Promise<BukkuRefund> {
    const response = await this._request<BukkuRefundResponse>(
      `/sales/refunds/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a refund.
   * Endpoint: DELETE /sales/refunds/{id}
   * Note: Only transactions with draft and void statuses can be deleted.
   * @param id - The ID of the refund to delete.
   * @returns A promise that resolves when the refund is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/sales/refunds/${id}`, "DELETE");
  }

  /**
   * Updates the status of an existing refund.
   * Endpoint: PATCH /sales/refunds/{id}
   * @param id - The ID of the refund to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated refund.
   */
  async updateStatus(
    id: string | number,
    data: BukkuRefundStatusUpdateParams,
  ): Promise<BukkuRefund> {
    const response = await this._request<BukkuRefundResponse>(
      `/sales/refunds/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }
}