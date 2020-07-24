export enum ImplementationStatus {
  IMPLEMENTED = 0,
  NOT_IMPLEMENTED = 1,
  PARTIAL_IMPLEMENTED = 2,
  TAKEN_BY_EVENT = 3,
}

export interface FindingRecommendation {
  id?: number;
  description: string;
  implementationStatus: ImplementationStatus;
  findingId: number;
  findingCode?: string;
  findingDescription?: string;
}
