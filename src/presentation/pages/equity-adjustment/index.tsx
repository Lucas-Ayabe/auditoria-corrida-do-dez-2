import * as Bulma from "react-bulma-components";
import { useNavigate } from "react-router-dom";
import {
  useDeprecationStore,
  useInterestStore,
  useVarlfReport,
  useRealProofReport,
} from "../../../infrastructure/zustand";
import { GrossRevenueFields, Page } from "../../components";

export const EquityAdjustment = () => {
  const navigate = useNavigate();

  const deprecationStore = useDeprecationStore();
  const interestStore = useInterestStore();

  const varlfReport = useVarlfReport();
  const realProofReport = useRealProofReport();

  const useTotalInInterest = () => {
    interestStore.updateCapital(varlfReport.total.toNumber());
    navigate("/interest");
  };

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

          <Bulma.Button onClick={useTotalInInterest}>
            Usar em Juros
          </Bulma.Button>
        </Bulma.Box>
      </Bulma.Panel.Block>

      <Bulma.Panel.Block>
        <Bulma.Box shadowless style={{ width: "100%" }}>
          <Bulma.Heading renderAs="h2" size={5}>
            Prova Real
          </Bulma.Heading>

          <Bulma.Panel.Block
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>
              Com porcentagem ({realProofReport.deprecationPercentage}):
            </span>{" "}
            <span>
              {realProofReport.results.withDeprecationPercentage.toString()}
            </span>
          </Bulma.Panel.Block>
          <Bulma.Panel.Block
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Mensal:</span>
            <span>{realProofReport.results.perMonth.toString()}</span>
          </Bulma.Panel.Block>
          <Bulma.Panel.Block
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Parcela:</span>
            <span>{realProofReport.results.portion.toString()}</span>
          </Bulma.Panel.Block>
          <Bulma.Panel.Block
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Parcela Final: </span>
            <span>{realProofReport.results.lastPortion.toString()}</span>
          </Bulma.Panel.Block>
          <Bulma.Panel.Block
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Total:</span>
            <span>{realProofReport.results.total.toString()}</span>
          </Bulma.Panel.Block>
        </Bulma.Box>
      </Bulma.Panel.Block>
    </Page>
  );
};
