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

@Component({
  selector: 'app-courtesy-detail',
  templateUrl: './courtesy-detail.component.html',
  styleUrls: ['./courtesy-detail.component.scss'],
})
export class CourtesyDetailComponent implements OnInit {
  inspectionMember: InspectionMember;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  @Input() inspectionId: number;
  error: string | undefined = undefined;
  file: any;
  courtesy: Courtesy;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionMemberFormService,
    private inspectionMemberService: InspectionMemberService,
    private userService: UserService,
    private courtesyService: CourtesyService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourtesyDetailComponent>
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ courtesy }) => {
      this.courtesy = courtesy;
      this.form = this.formService.toFormGroup(courtesy);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.courtesyService.update(this.courtesy),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.courtesyService.create(this.courtesy),
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
        this.router.navigate(['/']);
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
