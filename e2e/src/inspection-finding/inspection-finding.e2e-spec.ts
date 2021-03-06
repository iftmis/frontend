import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { InspectionFindingListPage } from './inspection-finding-list.po';
import { SidenavPage } from '../sidenav.po';
import { InspectionFindingDetailPage } from './inspection-finding-detail.po';
import { InspectionFindingDeletePage } from './inspection-finding-delete.po';

describe('InspectionFinding tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: InspectionFindingListPage;
  let detailPage: InspectionFindingDetailPage;
  let deletePage: InspectionFindingDeletePage;
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
    listPage = new InspectionFindingListPage();
    detailPage = new InspectionFindingDetailPage();
    deletePage = new InspectionFindingDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.inspectionFindingMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the inspection-findings list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('InspectionFindings');

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

  it('should create a new inspection-finding', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionFinding');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new inspectionFinding.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.codeLabel.getText()).toEqual('Code');
    await detailPage.code.sendKeys('Lorem Ipsum');

    expect(await detailPage.descriptionLabel.getText()).toEqual('Description');
    await detailPage.description.sendKeys('Lorem Ipsum');

    expect(await detailPage.conditionLabel.getText()).toEqual('Condition');
    await detailPage.condition.sendKeys('Lorem Ipsum');

    expect(await detailPage.causesLabel.getText()).toEqual('Causes');
    await detailPage.causes.sendKeys('Lorem Ipsum');

    expect(await detailPage.actionPlanCategoryLabel.getText()).toEqual(
      'Action Plan Category'
    );
    await detailPage.actionPlanCategory.click();

    await detailPage.selectAnOption(
      detailPage.actionPlanCategoryOptions.last()
    );

    expect(await detailPage.categoryIdLabel.getText()).toEqual('Category');
    await detailPage.categoryId.click();

    await detailPage.selectAnOption(detailPage.categoryIdOptions.last());

    expect(await detailPage.categoryNameLabel.getText()).toEqual('Category');
    await detailPage.categoryName.sendKeys('Lorem Ipsum');

    expect(await detailPage.subCategoryIdLabel.getText()).toEqual(
      'Sub Category Id'
    );
    await detailPage.subCategoryId.click();

    await detailPage.selectAnOption(detailPage.subCategoryIdOptions.last());

    expect(await detailPage.subCategoryNameLabel.getText()).toEqual(
      'Sub Category Id'
    );
    await detailPage.subCategoryName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(1);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update inspection-finding', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionFinding');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing inspectionFinding.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.codeLabel.getText()).toEqual('Code');
    expect(await detailPage.code.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.code.clear();
    await detailPage.code.sendKeys('Ipsum Lorem');

    expect(await detailPage.descriptionLabel.getText()).toEqual('Description');
    expect(await detailPage.description.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.description.clear();
    await detailPage.description.sendKeys('Ipsum Lorem');

    expect(await detailPage.conditionLabel.getText()).toEqual('Condition');
    expect(await detailPage.condition.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.condition.clear();
    await detailPage.condition.sendKeys('Ipsum Lorem');

    expect(await detailPage.causesLabel.getText()).toEqual('Causes');
    expect(await detailPage.causes.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.causes.clear();
    await detailPage.causes.sendKeys('Ipsum Lorem');

    expect(await detailPage.actionPlanCategoryLabel.getText()).toEqual(
      'Action Plan Category'
    );
    await detailPage.actionPlanCategory.click();

    await detailPage.selectAnOption(
      detailPage.actionPlanCategoryOptions.last()
    );

    expect(await detailPage.categoryIdLabel.getText()).toEqual('Category');
    await detailPage.categoryId.click();

    await detailPage.selectAnOption(detailPage.categoryIdOptions.last());

    expect(await detailPage.categoryNameLabel.getText()).toEqual('Category');
    expect(await detailPage.categoryName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.categoryName.clear();
    await detailPage.categoryName.sendKeys('Ipsum Lorem');

    expect(await detailPage.subCategoryIdLabel.getText()).toEqual(
      'Sub Category Id'
    );
    await detailPage.subCategoryId.click();

    await detailPage.selectAnOption(detailPage.subCategoryIdOptions.last());

    expect(await detailPage.subCategoryNameLabel.getText()).toEqual(
      'Sub Category Id'
    );
    expect(await detailPage.subCategoryName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.subCategoryName.clear();
    await detailPage.subCategoryName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(1);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a inspection-finding', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete inspection-finding'
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
