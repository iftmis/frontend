import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = '/api/upload';
  constructor(private http: HttpClient) {}

  upload(formData: FormData) {
    return this.http.post<any>(this.uploadUrl, formData);
  }
}
