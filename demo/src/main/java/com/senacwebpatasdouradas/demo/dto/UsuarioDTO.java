package com.senacwebpatasdouradas.demo.dto;


import com.senacwebpatasdouradas.demo.entity.UsuarioEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Email;

public class UsuarioDTO {
    @NotBlank
    @Size(min = 3, max = 64)
    private String username;

    private String nome;

    @NotBlank
    @Size(max = 100)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8)
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$")
    private String senha;

    private String repeticaoSenha;

    public UsuarioDTO() {

    }

    public UsuarioDTO(String username, String nome, String email, String senha) {
        this.username = username;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
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

    public String getRepeticaoSenha() {
        return repeticaoSenha;
    }

    public void setRepeticaoSenha(String repeticaoSenha) {
        this.repeticaoSenha = repeticaoSenha;
    }
}
