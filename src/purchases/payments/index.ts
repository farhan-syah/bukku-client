// src/purchases/payments/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuPayment,
  BukkuPaymentCreateParams,
  BukkuPaymentResponse,
  BukkuPaymentListParams,
  BukkuPaymentListApiResponse,
  BukkuPaymentUpdateParams,
  BukkuPaymentStatusUpdateParams,
} from "./type";

export class PaymentsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new payment.
   * Endpoint: POST /purchases/payments
   * @param data - The data for the new payment.
   * @returns A promise that resolves to the created payment.
   */
  async create(data: BukkuPaymentCreateParams): Promise<BukkuPayment> {
    const response = await this._request<BukkuPaymentResponse>(
      "/purchases/payments",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of payments.
   * Endpoint: GET /purchases/payments
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing payments.
   */
  async list(params?: BukkuPaymentListParams): Promise<BukkuPaymentListApiResponse> {
    return this._request<BukkuPaymentListApiResponse>(
      "/purchases/payments",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific payment by its ID.
   * Endpoint: GET /purchases/payments/{id}
   * @param id - The ID of the payment to retrieve.
   * @returns A promise that resolves to the payment.
   */
  async get(id: string | number): Promise<BukkuPayment> {
    const response = await this._request<BukkuPaymentResponse>(
      `/purchases/payments/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing payment.
   * Endpoint: PUT /purchases/payments/{id}
   * @param id - The ID of the payment to update.
   * @param data - The data to update the payment with.
   * @returns A promise that resolves to the updated payment.
   */
  async update(id: string | number, data: BukkuPaymentUpdateParams): Promise<BukkuPayment> {
    const response = await this._request<BukkuPaymentResponse>(
      `/purchases/payments/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Updates the status of an existing payment.
   * Endpoint: PATCH /purchases/payments/{id}
   * @param id - The ID of the payment to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated payment.
   */
  async updateStatus(id: string | number, data: BukkuPaymentStatusUpdateParams): Promise<BukkuPayment> {
    const response = await this._request<BukkuPaymentResponse>(
      `/purchases/payments/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a payment.
   * Endpoint: DELETE /purchases/payments/{id}
   * @param id - The ID of the payment to delete.
   * @returns A promise that resolves when the payment is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/purchases/payments/${id}`, "DELETE");
  }
}
