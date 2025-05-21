// src/purchases/goods-received-notes/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuGoodsReceivedNote,
  BukkuGoodsReceivedNoteCreateParams,
  BukkuGoodsReceivedNoteResponse,
  BukkuGoodsReceivedNoteListParams,
  BukkuGoodsReceivedNoteListApiResponse,
  BukkuGoodsReceivedNoteUpdateParams,
  BukkuGoodsReceivedNoteStatusUpdateParams,
} from "./type";

export class GoodsReceivedNotesAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new goods received note.
   * Endpoint: POST /purchases/goods_received_notes
   * @param data - The data for the new goods received note.
   * @returns A promise that resolves to the created goods received note.
   */
  async create(
    data: BukkuGoodsReceivedNoteCreateParams,
  ): Promise<BukkuGoodsReceivedNote> {
    const response = await this._request<BukkuGoodsReceivedNoteResponse>(
      "/purchases/goods_received_notes",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of goods received notes.
   * Endpoint: GET /purchases/goods_received_notes
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing goods received notes.
   */
  async list(
    params?: BukkuGoodsReceivedNoteListParams,
  ): Promise<BukkuGoodsReceivedNoteListApiResponse> {
    return this._request<BukkuGoodsReceivedNoteListApiResponse>(
      "/purchases/goods_received_notes",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific goods received note by its ID.
   * Endpoint: GET /purchases/goods_received_notes/{id}
   * @param id - The ID of the goods received note to retrieve.
   * @returns A promise that resolves to the goods received note.
   */
  async get(id: string | number): Promise<BukkuGoodsReceivedNote> {
    const response = await this._request<BukkuGoodsReceivedNoteResponse>(
      `/purchases/goods_received_notes/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing goods received note.
   * Endpoint: PUT /purchases/goods_received_notes/{id}
   * @param id - The ID of the goods received note to update.
   * @param data - The data to update the goods received note with.
   * @returns A promise that resolves to the updated goods received note.
   */
  async update(
    id: string | number,
    data: BukkuGoodsReceivedNoteUpdateParams,
  ): Promise<BukkuGoodsReceivedNote> {
    const response = await this._request<BukkuGoodsReceivedNoteResponse>(
      `/purchases/goods_received_notes/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Updates the status of an existing goods received note.
   * Endpoint: PATCH /purchases/goods_received_notes/{id}
   * @param id - The ID of the goods received note to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated goods received note.
   */
  async updateStatus(
    id: string | number,
    data: BukkuGoodsReceivedNoteStatusUpdateParams,
  ): Promise<BukkuGoodsReceivedNote> {
    const response = await this._request<BukkuGoodsReceivedNoteResponse>(
      `/purchases/goods_received_notes/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a goods received note.
   * Endpoint: DELETE /purchases/goods_received_notes/{id}
   * @param id - The ID of the goods received note to delete.
   * @returns A promise that resolves when the goods received note is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/purchases/goods_received_notes/${id}`, "DELETE");
  }
}
