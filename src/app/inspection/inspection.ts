export interface Inspection {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  inspectionType: string;
  financialYearId: string;
  financialYearName?: string;
  organisationUnitId: string;
  organisationUnitName?: string;
}
