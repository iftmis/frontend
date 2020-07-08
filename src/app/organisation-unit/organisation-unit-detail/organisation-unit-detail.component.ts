import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { OrganisationUnitService } from '../organisation-unit.service';
import { OrganisationUnitFormService } from './organisation-unit-form.service';
import { OrganisationUnit } from '../organisation-unit';
import { OrganisationUnitLevelService } from 'src/app/organisation-unit-level/organisation-unit-level.service';
import { OrganisationUnitLevel } from 'src/app/organisation-unit-level/organisation-unit-level';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-organisation-unit-detail',
  templateUrl: './organisation-unit-detail.component.html',
  styleUrls: ['./organisation-unit-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitDetailComponent implements OnInit {
  organisationUnit: OrganisationUnit;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  organisationUnitLevels: HttpResponse<OrganisationUnitLevel[]>;
  organisationUnits: OrganisationUnit[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: OrganisationUnitFormService,
    private organisationUnitService: OrganisationUnitService,
    private ouLevelService: OrganisationUnitLevelService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Organization Unit Details|' + environment.app);
  }

  ngOnInit() {
    this.loadLevels();
    this.loadOus();
    this.route.data.subscribe(({ organisationUnit }) => {
      this.organisationUnit = organisationUnit;
      this.form = this.formService.toFormGroup(organisationUnit);
    });

    this.error = undefined;
  }

  loadLevels() {
    this.ouLevelService.query().subscribe(resp => {
      this.organisationUnitLevels = resp;
    });
  }

  loadOus() {
    this.organisationUnitService.query().subscribe(resp => {
      this.organisationUnits = resp;
    });
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.organisationUnitService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.organisationUnitService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<OrganisationUnit>) {
    result.subscribe({
      next: () => this.router.navigate(['/organisation-units']),
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
    this.router.navigate(['/organisation-units']);
    return false;
  }
}
