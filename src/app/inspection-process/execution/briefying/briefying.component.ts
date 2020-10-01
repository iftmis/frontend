import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BriefyingService } from './briefying.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Briefying } from './Briefying';
import { BriefyingDeleteComponent } from './briefying-delete/briefying-delete.component';
import { BriefyingDetailComponent } from './briefying-detail/briefying-detail.component';
import { BriefyingUploadComponent } from './briefying-upload/briefying-upload.component';

@Component({
  selector: 'app-briefying',
  templateUrl: './briefying.component.html',
  styleUrls: ['./briefying.component.scss'],
})
export class BriefyingComponent implements OnInit {
  displayedColumns = ['briefying_date', 'briefying_venue', 'formActions'];
  form: FormGroup;
  routeData$ = this.route.data;
  showLoader = false;
  meetings: BehaviorSubject<Briefying[]> = new BehaviorSubject<Briefying[]>([]);
  @Input() inspectionId: number;
  constructor(
    private route: ActivatedRoute,
    private briefyingService: BriefyingService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadMeeting();
  }
  loadMeeting() {
    this.briefyingService.getByInspection(this.inspectionId).subscribe(res => {
      this.meetings.next(res.body || []);
    });
  }
  getMeetings(): Observable<Briefying[]> {
    return this.meetings.asObservable();
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(BriefyingDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.briefyingService.delete(id).subscribe({
          next: () => this.loadMeeting(),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
  createOrEdit() {
    const dialogRef = this.dialog.open(BriefyingDetailComponent, {
      data: { inspectionId: this.inspectionId },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadMeeting();
      if (result) {
        this.showLoader = true;
      }
    });
  }

  uploadMinutes() {
    const dialogRef = this.dialog.open(BriefyingUploadComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loadMeeting();
      if (result) {
        this.showLoader = true;
      }
    });
  }
}
