import { Money, Percentage } from "../../../domain/value-objects";
import { mapObject } from "../../../shared";
import { useInterestStore } from "../intereststore";

export const useCaseInterestReport = () => {
  const store = useInterestStore();

  const taxOfDFIndex = new Percentage(store.taxOfDF);
  const taxOfInterestIndex = new Percentage(store.taxOfInterest);
  const capital: number = store.capital;

  const df = taxOfDFIndex.of(capital);
  const months = store.days / 30;
  const montant = capital * (1 + taxOfInterestIndex.toNumber()) ** months;

  const interest = montant - capital;
  const total = capital - (interest + df);

  return mapObject(Money.from, {
    total,
    df,
    montant,
    interest,
  });
};
