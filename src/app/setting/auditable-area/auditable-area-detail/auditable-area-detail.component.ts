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

import { AuditableAreaService } from '../auditable-area.service';
import { AuditableAreaFormService } from './auditable-area-form.service';
import { AuditableArea } from '../auditable-area';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-auditable-area-detail',
  templateUrl: './auditable-area-detail.component.html',
  styleUrls: ['./auditable-area-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditableAreaDetailComponent implements OnInit {
  auditableArea: AuditableArea;
  form: FormGroup;
  public showProgress: boolean;
  error: string | undefined = undefined;

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: AuditableAreaFormService,
    private auditableAreaService: AuditableAreaService,
    private titleService: Title,
    private toastService: ToastService,
    private _dialogRef: MatDialogRef<AuditableAreaDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;

    this.titleService.setTitle('Auditable Area Details|' + environment.app);
  }

  ngOnInit() {
    this.route.data.subscribe(({ auditableArea }) => {
      this.auditableArea = auditableArea;
      this.form = this.formService.toFormGroup(auditableArea);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    const formData = this.formService.fromFormGroup(this.form);
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.auditableAreaService.update(formData),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.auditableAreaService.create(formData),
        'create'
      );
    }
  }

  private subscribeToResponse(
    result: Observable<AuditableArea>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Auditable Area Updated Successfully!'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Auditable Area Created Successfully!'
          );
        }
        // this.router.navigate(['/main/settings/auditable-areas']);
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
    this.router.navigate(['/settings/auditable-areas']);
    return false;
  }
}
