import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Briefying } from '../Briefying';

@Injectable({
  providedIn: 'root',
})
export class BriefyingFormService {
  constructor(private formBuilder: FormBuilder) {}
  // tslint:disable-next-line:no-shadowed-variable
  toFormGroup(Briefying: Partial<Briefying> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(Briefying.id, []),
      briefying_Date: this.formBuilder.control(Briefying.briefying_Date),
      briefying_venue: this.formBuilder.control(Briefying.briefying_venue),
    });
  }
  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      briefying_Date: formGroup.get('briefying_Date')!.value,
      briefying_venue: formGroup.get('briefying_venue')!.value,
    };
  }
}
