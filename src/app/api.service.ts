import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // URL base de la API

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const access_token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${access_token}`
    });
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events`, {
      headers: this.getHeaders()
    });
  }
}