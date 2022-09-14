import {
  CountProductsUseCase,
  ListDetailedProductsUseCase,
  CalculateTotalCostUseCase,
  CalculateReportUseCase,
  CalculateGrossValueUseCase,
  CalculateTotalTaxesUseCase,
} from "../../../application/use-cases";
import { percent, percentOf } from "../../../shared";
import { useStore } from "../store";

export const useProductsCount: CountProductsUseCase = () => {
  return useStore((state) =>
    state.products
      .map((product) => product.producedQuantity)
      .reduce((x, y) => x + y, 0)
  );
};

export const useDetailedProducts: ListDetailedProductsUseCase = () => {
  const productsCount = useProductsCount();

  return useStore((state) => {
    return state.products.map((product) => {
      const producedAmountPercent = percentOf(
        productsCount,
        product.producedQuantity
      );

      const calculateProducedAmountPercent = percent(producedAmountPercent);

      const feedstock = calculateProducedAmountPercent(
        state.expenses.feedstock
      );

      const labor = calculateProducedAmountPercent(state.expenses.labor);

      const productionOverheads = calculateProducedAmountPercent(
        state.expenses.productionOverheads
      );

      return {
        ...product,
        producedAmountPercent,
        expenses: {
          feedstock,
          labor,
          productionOverheads,
          total: feedstock + labor + productionOverheads,
        },
      };
    });
  });
};

export const useTotalCost: CalculateTotalCostUseCase = () => {
  return useDetailedProducts()
    .map((detailedProduct) => detailedProduct.expenses.total)
    .reduce((x, y) => x + y, 0);
};

export const useSalesTax: CalculateTotalTaxesUseCase = () =>
  useStore(({ taxes }) => taxes.total);

export const useGrossValue: CalculateGrossValueUseCase = () => {
  const totalCost = useTotalCost();
  const totalTaxes = useSalesTax();
  const { operatingProfitMargin, operationalExpanses } = useStore(
    ({ operatingProfitMargin, expenses }) => ({
      operatingProfitMargin,
      operationalExpanses: expenses.operational,
    })
  );

  const realPercentage = 100 - (totalTaxes + operatingProfitMargin);
  return (totalCost + operationalExpanses) / (realPercentage / 100);
};

export const useReport: CalculateReportUseCase = () => {
  const {
    expenses: { operational: operationalExpenses },
  } = useStore();

  const salesTax = useSalesTax();
  const grossValue = useGrossValue();
  const totalCost = useTotalCost();
  const salesTaxAmount = percent(salesTax)(grossValue);
  const netValue = grossValue - salesTaxAmount;
  const grossProfit = netValue - totalCost;

  return {
    grossValue,
    salesTaxAmount,
    netValue,
    totalCost,
    grossProfit,
    operationalExpenses,
    operationalProfit: grossProfit - operationalExpenses,
  };
};
