import * as Bulma from "react-bulma-components";

export interface PageProps {
  title: string;
  children: React.ReactNode;
}

export const Page = ({ title, children }: PageProps) => {
  return (
    <Bulma.Panel>
      <Bulma.Panel.Header>{title}</Bulma.Panel.Header>
      {children}
    </Bulma.Panel>
  );
};
