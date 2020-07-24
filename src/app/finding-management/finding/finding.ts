import { FindingRecommendation } from '../recommendation/recommendation';

export interface Finding {
  id?: number;
  code: string;
  source?: string;
  description: string;
  actionPlanCategory: string;
  isClosed?: boolean;
  organisationUnitId?: number;
  organisationUnitName?: string;
  findingRecommendations?: FindingRecommendation[];
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
