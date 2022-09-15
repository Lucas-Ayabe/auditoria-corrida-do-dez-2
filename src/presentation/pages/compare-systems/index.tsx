import * as Bulma from "react-bulma-components";
import { useTaxReport } from "../../../infrastructure/zustand";
import { Page } from "../../components";

export const CompareSystems = () => {
  const taxReport = useTaxReport();

  return (
    <Page title="Comparar Sistemas">
      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Heading subtitle renderAs="h2" size={5}>
            O melhor sistema é o{" "}
            <Bulma.Heading renderAs="p" size={2}>
              {taxReport.bestOption === "presumed" ? "Presumido" : "Real"}
            </Bulma.Heading>
          </Bulma.Heading>
        </Bulma.Box>
      </Bulma.Panel.Block>

      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Heading renderAs="h2" size={5}>
            Detalhes
          </Bulma.Heading>

          <Bulma.Table.Container>
            <Bulma.Table size="fullwidth" className="comparative-table">
              <caption className="table-caption">Detalhes</caption>

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
                  <td>{taxReport.pis.presumed}</td>
                  <td>{taxReport.pis.real}</td>
                </tr>
                <tr>
                  <th scope="row">COFINS</th>
                  <td>{taxReport.cofins.presumed}</td>
                  <td>{taxReport.cofins.real}</td>
                </tr>
                <tr>
                  <th scope="row">IRPJ</th>
                  <td>{taxReport.irpj.presumed}</td>
                  <td>{taxReport.irpj.real}</td>
                </tr>
                <tr>
                  <th scope="row">CSLL</th>
                  <td>{taxReport.csll.presumed}</td>
                  <td>{taxReport.csll.real}</td>
                </tr>
                <tr>
                  <th scope="row">ICMS</th>
                  <td>{taxReport.icms.presumed}</td>
                  <td>{taxReport.icms.real}</td>
                </tr>
                <tr>
                  <th scope="row">TOTAL</th>
                  <td>{taxReport.total.presumed}</td>
                  <td>{taxReport.total.real}</td>
                </tr>
              </tbody>
            </Bulma.Table>
          </Bulma.Table.Container>
        </Bulma.Box>
      </Bulma.Panel.Block>
    </Page>
  );
};
