import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuditProgramEngagementService } from '../audit-program-engagement.service';
import { AuditProgramEngagementFormService } from './audit-program-engagement-form.service';
import { AuditProgramEngagement } from '../audit-program-engagement';
import { AuditableAreaService } from 'src/app/auditable-area/auditable-area.service';
import { AuditableArea } from 'src/app/auditable-area/auditable-area';

@Component({
  selector: 'app-audit-program-engagement-detail',
  templateUrl: './audit-program-engagement-detail.component.html',
  styleUrls: ['./audit-program-engagement-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditProgramEngagementDetailComponent implements OnInit {
  auditProgramEngagement: AuditProgramEngagement;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  auditableAreas: AuditableArea[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: AuditProgramEngagementFormService,
    private audtableAreaService: AuditableAreaService,
    private auditProgramEngagementService: AuditProgramEngagementService
  ) {}

  ngOnInit() {
    this.getAuditableAreas();

    this.error = undefined;
  }
  getAuditableAreas() {
    this.audtableAreaService.query().subscribe(res => {
      this.auditableAreas = res;
      this.route.data.subscribe(({ auditProgramEngagement }) => {
        this.auditProgramEngagement = auditProgramEngagement;
        this.form = this.formService.toFormGroup(auditProgramEngagement);
      });
    });
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.auditProgramEngagementService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.auditProgramEngagementService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<AuditProgramEngagement>) {
    result.subscribe({
      next: () => this.router.navigate(['/audit-program-engagements']),
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
    this.router.navigate(['/audit-program-engagements']);
    return false;
  }
}
