import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = '/v1/participants';

  constructor(private http: HttpClient) { }

  register(email: string, genero: string, nombreCompleto: string, codigoCliente: string): Observable<any> {
    const body = {
      api_key: '32e608447ff50d5b6760c335ffe87262',
      campaign: '4u',
      properties: {
        email: email,
        genero: genero,
        'nombre-completo': nombreCompleto,
        'codigo-de-cliente': codigoCliente
      }
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, body, { headers });
  }
}
