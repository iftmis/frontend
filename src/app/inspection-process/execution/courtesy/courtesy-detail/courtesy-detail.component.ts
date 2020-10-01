import { Component, Inject, OnInit } from '@angular/core';
import { InspectionMember } from '../../../preparation/inspection-member/inspection-member';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionMemberFormService } from '../../../preparation/inspection-member/inspection-member-detail/inspection-member-form.service';
import { InspectionMemberService } from '../../../preparation/inspection-member/inspection-member.service';
import { UserService } from '../../../../user-management/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-courtesy-detail',
  templateUrl: './courtesy-detail.component.html',
  styleUrls: ['./courtesy-detail.component.scss'],
})
export class CourtesyDetailComponent implements OnInit {
  inspectionMember: InspectionMember;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  inspectionId: number;
  error: string | undefined = undefined;
  file: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionMemberFormService,
    private inspectionMemberService: InspectionMemberService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CourtesyDetailComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      meetingDate: [''],
      venue: [''],
    });
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      const formData = new FormData();
      // @ts-ignore
      formData.append('meetingDate', this.form.get('meetingDate').value);
      // @ts-ignore
      formData.append('venue', this.form.get('venue').value);
    } else {
      const formData = new FormData();
      // @ts-ignore
      formData.append('meetingDate', this.form.get('meetingDate').value);
      // @ts-ignore
      formData.append('venue', this.form.get('venue').value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
