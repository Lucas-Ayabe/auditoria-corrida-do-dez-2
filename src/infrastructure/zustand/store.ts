import create from "zustand";
import { Product } from "../../domain";

export interface StoreState {
  expenses: {
    feedstock: number;
    productionOverheads: number;
    labor: number;
    operational: number;
  };
  taxes: {
    total: number;
  };
  operatingProfitMargin: number;
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (index: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  expenses: {
    feedstock: 800000,
    productionOverheads: 650000,
    labor: 350000,
    operational: 600000,
  },
  taxes: {
    total: 30,
  },
  operatingProfitMargin: 10,
  products: [
    {
      name: "Produto A",
      producedQuantity: 150,
    },
    {
      name: "Produto B",
      producedQuantity: 350,
    },
  ],
  addProduct: (product: Product) => {
    return set((state) => ({
      ...state,
      products: state.products.concat(product),
    }));
  },
  deleteProduct: (index: number) => {
    return set((state) => ({
      ...state,
      products: state.products.filter((_, idx) => idx !== index),
    }));
  },
}));
