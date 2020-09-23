import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { InspectionService } from '../inspection.service';
import { InspectionFormService } from './inspection-form.service';
import { Inspection } from '../inspection';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.component.html',
  styleUrls: ['./inspection-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionDetailComponent implements OnInit {
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  inspectionTypeOptions: KeyValue<string, string>[] = [
    { key: 'PLANNED', value: 'Planned' },
    { key: 'SPECIAL', value: 'Special' },
  ];
  error: string | undefined = undefined;

  constructor(
    private router: Router,
    private formService: InspectionFormService,
    private inspectionService: InspectionService,
    @Inject(MAT_DIALOG_DATA) public inspection: Inspection,
    private dialogRef: MatDialogRef<InspectionDetailComponent>
  ) {}

  ngOnInit() {
    this.form = this.formService.toFormGroup(this.inspection);
    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    console.log(this.form.value);
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionService.update(this.formService.fromFormGroup(this.form))
      );
    } else {
      this.subscribeToResponse(
        this.inspectionService.create(this.formService.fromFormGroup(this.form))
      );
    }
  }

  private subscribeToResponse(result: Observable<Inspection>) {
    result.subscribe({
      next: res => this.dialogRef.close(res),
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
