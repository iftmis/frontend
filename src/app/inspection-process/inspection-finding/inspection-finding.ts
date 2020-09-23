export interface InspectionFinding {
  id?: number;
  code?: string;
  description?: string;
  condition?: string;
  disclosedLastInspection?: boolean;
  causes?: string;
  actionPlanCategory?: string;
  isClosed?: boolean;
  categoryId?: number;
  categoryName?: string;
  subCategoryId?: number;
  subCategoryName?: string;
  workDoneId?: number;
}
