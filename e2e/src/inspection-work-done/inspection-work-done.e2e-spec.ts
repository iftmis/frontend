import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { InspectionWorkDoneListPage } from './inspection-work-done-list.po';
import { SidenavPage } from '../sidenav.po';
import { InspectionWorkDoneDetailPage } from './inspection-work-done-detail.po';
import { InspectionWorkDoneDeletePage } from './inspection-work-done-delete.po';

describe('InspectionWorkDone tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: InspectionWorkDoneListPage;
  let detailPage: InspectionWorkDoneDetailPage;
  let deletePage: InspectionWorkDoneDeletePage;
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
    listPage = new InspectionWorkDoneListPage();
    detailPage = new InspectionWorkDoneDetailPage();
    deletePage = new InspectionWorkDoneDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.inspectionWorkDoneMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the inspection-work-dones list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('InspectionWorkDones');

    expect(await listPage.createBtn.isEnabled()).toBeTruthy();

    if (await listPage.table.noRecords.isPresent()) {
      expect(await listPage.table.noRecords.isDisplayed()).toBeTruthy();
      expect(await listPage.table.noRecords.getText()).toEqual(
        'No records found'
      );
      initialCount = 0;
    } else {
      initialCount = await listPage.table.records.count();
      expect(await listPage.table.columns.count()).toEqual(1);

      const actionsMenu = listPage.table.getActionsBtn(initialCount - 1);
      await actionsMenu.click();
      expect(await listPage.editBtn.isEnabled()).toBeTruthy();
      expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
      await listPage.hideOverlay();
    }
  });

  it('should create a new inspection-work-done', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionWorkDone');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new inspectionWorkDone.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    await detailPage.name.sendKeys('Lorem Ipsum');

    expect(await detailPage.resultLabel.getText()).toEqual('Results');
    await detailPage.result.sendKeys('Lorem Ipsum');

    expect(await detailPage.fileResourceIdLabel.getText()).toEqual(
      'Attachment'
    );
    await detailPage.fileResourceId.click();

    await detailPage.selectAnOption(detailPage.fileResourceIdOptions.last());

    expect(await detailPage.fileResourceContentIdLabel.getText()).toEqual(
      'Attachment'
    );
    await detailPage.fileResourceContentId.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(1);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update inspection-work-done', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionWorkDone');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing inspectionWorkDone.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    expect(await detailPage.name.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.name.clear();
    await detailPage.name.sendKeys('Ipsum Lorem');

    expect(await detailPage.resultLabel.getText()).toEqual('Results');
    expect(await detailPage.result.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.result.clear();
    await detailPage.result.sendKeys('Ipsum Lorem');

    expect(await detailPage.fileResourceIdLabel.getText()).toEqual(
      'Attachment'
    );
    await detailPage.fileResourceId.click();

    await detailPage.selectAnOption(detailPage.fileResourceIdOptions.last());

    expect(await detailPage.fileResourceContentIdLabel.getText()).toEqual(
      'Attachment'
    );
    expect(
      await detailPage.fileResourceContentId.getAttribute('value')
    ).toEqual('Lorem Ipsum');
    await detailPage.fileResourceContentId.clear();
    await detailPage.fileResourceContentId.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(1);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a inspection-work-done', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete inspection-work-done'
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
