import { percent, mapObject } from "../shared";
import { Billing } from "./presumed";
import { RealReportTax } from "./report";

export type Credit = number;
export type Debit = Billing;

export const pliers = {
  pis: percent(1.65),
  cofins: percent(7.6),
  icms: percent(18),
  csll: percent(9),
};

const tax = (plier: (n: number) => number) => {
  return (credit: Credit, debit: Debit): RealReportTax => {
    const [c, d] = [credit, debit].map(plier);
    if (c < d) return { collect: 0, value: d - c };
    return { collect: c - d, value: 0 };
  };
};

const taxes = mapObject(tax, pliers);
export const { pis, cofins, icms } = taxes;
export const { csll } = pliers;

export const irpj = (operacionalProfit: Billing) => {
  const additional =
    operacionalProfit > 20000 ? percent(10)(operacionalProfit - 20000) : 0;
  return percent(15)(operacionalProfit) + additional;
};
