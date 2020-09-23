import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionBudgetDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-inspection-budget-detail')
  );
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  gfsCodeId = this.root.element(
    by.css('mat-select[formcontrolname="gfsCodeId"]')
  );
  gfsCodeIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="gfsCodeId"]+span mat-label')
  );

  gfsCodeIdOptions = this.overlayPage.options;

  gfsCodeName = this.root.element(
    by.css('input[formcontrolname="gfsCodeName"]')
  );
  gfsCodeNameLabel = this.root.element(
    by.css('input[formcontrolname="gfsCodeName"]+span mat-label')
  );

  quantity = this.root.element(by.css('input[formcontrolname="quantity"]'));
  quantityLabel = this.root.element(
    by.css('input[formcontrolname="quantity"]+span mat-label')
  );

  frequency = this.root.element(by.css('input[formcontrolname="frequency"]'));
  frequencyLabel = this.root.element(
    by.css('input[formcontrolname="frequency"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
