import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-briefying-upload',
  templateUrl: './briefying-upload.component.html',
  styleUrls: ['./briefying-upload.component.scss'],
})
export class BriefyingUploadComponent implements OnInit {
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  fileInputLabel: string;
  file: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BriefyingUploadComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      myfile: [''],
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
  cancel() {
    this.dialogRef.close();
  }
  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      const formData = new FormData();
      // @ts-ignore
      formData.append('formFile', this.form.get('myfile').value);
    } else {
      const formData = new FormData();
      // @ts-ignore
      formData.append('formFile', this.form.get('myfile').value);
    }
  }
}
