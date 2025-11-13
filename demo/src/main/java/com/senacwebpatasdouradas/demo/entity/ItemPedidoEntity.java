package com.senacwebpatasdouradas.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "item_pedido_contem")
public class ItemPedidoEntity {

    // Eu adicionei um ID próprio, o que é uma prática
    // mais simples do que usar Chaves Compostas.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Muitos Itens pertencem a Um Pedido
    @ManyToOne
    @JoinColumn(name = "id_pedido", nullable = false)
    private PedidoEntity pedido;

    // Muitos Itens (do mesmo tipo) podem se referir a Um Produto
    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private ProdutoEntity produto;

    @Column(nullable = false)
    private int quantidade;

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public PedidoEntity getPedido() {
        return pedido;
    }

    public void setPedido(PedidoEntity pedido) {
        this.pedido = pedido;
    }

    public ProdutoEntity getProduto() {
        return produto;
    }

    public void setProduto(ProdutoEntity produto) {
        this.produto = produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}