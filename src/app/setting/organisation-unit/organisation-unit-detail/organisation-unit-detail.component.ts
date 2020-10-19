import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { OrganisationUnitService } from '../organisation-unit.service';
import { OrganisationUnitFormService } from './organisation-unit-form.service';
import { OrganisationUnit } from '../organisation-unit';
import { OrganisationUnitLevelService } from 'src/app/setting/organisation-unit-level/organisation-unit-level.service';
import { OrganisationUnitLevel } from 'src/app/setting/organisation-unit-level/organisation-unit-level';
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
  showProgress = false;
  error: string | undefined = undefined;
  levels: BehaviorSubject<OrganisationUnitLevel[]> = new BehaviorSubject([]);
  organisationUnits: OrganisationUnit[];
  parent: OrganisationUnit;

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: OrganisationUnitFormService,
    private organisationUnitService: OrganisationUnitService,
    private ouLevelService: OrganisationUnitLevelService,
    private titleService: Title,
    private toastService: ToastService,
    protected dataUtils: JhiDataUtils,
    protected elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<OrganisationUnitDetailComponent>
  ) {
    this.title = data.title;
    this.label = data.label;
    this.action = data.action;
    this.showProgress = false;

    if (this.action === 'update') {
      this.organisationUnit = data.row;
    }
  }

  ngOnInit() {
    this.loadLevels();
    this.route.data.subscribe(({ organisationUnit, parent }) => {
      this.organisationUnit = organisationUnit;
      this.parent = parent;
      this.form = this.formService.toFormGroup(organisationUnit);
      this.setParent(parent);
    });

    this.error = undefined;
    this.form = this.initform();
  }
  setParent(parent: OrganisationUnit) {
    if (parent) {
      this.parent = parent;
      this.form.patchValue({ parentId: parent.id });
    }
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        id: [this.organisationUnit.id],
        code: [this.organisationUnit.code],
        name: [this.organisationUnit.name],
        address: [this.organisationUnit.address],
        phoneNumber: [this.organisationUnit.phoneNumber],
        email: [this.organisationUnit.email],
        background: [this.organisationUnit.background],
        logo: [this.organisationUnit.logo],
        logoContentType: [this.organisationUnit.logoContentType],
        organisationUnitLevelId: [
          this.organisationUnit.organisationUnitLevelId,
        ],
        parentId: [this.organisationUnit.parentId],
      });
    } else {
      return this._formBuilder.group({
        id: [''],
        code: ['', Validators.required],
        name: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', Validators.required],
        background: ['', Validators.required],
        logo: ['', Validators.required],
        logoContentType: ['', Validators.required],
        organisationUnitLevelId: ['', Validators.required],
        parentId: ['', Validators.required],
      });
    }
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

  saveOrUpdate() {
    this.showProgress = true;
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
        // this.router.navigate(['/main/settings/organisation-units']);
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
    this.router.navigate(['/main/settings/organisation-units']);
    return false;
  }
}
