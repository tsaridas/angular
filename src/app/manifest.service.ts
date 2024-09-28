import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  private static HOST = 'http://localhost:3000';
  private static MANIFEST_URL = `${ManifestService.HOST}/manifest.json`;
  private static USERS_URL = `${ManifestService.HOST}/api/users`;

  constructor(private http: HttpClient) { }

  getManifest(): Observable<any> {
    return this.http.get(ManifestService.MANIFEST_URL);
  }

  getUsersByPage(page: number): Observable<any> {
    console.log("Loading page number ", page)
    return this.http.get(`${ManifestService.USERS_URL}?page=${page}`);
  }
}
