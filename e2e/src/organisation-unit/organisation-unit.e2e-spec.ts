import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { OrganisationUnitListPage } from './organisation-unit-list.po';
import { SidenavPage } from '../sidenav.po';
import { OrganisationUnitDetailPage } from './organisation-unit-detail.po';
import { OrganisationUnitDeletePage } from './organisation-unit-delete.po';

describe('OrganisationUnit tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: OrganisationUnitListPage;
  let detailPage: OrganisationUnitDetailPage;
  let deletePage: OrganisationUnitDeletePage;
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
    listPage = new OrganisationUnitListPage();
    detailPage = new OrganisationUnitDetailPage();
    deletePage = new OrganisationUnitDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.organisationUnitMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the organisation-units list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('OrganisationUnits');

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

  it('should create a new organisation-unit', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('OrganisationUnit');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new organisationUnit.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.codeLabel.getText()).toEqual('Code');
    await detailPage.code.sendKeys('Lorem Ipsum');

    expect(await detailPage.nameLabel.getText()).toEqual('Name');
    await detailPage.name.sendKeys('Lorem Ipsum');

    expect(await detailPage.addressLabel.getText()).toEqual('Address');
    await detailPage.address.sendKeys('Lorem Ipsum');

    expect(await detailPage.phoneNumberLabel.getText()).toEqual('Phone Number');
    await detailPage.phoneNumber.sendKeys('Lorem Ipsum');

    expect(await detailPage.emailLabel.getText()).toEqual('Email');
    await detailPage.email.sendKeys('Lorem Ipsum');

    expect(await detailPage.backgroundLabel.getText()).toEqual('Background');
    await detailPage.background.sendKeys('Lorem Ipsum');

    expect(await detailPage.logoLabel.getText()).toEqual('Logo');
    await detailPage.logo.sendKeys('Lorem Ipsum');

    expect(await detailPage.organisationUnitLevelIdLabel.getText()).toEqual(
      'Organisation Unit Level'
    );
    await detailPage.organisationUnitLevelId.click();

    await detailPage.selectAnOption(
      detailPage.organisationUnitLevelIdOptions.last()
    );

    expect(await detailPage.organisationUnitLevelNameLabel.getText()).toEqual(
      'organisation Unit Level'
    );
    await detailPage.organisationUnitLevelName.sendKeys('Lorem Ipsum');

    expect(await detailPage.parentIdLabel.getText()).toEqual('Parent');
    await detailPage.parentId.click();

    await detailPage.selectAnOption(detailPage.parentIdOptions.last());

    expect(await detailPage.parentNameLabel.getText()).toEqual('Parent');
    await detailPage.parentName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(6);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update organisation-unit', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('OrganisationUnit');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing organisationUnit.'
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

    expect(await detailPage.addressLabel.getText()).toEqual('Address');
    expect(await detailPage.address.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.address.clear();
    await detailPage.address.sendKeys('Ipsum Lorem');

    expect(await detailPage.phoneNumberLabel.getText()).toEqual('Phone Number');
    expect(await detailPage.phoneNumber.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.phoneNumber.clear();
    await detailPage.phoneNumber.sendKeys('Ipsum Lorem');

    expect(await detailPage.emailLabel.getText()).toEqual('Email');
    expect(await detailPage.email.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.email.clear();
    await detailPage.email.sendKeys('Ipsum Lorem');

    expect(await detailPage.backgroundLabel.getText()).toEqual('Background');
    expect(await detailPage.background.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.background.clear();
    await detailPage.background.sendKeys('Ipsum Lorem');

    expect(await detailPage.logoLabel.getText()).toEqual('Logo');
    expect(await detailPage.logo.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.logo.clear();
    await detailPage.logo.sendKeys('Ipsum Lorem');

    expect(await detailPage.organisationUnitLevelIdLabel.getText()).toEqual(
      'Organisation Unit Level'
    );
    await detailPage.organisationUnitLevelId.click();

    await detailPage.selectAnOption(
      detailPage.organisationUnitLevelIdOptions.last()
    );

    expect(await detailPage.organisationUnitLevelNameLabel.getText()).toEqual(
      'organisation Unit Level'
    );
    expect(
      await detailPage.organisationUnitLevelName.getAttribute('value')
    ).toEqual('Lorem Ipsum');
    await detailPage.organisationUnitLevelName.clear();
    await detailPage.organisationUnitLevelName.sendKeys('Ipsum Lorem');

    expect(await detailPage.parentIdLabel.getText()).toEqual('Parent');
    await detailPage.parentId.click();

    await detailPage.selectAnOption(detailPage.parentIdOptions.last());

    expect(await detailPage.parentNameLabel.getText()).toEqual('Parent');
    expect(await detailPage.parentName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.parentName.clear();
    await detailPage.parentName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(6);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a organisation-unit', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete organisation-unit'
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
