import { Report } from "../../../domain/report";

export interface CalculateReportCommand {
  grossValue: number;
  totalCost: number;
  operationalExpenses: number;
  salesTax: number;
}

export type CalculateReportUseCase = () => Report;
