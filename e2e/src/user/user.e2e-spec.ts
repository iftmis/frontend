import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { UserListPage } from './user-list.po';
import { SidenavPage } from '../sidenav.po';
import { UserDetailPage } from './user-detail.po';
import { UserDeletePage } from './user-delete.po';

describe('User tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: UserListPage;
  let detailPage: UserDetailPage;
  let deletePage: UserDeletePage;
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
    listPage = new UserListPage();
    detailPage = new UserDetailPage();
    deletePage = new UserDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.userMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the users list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('Users');

    expect(await listPage.createBtn.isEnabled()).toBeTruthy();

    if (await listPage.table.noRecords.isPresent()) {
      expect(await listPage.table.noRecords.isDisplayed()).toBeTruthy();
      expect(await listPage.table.noRecords.getText()).toEqual(
        'No records found'
      );
      initialCount = 0;
    } else {
      initialCount = await listPage.table.records.count();
      expect(await listPage.table.columns.count()).toEqual(9);

      const actionsMenu = listPage.table.getActionsBtn(initialCount - 1);
      await actionsMenu.click();
      expect(await listPage.editBtn.isEnabled()).toBeTruthy();
      expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
      await listPage.hideOverlay();
    }
  });

  it('should create a new user', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('User');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new user.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.loginLabel.getText()).toEqual('Username');
    await detailPage.login.sendKeys('Lorem Ipsum');

    expect(await detailPage.firstNameLabel.getText()).toEqual('First Name');
    await detailPage.firstName.sendKeys('Lorem Ipsum');

    expect(await detailPage.lastNameLabel.getText()).toEqual('Last Name');
    await detailPage.lastName.sendKeys('Lorem Ipsum');

    expect(await detailPage.emailLabel.getText()).toEqual('Email');
    await detailPage.email.sendKeys('Lorem Ipsum');

    expect(await detailPage.langKeyLabel.getText()).toEqual('Language');
    await detailPage.langKey.sendKeys('Lorem Ipsum');

    expect(await detailPage.imageUrlLabel.getText()).toEqual('Photo');
    await detailPage.imageUrl.sendKeys('Lorem Ipsum');

    expect(await detailPage.authoritiesLabel.getText()).toEqual('Roles');
    await detailPage.authorities.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(9);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update user', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('User');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing user.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.loginLabel.getText()).toEqual('Username');
    expect(await detailPage.login.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.login.clear();
    await detailPage.login.sendKeys('Ipsum Lorem');

    expect(await detailPage.firstNameLabel.getText()).toEqual('First Name');
    expect(await detailPage.firstName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.firstName.clear();
    await detailPage.firstName.sendKeys('Ipsum Lorem');

    expect(await detailPage.lastNameLabel.getText()).toEqual('Last Name');
    expect(await detailPage.lastName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.lastName.clear();
    await detailPage.lastName.sendKeys('Ipsum Lorem');

    expect(await detailPage.emailLabel.getText()).toEqual('Email');
    expect(await detailPage.email.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.email.clear();
    await detailPage.email.sendKeys('Ipsum Lorem');

    expect(await detailPage.langKeyLabel.getText()).toEqual('Language');
    expect(await detailPage.langKey.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.langKey.clear();
    await detailPage.langKey.sendKeys('Ipsum Lorem');

    expect(await detailPage.imageUrlLabel.getText()).toEqual('Photo');
    expect(await detailPage.imageUrl.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.imageUrl.clear();
    await detailPage.imageUrl.sendKeys('Ipsum Lorem');

    expect(await detailPage.authoritiesLabel.getText()).toEqual('Roles');
    expect(await detailPage.authorities.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.authorities.clear();
    await detailPage.authorities.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(9);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should confirmation a user', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual('Delete user');

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
