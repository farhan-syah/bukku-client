// src/sales/delivery-orders/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuDeliveryOrder,
  BukkuDeliveryOrderCreateParams,
  BukkuDeliveryOrderListApiResponse,
  BukkuDeliveryOrderListParams,
  BukkuDeliveryOrderResponse,
  BukkuDeliveryOrderStatusUpdateParams,
  BukkuDeliveryOrderUpdateParams,
} from "./type";

export class DeliveryOrdersAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  // --- Delivery Orders ---

  /**
   * Creates a new delivery order.
   * Endpoint: POST /sales/delivery_orders
   * @param data - The data for the new delivery order.
   * @returns A promise that resolves to the created delivery order.
   */
  async create(
    data: BukkuDeliveryOrderCreateParams,
  ): Promise<BukkuDeliveryOrder> {
    const response = await this._request<BukkuDeliveryOrderResponse>(
      "/sales/delivery_orders",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of delivery orders.
   * Endpoint: GET /sales/delivery_orders
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing delivery orders.
   */
  async list(
    params?: BukkuDeliveryOrderListParams,
  ): Promise<BukkuDeliveryOrderListApiResponse> {
    return this._request<BukkuDeliveryOrderListApiResponse>(
      "/sales/delivery_orders",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific delivery order by its ID.
   * Endpoint: GET /sales/delivery_orders/{id}
   * @param id - The ID of the delivery order to retrieve.
   * @returns A promise that resolves to the delivery order.
   */
  async get(id: string | number): Promise<BukkuDeliveryOrder> {
    const response = await this._request<BukkuDeliveryOrderResponse>(
      `/sales/delivery_orders/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing delivery order.
   * Endpoint: PUT /sales/delivery_orders/{id}
   * @param id - The ID of the delivery order to update.
   * @param data - The data to update the delivery order with.
   * @returns A promise that resolves to the updated delivery order.
   */
  async update(
    id: string | number,
    data: BukkuDeliveryOrderUpdateParams,
  ): Promise<BukkuDeliveryOrder> {
    const response = await this._request<BukkuDeliveryOrderResponse>(
      `/sales/delivery_orders/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a delivery order.
   * Endpoint: DELETE /sales/delivery_orders/{id}
   * @param id - The ID of the delivery order to delete.
   * @returns A promise that resolves when the delivery order is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/sales/delivery_orders/${id}`, "DELETE");
  }

  /**
   * Updates the status of an existing delivery order.
   * Endpoint: PATCH /sales/delivery_orders/{id}
   * @param id - The ID of the delivery order to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated delivery order.
   */
  async updateStatus(
    id: string | number,
    data: BukkuDeliveryOrderStatusUpdateParams,
  ): Promise<BukkuDeliveryOrder> {
    const response = await this._request<BukkuDeliveryOrderResponse>(
      `/sales/delivery_orders/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }
}