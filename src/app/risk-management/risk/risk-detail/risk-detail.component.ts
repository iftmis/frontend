import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { RiskService } from '../risk.service';
import { RiskFormService } from './risk-form.service';
import { Risk } from '../risk';
import { RiskCategory } from '../../../setting/risk-category/risk-category';
import { Objective } from '../../../setting/objective/objective';
import { ObjectiveService } from '../../../setting/objective/objective.service';
import { RiskCategoryService } from '../../../setting/risk-category/risk-category.service';

@Component({
  selector: 'app-risk-detail',
  templateUrl: './risk-detail.component.html',
  styleUrls: ['./risk-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskDetailComponent implements OnInit {
  risk: Risk;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  riskCategorySubject: BehaviorSubject<RiskCategory[]> = new BehaviorSubject(
    []
  );

  riskObjectiveSubject: BehaviorSubject<Objective[]> = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: RiskFormService,
    private riskService: RiskService,
    private objectiveService: ObjectiveService,
    private riskCategoryService: RiskCategoryService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ risk }) => {
      this.risk = risk;
      this.form = this.formService.toFormGroup(risk);
    });

    this.error = undefined;
  }

  loadObjectives() {}

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.riskService.update(this.formService.fromFormGroup(this.form))
      );
    } else {
      this.subscribeToResponse(
        this.riskService.create(this.formService.fromFormGroup(this.form))
      );
    }
  }

  private subscribeToResponse(result: Observable<Risk>) {
    result.subscribe({
      next: () => this.router.navigate(['/risk-management/risks']),
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
    this.router.navigate(['/risk-management/risks']);
    return false;
  }
}
