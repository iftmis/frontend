import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { InspectionBudgetService } from '../../inspection-budget/inspection-budget.service';
import { TeamMeetingService } from './team-meeting.service';
import { TeamMeetingFormService } from './team-meeting-form.service';

@Component({
  selector: 'app-team-meeting',
  templateUrl: './team-meeting.component.html',
  styleUrls: ['./team-meeting.component.scss'],
})
export class TeamMeetingComponent implements OnInit {
  displayedColumns = ['activity', 'responsible', 'days', 'formActions'];
  @Input() inspectionId: number;
  form: FormGroup;
  teamMeetingId: number;
  timeLine: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  budget: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private teamMeetingService: TeamMeetingService,
    private budgetService: InspectionBudgetService,
    private formService: TeamMeetingFormService
  ) {}

  ngOnInit(): void {
    this.teamMeetingService
      .getByInspection(this.inspectionId)
      .subscribe(resp => {
        this.form = this.formService.toFormGroup(resp);
        this.teamMeetingId = resp.id;
        this.loadTimeLines();
        this.loadBudget();
      });
  }

  update() {
    console.log(this.form.value);
    this.teamMeetingService.update(this.form.value).subscribe(resp => {
      this.form = this.formService.toFormGroup(resp);
    });
  }

  loadTimeLines() {
    this.teamMeetingService.getTimeline(this.teamMeetingId).subscribe(resp => {
      this.timeLine.next(resp);
    });
  }

  loadBudget() {
    this.budgetService.getByInspection(this.inspectionId).subscribe(resp => {
      this.budget.next(resp);
    });
  }

  getTimeLine(): Observable<any> {
    return this.timeLine.asObservable();
  }

  getBudget(): Observable<any> {
    return this.budget.asObservable();
  }
}
