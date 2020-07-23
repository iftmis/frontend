import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { InspectionActivitiesService } from '../inspection-activities.service';
import { InspectionActivitiesDeleteComponent } from '../inspection-activities-delete/inspection-activities-delete.component';
import { InspectionActivities } from '../inspection-activities';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ToastService } from '../../../shared/toast.service';
import { HttpHeaders } from '@angular/common/http';
import { SubArea } from '../../../setting/sub-area/sub-area';
import { Objective } from '../../../setting/objective/objective';
import { AuditableArea } from '../../../setting/auditable-area/auditable-area';
import { MatSort } from '@angular/material/sort';
import { RiskDetailComponent } from '../../../risk-management/risk/risk-detail/risk-detail.component';
import { InspectionDetailComponent } from '../../../inspection/inspection-detail/inspection-detail.component';
import { InspectionActivitiesDetailComponent } from '../inspection-activities-detail/inspection-activities-detail.component';

@Component({
  selector: 'app-inspection-activities-list',
  templateUrl: './inspection-activities-list.component.html',
  styleUrls: ['./inspection-activities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionActivitiesListComponent implements OnInit {
  displayedColumns = [
    'objectiveName',
    'auditableAreaName',
    'subAreaName',
    'activity',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;
  size: number;
  private InspectionActivityBehaviorSubject: BehaviorSubject<
    InspectionActivities[]
  > = new BehaviorSubject([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  subAreas: SubArea[];
  objectives: Objective[];
  auditableAreas: AuditableArea[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    private inspectionActivitiesService: InspectionActivitiesService
  ) {}

  ngOnInit() {
    this.loadPage();
  }
  loadPage() {
    const pageToLoad = this.page || 0;
    this.inspectionActivitiesService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<InspectionActivities[]> {
    return this.InspectionActivityBehaviorSubject.asObservable();
  }

  filterByObjectiveId() {}

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.InspectionActivityBehaviorSubject.next(data);
  }
  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }

  create() {
    const data = {
      title: 'Create',
      action: 'create',
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    /*dialogConfig.height = '80%';*/
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialog = this.dialog.open(
      InspectionActivitiesDetailComponent,
      dialogConfig
    );

    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        // this.loadRisk(
        //   this.page,
        //   this.size,
        //   Number(this.riskRegisterId),
        //   this.parentId,
        //   this.queryString
        // );
        this.loadPage();
        this.toastService.success(
          'Success!',
          'Inspection Activity Created Successfully!'
        );
      }
    });
  }

  delete(id: number, inspectionActivities: InspectionActivities) {
    const dialogRef = this.dialog.open(InspectionActivitiesDeleteComponent, {
      data: inspectionActivities,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionActivitiesService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'Inspection Activity Deleted Successfully!'
            );
            this.router.navigate([
              '/inspection-planning/inspection-activities',
            ]);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
