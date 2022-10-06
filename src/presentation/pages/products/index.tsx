import * as Bulma from "react-bulma-components";
import {
  useDetailedProducts,
  useProductsCount,
  useStore,
  useStoreField,
  useTotalCost,
} from "../../../infrastructure/zustand";
import { formatToBrl, mapObject } from "../../../shared";
import { Page, ProductBox, ReportGrid } from "../../components";
import { useNumberField, useTextField } from "../../hooks";

export const Products = () => {
  const products = useDetailedProducts();
  const totalProducts = useProductsCount();
  const { addProduct, deleteProduct, taxes, updateTaxes } = useStore();

  const nameField = useTextField();
  const producedAmountField = useNumberField();

  const feedstockField = useStoreField("feedstock");
  const laborField = useStoreField("labor");
  const operationalField = useStoreField("operational");
  const productionOverheadsField = useStoreField("productionOverheads");

  const totalCost = formatToBrl(useTotalCost());

  return (
    <Page title="Produtos">
      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label>Nome</Bulma.Form.Label>
              <Bulma.Form.Input {...nameField} size="small" />
            </Bulma.Form.Control>
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label>Quantidade produzida</Bulma.Form.Label>
              <Bulma.Form.Input
                {...producedAmountField}
                size="small"
                type="number"
              />
            </Bulma.Form.Control>
          </Bulma.Form.Field>
          <Bulma.Form.Control>
            <Bulma.Button
              onClick={() =>
                addProduct({
                  name: nameField.value,
                  producedQuantity: producedAmountField.value,
                })
              }
              color="primary"
            >
              Adicionar Produto
            </Bulma.Button>
          </Bulma.Form.Control>
        </Bulma.Box>
      </Bulma.Panel.Block>

      <Bulma.Panel.Block display="block">
        <Bulma.Box shadowless>
          <Bulma.Heading renderAs="h2" size={5}>
            Detalhes Gerais
          </Bulma.Heading>

          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label>Matéria Prima</Bulma.Form.Label>
              <Bulma.Form.Input {...feedstockField} size="small" />
            </Bulma.Form.Control>
          </Bulma.Form.Field>

          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label>Mão de Obra</Bulma.Form.Label>
              <Bulma.Form.Input {...laborField} size="small" />
            </Bulma.Form.Control>
          </Bulma.Form.Field>

          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label>Gastos Gerais de Produção</Bulma.Form.Label>
              <Bulma.Form.Input {...productionOverheadsField} size="small" />
            </Bulma.Form.Control>
          </Bulma.Form.Field>

          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label>Despesas Operacionais</Bulma.Form.Label>
              <Bulma.Form.Input {...operationalField} size="small" />
            </Bulma.Form.Control>
          </Bulma.Form.Field>

          <Bulma.Form.Field kind="group">
            <Bulma.Form.Control fullwidth>
              <Bulma.Form.Label>Tributos</Bulma.Form.Label>
              <Bulma.Form.Input
                value={taxes.total}
                onChange={(event) => updateTaxes(+event.target.value)}
                size="small"
              />
            </Bulma.Form.Control>
          </Bulma.Form.Field>

          <ReportGrid
            items={[
              {
                label: "Quantidade",
                value: totalProducts,
              },
              {
                label: "Representação total",
                value: `100%`,
              },
              {
                label: "Custo Total",
                value: totalCost,
              },
            ]}
          />
        </Bulma.Box>
      </Bulma.Panel.Block>

      {products.map((product, index) => (
        <Bulma.Panel.Block key={product.name + index}>
          <ProductBox {...product} onDelete={() => deleteProduct(index)} />
        </Bulma.Panel.Block>
      ))}
    </Page>
  );
};
