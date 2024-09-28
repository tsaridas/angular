import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Change this import
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  constructor(private http: HttpClient) { }

  getManifest(): Observable<any> {
    return this.http.get('http://localhost:3000/manifest.json');
  }
}
