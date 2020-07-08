import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { QuarterService } from '../quarter.service';
import { QuarterDeleteComponent } from '../quarter-delete/quarter-delete.component';
import { Quarter } from '../quarter';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quarter-list',
  templateUrl: './quarter-list.component.html',
  styleUrls: ['./quarter-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuarterListComponent implements OnInit {
  displayedColumns = [
    'code',
    'name',
    'startDate',
    'endDate',
    'financialYearName',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private quarterService: QuarterService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Quarters|' + environment.app);
  }

  ngOnInit() {}

  delete(id: number, quarter: Quarter) {
    const dialogRef = this.dialog.open(QuarterDeleteComponent, {
      data: quarter,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.quarterService.delete(id).subscribe({
          next: () => this.router.navigate(['/quarters']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
