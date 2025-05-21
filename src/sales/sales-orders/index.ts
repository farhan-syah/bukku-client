// src/sales/sales-orders/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuSalesOrderCreateParams,
  BukkuSalesOrder,
  BukkuSalesOrderResponse,
  BukkuSalesOrderListParams,
  BukkuSalesOrderListApiResponse,
  BukkuSalesOrderUpdateParams,
  BukkuSalesOrderStatusUpdateParams,
} from "./type";

export class SalesOrdersAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new sales order.
   * Endpoint: POST /sales/orders
   * @param data - The data for the new sales order.
   * @returns A promise that resolves to the created sales order.
   */
  async create(
    data: BukkuSalesOrderCreateParams,
  ): Promise<BukkuSalesOrder> {
    const response = await this._request<BukkuSalesOrderResponse>(
      "/sales/orders",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of sales orders.
   * Endpoint: GET /sales/orders
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing sales orders.
   */
  async list(
    params?: BukkuSalesOrderListParams,
  ): Promise<BukkuSalesOrderListApiResponse> {
    return this._request<BukkuSalesOrderListApiResponse>(
      "/sales/orders",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific sales order by its ID.
   * Endpoint: GET /sales/orders/{id}
   * @param id - The ID of the sales order to retrieve.
   * @returns A promise that resolves to the sales order.
   */
  async get(id: number | string): Promise<BukkuSalesOrder> {
    const response = await this._request<BukkuSalesOrderResponse>(
      `/sales/orders/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing sales order.
   * Endpoint: PUT /sales/orders/{id}
   * @param id - The ID of the sales order to update.
   * @param data - The data to update the sales order with.
   * @returns A promise that resolves to the updated sales order.
   */
  async update(
    id: number | string,
    data: BukkuSalesOrderUpdateParams,
  ): Promise<BukkuSalesOrder> {
    const response = await this._request<BukkuSalesOrderResponse>(
      `/sales/orders/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Updates the status of an existing sales order.
   * Endpoint: PATCH /sales/orders/{id}
   * @param id - The ID of the sales order to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated sales order.
   */
  async updateStatus(
    id: number | string,
    data: BukkuSalesOrderStatusUpdateParams,
  ): Promise<BukkuSalesOrder> {
    const response = await this._request<BukkuSalesOrderResponse>(
      `/sales/orders/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a sales order.
   * Endpoint: DELETE /sales/orders/{id}
   * Note: Only transactions with draft and void statuses can be deleted.
   * @param id - The ID of the sales order to delete.
   * @returns A promise that resolves when the sales order is deleted.
   */
  async delete(id: number | string): Promise<void> {
    await this._request<void>(`/sales/orders/${id}`, "DELETE");
  }
}