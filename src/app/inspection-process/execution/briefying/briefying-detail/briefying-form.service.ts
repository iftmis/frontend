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
      myfile: this.formBuilder.control(Briefying.myfile),
      description: this.formBuilder.control(Briefying.description),
    });
  }
  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      description: formGroup.get('description')!.value,
      myfile: formGroup.get('myfile')!.value,
    };
  }
}
