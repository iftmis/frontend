import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class TeamMeetingTimelineDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-team-meeting-timeline-detail')
  );
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  activity = this.root.element(by.css('input[formcontrolname="activity"]'));
  activityLabel = this.root.element(
    by.css('input[formcontrolname="activity"]+span mat-label')
  );

  userId = this.root.element(by.css('mat-select[formcontrolname="userId"]'));
  userIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="userId"]+span mat-label')
  );

  userIdOptions = this.overlayPage.options;

  userFullName = this.root.element(
    by.css('input[formcontrolname="userFullName"]')
  );
  userFullNameLabel = this.root.element(
    by.css('input[formcontrolname="userFullName"]+span mat-label')
  );

  comments = this.root.element(by.css('input[formcontrolname="comments"]'));
  commentsLabel = this.root.element(
    by.css('input[formcontrolname="comments"]+span mat-label')
  );

  days = this.root.element(by.css('input[formcontrolname="days"]'));
  daysLabel = this.root.element(
    by.css('input[formcontrolname="days"]+span mat-label')
  );

  teamMeetingId = this.root.element(
    by.css('mat-select[formcontrolname="teamMeetingId"]')
  );
  teamMeetingIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="teamMeetingId"]+span mat-label')
  );

  teamMeetingIdOptions = this.overlayPage.options;

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
