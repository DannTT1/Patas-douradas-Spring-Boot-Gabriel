package com.senacwebpatasdouradas.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedido")
public class PedidoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private int id;

    private LocalDateTime data;

    @Column(precision = 10, scale = 2)
    private BigDecimal total;

    // --- RELACIONAMENTOS ---

    // Muitos Pedidos pertencem a Um Usuário
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false) // Esta é a Foreign Key
    private UsuarioEntity usuario;

    // Um Pedido tem muitos Itens
    // "mappedBy" aponta para o campo "pedido" na ItemPedidoEntity
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<ItemPedidoEntity> itens;

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
    }

    public List<ItemPedidoEntity> getItens() {
        return itens;
    }

    public void setItens(List<ItemPedidoEntity> itens) {
        this.itens = itens;
    }
}