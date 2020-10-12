import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InspectionMember } from '../../../preparation/inspection-member/inspection-member';
import { BehaviorSubject, Observable } from 'rxjs';
import { CourtesyMembersService } from './courtesy-members.service';
import { ActivatedRoute } from '@angular/router';
import { CourtesyMember } from '../courtesy-member';
import { Courtesy } from '../courtesy';
import { SubArea } from '../../../../setting/sub-area/sub-area';
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
  inspectionMember: InspectionMember;
  @Input() inspectionId: any;
  error: string | undefined = undefined;

  public showProgress: boolean;
  meetings: BehaviorSubject<CourtesyMember[]> = new BehaviorSubject<
    CourtesyMember[]
  >([]);

  constructor(
    private route: ActivatedRoute,
    private courtesyMemberService: CourtesyMembersService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<CourtesyMembersComponent>
  ) {}

  ngOnInit() {
    this.loadMeeting();
  }

  loadMeeting() {
    this.courtesyMemberService
      .getByInspection(this.inspectionId)
      .subscribe(res => {
        this.meetings.next(res || []);
      });
  }
  getMeetings(): Observable<CourtesyMember[]> {
    return this.meetings.asObservable();
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.courtesyMemberService.update(this.form),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.courtesyMemberService.create(this.form),
        'create'
      );
    }
  }

  // saveOrUpdate() {
  //   this.isSaveOrUpdateInProgress = true;
  //   this.error = undefined;
  //   const formData = this.courtesyMemberService.fromFormGroup(this.form);
  //   if (this.form.value.id) {
  //     this.subscribeToResponse(this.courtesyMemberService.update(formData));
  //   } else {
  //     this.subscribeToResponse(this.courtesyMemberService.create(formData));
  //   }
  // }
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
