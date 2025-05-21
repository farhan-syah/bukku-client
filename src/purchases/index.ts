// src/purchases/index.ts
import type { BukkuAPIRequestFunction } from "../types";
import { PurchaseOrdersAPI } from "./purchase-orders";
import { GoodsReceivedNotesAPI } from "./goods-received-notes";
import { BillsAPI } from "./bills";
import { CreditNotesAPI } from "./credit-notes";
import { PaymentsAPI } from "./payments";
import { RefundsAPI } from "./refunds";

export class PurchasesAPI {
  public readonly purchaseOrders: PurchaseOrdersAPI;
  public readonly goodsReceivedNotes: GoodsReceivedNotesAPI;
  public readonly bills: BillsAPI;
  public readonly creditNotes: CreditNotesAPI;
  public readonly payments: PaymentsAPI;
  public readonly refunds: RefundsAPI;

  constructor(private _request: BukkuAPIRequestFunction) {
    this.purchaseOrders = new PurchaseOrdersAPI(this._request);
    this.goodsReceivedNotes = new GoodsReceivedNotesAPI(this._request);
    this.bills = new BillsAPI(this._request);
    this.creditNotes = new CreditNotesAPI(this._request);
    this.payments = new PaymentsAPI(this._request);
    this.refunds = new RefundsAPI(this._request);
    // Future purchase-related modules (e.g., Purchase Payments) will be initialized here
  }

  // Placeholder for any general Purchase related methods if any
}
