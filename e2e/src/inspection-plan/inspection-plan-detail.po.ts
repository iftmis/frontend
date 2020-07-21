import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionPlanDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-inspection-plan-detail')
  );
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  FinancialYearID = this.root.element(
    by.css('mat-select[formcontrolname="FinancialYearID"]')
  );
  FinancialYearIDLabel = this.root.element(
    by.css('mat-select[formcontrolname="FinancialYearID"]+span mat-label')
  );

  FinancialYearIDOptions = this.overlayPage.options;

  financialYearName = this.root.element(
    by.css('mat-select[formcontrolname="financialYearName"]')
  );
  financialYearNameLabel = this.root.element(
    by.css('mat-select[formcontrolname="financialYearName"]+span mat-label')
  );

  financialYearNameOptions = this.overlayPage.options;

  OrganizationUnitID = this.root.element(
    by.css('mat-select[formcontrolname="OrganizationUnitID"]')
  );
  OrganizationUnitIDLabel = this.root.element(
    by.css('mat-select[formcontrolname="OrganizationUnitID"]+span mat-label')
  );

  OrganizationUnitIDOptions = this.overlayPage.options;

  OrganizationUnitName = this.root.element(
    by.css('mat-select[formcontrolname="OrganizationUnitName"]')
  );
  OrganizationUnitNameLabel = this.root.element(
    by.css('mat-select[formcontrolname="OrganizationUnitName"]+span mat-label')
  );

  OrganizationUnitNameOptions = this.overlayPage.options;

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
