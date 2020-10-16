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
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourtesyDetailComponent>
  ) {
    this.inspectionId = route.snapshot.parent?.params['id'];
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.inspectionId = data.inspectionId;

    if (this.action === 'update') {
      this.courtesy = data.row;
    }
    this.showProgress = false;
  }

  ngOnInit() {
    this.route.data.subscribe(({ courtesy }) => {
      this.courtesy = courtesy;
      this.form = this.formService.toFormGroup(courtesy);
    });
    this.id = this.inspectionId;

    this.error = undefined;
    this.form = this.initform();
    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        // id: this.form.value.id,
        // code: [this.courtesy.code],
        // name: [this.courtesy.name],
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
        inspectionId: this.inspectionId.id,
        type: 'COURTESY',
      });
    }
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    this.payload = {
      meetingDate: this.form.value.meetingDate,
      venue: this.form.value.venue,
      inspectionId: this.inspectionId.id,
      type: 'COURTESY',
    };
    if (this.action === 'update') {
      this.subscribeToResponse(
        this.courtesyService.update(this.payload),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.courtesyService.create(this.payload),
        'create'
      );
    }
  }

  // saveOrUpdate() {
  //   this.payload = {
  //     meetingDate: this.form.value.meetingDate,
  //     venue: this.form.value.venue,
  //     inspectionId: this.inspectionId.id,
  //     type: 'COURTESY',
  //   };
  //   this.isSaveOrUpdateInProgress = true;
  //   this.error = undefined;
  //   if (this.form.value.id) {
  //     this.subscribeToResponse(
  //       this.courtesyService.update(this.payload),
  //       'update'
  //     );
  //   } else {
  //     this.subscribeToResponse(
  //       this.courtesyService.create(this.payload),
  //       'create'
  //     );
  //   }
  // }

  private subscribeToResponse(result: Observable<Courtesy>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Courtesy Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Courtesy Created Successfully'
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
    // this.router.navigate(['/']);
    this.dialogRef.close();
    return false;
  }
}
