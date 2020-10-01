import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InspectionMember } from '../../../preparation/inspection-member/inspection-member';
import { Observable } from 'rxjs';
import { CourtesyMembersService } from './courtesy-members.service';
import { ActivatedRoute } from '@angular/router';
import { CourtesyMember } from '../courtesy-member';

@Component({
  selector: 'app-courtesy-members',
  templateUrl: './courtesy-members.component.html',
  styleUrls: ['./courtesy-members.component.scss'],
})
export class CourtesyMembersComponent implements OnInit {
  courtesyMember: CourtesyMember;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  inspectionMember: InspectionMember;
  inspectionId: number;
  error: string | undefined = undefined;
  constructor(
    private route: ActivatedRoute,
    private courtesyMemberService: CourtesyMembersService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CourtesyMembersComponent>
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ courtesyMember }) => {
      this.courtesyMember = courtesyMember;
      this.form = this.courtesyMemberService.toFormGroup(courtesyMember);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    const formData = this.courtesyMemberService.fromFormGroup(this.form);
    if (this.form.value.id) {
      this.subscribeToResponse(this.courtesyMemberService.update(formData));
    } else {
      this.subscribeToResponse(this.courtesyMemberService.create(formData));
    }
  }
  private subscribeToResponse(result: Observable<CourtesyMember>) {
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
