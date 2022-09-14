import * as Bulma from "react-bulma-components";
import {
  useDetailedProducts,
  useProductsCount,
  useStore,
} from "../../../infrastructure/zustand";
import { Page, ProductBox } from "../../components";
import { useNumberField, useTextField } from "../../hooks";

export const Products = () => {
  const products = useDetailedProducts();
  const totalProducts = useProductsCount();
  const { addProduct, deleteProduct } = useStore();
  const nameField = useTextField();
  const producedAmountField = useNumberField();

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

      <Bulma.Panel.Block>
        <Bulma.Box shadowless>Total produzido: {totalProducts}</Bulma.Box>
      </Bulma.Panel.Block>

      {products.map((product, index) => (
        <Bulma.Panel.Block key={product.name + index}>
          <ProductBox {...product} onDelete={() => deleteProduct(index)} />
        </Bulma.Panel.Block>
      ))}
    </Page>
  );
};
