import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionWorkDoneDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-inspection-work-done-detail')
  );
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

  result = this.root.element(by.css('textarea[formcontrolname="result"]'));
  resultLabel = this.root.element(
    by.css('textarea[formcontrolname="result"]+span mat-label')
  );

  fileResourceId = this.root.element(
    by.css('mat-select[formcontrolname="fileResourceId"]')
  );
  fileResourceIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="fileResourceId"]+span mat-label')
  );

  fileResourceIdOptions = this.overlayPage.options;

  fileResourceContentId = this.root.element(
    by.css('input[formcontrolname="fileResourceContentId"]')
  );
  fileResourceContentIdLabel = this.root.element(
    by.css('input[formcontrolname="fileResourceContentId"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
