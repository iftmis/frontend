import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourtesyDetailComponent } from './courtesy-detail/courtesy-detail.component';
import { FormGroup } from '@angular/forms';
import { InspectionMember } from '../../preparation/inspection-member/inspection-member';
import { InspectionMemberDetailComponent } from '../../preparation/inspection-member/inspection-member-detail/inspection-member-detail.component';
import { CourtesyService } from './courtesy.service';
import { BehaviorSubject } from 'rxjs';
import { Courtesy } from './courtesy';
import { InspectionMemberDeleteComponent } from '../../preparation/inspection-member/inspection-member-delete/inspection-member-delete.component';
import { CourtesyDeleteComponent } from './courtesy-delete/courtesy-delete.component';

@Component({
  selector: 'app-courtesy',
  templateUrl: './courtesy.component.html',
  styleUrls: ['./courtesy.component.scss'],
})
export class CourtesyComponent implements OnInit {
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
  ) {}

  ngOnInit() {
    this.loadMeeting();
  }

  loadMeeting() {
    this.courtesyService.getByInspection(this.inspectionId).subscribe(res => {
      this.meetings.next(res.body || []);
    });
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
    const dialogRef = this.dialog.open(InspectionMemberDetailComponent, {
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
