import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { CourtesyService } from './courtesy.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Courtesy } from './courtesy';
import { CourtesyDeleteComponent } from './courtesy-delete/courtesy-delete.component';
import { CourtesyDetailComponent } from './courtesy-detail/courtesy-detail.component';
import { CourtesyUploadComponent } from './courtesy-upload/courtesy-upload.component';
import { CourtesyMembersComponent } from './courtesy-members/courtesy-members.component';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { ToastService } from '../../../shared/toast.service';
import { RiskCategoryDetailComponent } from '../../../setting/risk-category/risk-category-detail/risk-category-detail.component';

@Component({
  selector: 'app-courtesy',
  templateUrl: './courtesy.component.html',
  styleUrls: ['./courtesy.component.scss'],
})
export class CourtesyComponent implements OnInit {
  displayedColumns = ['meetingDate', 'venue', 'formActions'];

  form: FormGroup;
  routeData$ = this.route.data;
  showLoader = false;
  courtesySubject: BehaviorSubject<Courtesy[]> = new BehaviorSubject<
    Courtesy[]
  >([]);
  @Input() inspectionId: any;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;
  meetingType: string;
  payload: Courtesy;

  constructor(
    private route: ActivatedRoute,
    private courtesyService: CourtesyService,
    private router: Router,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {
    this.inspectionId = route.snapshot.parent?.params['id'];
  }

  ngOnInit() {
    this.loadPage(
      this.page,
      this.itemsPerPage,
      this.inspectionId.id,
      'COURTESY'
    );
  }

  loadPage(
    page: number,
    size: number,
    inspectionId: number,
    meetingType: string
  ) {
    this.courtesyService
      .getByTypeAndInspeId(page, size, inspectionId, meetingType)
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<Courtesy[]> {
    return this.courtesySubject.asObservable();
  }

  create() {
    const data = {
      title: 'Creates a Courtesy Meeting',
      action: 'create',
      label: 'Save Courtesy Meeting',
      inspectionId: this.inspectionId.id,
    };

    const config = new MatDialogConfig();
    config.data = data;
    config.width = '60%';
    config.position = {
      top: '80px',
    };
    config.panelClass = 'mat-dialog-box';
    config.backdropClass = 'mat-dialog-overlay';
    config.disableClose = true;
    config.autoFocus = false;

    const dialogRef = this.dialog.open(CourtesyDetailComponent, config);
    dialogRef.afterClosed().subscribe(response => {
      console.log('Alfred', response);
      // if (response.success) {
      // this.loadPage(this.page, this.size);
      this.loadPage(
        this.page,
        this.itemsPerPage,
        this.inspectionId.id,
        'COURTESY'
      );
      // }
    });
  }

  update(courtesy: any) {
    // this.payload = {
    //   meetingDate: this.form.value.meetingDate,
    //   venue: this.form.value.venue,
    //   inspectionId: this.inspectionId.id,
    //   type: 'COURTESY',
    // };
    const data = {
      title: `Update Courtesy Meeting`,
      action: 'update',
      label: 'Update Courtesy Meeting',
      row: courtesy,
      inspectionId: this.inspectionId.id,
    };

    const config = new MatDialogConfig();
    config.data = data;

    config.width = '60%';
    config.position = {
      top: '80px',
    };
    config.panelClass = 'mat-dialog-box';
    config.backdropClass = 'mat-dialog-overlay';
    config.disableClose = true;
    config.autoFocus = false;

    const dialogRef = this.dialog.open(CourtesyDetailComponent, config);
    dialogRef.afterClosed().subscribe(response => {
      // console.log(response);
      // if (response.success) {
      // this.loadPage(this.page, this.size);
      this.loadPage(
        this.page,
        this.itemsPerPage,
        this.inspectionId.id,
        'COURTESY'
      );
      // }
    });
  }

  delete(id: number, courtesy: Courtesy) {
    const dialogRef = this.dialog.open(CourtesyDeleteComponent, {
      data: courtesy,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.courtesyService.delete(id).subscribe({
          next: () => {
            this.loadPage(
              this.page,
              this.itemsPerPage,
              this.inspectionId.id,
              'COURTESY'
            );
            this.toastService.success(
              'Success',
              'Courtesy Meeting Deleted Successfully!'
            );
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  // createOrEdit() {
  //   const data = {
  //     title: 'Create a new Courtesy',
  //     action: 'create',
  //     label: 'save',
  //     inspectionId: this.inspectionId,
  //   };
  //
  //   const config = new MatDialogConfig();
  //   config.data = data;
  //   config.panelClass = 'mat-dialog-box';
  //   config.backdropClass = 'mat-dialog-overlay';
  //   config.disableClose = false;
  //   config.width = '50%';
  //   config.position = {
  //     top: '80px',
  //   };
  //
  //   const dialogRef = this.dialog.open(CourtesyDetailComponent, config);
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.loadPage(
  //       this.page,
  //       this.itemsPerPage,
  //       this.inspectionId.id,
  //       'COURTESY'
  //     );
  //     if (result) {
  //       this.showLoader = true;
  //     }
  //   });
  // }
  // Adding member in a meeting starts here
  addMember(courtesy: any) {
    const data = {
      title: 'Add Member in Courtesy Meeting',
      action: 'create',
      label: 'save',
      row: courtesy,
      // inspectionId: this.inspectionId,
    };

    const config = new MatDialogConfig();
    config.data = data;
    config.panelClass = 'mat-dialog-box';
    config.backdropClass = 'mat-dialog-overlay';
    config.disableClose = false;
    config.width = '50%';
    config.position = {
      top: '80px',
    };

    const dialogRef = this.dialog.open(CourtesyMembersComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      this.loadPage(
        this.page,
        this.itemsPerPage,
        this.inspectionId.id,
        'COURTESY'
      );
      if (result) {
        this.showLoader = true;
      }
    });
  }
  // Adding member in a meeting ends here

  uploadMinutes() {
    const dialogRef = this.dialog.open(CourtesyUploadComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loadPage(
        this.page,
        this.itemsPerPage,
        this.inspectionId.id,
        this.meetingType
      );
      if (result) {
        this.showLoader = true;
      }
    });
  }

  addMembers() {
    const dialogRef = this.dialog.open(CourtesyMembersComponent, {
      data: { inspectionId: this.inspectionId },
    });
  }
  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.courtesySubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage(
      this.page,
      this.itemsPerPage,
      this.inspectionId.id,
      this.meetingType
    );
  }

  viewMembers(element: any) {}
}
