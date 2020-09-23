import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TeamMeetingTimeline } from '../team-meeting-timeline';

@Component({
  selector: 'app-team-meeting-timeline-delete',
  templateUrl: './team-meeting-timeline-delete.component.html',
  styleUrls: ['./team-meeting-timeline-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMeetingTimelineDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: TeamMeetingTimeline) {}
}
