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
import { FormControl } from '@angular/forms';
import { ObjectiveService } from '../../../setting/objective/objective.service';
import { AuditableAreaService } from '../../../setting/auditable-area/auditable-area.service';
import { SubAreaService } from '../../../setting/sub-area/sub-area.service';

@Component({
  selector: 'app-inspection-activities-list',
  templateUrl: './inspection-activities-list.component.html',
  styleUrls: ['./inspection-activities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionActivitiesListComponent implements OnInit {
  displayedColumns = ['No', 'activity', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;
  totalItems = 0;
  inspectionActivity: InspectionActivities;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;
  filter = {
    'objectiveId.equals': null,
    'auditableAreaId.equals': null,
    'subAreaId.equals': null,
  };
  size: number;
  InspectionActivityBehaviorSubject: BehaviorSubject<
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
    private objectiveService: ObjectiveService,
    private auditableAreaService: AuditableAreaService,
    private subAreaService: SubAreaService,
    private inspectionActivitiesService: InspectionActivitiesService
  ) {
    this.areaId = 0;
  }

  ngOnInit() {
    this.loadPage(this.page, this.itemsPerPage);

    this.loadObjeectives();

    this.loadAuditableAreas();

    // this.loadSubAreas();
  }

  loadPage(page: number, size: number) {
    const pageToLoad = this.page || 0;
    this.inspectionActivitiesService
      .query({
        'objectiveId.equals': this.filter['objectiveId.equals'],
        'auditableAreaId.equals': this.filter['auditableAreaId.equals'],
        'subAreaId.equals': this.filter['subAreaId.equals'],
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

  // loadSubAreas() {
  //   this.subAreaService.getAllUnPaged().subscribe(res => {
  //     this.subAreas = res;
  //   });
  // }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.InspectionActivityBehaviorSubject.next(data);
  }
  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;

    this.loadPage(this.page, this.itemsPerPage);
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
            this.loadPage(this.page, this.itemsPerPage);
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

  loadSubAreas(auditableAreaId: number) {
    this.subAreaService
      .getAllSubAreaByAreaId(auditableAreaId)
      .subscribe(response => {
        this.subAreas = response;
      });
  }

  filterSubAreaByArea(auditableArea: number) {
    this.areaId = auditableArea;
    this.loadSubAreas(this.areaId);
  }

  filterActivityFromSelection() {
    // Filter activity by selection

    const pageToLoad = this.page || 0;
    this.inspectionActivitiesService
      .query({
        'objectiveId.equals': this.filter['objectiveId.equals'],
        'auditableAreaId.equals': this.filter['auditableAreaId.equals'],
        'subAreaId.equals': this.filter['subAreaId.equals'],
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  edit(element: InspectionActivities) {
    const data = {
      title: 'Update Inspection Activity',
      action: 'update',
      inspectionPlanId: element.inspectionPlanId,
      selectedInspectionActivity: element,
      organisationUnit: element.organisationUnits,
    };

    // console.log('THE ID IS  ');

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    /*dialogConfig.height = '80%';*/
    dialogConfig.width = '60%';
    dialogConfig.data = data;

    // this.service.populateForm(form)

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
        this.loadPage(this.page, this.itemsPerPage);
        this.toastService.success(
          'Success!',
          'Inspection Activity Created Successfully!'
        );
      }
    });
  }
}
