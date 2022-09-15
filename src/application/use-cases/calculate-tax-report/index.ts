import { PresumedReport, RealReport, TaxReport } from "../../../domain/report";

export type CalculatePresumedReportUseCase = () => PresumedReport;
export type CalculateRealReportUseCase = () => RealReport;
export type CalculateTaxReportUseCase = () => TaxReport;
