// src/app/services/carrinho.service.ts

import { Injectable } from '@angular/core';
import { CarrinhoItemLocal } from '../models/carrinho-item-local';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly STORAGE_KEY = 'patasDouradasCarrinho';

  constructor() { }

  /**
   * Obtém a lista de itens do carrinho do localStorage.
   */
  getItems(): CarrinhoItemLocal[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    // Retorna a lista se existir, ou uma lista vazia se não.
    return data ? JSON.parse(data) : [];
  }

  /**
   * Salva a lista atualizada de itens no localStorage.
   */
  private saveItems(items: CarrinhoItemLocal[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  /**
   * Adiciona ou atualiza a quantidade de um produto no carrinho.
   */
  adicionarItem(produtoId: number, quantidade: number = 1): void {
    const items = this.getItems();
    const existingItemIndex = items.findIndex(item => item.produtoId === produtoId);

    if (existingItemIndex > -1) {
      // Se o item já existe, apenas atualiza a quantidade
      items[existingItemIndex].quantidade += quantidade;
    } else {
      // Se for um item novo, adiciona
      items.push({ produtoId, quantidade });
    }

    this.saveItems(items);
    console.log(`Produto ${produtoId} adicionado. Total de itens no carrinho: ${items.length}`);
  }

  /**
   * Limpa todo o carrinho.
   */
  limparCarrinho(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Obtém a contagem total de itens (para exibição no navbar)
   */
  getTotalItens(): number {
    return this.getItems().reduce((total, item) => total + item.quantidade, 0);
  }
}