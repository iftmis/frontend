import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamMeetingService {
  private resourceUrl = 'api/team-meetings';
  private timelineResourceUrl = 'api/team-meeting-timelines';

  constructor(private http: HttpClient) {}

  getByInspection(id: number): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/by-inspection/${id}`);
  }

  update(teamMeeting: any): Observable<any> {
    return this.http.put<any>(`${this.resourceUrl}`, teamMeeting);
  }

  getTimeline(meetingId: number): Observable<any> {
    return this.http.get<any>(
      `${this.timelineResourceUrl}/by-meeting/${meetingId}`
    );
  }

  createTimeline(timeLine: any): Observable<any> {
    return this.http.post<any>(`${this.timelineResourceUrl}`, timeLine);
  }

  updateTimeline(timeLine: any): Observable<any> {
    return this.http.put<any>(`${this.timelineResourceUrl}`, timeLine);
  }

  deleteTimeline(id: number): Observable<any> {
    return this.http.delete<any>(`${this.timelineResourceUrl}/${id}`);
  }
}
