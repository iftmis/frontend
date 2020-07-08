import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FindingSubCategoryService } from './../finding-sub-category.service';
import { FindingSubCategoryDeleteComponent } from '../finding-sub-category-delete/finding-sub-category-delete.component';
import { FindingSubCategory } from '../finding-sub-category';

@Component({
  selector: 'app-finding-sub-category-list',
  templateUrl: './finding-sub-category-list.component.html',
  styleUrls: ['./finding-sub-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingSubCategoryListComponent implements OnInit {
  displayedColumns = ['code', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private findingSubCategoryService: FindingSubCategoryService
  ) {}

  ngOnInit() {}

  delete(id: number, findingSubCategory: FindingSubCategory) {
    const dialogRef = this.dialog.open(FindingSubCategoryDeleteComponent, {
      data: findingSubCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.findingSubCategoryService.delete(id).subscribe({
          next: () => this.router.navigate(['/finding-sub-categorys']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
