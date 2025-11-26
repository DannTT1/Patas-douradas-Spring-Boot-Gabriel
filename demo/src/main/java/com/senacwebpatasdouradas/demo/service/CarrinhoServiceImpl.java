package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.CarrinhoItemDTO;
import com.senacwebpatasdouradas.demo.dto.ProdutoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CarrinhoServiceImpl implements CarrinhoService {

    @Autowired
    private ProdutoService produtoService;

    @Override
    public BigDecimal validarCarrinho(List<CarrinhoItemDTO> itens) {
        BigDecimal totalGeral = BigDecimal.ZERO;

        for (CarrinhoItemDTO item : itens) {
            // 1. Busca o produto
            ProdutoDTO produto = produtoService.findById(item.getProdutoId());

            // 2. Verifica se tem estoque suficiente
            if (produto.getEstoque() < item.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
            }

            // 3. Calcula o subtotal (Preço * Quantidade)
            BigDecimal subtotal = produto.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade()));

            // 4. Soma ao total geral
            totalGeral = totalGeral.add(subtotal);
        }

        // 5. Retorna apenas o valor total da compra
        return totalGeral;
    }
}