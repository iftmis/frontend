import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ToastService } from '../../../../shared/toast.service';
import { Briefying } from '../Briefying';
import { BriefyingService } from '../briefying.service';
import { CourtesyFormService } from '../../courtesy/courtesy-detail/courtesy-form.service';

@Component({
  selector: 'app-briefying-detail',
  templateUrl: './briefying-detail.component.html',
  styleUrls: ['./briefying-detail.component.scss'],
})
export class BriefyingDetailComponent implements OnInit {
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  inspectionId: any;
  error: string | undefined = undefined;
  id: number;
  file: any;
  briefying: Briefying;
  payload: Briefying;
  showProgress: any;
  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private briefyingService: BriefyingService,
    private formService: CourtesyFormService,
    private toastService: ToastService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BriefyingDetailComponent>
  ) {
    this.inspectionId = route.snapshot.parent?.params['id'];
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.inspectionId = data.inspectionId;

    if (this.action === 'update') {
      this.briefying = data.row;
    }
    this.showProgress = false;
  }

  ngOnInit() {
    this.route.data.subscribe(({ briefying }) => {
      this.briefying = briefying;
      this.form = this.formService.toFormGroup(briefying);
    });
    this.id = this.inspectionId;

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
        inspectionId: this.inspectionId.id,
        type: 'BRIEFING',
      });
    }
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    this.payload = {
      meetingDate: this.form.value.meetingDate,
      venue: this.form.value.venue,
      summary: this.form.value.summary,
      inspectionId: this.inspectionId.id,
      type: 'BRIEFING',
    };
    if (this.action === 'update') {
      this.subscribeToResponse(
        this.briefyingService.update(this.payload),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.briefyingService.create(this.payload),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<Briefying>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Briefying Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Briefying Created Successfully'
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
    this.router.navigate(['/']);
    return false;
  }
}
