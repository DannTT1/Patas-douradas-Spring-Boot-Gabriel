// src/app/models/pedido.ts
import { PedidoItemDTO } from './pedido-item';

// Deve ser exportado como Pedido, sem o DTO
export interface Pedido { 
    id: number;
    data: string;
    total: number;
    nomeCliente: string;
    itens: PedidoItemDTO[];
}