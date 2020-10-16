import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

import { ObjectiveService } from '../objective.service';
import { ObjectiveFormService } from './objective-form.service';
import { Objective } from '../objective';

@Component({
  selector: 'app-objective-detail',
  templateUrl: './objective-detail.component.html',
  styleUrls: ['./objective-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveDetailComponent implements OnInit {
  objective: Objective;
  form: FormGroup;
  public showProgress: boolean;
  error: string | undefined = undefined;

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: ObjectiveFormService,
    private objectiveService: ObjectiveService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<ObjectiveDetailComponent>,
    private _toastSvc: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.label = data.label;
    this.action = data.action;
    this.showProgress = false;

    if (this.action === 'update') {
      this.objective = data.row;
    }
  }

  ngOnInit() {
    // this.route.data.subscribe(({ objective }) => {
    //   this.objective = objective;
    //   this.form = this.formService.toFormGroup(objective);
    // });
    this.form = this.initform();
    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        id: [this.objective.id],
        code: [this.objective.code],
        description: [this.objective.description],
      });
    } else {
      return this._formBuilder.group({
        id: [''],
        code: ['', Validators.required],
        description: ['', Validators.required],
      });
    }
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.action === 'update') {
      this.subscribeToResponse(
        this.objectiveService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.objectiveService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<Objective>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this._toastSvc.success('Success!', 'Objective Updated Successfully!');
        } else {
          this._toastSvc.success('Success!', 'Objective Created Successfully!');
        }
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
}
