import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Courtesy } from '../Courtesy';

@Injectable({
  providedIn: 'root',
})
export class CourtesyFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(courtesy: Partial<Courtesy> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(courtesy.id, []),
      meetingDate: this.formBuilder.control(courtesy.meetingDate, [
        Validators.required,
      ]),
      venue: this.formBuilder.control(courtesy.venue, [Validators.required]),
      inspectionId: this.formBuilder.control(courtesy.inspectionId),
      type: this.formBuilder.control(courtesy.type),
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
