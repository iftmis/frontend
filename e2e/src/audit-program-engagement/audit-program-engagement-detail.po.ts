import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class AuditProgramEngagementDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-audit-program-engagement-detail')
  );
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  process = this.root.element(by.css('textarea[formcontrolname="process"]'));
  processLabel = this.root.element(
    by.css('textarea[formcontrolname="process"]+span mat-label')
  );

  subProcess = this.root.element(
    by.css('textarea[formcontrolname="subProcess"]')
  );
  subProcessLabel = this.root.element(
    by.css('textarea[formcontrolname="subProcess"]+span mat-label')
  );

  subSubProcess = this.root.element(
    by.css('textarea[formcontrolname="subSubProcess"]')
  );
  subSubProcessLabel = this.root.element(
    by.css('textarea[formcontrolname="subSubProcess"]+span mat-label')
  );

  auditableAreaId = this.root.element(
    by.css('mat-select[formcontrolname="auditableAreaId"]')
  );
  auditableAreaIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="auditableAreaId"]+span mat-label')
  );

  auditableAreaIdOptions = this.overlayPage.options;

  auditableAreaName = this.root.element(
    by.css('input[formcontrolname="auditableAreaName"]')
  );
  auditableAreaNameLabel = this.root.element(
    by.css('input[formcontrolname="auditableAreaName"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
