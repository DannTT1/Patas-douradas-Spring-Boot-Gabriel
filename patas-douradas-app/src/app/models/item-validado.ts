// src/app/models/item-validado.ts

import { Produto } from './produto'; // Assumindo que produto.ts está no mesmo nível

export interface ItemValidado {
    produto: Produto;
    quantidade: number;
    subtotal: number; // Mapeado de BigDecimal
}