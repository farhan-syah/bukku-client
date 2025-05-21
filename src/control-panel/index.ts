// src/control-panel/index.ts

import type { BukkuAPIRequestFunction } from "../types";
import { LocationsAPI } from "./locations";
import { TagsAPI } from "./tags";
import { TagGroupsAPI } from "./tag-groups";

export class ControlPanelAPI {
  public readonly locations: LocationsAPI;
  public readonly tags: TagsAPI;
  public readonly tagGroups: TagGroupsAPI;

  constructor(private _request: BukkuAPIRequestFunction) {
    this.locations = new LocationsAPI(this._request);
    this.tags = new TagsAPI(this._request);
    this.tagGroups = new TagGroupsAPI(this._request);
  }

  // Placeholder for any general Control Panel related methods if any
}

// Export relevant types from submodules if needed
export * from "./locations/type";
export * from "./tag-groups/type";
export * from "./tags/type";
