import * as Bulma from "react-bulma-components";
import { Page } from "../../components";

export const CompareSystems = () => {
  const viewModel = {
    results: {
      presumed: {
        pis: { formated: "R$ 36.300,00" },
        cofins: { formated: "R$ 167.200,00" },
        icms: { formated: "R$ 980.000,00" },
        total: { formated: "R$ 36.000,00" },
      },
      real: {
        pis: { formated: "R$ 0,00 (A recolher: R$ 0,00)" },
        cofins: { formated: "R$ 0,00 (A recolher: R$ 0,00)" },
        icms: { formated: "R$ 0,00 (A recolher: R$ 0,00)" },
        total: { formated: "R$ 0,00 (A recolher: R$ 0,00)" },
      },
    },
  };

  return (
    <Page title="Comparar Sistemas">
      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Heading subtitle renderAs="h2" size={5}>
            O melhor sistema é o{" "}
            <Bulma.Heading renderAs="p" size={2}>
              Presumido
            </Bulma.Heading>
          </Bulma.Heading>
        </Bulma.Box>
      </Bulma.Panel.Block>

      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Heading subtitle renderAs="h2" size={5}>
            Detalhes
          </Bulma.Heading>

          <Bulma.Table.Container>
            <Bulma.Table size="fullwidth" className="comparative-table">
              <caption style={{ opacity: 0, height: 0 }}>Detalhes</caption>

              <thead>
                <tr>
                  <th scope="">#</th>
                  <th scope="col">Presumido</th>
                  <th scope="col">Real</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope="row">PIS</th>
                  <td>{viewModel.results.presumed.pis.formated}</td>
                  <td>{viewModel.results.real.pis.formated}</td>
                </tr>
                <tr>
                  <th scope="row">COFINS</th>
                  <td>{viewModel.results.presumed.cofins.formated}</td>
                  <td>{viewModel.results.real.cofins.formated}</td>
                </tr>
                <tr>
                  <th scope="row">ICMS</th>
                  <td>{viewModel.results.presumed.icms.formated}</td>
                  <td>{viewModel.results.real.icms.formated}</td>
                </tr>
                <tr>
                  <th scope="row">IRPJ</th>
                  <td>{viewModel.results.presumed.icms.formated}</td>
                  <td>{viewModel.results.real.icms.formated}</td>
                </tr>
                <tr>
                  <th scope="row">CSLL</th>
                  <td>{viewModel.results.presumed.icms.formated}</td>
                  <td>{viewModel.results.real.icms.formated}</td>
                </tr>
                <tr>
                  <th scope="row">TOTAL</th>
                  <td>{viewModel.results.presumed.total.formated}</td>
                  <td>{viewModel.results.real.total.formated}</td>
                </tr>
              </tbody>
            </Bulma.Table>
          </Bulma.Table.Container>
        </Bulma.Box>
      </Bulma.Panel.Block>
    </Page>
  );
};
