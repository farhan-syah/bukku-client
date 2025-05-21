// src/purchases/credit-notes/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuCreditNote,
  BukkuCreditNoteCreateParams,
  BukkuCreditNoteResponse,
  BukkuCreditNoteListParams,
  BukkuCreditNoteListApiResponse,
  BukkuCreditNoteUpdateParams,
  BukkuCreditNoteStatusUpdateParams,
} from "./type";

export class CreditNotesAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new credit note.
   * Endpoint: POST /purchases/credit_notes
   * @param data - The data for the new credit note.
   * @returns A promise that resolves to the created credit note.
   */
  async create(data: BukkuCreditNoteCreateParams): Promise<BukkuCreditNote> {
    const response = await this._request<BukkuCreditNoteResponse>(
      "/purchases/credit_notes",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of credit notes.
   * Endpoint: GET /purchases/credit_notes
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing credit notes.
   */
  async list(params?: BukkuCreditNoteListParams): Promise<BukkuCreditNoteListApiResponse> {
    return this._request<BukkuCreditNoteListApiResponse>(
      "/purchases/credit_notes",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific credit note by its ID.
   * Endpoint: GET /purchases/credit_notes/{id}
   * @param id - The ID of the credit note to retrieve.
   * @returns A promise that resolves to the credit note.
   */
  async get(id: string | number): Promise<BukkuCreditNote> {
    const response = await this._request<BukkuCreditNoteResponse>(
      `/purchases/credit_notes/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing credit note.
   * Endpoint: PUT /purchases/credit_notes/{id}
   * @param id - The ID of the credit note to update.
   * @param data - The data to update the credit note with.
   * @returns A promise that resolves to the updated credit note.
   */
  async update(id: string | number, data: BukkuCreditNoteUpdateParams): Promise<BukkuCreditNote> {
    const response = await this._request<BukkuCreditNoteResponse>(
      `/purchases/credit_notes/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Updates the status of an existing credit note.
   * Endpoint: PATCH /purchases/credit_notes/{id}
   * @param id - The ID of the credit note to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated credit note.
   */
  async updateStatus(id: string | number, data: BukkuCreditNoteStatusUpdateParams): Promise<BukkuCreditNote> {
    const response = await this._request<BukkuCreditNoteResponse>(
      `/purchases/credit_notes/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a credit note.
   * Endpoint: DELETE /purchases/credit_notes/{id}
   * @param id - The ID of the credit note to delete.
   * @returns A promise that resolves when the credit note is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/purchases/credit_notes/${id}`, "DELETE");
  }
}
