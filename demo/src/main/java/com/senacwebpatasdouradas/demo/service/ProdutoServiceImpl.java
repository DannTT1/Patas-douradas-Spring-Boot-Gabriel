package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.ProdutoDTO;
import com.senacwebpatasdouradas.demo.entity.ProdutoEntity;
import com.senacwebpatasdouradas.demo.repository.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProdutoServiceImpl implements ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public List<ProdutoDTO> findAll() {
        List<ProdutoEntity> produtos = produtoRepository.findAll();
        List<ProdutoDTO> dtos = new ArrayList<>();
        for (ProdutoEntity produto : produtos) {
            dtos.add(toDto(produto));
        }
        return dtos;
    }

    @Override
    public ProdutoDTO findById(Integer id) {
        ProdutoEntity produto = produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado ID: " + id));
        return toDto(produto);
    }

    @Override
    public ProdutoDTO create(ProdutoDTO dto) {
        ProdutoEntity entity = new ProdutoEntity();

        entity.setNome(dto.getNome());
        entity.setPrecoUnitario(dto.getPrecoUnitario());
        entity.setEstoque(dto.getEstoque());
        entity.setImagemUrl(dto.getImagemUrl());
        entity.setDescricao(dto.getDescricao());
        // Salva o destaque (se for nulo, salva false)
        entity.setDestaque(dto.getDestaque() != null ? dto.getDestaque() : false);

        ProdutoEntity salvo = produtoRepository.save(entity);
        return toDto(salvo);
    }

    @Override
    public ProdutoDTO update(Integer id, ProdutoDTO dto) {
        ProdutoEntity entity = produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado ID: " + id));

        entity.setNome(dto.getNome());
        entity.setPrecoUnitario(dto.getPrecoUnitario());
        entity.setEstoque(dto.getEstoque());
        entity.setImagemUrl(dto.getImagemUrl());
        entity.setDescricao(dto.getDescricao());
        // Atualiza o destaque
        entity.setDestaque(dto.getDestaque() != null ? dto.getDestaque() : false);

        ProdutoEntity atualizado = produtoRepository.save(entity);
        return toDto(atualizado);
    }

    @Override
    public void delete(Integer id) {
        if (!produtoRepository.existsById(id)) {
            throw new EntityNotFoundException("Produto não encontrado ID: " + id);
        }
        produtoRepository.deleteById(id);
    }

    // Converte Banco -> Site
    private ProdutoDTO toDto(ProdutoEntity entity) {
        ProdutoDTO dto = new ProdutoDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setPrecoUnitario(entity.getPrecoUnitario());
        dto.setEstoque(entity.getEstoque());
        dto.setImagemUrl(entity.getImagemUrl());
        dto.setDescricao(entity.getDescricao());
        // Copia o destaque para o site ver
        dto.setDestaque(entity.getDestaque());

        return dto;
    }
}