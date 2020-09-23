import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { InspectionSubAreaListPage } from './inspection-sub-area-list.po';
import { SidenavPage } from '../sidenav.po';
import { InspectionSubAreaDetailPage } from './inspection-sub-area-detail.po';
import { InspectionSubAreaDeletePage } from './inspection-sub-area-delete.po';

describe('InspectionSubArea tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: InspectionSubAreaListPage;
  let detailPage: InspectionSubAreaDetailPage;
  let deletePage: InspectionSubAreaDeletePage;
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
    listPage = new InspectionSubAreaListPage();
    detailPage = new InspectionSubAreaDetailPage();
    deletePage = new InspectionSubAreaDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.inspectionSubAreaMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the inspection-sub-areas list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('InspectionSubAreas');

    expect(await listPage.createBtn.isEnabled()).toBeTruthy();

    if (await listPage.table.noRecords.isPresent()) {
      expect(await listPage.table.noRecords.isDisplayed()).toBeTruthy();
      expect(await listPage.table.noRecords.getText()).toEqual(
        'No records found'
      );
      initialCount = 0;
    } else {
      initialCount = await listPage.table.records.count();
      expect(await listPage.table.columns.count()).toEqual(2);

      const actionsMenu = listPage.table.getActionsBtn(initialCount - 1);
      await actionsMenu.click();
      expect(await listPage.editBtn.isEnabled()).toBeTruthy();
      expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
      await listPage.hideOverlay();
    }
  });

  it('should create a new inspection-sub-area', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionSubArea');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new inspectionSubArea.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    await detailPage.name.sendKeys('Lorem Ipsum');

    expect(await detailPage.inspectionObjectiveIdLabel.getText()).toEqual(
      'Inspection Objective'
    );
    await detailPage.inspectionObjectiveId.click();

    await detailPage.selectAnOption(
      detailPage.inspectionObjectiveIdOptions.last()
    );

    expect(await detailPage.inspectionObjectiveNameLabel.getText()).toEqual(
      'Inspection Objective'
    );
    await detailPage.inspectionObjectiveName.sendKeys('Lorem Ipsum');

    expect(await detailPage.subAreaIdLabel.getText()).toEqual('Sub Area');
    await detailPage.subAreaId.click();

    await detailPage.selectAnOption(detailPage.subAreaIdOptions.last());

    expect(await detailPage.subAreaNameLabel.getText()).toEqual('Sub Area');
    await detailPage.subAreaName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(2);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update inspection-sub-area', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionSubArea');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing inspectionSubArea.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    expect(await detailPage.name.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.name.clear();
    await detailPage.name.sendKeys('Ipsum Lorem');

    expect(await detailPage.inspectionObjectiveIdLabel.getText()).toEqual(
      'Inspection Objective'
    );
    await detailPage.inspectionObjectiveId.click();

    await detailPage.selectAnOption(
      detailPage.inspectionObjectiveIdOptions.last()
    );

    expect(await detailPage.inspectionObjectiveNameLabel.getText()).toEqual(
      'Inspection Objective'
    );
    expect(
      await detailPage.inspectionObjectiveName.getAttribute('value')
    ).toEqual('Lorem Ipsum');
    await detailPage.inspectionObjectiveName.clear();
    await detailPage.inspectionObjectiveName.sendKeys('Ipsum Lorem');

    expect(await detailPage.subAreaIdLabel.getText()).toEqual('Sub Area');
    await detailPage.subAreaId.click();

    await detailPage.selectAnOption(detailPage.subAreaIdOptions.last());

    expect(await detailPage.subAreaNameLabel.getText()).toEqual('Sub Area');
    expect(await detailPage.subAreaName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.subAreaName.clear();
    await detailPage.subAreaName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(2);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a inspection-sub-area', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete inspection-sub-area'
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
