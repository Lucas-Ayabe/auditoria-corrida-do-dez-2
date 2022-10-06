import { CalculateVarlfReportUseCase } from "../../../application/use-cases";
import { Percentage, Money } from "../../../domain/value-objects";
import { deprecationPercentage, varlf } from "../../../domain/varlf";
import { mapObject } from "../../../shared";
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

export const useRealProofReport = () => {
  const { grossRevenues } = useDeprecationStore();
  const varlfReport = useVarlfReport();

  const varlf = varlfReport.total.toNumber();
  const time = grossRevenues.length;

  const withDeprecationPercentage = +deprecationPercentage(time)
    .of(varlf)
    .toFixed(0);

  const perMonth = +(withDeprecationPercentage / 12).toFixed(0);
  const perMonthWithTaxesApplied = Math.round(new Percentage(15).of(perMonth));

  const portion = perMonthWithTaxesApplied * (time * 12);

  return {
    deprecationPercentage: deprecationPercentage(time).toString(),
    results: mapObject(Money.from, {
      withDeprecationPercentage,
      perMonth,
      portion: perMonthWithTaxesApplied,
      lastPortion:
        perMonthWithTaxesApplied -
        (portion - new Percentage(15).of(varlfReport.total.toNumber())),
      total: portion,
    }),
  };
};
