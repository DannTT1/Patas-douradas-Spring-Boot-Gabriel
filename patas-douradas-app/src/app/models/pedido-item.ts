// src/app/models/pedido-item.ts

export interface PedidoItemDTO {
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
}