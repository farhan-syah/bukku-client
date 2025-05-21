// src/control-panel/tags/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuTag,
  BukkuTagCreateParams,
  BukkuTagResponse,
  BukkuTagListParams,
  BukkuTagListApiResponse,
  BukkuTagUpdateParams,
} from "./type";

export class TagsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new tag.
   * Endpoint: POST /tags
   * @param data - The data for the new tag.
   * @returns A promise that resolves to the created tag.
   */
  async create(data: BukkuTagCreateParams): Promise<BukkuTag> {
    const response = await this._request<BukkuTagResponse>(
      "/tags",
      "POST",
      data,
    );
    return response.tag;
  }

  /**
   * Retrieves a paginated list of tags.
   * Endpoint: GET /tags
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing tags.
   */
  async list(
    params?: BukkuTagListParams,
  ): Promise<BukkuTagListApiResponse> {
    return this._request<BukkuTagListApiResponse>(
      "/tags",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific tag by its ID.
   * Endpoint: GET /tags/{id}
   * @param id - The ID of the tag to retrieve.
   * @returns A promise that resolves to the tag.
   */
  async get(id: number): Promise<BukkuTag> {
    const response = await this._request<BukkuTagResponse>(
      `/tags/${id}`,
      "GET",
    );
    return response.tag;
  }

  /**
   * Updates an existing tag.
   * Endpoint: PUT /tags/{id}
   * @param id - The ID of the tag to update.
   * @param data - The data to update the tag with.
   * @returns A promise that resolves to the updated tag.
   */
  async update(id: number, data: BukkuTagUpdateParams): Promise<BukkuTag> {
    const response = await this._request<BukkuTagResponse>(
      `/tags/${id}`,
      "PUT",
      data,
    );
    return response.tag;
  }

  /**
   * Deletes a tag.
   * Endpoint: DELETE /tags/{id}
   * @param id - The ID of the tag to delete.
   * @returns A promise that resolves when the tag is deleted.
   */
  async delete(id: number): Promise<void> {
    await this._request<void>(`/tags/${id}`, "DELETE");
  }
}
