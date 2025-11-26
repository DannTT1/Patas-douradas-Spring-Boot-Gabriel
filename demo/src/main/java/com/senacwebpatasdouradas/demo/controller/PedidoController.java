package com.senacwebpatasdouradas.demo.controller;

import com.senacwebpatasdouradas.demo.dto.PedidoCriadoDTO;
import com.senacwebpatasdouradas.demo.dto.PedidoDTO;
import com.senacwebpatasdouradas.demo.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*") // Libera para o Frontend
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    // Criar Pedido
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody PedidoCriadoDTO dto) {
        try {
            PedidoDTO pedidoCriado = pedidoService.createPedido(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(pedidoCriado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno.");
        }
    }

    // Listar por Usuário (Cliente)
    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<PedidoDTO>> listarPorUsuario(@PathVariable Integer id) {
        List<PedidoDTO> pedidos = pedidoService.listarPorCliente(id);
        if (pedidos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(pedidos);
    }

    // --- NOVO: Listar Todos (Dashboard Vendedor) ---
    @GetMapping
    public ResponseEntity<List<PedidoDTO>> listarTodos() {
        List<PedidoDTO> pedidos = pedidoService.listarTodos();
        if (pedidos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(pedidos);
    }
}