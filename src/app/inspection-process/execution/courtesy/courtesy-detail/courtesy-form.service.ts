import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      myfile: this.formBuilder.control(Courtesy.myfile),
      description: this.formBuilder.control(Courtesy.description),
      meetingDate: this.formBuilder.control(Courtesy.meetingDate),
      venue: this.formBuilder.control(Courtesy.venue),
      inspection_region: this.formBuilder.control(Courtesy.inspection_region),
      inspection_district: this.formBuilder.control(
        Courtesy.inspection_district
      ),
      inspection_council: this.formBuilder.control(Courtesy.inspection_council),
    });
  }
  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      description: formGroup.get('description')!.value,
      myfile: formGroup.get('myfile')!.value,
      meetingDate: formGroup.get('meetingDate')!.value,
      venue: formGroup.get('venue')!.value,
      inspection_region: formGroup.get('inspection_region')!.value,
      inspection_district: formGroup.get('inspection_district')!.value,
      inspection_council: formGroup.get('inspection_council')!.value,
    };
  }
}
