import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourtesyMember } from '../../courtesy/Courtesy-member';
import { Observable } from 'rxjs';
import { BriefingMember } from '../Briefing-member';

@Injectable({
  providedIn: 'root',
})
export class BriefingMembersService {
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
  getByInspection(inspectionId: number): Observable<BriefingMember[]> {
    return this.http.get<BriefingMember[]>(
      `${this.resourceUrl}/${inspectionId}`
    );
  }
  getById(id: number): Observable<BriefingMember> {
    return this.http.get<BriefingMember>(`${this.resourceUrl}/${id}`);
  }

  create(briefingMember: FormGroup): Observable<BriefingMember> {
    return this.http.post<BriefingMember>(this.resourceUrl, briefingMember);
  }

  update(briefingMember: FormGroup): Observable<BriefingMember> {
    return this.http.put<CourtesyMember>(`${this.resourceUrl}`, briefingMember);
  }
  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
