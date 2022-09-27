import { describe, it, expect } from "vitest";
import { Percentage } from "../../src/domain/value-objects";
import { varlf } from "../../src/domain/varlf";

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
});
