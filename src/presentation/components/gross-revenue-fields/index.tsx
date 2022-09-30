import * as Bulma from "react-bulma-components";

export interface GrossRevenueFieldsProps {
  grossRevenues: string[];
  onChange: (value: string, index: number) => void;
  onDelete: (index: number) => void;
}

export const GrossRevenueFields = ({
  grossRevenues,
  onChange,
  onDelete,
}: GrossRevenueFieldsProps) => {
  return (
    <Bulma.Block className="flow">
      {grossRevenues.map((grossRevenue, index) => (
        <Bulma.Form.Field key={"GrossRevenueFields-" + index}>
          <Bulma.Form.Control fullwidth>
            <Bulma.Form.Label
              display="flex"
              style={{ justifyContent: "space-between" }}
            >
              <span>Receita Bruta (Ano {index + 1})</span>
              <span>
                <Bulma.Button
                  remove
                  onClick={() => onDelete(index)}
                ></Bulma.Button>
              </span>
            </Bulma.Form.Label>
            <Bulma.Form.Input
              size="small"
              value={grossRevenue}
              onChange={(event) => onChange(event.target.value, index)}
            />
          </Bulma.Form.Control>
        </Bulma.Form.Field>
      ))}
    </Bulma.Block>
  );
};
