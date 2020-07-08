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
    private titleService: Title
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
        this.gfsCodeService.update(this.formService.fromFormGroup(this.form))
      );
    } else {
      this.subscribeToResponse(
        this.gfsCodeService.create(this.formService.fromFormGroup(this.form))
      );
    }
  }

  private subscribeToResponse(result: Observable<GfsCode>) {
    result.subscribe({
      next: () => this.router.navigate(['/gfs-codes']),
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
    this.router.navigate(['/gfs-codes']);
    return false;
  }
}
