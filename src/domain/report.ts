export interface Report {
  grossValue: number;
  salesTaxAmount: number;
  netValue: number;
  totalCost: number;
  grossProfit: number;
  operationalExpenses: number;
  operationalProfit: number;
}

export interface PresumedReport {
  pis: number;
  cofins: number;
  irpj: number;
  csll: number;
  icms: number;
  total: number;
}

export interface RealReportTax {
  value: number;
  collect: number;
}

export interface RealReport {
  pis: RealReportTax;
  cofins: RealReportTax;
  irpj: number;
  csll: number;
  icms: RealReportTax;
  total: RealReportTax;
}

export interface TaxReportRecord {
  real: string;
  presumed: string;
}

export interface TaxReport {
  bestOption: "presumed" | "real";
  pis: TaxReportRecord;
  cofins: TaxReportRecord;
  irpj: TaxReportRecord;
  csll: TaxReportRecord;
  icms: TaxReportRecord;
  total: TaxReportRecord;
}
