import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  isSaveOrUpdateInProgress = false;
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
  }

  ngOnInit() {
    this.loadIndicators();
    this.route.data.subscribe(({ procedure }) => {
      this.procedure = procedure;
      this.form = this.formService.toFormGroup(procedure);
    });

    this.error = undefined;
  }

  loadIndicators() {
    this.indicatorService.getAllUnPaged().subscribe(resp => {
      this.indicators = resp;
    });
  }

  save() {
    this.isSaveOrUpdateInProgress = true;

    this.error = undefined;
    if (this.form.value.id) {
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
        this.router.navigate(['/main/settings/procedures']);
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
    this.router.navigate(['/main/settings/procedures']);
    return false;
  }
}
