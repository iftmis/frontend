import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SubAreaService } from '../sub-area.service';
import { SubAreaFormService } from './sub-area-form.service';
import { SubArea } from '../sub-area';
import { AuditableArea } from 'src/app/setting/auditable-area/auditable-area';
import { AuditableAreaService } from 'src/app/setting/auditable-area/auditable-area.service';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-sub-area-detail',
  templateUrl: './sub-area-detail.component.html',
  styleUrls: ['./sub-area-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubAreaDetailComponent implements OnInit {
  subArea: SubArea;
  form: FormGroup;
  public showProgress: boolean;
  error: string | undefined = undefined;
  auditableAreas: AuditableArea[] = [];

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: SubAreaFormService,
    private subAreaService: SubAreaService,
    private areaService: AuditableAreaService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<SubAreaDetailComponent>
  ) {
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;

    if (this.action === 'update') {
      this.subArea = data.row;
    }

    this.showProgress = false;
  }

  ngOnInit() {
    this.loadAuditableAreas();
    // this.route.data.subscribe(({ subArea }) => {
    //   this.subArea = subArea;
    //   this.form = this.formService.toFormGroup(subArea);
    // });
    this.form = this.initform();
    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        id: [this.subArea.id],
        name: [this.subArea.name],
        areaId: [this.subArea.areaId],
        areaName: [this.subArea.areaName],
        generalObjective: [this.subArea.generalObjective],
      });
    } else {
      return this._formBuilder.group({
        id: [],
        name: ['', Validators.required],
        areaId: ['', Validators.required],
        areaName: ['', Validators.required],
        generalObjective: ['', Validators.required],
      });
    }
  }

  loadAuditableAreas() {
    this.areaService.getAllUnPaged().subscribe(resp => {
      this.auditableAreas = resp || [];
    });
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.action === 'update') {
      this.subscribeToResponse(
        this.subAreaService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.subAreaService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<SubArea>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Sub-Area Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Sub-Area Created Successfully'
          );
        }
        // this.router.navigate(['/main/settings/sub-areas']);
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
    this.router.navigate(['/main/settings/sub-areas']);
    return false;
  }

  trackAuditableAreaId(index: number, item: AuditableArea) {
    return item.id;
  }
}
