import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class UserDetailPage {
  private root: ElementFinder = element(by.css('.body app-user-detail'));
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  login = this.root.element(by.css('input[formcontrolname="login"]'));
  loginLabel = this.root.element(
    by.css('input[formcontrolname="login"]+span mat-label')
  );

  firstName = this.root.element(by.css('input[formcontrolname="firstName"]'));
  firstNameLabel = this.root.element(
    by.css('input[formcontrolname="firstName"]+span mat-label')
  );

  lastName = this.root.element(by.css('input[formcontrolname="lastName"]'));
  lastNameLabel = this.root.element(
    by.css('input[formcontrolname="lastName"]+span mat-label')
  );

  email = this.root.element(by.css('input[formcontrolname="email"]'));
  emailLabel = this.root.element(
    by.css('input[formcontrolname="email"]+span mat-label')
  );

  langKey = this.root.element(by.css('input[formcontrolname="langKey"]'));
  langKeyLabel = this.root.element(
    by.css('input[formcontrolname="langKey"]+span mat-label')
  );

  imageUrl = this.root.element(by.css('input[formcontrolname="imageUrl"]'));
  imageUrlLabel = this.root.element(
    by.css('input[formcontrolname="imageUrl"]+span mat-label')
  );

  authorities = this.root.element(
    by.css('input[formcontrolname="authorities"]')
  );
  authoritiesLabel = this.root.element(
    by.css('input[formcontrolname="authorities"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
