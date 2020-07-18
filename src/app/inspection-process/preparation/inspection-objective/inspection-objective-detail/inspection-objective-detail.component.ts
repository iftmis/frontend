import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionObjectiveService } from '../inspection-objective.service';
import { InspectionObjectiveFormService } from './inspection-objective-form.service';
import { InspectionObjective } from '../inspection-objective';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InspectionArea } from '../../inspection-area/inspection-area';

@Component({
  selector: 'app-inspection-objective-detail',
  templateUrl: './inspection-objective-detail.component.html',
  styleUrls: ['./inspection-objective-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionObjectiveDetailComponent implements OnInit {
  inspectionObjective: InspectionObjective;
  inspectionAreas: InspectionArea[] = [];
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionObjectiveFormService,
    private inspectionObjectiveService: InspectionObjectiveService,
    private dialogRef: MatDialogRef<InspectionObjectiveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.inspectionAreas = this.data.inspectionObjective;
    this.inspectionAreas = this.data.inspectionAreas;
    this.form = this.formService.toFormGroup(this.data.inspectionObjective);
    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionObjectiveService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionObjectiveService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionObjective>) {
    result.subscribe({
      next: () => this.dialogRef.close('success'),
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
