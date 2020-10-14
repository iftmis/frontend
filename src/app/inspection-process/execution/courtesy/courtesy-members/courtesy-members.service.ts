import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourtesyMember } from '../courtesy-member';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourtesyMembersService {
  private resourceUrl = '/api/meetings';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  toFormGroup(courtesyMember: Partial<CourtesyMember> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(courtesyMember.id, []),
      meetingDate: this.formBuilder.control(courtesyMember.meetingDate),
      venue: this.formBuilder.control(courtesyMember.venue),
    });
  }
  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      meetingDate: formGroup.get('meetingDate')!.value,
      venue: formGroup.get('venue')!.value,
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

  create(courtesyMember: FormGroup): Observable<CourtesyMember> {
    return this.http.post<CourtesyMember>(this.resourceUrl, courtesyMember);
  }

  update(courtesyMember: FormGroup): Observable<CourtesyMember> {
    return this.http.put<CourtesyMember>(`${this.resourceUrl}`, courtesyMember);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
