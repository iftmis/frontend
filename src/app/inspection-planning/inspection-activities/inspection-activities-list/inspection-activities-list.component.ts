import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
import { ObjectiveService } from '../../../setting/objective/objective.service';
import { AuditableAreaService } from '../../../setting/auditable-area/auditable-area.service';
import { SubAreaService } from '../../../setting/sub-area/sub-area.service';
import { FormControl } from '@angular/forms';

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
  // @ts-ignore
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  subAreaId = new FormControl(null);
  subAreas: SubArea[];
  objectiveId = new FormControl(null);
  objectives: Objective[];
  auditableAreaId = new FormControl(null);
  auditableAreas: AuditableArea[];
  areaId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    private subAreaService: SubAreaService,
    private objectiveService: ObjectiveService,
    private auditableAreaService: AuditableAreaService,
    private inspectionActivitiesService: InspectionActivitiesService
  ) {
    this.areaId = 0;
  }

  ngOnInit() {
    this.loadPage(this.areaId);
    this.loadObjeectives();
    this.loadAuditableAreas();
  }
  loadPage(auditableAreaId: number) {
    const pageToLoad = this.page || 0;
    this.subAreaService
      .getAllPaged(pageToLoad, this.itemsPerPage, auditableAreaId)
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<InspectionActivities[]> {
    return this.InspectionActivityBehaviorSubject.asObservable();
  }
  loadObjeectives() {
    this.objectiveService.getAllUnPaged().subscribe(res => {
      this.objectives = res;
    });
  }
  loadAuditableAreas() {
    this.auditableAreaService.getAllUnPaged().subscribe(res => {
      this.auditableAreas = res;
    });
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.InspectionActivityBehaviorSubject.next(data);
  }
  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage(this.areaId);
  }
  filterSubAreaByArea(auditableArea: AuditableArea) {
    if (auditableArea) {
      this.areaId = auditableArea.id as number;
      this.loadPage(this.areaId);
    } else {
      this.areaId = 0 as number;
      this.loadPage(0);
    }
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
            this.loadPage(this.areaId);
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
