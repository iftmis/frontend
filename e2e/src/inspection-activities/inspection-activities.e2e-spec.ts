import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { InspectionActivitiesListPage } from './inspection-activities-list.po';
import { SidenavPage } from '../sidenav.po';
import { InspectionActivitiesDetailPage } from './inspection-activities-detail.po';
import { InspectionActivitiesDeletePage } from './inspection-activities-delete.po';

describe('InspectionActivities tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: InspectionActivitiesListPage;
  let detailPage: InspectionActivitiesDetailPage;
  let deletePage: InspectionActivitiesDeletePage;
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
    listPage = new InspectionActivitiesListPage();
    detailPage = new InspectionActivitiesDetailPage();
    deletePage = new InspectionActivitiesDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.inspectionActivitiesMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the inspection-activities list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('InspectionActivities');

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

  it('should create a new inspection-activities', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual(
      'InspectionActivities'
    );
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new inspectionActivities.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.objectiveIdLabel.getText()).toEqual('Objective');
    await detailPage.objectiveId.click();

    await detailPage.selectAnOption(detailPage.objectiveIdOptions.last());

    expect(await detailPage.objectiveNameLabel.getText()).toEqual('Objective');
    await detailPage.objectiveName.sendKeys('Lorem Ipsum');

    expect(await detailPage.auditableAreaIdLabel.getText()).toEqual(
      'Auditable Area'
    );
    await detailPage.auditableAreaId.click();

    await detailPage.selectAnOption(detailPage.auditableAreaIdOptions.last());

    expect(await detailPage.auditableAreaNameLabel.getText()).toEqual(
      'Auditable Area'
    );
    await detailPage.auditableAreaName.sendKeys('Lorem Ipsum');

    expect(await detailPage.subAreaIdLabel.getText()).toEqual('Sub Area');
    await detailPage.subAreaId.click();

    await detailPage.selectAnOption(detailPage.subAreaIdOptions.last());

    expect(await detailPage.subAreaNameLabel.getText()).toEqual('Sub Area');
    await detailPage.subAreaName.sendKeys('Lorem Ipsum');

    expect(await detailPage.activityLabel.getText()).toEqual('Activity');
    await detailPage.activity.sendKeys('Lorem Ipsum');

    expect(await detailPage.quarter1Label.getText()).toEqual('Quarter 1');
    await detailPage.quarter1.sendKeys('Lorem Ipsum');

    expect(await detailPage.quarter2Label.getText()).toEqual('Quarter 2');
    await detailPage.quarter2.sendKeys('Lorem Ipsum');

    expect(await detailPage.quarter3Label.getText()).toEqual('Quarter 3');
    await detailPage.quarter3.sendKeys('Lorem Ipsum');

    expect(await detailPage.quarter4Label.getText()).toEqual('Quarter 4');
    await detailPage.quarter4.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update inspection-activities', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual(
      'InspectionActivities'
    );
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing inspectionActivities.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.objectiveIdLabel.getText()).toEqual('Objective');
    await detailPage.objectiveId.click();

    await detailPage.selectAnOption(detailPage.objectiveIdOptions.last());

    expect(await detailPage.objectiveNameLabel.getText()).toEqual('Objective');
    expect(await detailPage.objectiveName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.objectiveName.clear();
    await detailPage.objectiveName.sendKeys('Ipsum Lorem');

    expect(await detailPage.auditableAreaIdLabel.getText()).toEqual(
      'Auditable Area'
    );
    await detailPage.auditableAreaId.click();

    await detailPage.selectAnOption(detailPage.auditableAreaIdOptions.last());

    expect(await detailPage.auditableAreaNameLabel.getText()).toEqual(
      'Auditable Area'
    );
    expect(await detailPage.auditableAreaName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.auditableAreaName.clear();
    await detailPage.auditableAreaName.sendKeys('Ipsum Lorem');

    expect(await detailPage.subAreaIdLabel.getText()).toEqual('Sub Area');
    await detailPage.subAreaId.click();

    await detailPage.selectAnOption(detailPage.subAreaIdOptions.last());

    expect(await detailPage.subAreaNameLabel.getText()).toEqual('Sub Area');
    expect(await detailPage.subAreaName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.subAreaName.clear();
    await detailPage.subAreaName.sendKeys('Ipsum Lorem');

    expect(await detailPage.activityLabel.getText()).toEqual('Activity');
    expect(await detailPage.activity.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.activity.clear();
    await detailPage.activity.sendKeys('Ipsum Lorem');

    expect(await detailPage.quarter1Label.getText()).toEqual('Quarter 1');
    expect(await detailPage.quarter1.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.quarter1.clear();
    await detailPage.quarter1.sendKeys('Ipsum Lorem');

    expect(await detailPage.quarter2Label.getText()).toEqual('Quarter 2');
    expect(await detailPage.quarter2.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.quarter2.clear();
    await detailPage.quarter2.sendKeys('Ipsum Lorem');

    expect(await detailPage.quarter3Label.getText()).toEqual('Quarter 3');
    expect(await detailPage.quarter3.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.quarter3.clear();
    await detailPage.quarter3.sendKeys('Ipsum Lorem');

    expect(await detailPage.quarter4Label.getText()).toEqual('Quarter 4');
    expect(await detailPage.quarter4.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.quarter4.clear();
    await detailPage.quarter4.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a inspection-activities', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete inspection-activities'
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
