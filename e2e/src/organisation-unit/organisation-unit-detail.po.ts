import { by, element, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class OrganisationUnitDetailPage {
  private root: ElementFinder = element(
    by.css('.body app-organisation-unit-detail')
  );
  private actions: ElementFinder = this.root.element(
    by.css('mat-card-actions')
  );
  private overlayPage = new OverlayPage();

  pageTitle = this.root.element(by.css('.mat-card-title'));
  pageSubTitle = this.root.element(by.css('.mat-card-subtitle'));
  cancelBtn = this.actions.element(by.css('button:first-child'));
  saveBtn = this.actions.element(by.css('button:last-child'));

  code = this.root.element(by.css('input[formcontrolname="code"]'));
  codeLabel = this.root.element(
    by.css('input[formcontrolname="code"]+span mat-label')
  );

  name = this.root.element(by.css('input[formcontrolname="name"]'));
  nameLabel = this.root.element(
    by.css('input[formcontrolname="name"]+span mat-label')
  );

  address = this.root.element(by.css('input[formcontrolname="address"]'));
  addressLabel = this.root.element(
    by.css('input[formcontrolname="address"]+span mat-label')
  );

  phoneNumber = this.root.element(
    by.css('input[formcontrolname="phoneNumber"]')
  );
  phoneNumberLabel = this.root.element(
    by.css('input[formcontrolname="phoneNumber"]+span mat-label')
  );

  email = this.root.element(by.css('input[formcontrolname="email"]'));
  emailLabel = this.root.element(
    by.css('input[formcontrolname="email"]+span mat-label')
  );

  background = this.root.element(
    by.css('textarea[formcontrolname="background"]')
  );
  backgroundLabel = this.root.element(
    by.css('textarea[formcontrolname="background"]+span mat-label')
  );

  logo = this.root.element(by.css('input[formcontrolname="logo"]'));
  logoLabel = this.root.element(
    by.css('input[formcontrolname="logo"]+span mat-label')
  );

  organisationUnitLevelId = this.root.element(
    by.css('mat-select[formcontrolname="organisationUnitLevelId"]')
  );
  organisationUnitLevelIdLabel = this.root.element(
    by.css(
      'mat-select[formcontrolname="organisationUnitLevelId"]+span mat-label'
    )
  );

  organisationUnitLevelIdOptions = this.overlayPage.options;

  organisationUnitLevelName = this.root.element(
    by.css('input[formcontrolname="organisationUnitLevelName"]')
  );
  organisationUnitLevelNameLabel = this.root.element(
    by.css('input[formcontrolname="organisationUnitLevelName"]+span mat-label')
  );

  parentId = this.root.element(
    by.css('mat-select[formcontrolname="parentId"]')
  );
  parentIdLabel = this.root.element(
    by.css('mat-select[formcontrolname="parentId"]+span mat-label')
  );

  parentIdOptions = this.overlayPage.options;

  parentName = this.root.element(by.css('input[formcontrolname="parentName"]'));
  parentNameLabel = this.root.element(
    by.css('input[formcontrolname="parentName"]+span mat-label')
  );

  async selectAnOption(selector: ElementFinder) {
    await this.overlayPage.selectAnOption(selector);
  }
}
