// src/accounting/index.ts

import type { BukkuAPIRequestFunction } from "../types";
import { AccountsAPI } from "./accounts";
import { JournalEntriesAPI } from "./journal-entries"; // Added import

export class AccountingAPI {
  public readonly accounts: AccountsAPI;
  public readonly journalEntries: JournalEntriesAPI; // Added public property

  constructor(private _request: BukkuAPIRequestFunction) {
    this.accounts = new AccountsAPI(this._request);
    this.journalEntries = new JournalEntriesAPI(this._request); // Added initialization
    // Future accounting-related modules will be initialized here
  }

  // Placeholder for any general Accounting related methods if any
}
