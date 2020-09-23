import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { InspectionProcedureListPage } from './inspection-procedure-list.po';
import { SidenavPage } from '../sidenav.po';
import { InspectionProcedureDetailPage } from './inspection-procedure-detail.po';
import { InspectionProcedureDeletePage } from './inspection-procedure-delete.po';

describe('InspectionProcedure tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: InspectionProcedureListPage;
  let detailPage: InspectionProcedureDetailPage;
  let deletePage: InspectionProcedureDeletePage;
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
    listPage = new InspectionProcedureListPage();
    detailPage = new InspectionProcedureDetailPage();
    deletePage = new InspectionProcedureDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.inspectionProcedureMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the inspection-procedures list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('InspectionProcedures');

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

  it('should create a new inspection-procedure', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionProcedure');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new inspectionProcedure.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    await detailPage.name.sendKeys('Lorem Ipsum');

    expect(await detailPage.inspectionIndicatorIdLabel.getText()).toEqual(
      'Inspection Indicator'
    );
    await detailPage.inspectionIndicatorId.click();

    await detailPage.selectAnOption(
      detailPage.inspectionIndicatorIdOptions.last()
    );

    expect(await detailPage.inspectionIndicatorNameLabel.getText()).toEqual(
      'Inspection Indicator'
    );
    await detailPage.inspectionIndicatorName.sendKeys('Lorem Ipsum');

    expect(await detailPage.indicatorIdLabel.getText()).toEqual('Indicator');
    await detailPage.indicatorId.click();

    await detailPage.selectAnOption(detailPage.indicatorIdOptions.last());

    expect(await detailPage.indicatorNameLabel.getText()).toEqual('Indicator');
    await detailPage.indicatorName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(2);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update inspection-procedure', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionProcedure');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing inspectionProcedure.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    expect(await detailPage.name.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.name.clear();
    await detailPage.name.sendKeys('Ipsum Lorem');

    expect(await detailPage.inspectionIndicatorIdLabel.getText()).toEqual(
      'Inspection Indicator'
    );
    await detailPage.inspectionIndicatorId.click();

    await detailPage.selectAnOption(
      detailPage.inspectionIndicatorIdOptions.last()
    );

    expect(await detailPage.inspectionIndicatorNameLabel.getText()).toEqual(
      'Inspection Indicator'
    );
    expect(
      await detailPage.inspectionIndicatorName.getAttribute('value')
    ).toEqual('Lorem Ipsum');
    await detailPage.inspectionIndicatorName.clear();
    await detailPage.inspectionIndicatorName.sendKeys('Ipsum Lorem');

    expect(await detailPage.indicatorIdLabel.getText()).toEqual('Indicator');
    await detailPage.indicatorId.click();

    await detailPage.selectAnOption(detailPage.indicatorIdOptions.last());

    expect(await detailPage.indicatorNameLabel.getText()).toEqual('Indicator');
    expect(await detailPage.indicatorName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.indicatorName.clear();
    await detailPage.indicatorName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(2);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a inspection-procedure', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete inspection-procedure'
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
