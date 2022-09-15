import * as Bulma from "react-bulma-components";
import { useReport, useStore } from "../../../infrastructure/zustand";
import { formatToBrl, mapObject } from "../../../shared";
import { Page, ReportGrid } from "../../components";

export const Report = () => {
  const details = useStore(({ taxes, operatingProfitMargin }) => ({
    salesTax: taxes.total,
    operatingProfitMargin,
  }));

  const report = mapObject(formatToBrl, useReport());

  return (
    <Page title="Relatório">
      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Heading renderAs="h2" size={5}>
            Informações
          </Bulma.Heading>

          <ReportGrid
            items={[
              {
                label: "Valor Bruto",
                value: report.grossValue,
              },
              {
                label: `Imposto s/ vendas (${details.salesTax}%)`,
                value: report.salesTaxAmount,
              },
              {
                label: "Valor Liquido",
                value: report.netValue,
              },
              {
                label: "Custo Total",
                value: report.totalCost,
              },
              {
                label: "Lucro Bruto",
                value: report.grossProfit,
              },
              {
                label: "Despesas Operacionais",
                value: report.operationalExpenses,
              },
              {
                label: `Lucro Operacional (${details.operatingProfitMargin}%)`,
                value: report.operationalProfit,
              },
            ]}
          />
        </Bulma.Box>
      </Bulma.Panel.Block>
    </Page>
  );
};
