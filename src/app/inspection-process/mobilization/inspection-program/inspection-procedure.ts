import { InspectionWorkDone } from '../../inspection-work-done/inspection-work-done';

export interface InspectionProcedure {
  id?: number;
  name: string;
  inspectionIndicatorId: number;
  inspectionIndicatorName?: string;
  indicatorId?: number;
  indicatorName?: string;
  inspectionWorkDone?: InspectionWorkDone[];
  workDoneLoaded?: boolean;
}
