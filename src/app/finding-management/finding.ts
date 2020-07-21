export interface Finding {
  id?: number;
  code: string;
  source: FindingSource;
  description: string;
  actionPlanCategory: ActionPlanCategory;
  isClosed: boolean;
  organisationUnitId: number;
  organisationUnitName?: string;
}

export enum FindingSource {
  CAG = 0,
  PPRA = 1,
  LAAC = 2,
  INSPECTION = 3,
  IA = 4,
}

export enum ActionPlanCategory {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}
