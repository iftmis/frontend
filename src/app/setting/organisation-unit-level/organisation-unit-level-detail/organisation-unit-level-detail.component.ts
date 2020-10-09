import { ToastService } from './../../../shared/toast.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

import { OrganisationUnitLevelService } from '../organisation-unit-level.service';
import { OrganisationUnitLevelFormService } from './organisation-unit-level-form.service';
import { OrganisationUnitLevel } from '../organisation-unit-level';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-organisation-unit-level-detail',
  templateUrl: './organisation-unit-level-detail.component.html',
  styleUrls: ['./organisation-unit-level-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitLevelDetailComponent implements OnInit {
  organisationUnitLevel: OrganisationUnitLevel;
  form: FormGroup;
  public showProgress: boolean;
  error: string | undefined = undefined;

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _toastSvc: ToastService,
    private formService: OrganisationUnitLevelFormService,
    private organisationUnitLevelService: OrganisationUnitLevelService,
    private titleService: Title,
    private _dialogRef: MatDialogRef<OrganisationUnitLevelDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.titleService.setTitle(
      'Organization Unit Level Details | ' + environment.app
    );
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
  }

  ngOnInit() {
    this.route.data.subscribe(({ organisationUnitLevel }) => {
      this.organisationUnitLevel = organisationUnitLevel;
      this.form = this.formService.toFormGroup(organisationUnitLevel);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.organisationUnitLevelService.update(
          this.formService.fromFormGroup(this.form)
        ),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.organisationUnitLevelService.create(
          this.formService.fromFormGroup(this.form)
        ),
        'create'
      );
    }
  }

  private subscribeToResponse(
    result: Observable<OrganisationUnitLevel>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this._toastSvc.success(
            'Success!',
            'Organisation Unit Updated Successfully'
          );
        } else {
          this._toastSvc.success(
            'Success!',
            'Organisation Unit Created Successfully'
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
    this.router.navigate(['/main/settings/organisation-unit-levels']);
    return false;
  }
}
