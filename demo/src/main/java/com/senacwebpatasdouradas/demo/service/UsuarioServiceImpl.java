 package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.UsuarioDTO;
import com.senacwebpatasdouradas.demo.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import com.senacwebpatasdouradas.demo.entity.UsuarioEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private UsuarioDTO toDto(UsuarioEntity usr) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setUsername(usr.getUsername());
        dto.setNome(usr.getNome());
        dto.setEmail(usr.getEmail());
        dto.setSenha(usr.getSenha());

        return dto;
    }

    @Override
    public List<UsuarioDTO> findAll() {
        List<UsuarioEntity>  usuarios = usuarioRepository.findAll();
        List<UsuarioDTO> resultado = new ArrayList();
        for (UsuarioEntity usr : usuarios) {
            resultado.add(toDto(usr));
        }
        return resultado;
    }

    @Override
    public UsuarioDTO create(UsuarioDTO dto) {

        UsuarioEntity usr = new UsuarioEntity();
        usr.setUsername(dto.getUsername());
        usr.setNome(dto.getNome());
        usr.setEmail(dto.getEmail());
        usr.setSenha(dto.getSenha());
        usuarioRepository.save(usr);

        return dto;
    }


    @Override
    public Boolean existByEmail(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }

    @Override
    public void delete(int id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public UsuarioDTO update(int id,String username, String novaSenha) {
        if(id < 1 ) {
            throw new IllegalArgumentException("ID invalido");
        }
        Optional<UsuarioEntity> usr = usuarioRepository.findById(id);

        UsuarioEntity usrExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usrExistente.setNome(username);
        usrExistente.setSenha(novaSenha);

         usuarioRepository.save(usrExistente);

         return toDto(usrExistente);
    }

    @Override
    public UsuarioDTO findByEmail(String emailV) {
        if (emailV == null || emailV.isEmpty()) {
            throw new IllegalArgumentException("Email inválido");
        }

        UsuarioEntity usr = usuarioRepository.findByEmail(emailV)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com email: " + emailV));

        return toDto(usr);
    }

    @Override
    public UsuarioDTO findByUsername(String username) {
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username inválido");
        }

        UsuarioEntity usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado: " + username));

        return toDto(usuario);
    }

}


