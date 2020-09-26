import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { InspectionPlanService } from '../inspection-plan.service';
import { InspectionPlanDeleteComponent } from '../inspection-plan-delete/inspection-plan-delete.component';
import { InspectionPlan } from '../inspection-plan';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { PageEvent } from '@angular/material/paginator';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from '../../../shared/toast.service';
import { GfsCode } from '../../../setting/gfs-code/gfs-code';
import { InspectionActivitiesDetailComponent } from '../../inspection-activities/inspection-activities-detail/inspection-activities-detail.component';

@Component({
  selector: 'app-inspection-plan-list',
  templateUrl: './inspection-plan-list.component.html',
  styleUrls: ['./inspection-plan-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionPlanListComponent implements OnInit {
  displayedColumns = [
    'name',
    'FinancialYearName',
    'OrganisationUnitName',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  inspectionPlanSubject: BehaviorSubject<
    InspectionPlan[]
  > = new BehaviorSubject([]);

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionPlanService: InspectionPlanService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.inspectionPlanService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }
  getData(): Observable<InspectionPlan[]> {
    return this.inspectionPlanSubject.asObservable();
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.inspectionPlanSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }

  delete(id: number, inspectionPlan: InspectionPlan) {
    const dialogRef = this.dialog.open(InspectionPlanDeleteComponent, {
      data: inspectionPlan,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionPlanService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'Inspection Plan Deleted Successfully!'
            );
            this.router.navigate(['inspection-planning/inspection-planning']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  create(id: number) {
    const data = {
      title: 'Create Inspection Activity',
      action: 'create',
      inspectionPlanId: id,
    };
    console.log('THE ID IS' + id);

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
}
