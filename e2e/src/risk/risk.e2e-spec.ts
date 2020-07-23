import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { RiskListPage } from './risk-list.po';
import { SidenavPage } from '../sidenav.po';
import { RiskDetailPage } from './risk-detail.po';
import { RiskDeletePage } from './risk-delete.po';

describe('Risk tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: RiskListPage;
  let detailPage: RiskDetailPage;
  let deletePage: RiskDeletePage;
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
    listPage = new RiskListPage();
    detailPage = new RiskDetailPage();
    deletePage = new RiskDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.riskMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the risks list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('Risks');

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

  it('should create a new risk', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('Risk');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new risk.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.codeLabel.getText()).toEqual('Code');
    await detailPage.code.sendKeys('Lorem Ipsum');

    expect(await detailPage.descriptionLabel.getText()).toEqual('Description');
    await detailPage.description.sendKeys('Lorem Ipsum');

    expect(await detailPage.riskRegisterIdLabel.getText()).toEqual(
      'Risk Register'
    );
    await detailPage.riskRegisterId.click();

    await detailPage.selectAnOption(detailPage.riskRegisterIdOptions.last());

    expect(await detailPage.riskRegisterNameLabel.getText()).toEqual(
      'Risk Register'
    );
    await detailPage.riskRegisterName.sendKeys('Lorem Ipsum');

    expect(await detailPage.objectiveIdLabel.getText()).toEqual('Objective');
    await detailPage.objectiveId.click();

    await detailPage.selectAnOption(detailPage.objectiveIdOptions.last());

    expect(await detailPage.objectiveDescriptionLabel.getText()).toEqual(
      'Objective'
    );
    await detailPage.objectiveDescription.sendKeys('Lorem Ipsum');

    expect(await detailPage.riskCategoryIdLabel.getText()).toEqual(
      'Risk Category'
    );
    await detailPage.riskCategoryId.click();

    await detailPage.selectAnOption(detailPage.riskCategoryIdOptions.last());

    expect(await detailPage.riskCategoryNameLabel.getText()).toEqual(
      'Risk Category'
    );
    await detailPage.riskCategoryName.sendKeys('Lorem Ipsum');

    expect(await detailPage.riskOwnerIdLabel.getText()).toEqual('Owner');
    await detailPage.riskOwnerId.click();

    await detailPage.selectAnOption(detailPage.riskOwnerIdOptions.last());

    expect(await detailPage.riskOwnerNameLabel.getText()).toEqual('Owner');
    await detailPage.riskOwnerName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(2);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update risk', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('Risk');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing risk.'
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

    expect(await detailPage.riskRegisterIdLabel.getText()).toEqual(
      'Risk Register'
    );
    await detailPage.riskRegisterId.click();

    await detailPage.selectAnOption(detailPage.riskRegisterIdOptions.last());

    expect(await detailPage.riskRegisterNameLabel.getText()).toEqual(
      'Risk Register'
    );
    expect(await detailPage.riskRegisterName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.riskRegisterName.clear();
    await detailPage.riskRegisterName.sendKeys('Ipsum Lorem');

    expect(await detailPage.objectiveIdLabel.getText()).toEqual('Objective');
    await detailPage.objectiveId.click();

    await detailPage.selectAnOption(detailPage.objectiveIdOptions.last());

    expect(await detailPage.objectiveDescriptionLabel.getText()).toEqual(
      'Objective'
    );
    expect(await detailPage.objectiveDescription.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.objectiveDescription.clear();
    await detailPage.objectiveDescription.sendKeys('Ipsum Lorem');

    expect(await detailPage.riskCategoryIdLabel.getText()).toEqual(
      'Risk Category'
    );
    await detailPage.riskCategoryId.click();

    await detailPage.selectAnOption(detailPage.riskCategoryIdOptions.last());

    expect(await detailPage.riskCategoryNameLabel.getText()).toEqual(
      'Risk Category'
    );
    expect(await detailPage.riskCategoryName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.riskCategoryName.clear();
    await detailPage.riskCategoryName.sendKeys('Ipsum Lorem');

    expect(await detailPage.riskOwnerIdLabel.getText()).toEqual('Owner');
    await detailPage.riskOwnerId.click();

    await detailPage.selectAnOption(detailPage.riskOwnerIdOptions.last());

    expect(await detailPage.riskOwnerNameLabel.getText()).toEqual('Owner');
    expect(await detailPage.riskOwnerName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.riskOwnerName.clear();
    await detailPage.riskOwnerName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(2);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should confirmation a risk', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual('Delete risk');

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
