import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BriefyingFormService } from './briefying-form.service';
import { ToastService } from '../../../../shared/toast.service';
import { Briefying } from '../Briefying';
import { BriefyingService } from '../briefying.service';

@Component({
  selector: 'app-briefying-detail',
  templateUrl: './briefying-detail.component.html',
  styleUrls: ['./briefying-detail.component.scss'],
})
export class BriefyingDetailComponent implements OnInit {
  briefying: Briefying;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  // users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  inspectionId: number;
  error: string | undefined = undefined;
  file: any;
  inspectionMember: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private briefyingService: BriefyingService,
    private formService: BriefyingFormService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BriefyingDetailComponent>
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ briefying }) => {
      this.briefying = briefying;
      this.form = this.formService.toFormGroup(briefying);
    });

    this.error = undefined;
  }
  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.briefyingService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.briefyingService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<Briefying>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Briefying Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Briefying Created Successfully'
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
