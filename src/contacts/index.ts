import { BukkuAPIRequestFunction } from "../types";
import { ContactsContactsAPI } from "./contacts";
import { ContactsGroupsAPI } from "./groups";

export class ContactsAPI {
  public readonly contacts: ContactsContactsAPI;
  public readonly groups: ContactsGroupsAPI;

  constructor(private _request: BukkuAPIRequestFunction) {
    this.contacts = new ContactsContactsAPI(this._request);
    this.groups = new ContactsGroupsAPI(this._request);
    // Future contacts-related modules will be initialized here
  }
}
