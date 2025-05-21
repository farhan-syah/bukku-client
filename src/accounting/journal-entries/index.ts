// src/accounting/journal-entries/index.ts

import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuJournalEntry,
  BukkuJournalEntryCreateParams,
  BukkuJournalEntryUpdateParams,
  BukkuJournalEntryStatusUpdateParams,
  BukkuJournalEntryResponse,
  BukkuJournalEntryListParams,
  BukkuJournalEntryListApiResponse,
} from "./type";

export class JournalEntriesAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new journal entry.
   * Endpoint: POST /journal_entries
   * @param data - The data for the new journal entry.
   * @returns A promise that resolves to the created journal entry.
   */
  async create(data: BukkuJournalEntryCreateParams): Promise<BukkuJournalEntry> {
    const response = await this._request<BukkuJournalEntryResponse>(
      "/journal_entries",
      "POST",
      data,
    );
    return response.transaction;
  }

  /**
   * Retrieves a paginated list of journal entries.
   * Endpoint: GET /journal_entries
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing journal entries.
   */
  async list(
    params?: BukkuJournalEntryListParams,
  ): Promise<BukkuJournalEntryListApiResponse> {
    return this._request<BukkuJournalEntryListApiResponse>(
      "/journal_entries",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific journal entry by its ID.
   * Endpoint: GET /journal_entries/{transactionId}
   * @param id - The ID of the journal entry to retrieve.
   * @returns A promise that resolves to the journal entry.
   */
  async get(id: string | number): Promise<BukkuJournalEntry> {
    const response = await this._request<BukkuJournalEntryResponse>(
      `/journal_entries/${id}`,
      "GET",
    );
    return response.transaction;
  }

  /**
   * Updates an existing journal entry.
   * Endpoint: PUT /journal_entries/{transactionId}
   * @param id - The ID of the journal entry to update.
   * @param data - The data to update the journal entry with.
   * @returns A promise that resolves to the updated journal entry.
   */
  async update(
    id: string | number,
    data: BukkuJournalEntryUpdateParams,
  ): Promise<BukkuJournalEntry> {
    const response = await this._request<BukkuJournalEntryResponse>(
      `/journal_entries/${id}`,
      "PUT",
      data,
    );
    return response.transaction;
  }

  /**
   * Updates the status of an existing journal entry.
   * Endpoint: PATCH /journal_entries/{transactionId}
   * @param id - The ID of the journal entry to update.
   * @param data - The data containing the new status.
   * @returns A promise that resolves to the updated journal entry.
   */
  async updateStatus(
    id: string | number,
    data: BukkuJournalEntryStatusUpdateParams,
  ): Promise<BukkuJournalEntry> {
    const response = await this._request<BukkuJournalEntryResponse>(
      `/journal_entries/${id}`,
      "PATCH",
      data,
    );
    return response.transaction;
  }

  /**
   * Deletes a journal entry.
   * Endpoint: DELETE /journal_entries/{transactionId}
   * Note: Only transactions with draft and void statuses can be deleted.
   * @param id - The ID of the journal entry to delete.
   * @returns A promise that resolves when the journal entry is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/journal_entries/${id}`, "DELETE");
  }
}
