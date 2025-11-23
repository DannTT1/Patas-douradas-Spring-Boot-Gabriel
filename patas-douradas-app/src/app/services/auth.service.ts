// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Sessao } from '../models/sessao';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/usuarios/login';
  private readonly TOKEN_KEY = 'patasDouradasToken';

  constructor(private http: HttpClient) { }

  login(credenciais: Login): Observable<Sessao> {
    return this.http.post<Sessao>(this.loginUrl, credenciais);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

 
  isLoggedIn(): boolean { 
    return !!this.getToken();
  }
}