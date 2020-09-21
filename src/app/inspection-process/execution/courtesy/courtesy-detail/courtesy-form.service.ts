import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Courtesy } from './courtesy';

@Injectable({
  providedIn: 'root',
})
export class CourtesyFormService {
  constructor(private formBuilder: FormBuilder) {}
  // tslint:disable-next-line:no-shadowed-variable
  toFormGroup(Courtesy: Partial<Courtesy> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(Courtesy.id, []),
      myfile: this.formBuilder.control(Courtesy.myfile),
      description: this.formBuilder.control(Courtesy.description),
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
