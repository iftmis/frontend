export interface Risk {
  id?: number;
  code: string;
  description: string;
  riskRegisterId: number;
  riskRegisterName?: string;
  objectiveId: number;
  objectiveCode?: string;
  objectiveDescription?: string;
  riskCategoryId: number;
  riskCategoryName?: string;
  riskOwnerId: number;
  riskOwnerName?: string;
  riskRatings?: RiskRating[];
}

export interface RiskRating {
  id?: number;
  impact: number;
  likelihood: number;
  comments: string;
  riskId: number;
  source: RiskResource;
}

export enum RiskResource {
  COUNCIL = 0,
  INSPECTOR = 1,
}
