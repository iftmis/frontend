import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../../user-management/user/user';
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
  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  inspectionId: number;
  error: string | undefined = undefined;
  fileInputLabel: string;
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
      myfile: [''],
      description: [''],
    });
  }

  onFileSelect(event: any) {
    console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      this.fileInputLabel = file.name;
      // @ts-ignore
      this.form.get('myfile').setValue(file);
    }
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      const formData = new FormData();
      // @ts-ignore
      formData.append('formFile', this.form.get('myfile').value);
      // @ts-ignore
      formData.append('description', this.form.get('description').value);
    } else {
      const formData = new FormData();
      // @ts-ignore
      formData.append('formFile', this.form.get('myfile').value);
      // @ts-ignore
      formData.append('description', this.form.get('description').value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
