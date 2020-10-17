import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { CourtesyMembersService } from './courtesy-members.service';
import { ActivatedRoute } from '@angular/router';
import { CourtesyMember } from '../courtesy-member';
import { ToastService } from '../../../../shared/toast.service';

@Component({
  selector: 'app-courtesy-members',
  templateUrl: './courtesy-members.component.html',
  styleUrls: ['./courtesy-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtesyMembersComponent implements OnInit {
  displayedColumns = [];
  routeData$ = this.route.data;
  showLoader = false;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  @Input() meetingId: any;
  error: string | undefined = undefined;

  meetings: BehaviorSubject<CourtesyMember[]> = new BehaviorSubject<
    CourtesyMember[]
  >([]);
  courtesyMember: CourtesyMember;
  courtesyMemberObject: CourtesyMember;
  showProgress: any;
  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private courtesyMemberService: CourtesyMembersService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourtesyMembersComponent>
  ) {
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.meetingId = data.row.id;
  }

  ngOnInit() {
    this.form = this.initform();
    this.loadMeeting();
    console.log('MeetingID : ', this.meetingId);
  }

  loadMeeting() {
    this.courtesyMemberService
      .getByInspection(this.meetingId)
      .subscribe(res => {
        this.meetings.next(res || []);
      });
  }
  getMeetings(): Observable<CourtesyMember[]> {
    return this.meetings.asObservable();
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this.formBuilder.group({
        phoneNumber: [this.courtesyMember.phoneNumber],
        email: [this.courtesyMember.email],
        title: [this.courtesyMember.title],
        name: [this.courtesyMember.name],
      });
    } else {
      return this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        email: [''],
        title: [''],
        phoneNumber: ['', Validators.max(10)],
      });
    }
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    const coutesy = this.courtesyMemberService.fromFormGroup(this.form);
    if (this.form.value.id) {
      this.courtesyMemberObject = {
        title: this.form.value.title,
        phoneNumber: this.form.value.phoneNumber,
        email: this.form.value.email,
        name: this.form.value.name,
      };

      this.action = 'update';
      this.subscribeToResponse(
        this.courtesyMemberService.update(
          this.courtesyMemberObject,
          this.meetingId
        ),
        this.action
      );
    } else {
      this.courtesyMemberObject = {
        title: this.form.value.title,
        phoneNumber: this.form.value.phoneNumber,
        email: this.form.value.email,
        name: this.form.value.name,
      };

      this.subscribeToResponse(
        this.courtesyMemberService.create(
          this.courtesyMemberObject,
          this.meetingId
        ),
        this.action
      );
    }
  }
  private subscribeToResponse(
    result: Observable<CourtesyMember>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Courtesy Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Courtesy Created Successfully'
          );
        }
        this.showProgress = false;
        // this.router.navigate(['/main/settings/sub-areas']);
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
