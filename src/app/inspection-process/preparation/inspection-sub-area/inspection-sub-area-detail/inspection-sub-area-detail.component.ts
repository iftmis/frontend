import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { InspectionSubAreaService } from '../inspection-sub-area.service';
import { InspectionSubAreaFormService } from './inspection-sub-area-form.service';
import { InspectionSubArea } from '../inspection-sub-area';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubArea } from '../../../../setting/sub-area/sub-area';
import { SubAreaService } from '../../../../setting/sub-area/sub-area.service';
import { InspectionArea } from '../../inspection-area/inspection-area';

@Component({
  selector: 'app-inspection-sub-area-detail',
  templateUrl: './inspection-sub-area-detail.component.html',
  styleUrls: ['./inspection-sub-area-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionSubAreaDetailComponent implements OnInit {
  inspectionSubArea: InspectionSubArea;
  inspectionAreas: any = [];
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  subAreas: BehaviorSubject<SubArea[]> = new BehaviorSubject<SubArea[]>([]);
  selectedArea: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionSubAreaFormService,
    private inspectionSubAreaService: InspectionSubAreaService,
    private dialogRef: MatDialogRef<InspectionSubAreaDetailComponent>,
    private subAreaService: SubAreaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.inspectionSubArea = this.data.inspectionSubArea;
    this.selectedArea = this.data.selectedArea;
    this.inspectionAreas = [this.selectedArea];
    this.form = this.formService.toFormGroup(this.inspectionSubArea);
    this.error = undefined;
    this.loadSubAreas(this.selectedArea.auditableAreaId);
  }

  loadSubAreas(auditAreaId: number | undefined) {
    if (auditAreaId === undefined) {
      this.subAreas.next([]);
      return;
    }
    this.subAreaService.getByArea(auditAreaId).subscribe(res => {
      this.subAreas.next(
        res.filter(
          sa => this.selectedArea.selectedSubAreaIds.indexOf(sa.id) === -1
        )
      );
    });
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionSubAreaService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionSubAreaService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionSubArea>) {
    result.subscribe({
      next: () => this.dialogRef.close('success'),
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
    this.dialogRef.close();
    return false;
  }

  getSubAreas(): Observable<SubArea[]> {
    return this.subAreas.asObservable();
  }
}
