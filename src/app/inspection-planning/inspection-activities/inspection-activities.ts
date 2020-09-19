import { Risk } from '../../risk-management/risk/risk';
import { OrganisationUnit } from '../../setting/organisation-unit/organisation-unit';

export interface InspectionActivities {
  id?: number;
  objectiveId: string;
  objectiveName?: string;
  auditableAreaId: number;
  auditableAreaName?: string;
  inspectionPlanId: number;
  subAreaId: string;
  subAreaName?: string;
  activity: string;
  days: string;
  quarter1: string;
  quarter2: string;
  quarter3: string;
  quarter4: string;
  risk: Risk[];
  organisationUnit: OrganisationUnit[];
}
