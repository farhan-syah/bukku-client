import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuLocation,
  BukkuLocationCreateParams,
  BukkuLocationResponse,
  BukkuLocationListParams,
  BukkuLocationListItem,
  BukkuLocationListApiResponse,
  BukkuLocationUpdateParams,
  BukkuLocationArchiveParams, // Ensured import
} from "./type";

export class LocationsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new location.
   * Endpoint: POST /locations
   * @param data - The data for the new location.
   * @returns A promise that resolves to the created location.
   */
  async create(data: BukkuLocationCreateParams): Promise<BukkuLocation> {
    const response = await this._request<BukkuLocationResponse>(
      "/locations",
      "POST",
      data,
    );
    return response.location;
  }

  /**
   * Retrieves a paginated list of locations.
   * Endpoint: GET /locations
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing locations.
   */
  async list(
    params?: BukkuLocationListParams,
  ): Promise<BukkuLocationListApiResponse> {
    return this._request<BukkuLocationListApiResponse>(
      "/locations",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific location by its ID.
   * Endpoint: GET /locations/{id}
   * @param id - The ID of the location to retrieve.
   * @returns A promise that resolves to the location.
   */
  async get(id: number): Promise<BukkuLocation> {
    const response = await this._request<BukkuLocationResponse>(
      `/locations/${id}`,
      "GET",
    );
    return response.location;
  }

  /**
   * Updates an existing location.
   * Endpoint: PUT /locations/{id}
   * @param id - The ID of the location to update.
   * @param data - The data to update the location with.
   * @returns A promise that resolves to the updated location.
   */
  async update(id: number, data: BukkuLocationUpdateParams): Promise<BukkuLocation> {
    const response = await this._request<BukkuLocationResponse>(
      `/locations/${id}`,
      "PUT",
      data,
    );
    return response.location;
  }

  /**
   * Archives or unarchives a location.
   * Endpoint: PATCH /locations/{id}
   * @param id - The ID of the location to archive/unarchive.
   * @param data - The archive status.
   * @returns A promise that resolves to the updated location.
   */
  async updateArchiveStatus(id: number, data: BukkuLocationArchiveParams): Promise<BukkuLocation> {
    const response = await this._request<BukkuLocationResponse>(
      `/locations/${id}`,
      "PATCH",
      data,
    );
    return response.location;
  }

  /**
   * Deletes a location.
   * Endpoint: DELETE /locations/{id}
   * @param id - The ID of the location to delete.
   * @returns A promise that resolves when the location is deleted.
   */
  async delete(id: number): Promise<void> {
    await this._request<void>(`/locations/${id}`, "DELETE");
  }
}
