import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { OrganisationUnitService } from '../organisation-unit.service';
import { OrganisationUnitFormService } from './organisation-unit-form.service';
import { OrganisationUnit } from '../organisation-unit';
import { OrganisationUnitLevelService } from 'src/app/setting/organisation-unit-level/organisation-unit-level.service';
import { OrganisationUnitLevel } from 'src/app/setting/organisation-unit-level/organisation-unit-level';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../shared/toast.service';
import { JhiDataUtils, JhiFileLoadError } from 'ng-jhipster';

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
  levels: BehaviorSubject<OrganisationUnitLevel[]> = new BehaviorSubject([]);
  organisationUnits: OrganisationUnit[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: OrganisationUnitFormService,
    private organisationUnitService: OrganisationUnitService,
    private ouLevelService: OrganisationUnitLevelService,
    private titleService: Title,
    private toastService: ToastService,
    protected dataUtils: JhiDataUtils,
    protected elementRef: ElementRef
  ) {
    this.titleService.setTitle('Organization Unit Details|' + environment.app);
  }

  ngOnInit() {
    this.loadLevels();
    this.route.data.subscribe(({ organisationUnit }) => {
      this.organisationUnit = organisationUnit;
      this.form = this.formService.toFormGroup(organisationUnit);
    });

    this.error = undefined;
  }

  loadLevels() {
    this.ouLevelService.query().subscribe(resp => {
      const l = resp.body || [];
      this.levels.next(l);
    });
  }

  getLevels(): Observable<OrganisationUnitLevel[]> {
    return this.levels.asObservable();
  }

  filterParent(value: string) {
    if (value.length > 0) {
      this.organisationUnitService
        .query({
          'name.contains': value.toLowerCase(),
        })
        .subscribe(
          resp => {
            this.organisationUnits = resp.body || [];
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  displayFn(item: OrganisationUnit) {
    if (item) {
      return item.name;
    } else {
      return '';
    }
  }

  checkParent() {
    const x = this.form.value.parent as OrganisationUnit;
    if (x === null) {
      this.form.value.parentId.reset();
    } else {
      if (!x.id) {
        this.form.value.parentId.reset();
      }
    }
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.organisationUnitService.update(
          this.formService.fromFormGroup(this.form)
        ),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.organisationUnitService.create(
          this.formService.fromFormGroup(this.form)
        ),
        'create'
      );
    }
  }

  private subscribeToResponse(
    result: Observable<OrganisationUnit>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Organisation Unit Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Organisation Unit Created Successfully'
          );
        }
        this.router.navigate(['/settings/organisation-units']);
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

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils
      .loadFileToForm(event, this.form, field, isImage)
      .subscribe(null, (err: JhiFileLoadError) => {
        this.toastService.error('Error', 'Image Upload Error');
      });
  }

  clearInputImage(
    field: string,
    fieldContentType: string,
    idInput: string
  ): void {
    this.form.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (
      this.elementRef &&
      idInput &&
      this.elementRef.nativeElement.querySelector('#' + idInput)
    ) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  trackOrganisationUnitLevelId(index: number, item: OrganisationUnitLevel) {
    return item.id;
  }

  getLevelId(): number {
    if (this.form.value.organisationUnitLevel) {
      return this.form.value.organisationUnitLevel.id as number;
    } else {
      return 0;
    }
  }

  getLevel(): OrganisationUnitLevel {
    if (this.form.value.organisationUnitLevel) {
      return this.form.value.organisationUnitLevel as OrganisationUnitLevel;
    } else {
      return {} as OrganisationUnitLevel;
    }
  }

  cancel() {
    this.router.navigate(['/settings/organisation-units']);
    return false;
  }
}
