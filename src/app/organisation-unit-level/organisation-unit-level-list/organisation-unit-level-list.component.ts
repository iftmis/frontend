import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OrganisationUnitLevelService } from './../organisation-unit-level.service';
import { OrganisationUnitLevelDeleteComponent } from '../organisation-unit-level-delete/organisation-unit-level-delete.component';
import { OrganisationUnitLevel } from '../organisation-unit-level';

@Component({
  selector: 'app-organisation-unit-level-list',
  templateUrl: './organisation-unit-level-list.component.html',
  styleUrls: ['./organisation-unit-level-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitLevelListComponent implements OnInit {
  displayedColumns = ['code', 'name', 'level', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private organisationUnitLevelService: OrganisationUnitLevelService
  ) {}

  ngOnInit() {}

  delete(id: number, organisationUnitLevel: OrganisationUnitLevel) {
    const dialogRef = this.dialog.open(OrganisationUnitLevelDeleteComponent, {
      data: organisationUnitLevel,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.organisationUnitLevelService.delete(id).subscribe({
          next: () => this.router.navigate(['/organisation-unit-levels']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
