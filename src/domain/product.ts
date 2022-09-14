export interface Product {
  name: string;
  producedQuantity: number;
}

export interface DetailedProduct extends Product {
  producedAmountPercent: number;
  expenses: {
    feedstock: number;
    productionOverheads: number;
    labor: number;
    total: number;
  };
}
