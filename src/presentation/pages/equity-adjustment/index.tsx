import * as Bulma from "react-bulma-components";
import { Page } from "../../components";

export const EquityAdjustment = () => {
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
              <Bulma.Form.Input size="small" />
            </Bulma.Form.Control>
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label title="Índice da Margem de Contribuição">
                IMC
              </Bulma.Form.Label>
              <Bulma.Form.Input size="small" type="number" />
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

              <Bulma.Button onClick={() => null} color="primary">
                +
              </Bulma.Button>
            </Bulma.Block>

            <Bulma.Form.Field>
              <Bulma.Form.Control fullwidth>
                <Bulma.Form.Label>Receita Bruta (Ano 1)</Bulma.Form.Label>
                <Bulma.Form.Input size="small" />
              </Bulma.Form.Control>
            </Bulma.Form.Field>
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
                <tr>
                  <td>1</td>
                  <td>R$ 250.000,00</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>R$ 196.000,00</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>R$ 140.000,00</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>R$ 89.172,00</td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <th scope="row">Total</th>
                  <td>R$ 675.172,00</td>
                </tr>
              </tfoot>
            </Bulma.Table>
          </Bulma.Table.Container>
        </Bulma.Box>
      </Bulma.Panel.Block>
    </Page>
  );
};
