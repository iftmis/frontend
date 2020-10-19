import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from '../../../shared/toast.service';
import { ProcedureFormService } from './procedure-form.service';
import { Procedure } from '../procedure';
import { ProcedureService } from '../procedure.service';
import { IndicatorService } from '../../indicator/indicator.service';
import { Indicator } from '../../indicator/indicator';

@Component({
  selector: 'app-procedure-detail',
  templateUrl: './procedure-detail.component.html',
  styleUrls: ['./procedure-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcedureDetailComponent implements OnInit {
  procedure: Procedure;
  form: FormGroup;
  public showProgress: boolean;
  error: string | undefined = undefined;
  indicators: Indicator[] = [];

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: ProcedureFormService,
    private procedureService: ProcedureService,
    private toastService: ToastService,
    private indicatorService: IndicatorService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<ProcedureDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.showProgress = false;

    if (this.action === 'update') {
      this.procedure = data.row;
    }
  }

  ngOnInit() {
    this.loadIndicators();
    // this.route.data.subscribe(({ procedure }) => {
    //   this.procedure = procedure;
    //   this.form = this.formService.toFormGroup(procedure);
    // });
    this.form = this.initform();
    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        id: [this.procedure.id],
        indicatorId: [this.procedure.indicatorId],
        indicatorName: [this.procedure.indicatorName],
        name: [this.procedure.name],
      });
    } else {
      return this._formBuilder.group({
        id: [],
        indicatorId: ['', Validators.required],
        indicatorName: [''],
        name: ['', Validators.required],
      });
    }
  }

  loadIndicators() {
    this.indicatorService.getAllUnPaged().subscribe(resp => {
      this.indicators = resp;
    });
  }

  save() {
    this.showProgress = true;

    this.error = undefined;
    if (this.action === 'update') {
      this.subscribeToResponse(
        this.procedureService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.procedureService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<Procedure>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Procedure Updated Successfully!'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Procedure Created Successfully!'
          );
        }
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
    this.router.navigate(['/main/settings/procedures']);
    return false;
  }
}
