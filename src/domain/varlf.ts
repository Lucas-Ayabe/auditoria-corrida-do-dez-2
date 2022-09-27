import { Percentage } from "./value-objects";

export const varlf = (
  contributionMarginIndex: Percentage,
  charges: Percentage,
  grossRevenue: number,
  time: number
) => {
  const cmi = contributionMarginIndex.toNumber();
  const numerator = grossRevenue - charges.of(grossRevenue);
  const denominator = +((1 + cmi) ** time).toFixed(2);

  return Math.round(numerator / denominator);
};

export const portionOfDeprecation = (totalVarlf: number) => {
  return new Percentage(15).of(totalVarlf);
};

export const deprecationPercentage = (time: number) => {
  return new Percentage(100 / time);
};

export const monthDeprecationValue = (totalVarlf: number, time: number) => {
  return deprecationPercentage(time).of(totalVarlf) / 12;
};

export const monthPortionOfDeprecation = (monthDeprecationValue: number) => {
  return new Percentage(15).of(monthDeprecationValue);
};

export const realProofOfPortionOfDeprecation = (
  monthPortionOfDeprecation: number,
  time: number
) => monthPortionOfDeprecation * (12 * time);

export const realLastPortionValue = (totalVarlf: number, time: number) => {
  const realProof = realProofOfPortionOfDeprecation(
    monthPortionOfDeprecation(monthDeprecationValue(totalVarlf, time)),
    time
  );

  const diference = realProof - portionOfDeprecation(totalVarlf);

  return realProof - diference;
};
