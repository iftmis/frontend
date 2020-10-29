import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourtesyService } from '../courtesy.service';
import { UploadService } from '../../../../shared/upload.service';
import { MeetingAttachment } from '../../../../shared/attachment';
import { Observable } from 'rxjs';
import { CourtesyMember } from '../courtesy-member';
import { ToastService } from '../../../../shared/toast.service';

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
    private toastService: ToastService,
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
          name: res.fileName,
          meetingId: this.meetingId,
          attachmentId: res.fileName,
          attachmentPath: res.fileDownloadUri,
        };

        this.subscribeToResponse(
          this.uploadService.postMeetingAttachment(this.meetingAtachment),
          'upload'
        );

        console.log('RESPONSI   :  ' + res);
      });
    } else {
      const formData = new FormData();
      // @ts-ignore
      formData.append('file', this.form.get('myfile').value);
      // upload by formdata
      this.uploadService.upload(formData).subscribe(res => {
        this.meetingAtachment = {
          name: res.fileName,
          meetingId: this.meetingId,
          attachmentId: res.fileResourceDTO.id,
          attachmentPath: res.fileResourceDTO.path,
        };
        console.log('attachment path : ' + res.fileResourceDTO.path);

        this.subscribeToResponse(
          this.uploadService.postMeetingAttachment(this.meetingAtachment),
          'update'
        );
      });
    }
  }
  private subscribeToResponse(
    result: Observable<MeetingAttachment>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'upload') {
          this.toastService.success(
            'Success!',
            'Courtesy Meeting Attachment Uploaded Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Courtesy Meeting Attachment Updated Successfully'
          );
        }
        this.showProgress = false;
        // this.router.navigate(['/main/settings/sub-areas']);
        this.dialogRef.close({ success: true });
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
