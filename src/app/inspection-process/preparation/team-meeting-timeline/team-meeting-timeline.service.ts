import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TeamMeetingTimeline } from './team-meeting-timeline';

@Injectable({
  providedIn: 'root',
})
export class TeamMeetingTimelineService {
  private resourceUrl = 'api/team-meeting-timelines';

  constructor(private http: HttpClient) {}

  getAll(meetingId: number): Observable<TeamMeetingTimeline[]> {
    return this.http.get<TeamMeetingTimeline[]>(
      `${this.resourceUrl}/by-meeting/${meetingId}`
    );
  }

  getById(id: number): Observable<TeamMeetingTimeline> {
    return this.http.get<TeamMeetingTimeline>(`${this.resourceUrl}/${id}`);
  }

  create(
    teamMeetingTimeline: TeamMeetingTimeline
  ): Observable<TeamMeetingTimeline> {
    return this.http.post<TeamMeetingTimeline>(
      this.resourceUrl,
      teamMeetingTimeline
    );
  }

  update(
    teamMeetingTimeline: TeamMeetingTimeline
  ): Observable<TeamMeetingTimeline> {
    return this.http.put<TeamMeetingTimeline>(
      `${this.resourceUrl}`,
      teamMeetingTimeline
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
