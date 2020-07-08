import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IndicatorService } from '../indicator.service';
import { IndicatorFormService } from './indicator-form.service';
import { Indicator } from '../indicator';
import { SubArea } from 'src/app/setting/sub-area/sub-area';
import { SubAreaService } from 'src/app/setting/sub-area/sub-area.service';

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
  subAreas: SubArea[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: IndicatorFormService,
    private indicatorService: IndicatorService,
    private subAreaService: SubAreaService
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
    this.subAreaService.query().subscribe(resp => {
      this.subAreas = resp;
    });
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.indicatorService.update(this.formService.fromFormGroup(this.form))
      );
    } else {
      this.subscribeToResponse(
        this.indicatorService.create(this.formService.fromFormGroup(this.form))
      );
    }
  }

  private subscribeToResponse(result: Observable<Indicator>) {
    result.subscribe({
      next: () => this.router.navigate(['/indicators']),
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
    this.router.navigate(['/indicators']);
    return false;
  }
}
