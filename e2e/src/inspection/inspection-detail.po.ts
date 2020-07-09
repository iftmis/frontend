import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionDetailPage {
  private root: ElementFinder = element(by.css('.body app-inspection-detail'));
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  name = this.root.element(by.css('input[formcontrolname="name"]'));
  nameLabel = this.root.element(
    by.css('input[formcontrolname="name"]+span mat-label')
  );

  startDate = this.root.element(by.css('input[formcontrolname="startDate"]'));
  startDatePicker = this.root.element(by.css('mat-datepicker-toggle button'));
  startDateLabel = this.root.element(
    by.css('input[formcontrolname="startDate"]+mat-datepicker+span mat-label')
  );

  endDate = this.root.element(by.css('input[formcontrolname="endDate"]'));
  endDatePicker = this.root.element(by.css('mat-datepicker-toggle button'));
  endDateLabel = this.root.element(
    by.css('input[formcontrolname="endDate"]+mat-datepicker+span mat-label')
  );

  inspectionType = this.root.element(
    by.css('mat-select[formcontrolname="inspectionType"]')
  );
  inspectionTypeLabel = this.root.element(
    by.css('mat-select[formcontrolname="inspectionType"]+span mat-label')
  );

  inspectionTypeOptions = this.overlayPage.options;

  financialYearId = this.root.element(
    by.css('mat-select[formcontrolname="financialYearId"]')
  );
  financialYearIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="financialYearId"]+span mat-label')
  );

  financialYearIdOptions = this.overlayPage.options;

  financialYearName = this.root.element(
    by.css('input[formcontrolname="financialYearName"]')
  );
  financialYearNameLabel = this.root.element(
    by.css('input[formcontrolname="financialYearName"]+span mat-label')
  );

  organisationUnitId = this.root.element(
    by.css('mat-select[formcontrolname="organisationUnitId"]')
  );
  organisationUnitIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="organisationUnitId"]+span mat-label')
  );

  organisationUnitIdOptions = this.overlayPage.options;

  organisationUnitName = this.root.element(
    by.css('input[formcontrolname="organisationUnitName"]')
  );
  organisationUnitNameLabel = this.root.element(
    by.css('input[formcontrolname="organisationUnitName"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
