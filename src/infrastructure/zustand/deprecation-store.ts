import create from "zustand";

export interface StoreState {
  contributionMarginIndex: number;
  charges: number;
  grossRevenues: string[];
  updateContributionMarginIndex: (contributionMarginIndex: number) => void;
  updateCharges: (charges: number) => void;
  addGrossRevenue: (grossRevenue: string) => void;
  updateGrossRevenue: (grossRevenue: string, index: number) => void;
  deleteGrossRevenue: (index: number) => void;
}

export const useDeprecationStore = create<StoreState>((set) => ({
  contributionMarginIndex: 12,
  charges: 30,
  grossRevenues: ["400000", "350000", "280000", "200000"],
  updateContributionMarginIndex: (contributionMarginIndex: number) => {
    return set((state) => ({ ...state, contributionMarginIndex }));
  },
  updateCharges: (charges: number) => {
    return set((state) => ({ ...state, charges }));
  },
  addGrossRevenue: (grossRevenue: string) => {
    return set((state) => ({
      ...state,
      grossRevenues: state.grossRevenues.concat(grossRevenue),
    }));
  },
  updateGrossRevenue: (grossRevenue: string, index: number) => {
    return set((state) => ({
      ...state,
      grossRevenues: state.grossRevenues.map((item, idx) => {
        if (index === idx) return grossRevenue;
        return item;
      }),
    }));
  },
  deleteGrossRevenue: (index: number) => {
    return set((state) => ({
      ...state,
      grossRevenues: state.grossRevenues.filter((_, idx) => idx !== index),
    }));
  },
}));
