import * as Bulma from "react-bulma-components";
import {
  useDeprecationStore,
  useVarlfReport,
  useInterestStore,
  useCaseInterestReport
} from "../../../infrastructure/zustand";
import { GrossRevenueFields, Page, ReportGrid } from "../../components";

export const InterestPage = () => {
  const deprecationStore = useDeprecationStore();
  const varlfReport = useVarlfReport();
  const interestStore = useInterestStore();
  const interestReport = useCaseInterestReport();

  return (
    <Page title="Sistema de Ajuste Patrimonial">
      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless className="flow">
          <Bulma.Heading renderAs="h2" size={5}>
            Valor Atual da Receita Líquida Futura
          </Bulma.Heading>

          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label title="Encargos sobre o valor de Receita Bruta">
                ENC
              </Bulma.Form.Label>
              <Bulma.Form.Input
                size="small"
                value={deprecationStore.charges}
                onChange={(event) =>
                  deprecationStore.updateCharges(+event.target.value)
                }
              />
            </Bulma.Form.Control>
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label title="Índice da Margem de Contribuição">
                IMC
              </Bulma.Form.Label>
              <Bulma.Form.Input
                size="small"
                type="number"
                value={deprecationStore.contributionMarginIndex}
                onChange={(event) =>
                  deprecationStore.updateContributionMarginIndex(
                    +event.target.value
                  )
                }
              />
            </Bulma.Form.Control>
          </Bulma.Form.Field>

          <hr />

          <section className="form-section flow">
            <Bulma.Block
              display="flex"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Bulma.Heading
                style={{ margin: 0 }}
                renderAs="h3"
                size={5}
                subtitle
              >
                Receitas Brutas
              </Bulma.Heading>

              <Bulma.Button
                onClick={() => deprecationStore.addGrossRevenue("0")}
                color="primary"
              >
                +
              </Bulma.Button>
            </Bulma.Block>

            <GrossRevenueFields
              grossRevenues={deprecationStore.grossRevenues}
              onChange={deprecationStore.updateGrossRevenue}
              onDelete={deprecationStore.deleteGrossRevenue}
            />
          </section>
        </Bulma.Box>
      </Bulma.Panel.Block>

      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Heading renderAs="h2" size={5}>
            Resultados
          </Bulma.Heading>

          <Bulma.Table.Container>
            <Bulma.Table size="fullwidth">
              <thead>
                <tr>
                  <th scope="col">Ano</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>

              <tbody>
                {varlfReport.details.map((detail) => (
                  <tr key={detail.year}>
                    <td>{detail.year}</td>
                    <td>
                      <strong>{detail.value.toString()}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th scope="row">Total</th>
                  <td>
                    <strong>{varlfReport.total.toString()}</strong>
                  </td>
                </tr>
              </tfoot>
            </Bulma.Table>
          </Bulma.Table.Container>
        </Bulma.Box>
      </Bulma.Panel.Block>

      <Bulma.Panel.Block >
        <Bulma.Box shadowless>
          <Bulma.Heading renderAs="h2" size={5}>
            Calcula Juros
          </Bulma.Heading>
        </Bulma.Box>
      </Bulma.Panel.Block>
      <Bulma.Panel.Block display="block">
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
                  interestStore.updateTaxOfInterest(
                    +event.target.value
                  )
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
                  interestStore.updateTaxOfDF(
                    +event.target.value
                  )
                }
              />
            </Bulma.Form.Control>
          </Bulma.Form.Field>
          <Bulma.Form.Field kind="group">
          <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label title="Dias">
                Dias
              </Bulma.Form.Label>
              <Bulma.Form.Input
                size="small"
                type="number"
                value={interestStore.days}
                onChange={(event) =>
                  interestStore.updateDays(
                    +event.target.value
                  )
                }
              />
            </Bulma.Form.Control>
          </Bulma.Form.Field>
      </Bulma.Panel.Block>
      <Bulma.Panel.Block display="block">
        <Bulma.Heading renderAs="h1" size={2}>
              Resultados
        </Bulma.Heading>
        <ReportGrid
          items={
            [
              {
                label:'juros',
                value: interestReport.interest.toFixed(2)
              },
              {
                label:'montante',
                value: interestReport.montant.toFixed(2)
              },
              {
                label: 'Despesas Financeiras',
                value: interestReport.df.toFixed(2)
              },
              {
                label: 'liqf',
                value: interestReport.total.toFixed(2)
              }
            ]
          }
        />
      </Bulma.Panel.Block>
    </Page>
  );
};
