package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.PedidoCriadoDTO;
import com.senacwebpatasdouradas.demo.dto.PedidoDTO;
import com.senacwebpatasdouradas.demo.dto.PedidoItemDTO;
import com.senacwebpatasdouradas.demo.entity.ItemPedidoEntity;
import com.senacwebpatasdouradas.demo.entity.PedidoEntity;
import com.senacwebpatasdouradas.demo.entity.ProdutoEntity;
import com.senacwebpatasdouradas.demo.entity.UsuarioEntity;
import com.senacwebpatasdouradas.demo.repository.PedidoRepository;
import com.senacwebpatasdouradas.demo.repository.ProdutoRepository;
import com.senacwebpatasdouradas.demo.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoServiceImpl implements PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public List<PedidoDTO> listarPorCliente(int clienteId) {
        List<PedidoEntity> pedidos = pedidoRepository.findByUsuarioId(clienteId);
        // Usa o método auxiliar toDto para converter
        return pedidos.stream().map(this::toDto).collect(Collectors.toList());
    }

    // --- IMPLEMENTAÇÃO DO NOVO MÉTODO ---
    @Override
    public List<PedidoDTO> listarTodos() {
        // Busca TUDO no banco
        List<PedidoEntity> pedidos = pedidoRepository.findAll();
        // Converte para DTO usando o método auxiliar abaixo
        return pedidos.stream().map(this::toDto).collect(Collectors.toList());
    }
    // ------------------------------------

    @Override
    @Transactional
    public PedidoDTO createPedido(PedidoCriadoDTO dto) {
        // 1. Verifica Usuário
        UsuarioEntity usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        PedidoEntity pedido = new PedidoEntity();
        pedido.setUsuario(usuario);
        pedido.setData(LocalDateTime.now());

        BigDecimal totalGeral = BigDecimal.ZERO;
        List<ItemPedidoEntity> itensDoPedido = new ArrayList<>();

        // 2. Processa Itens e Estoque
        for (var itemDTO : dto.getItens()) {
            ProdutoEntity produto = produtoRepository.findById(itemDTO.getProdutoId())
                    .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

            if (produto.getEstoque() < itemDTO.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente para: " + produto.getNome());
            }

            // Baixa no estoque
            produto.setEstoque(produto.getEstoque() - itemDTO.getQuantidade());
            produtoRepository.save(produto);

            BigDecimal subtotal = produto.getPrecoUnitario().multiply(BigDecimal.valueOf(itemDTO.getQuantidade()));
            totalGeral = totalGeral.add(subtotal);

            ItemPedidoEntity itemPedido = new ItemPedidoEntity();
            itemPedido.setProduto(produto);
            itemPedido.setPedido(pedido);
            itemPedido.setQuantidade(itemDTO.getQuantidade());

            itensDoPedido.add(itemPedido);
        }

        pedido.setItens(itensDoPedido);
        pedido.setTotal(totalGeral);

        PedidoEntity pedidoSalvo = pedidoRepository.save(pedido);
        return toDto(pedidoSalvo);
    }

    // Método auxiliar que converte Entity -> DTO (MANTIDO DO ORIGINAL)
    private PedidoDTO toDto(PedidoEntity entity) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(entity.getId());
        dto.setData(entity.getData());
        dto.setTotal(entity.getTotal());
        dto.setNomeCliente(entity.getUsuario().getNome());

        List<PedidoItemDTO> itensDTO = entity.getItens().stream().map(item -> {
            PedidoItemDTO itemDto = new PedidoItemDTO();
            itemDto.setNomeProduto(item.getProduto().getNome());
            itemDto.setQuantidade(item.getQuantidade());
            itemDto.setPrecoUnitario(item.getProduto().getPrecoUnitario());
            itemDto.setSubtotal(item.getProduto().getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade())));
            return itemDto;
        }).collect(Collectors.toList());

        dto.setItens(itensDTO);
        return dto;
    }
}