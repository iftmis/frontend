import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TeamMeetingTimeline } from '../team-meeting-timeline';

@Injectable({
  providedIn: 'root',
})
export class TeamMeetingTimelineFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(teamMeetingTimeline: Partial<TeamMeetingTimeline> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(teamMeetingTimeline.id, []),
      activity: this.formBuilder.control(teamMeetingTimeline.activity, []),
      userId: this.formBuilder.control(teamMeetingTimeline.userId, []),
      userFullName: this.formBuilder.control(
        teamMeetingTimeline.userFullName,
        []
      ),
      comments: this.formBuilder.control(teamMeetingTimeline.comments, []),
      days: this.formBuilder.control(teamMeetingTimeline.days, []),
      teamMeetingId: this.formBuilder.control(
        teamMeetingTimeline.teamMeetingId,
        []
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      activity: formGroup.get('activity')!.value,
      userId: formGroup.get('userId')!.value,
      userFullName: formGroup.get('userFullName')!.value,
      comments: formGroup.get('comments')!.value,
      days: formGroup.get('days')!.value,
      teamMeetingId: formGroup.get('teamMeetingId')!.value,
    };
  }
}
