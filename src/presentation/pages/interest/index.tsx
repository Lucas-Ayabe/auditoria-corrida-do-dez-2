import * as Bulma from "react-bulma-components";
import {
  useDeprecationStore,
  useVarlfReport,
  useInterestStore,
  useCaseInterestReport,
} from "../../../infrastructure/zustand";
import { Page, ReportGrid } from "../../components";

export const InterestPage = () => {
  const interestStore = useInterestStore();
  const interestReport = useCaseInterestReport();

  return (
    <Page title="Sistema de Ajuste Patrimonial">
      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Heading renderAs="h2" size={5}>
            Calcula Juros
          </Bulma.Heading>

          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label title="Capital">
                Capital Inicial
              </Bulma.Form.Label>
              <Bulma.Form.Input
                size="small"
                value={interestStore.capital}
                onChange={(event) =>
                  interestStore.updateCapital(+event.target.value)
                }
              />
            </Bulma.Form.Control>
          </Bulma.Form.Field>
          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label title="Taxa de Juros">
                Taxa de Juros
              </Bulma.Form.Label>
              <Bulma.Form.Input
                size="small"
                type="number"
                value={interestStore.taxOfInterest}
                onChange={(event) =>
                  interestStore.updateTaxOfInterest(+event.target.value)
                }
              />
            </Bulma.Form.Control>
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label title="Indice de Retorno">
                Taxa de Retorno
              </Bulma.Form.Label>
              <Bulma.Form.Input
                size="small"
                type="number"
                value={interestStore.taxOfDF}
                onChange={(event) =>
                  interestStore.updateTaxOfDF(+event.target.value)
                }
              />
            </Bulma.Form.Control>
          </Bulma.Form.Field>
          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label title="Dias">Dias</Bulma.Form.Label>
              <Bulma.Form.Input
                size="small"
                type="number"
                value={interestStore.days}
                onChange={(event) =>
                  interestStore.updateDays(+event.target.value)
                }
              />
            </Bulma.Form.Control>
          </Bulma.Form.Field>
        </Bulma.Box>
      </Bulma.Panel.Block>
      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Heading renderAs="h2" size={5}>
            Resultados
          </Bulma.Heading>
          <ReportGrid
            items={[
              {
                label: "Juros",
                value: interestReport.interest.toString(),
              },
              {
                label: "Montante",
                value: interestReport.montant.toString(),
              },
              {
                label: "Despesas Financeiras",
                value: interestReport.df.toString(),
              },
              {
                label: "LIQF",
                value: interestReport.total.toString(),
              },
            ]}
          />
        </Bulma.Box>
      </Bulma.Panel.Block>
    </Page>
  );
};
