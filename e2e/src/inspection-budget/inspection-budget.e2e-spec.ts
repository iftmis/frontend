import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { InspectionBudgetListPage } from './inspection-budget-list.po';
import { SidenavPage } from '../sidenav.po';
import { InspectionBudgetDetailPage } from './inspection-budget-detail.po';
import { InspectionBudgetDeletePage } from './inspection-budget-delete.po';

describe('InspectionBudget tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: InspectionBudgetListPage;
  let detailPage: InspectionBudgetDetailPage;
  let deletePage: InspectionBudgetDeletePage;
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
    listPage = new InspectionBudgetListPage();
    detailPage = new InspectionBudgetDetailPage();
    deletePage = new InspectionBudgetDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.inspectionBudgetMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the inspection-budgets list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('InspectionBudgets');

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

  it('should create a new inspection-budget', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionBudget');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new inspectionBudget.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.gfsCodeIdLabel.getText()).toEqual('Gfs Code');
    await detailPage.gfsCodeId.click();

    await detailPage.selectAnOption(detailPage.gfsCodeIdOptions.last());

    expect(await detailPage.gfsCodeNameLabel.getText()).toEqual('Gfs Code');
    await detailPage.gfsCodeName.sendKeys('Lorem Ipsum');

    expect(await detailPage.quantityLabel.getText()).toEqual('Quantity');
    await detailPage.quantity.sendKeys('');

    expect(await detailPage.frequencyLabel.getText()).toEqual('Frequency');
    await detailPage.frequency.sendKeys('');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update inspection-budget', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionBudget');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing inspectionBudget.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.gfsCodeIdLabel.getText()).toEqual('Gfs Code');
    await detailPage.gfsCodeId.click();

    await detailPage.selectAnOption(detailPage.gfsCodeIdOptions.last());

    expect(await detailPage.gfsCodeNameLabel.getText()).toEqual('Gfs Code');
    expect(await detailPage.gfsCodeName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.gfsCodeName.clear();
    await detailPage.gfsCodeName.sendKeys('Ipsum Lorem');

    expect(await detailPage.quantityLabel.getText()).toEqual('Quantity');
    expect(await detailPage.quantity.getAttribute('value')).toEqual('');
    await detailPage.quantity.clear();
    await detailPage.quantity.sendKeys('');

    expect(await detailPage.frequencyLabel.getText()).toEqual('Frequency');
    expect(await detailPage.frequency.getAttribute('value')).toEqual('');
    await detailPage.frequency.clear();
    await detailPage.frequency.sendKeys('');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a inspection-budget', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete inspection-budget'
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
