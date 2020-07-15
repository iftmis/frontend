import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class RiskDetailPage {
  private root: ElementFinder = element(by.css('.body app-risk-detail'));
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
    by.css('input[formcontrolname="description"]')
  );
  descriptionLabel = this.root.element(
    by.css('input[formcontrolname="description"]+span mat-label')
  );

  riskRegisterId = this.root.element(
    by.css('mat-select[formcontrolname="riskRegisterId"]')
  );
  riskRegisterIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="riskRegisterId"]+span mat-label')
  );

  riskRegisterIdOptions = this.overlayPage.options;

  riskRegisterName = this.root.element(
    by.css('input[formcontrolname="riskRegisterName"]')
  );
  riskRegisterNameLabel = this.root.element(
    by.css('input[formcontrolname="riskRegisterName"]+span mat-label')
  );

  objectiveId = this.root.element(
    by.css('mat-select[formcontrolname="objectiveId"]')
  );
  objectiveIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="objectiveId"]+span mat-label')
  );

  objectiveIdOptions = this.overlayPage.options;

  objectiveDescription = this.root.element(
    by.css('input[formcontrolname="objectiveDescription"]')
  );
  objectiveDescriptionLabel = this.root.element(
    by.css('input[formcontrolname="objectiveDescription"]+span mat-label')
  );

  riskCategoryId = this.root.element(
    by.css('mat-select[formcontrolname="riskCategoryId"]')
  );
  riskCategoryIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="riskCategoryId"]+span mat-label')
  );

  riskCategoryIdOptions = this.overlayPage.options;

  riskCategoryName = this.root.element(
    by.css('input[formcontrolname="riskCategoryName"]')
  );
  riskCategoryNameLabel = this.root.element(
    by.css('input[formcontrolname="riskCategoryName"]+span mat-label')
  );

  riskOwnerId = this.root.element(
    by.css('mat-select[formcontrolname="riskOwnerId"]')
  );
  riskOwnerIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="riskOwnerId"]+span mat-label')
  );

  riskOwnerIdOptions = this.overlayPage.options;

  riskOwnerName = this.root.element(
    by.css('input[formcontrolname="riskOwnerName"]')
  );
  riskOwnerNameLabel = this.root.element(
    by.css('input[formcontrolname="riskOwnerName"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
