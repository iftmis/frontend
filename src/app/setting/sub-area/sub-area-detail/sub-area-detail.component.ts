import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SubAreaService } from '../sub-area.service';
import { SubAreaFormService } from './sub-area-form.service';
import { SubArea } from '../sub-area';
import { AuditableArea } from 'src/app/setting/auditable-area/auditable-area';
import { AuditableAreaService } from 'src/app/setting/auditable-area/auditable-area.service';

@Component({
  selector: 'app-sub-area-detail',
  templateUrl: './sub-area-detail.component.html',
  styleUrls: ['./sub-area-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubAreaDetailComponent implements OnInit {
  subArea: SubArea;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  auditableAreas: AuditableArea[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: SubAreaFormService,
    private subAreaService: SubAreaService,
    private areaService: AuditableAreaService
  ) {}

  ngOnInit() {
    this.loadAuditableAreas();
    this.route.data.subscribe(({ subArea }) => {
      this.subArea = subArea;
      this.form = this.formService.toFormGroup(subArea);
    });

    this.error = undefined;
  }

  loadAuditableAreas() {
    this.areaService.query().subscribe(resp => {
      this.auditableAreas = resp.body || [];
    });
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.subAreaService.update(this.formService.fromFormGroup(this.form))
      );
    } else {
      this.subscribeToResponse(
        this.subAreaService.create(this.formService.fromFormGroup(this.form))
      );
    }
  }

  private subscribeToResponse(result: Observable<SubArea>) {
    result.subscribe({
      next: () => this.router.navigate(['/sub-areas']),
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
    this.router.navigate(['/sub-areas']);
    return false;
  }
}
