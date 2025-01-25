import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invitado } from '../interfaces/invitado.i';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://invitaciones-back.onrender.com:3000/api/invitados'; // URL base de la API de GitHub
  constructor(private http: HttpClient) { }

  guardarInvitado(invitado: { nombre: string; numAcompanantes: number }): Observable<any> {
    return this.http.post(this.apiUrl, invitado);
  }

  obtenerInvitados(): Observable<Invitado[]> {
    return this.http.get<Invitado[]>(this.apiUrl);
  }
}
