import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TeamMeetingTimelineService } from '../team-meeting-timeline.service';
import { TeamMeetingTimelineFormService } from './team-meeting-timeline-form.service';
import { TeamMeetingTimeline } from '../team-meeting-timeline';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/user-management/user/user';
import { UserService } from 'src/app/user-management/user/user.service';

@Component({
  selector: 'app-team-meeting-timeline-detail',
  templateUrl: './team-meeting-timeline-detail.component.html',
  styleUrls: ['./team-meeting-timeline-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMeetingTimelineDetailComponent implements OnInit {
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  users: User[] = [];

  constructor(
    private router: Router,
    private formService: TeamMeetingTimelineFormService,
    private teamMeetingTimelineService: TeamMeetingTimelineService,
    private dialogRef: MatDialogRef<TeamMeetingTimelineDetailComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public teamMeetingTimeline: TeamMeetingTimeline
  ) {}

  ngOnInit() {
    this.userService.getAllUnPaged().subscribe(resp => {
      this.users = resp;
    });
    this.form = this.formService.toFormGroup(this.teamMeetingTimeline);
    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.teamMeetingTimelineService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.teamMeetingTimelineService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<TeamMeetingTimeline>) {
    result.subscribe({
      next: (result: any) => this.dialogRef.close(result),
      error: response => {
        this.isSaveOrUpdateInProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.isSaveOrUpdateInProgress = false),
    });
  }

  cancel() {
    this.dialogRef.close();
    return false;
  }
}
