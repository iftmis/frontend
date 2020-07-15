import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class InspectionMemberDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-inspection-member-detail')
  );
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  fullName = this.root.element(by.css('input[formcontrolname="fullName"]'));
  fullNameLabel = this.root.element(
    by.css('input[formcontrolname="fullName"]+span mat-label')
  );

  email = this.root.element(by.css('input[formcontrolname="email"]'));
  emailLabel = this.root.element(
    by.css('input[formcontrolname="email"]+span mat-label')
  );

  role = this.root.element(by.css('mat-select[formcontrolname="role"]'));
  roleLabel = this.root.element(
    by.css('mat-select[formcontrolname="role"]+span mat-label')
  );

  roleOptions = this.overlayPage.options;

  userId = this.root.element(by.css('mat-select[formcontrolname="userId"]'));
  userIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="userId"]+span mat-label')
  );

  userIdOptions = this.overlayPage.options;

  userFullName = this.root.element(
    by.css('input[formcontrolname="userFullName"]')
  );
  userFullNameLabel = this.root.element(
    by.css('input[formcontrolname="userFullName"]+span mat-label')
  );

  letterAttachmentId = this.root.element(
    by.css('mat-select[formcontrolname="letterAttachmentId"]')
  );
  letterAttachmentIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="letterAttachmentId"]+span mat-label')
  );

  letterAttachmentIdOptions = this.overlayPage.options;

  letterAttachmentPath = this.root.element(
    by.css('input[formcontrolname="letterAttachmentPath"]')
  );
  letterAttachmentPathLabel = this.root.element(
    by.css('input[formcontrolname="letterAttachmentPath"]+span mat-label')
  );

  declarationAttachementId = this.root.element(
    by.css('mat-select[formcontrolname="declarationAttachementId"]')
  );
  declarationAttachementIdLabel = this.root.element(
    by.css(
      'mat-select[formcontrolname="declarationAttachementId"]+span mat-label'
    )
  );

  declarationAttachementIdOptions = this.overlayPage.options;

  declarationAttachementName = this.root.element(
    by.css('input[formcontrolname="declarationAttachementName"]')
  );
  declarationAttachementNameLabel = this.root.element(
    by.css('input[formcontrolname="declarationAttachementName"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
