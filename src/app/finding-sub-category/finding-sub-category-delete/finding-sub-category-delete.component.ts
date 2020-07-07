import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FindingSubCategory } from '../finding-sub-category';

@Component({
  selector: 'app-finding-sub-category-delete',
  templateUrl: './finding-sub-category-delete.component.html',
  styleUrls: ['./finding-sub-category-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingSubCategoryDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FindingSubCategory) {}
}
