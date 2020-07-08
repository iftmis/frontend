import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuditableAreaService } from './../auditable-area.service';
import { AuditableAreaDeleteComponent } from '../auditable-area-delete/auditable-area-delete.component';
import { AuditableArea } from '../auditable-area';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auditable-area-list',
  templateUrl: './auditable-area-list.component.html',
  styleUrls: ['./auditable-area-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditableAreaListComponent implements OnInit {
  displayedColumns = ['code', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private auditableAreaService: AuditableAreaService
  ) {
    this.titleService.setTitle('Auditable Areas|' + environment.app);
  }

  ngOnInit() {}

  delete(id: number, auditableArea: AuditableArea) {
    const dialogRef = this.dialog.open(AuditableAreaDeleteComponent, {
      data: auditableArea,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.auditableAreaService.delete(id).subscribe({
          next: () => this.router.navigate(['/auditable-areas']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
