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
  organisationUnitLevelId?: number;
  organisationUnitLevelName?: string;
  parentId?: number;
  parentName?: string;
}
