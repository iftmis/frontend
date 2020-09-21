import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TeamMeetingFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(meeting: Partial<any> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(meeting.id, []),
      venue: this.formBuilder.control(meeting.venue, []),
      meetingDate: this.formBuilder.control(meeting.meetingDate, []),
      introduction: this.formBuilder.control(meeting.introduction, []),
      inspectionProgramReview: this.formBuilder.control(
        meeting.inspectionProgramReview,
        []
      ),
      conclusion: this.formBuilder.control(meeting.conclusion, []),
      inspectionOverview: this.formBuilder.control(
        meeting.inspectionOverview,
        []
      ),
      inspectionId: this.formBuilder.control(meeting.inspectionId, []),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      venue: formGroup.get('venue')!.value,
      meetingDate: formGroup.get('meetingDate')!.value,
      introduction: formGroup.get('introduction')!.value,
      inspectionProgramReview: formGroup.get('inspectionProgramReview')!.value,
      conclusion: formGroup.get('conclusion')!.value,
      inspectionOverview: formGroup.get('inspectionOverview')!.value,
      inspectionId: formGroup.get('inspectionId')!.value,
    };
  }
}
