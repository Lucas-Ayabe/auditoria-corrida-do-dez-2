import { sum } from "ramda";
import { percent, mapObject } from "../shared";
import { Billing } from "./presumed";

export type Credit = number;
export type Debit = Billing;

export const pliers = {
  pis: percent(1.65),
  cofins: percent(7.6),
  icms: percent(18),
  csll: percent(9),
};

const tax = (plier: (n: number) => number) => {
  return (credit: Credit, debit: Debit): [number, number] => {
    const [c, d] = [credit, debit].map(plier);
    if (c < d) return [0, d - c];
    return [c - d, 0];
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

export const totalValue = (credit: Credit, debit: Debit): [number, number] => {
  const [pisExtras, pis] = taxes.pis(credit, debit);
  const [cofinsExtras, cofins] = taxes.cofins(credit, debit);
  const [icmsExtras, icms] = taxes.icms(credit, debit);

  const totalExtras = sum([pisExtras, cofinsExtras, icmsExtras]);
  const totalTaxes = sum([pis, cofins, icms]);
  return [totalExtras, totalTaxes];
};
