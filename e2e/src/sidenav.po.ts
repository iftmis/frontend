import { by, element } from 'protractor';

export class SidenavPage {
  private root = element(by.css('app-sidenav mat-nav-list'));
  auditableAreaMenu = this.root.element(
    by.css('a[routerLink="/auditable-areas"]')
  );
  auditProgramEngagementMenu = this.root.element(
    by.css('a[routerLink="/audit-program-engagements"]')
  );
  categoryOfFindingMenu = this.root.element(
    by.css('a[routerLink="/category-of-findings"]')
  );
  organisationUnitLevelMenu = this.root.element(
    by.css('a[routerLink="/organisation-unit-levels"]')
  );
  organisationUnitMenu = this.root.element(
    by.css('a[routerLink="/organisation-units"]')
  );
  gfsCodeMenu = this.root.element(by.css('a[routerLink="/gfs-codes"]'));
  findingCategoryMenu = this.root.element(
    by.css('a[routerLink="/finding-categorys"]')
  );
}
financialYearMenu = this.root.element(
  by.css('a[routerLink="/financial-years"]')
);
