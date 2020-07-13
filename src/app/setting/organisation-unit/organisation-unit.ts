import { OrganisationUnitLevel } from '../organisation-unit-level/organisation-unit-level';

export interface OrganisationUnit {
  id?: number;
  code?: string;
  name: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  background?: string;
  logo?: string;
  logoContentType?: string;
  organisationUnitLevel: OrganisationUnitLevel;
  parent?: OrganisationUnit;
}
