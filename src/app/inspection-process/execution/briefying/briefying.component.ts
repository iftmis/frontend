import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BriefyingService } from './briefying.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Briefing } from './Briefing';
import { BriefyingDeleteComponent } from './briefying-delete/briefying-delete.component';
import { BriefyingDetailComponent } from './briefying-detail/briefying-detail.component';
import { BriefyingUploadComponent } from './briefying-upload/briefying-upload.component';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from 'src/app/shared/pagination.constants';
import { CourtesyDetailComponent } from '../courtesy/courtesy-detail/courtesy-detail.component';
import { ToastService } from 'src/app/shared/toast.service';
import { BriefyingMembersComponent } from './briefying-members/briefying-members.component';
import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-briefying',
  templateUrl: './briefying.component.html',
  styleUrls: ['./briefying.component.scss'],
})
export class BriefyingComponent implements OnInit {
  displayedColumns = ['meetingDate', 'venue', 'formActions'];
  form: FormGroup;
  routeData$ = this.route.data;
  showLoader = false;
  briefyingSubject: BehaviorSubject<Briefing[]> = new BehaviorSubject<
    Briefing[]
  >([]);
  @Input() inspectionId: any;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;
  meetingType: string;
  payload: Briefing;

  constructor(
    private route: ActivatedRoute,
    private briefingService: BriefyingService,
    private toastService: ToastService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.inspectionId = route.snapshot.parent?.params['id'];
  }

  ngOnInit() {
    this.loadPage(
      this.page,
      this.itemsPerPage,
      this.inspectionId.id,
      'BRIEFING'
    );
  }

  loadPage(
    page: number,
    size: number,
    inspectionId: number,
    meetingType: string
  ) {
    this.briefingService
      .getByTypeAndInspeId(page, size, inspectionId, meetingType)
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<Briefing[]> {
    return this.briefyingSubject.asObservable();
  }

  uploadMinutes() {
    const dialogRef = this.dialog.open(BriefyingUploadComponent);
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

  create() {
    const data = {
      title: 'Creates a Briefing Meeting',
      action: 'create',
      label: 'Save Briefing Meeting',
      inspectionId: this.inspectionId,
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

    const dialogRef = this.dialog.open(BriefyingDetailComponent, config);
    dialogRef.afterClosed().subscribe(response => {
      // if (response.success) {
      // this.loadPage(this.page, this.size);
      this.loadPage(
        this.page,
        this.itemsPerPage,
        this.inspectionId.id,
        'BRIEFING'
      );
      // }
    });
  }

  update(briefying: any) {
    // this.payload = {
    //   meetingDate: this.form.value.meetingDate,
    //   venue: this.form.value.venue,
    //   inspectionId: this.inspectionId.id,
    //   type: 'BRIEFING',
    // };
    const data = {
      title: `Update Briefing Meeting`,
      action: 'update',
      label: 'Update Briefing Meeting',
      row: briefying,
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

    const dialogRef = this.dialog.open(BriefyingDetailComponent, config);
    dialogRef.afterClosed().subscribe(response => {
      // console.log(response);
      // if (response.success) {
      // this.loadPage(this.page, this.size);
      this.loadPage(
        this.page,
        this.itemsPerPage,
        this.inspectionId.id,
        'BRIEFING'
      );
      // }
    });
  }

  delete(id: number, briefying: Briefing) {
    const dialogRef = this.dialog.open(BriefyingDeleteComponent, {
      data: briefying,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.briefingService.delete(id).subscribe({
          next: () => {
            this.loadPage(
              this.page,
              this.itemsPerPage,
              this.inspectionId.id,
              'BRIEFING'
            );
            this.toastService.success(
              'Success',
              'Briefing Meeting Deleted Successfully!'
            );
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  // Adding member in a meeting starts here
  addMember(briefying: any) {
    const data = {
      title: 'Add Member in Briefing Meeting',
      action: 'create',
      label: 'save',
      row: briefying,
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

    const dialogRef = this.dialog.open(BriefyingMembersComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      this.loadPage(
        this.page,
        this.itemsPerPage,
        this.inspectionId.id,
        'BRIEFING'
      );
      if (result) {
        this.showLoader = true;
      }
    });
  }
  // Adding member in a meeting ends here

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.briefyingSubject.next(data);
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
