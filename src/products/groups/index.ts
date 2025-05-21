// bukku/src/products/groups/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuProductGroup,
  BukkuProductGroupCreateParams,
  BukkuProductGroupResponse,
  BukkuProductGroupListApiResponse,
  BukkuProductGroupUpdateParams,
} from "./type";

export class ProductsGroupsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new product group.
   * Endpoint: POST /products/groups
   * @param data - The data for the new product group.
   * @returns A promise that resolves to the created product group.
   */
  async create(data: BukkuProductGroupCreateParams): Promise<BukkuProductGroup> {
    const response = await this._request<BukkuProductGroupResponse>(
      "/products/groups",
      "POST",
      data,
    );
    return response.group;
  }

  /**
   * Retrieves a paginated list of product groups.
   * Endpoint: GET /products/groups
   * @returns A promise that resolves to the API response for listing product groups.
   */
  async list(): Promise<BukkuProductGroupListApiResponse> {
    return this._request<BukkuProductGroupListApiResponse>(
      "/products/groups",
      "GET",
    );
  }

  /**
   * Retrieves a specific product group by its ID.
   * Endpoint: GET /products/groups/{id}
   * @param id - The ID of the product group to retrieve.
   * @returns A promise that resolves to the product group.
   */
  async get(id: string | number): Promise<BukkuProductGroup> {
    const response = await this._request<BukkuProductGroupResponse>(
      `/products/groups/${id}`,
      "GET",
    );
    return response.group;
  }

  /**
   * Updates an existing product group.
   * Endpoint: PUT /products/groups/{id}
   * @param id - The ID of the product group to update.
   * @param data - The data to update the product group with.
   * @returns A promise that resolves to the updated product group.
   */
  async update(id: string | number, data: BukkuProductGroupUpdateParams): Promise<BukkuProductGroup> {
    const response = await this._request<BukkuProductGroupResponse>(
      `/products/groups/${id}`,
      "PUT",
      data,
    );
    return response.group;
  }

  /**
   * Deletes a product group.
   * Endpoint: DELETE /products/groups/{id}
   * @param id - The ID of the product group to delete.
   * @returns A promise that resolves when the product group is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/products/groups/${id}`, "DELETE");
  }
}
