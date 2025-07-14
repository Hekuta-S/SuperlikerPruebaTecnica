import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = '/v1/microsite/sessions/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      api_key: '32e608447ff50d5b6760c335ffe87262',
      campaign: '4u',
      participation: {
        'codigo-de-cliente': username,
        password: password
      }
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, body, { headers });
  }
}
