import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { TeamMeetingTimelineListPage } from './team-meeting-timeline-list.po';
import { SidenavPage } from '../sidenav.po';
import { TeamMeetingTimelineDetailPage } from './team-meeting-timeline-detail.po';
import { TeamMeetingTimelineDeletePage } from './team-meeting-timeline-delete.po';

describe('TeamMeetingTimeline tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: TeamMeetingTimelineListPage;
  let detailPage: TeamMeetingTimelineDetailPage;
  let deletePage: TeamMeetingTimelineDeletePage;
  let initialCount: number;

  beforeAll(async () => {
    headerPage = new HeaderPage();
    loginPage = new LoginPage();
    sidenavPage = new SidenavPage();

    await headerPage.navigateTo();
    expect(await headerPage.loginMenu.isDisplayed()).toBeTruthy();

    await headerPage.loginMenu.click();
    await loginPage.login();

    expect(await headerPage.loginMenu.isPresent()).toBeFalsy();
    expect(await headerPage.appMenu.isDisplayed()).toBeTruthy();
    expect(await headerPage.accountMenu.isDisplayed()).toBeTruthy();
  });

  afterAll(async () => {
    expect(await headerPage.accountMenu.isDisplayed()).toBeTruthy();

    await waitAndClick(headerPage.accountMenu);
    await waitAndClick(headerPage.logoutMenu);

    expect(await headerPage.loginMenu.isDisplayed()).toBeTruthy();
    expect(await headerPage.appMenu.isPresent()).toBeFalsy();
    expect(await headerPage.accountMenu.isPresent()).toBeFalsy();
  });

  beforeEach(() => {
    headerPage = new HeaderPage();
    sidenavPage = new SidenavPage();
    listPage = new TeamMeetingTimelineListPage();
    detailPage = new TeamMeetingTimelineDetailPage();
    deletePage = new TeamMeetingTimelineDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.teamMeetingTimelineMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the team-meeting-timelines list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('TeamMeetingTimelines');

    expect(await listPage.createBtn.isEnabled()).toBeTruthy();

    if (await listPage.table.noRecords.isPresent()) {
      expect(await listPage.table.noRecords.isDisplayed()).toBeTruthy();
      expect(await listPage.table.noRecords.getText()).toEqual(
        'No records found'
      );
      initialCount = 0;
    } else {
      initialCount = await listPage.table.records.count();
      expect(await listPage.table.columns.count()).toEqual(5);

      const actionsMenu = listPage.table.getActionsBtn(initialCount - 1);
      await actionsMenu.click();
      expect(await listPage.editBtn.isEnabled()).toBeTruthy();
      expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
      await listPage.hideOverlay();
    }
  });

  it('should create a new team-meeting-timeline', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('TeamMeetingTimeline');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new teamMeetingTimeline.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.activityLabel.getText()).toEqual('Activity');
    await detailPage.activity.sendKeys('Lorem Ipsum');

    expect(await detailPage.userIdLabel.getText()).toEqual('User');
    await detailPage.userId.click();

    await detailPage.selectAnOption(detailPage.userIdOptions.last());

    expect(await detailPage.userFullNameLabel.getText()).toEqual('User');
    await detailPage.userFullName.sendKeys('Lorem Ipsum');

    expect(await detailPage.commentsLabel.getText()).toEqual('Comments');
    await detailPage.comments.sendKeys('Lorem Ipsum');

    expect(await detailPage.daysLabel.getText()).toEqual('Days');
    await detailPage.days.sendKeys('');

    expect(await detailPage.teamMeetingIdLabel.getText()).toEqual(
      'TeamMeeting'
    );
    await detailPage.teamMeetingId.click();

    await detailPage.selectAnOption(detailPage.teamMeetingIdOptions.last());

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update team-meeting-timeline', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('TeamMeetingTimeline');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing teamMeetingTimeline.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.activityLabel.getText()).toEqual('Activity');
    expect(await detailPage.activity.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.activity.clear();
    await detailPage.activity.sendKeys('Ipsum Lorem');

    expect(await detailPage.userIdLabel.getText()).toEqual('User');
    await detailPage.userId.click();

    await detailPage.selectAnOption(detailPage.userIdOptions.last());

    expect(await detailPage.userFullNameLabel.getText()).toEqual('User');
    expect(await detailPage.userFullName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.userFullName.clear();
    await detailPage.userFullName.sendKeys('Ipsum Lorem');

    expect(await detailPage.commentsLabel.getText()).toEqual('Comments');
    expect(await detailPage.comments.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.comments.clear();
    await detailPage.comments.sendKeys('Ipsum Lorem');

    expect(await detailPage.daysLabel.getText()).toEqual('Days');
    expect(await detailPage.days.getAttribute('value')).toEqual('');
    await detailPage.days.clear();
    await detailPage.days.sendKeys('');

    expect(await detailPage.teamMeetingIdLabel.getText()).toEqual(
      'TeamMeeting'
    );
    await detailPage.teamMeetingId.click();

    await detailPage.selectAnOption(detailPage.teamMeetingIdOptions.last());

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a team-meeting-timeline', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete team-meeting-timeline'
    );

    expect(await deletePage.noBtn.isEnabled()).toBeTruthy();
    expect(await deletePage.yesBtn.isEnabled()).toBeTruthy();
    await deletePage.yesBtn.click();

    if (initialCount === 0) {
      expect(await listPage.table.noRecords.isDisplayed()).toBeTruthy();
      expect(await listPage.table.noRecords.getText()).toEqual(
        'No records found'
      );
    } else {
      const afterPageRecords = await listPage.table.records.count();
      expect(afterPageRecords).toEqual(initialCount);
    }
  });
});
