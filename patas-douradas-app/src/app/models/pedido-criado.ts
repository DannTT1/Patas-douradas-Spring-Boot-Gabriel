// src/app/models/pedido-criado.ts (Input para POST /pedidos)
import { CarrinhoItemLocal } from './carrinho-item-local';

export interface PedidoCriadoDTO {
  itens: CarrinhoItemLocal[];
  usuarioId: number; 
}

// src/app/models/pedido.ts (Resposta de sucesso após a criação)
import { PedidoItemDTO } from './pedido-item';

export interface PedidoDTO {
  id: number;
  data: string; // Mapeado para LocalDateTime
  total: number;
  nomeCliente: string;
  itens: PedidoItemDTO[];
}

// src/app/models/pedido-item.ts (Detalhe do item no pedido)
export interface PedidoItemDTO {
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}