import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { SubAreaService } from './../sub-area.service';
import { SubAreaDeleteComponent } from '../sub-area-delete/sub-area-delete.component';
import { SubArea } from '../sub-area';

@Component({
  selector: 'app-sub-area-list',
  templateUrl: './sub-area-list.component.html',
  styleUrls: ['./sub-area-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubAreaListComponent implements OnInit {
  displayedColumns = ['areaName', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private subAreaService: SubAreaService
  ) {}

  ngOnInit() {}

  delete(id: number, subArea: SubArea) {
    const dialogRef = this.dialog.open(SubAreaDeleteComponent, {
      data: subArea,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.subAreaService.delete(id).subscribe({
          next: () => this.router.navigate(['/sub-areas']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
