// src/contacts/groups/groups.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuContactGroup,
  BukkuContactGroupCreateParams,
  BukkuContactGroupResponse,
  BukkuContactGroupListApiResponse,
} from "./type";

export class ContactsGroupsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new contact group.
   * Endpoint: POST /contacts/groups
   * @param data - The data for the new contact group.
   * @returns A promise that resolves to the created contact group.
   */
  async create(
    data: BukkuContactGroupCreateParams,
  ): Promise<BukkuContactGroup> {
    const response = await this._request<BukkuContactGroupResponse>(
      "/contacts/groups",
      "POST",
      data,
    );
    return response.group;
  }

  /**
   * Retrieves a paginated list of contact groups.
   * Endpoint: GET /contacts/groups
   * @returns A promise that resolves to the API response for listing contact groups.
   */
  async list(): Promise<BukkuContactGroupListApiResponse> {
    return this._request<BukkuContactGroupListApiResponse>(
      "/contacts/groups",
      "GET",
    );
  }

  /**
   * Retrieves a specific contact group by its ID.
   * Endpoint: GET /contacts/groups/{id}
   * @param id - The ID of the contact group to retrieve.
   * @returns A promise that resolves to the contact group.
   */
  async get(id: number): Promise<BukkuContactGroup> {
    const response = await this._request<BukkuContactGroupResponse>(
      `/contacts/groups/${id}`,
      "GET",
    );
    return response.group;
  }

  /**
   * Updates an existing contact group.
   * Endpoint: PUT /contacts/groups/{id}
   * @param id - The ID of the contact group to update.
   * @param data - The data to update the contact group with.
   * @returns A promise that resolves to the updated contact group.
   */
  async update(
    id: number,
    data: BukkuContactGroupCreateParams,
  ): Promise<BukkuContactGroup> {
    const response = await this._request<BukkuContactGroupResponse>(
      `/contacts/groups/${id}`,
      "PUT",
      data,
    );
    return response.group;
  }

  /**
   * Deletes a contact group.
   * Endpoint: DELETE /contacts/groups/{id}
   * @param id - The ID of the contact group to delete.
   * @returns A promise that resolves when the contact group is deleted.
   */
  async delete(id: number): Promise<void> {
    await this._request<void>(`/contacts/groups/${id}`, "DELETE");
  }
}
