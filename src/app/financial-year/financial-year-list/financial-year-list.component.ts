import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FinancialYearService } from './../financial-year.service';
import { FinancialYearDeleteComponent } from '../financial-year-delete/financial-year-delete.component';
import { FinancialYear } from '../financial-year';

@Component({
  selector: 'app-financial-year-list',
  templateUrl: './financial-year-list.component.html',
  styleUrls: ['./financial-year-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialYearListComponent implements OnInit {
  displayedColumns = [
    'name',
    'startDate',
    'endDate',
    'isOpened',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private financialYearService: FinancialYearService
  ) {}

  ngOnInit() {}

  delete(id: number, financialYear: FinancialYear) {
    const dialogRef = this.dialog.open(FinancialYearDeleteComponent, {
      data: financialYear,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.financialYearService.delete(id).subscribe({
          next: () => this.router.navigate(['/financial-years']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
