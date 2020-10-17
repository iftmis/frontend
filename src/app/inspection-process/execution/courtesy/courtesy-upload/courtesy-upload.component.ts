import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourtesyService } from '../courtesy.service';
import { UploadService } from '../../../../shared/upload.service';
import { MeetingAttachment } from '../../../../shared/attachment';

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
  meetingAtachment: MeetingAttachment;
  file: any;
  showProgress: any;
  public title: string;
  public action: string;
  public label: string;
  @Input() meetingId: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CourtesyUploadComponent>,
    private courtesyService: CourtesyService,
    private uploadService: UploadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.meetingId = data.row.id;
  }

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
      formData.append('file', this.form.get('myfile').value);

      // upload by formdata
      this.uploadService.upload(formData).subscribe(res => {
        // upload to meeting attachments

        this.meetingAtachment = {
          meetingId: this.meetingId,
          attachmentId: res.fileName,
          attachmentPath: res.fileDownloadUri,
        };
        this.uploadService
          .postMeetingAttachment(this.meetingAtachment)
          .subscribe(response => {});

        console.log('RESPONSI   :  ' + res);
      });
    } else {
      const formData = new FormData();
      // @ts-ignore
      formData.append('file', this.form.get('myfile').value);
      // upload by formdata
      this.uploadService.upload(formData).subscribe(res => {
        this.meetingAtachment = {
          meetingId: this.meetingId,
          attachmentId: res.fileName,
          attachmentPath: res.fileDownloadUri,
        };
        this.uploadService
          .postMeetingAttachment(this.meetingAtachment)
          .subscribe(response => {});
      });
    }
  }
}
