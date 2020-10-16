import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = '/api/upload';
  constructor(private http: HttpClient) {}

  upload(formData: FormData) {
    return this.http.post<any>(this.uploadUrl, formData);
  }

  getData(url: string): Observable<string> {
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(switchMap(response => this.readFile(response)));
  }

  private readFile(blob: Blob): Observable<string> {
    // @ts-ignore
    return Observable.create(obs => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }
}
