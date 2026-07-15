package com.example.em.Service;

import com.example.em.Config.JwtUtil;
import com.example.em.DTO.AuthRequest;
import com.example.em.DTO.AuthResponse;
import com.example.em.Model.Rol;
import com.example.em.Model.Trabajador;
import com.example.em.Model.Usuario;
import com.example.em.Repository.TrabajadorRepository;
import com.example.em.Repository.UsuarioRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final TrabajadorRepository trabajadorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UsuarioRepository usuarioRepository, TrabajadorRepository trabajadorRepository,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
                       @Lazy AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.trabajadorRepository = trabajadorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    private String[] obtenerNombresPersona(Usuario usuario) {
        return trabajadorRepository.findByUsuarioId(usuario.getId())
                .map(t -> new String[]{t.getNombre(), t.getApellidoPaterno()})
                .orElse(new String[]{usuario.getUsername(), ""});
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("[AuthService] loadUserByUsername: " + username);
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> {
                    System.err.println("[AuthService] Usuario NO encontrado: " + username);
                    return new UsernameNotFoundException("Usuario no encontrado: " + username);
                });

        System.out.println("[AuthService] Usuario encontrado - activo: " + usuario.isActivo() + ", rol: " + usuario.getRol());
        return new User(
                usuario.getUsername(),
                usuario.getPassword(),
                usuario.isActivo(),
                true, true, true,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name()))
        );
    }

    public AuthResponse login(AuthRequest request) {
        System.out.println("[AuthService] >>> Login attempt for username: " + request.getUsername());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            System.out.println("[AuthService] >>> Authentication SUCCESSFUL for username: " + request.getUsername());
        } catch (AuthenticationException e) {
            System.err.println("[AuthService] >>> Authentication FAILED for username: " + request.getUsername());
            System.err.println("[AuthService] >>> Cause: " + e.getClass().getSimpleName() + ": " + e.getMessage());
            throw e;
        }

        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> {
                    System.err.println("[AuthService] User NOT found in DB after successful auth: " + request.getUsername());
                    return new UsernameNotFoundException("Usuario no encontrado: " + request.getUsername());
                });

        System.out.println("[AuthService] User found - id: " + usuario.getId() + ", activo: " + usuario.isActivo() + ", rol: " + usuario.getRol());

        String token = jwtUtil.generateToken(loadUserByUsername(request.getUsername()));
        System.out.println("[AuthService] JWT token generated for username: " + request.getUsername());

        String[] nombres = obtenerNombresPersona(usuario);
        return new AuthResponse(token, usuario.getUsername(), usuario.getRol().name(), nombres[0], nombres[1]);
    }

    public AuthResponse register(String username, String password, String rol) {
        if (usuarioRepository.existsByUsername(username)) {
            throw new RuntimeException("Ya existe un usuario con el username: " + username);
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setRol(Rol.valueOf(rol));
        usuario.setActivo(true);

        Usuario saved = usuarioRepository.save(usuario);

        String token = jwtUtil.generateToken(loadUserByUsername(saved.getUsername()));

        String[] nombres = obtenerNombresPersona(saved);
        return new AuthResponse(token, saved.getUsername(), saved.getRol().name(), nombres[0], nombres[1]);
    }
}
