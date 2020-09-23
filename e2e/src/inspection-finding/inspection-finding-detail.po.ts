import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionFindingDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-inspection-finding-detail')
  );
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

  condition = this.root.element(by.css('input[formcontrolname="condition"]'));
  conditionLabel = this.root.element(
    by.css('input[formcontrolname="condition"]+span mat-label')
  );

  causes = this.root.element(by.css('textarea[formcontrolname="causes"]'));
  causesLabel = this.root.element(
    by.css('textarea[formcontrolname="causes"]+span mat-label')
  );

  actionPlanCategory = this.root.element(
    by.css('mat-select[formcontrolname="actionPlanCategory"]')
  );
  actionPlanCategoryLabel = this.root.element(
    by.css('mat-select[formcontrolname="actionPlanCategory"]+span mat-label')
  );

  actionPlanCategoryOptions = this.overlayPage.options;

  categoryId = this.root.element(
    by.css('mat-select[formcontrolname="categoryId"]')
  );
  categoryIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="categoryId"]+span mat-label')
  );

  categoryIdOptions = this.overlayPage.options;

  categoryName = this.root.element(
    by.css('input[formcontrolname="categoryName"]')
  );
  categoryNameLabel = this.root.element(
    by.css('input[formcontrolname="categoryName"]+span mat-label')
  );

  subCategoryId = this.root.element(
    by.css('mat-select[formcontrolname="subCategoryId"]')
  );
  subCategoryIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="subCategoryId"]+span mat-label')
  );

  subCategoryIdOptions = this.overlayPage.options;

  subCategoryName = this.root.element(
    by.css('input[formcontrolname="subCategoryName"]')
  );
  subCategoryNameLabel = this.root.element(
    by.css('input[formcontrolname="subCategoryName"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
