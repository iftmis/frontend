export interface Risk {
  id?: number;
  code: string;
  description: string;
  riskRegisterId: string;
  riskRegisterName?: string;
  objectiveId: string;
  objectiveDescription?: string;
  riskCategoryId: string;
  riskCategoryName?: string;
  riskOwnerId: string;
  riskOwnerName?: string;
}
