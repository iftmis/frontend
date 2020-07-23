import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../shared/toast.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FindingFormService } from './finding-form.service';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';
import { Observable } from 'rxjs';
import { FindingService } from '../finding.service';
import { Finding } from '../finding';
import { FindingRecommendation } from '../../recommendation/recommendation';

@Component({
  selector: 'app-finding-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  action: string;
  finding: Finding;
  form: FormGroup;
  error: string | undefined = undefined;
  organisationUnit: OrganisationUnit;
  source: string;
  findingRecommendations: FindingRecommendation[] = [];
  findingRecommendationForm: FormGroup;
  descriptionControl = new FormControl('');
  implementationStatusControl = new FormControl('');
  isSaveOrUpdateInProgress = false;
  displayedColumns: string[] = [
    'id',
    'description',
    'implementationStatus',
    'manage',
  ];
  actionCategories = ['LOW', 'MEDIUM', 'HIGH'];
  implementationStatusList = [
    'IMPLEMENTED',
    'NOT_IMPLEMENTED',
    'PARTIAL_IMPLEMENTED',
    'TAKEN_BY_EVENT',
  ];
  findingRecommendationDataSource = new MatTableDataSource<
    FindingRecommendation
  >();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toastService: ToastService,
    private findingFormService: FindingFormService,
    private findingService: FindingService,
    private dialogRef: MatDialogRef<FormComponent>
  ) {
    this.action = data.action;
    if (this.action === 'update') {
      this.finding = data.finding;
      this.findingRecommendations = data.finding.findingRecommendations;
      this.findingRecommendationDataSource.data = this.findingRecommendations;
    }
    this.organisationUnit = data.organisationUnit;
    this.source = data.source;
  }

  ngOnInit(): void {
    this.form = this.findingFormService.toFormGroup(this.finding);
    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      const payload = {
        id: this.form.value.id,
        code: this.form.value.code,
        source: this.source,
        description: this.form.value.description,
        actionPlanCategory: this.form.value.actionPlanCategory,
        organisationUnitId: this.organisationUnit.id,
        findingRecommendations: this.findingRecommendations,
      } as Finding;
      this.subscribeToResponse(this.findingService.update(payload));
    } else {
      const payload = {
        code: this.form.value.code,
        source: this.source,
        description: this.form.value.description,
        actionPlanCategory: this.form.value.actionPlanCategory,
        organisationUnitId: this.organisationUnit.id,
        findingRecommendations: this.findingRecommendations,
      } as Finding;
      this.subscribeToResponse(this.findingService.create(payload));
    }
  }

  private subscribeToResponse(result: Observable<Finding>) {
    result.subscribe({
      next: () => {
        this.dialogRef.close({ success: true });
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
    this.dialogRef.close();
    return false;
  }

  addRecommendation() {
    let exits = false;
    this.findingRecommendations.map(row => {
      if (row.implementationStatus === this.implementationStatusControl.value) {
        exits = true;
      }
    });
    if (exits) {
      this.toastService.error(
        'Duplicate!',
        'Implementation Status Already Added!'
      );
    } else {
      const item = {
        implementationStatus: this.implementationStatusControl.value,
        description: this.descriptionControl.value,
      } as FindingRecommendation;

      this.findingRecommendations.push(item);
      this.findingRecommendationDataSource.data = this.findingRecommendations;
      this.implementationStatusControl.reset('');
      this.descriptionControl.reset('');
    }
  }

  deleteRecommendation(i: number) {
    this.findingRecommendations.splice(i, 1);
    this.findingRecommendationDataSource.data = this.findingRecommendations;
  }
}
