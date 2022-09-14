import { createObjectMapper } from "./object";

export const formatToBrl = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
