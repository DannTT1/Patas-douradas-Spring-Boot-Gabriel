package com.senacwebpatasdouradas.demo.controller;

import com.senacwebpatasdouradas.demo.dto.LoginDTO;
import com.senacwebpatasdouradas.demo.dto.UsuarioDTO;
import com.senacwebpatasdouradas.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // Importa o CrossOrigin

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public UsuarioDTO create(@RequestBody UsuarioDTO dto) {
        return usuarioService.create(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO dto) {
        try {
            String mensagem = usuarioService.login(dto);
            return ResponseEntity.ok(mensagem);
        } catch (Exception e) { // Mudei para Exception genérica para pegar qualquer erro
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erro: " + e.getMessage());
        }
    }
}