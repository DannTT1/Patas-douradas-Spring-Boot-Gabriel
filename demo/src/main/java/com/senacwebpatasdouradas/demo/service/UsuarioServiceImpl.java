package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.LoginDTO;
import com.senacwebpatasdouradas.demo.dto.LoginResponseDTO;
import com.senacwebpatasdouradas.demo.dto.UsuarioDTO;
import com.senacwebpatasdouradas.demo.entity.ClienteEntity;
import com.senacwebpatasdouradas.demo.entity.TipoConta;
import com.senacwebpatasdouradas.demo.entity.UsuarioEntity;
import com.senacwebpatasdouradas.demo.entity.VendedorEntity;
import com.senacwebpatasdouradas.demo.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService, UserDetailsService {

    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired @Lazy private AuthenticationManager authenticationManager;
    @Autowired private SecurityContextRepository securityContextRepository;
    @Autowired private HttpServletRequest request;
    @Autowired private HttpServletResponse response;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
    }

    @Override
    public LoginResponseDTO login(LoginDTO dto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getSenha())
            );
        } catch (Exception e) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, request, response);

        UsuarioEntity usuario = usuarioRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado após autenticação."));

        String tipo = (usuario instanceof VendedorEntity) ? "VENDEDOR" : "CLIENTE";

        return new LoginResponseDTO(usuario.getId(), usuario.getNome(), tipo);
    }

    // --- OTIMIZAMOS O MÉTODO CREATE E OUTROS ---
    @Override
    public UsuarioDTO create(UsuarioDTO dto) {
        if (dto.getSenha() == null || !dto.getSenha().equals(dto.getRepeticaoSenha())) {
            throw new IllegalArgumentException("Senhas não conferem.");
        }
        UsuarioEntity novaEntidade = (dto.getTipoConta() == TipoConta.VENDEDOR) ? new VendedorEntity() : new ClienteEntity();
        novaEntidade.setUsername(dto.getUsername());
        novaEntidade.setNome(dto.getNome());
        novaEntidade.setEmail(dto.getEmail());
        novaEntidade.setSenha(passwordEncoder.encode(dto.getSenha()));

        return toDto(usuarioRepository.save(novaEntidade));
    }

    // MANTENHA AS OUTRAS IMPLEMENTAÇÕES DE CRUD COMPLETAS, SE NÃO ESTIVEREM AQUI!
    // Se o seu código original for diferente, certifique-se de que o retorno é toDto() e não null.
    // ... (restante do código completo de UsuarioServiceImpl) ...
    @Override public List<UsuarioDTO> findAll() { return usuarioRepository.findAll().stream().map(this::toDto).collect(Collectors.toList()); }
    @Override public UsuarioDTO findByUsername(String username) { return usuarioRepository.findByUsername(username).map(this::toDto).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado: " + username)); }
    @Override public UsuarioDTO findByEmail(String email) { return usuarioRepository.findByEmail(email).map(this::toDto).orElseThrow(() -> new EntityNotFoundException("Email não encontrado: " + email)); }
    @Override public void delete(int id) { usuarioRepository.deleteById(id); }
    @Override public Boolean existByEmail(String email) { return usuarioRepository.findByEmail(email).isPresent(); }
    @Override public UsuarioDTO update(int id, String novoNome, String novaSenha) {
        UsuarioEntity usrExistente = usuarioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado ID: " + id));
        usrExistente.setNome(novoNome);
        usrExistente.setSenha(passwordEncoder.encode(novaSenha));
        return toDto(usuarioRepository.save(usrExistente));
    }
    private UsuarioDTO toDto(UsuarioEntity usr) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setUsername(usr.getUsername());
        dto.setNome(usr.getNome());
        dto.setEmail(usr.getEmail());
        dto.setTipoConta((usr instanceof VendedorEntity) ? TipoConta.VENDEDOR : TipoConta.CLIENTE);
        return dto;
    }
}