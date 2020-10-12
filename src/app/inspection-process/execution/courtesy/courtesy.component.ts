import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { CourtesyService } from './courtesy.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Courtesy } from './courtesy';
import { CourtesyDeleteComponent } from './courtesy-delete/courtesy-delete.component';
import { CourtesyDetailComponent } from './courtesy-detail/courtesy-detail.component';
import { CourtesyUploadComponent } from './courtesy-upload/courtesy-upload.component';
import { CourtesyMembersComponent } from './courtesy-members/courtesy-members.component';

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
  meetings: BehaviorSubject<Courtesy[]> = new BehaviorSubject<Courtesy[]>([]);
  @Input() inspectionId: number;

  constructor(
    private route: ActivatedRoute,
    private courtesyService: CourtesyService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.inspectionId = route.snapshot.parent?.params['id'];
  }

  ngOnInit() {
    this.loadMeeting();
  }

  loadMeeting() {
    this.courtesyService.getByInspection(this.inspectionId).subscribe(res => {
      this.meetings.next(res.body || []);
    });
  }
  getMeetings(): Observable<Courtesy[]> {
    return this.meetings.asObservable();
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(CourtesyDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.courtesyService.delete(id).subscribe({
          next: () => this.loadMeeting(),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  createOrEdit() {
    console.log('Careen', this.inspectionId);
    const dialogRef = this.dialog.open(CourtesyDetailComponent, {
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
    const dialogRef = this.dialog.open(CourtesyUploadComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loadMeeting();
      if (result) {
        this.showLoader = true;
      }
    });
  }

  addMembers() {
    const dialogRef = this.dialog.open(CourtesyMembersComponent, {
      data: { inspectionId: this.inspectionId },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadMeeting();
      if (result) {
        this.showLoader = true;
      }
    });
  }
}
