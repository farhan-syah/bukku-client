// bukku/src/products/index.ts

import { BukkuAPIRequestFunction } from "../types";
import { ProductsProductsAPI } from "./products";
import { ProductsGroupsAPI } from "./groups";

export class ProductsAPI {
  public readonly products: ProductsProductsAPI;
  public readonly groups: ProductsGroupsAPI;

  constructor(private _request: BukkuAPIRequestFunction) {
    this.products = new ProductsProductsAPI(this._request);
    this.groups = new ProductsGroupsAPI(this._request);
  }
}
