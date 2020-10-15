import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
import { Courtesy } from '../courtesy';

@Component({
  selector: 'app-courtesy-delete',
  templateUrl: './courtesy-delete.component.html',
  styleUrls: ['./courtesy-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtesyDeleteComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Courtesy,
    private titleService: Title
  ) {
    this.titleService.setTitle('Delete Confirmation|' + environment.app);
  }

  ngOnInit(): void {}
}
