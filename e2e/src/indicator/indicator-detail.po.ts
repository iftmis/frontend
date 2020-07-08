import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class IndicatorDetailPage {
  private root: ElementFinder = element(by.css('.body app-indicator-detail'));
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  subAreaId = this.root.element(
    by.css('mat-select[formcontrolname="subAreaId"]')
  );
  subAreaIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="subAreaId"]+span mat-label')
  );

  subAreaIdOptions = this.overlayPage.options;

  subAreaName = this.root.element(
    by.css('input[formcontrolname="subAreaName"]')
  );
  subAreaNameLabel = this.root.element(
    by.css('input[formcontrolname="subAreaName"]+span mat-label')
  );

  name = this.root.element(by.css('input[formcontrolname="name"]'));
  nameLabel = this.root.element(
    by.css('input[formcontrolname="name"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
