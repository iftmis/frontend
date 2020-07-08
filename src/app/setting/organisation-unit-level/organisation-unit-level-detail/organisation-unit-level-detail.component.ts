import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: OrganisationUnitLevelFormService,
    private organisationUnitLevelService: OrganisationUnitLevelService,
    private titleService: Title
  ) {
    this.titleService.setTitle(
      'Organization Unit Level Details|' + environment.app
    );
  }

  ngOnInit() {
    this.route.data.subscribe(({ organisationUnitLevel }) => {
      this.organisationUnitLevel = organisationUnitLevel;
      this.form = this.formService.toFormGroup(organisationUnitLevel);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.organisationUnitLevelService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.organisationUnitLevelService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<OrganisationUnitLevel>) {
    result.subscribe({
      next: () => this.router.navigate(['/settings/organisation-unit-levels']),
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
    this.router.navigate(['/settings/organisation-unit-levels']);
    return false;
  }
}
