import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket'; // Import WebSocketSubject

@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  private static HOST = 'http://localhost:3000';
  private static MANIFEST_URL = `${ManifestService.HOST}/manifest.json`;
  private static USERS_URL = `${ManifestService.HOST}/api/users`;
  private static RANDOM_URL = `${ManifestService.HOST}/ws/random`;

  private webSocket: WebSocketSubject<any>; // Define a private WebSocketSubject

  constructor(private http: HttpClient) {
    this.webSocket = new WebSocketSubject(ManifestService.RANDOM_URL); // Initialize the WebSocketSubject
    this.webSocket.next({type: 'connect'}); // Send a message to connect to the WebSocket
  }

  getManifest(): Observable<any> {
    return this.http.get(ManifestService.MANIFEST_URL);
  }

  getUsersByPage(page: number): Observable<any> {
    console.log("Loading page number ", page)
    return this.http.get(`${ManifestService.USERS_URL}?page=${page}`);
  }

  getUsersByName(name: string): Observable<any> {
    console.log("Searching for user with name ", name)
    return this.http.get(`${ManifestService.USERS_URL}?search=${name}`);
  }

  getRandomData(): Observable<any> {
    console.log("Connected to WebSocket for random data")
    return this.webSocket.asObservable();
  }
}
