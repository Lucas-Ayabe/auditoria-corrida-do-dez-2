import { compose } from "ramda";
import { percent } from "../shared";

export type Billing = number;

const eightPercent = percent(8);
const ninePercent = percent(9);
const tenPercent = percent(10);
const twelvePercent = percent(12);
const fifteenPercent = percent(15);

export const pis = percent(0.65);
export const cofins = percent(3);
export const irpj = (invoicing: Billing) => {
  const base = eightPercent(invoicing);
  const additional = base > 20000 ? tenPercent(base - 20000) : 0;
  return fifteenPercent(base) + additional;
};

export const csll = compose(ninePercent, twelvePercent);
