import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class GfsCodeDetailPage {
  private root: ElementFinder = element(by.css('.body app-gfs-code-detail'));
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

  description = this.root.element(
    by.css('textarea[formcontrolname="description"]')
  );
  descriptionLabel = this.root.element(
    by.css('textarea[formcontrolname="description"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
