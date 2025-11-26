package com.senacwebpatasdouradas.demo.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class PedidoCriadoDTO {

    @NotNull(message = "O ID do usuário é obrigatório")
    private Integer usuarioId;

    @Valid
    @NotEmpty(message = "A lista de itens não pode estar vazia")
    private List<CarrinhoItemDTO> itens;

    // Construtor Vazio (OBRIGATÓRIO)
    public PedidoCriadoDTO() {}

    // Getters e Setters
    public List<CarrinhoItemDTO> getItens() { return itens; }
    public void setItens(List<CarrinhoItemDTO> itens) { this.itens = itens; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
}