export interface ReportGridItem {
  label: string;
  value: string | number;
}

export interface ReportGridProps {
  items: ReportGridItem[];
}

export const ReportGrid = ({ items }: ReportGridProps) => {
  return (
    <dl className="report">
      {items.map(({ label, value }) => {
        return (
          <div key={label + value}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        );
      })}
    </dl>
  );
};
