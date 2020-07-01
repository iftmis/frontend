import { by, element } from 'protractor';

export class SidenavPage {
  private root = element(by.css('app-sidenav mat-nav-list'));
  auditableAreaMenu = this.root.element(
    by.css('a[routerLink="/auditable-areas"]')
  );
  auditProgramEngagementMenu = this.root.element(
    by.css('a[routerLink="/audit-program-engagements"]')
  );
}
