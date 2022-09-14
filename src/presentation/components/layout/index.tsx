import React from "react";
import * as Bulma from "react-bulma-components";
import { Navbar } from "../navbar";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Bulma.Container>
      <Bulma.Columns>
        <Bulma.Columns.Column size="one-quarter">
          <Bulma.Section>
            <Navbar
              items={[
                {
                  to: "/produtos",
                  content: "Produtos",
                },
                {
                  to: "/relatorio",
                  content: "Relatorio",
                },
                {
                  to: "/comparar-sistemas",
                  content: "Comparar Sistemas",
                },
              ]}
            />
          </Bulma.Section>
        </Bulma.Columns.Column>

        <Bulma.Columns.Column>
          <Bulma.Section renderAs="div">{children}</Bulma.Section>
        </Bulma.Columns.Column>
      </Bulma.Columns>
    </Bulma.Container>
  );
};
