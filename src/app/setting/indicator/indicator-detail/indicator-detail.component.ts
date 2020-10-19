import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  public showProgress: boolean;
  error: string | undefined = undefined;
  subAreas: BehaviorSubject<SubArea[]> = new BehaviorSubject([]);

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: IndicatorFormService,
    private indicatorService: IndicatorService,
    private subAreaService: SubAreaService,
    private toastService: ToastService,
    private _dialogRef: MatDialogRef<IndicatorDetailComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.label = data.label;
    this.action = data.action;

    this.showProgress = false;

    if (this.action === 'update') {
      this.indicator = data.row;
    }
  }

  ngOnInit() {
    this.loadSubAreas();
    // this.route.data.subscribe(({ indicator }) => {
    //   this.indicator = indicator;
    //   this.form = this.formService.toFormGroup(indicator);
    // });
    this.form = this.initform();

    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        id: [this.indicator.id],
        subAreaId: [this.indicator.subAreaId],
        subAreaName: [this.indicator.subAreaName],
        name: [this.indicator.name],
      });
    } else {
      return this._formBuilder.group({
        id: [],
        subAreaId: [],
        subAreaName: ['', Validators.required],
        name: ['', Validators.required],
      });
    }
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
    this.showProgress = true;
    this.error = undefined;
    if (this.action === 'update') {
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
        // this.router.navigate(['/main/settings/indicators']);
        this._dialogRef.close({ success: true });
      },
      error: response => {
        this.showProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.showProgress = false),
    });
  }

  cancel() {
    this.router.navigate(['/main/settings/indicators']);
    return false;
  }
}
