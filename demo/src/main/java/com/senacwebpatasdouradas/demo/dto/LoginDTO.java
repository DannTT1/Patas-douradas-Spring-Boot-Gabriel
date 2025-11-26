package com.senacwebpatasdouradas.demo.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginDTO {

    @NotBlank(message = "Username é obrigatório")
    private String username;

    @NotBlank(message = "Senha é obrigatória")
    private String senha;

    // Construtor Vazio (OBRIGATÓRIO)
    public LoginDTO() {}

    // Getters e Setters (Essenciais para o JSON)
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}