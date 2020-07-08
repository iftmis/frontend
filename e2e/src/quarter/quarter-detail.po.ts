import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class QuarterDetailPage {
  private root: ElementFinder = element(by.css('.body app-quarter-detail'));
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  code = this.root.element(by.css('input[formcontrolname="code"]'));
  codeLabel = this.root.element(
    by.css('input[formcontrolname="code"]+span mat-label')
  );

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

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
