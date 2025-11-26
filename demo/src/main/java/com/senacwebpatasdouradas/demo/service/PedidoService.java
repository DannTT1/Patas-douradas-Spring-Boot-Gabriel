package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.PedidoCriadoDTO;
import com.senacwebpatasdouradas.demo.dto.PedidoDTO;
import java.util.List;

public interface PedidoService {
    // Lista pedidos de um cliente (para a tela "Meus Pedidos")
    List<PedidoDTO> listarPorCliente(int clienteId);

    // Cria um novo pedido
    PedidoDTO createPedido(PedidoCriadoDTO dto);

    // --- NOVO: Lista TODOS os pedidos (para o Painel do Vendedor) ---
    List<PedidoDTO> listarTodos();
}