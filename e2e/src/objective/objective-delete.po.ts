import { by, ElementFinder } from 'protractor';
import { OverlayPage } from '../overlay.po';

export class ObjectiveDeletePage {
  private overlayPage = new OverlayPage();
  private root: ElementFinder = this.overlayPage.overlay.element(
    by.css('.mat-dialog-container app-objective-confirmation')
  );
  private actions: ElementFinder = this.root.element(
    by.css('mat-dialog-actions')
  );

  title: ElementFinder = this.root.element(by.css('.mat-dialog-title'));
  noBtn = this.actions.element(by.css('button:first-child'));
  yesBtn = this.actions.element(by.css('button:last-child'));
}
