import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProcedureService } from './../procedure.service';
import { ProcedureDeleteComponent } from '../procedure-delete/procedure-delete.component';
import { Procedure } from '../procedure';

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrls: ['./procedure-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcedureListComponent implements OnInit {
  displayedColumns = ['indicatorName', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private procedureService: ProcedureService
  ) {}

  ngOnInit() {}

  delete(id: number, procedure: Procedure) {
    const dialogRef = this.dialog.open(ProcedureDeleteComponent, {
      data: procedure,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.procedureService.delete(id).subscribe({
          next: () => this.router.navigate(['/procedures']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
