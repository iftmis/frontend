import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RiskRankService } from '../risk-rank.service';
import { RiskRankFormService } from './risk-rank-form.service';
import { RiskRank } from '../risk-rank';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-risk-rank-detail',
  templateUrl: './risk-rank-detail.component.html',
  styleUrls: ['./risk-rank-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskRankDetailComponent implements OnInit {
  riskRank: RiskRank;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: RiskRankFormService,
    private riskRankService: RiskRankService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ riskRank }) => {
      this.riskRank = riskRank;
      this.form = this.formService.toFormGroup(riskRank);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.riskRankService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.riskRankService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<RiskRank>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'create') {
          this.toastService.success(
            'Success!',
            'Risk Rank Created Successfully!'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Risk Rank Updated Successfully!'
          );
        }
        this.router.navigate(['/settings/risk-ranks']);
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
    this.router.navigate(['/settings/risk-ranks']);
    return false;
  }
}
