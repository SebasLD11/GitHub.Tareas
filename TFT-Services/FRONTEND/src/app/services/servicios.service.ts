import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://localhost:5000/api/services';

  constructor(private http: HttpClient) { }

  getServices(): Observable<any[]> {
    return this.http.get<[]>(this.apiUrl);
  }

  getServiceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

}
