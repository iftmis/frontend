import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FindingRecommendation } from '../recommendation';
import { FindingResponseService } from '../finding-response.service';
import { FindingResponse } from '../finding-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  findingRecommendation: FindingRecommendation;
  findingResponse: FindingResponse;
  action: string;
  form: FormGroup;
  error: string | undefined = undefined;
  isSaveOrUpdateInProgress = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FormComponent>,
    private formBuilder: FormBuilder,
    private findingResponseService: FindingResponseService
  ) {
    this.findingRecommendation = data.findingRecommendation;
    this.action = data.action;
    if (this.action === 'update') {
      this.findingResponse = data.findingResponse;
    }
  }

  ngOnInit(): void {
    this.form = this.initFormGroup();
    this.error = undefined;
  }

  initFormGroup(): FormGroup {
    if (this.action === 'create') {
      return this.formBuilder.group({
        source: ['AUDITOR', Validators.required],
        description: ['', Validators.required],
      });
    } else {
      return this.formBuilder.group({
        id: [this.findingResponse.id, Validators.required],
        source: [this.findingResponse.source, Validators.required],
        description: [this.findingResponse.description, Validators.required],
      });
    }
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      const payload = {
        id: this.form.value.id,
        source: this.form.value.source,
        description: this.form.value.description,
        recommendationId: this.findingRecommendation.id as number,
      } as FindingResponse;
      this.subscribeToResponse(this.findingResponseService.update(payload));
    } else {
      const payload = {
        source: this.form.value.source,
        description: this.form.value.description,
        recommendationId: this.findingRecommendation.id as number,
      } as FindingResponse;
      this.subscribeToResponse(this.findingResponseService.create(payload));
    }
  }

  private subscribeToResponse(result: Observable<FindingResponse>) {
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
}
