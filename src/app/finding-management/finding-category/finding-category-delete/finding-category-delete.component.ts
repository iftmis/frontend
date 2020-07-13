import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FindingCategory } from '../finding-category';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-finding-category-delete',
  templateUrl: './finding-category-delete.component.html',
  styleUrls: ['./finding-category-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingCategoryDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FindingCategory,
    private titleService: Title
  ) {
    this.titleService.setTitle('Delete Confirmation|' + environment.app);
  }
}
