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
  updateExpanse: (name: keyof StoreState["expenses"], value: number) => void;
  updateTaxes: (taxes: number) => void;
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
  updateExpanse: (name: keyof StoreState["expenses"], value: number) => {
    return set((state) => ({
      ...state,
      expenses: { ...state.expenses, [name]: value },
    }));
  },
  updateTaxes: (taxes: number) => {
    return set((state) => ({
      ...state,
      taxes: { total: taxes },
    }));
  },
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

export const useStoreField = (fieldName: keyof StoreState["expenses"]) => {
  const { updateExpanse, expenses } = useStore();

  return {
    value: expenses[fieldName],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      updateExpanse(fieldName, +event.target.value);
    },
  };
};
