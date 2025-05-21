// src/contacts/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuContact,
  BukkuContactCreateParams,
  BukkuContactResponse,
  BukkuContactListParams,
  BukkuContactListApiResponse,
  BukkuContactUpdateParams,
} from "./type";

export class ContactsContactsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new contact.
   * Endpoint: POST /contacts
   * @param data - The data for the new contact.
   * @returns A promise that resolves to the created contact.
   */
  async create(data: BukkuContactCreateParams): Promise<BukkuContact> {
    const response = await this._request<BukkuContactResponse>(
      "/contacts", // API doc path
      "POST",
      data,
    );
    return response.contact;
  }

  /**
   * Retrieves a paginated list of contacts.
   * Endpoint: GET /contacts (assumed, common pattern)
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing contacts.
   */
  async list(
    params?: BukkuContactListParams,
  ): Promise<BukkuContactListApiResponse> {
    return this._request<BukkuContactListApiResponse>(
      "/contacts", // API doc path
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific contact by its ID.
   * Endpoint: GET /contacts/{id} (assumed, common pattern)
   * @param id - The ID of the contact to retrieve.
   * @returns A promise that resolves to the contact.
   */
  async get(id: string | number): Promise<BukkuContact> {
    const response = await this._request<BukkuContactResponse>(
      `/contacts/${id}`,
      "GET",
    );
    return response.contact;
  }

  /**
   * Updates an existing contact.
   * Endpoint: PUT /contacts/{id} (assumed, common pattern)
   * @param id - The ID of the contact to update.
   * @param data - The data to update the contact with.
   * @returns A promise that resolves to the updated contact.
   */
  async update(
    id: string | number,
    data: BukkuContactUpdateParams,
  ): Promise<BukkuContact> {
    const response = await this._request<BukkuContactResponse>(
      `/contacts/${id}`,
      "PUT",
      data,
    );
    return response.contact;
  }

  /**
   * Deletes a contact.
   * Endpoint: DELETE /contacts/{id} (assumed, common pattern)
   * @param id - The ID of the contact to delete.
   * @returns A promise that resolves when the contact is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/contacts/${id}`, "DELETE");
  }

  /**
   * Archives a contact.
   * Endpoint: PATCH /contacts/{id}/archive (common pattern for archival)
   * Alternatively, it might be part of the PUT update operation with an is_archived flag.
   * For now, assuming a dedicated endpoint or handled by general update.
   * This method could be implemented if a specific archive endpoint exists.
   */
  async archive(id: string | number): Promise<BukkuContact> {
    const response = await this._request<BukkuContactResponse>(
      `/contacts/${id}`,
      "PATCH",
      { is_archived: true },
    );
    return response.contact;
  }

  /**
   * Unarchives a contact.
   * Endpoint: PATCH /contacts/{id}/unarchive (common pattern for unarchival)
   * This method could be implemented if a specific unarchive endpoint exists.
   */
  async unarchive(id: string | number): Promise<BukkuContact> {
    const response = await this._request<BukkuContactResponse>(
      `/contacts/${id}`,
      "PATCH",
      { is_archived: false },
    );
    return response.contact;
  }
}
