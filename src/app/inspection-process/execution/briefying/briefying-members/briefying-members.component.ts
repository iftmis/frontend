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
import { BriefyingMember } from '../Briefying-member';
import { BriefyingMembersService } from './briefying-members.service';

@Component({
  selector: 'app-briefying-members',
  templateUrl: './briefying-members.component.html',
  styleUrls: ['./briefying-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BriefyingMembersComponent implements OnInit {
  routeData$ = this.route.data;
  showLoader = false;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  @Input() meetingId: any;
  error: string | undefined = undefined;

  meetings: BehaviorSubject<BriefyingMember[]> = new BehaviorSubject<
    BriefyingMember[]
  >([]);
  briefyingMember: any;
  showProgress: any;
  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private briefyingMembersService: BriefyingMembersService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BriefyingMembersComponent>
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
    this.briefyingMembersService
      .getByInspection(this.meetingId)
      .subscribe(res => {
        this.meetings.next(res || []);
      });
  }
  getMeetings(): Observable<BriefyingMember[]> {
    return this.meetings.asObservable();
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    const briefying = this.briefyingMembersService.fromFormGroup(this.form);
    if (this.form.value.id) {
      // @ts-ignore
      this.subscribeToResponse(this.briefyingMembersService.update(briefying));
    } else {
      // @ts-ignore
      this.subscribeToResponse(this.briefyingMembersService.create(briefying));
    }
  }

  private subscribeToResponse(
    result: Observable<BriefyingMember>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Briefying Member Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Briefying Member Created Successfully'
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
