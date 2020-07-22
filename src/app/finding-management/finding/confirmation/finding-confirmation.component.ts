import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Finding } from '../../finding';

@Component({
  selector: 'app-finding-confirmation',
  templateUrl: './finding-confirmation.component.html',
  styleUrls: ['./finding-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingConfirmationComponent {
  action: string;
  finding: Finding;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.finding = data.finding;
  }
}
