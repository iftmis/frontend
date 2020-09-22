import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionWorkDoneService } from '../inspection-work-done.service';
import { InspectionWorkDoneFormService } from './inspection-work-done-form.service';
import { InspectionWorkDone } from '../inspection-work-done';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inspection-work-done-detail',
  templateUrl: './inspection-work-done-detail.component.html',
  styleUrls: ['./inspection-work-done-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionWorkDoneDetailComponent implements OnInit {
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionWorkDoneFormService,
    private inspectionWorkDoneService: InspectionWorkDoneService,
    @Inject(MAT_DIALOG_DATA) public inspectionWorkDone: InspectionWorkDone,
    private dialogRef: MatDialogRef<InspectionWorkDoneDetailComponent>
  ) {}

  ngOnInit() {
    this.form = this.formService.toFormGroup(this.inspectionWorkDone);
    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionWorkDoneService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionWorkDoneService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionWorkDone>) {
    result.subscribe({
      next: data => this.dialogRef.close(data),
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
    this.dialogRef.close();
    return false;
  }
}
