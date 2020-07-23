import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { InspectionBudgetService } from '../inspection-budget.service';
import { InspectionBudgetFormService } from './inspection-budget-form.service';
import { InspectionBudget } from '../inspection-budget';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GfsCodeService } from '../../../../setting/gfs-code/gfs-code.service';
import { GfsCode } from '../../../../setting/gfs-code/gfs-code';

@Component({
  selector: 'app-inspection-budget-detail',
  templateUrl: './inspection-budget-detail.component.html',
  styleUrls: ['./inspection-budget-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionBudgetDetailComponent implements OnInit {
  inspectionBudget: InspectionBudget;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  gfsCodes: BehaviorSubject<GfsCode[]> = new BehaviorSubject<GfsCode[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionBudgetFormService,
    private inspectionBudgetService: InspectionBudgetService,
    @Inject(MAT_DIALOG_DATA) public data: InspectionBudget,
    private dialogRef: MatDialogRef<InspectionBudgetDetailComponent>,
    private gfsCodeService: GfsCodeService
  ) {}

  ngOnInit() {
    this.inspectionBudget = this.data;
    console.log(this.inspectionBudget);
    this.error = undefined;
    this.loadGfsCode();
    this.form = this.formService.toFormGroup(this.inspectionBudget);
  }

  loadGfsCode() {
    this.gfsCodeService.query().subscribe(res => {
      this.gfsCodes.next(res.body || []);
    });
  }

  getGfsCode(): Observable<GfsCode[]> {
    return this.gfsCodes.asObservable();
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionBudgetService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionBudgetService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionBudget>) {
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
    this.cancel();
    return false;
  }
}
