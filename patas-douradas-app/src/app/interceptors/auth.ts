
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpInterceptorFn 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

// O Angular moderno usa a função de interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Obtém o token do serviço de autenticação
  const token = localStorage.getItem('patasDouradasToken'); // Chave definida no AuthService

  // 2. Clona a requisição e adiciona o cabeçalho Authorization, se o token existir
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    // Continua com a requisição modificada
    return next(authReq);
  }

  // 3. Se não houver token, continua com a requisição original
  return next(req);
};