import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { RiskCategoryService } from '../risk-category.service';
import { RiskCategoryDeleteComponent } from '../risk-category-delete/risk-category-delete.component';
import { RiskCategory } from '../risk-category';

@Component({
  selector: 'app-risk-category-list',
  templateUrl: './risk-category-list.component.html',
  styleUrls: ['./risk-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskCategoryListComponent implements OnInit {
  displayedColumns = ['code', 'description', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private riskCategoryService: RiskCategoryService
  ) {}

  ngOnInit() {}

  delete(id: number, riskCategory: RiskCategory) {
    const dialogRef = this.dialog.open(RiskCategoryDeleteComponent, {
      data: riskCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.riskCategoryService.delete(id).subscribe({
          next: () => this.router.navigate(['/risk-categorys']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
