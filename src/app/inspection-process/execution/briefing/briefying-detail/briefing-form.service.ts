import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Briefing } from '../Briefing';

@Injectable({
  providedIn: 'root',
})
export class BriefingFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(briefing: Partial<Briefing> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(briefing.id, []),
      meetingDate: this.formBuilder.control(briefing.meetingDate, [
        Validators.required,
      ]),
      venue: this.formBuilder.control(briefing.venue, [Validators.required]),
      inspectionId: this.formBuilder.control(briefing.inspectionId),
      type: this.formBuilder.control(briefing.type),
    });
  }
  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      meetingDate: formGroup.get('meetingDate')!.value,
      venue: formGroup.get('venue')!.value,
      inspectionId: formGroup.get('inspectionId')!.value,
      type: formGroup.get('type')!.value,
    };
  }
}
