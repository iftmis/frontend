import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FindingCategoryService } from './../finding-category.service';
import { FindingCategoryDeleteComponent } from '../finding-category-delete/finding-category-delete.component';
import { FindingCategory } from '../finding-category';

@Component({
  selector: 'app-finding-category-list',
  templateUrl: './finding-category-list.component.html',
  styleUrls: ['./finding-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingCategoryListComponent implements OnInit {
  displayedColumns = ['code', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private findingCategoryService: FindingCategoryService
  ) {}

  ngOnInit() {}

  delete(id: number, findingCategory: FindingCategory) {
    const dialogRef = this.dialog.open(FindingCategoryDeleteComponent, {
      data: findingCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.findingCategoryService.delete(id).subscribe({
          next: () => this.router.navigate(['/finding-categorys']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
