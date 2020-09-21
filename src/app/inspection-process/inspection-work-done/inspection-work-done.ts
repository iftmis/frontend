export interface InspectionWorkDone {
  id?: number;
  name: string;
  result?: string;
  fileResourceId?: number;
  procedureId?: number;
  fileResourceContentId?: string;
  isOk?: boolean;
}
