import * as Presumed from "../../../domain/presumed";
import * as Real from "../../../domain/real";
import { RealReportTax } from "../../../domain/report";

import {
  CalculatePresumedReportUseCase,
  CalculateRealReportUseCase,
  CalculateTaxReportUseCase,
} from "../../../application/use-cases";

import { useStore } from "../store";
import { useReport } from "./product-report";
import { formatToBrl, mapObject } from "../../../shared";

export const usePresumedReport: CalculatePresumedReportUseCase = () => {
  const { feedstock } = useStore((state) => state.expenses);
  const { grossValue: billing } = useReport();
  const icmsResult = Real.icms(feedstock, billing);

  const pis = Presumed.pis(billing);
  const cofins = Presumed.cofins(billing);
  const icms = icmsResult.value + icmsResult.collect;
  const csll = Presumed.csll(billing);
  const irpj = Presumed.irpj(billing);

  return {
    pis,
    cofins,
    icms,
    csll,
    irpj,
    total: pis + cofins + icms + csll + irpj,
  };
};

export const useRealReport: CalculateRealReportUseCase = () => {
  const { feedstock } = useStore((state) => state.expenses);
  const { totalCost, grossValue, operationalProfit } = useReport();

  const pis = Real.pis(totalCost, grossValue);
  const cofins = Real.cofins(totalCost, grossValue);
  const icms = Real.icms(feedstock, grossValue);
  const csll = Real.csll(operationalProfit);
  const irpj = Real.irpj(operationalProfit);

  return {
    pis,
    cofins,
    icms,
    csll,
    irpj,
    total: {
      value: pis.value + cofins.value + icms.value + csll + irpj,
      collect: pis.collect + cofins.collect + icms.collect,
    },
  };
};

const formatRealResult = (result: RealReportTax) => {
  if (result.value !== 0) return formatToBrl(result.value);

  return `${formatToBrl(0)} (A recolher: ${formatToBrl(result.collect)})`;
};

export const useTaxReport: CalculateTaxReportUseCase = () => {
  const presumedRawReport = usePresumedReport();
  const realReport = useRealReport();

  const presumedReport = mapObject(formatToBrl, presumedRawReport);

  return {
    bestOption:
      presumedRawReport.total < realReport.total.value ? "presumed" : "real",
    pis: {
      presumed: presumedReport.pis,
      real: formatRealResult(realReport.pis),
    },
    cofins: {
      presumed: presumedReport.cofins,
      real: formatRealResult(realReport.cofins),
    },
    irpj: {
      presumed: presumedReport.irpj,
      real: formatToBrl(realReport.irpj),
    },
    csll: {
      presumed: presumedReport.csll,
      real: formatToBrl(realReport.csll),
    },
    icms: {
      presumed: presumedReport.icms,
      real: formatRealResult(realReport.icms),
    },
    total: {
      presumed: presumedReport.total,
      real: formatRealResult(realReport.total),
    },
  };
};
