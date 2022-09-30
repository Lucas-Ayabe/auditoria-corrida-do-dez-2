import { CalculateVarlfReportUseCase } from "../../../application/use-cases";
import { Percentage, Money } from "../../../domain/value-objects";
import { varlf } from "../../../domain/varlf";
import { useDeprecationStore } from "../deprecation-store";

export const useVarlfReport: CalculateVarlfReportUseCase = () => {
  const store = useDeprecationStore();

  const contributionMarginIndex = new Percentage(store.contributionMarginIndex);
  const charges = new Percentage(store.charges);

  const details = store.grossRevenues
    .map(Number)
    .map((grossRevenue, index) => {
      return varlf(contributionMarginIndex, charges, grossRevenue, index + 1);
    })
    .map(Money.from)
    .map((value, index) => ({ value, year: index + 1 }));

  return {
    details,
    total: details
      .map((detail) => detail.value.toNumber())
      .reduce((x, y) => x.add(y), Money.from(0)),
  };
};
