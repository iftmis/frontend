export interface Quarter {
  id?: number;
  code?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  financialYearId: string;
  financialYearName?: string;
}
