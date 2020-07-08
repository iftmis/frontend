import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OrganisationUnitService } from './../organisation-unit.service';
import { OrganisationUnitDeleteComponent } from '../organisation-unit-delete/organisation-unit-delete.component';
import { OrganisationUnit } from '../organisation-unit';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-organisation-unit-list',
  templateUrl: './organisation-unit-list.component.html',
  styleUrls: ['./organisation-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitListComponent implements OnInit {
  displayedColumns = [
    'code',
    'name',
    'address',
    'phoneNumber',
    'email',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private organisationUnitService: OrganisationUnitService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Organisation Units|' + environment.app);
  }

  ngOnInit() {}

  delete(id: number, organisationUnit: OrganisationUnit) {
    const dialogRef = this.dialog.open(OrganisationUnitDeleteComponent, {
      data: organisationUnit,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.organisationUnitService.delete(id).subscribe({
          next: () => this.router.navigate(['/organisation-units']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
