import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courtesy-upload',
  templateUrl: './courtesy-upload.component.html',
  styleUrls: ['./courtesy-upload.component.scss'],
})
export class CourtesyUploadComponent implements OnInit {
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  fileInputLabel: string;
  file: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CourtesyUploadComponent>
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
