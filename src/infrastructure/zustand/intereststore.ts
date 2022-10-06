import create from "zustand";

export interface StoreState {
    capital: number;
    taxOfInterest: number;
    taxOfDF:number;
    days: number;
    updateCapital: (capital: number) => void;
    updateTaxOfInterest: (taxOfInterest: number) => void;
    updateTaxOfDF: (taxOfDF: number) => void;
    updateDays: (days: number) => void;
}

export const useInterestStore = create<StoreState>((set) => ({
    capital: 5000,
    taxOfDF: 8,
    taxOfInterest: 12,
    days: 30,
    updateCapital(capital){
        return set((state) => ({ ...state, capital }));
    },
    updateTaxOfDF(taxOfDF){
        return set((state) => ({ ...state, taxOfDF }));
    },
    updateTaxOfInterest(taxOfInterest) {
        return set((state) => ({ ...state, taxOfInterest }));
    },
    updateDays(days) {
        return set((state) => ({...state, days}));
    },
}));
  