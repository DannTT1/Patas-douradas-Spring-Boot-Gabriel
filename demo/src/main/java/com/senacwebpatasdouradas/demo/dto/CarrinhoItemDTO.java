package com.senacwebpatasdouradas.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CarrinhoItemDTO {

    @NotNull
    private Integer produtoId;

    @NotNull
    @Min(1)
    private Integer quantidade;

    // Construtor Vazio (OBRIGATÓRIO)
    public CarrinhoItemDTO() {}

    // Getters e Setters
    public Integer getProdutoId() { return produtoId; }
    public void setProdutoId(Integer produtoId) { this.produtoId = produtoId; }
    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
}