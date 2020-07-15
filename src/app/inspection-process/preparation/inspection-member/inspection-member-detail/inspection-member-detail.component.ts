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

import { InspectionMemberService } from '../inspection-member.service';
import { InspectionMemberFormService } from './inspection-member-form.service';
import { InspectionMember } from '../inspection-member';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../user-management/user/user.service';
import { User } from '../../../../user-management/user/user';

@Component({
  selector: 'app-inspection-member-detail',
  templateUrl: './inspection-member-detail.component.html',
  styleUrls: ['./inspection-member-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionMemberDetailComponent implements OnInit {
  inspectionMember: InspectionMember;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  inspectionId: number;
  roleOptions: KeyValue<string, string>[] = [
    { key: 'TEAM_LEAD', value: 'Team Lead' },
    { key: 'MEMBER', value: 'Member' },
  ];
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionMemberFormService,
    private inspectionMemberService: InspectionMemberService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InspectionMemberDetailComponent>
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.inspectionMember = this.data.inspectionMember;
    this.form = this.formService.toFormGroup(this.inspectionMember);
    this.inspectionId = this.data.inspectionId;
    console.log(this.inspectionId);
    if (this.inspectionMember === undefined) {
      this.form.patchValue({
        inspectionId: this.inspectionId,
      });
    }
    this.error = undefined;
  }

  loadUsers() {
    this.userService.getAllUnPaged().subscribe(res => {
      this.users.next(res);
    });
  }
  getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionMemberService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionMemberService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionMember>) {
    result.subscribe({
      next: () => this.dialogRef.close(),
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
  }
}
