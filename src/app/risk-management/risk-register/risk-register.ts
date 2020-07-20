import { User } from '../../user-management/user/user';

export interface RiskRegister {
  id?: number;
  name: string;
  financialYearId: number;
  financialYearName?: string;
  organisationUnitId?: number;
  organisationUnitName?: string;
  isApproved?: boolean;
  approvedDate?: Date;
  approvedBy?: User;
}
