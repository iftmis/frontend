import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../user-management/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CourtesyService } from '../courtesy.service';
import { ToastService } from '../../../../shared/toast.service';
import { Courtesy } from '../Courtesy';
import { Title } from '@angular/platform-browser';
import { CourtesyFormService } from './courtesy-form.service';
import { Briefing } from '../../briefying/Briefing';

@Component({
  selector: 'app-courtesy-detail',
  templateUrl: './courtesy-detail.component.html',
  styleUrls: ['./courtesy-detail.component.scss'],
})
export class CourtesyDetailComponent implements OnInit {
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  inspectionId: any;
  error: string | undefined = undefined;
  id: number;
  file: any;
  courtesy: Courtesy;
  payload: Courtesy;
  meetingId: number;
  showProgress: any;
  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courtesyService: CourtesyService,
    private formService: CourtesyFormService,
    private toastService: ToastService,
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourtesyDetailComponent>
  ) {
    // this.inspectionId = route.snapshot.parent?.params.id;
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.inspectionId = data.inspectionId;

    if (this.action === 'update') {
      this.courtesy = data.row;
      this.meetingId = data.row.id;
    }
    this.showProgress = false;
  }

  ngOnInit() {
    console.log('INPSECTION ID ' + this.inspectionId);
    this.form = this.formService.toFormGroup(this.courtesy);

    this.error = undefined;
    this.form = this.initform();
    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        meetingDate: this.form.value.meetingDate,
        venue: this.form.value.venue,
        inspectionId: this.inspectionId,
        type: 'COURTESY',
      });
    } else {
      return this._formBuilder.group({
        id: [''],
        meetingDate: ['', Validators.required],
        venue: ['', Validators.required],
        inspectionId: this.inspectionId,
        type: 'COURTESY',
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
        type: 'COURTESY',
        id: this.meetingId,
      };
      this.subscribeToResponse(
        this.courtesyService.update(this.payload),
        'update'
      );

      // if not to update
    } else {
      this.payload = {
        meetingDate: this.form.value.meetingDate,
        venue: this.form.value.venue,
        inspectionId: this.inspectionId,
        type: 'COURTESY',
      };
      this.subscribeToResponse(
        this.courtesyService.create(this.payload),
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
