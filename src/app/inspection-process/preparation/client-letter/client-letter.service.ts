import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientLetterService {
  private resourceUrl = 'api/inspection-client-letters';

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/${id}`);
  }

  create(letter: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl, letter);
  }

  update(letter: any): Observable<any> {
    return this.http.put<any>(`${this.resourceUrl}`, letter);
  }
}
