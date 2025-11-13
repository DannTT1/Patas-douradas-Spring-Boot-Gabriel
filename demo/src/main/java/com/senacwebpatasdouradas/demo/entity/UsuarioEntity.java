package com.senacwebpatasdouradas.demo.entity;

import jakarta.persistence.*; // Importe tudo de javax.persistence
import java.util.List; // Importe o java.util.List

@Entity
@Table(name = "usuario")
public class UsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false, length = 64)
    private String username;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 255) // <-- Adicionado para bater com a imagem
    private String senha;

    @Enumerated(EnumType.STRING) // <-- Adicionado para o Enum
    @Column(length = 20) // <-- Adicionado para bater com a imagem
    private TipoConta tipoconta;

    // --- ADICIONADO: O RELACIONAMENTO ---
    // Um Usuário tem muitos Pedidos.
    // "mappedBy" diz ao JPA que o lado "dono" da relação está no PedidoEntity,
    // no campo "usuario".
    @OneToMany(mappedBy = "usuario")
    private List<PedidoEntity> pedidos;

    // ... (Seus getters e setters ... )

    // Adicione getters e setters para 'pedidos'
    public List<PedidoEntity> getPedidos() {
        return pedidos;
    }

    public void setPedidos(List<PedidoEntity> pedidos) {
        this.pedidos = pedidos;
    }

    // ... (restante dos getters e setters) ...
    public UsuarioEntity() {
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public TipoConta getTipoconta() {
        return tipoconta;
    }
    public void setTipoconta(TipoConta tipoconta) {
        this.tipoconta = tipoconta;
    }
}