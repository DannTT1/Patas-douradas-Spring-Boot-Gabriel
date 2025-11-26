package com.senacwebpatasdouradas.demo.controller;

import com.senacwebpatasdouradas.demo.dto.PedidoCriadoDTO;
import com.senacwebpatasdouradas.demo.dto.PedidoDTO;
import com.senacwebpatasdouradas.demo.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;


    @PostMapping
    public ResponseEntity<PedidoDTO> create(@Valid @RequestBody PedidoCriadoDTO dto) {
        PedidoDTO pedidoCriado = pedidoService.createPedido(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoCriado);
    }
}