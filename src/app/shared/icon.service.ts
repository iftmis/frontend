import { Injectable } from '@angular/core';
import { SvgIcon } from './svg-icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry.addSvgIcon(
      'add',
      domSanitizer.bypassSecurityTrustResourceUrl('../../assets/svg/add.svg')
    );
  }

  customerIcons: SvgIcon[] = [];
}
