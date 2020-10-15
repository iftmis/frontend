import { Component, Inject, Input, OnInit } from '@angular/core';
import { InspectionMember } from '../../../preparation/inspection-member/inspection-member';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionMemberFormService } from '../../../preparation/inspection-member/inspection-member-detail/inspection-member-form.service';
import { InspectionMemberService } from '../../../preparation/inspection-member/inspection-member.service';
import { UserService } from '../../../../user-management/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CourtesyService } from '../courtesy.service';
import { ToastService } from '../../../../shared/toast.service';
import { Courtesy } from '../courtesy';
import { environment } from '../../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { CourtesyFormService } from './courtesy-form.service';

@Component({
  selector: 'app-courtesy-detail',
  templateUrl: './courtesy-detail.component.html',
  styleUrls: ['./courtesy-detail.component.scss'],
})
export class CourtesyDetailComponent implements OnInit {
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  inspectionId: any;
  error: string | undefined = undefined;
  id: number;
  file: any;
  courtesy: Courtesy;
  payload: Courtesy;
  showProgress: any;
  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private courtesyService: CourtesyService,
    private formService: CourtesyFormService,
    private titleService: Title,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourtesyDetailComponent>
  ) {
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.inspectionId = data.inspectionId;
  }

  ngOnInit() {
    this.route.data.subscribe(({ courtesy }) => {
      this.courtesy = courtesy;
      this.form = this.formService.toFormGroup(courtesy);
    });
    this.id = this.inspectionId;

    this.error = undefined;
  }

  saveOrUpdate() {
    this.payload = {
      meetingDate: this.form.value.meetingDate,
      venue: this.form.value.venue,
      inspectionId: this.inspectionId.id,
      type: 'COURTESY',
    };
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.courtesyService.update(this.payload),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.courtesyService.create(this.payload),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<Courtesy>, action: string) {
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
        this.dialogRef.close();

        // this.router.navigate(['/']);
      },
      error: response => {
        this.isSaveOrUpdateInProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.isSaveOrUpdateInProgress = false),
    });
  }

  cancel() {
    this.router.navigate(['/']);
    return false;
  }
}
