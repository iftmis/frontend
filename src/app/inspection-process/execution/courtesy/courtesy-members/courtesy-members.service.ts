import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourtesyMember } from '../courtesy-member';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourtesyMembersService {
  private resourceUrl = '/api/meeting-members';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  toFormGroup(courtesyMember: Partial<CourtesyMember> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(courtesyMember.id, []),
      name: this.formBuilder.control(courtesyMember.name),
      phoneNumber: this.formBuilder.control(courtesyMember.phoneNumber),
      email: this.formBuilder.control(courtesyMember.email),
      title: this.formBuilder.control(courtesyMember.title),
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
  getByInspection(inspectionId: number): Observable<CourtesyMember[]> {
    return this.http.get<CourtesyMember[]>(
      `${this.resourceUrl}/${inspectionId}`
    );
  }
  getById(id: number): Observable<CourtesyMember> {
    return this.http.get<CourtesyMember>(`${this.resourceUrl}/${id}`);
  }

  create(
    courtesyMember: FormGroup,
    meetingId: number
  ): Observable<CourtesyMember> {
    return this.http.post<CourtesyMember>(
      this.resourceUrl + '/' + meetingId,
      courtesyMember
    );
  }

  update(
    courtesyMember: FormGroup,
    meetingId: number
  ): Observable<CourtesyMember> {
    return this.http.put<CourtesyMember>(
      `${this.resourceUrl + '/' + meetingId}`,
      courtesyMember
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
