package com.senacwebpatasdouradas.demo.controller;

import com.senacwebpatasdouradas.demo.dto.CarrinhoItemDTO;
import com.senacwebpatasdouradas.demo.service.CarrinhoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @PostMapping("/validar")
    public ResponseEntity<BigDecimal> validar(@Valid @RequestBody List<CarrinhoItemDTO> itens) {
        // Retorna o valor total do carrinho validado
        BigDecimal totalCarrinho = carrinhoService.validarCarrinho(itens);
        return ResponseEntity.ok(totalCarrinho);
    }
}