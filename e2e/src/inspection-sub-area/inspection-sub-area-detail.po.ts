import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionSubAreaDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-inspection-sub-area-detail')
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

  inspectionObjectiveId = this.root.element(
    by.css('mat-select[formcontrolname="inspectionObjectiveId"]')
  );
  inspectionObjectiveIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="inspectionObjectiveId"]+span mat-label')
  );

  inspectionObjectiveIdOptions = this.overlayPage.options;

  inspectionObjectiveName = this.root.element(
    by.css('input[formcontrolname="inspectionObjectiveName"]')
  );
  inspectionObjectiveNameLabel = this.root.element(
    by.css('input[formcontrolname="inspectionObjectiveName"]+span mat-label')
  );

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

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
