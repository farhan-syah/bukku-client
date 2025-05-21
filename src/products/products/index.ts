import type { BukkuAPIRequestFunction } from "../../types";
import {
  BukkuProduct,
  BukkuProductCreateParams,
  BukkuProductResponse,
  BukkuProductListParams,
  BukkuProductListApiResponse,
  BukkuProductUpdateParams,
  BukkuProductArchiveParams,
} from "./type";

export class ProductsProductsAPI {
  constructor(private _request: BukkuAPIRequestFunction) {}

  /**
   * Creates a new product.
   * Endpoint: POST /products
   * @param data - The data for the new product.
   * @returns A promise that resolves to the created product.
   */
  async create(data: BukkuProductCreateParams): Promise<BukkuProduct> {
    const response = await this._request<BukkuProductResponse>(
      "/products",
      "POST",
      data,
    );
    return response.product;
  }

  /**
   * Retrieves a paginated list of products.
   * Endpoint: GET /products
   * @param params - Optional parameters for filtering and pagination.
   * @returns A promise that resolves to the API response for listing products.
   */
  async list(params?: BukkuProductListParams): Promise<BukkuProductListApiResponse> {
    return this._request<BukkuProductListApiResponse>(
      "/products",
      "GET",
      undefined,
      params,
    );
  }

  /**
   * Retrieves a specific product by its ID.
   * Endpoint: GET /products/{id}
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to the product.
   */
  async get(id: string | number): Promise<BukkuProduct> {
    const response = await this._request<BukkuProductResponse>(
      `/products/${id}`,
      "GET",
    );
    return response.product;
  }

  /**
   * Updates an existing product.
   * Endpoint: PUT /products/{id}
   * @param id - The ID of the product to update.
   * @param data - The data to update the product with.
   * @returns A promise that resolves to the updated product.
   */
  async update(id: string | number, data: BukkuProductUpdateParams): Promise<BukkuProduct> {
    const response = await this._request<BukkuProductResponse>(
      `/products/${id}`,
      "PUT",
      data,
    );
    return response.product;
  }

  /**
   * Archives or unarchives a product.
   * Endpoint: PATCH /products/{id}
   * @param id - The ID of the product to archive/unarchive.
   * @param data - The archive status.
   * @returns A promise that resolves to the updated product.
   */
  async updateArchiveStatus(id: string | number, data: BukkuProductArchiveParams): Promise<BukkuProduct> {
    const response = await this._request<BukkuProductResponse>(
      `/products/${id}`,
      "PATCH",
      data,
    );
    return response.product;
  }

  /**
   * Deletes a product. Only products that are not used can be deleted.
   * Endpoint: DELETE /products/{id}
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves when the product is deleted.
   */
  async delete(id: string | number): Promise<void> {
    await this._request<void>(`/products/${id}`, "DELETE");
  }
}
