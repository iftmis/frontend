import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { QuarterListPage } from './quarter-list.po';
import { SidenavPage } from '../sidenav.po';
import { QuarterDetailPage } from './quarter-detail.po';
import { QuarterDeletePage } from './quarter-delete.po';

describe('Quarter tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: QuarterListPage;
  let detailPage: QuarterDetailPage;
  let deletePage: QuarterDeletePage;
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
    listPage = new QuarterListPage();
    detailPage = new QuarterDetailPage();
    deletePage = new QuarterDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.quarterMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the quarters list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('Quarters');

    expect(await listPage.createBtn.isEnabled()).toBeTruthy();

    if (await listPage.table.noRecords.isPresent()) {
      expect(await listPage.table.noRecords.isDisplayed()).toBeTruthy();
      expect(await listPage.table.noRecords.getText()).toEqual(
        'No records found'
      );
      initialCount = 0;
    } else {
      initialCount = await listPage.table.records.count();
      expect(await listPage.table.columns.count()).toEqual(6);

      const actionsMenu = listPage.table.getActionsBtn(initialCount - 1);
      await actionsMenu.click();
      expect(await listPage.editBtn.isEnabled()).toBeTruthy();
      expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
      await listPage.hideOverlay();
    }
  });

  it('should create a new quarter', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('Quarter');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new quarter.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.codeLabel.getText()).toEqual('Code');
    await detailPage.code.sendKeys('Lorem Ipsum');

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    await detailPage.name.sendKeys('Lorem Ipsum');

    expect(await detailPage.startDateLabel.getText()).toEqual('Start Date');
    await detailPage.startDate.sendKeys('3/12/1965');

    expect(await detailPage.endDateLabel.getText()).toEqual('End Date');
    await detailPage.endDate.sendKeys('3/12/1965');

    expect(await detailPage.financialYearIdLabel.getText()).toEqual(
      'Financial Year'
    );
    await detailPage.financialYearId.click();

    await detailPage.selectAnOption(detailPage.financialYearIdOptions.last());

    expect(await detailPage.financialYearNameLabel.getText()).toEqual(
      'Financial Year'
    );
    await detailPage.financialYearName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(6);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update quarter', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('Quarter');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing quarter.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.codeLabel.getText()).toEqual('Code');
    expect(await detailPage.code.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.code.clear();
    await detailPage.code.sendKeys('Ipsum Lorem');

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    expect(await detailPage.name.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.name.clear();
    await detailPage.name.sendKeys('Ipsum Lorem');

    expect(await detailPage.startDateLabel.getText()).toEqual('Start Date');
    // expect(await detailPage.startDate.getAttribute('value')).toEqual('3/12/1965');

    expect(await detailPage.endDateLabel.getText()).toEqual('End Date');
    // expect(await detailPage.endDate.getAttribute('value')).toEqual('3/12/1965');

    expect(await detailPage.financialYearIdLabel.getText()).toEqual(
      'Financial Year'
    );
    await detailPage.financialYearId.click();

    await detailPage.selectAnOption(detailPage.financialYearIdOptions.last());

    expect(await detailPage.financialYearNameLabel.getText()).toEqual(
      'Financial Year'
    );
    expect(await detailPage.financialYearName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.financialYearName.clear();
    await detailPage.financialYearName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(6);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a quarter', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual('Delete quarter');

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
