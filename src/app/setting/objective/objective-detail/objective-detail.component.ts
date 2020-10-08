import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.label = data.label;
    this.action = data.action;
    this.showProgress = false;
  }

  ngOnInit() {
    this.route.data.subscribe(({ objective }) => {
      this.objective = objective;
      this.form = this.formService.toFormGroup(objective);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.objectiveService.update(this.formService.fromFormGroup(this.form))
      );
    } else {
      this.subscribeToResponse(
        this.objectiveService.create(this.formService.fromFormGroup(this.form))
      );
    }
  }

  private subscribeToResponse(result: Observable<Objective>) {
    result.subscribe({
      next: () => this.router.navigate(['/main/settings/objectives']),
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
    this.router.navigate(['/main/settings/objectives']);
    return false;
  }
}
