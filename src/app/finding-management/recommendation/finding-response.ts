export interface FindingResponse {
  id: number;
  source: string;
  description: string;
  recommendationId: number;
  recommendationDescription?: string;
  createdDate?: string;
}

export enum ResponseType {
  AUDITOR = 0,
  INSPECTOR = 1,
  CLIENT = 2,
}
