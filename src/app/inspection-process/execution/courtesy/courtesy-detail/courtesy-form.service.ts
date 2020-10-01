import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Courtesy } from '../courtesy';

@Injectable({
  providedIn: 'root',
})
export class CourtesyFormService {
  constructor(private formBuilder: FormBuilder) {}
  // tslint:disable-next-line:no-shadowed-variable
  toFormGroup(Courtesy: Partial<Courtesy> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(Courtesy.id, []),
      meetingDate: this.formBuilder.control(Courtesy.meetingDate),
      venue: this.formBuilder.control(Courtesy.venue),
    });
  }
  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      meetingDate: formGroup.get('meetingDate')!.value,
      venue: formGroup.get('venue')!.value,
    };
  }
}
