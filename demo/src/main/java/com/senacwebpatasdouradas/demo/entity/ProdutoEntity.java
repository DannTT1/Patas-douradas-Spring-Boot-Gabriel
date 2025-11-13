package com.senacwebpatasdouradas.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "produto")
public class ProdutoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private int id;

    @Column(length = 100)
    private String nome;

    @Column(name = "preco_unitario", precision = 10, scale = 2)
    private BigDecimal precoUnitario;

    private int estoque;

    @Column(name = "imagem_url", length = 255)
    private String imagemUrl;

    // Um Produto pode estar em muitos Itens de Pedido
    @OneToMany(mappedBy = "produto")
    private List<ItemPedidoEntity> itensPedido;

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(BigDecimal precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public int getEstoque() {
        return estoque;
    }

    public void setEstoque(int estoque) {
        this.estoque = estoque;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public List<ItemPedidoEntity> getItensPedido() {
        return itensPedido;
    }

    public void setItensPedido(List<ItemPedidoEntity> itensPedido) {
        this.itensPedido = itensPedido;
    }
}