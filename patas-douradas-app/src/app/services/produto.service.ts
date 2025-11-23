// src/app/services/produto.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  /**
   * NOVO: Envia um novo produto (POST) para a API
   * @param produto Os dados do Produto a ser criado (sem ID)
   * @returns O Observable do Produto criado (com ID)
   */
  create(produto: Produto): Observable<Produto> { // <-- CORREÇÃO: Método CREATE adicionado
    // Usa o método POST do HttpClient
    return this.http.post<Produto>(this.apiUrl, produto);
  }
}