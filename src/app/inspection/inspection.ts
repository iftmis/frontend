export interface Inspection {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  inspectionType: string;
  financialYearId: number;
  financialYearName?: string;
  organisationUnitId: number;
  organisationUnitName?: string;
}
