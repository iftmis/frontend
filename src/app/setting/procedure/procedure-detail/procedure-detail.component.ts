import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: ProcedureFormService,
    private procedureService: ProcedureService,
    private toastService: ToastService,
    private indicatorService: IndicatorService
  ) {}

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
        this.router.navigate(['/settings/procedures']);
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
    this.router.navigate(['/settings/procedures']);
    return false;
  }
}
