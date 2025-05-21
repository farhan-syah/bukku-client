// bukku/src/files/index.ts

import type { BukkuAPIRequestFunction } from "../types";
import {
  BukkuFileResponse,
  BukkuFileListParams,
  BukkuFileListApiResponse,
  BukkuUploadedFile,
} from "./type";

export class FilesAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Uploads a new file.
   * Endpoint: POST /files
   * @param fileContent - The binary string content of the file to upload.
   * @param fileName - The desired name for the uploaded file (e.g., "image-abc.png").
   * @returns A promise that resolves to the details of the uploaded file.
   */
  async upload(fileContent: string, fileName: string): Promise<BukkuFileResponse> {
    // The _request method will need to be adapted to handle FormData for this specific case.
    // We pass the fileContent and fileName, and _request will construct the FormData.
    return this._request<BukkuFileResponse>(
      "/files",
      "POST",
      { file: fileContent, fileName: fileName }, // Special structure for _request to identify file upload
    );
  }

  /**
   * Retrieves a paginated list of files.
   * Endpoint: GET /files
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing files.
   */
  async list(params?: BukkuFileListParams): Promise<BukkuFileListApiResponse> {
    return this._request<BukkuFileListApiResponse>(
      "/files",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific file by its ID.
   * Endpoint: GET /files/{id}
   * @param id - The ID of the file to retrieve.
   * @returns A promise that resolves to the file details.
   */
  async get(id: number): Promise<BukkuUploadedFile> {
    const response = await this._request<BukkuFileResponse>(
      `/files/${id}`,
      "GET",
    );
    return response.file;
  }
}
