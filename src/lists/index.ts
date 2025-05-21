// bukku/src/lists/index.ts

import type { BukkuAPIRequestFunction } from "../types";
import type { GetListsRequestBody, GetListsResponse } from "./type";

/**
 * Provides access to the Lists API endpoints.
 * Currently, this handles the generic POST /v2/lists endpoint.
 */
export class ListsAPI {
  private request: BukkuAPIRequestFunction;

  /**
   * Initializes the ListsAPI with the BukkuAPIRequestFunction.
   * @param request - The function to make authenticated API requests.
   */
  constructor(request: BukkuAPIRequestFunction) {
    this.request = request;
  }

  /**
   * Fetches multiple types of lists from the Bukku API.
   * Corresponds to the POST /v2/lists endpoint.
   *
   * @param body - The request body specifying which lists to fetch and any associated parameters.
   * @returns A Promise resolving to the API response containing the requested lists.
   * @throws BukkuAPIError if the API returns an error.
   */
  async get(body: GetListsRequestBody): Promise<GetListsResponse> {
    if (!body || !body.lists || body.lists.length === 0) {
      throw new Error("The 'lists' array in the request body is required and cannot be empty.");
    }
    return this.request<GetListsResponse>("/v2/lists", "POST", body);
  }
}
