export interface Risk {
  id?: number;
  code: string;
  description: string;
  riskRegisterId: number;
  riskRegisterName?: string;
  objectiveId: number;
  objectiveDescription?: string;
  riskCategoryId: number;
  riskCategoryName?: string;
  riskOwnerId: number;
  riskOwnerName?: string;
}
