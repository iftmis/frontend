import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
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
  public showProgress: boolean;
  error: string | undefined = undefined;

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: RiskRankFormService,
    private riskRankService: RiskRankService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<RiskRankDetailComponent>
  ) {
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.showProgress = false;
  }

  ngOnInit() {
    this.route.data.subscribe(({ riskRank }) => {
      this.riskRank = riskRank;
      this.form = this.formService.toFormGroup(riskRank);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.showProgress = true;
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
        // this.router.navigate(['/settings/risk-ranks']);
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
    this.router.navigate(['/main/settings/risk-ranks']);
    return false;
  }
}
