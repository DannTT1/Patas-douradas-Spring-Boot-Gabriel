// src/app/services/pedido.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido'; 
import { PedidoCriadoDTO } from '../models/pedido-criado'; 
import { CarrinhoItemLocal } from '../models/carrinho-item-local';
import { CarrinhoValidadoDTO } from '../models/carrinho-validado';

@Injectable({ providedIn: 'root' })
export class PedidoService {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    /**
     * Valida os itens do carrinho no backend (POST /carrinho/validar).
     * [CORREÇÃO: Implementação completa do método]
     */
    validarCarrinho(itens: CarrinhoItemLocal[]): Observable<CarrinhoValidadoDTO> {
        return this.http.post<CarrinhoValidadoDTO>(`${this.apiUrl}/carrinho/validar`, itens);
    }

    /**
     * Cria um novo pedido no backend (POST /pedidos).
     * [CORREÇÃO: Implementação completa do método]
     */
    create(dto: PedidoCriadoDTO): Observable<Pedido> { 
        return this.http.post<Pedido>(`${this.apiUrl}/pedidos`, dto);
    }
}