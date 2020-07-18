import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionObjectiveDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-inspection-objective-detail')
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

  inspectionAreaId = this.root.element(
    by.css('mat-select[formcontrolname="inspectionAreaId"]')
  );
  inspectionAreaIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="inspectionAreaId"]+span mat-label')
  );

  inspectionAreaIdOptions = this.overlayPage.options;

  inspectionAreaName = this.root.element(
    by.css('input[formcontrolname="inspectionAreaName"]')
  );
  inspectionAreaNameLabel = this.root.element(
    by.css('input[formcontrolname="inspectionAreaName"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
