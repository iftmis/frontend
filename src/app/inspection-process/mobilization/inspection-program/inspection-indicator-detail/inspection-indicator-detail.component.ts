import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { InspectionIndicatorService } from '../inspection-indicator.service';
import { InspectionIndicatorFormService } from './inspection-indicator-form.service';
import { InspectionIndicator } from '../inspection-indicator';
import { Indicator } from '../../../../setting/indicator/indicator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IndicatorService } from '../../../../setting/indicator/indicator.service';

@Component({
  selector: 'app-inspection-indicator-detail',
  templateUrl: './inspection-indicator-detail.component.html',
  styleUrls: ['./inspection-indicator-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionIndicatorDetailComponent implements OnInit {
  inspectionIndicator: InspectionIndicator;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  indicators: BehaviorSubject<Indicator[]> = new BehaviorSubject<Indicator[]>(
    []
  );
  inspectionSubAreas: any = [];
  existingIndicators: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionIndicatorFormService,
    private inspectionIndicatorService: InspectionIndicatorService,
    private indicatorService: IndicatorService,
    private dialogRef: MatDialogRef<InspectionIndicatorDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.inspectionSubAreas = this.data.inspectionSubAreas || [];
    this.inspectionIndicator = this.data.inspectionIndicator;
    this.existingIndicators = this.data.existingIndicators || [];
    this.form = this.formService.toFormGroup(this.inspectionIndicator);
    this.error = undefined;
    this.loadIndicators();
  }

  loadIndicators() {
    const selectedInspectionSubArea = this.inspectionSubAreas[0] || undefined;
    if (selectedInspectionSubArea && selectedInspectionSubArea.subAreaId) {
      this.indicatorService
        .getBySubArea(selectedInspectionSubArea.subAreaId)
        .subscribe(res => this.filterIndicator(res));
    }
  }

  getIndicators(): Observable<Indicator[]> {
    return this.indicators.asObservable();
  }

  filterIndicator(indicators: Indicator[]) {
    this.indicators.next(
      indicators.filter(
        (i: any) => this.existingIndicators.indexOf(i.id) === -1
      )
    );
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionIndicatorService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionIndicatorService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionIndicator>) {
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
