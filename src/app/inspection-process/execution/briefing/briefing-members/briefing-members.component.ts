import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';
import { BriefingMember } from '../Briefing-member';
import { BriefingMembersService } from './briefing-members.service';

@Component({
  selector: 'app-briefing-members',
  templateUrl: './briefing-members.component.html',
  styleUrls: ['./briefing-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BriefingMembersComponent implements OnInit {
  routeData$ = this.route.data;
  showLoader = false;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  @Input() meetingId: any;
  error: string | undefined = undefined;

  meetings: BehaviorSubject<BriefingMember[]> = new BehaviorSubject<
    BriefingMember[]
  >([]);
  briefingMember: any;
  showProgress: any;
  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private briefingMembersService: BriefingMembersService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BriefingMembersComponent>
  ) {
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.meetingId = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadMeeting();
  }

  loadMeeting() {
    this.briefingMembersService
      .getByInspection(this.meetingId)
      .subscribe(res => {
        this.meetings.next(res || []);
      });
  }
  getMeetings(): Observable<BriefingMember[]> {
    return this.meetings.asObservable();
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    const briefing = this.briefingMembersService.fromFormGroup(this.form);
    if (this.form.value.id) {
      // @ts-ignore
      this.subscribeToResponse(this.briefingMembersService.update(briefing));
    } else {
      // @ts-ignore
      this.subscribeToResponse(this.briefingMembersService.create(briefing));
    }
  }

  private subscribeToResponse(
    result: Observable<BriefingMember>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Briefing Member added Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Briefing Member added Successfully'
          );
        }
        this.dialogRef.close({ success: true });
      },
      error: response => {
        this.showProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.showProgress = false),
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
