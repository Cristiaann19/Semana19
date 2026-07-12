import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Trabajador {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  telefono: string;
  direccion: string;
  email: string;
  fechaNacimiento: string;
  genero: string;
  fechaIngreso: string;
  activo: boolean;
  usuario?: {
    id: number;
    username: string;
    rol: string;
    activo: boolean;
  };
}

export interface TrabajadorRequest {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  telefono: string;
  direccion: string;
  email: string;
  fechaNacimiento: string;
  genero: string;
  fechaIngreso: string;
  activo: boolean;
  usuario?: {
    username: string;
    password: string;
    rol: string;
  };
}

@Injectable({ providedIn: 'root' })
export class TrabajadorService {
  private readonly API_URL = `${environment.apiUrl}/trabajadores`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(this.API_URL);
  }

  findById(id: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.API_URL}/${id}`);
  }

  findByDni(dni: string): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.API_URL}/dni/${dni}`);
  }

  create(request: TrabajadorRequest): Observable<Trabajador> {
    return this.http.post<Trabajador>(this.API_URL, request);
  }

  update(id: number, request: TrabajadorRequest): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${this.API_URL}/${id}`, request);
  }

  toggleEstado(id: number): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.API_URL}/${id}/toggle-estado`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
