package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.UsuarioDTO;
import com.senacwebpatasdouradas.demo.entity.UsuarioEntity;

import java.util.List;

public interface UsuarioService {

    List<UsuarioDTO> findAll();

    UsuarioDTO findByUsername(String username);

    UsuarioDTO findByEmail(String email);

    void delete(int id);

    UsuarioDTO create(UsuarioDTO usuario);

    Boolean existByEmail(String email);

    UsuarioDTO update(int id, String novoNome, String novaSenha);

}
