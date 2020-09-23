import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CourtesyDetailComponent } from '../courtesy-detail/courtesy-detail.component';

@Component({
  selector: 'app-courtesy-members',
  templateUrl: './courtesy-members.component.html',
  styleUrls: ['./courtesy-members.component.scss'],
})
export class CourtesyMembersComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CourtesyMembersComponent>
  ) {}

  ngOnInit(): void {}
}
