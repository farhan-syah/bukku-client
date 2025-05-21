// src/purchases/purchase-orders/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuPurchaseOrder,
  BukkuPurchaseOrderCreateParams,
  BukkuPurchaseOrderResponse,
  BukkuPurchaseOrderListParams,
  BukkuPurchaseOrderListApiResponse,
  BukkuPurchaseOrderUpdateParams,
  BukkuPurchaseOrderStatusUpdateParams,
} from "./type";

export class PurchaseOrdersAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new purchase order.
   * Endpoint: POST /purchases/orders
   * @param data - The data for the new purchase order.
   * @returns A promise that resolves to the created purchase order.
   */
  async create(
    data: BukkuPurchaseOrderCreateParams,
  ): Promise<BukkuPurchaseOrder> {
    const response = await this._request<BukkuPurchaseOrderResponse>(
      "/purchases/orders",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of purchase orders.
   * Endpoint: GET /purchases/orders
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing purchase orders.
   */
  async list(
    params?: BukkuPurchaseOrderListParams,
  ): Promise<BukkuPurchaseOrderListApiResponse> {
    return this._request<BukkuPurchaseOrderListApiResponse>(
      "/purchases/orders",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific purchase order by its ID.
   * Endpoint: GET /purchases/orders/{id}
   * @param id - The ID of the purchase order to retrieve.
   * @returns A promise that resolves to the purchase order.
   */
  async get(id: string | number): Promise<BukkuPurchaseOrder> {
    const response = await this._request<BukkuPurchaseOrderResponse>(
      `/purchases/orders/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing purchase order.
   * Endpoint: PUT /purchases/orders/{id}
   * @param id - The ID of the purchase order to update.
   * @param data - The data to update the purchase order with.
   * @returns A promise that resolves to the updated purchase order.
   */
  async update(
    id: string | number,
    data: BukkuPurchaseOrderUpdateParams,
  ): Promise<BukkuPurchaseOrder> {
    const response = await this._request<BukkuPurchaseOrderResponse>(
      `/purchases/orders/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a purchase order.
   * Endpoint: DELETE /purchases/orders/{id}
   * @param id - The ID of the purchase order to delete.
   * @returns A promise that resolves when the purchase order is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/purchases/orders/${id}`, "DELETE");
  }

  /**
   * Updates the status of an existing purchase order.
   * Endpoint: PATCH /purchases/orders/{id}
   * @param id - The ID of the purchase order to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated purchase order.
   */
  async updateStatus(
    id: string | number,
    data: BukkuPurchaseOrderStatusUpdateParams,
  ): Promise<BukkuPurchaseOrder> {
    const response = await this._request<BukkuPurchaseOrderResponse>(
      `/purchases/orders/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }
}
