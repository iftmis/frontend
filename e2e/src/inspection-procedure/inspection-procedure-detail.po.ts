import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionProcedureDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-inspection-procedure-detail')
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

  inspectionIndicatorId = this.root.element(
    by.css('mat-select[formcontrolname="inspectionIndicatorId"]')
  );
  inspectionIndicatorIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="inspectionIndicatorId"]+span mat-label')
  );

  inspectionIndicatorIdOptions = this.overlayPage.options;

  inspectionIndicatorName = this.root.element(
    by.css('input[formcontrolname="inspectionIndicatorName"]')
  );
  inspectionIndicatorNameLabel = this.root.element(
    by.css('input[formcontrolname="inspectionIndicatorName"]+span mat-label')
  );

  indicatorId = this.root.element(
    by.css('mat-select[formcontrolname="indicatorId"]')
  );
  indicatorIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="indicatorId"]+span mat-label')
  );

  indicatorIdOptions = this.overlayPage.options;

  indicatorName = this.root.element(
    by.css('input[formcontrolname="indicatorName"]')
  );
  indicatorNameLabel = this.root.element(
    by.css('input[formcontrolname="indicatorName"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
