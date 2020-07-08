import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FinancialYearService } from '../financial-year.service';
import { FinancialYearDeleteComponent } from '../financial-year-delete/financial-year-delete.component';
import { FinancialYear } from '../financial-year';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ApiConfig } from '../../shared/api.config';
import { MatSort } from '@angular/material/sort';

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
  page: number;
  size: number;
  perPageOptions: number[];
  totalItems: number;
  showLoader = false;
  private financialYearSubject: BehaviorSubject<
    FinancialYear[]
  > = new BehaviorSubject([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private financialYearService: FinancialYearService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Financial Years|' + environment.app);
    this.page = ApiConfig.page;
    this.size = ApiConfig.size;
    this.perPageOptions = ApiConfig.perPageOptions;
  }

  ngOnInit() {
    this.loadData(this.page, this.size);
  }

  loadData(page: number, size: number) {
    this.financialYearService.getAll(page, size).subscribe(
      response => {
        this.financialYearSubject.next(response.content);
        this.totalItems = response.totalElements;
      },
      error => {
        console.log(error);
      }
    );
  }

  getData(): Observable<FinancialYear[]> {
    return this.financialYearSubject.asObservable();
  }

  pageChanged(page: any) {
    this.page = page.pageIndex;
    this.size = page.pageSize;
    this.loadData(this.page, this.size);
  }

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
