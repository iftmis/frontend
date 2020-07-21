import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class OrganisationUnitLevelDetailPage {
  private root: ElementFinder = element(by.css('.body app-finding-detail'));
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

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
