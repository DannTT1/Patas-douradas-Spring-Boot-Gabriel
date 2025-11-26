package com.senacwebpatasdouradas.demo.repository;

import com.senacwebpatasdouradas.demo.entity.PedidoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<PedidoEntity, Integer> {
    // O Spring cria o SQL automaticamente baseado no nome do método:
    // "Busque na tabela Pedido onde o campo Usuario tenha esse ID"
    List<PedidoEntity> findByUsuarioId(int usuarioId);
}