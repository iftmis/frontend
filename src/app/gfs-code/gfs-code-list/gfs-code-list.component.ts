import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { GfsCodeService } from './../gfs-code.service';
import { GfsCodeDeleteComponent } from '../gfs-code-delete/gfs-code-delete.component';
import { GfsCode } from '../gfs-code';

@Component({
  selector: 'app-gfs-code-list',
  templateUrl: './gfs-code-list.component.html',
  styleUrls: ['./gfs-code-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GfsCodeListComponent implements OnInit {
  displayedColumns = ['code', 'description', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private gfsCodeService: GfsCodeService
  ) {}

  ngOnInit() {}

  delete(id: number, gfsCode: GfsCode) {
    const dialogRef = this.dialog.open(GfsCodeDeleteComponent, {
      data: gfsCode,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.gfsCodeService.delete(id).subscribe({
          next: () => this.router.navigate(['/gfs-codes']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
