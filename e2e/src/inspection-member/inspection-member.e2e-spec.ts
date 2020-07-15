import { browser, logging } from 'protractor';

import { waitAndClick } from '../util';
import { HeaderPage } from '../header.po';
import { LoginPage } from '../login/login.po';
import { InspectionMemberListPage } from './inspection-member-list.po';
import { SidenavPage } from '../sidenav.po';
import { InspectionMemberDetailPage } from './inspection-member-detail.po';
import { InspectionMemberDeletePage } from './inspection-member-delete.po';

describe('InspectionMember tests', () => {
  let headerPage: HeaderPage;
  let loginPage: LoginPage;
  let sidenavPage: SidenavPage;
  let listPage: InspectionMemberListPage;
  let detailPage: InspectionMemberDetailPage;
  let deletePage: InspectionMemberDeletePage;
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
    listPage = new InspectionMemberListPage();
    detailPage = new InspectionMemberDetailPage();
    deletePage = new InspectionMemberDeletePage();
  });

  beforeEach(async () => {
    await waitAndClick(headerPage.appMenu);
    await waitAndClick(sidenavPage.inspectionMemberMenu);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the inspection-members list page', async () => {
    expect(await listPage.getPageTitleText()).toEqual('InspectionMembers');

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

  it('should create a new inspection-member', async () => {
    await listPage.createBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionMember');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Creates a new inspectionMember.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeFalsy();

    expect(await detailPage.fullNameLabel.getText()).toEqual('Full Name');
    await detailPage.fullName.sendKeys('Lorem Ipsum');

    expect(await detailPage.emailLabel.getText()).toEqual('Email');
    await detailPage.email.sendKeys('Lorem Ipsum');

    expect(await detailPage.roleLabel.getText()).toEqual('Inspection Role');
    await detailPage.role.click();

    await detailPage.selectAnOption(detailPage.roleOptions.last());

    expect(await detailPage.userIdLabel.getText()).toEqual('User');
    await detailPage.userId.click();

    await detailPage.selectAnOption(detailPage.userIdOptions.last());

    expect(await detailPage.userFullNameLabel.getText()).toEqual('User');
    await detailPage.userFullName.sendKeys('Lorem Ipsum');

    expect(await detailPage.letterAttachmentIdLabel.getText()).toEqual(
      'Letter'
    );
    await detailPage.letterAttachmentId.click();

    await detailPage.selectAnOption(
      detailPage.letterAttachmentIdOptions.last()
    );

    expect(await detailPage.letterAttachmentPathLabel.getText()).toEqual(
      'Letter'
    );
    await detailPage.letterAttachmentPath.sendKeys('Lorem Ipsum');

    expect(await detailPage.declarationAttachementIdLabel.getText()).toEqual(
      'Declaration'
    );
    await detailPage.declarationAttachementId.click();

    await detailPage.selectAnOption(
      detailPage.declarationAttachementIdOptions.last()
    );

    expect(await detailPage.declarationAttachementNameLabel.getText()).toEqual(
      'Declaration'
    );
    await detailPage.declarationAttachementName.sendKeys('Lorem Ipsum');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(6);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should update inspection-member', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.editBtn.isEnabled()).toBeTruthy();
    await listPage.editBtn.click();

    expect(await detailPage.pageTitle.getText()).toEqual('InspectionMember');
    expect(await detailPage.pageSubTitle.getText()).toEqual(
      'Update an existing inspectionMember.'
    );
    expect(await detailPage.cancelBtn.isEnabled()).toBeTruthy();
    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();

    expect(await detailPage.fullNameLabel.getText()).toEqual('Full Name');
    expect(await detailPage.fullName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.fullName.clear();
    await detailPage.fullName.sendKeys('Ipsum Lorem');

    expect(await detailPage.emailLabel.getText()).toEqual('Email');
    expect(await detailPage.email.getAttribute('value')).toEqual('Lorem Ipsum');
    await detailPage.email.clear();
    await detailPage.email.sendKeys('Ipsum Lorem');

    expect(await detailPage.roleLabel.getText()).toEqual('Inspection Role');
    await detailPage.role.click();

    await detailPage.selectAnOption(detailPage.roleOptions.last());

    expect(await detailPage.userIdLabel.getText()).toEqual('User');
    await detailPage.userId.click();

    await detailPage.selectAnOption(detailPage.userIdOptions.last());

    expect(await detailPage.userFullNameLabel.getText()).toEqual('User');
    expect(await detailPage.userFullName.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.userFullName.clear();
    await detailPage.userFullName.sendKeys('Ipsum Lorem');

    expect(await detailPage.letterAttachmentIdLabel.getText()).toEqual(
      'Letter'
    );
    await detailPage.letterAttachmentId.click();

    await detailPage.selectAnOption(
      detailPage.letterAttachmentIdOptions.last()
    );

    expect(await detailPage.letterAttachmentPathLabel.getText()).toEqual(
      'Letter'
    );
    expect(await detailPage.letterAttachmentPath.getAttribute('value')).toEqual(
      'Lorem Ipsum'
    );
    await detailPage.letterAttachmentPath.clear();
    await detailPage.letterAttachmentPath.sendKeys('Ipsum Lorem');

    expect(await detailPage.declarationAttachementIdLabel.getText()).toEqual(
      'Declaration'
    );
    await detailPage.declarationAttachementId.click();

    await detailPage.selectAnOption(
      detailPage.declarationAttachementIdOptions.last()
    );

    expect(await detailPage.declarationAttachementNameLabel.getText()).toEqual(
      'Declaration'
    );
    expect(
      await detailPage.declarationAttachementName.getAttribute('value')
    ).toEqual('Lorem Ipsum');
    await detailPage.declarationAttachementName.clear();
    await detailPage.declarationAttachementName.sendKeys('Ipsum Lorem');

    expect(await detailPage.saveBtn.isEnabled()).toBeTruthy();
    await detailPage.saveBtn.click();

    const actualRecordsCount = await listPage.table.records.count();
    expect(await listPage.table.columns.count()).toEqual(6);
    expect(actualRecordsCount).toEqual(initialCount + 1);
  });

  it('should delete a inspection-member', async () => {
    const lastRecordIndex = (await listPage.table.records.count()) - 1;
    const actionsMenu = listPage.table.getActionsBtn(lastRecordIndex);

    await actionsMenu.click();
    expect(await listPage.deleteBtn.isEnabled()).toBeTruthy();
    await listPage.deleteBtn.click();

    expect(await deletePage.title.getText()).toEqual(
      'Delete inspection-member'
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
