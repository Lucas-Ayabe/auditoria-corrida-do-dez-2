import { describe, it, expect } from "vitest";
import { Percentage } from "../../src/domain/value-objects";
import {
  varlf,
  portionOfDeprecation,
  monthDeprecationValue,
  deprecationPercentage,
  monthPortionOfDeprecation,
  realProofOfPortionOfDeprecation,
} from "../../src/domain/varlf";

describe("Varlf", () => {
  it("should expect varlf to be calculated correctly", () => {
    // Given
    const grossRevenue = 400000;
    const contributionMarginIndex = new Percentage(12);
    const charges = new Percentage(30);
    const year = 1;

    // When
    const firstYearResult = varlf(
      contributionMarginIndex,
      charges,
      grossRevenue,
      year
    );

    // Then
    expect(firstYearResult).toBe(250000);
  });

  it("should expect total varlf to be calculated correctly", () => {
    // Given
    const grossRevenues = [400000, 350000, 280000, 200000];
    const contributionMarginIndex = new Percentage(12);
    const charges = new Percentage(30);

    // When
    const [
      firstYearResult,
      secondYearResult,
      thirdYearResult,
      forthYearResult,
    ] = grossRevenues.map((grossRevenue, index) => {
      const year = index + 1;
      return varlf(contributionMarginIndex, charges, grossRevenue, year);
    });

    // Then
    expect(firstYearResult).toBe(250000);
    expect(secondYearResult).toBe(196000);
    expect(thirdYearResult).toBe(140000);
    expect(forthYearResult).toBe(89172);
  });

  it("should expect the deprecation portion to be calculated correctly", () => {
    // Given
    const varlf = 675171;

    // When
    const portion = portionOfDeprecation(varlf);

    // Then
    expect(portion).toBe(101276);
  });

  it("should expect the deprecation portion real test to be calculated correctly", () => {
    // Given
    const varlf = 675171;
    const time = 4;

    // When
    const n1 = +deprecationPercentage(time).of(varlf).toFixed(0);
    const n2 = +(n1 / 12).toFixed(0);
    const n3 = Math.round(new Percentage(15).of(n2));
    const portion = n3 * 48;

    // Then
    expect(n1).toBe(168793);
    expect(n2).toBe(14066);
    expect(n3).toBe(2110);
    expect(portion).toBe(101280);
  });

  it("should expect the deprecation last portion to be calculated correctly", () => {
    // Given
    const portionOfDeprecation = 101276;
    const realProofPortion = 2110;
    const realProofOfPortionOfDeprecation = 101280;

    // When
    const portion =
      realProofPortion -
      (realProofOfPortionOfDeprecation - portionOfDeprecation);

    // Then
    expect(portion).toBe(2106);
  });
});
