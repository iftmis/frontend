export interface InspectionBudget {
  id?: number;
  gfsCodeId: string;
  inspectionId: string;
  gfsCodeName?: string;
  quantity: number;
  frequency: number;
  unitPrice: number;
}
