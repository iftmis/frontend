import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialYear } from '../financial-year';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
})
export class ActivateComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FinancialYear,
    private titleService: Title
  ) {
    this.titleService.setTitle('Activation Confirmation|' + environment.app);
  }
}
