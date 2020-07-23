import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { InspectionPlanListPage } from './inspection-plan-list.po';
import { SidenavPage } from '../sidenav.po';
import { InspectionPlanDetailPage } from './inspection-plan-detail.po';
import { InspectionPlanDeletePage } from './inspection-plan-delete.po';

describe('InspectionPlan tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: InspectionPlanListPage;
  let detailPage: InspectionPlanDetailPage;
  let deletePage: InspectionPlanDeletePage;
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
    listPage = new InspectionPlanListPage();
    detailPage = new InspectionPlanDetailPage();
    deletePage = new InspectionPlanDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.inspectionPlanMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the inspection-plans list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('InspectionPlans');

    expect(await listPage.createBtn.isEnabled()).toBeTruthy();

    if (await listPage.table.noRecords.isPresent()) {
      expect(await listPage.table.noRecords.isDisplayed()).toBeTruthy();
      expect(await listPage.table.noRecords.getText()).toEqual(
        'No records found'
      );
      initialCount = 0;
    } else {
      initialCount = await listPage.table.records.count();
      expect(await listPage.table.columns.count()).toEqual(3);

      const actionsMenu = listPage.table.getActionsBtn(initialCount - 1);
      await actionsMenu.click();
      expect(await listPage.editBtn.isEnabled()).toBeTruthy();
      expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
      await listPage.hideOverlay();
    }
  });

  it('should create a new inspection-plan', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionPlan');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new InspectionPlan.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.FinancialYearIDLabel.getText()).toEqual(
      'Financial Year'
    );
    await detailPage.FinancialYearID.click();

    await detailPage.selectAnOption(detailPage.FinancialYearIDOptions.last());

    expect(await detailPage.financialYearNameLabel.getText()).toEqual(
      'Financial Year'
    );
    await detailPage.financialYearName.sendKeys('Lorem Ipsum');

    expect(await detailPage.OrganizationUnitIDLabel.getText()).toEqual(
      'Organization Unit'
    );
    await detailPage.OrganizationUnitID.sendKeys('');

    expect(await detailPage.OrganizationUnitNameLabel.getText()).toEqual(
      'Organization Unit'
    );
    await detailPage.OrganizationUnitName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(3);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update inspection-plan', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionPlan');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing InspectionPlan.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.FinancialYearIDLabel.getText()).toEqual(
      'Financial Year'
    );
    await detailPage.FinancialYearID.click();

    await detailPage.selectAnOption(detailPage.FinancialYearIDOptions.last());

    expect(await detailPage.financialYearNameLabel.getText()).toEqual(
      'Financial Year'
    );
    expect(await detailPage.financialYearName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.financialYearName.clear();
    await detailPage.financialYearName.sendKeys('Ipsum Lorem');

    expect(await detailPage.OrganizationUnitIDLabel.getText()).toEqual(
      'Organization Unit'
    );
    expect(await detailPage.OrganizationUnitID.getAttribute('value')).toEqual(
      ''
    );
    await detailPage.OrganizationUnitID.clear();
    await detailPage.OrganizationUnitID.sendKeys('');

    expect(await detailPage.OrganizationUnitNameLabel.getText()).toEqual(
      'Organization Unit'
    );
    expect(await detailPage.OrganizationUnitName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.OrganizationUnitName.clear();
    await detailPage.OrganizationUnitName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(3);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should confirmation a inspection-plan', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual('Delete inspection-plan');

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
