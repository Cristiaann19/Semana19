import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id: number;
  username: string;
  rol: string;
  activo: boolean;
}

export interface UsuarioCreateRequest {
  username: string;
  password: string;
  rol: string;
}

export interface UsuarioUpdateRequest {
  username: string;
  password?: string;
  rol: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly API_URL = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/${id}`);
  }

  findByUsername(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/username/${username}`);
  }

  create(request: UsuarioCreateRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.API_URL, request);
  }

  update(id: number, request: UsuarioUpdateRequest): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/${id}`, request);
  }

  toggleEstado(id: number): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.API_URL}/${id}/toggle-estado`, {});
  }
}
