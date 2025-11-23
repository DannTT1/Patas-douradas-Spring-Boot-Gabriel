// src/app/models/carrinho-validado.ts

import { ItemValidado } from './item-validado'; // Agora a importação é válida

// O DTO do Spring Boot para a resposta validada
export interface CarrinhoValidadoDTO {
    itens: ItemValidado[];
    totalGeral: number; // Mapeado de BigDecimal
}