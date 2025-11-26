package com.senacwebpatasdouradas.demo.dto;

public class LoginResponseDTO {
    private Integer id;
    private String nome;
    private String tipoUsuario;

    public LoginResponseDTO(Integer id, String nome, String tipoUsuario) {
        this.id = id;
        this.nome = nome;
        this.tipoUsuario = tipoUsuario;
    }

    // --- OBRIGATÓRIO TER 'public' NOS GETTERS ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(String tipoUsuario) { this.tipoUsuario = tipoUsuario; }
}