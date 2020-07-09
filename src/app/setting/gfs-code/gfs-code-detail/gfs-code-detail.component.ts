import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GfsCodeService } from '../gfs-code.service';
import { GfsCodeFormService } from './gfs-code-form.service';
import { GfsCode } from '../gfs-code';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-gfs-code-detail',
  templateUrl: './gfs-code-detail.component.html',
  styleUrls: ['./gfs-code-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GfsCodeDetailComponent implements OnInit {
  gfsCode: GfsCode;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: GfsCodeFormService,
    private gfsCodeService: GfsCodeService,
    private titleService: Title,
    private toastService: ToastService
  ) {
    this.titleService.setTitle('GFS Code Details|' + environment.app);
  }

  ngOnInit() {
    this.route.data.subscribe(({ gfsCode }) => {
      this.gfsCode = gfsCode;
      this.form = this.formService.toFormGroup(gfsCode);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.gfsCodeService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.gfsCodeService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<GfsCode>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'GFS Code Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'GFS Code Initiated Successfully'
          );
        }
        this.router.navigate(['/settings/gfs-codes']);
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
    this.router.navigate(['/settings/gfs-codes']);
    return false;
  }
}
