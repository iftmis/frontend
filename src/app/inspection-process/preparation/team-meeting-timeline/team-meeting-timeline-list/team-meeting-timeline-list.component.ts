import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { TeamMeetingTimelineService } from '../team-meeting-timeline.service';
import { TeamMeetingTimelineDeleteComponent } from '../team-meeting-timeline-delete/team-meeting-timeline-delete.component';
import { TeamMeetingTimelineDetailComponent } from '../team-meeting-timeline-detail/team-meeting-timeline-detail.component';
import { TeamMeetingTimeline } from '../team-meeting-timeline';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-team-meeting-timeline-list',
  templateUrl: './team-meeting-timeline-list.component.html',
  styleUrls: ['./team-meeting-timeline-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMeetingTimelineListComponent implements OnInit {
  @Input() teamMeetingId: number;
  timelines: BehaviorSubject<TeamMeetingTimeline[]> = new BehaviorSubject<
    TeamMeetingTimeline[]
  >([]);

  displayedColumns = [
    'activity',
    'userFullName',
    'days',
    'comments',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private teamMeetingTimelineService: TeamMeetingTimelineService
  ) {}

  ngOnInit() {
    this.loadTimeline();
  }

  loadTimeline() {
    this.teamMeetingTimelineService
      .getAll(this.teamMeetingId)
      .subscribe(resp => {
        this.timelines.next(resp);
      });
  }

  getTimelines() {
    return this.timelines.asObservable();
  }

  createOrUpdate(timeline: TeamMeetingTimeline) {
    const dialogRef = this.dialog.open(TeamMeetingTimelineDetailComponent, {
      data: timeline,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTimeline();
      }
    });
  }

  delete(id: number, teamMeetingTimeline: TeamMeetingTimeline) {
    const dialogRef = this.dialog.open(TeamMeetingTimelineDeleteComponent, {
      data: teamMeetingTimeline,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.teamMeetingTimelineService.delete(id).subscribe({
          next: () => this.loadTimeline(),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
