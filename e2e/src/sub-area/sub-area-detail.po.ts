import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class SubAreaDetailPage {
  private root: ElementFinder = element(by.css('.body app-sub-area-detail'));
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

  areaId = this.root.element(by.css('mat-select[formcontrolname="areaId"]'));
  areaIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="areaId"]+span mat-label')
  );

  areaIdOptions = this.overlayPage.options;

  areaName = this.root.element(by.css('input[formcontrolname="areaName"]'));
  areaNameLabel = this.root.element(
    by.css('input[formcontrolname="areaName"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
