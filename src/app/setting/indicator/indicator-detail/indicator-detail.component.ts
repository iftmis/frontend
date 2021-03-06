import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { IndicatorService } from '../indicator.service';
import { IndicatorFormService } from './indicator-form.service';
import { Indicator } from '../indicator';
import { SubArea } from 'src/app/setting/sub-area/sub-area';
import { SubAreaService } from 'src/app/setting/sub-area/sub-area.service';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorDetailComponent implements OnInit {
  indicator: Indicator;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  subAreas: BehaviorSubject<SubArea[]> = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: IndicatorFormService,
    private indicatorService: IndicatorService,
    private subAreaService: SubAreaService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadSubAreas();
    this.route.data.subscribe(({ indicator }) => {
      this.indicator = indicator;
      this.form = this.formService.toFormGroup(indicator);
    });

    this.error = undefined;
  }

  loadSubAreas() {
    this.subAreaService.getAllUnPaged().subscribe(resp => {
      this.subAreas.next(resp);
    });
  }

  getSubAreas(): Observable<SubArea[]> {
    return this.subAreas.asObservable();
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.indicatorService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.indicatorService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<Indicator>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Indicator Updated Successfully!'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Indicator Created Successfully!'
          );
        }
        this.router.navigate(['/settings/indicators']);
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
    this.router.navigate(['/settings/indicators']);
    return false;
  }
}
