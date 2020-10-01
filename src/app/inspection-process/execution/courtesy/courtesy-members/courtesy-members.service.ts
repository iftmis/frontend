import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourtesyMember } from '../courtesy-member';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourtesyMembersService {
  private resourceUrl = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  // tslint:disable-next-line:no-shadowed-variable
  toFormGroup(CourtesyMember: Partial<CourtesyMember> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(CourtesyMember.id, []),
      full_name: this.formBuilder.control(CourtesyMember.full_name),
      member_role: this.formBuilder.control(CourtesyMember.member_role),
    });
  }
  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      full_name: formGroup.get('full_name')!.value,
      member_role: formGroup.get('member_role')!.value,
    };
  }
  getById(id: number): Observable<CourtesyMember> {
    return this.http.get<CourtesyMember>(`${this.resourceUrl}/${id}`);
  }

  create(courtesyMember: CourtesyMember): Observable<CourtesyMember> {
    return this.http.post<CourtesyMember>(this.resourceUrl, courtesyMember);
  }

  update(courtesyMember: CourtesyMember): Observable<CourtesyMember> {
    return this.http.put<CourtesyMember>(`${this.resourceUrl}`, courtesyMember);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
