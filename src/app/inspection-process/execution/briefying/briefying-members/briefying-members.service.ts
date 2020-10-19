import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourtesyMember } from '../../courtesy/Courtesy-member';
import { Observable } from 'rxjs';
import { BriefyingMember } from '../Briefying-member';

@Injectable({
  providedIn: 'root',
})
export class BriefyingMembersService {
  private resourceUrl = '/api/meetings';
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  toFormGroup(briefingMember: Partial<CourtesyMember> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(briefingMember.id, []),
      name: this.formBuilder.control(briefingMember.name),
      phoneNumber: this.formBuilder.control(briefingMember.phoneNumber),
      email: this.formBuilder.control(briefingMember.email),
      title: this.formBuilder.control(briefingMember.title),
    });
  }
  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      phoneNumber: formGroup.get('phoneNumber')!.value,
      email: formGroup.get('email')!.value,
      title: formGroup.get('title')!.value,
    };
  }
  getByInspection(inspectionId: number): Observable<BriefyingMember[]> {
    return this.http.get<BriefyingMember[]>(
      `${this.resourceUrl}/${inspectionId}`
    );
  }
  getById(id: number): Observable<BriefyingMember> {
    return this.http.get<BriefyingMember>(`${this.resourceUrl}/${id}`);
  }

  create(briefingMember: FormGroup): Observable<BriefyingMember> {
    return this.http.post<BriefyingMember>(this.resourceUrl, briefingMember);
  }

  update(briefingMember: FormGroup): Observable<BriefyingMember> {
    return this.http.put<CourtesyMember>(`${this.resourceUrl}`, briefingMember);
  }
  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
