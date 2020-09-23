import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { InspectionProcedureService } from '../inspection-procedure.service';
import { InspectionProcedureFormService } from './inspection-procedure-form.service';
import { InspectionProcedure } from '../inspection-procedure';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Procedure } from '../../../../setting/procedure/procedure';
import { ProcedureService } from '../../../../setting/procedure/procedure.service';

@Component({
  selector: 'app-inspection-procedure-detail',
  templateUrl: './inspection-procedure-detail.component.html',
  styleUrls: ['./inspection-procedure-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionProcedureDetailComponent implements OnInit {
  inspectionProcedure: InspectionProcedure;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  procedures: BehaviorSubject<Procedure[]> = new BehaviorSubject<Procedure[]>(
    []
  );
  inspectionIndicators: any = [];
  existingProcedures: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionProcedureFormService,
    private inspectionProcedureService: InspectionProcedureService,
    private procedureService: ProcedureService,
    private dialogRef: MatDialogRef<InspectionProcedureDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.inspectionIndicators = this.data.inspectionIndicators || []; // Selected indicator as array of single value for display purpose
    this.existingProcedures = this.data.existingProcedures || []; // Ids of already added to be removed from selection to avoid duplicates
    this.inspectionProcedure = this.data.inspectionProcedure; // Procedure to be created or modified
    this.form = this.formService.toFormGroup(this.inspectionProcedure);
    this.error = undefined;
    this.loadProcedures();
  }

  /**
   * Pre configure/setup procures to be used as templates to be added to inspection
   * loaded by ind
   */
  loadProcedures() {
    const selectedInspectionIndicator =
      this.inspectionIndicators[0] || undefined;
    if (
      selectedInspectionIndicator &&
      selectedInspectionIndicator.indicatorId
    ) {
      this.procedureService
        .getByIndicator(selectedInspectionIndicator.indicatorId)
        .subscribe(res => this.filterProcedures(res));
    }
  }

  filterProcedures(procedures: Procedure[]) {
    this.procedures.next(
      procedures.filter(
        (p: any) => this.existingProcedures.indexOf(p.id) === -1
      )
    );
  }

  getProcedures(): Observable<Procedure[]> {
    return this.procedures.asObservable();
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionProcedureService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionProcedureService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionProcedure>) {
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
