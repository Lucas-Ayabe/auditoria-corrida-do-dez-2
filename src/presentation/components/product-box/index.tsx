import * as Bulma from "react-bulma-components";
import { DetailedProduct } from "../../../domain";
import { formatToBrl, mapObject } from "../../../shared";
import { ReportGrid } from "../report-grid";

export interface ProductBoxProps extends DetailedProduct {
  onDelete?: () => void;
}

export const ProductBox = ({
  name,
  producedQuantity,
  expenses,
  producedAmountPercent,
  onDelete = () => null,
}: ProductBoxProps) => {
  const formattedExpanses = mapObject(formatToBrl, expenses);

  return (
    <Bulma.Box shadowless style={{ flex: 1 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Bulma.Heading renderAs="h3" size={5}>
          {name}
        </Bulma.Heading>
        <Bulma.Button remove onClick={() => onDelete()}>
          Delete Product
        </Bulma.Button>
      </div>

      <Bulma.Heading subtitle renderAs="h4" size={5}>
        Detalhes de rateio
      </Bulma.Heading>

      <ReportGrid
        items={[
          {
            label: "Quantidade",
            value: producedQuantity,
          },
          {
            label: "Representação total",
            value: `${producedAmountPercent.toFixed(2)}%`,
          },
          {
            label: "Matéria Prima",
            value: formattedExpanses.feedstock,
          },
          {
            label: "Gastos Gerais de Produção",
            value: formattedExpanses.productionOverheads,
          },
          {
            label: "Mão de Obra",
            value: formattedExpanses.labor,
          },
          {
            label: "Custo Total",
            value: formattedExpanses.total,
          },
        ]}
      />
    </Bulma.Box>
  );
};
