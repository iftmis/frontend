import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Briefying } from '../Briefying';

@Injectable({
  providedIn: 'root',
})
export class BriefyingFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(briefying: Partial<Briefying> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(briefying.id, []),
      meetingDate: this.formBuilder.control(briefying.meetingDate, [
        Validators.required,
      ]),
      venue: this.formBuilder.control(briefying.venue, [Validators.required]),
      inspectionId: this.formBuilder.control(briefying.inspectionId),
      type: this.formBuilder.control(briefying.type),
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
