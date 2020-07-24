import { Component, Inject, OnInit } from '@angular/core';
import { Finding } from '../../finding/finding';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FindingResponse } from '../finding-response';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  action: string;
  findingResponse: FindingResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.findingResponse = data.findingResponse;
  }
}
