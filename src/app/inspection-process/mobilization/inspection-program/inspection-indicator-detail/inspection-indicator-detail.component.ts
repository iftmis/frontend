import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionIndicatorService } from '../inspection-indicator.service';
import { InspectionIndicatorFormService } from './inspection-indicator-form.service';
import { InspectionIndicator } from '../inspection-indicator';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionIndicatorFormService,
    private inspectionIndicatorService: InspectionIndicatorService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ inspectionIndicator }) => {
      this.inspectionIndicator = inspectionIndicator;
      this.form = this.formService.toFormGroup(inspectionIndicator);
    });

    this.error = undefined;
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
      next: () => this.router.navigate(['/inspection-indicators']),
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
    this.router.navigate(['/inspection-indicators']);
    return false;
  }
}
