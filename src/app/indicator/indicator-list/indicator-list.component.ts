import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IndicatorService } from './../indicator.service';
import { IndicatorDeleteComponent } from '../indicator-delete/indicator-delete.component';
import { Indicator } from '../indicator';

@Component({
  selector: 'app-indicator-list',
  templateUrl: './indicator-list.component.html',
  styleUrls: ['./indicator-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorListComponent implements OnInit {
  displayedColumns = ['subAreaName', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit() {}

  delete(id: number, indicator: Indicator) {
    const dialogRef = this.dialog.open(IndicatorDeleteComponent, {
      data: indicator,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.indicatorService.delete(id).subscribe({
          next: () => this.router.navigate(['/indicators']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
