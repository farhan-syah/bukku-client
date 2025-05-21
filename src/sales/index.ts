// src/sales/index.ts
import type { BukkuAPIRequestFunction } from "../types";
import { QuotationsAPI } from "./quotations";
import { SalesOrdersAPI } from "./sales-orders";
import { DeliveryOrdersAPI } from "./delivery-orders";
import { InvoicesAPI } from "./invoices"; // Assuming this will be created
import { CreditNotesAPI } from "./credit-notes";
import { PaymentsAPI } from "./payments";
import { RefundsAPI } from "./refunds";

export class SalesAPI {
  public readonly quotations: QuotationsAPI;
  public readonly salesOrders: SalesOrdersAPI;
  public readonly deliveryOrders: DeliveryOrdersAPI;
  public readonly invoices: InvoicesAPI;
  public readonly creditNotes: CreditNotesAPI;
  public readonly payments: PaymentsAPI;
  public readonly refunds: RefundsAPI;

  constructor(private _request: BukkuAPIRequestFunction) {
    this.quotations = new QuotationsAPI(this._request);
    this.salesOrders = new SalesOrdersAPI(this._request);
    this.deliveryOrders = new DeliveryOrdersAPI(this._request);
    this.invoices = new InvoicesAPI(this._request);
    this.creditNotes = new CreditNotesAPI(this._request);
    this.payments = new PaymentsAPI(this._request);
    this.refunds = new RefundsAPI(this._request);
  }

  // --- Placeholder for other general Sales related methods if any ---
  // For example, if there were endpoints directly under /sales that don't fit
  // into quotations, sales-orders, or delivery-orders.

  // --- Deprecated/Moved Methods ---
  // The methods for quotations and sales orders previously here
  // have been moved to their respective API modules (QuotationsAPI, SalesOrdersAPI).
  // Access them via sales.quotations.create() or sales.salesOrders.list(), etc.
}