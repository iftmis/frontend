import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { AuditProgramEngagementListPage } from './audit-program-engagement-list.po';
import { SidenavPage } from '../sidenav.po';
import { AuditProgramEngagementDetailPage } from './audit-program-engagement-detail.po';
import { AuditProgramEngagementDeletePage } from './audit-program-engagement-delete.po';

describe('AuditProgramEngagement tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: AuditProgramEngagementListPage;
  let detailPage: AuditProgramEngagementDetailPage;
  let deletePage: AuditProgramEngagementDeletePage;
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
    listPage = new AuditProgramEngagementListPage();
    detailPage = new AuditProgramEngagementDetailPage();
    deletePage = new AuditProgramEngagementDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.auditProgramEngagementMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the audit-program-engagements list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual(
      'AuditProgramEngagements'
    );

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

  it('should create a new audit-program-engagement', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual(
      'AuditProgramEngagement'
    );
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new auditProgramEngagement.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.processLabel.getText()).toEqual('Process');
    await detailPage.process.sendKeys('Lorem Ipsum');

    expect(await detailPage.subProcessLabel.getText()).toEqual('Sub Process');
    await detailPage.subProcess.sendKeys('Lorem Ipsum');

    expect(await detailPage.subSubProcessLabel.getText()).toEqual(
      'Sub Sub Process'
    );
    await detailPage.subSubProcess.sendKeys('Lorem Ipsum');

    expect(await detailPage.auditableAreaIdLabel.getText()).toEqual(
      'AuditableArea'
    );
    await detailPage.auditableAreaId.click();

    await detailPage.selectAnOption(detailPage.auditableAreaIdOptions.last());

    expect(await detailPage.auditableAreaNameLabel.getText()).toEqual(
      'AuditableArea'
    );
    await detailPage.auditableAreaName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update audit-program-engagement', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual(
      'AuditProgramEngagement'
    );
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing auditProgramEngagement.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.processLabel.getText()).toEqual('Process');
    expect(await detailPage.process.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.process.clear();
    await detailPage.process.sendKeys('Ipsum Lorem');

    expect(await detailPage.subProcessLabel.getText()).toEqual('Sub Process');
    expect(await detailPage.subProcess.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.subProcess.clear();
    await detailPage.subProcess.sendKeys('Ipsum Lorem');

    expect(await detailPage.subSubProcessLabel.getText()).toEqual(
      'Sub Sub Process'
    );
    expect(await detailPage.subSubProcess.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.subSubProcess.clear();
    await detailPage.subSubProcess.sendKeys('Ipsum Lorem');

    expect(await detailPage.auditableAreaIdLabel.getText()).toEqual(
      'AuditableArea'
    );
    await detailPage.auditableAreaId.click();

    await detailPage.selectAnOption(detailPage.auditableAreaIdOptions.last());

    expect(await detailPage.auditableAreaNameLabel.getText()).toEqual(
      'AuditableArea'
    );
    expect(await detailPage.auditableAreaName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.auditableAreaName.clear();
    await detailPage.auditableAreaName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a audit-program-engagement', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete audit-program-engagement'
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
