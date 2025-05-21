// src/purchases/refunds/index.ts

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
   * Creates a new purchase refund.
   * Endpoint: POST /purchases/refunds
   * @param data - The data for the new refund.
   * @returns A promise that resolves to the created refund.
   */
  async create(data: BukkuRefundCreateParams): Promise<BukkuRefund> {
    const response = await this._request<BukkuRefundResponse>(
      "/purchases/refunds",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of purchase refunds.
   * Endpoint: GET /purchases/refunds
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing refunds.
   */
  async list(params?: BukkuRefundListParams): Promise<BukkuRefundListApiResponse> {
    return this._request<BukkuRefundListApiResponse>(
      "/purchases/refunds",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific purchase refund by its ID.
   * Endpoint: GET /purchases/refunds/{id}
   * @param id - The ID of the refund to retrieve.
   * @returns A promise that resolves to the refund.
   */
  async get(id: string | number): Promise<BukkuRefund> {
    const response = await this._request<BukkuRefundResponse>(
      `/purchases/refunds/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing purchase refund.
   * Endpoint: PUT /purchases/refunds/{id}
   * @param id - The ID of the refund to update.
   * @param data - The data to update the refund with.
   * @returns A promise that resolves to the updated refund.
   */
  async update(id: string | number, data: BukkuRefundUpdateParams): Promise<BukkuRefund> {
    const response = await this._request<BukkuRefundResponse>(
      `/purchases/refunds/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Updates the status of an existing purchase refund.
   * Endpoint: PATCH /purchases/refunds/{id}
   * @param id - The ID of the refund to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated refund.
   */
  async updateStatus(id: string | number, data: BukkuRefundStatusUpdateParams): Promise<BukkuRefund> {
    const response = await this._request<BukkuRefundResponse>(
      `/purchases/refunds/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a purchase refund.
   * Endpoint: DELETE /purchases/refunds/{id}
   * @param id - The ID of the refund to delete.
   * @returns A promise that resolves when the refund is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/purchases/refunds/${id}`, "DELETE");
  }
}
