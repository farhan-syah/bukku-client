// src/control-panel/tag-groups/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuTagGroup,
  BukkuTagGroupCreateParams,
  BukkuTagGroupResponse, // For create, returns BukkuTagGroup[]
  BukkuTagGroupItemResponse, // For get/update, returns BukkuTagGroup
  BukkuTagGroupListParams,
  BukkuTagGroupListApiResponse,
  BukkuTagGroupUpdateParams,
} from "./type";

export class TagGroupsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new tag group.
   * Endpoint: POST /tags/groups
   * @param data - The data for the new tag group.
   * @returns A promise that resolves to the created tag group.
   */
  async create(data: BukkuTagGroupCreateParams): Promise<BukkuTagGroup> {
    const response = await this._request<BukkuTagGroupResponse>(
      "/tags/groups",
      "POST",
      data,
    );
    if (response.tag_group && response.tag_group.length > 0) {
      return response.tag_group[0];
    }
    throw new Error("Invalid API response for create tag group");
  }

  /**
   * Retrieves a paginated list of tag groups.
   * Endpoint: GET /tags/groups
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing tag groups.
   */
  async list(
    params?: BukkuTagGroupListParams,
  ): Promise<BukkuTagGroupListApiResponse> {
    return this._request<BukkuTagGroupListApiResponse>(
      "/tags/groups",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific tag group by its ID.
   * Endpoint: GET /tags/groups/{id}
   * @param id - The ID of the tag group to retrieve.
   * @returns A promise that resolves to the tag group.
   */
  async get(id: number): Promise<BukkuTagGroup> {
    const response = await this._request<BukkuTagGroupItemResponse>(
      `/tags/groups/${id}`,
      "GET",
    );
    return response.tag_group;
  }

  /**
   * Updates an existing tag group.
   * Endpoint: PUT /tags/groups/{id}
   * @param id - The ID of the tag group to update.
   * @param data - The data to update the tag group with.
   * @returns A promise that resolves to the updated tag group.
   */
  async update(id: number, data: BukkuTagGroupUpdateParams): Promise<BukkuTagGroup> {
    const response = await this._request<BukkuTagGroupItemResponse>(
      `/tags/groups/${id}`,
      "PUT",
      data,
    );
    return response.tag_group;
  }

  /**
   * Deletes a tag group.
   * Endpoint: DELETE /tags/groups/{id}
   * @param id - The ID of the tag group to delete.
   * @returns A promise that resolves when the tag group is deleted.
   */
  async delete(id: number): Promise<void> {
    await this._request<void>(`/tags/groups/${id}`, "DELETE");
  }
}
