import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionActivitiesDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-inspection-activities-detail')
  );
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  objectiveId = this.root.element(
    by.css('mat-select[formcontrolname="objectiveId"]')
  );
  objectiveIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="objectiveId"]+span mat-label')
  );

  objectiveIdOptions = this.overlayPage.options;

  objectiveName = this.root.element(
    by.css('input[formcontrolname="objectiveName"]')
  );
  objectiveNameLabel = this.root.element(
    by.css('input[formcontrolname="objectiveName"]+span mat-label')
  );

  auditableAreaId = this.root.element(
    by.css('mat-select[formcontrolname="auditableAreaId"]')
  );
  auditableAreaIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="auditableAreaId"]+span mat-label')
  );

  auditableAreaIdOptions = this.overlayPage.options;

  auditableAreaName = this.root.element(
    by.css('input[formcontrolname="auditableAreaName"]')
  );
  auditableAreaNameLabel = this.root.element(
    by.css('input[formcontrolname="auditableAreaName"]+span mat-label')
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

  activity = this.root.element(by.css('input[formcontrolname="activity"]'));
  activityLabel = this.root.element(
    by.css('input[formcontrolname="activity"]+span mat-label')
  );

  quarter1 = this.root.element(by.css('input[formcontrolname="quarter1"]'));
  quarter1Label = this.root.element(
    by.css('input[formcontrolname="quarter1"]+span mat-label')
  );

  quarter2 = this.root.element(by.css('input[formcontrolname="quarter2"]'));
  quarter2Label = this.root.element(
    by.css('input[formcontrolname="quarter2"]+span mat-label')
  );

  quarter3 = this.root.element(by.css('input[formcontrolname="quarter3"]'));
  quarter3Label = this.root.element(
    by.css('input[formcontrolname="quarter3"]+span mat-label')
  );

  quarter4 = this.root.element(by.css('input[formcontrolname="quarter4"]'));
  quarter4Label = this.root.element(
    by.css('input[formcontrolname="quarter4"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
