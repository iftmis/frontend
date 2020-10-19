import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ToastService } from '../../../../shared/toast.service';
import { Briefing } from '../Briefing';

import { CourtesyFormService } from '../../courtesy/courtesy-detail/courtesy-form.service';
import { BriefingService } from '../briefing.service';

@Component({
  selector: 'app-briefing-detail',
  templateUrl: './briefing-detail.component.html',
  styleUrls: ['./briefing-detail.component.scss'],
})
export class BriefingDetailComponent implements OnInit {
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  inspectionId: any;
  error: string | undefined = undefined;
  id: number;
  file: any;
  briefing: Briefing;
  payload: Briefing;
  showProgress: any;
  public title: string;
  public action: string;
  public label: string;
  meetingId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private briefingService: BriefingService,
    private formService: CourtesyFormService,
    private toastService: ToastService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BriefingDetailComponent>
  ) {
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.inspectionId = data.inspectionId;

    if (this.action === 'update') {
      this.briefing = data.row;
      this.meetingId = data.row.id;
    }
    this.showProgress = false;
  }

  ngOnInit() {
    console.log('INPSECTION ID ' + this.inspectionId);
    this.form = this.formService.toFormGroup(this.briefing);

    this.error = undefined;
    this.form = this.initform();
    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        meetingDate: this.form.value.meetingDate,
        venue: this.form.value.venue,
        summary: this.form.value.summary,
        inspectionId: this.inspectionId,
        type: 'BRIEFING',
      });
    } else {
      return this._formBuilder.group({
        id: [''],
        meetingDate: ['', Validators.required],
        venue: ['', Validators.required],
        summary: [''],
        inspectionId: this.inspectionId,
        type: 'BRIEFING',
      });
    }
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;

    if (this.action === 'update') {
      this.payload = {
        meetingDate: this.form.value.meetingDate,
        venue: this.form.value.venue,
        inspectionId: this.inspectionId,
        summary: this.form.value.summary,
        type: 'BRIEFING',
        id: this.meetingId,
      };
      this.subscribeToResponse(
        this.briefingService.update(this.payload),
        'update'
      );

      // if not to update
    } else {
      this.payload = {
        meetingDate: this.form.value.meetingDate,
        venue: this.form.value.venue,
        inspectionId: this.inspectionId,
        summary: this.form.value.summary,
        type: 'BRIEFING',
      };
      this.subscribeToResponse(
        this.briefingService.create(this.payload),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<Briefing>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Briefing Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Briefing Created Successfully'
          );
        }
        this.dialogRef.close();
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
}
