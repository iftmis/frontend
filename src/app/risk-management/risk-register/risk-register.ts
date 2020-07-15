import { FinancialYear } from '../../setting/financial-year/financial-year';
import { OrganisationUnit } from '../../setting/organisation-unit/organisation-unit';
import { User } from '../../user-management/user/user';

export interface RiskRegister {
  id?: number;
  name: string;
  financialYear: FinancialYear;
  organisationUnit: OrganisationUnit;
  isApproved?: boolean;
  approvedDate?: Date;
  approvedBy?: User;
}
