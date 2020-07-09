import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { InspectionListPage } from './inspection-list.po';
import { SidenavPage } from '../sidenav.po';
import { InspectionDetailPage } from './inspection-detail.po';
import { InspectionDeletePage } from './inspection-delete.po';

describe('Inspection tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: InspectionListPage;
  let detailPage: InspectionDetailPage;
  let deletePage: InspectionDeletePage;
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
    listPage = new InspectionListPage();
    detailPage = new InspectionDetailPage();
    deletePage = new InspectionDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.inspectionMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the inspections list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('Inspections');

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

  it('should create a new inspection', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('Inspection');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new inspection.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    await detailPage.name.sendKeys('Lorem Ipsum');

    expect(await detailPage.startDateLabel.getText()).toEqual('Start date');
    await detailPage.startDate.sendKeys('3/12/1965');

    expect(await detailPage.endDateLabel.getText()).toEqual('End Date');
    await detailPage.endDate.sendKeys('3/12/1965');

    expect(await detailPage.inspectionTypeLabel.getText()).toEqual(
      'Inspection Type'
    );
    await detailPage.inspectionType.click();

    await detailPage.selectAnOption(detailPage.inspectionTypeOptions.last());

    expect(await detailPage.financialYearIdLabel.getText()).toEqual(
      'Financial Year'
    );
    await detailPage.financialYearId.click();

    await detailPage.selectAnOption(detailPage.financialYearIdOptions.last());

    expect(await detailPage.financialYearNameLabel.getText()).toEqual(
      'Financial Year'
    );
    await detailPage.financialYearName.sendKeys('Lorem Ipsum');

    expect(await detailPage.organisationUnitIdLabel.getText()).toEqual(
      'Organisation Unit'
    );
    await detailPage.organisationUnitId.click();

    await detailPage.selectAnOption(
      detailPage.organisationUnitIdOptions.last()
    );

    expect(await detailPage.organisationUnitNameLabel.getText()).toEqual(
      'Organisation Unit'
    );
    await detailPage.organisationUnitName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update inspection', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('Inspection');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing inspection.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    expect(await detailPage.name.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.name.clear();
    await detailPage.name.sendKeys('Ipsum Lorem');

    expect(await detailPage.startDateLabel.getText()).toEqual('Start date');
    // expect(await detailPage.startDate.getAttribute('value')).toEqual('3/12/1965');

    expect(await detailPage.endDateLabel.getText()).toEqual('End Date');
    // expect(await detailPage.endDate.getAttribute('value')).toEqual('3/12/1965');

    expect(await detailPage.inspectionTypeLabel.getText()).toEqual(
      'Inspection Type'
    );
    await detailPage.inspectionType.click();

    await detailPage.selectAnOption(detailPage.inspectionTypeOptions.last());

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

    expect(await detailPage.organisationUnitIdLabel.getText()).toEqual(
      'Organisation Unit'
    );
    await detailPage.organisationUnitId.click();

    await detailPage.selectAnOption(
      detailPage.organisationUnitIdOptions.last()
    );

    expect(await detailPage.organisationUnitNameLabel.getText()).toEqual(
      'Organisation Unit'
    );
    expect(await detailPage.organisationUnitName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.organisationUnitName.clear();
    await detailPage.organisationUnitName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(5);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a inspection', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual('Delete inspection');

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
