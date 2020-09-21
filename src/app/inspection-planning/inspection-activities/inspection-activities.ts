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
  quarter_one: string;
  quarter_two: string;
  quarter_three: string;
  quarter_four: string;
  risks: Risk[];
  organisationUnits: OrganisationUnit[];
}
