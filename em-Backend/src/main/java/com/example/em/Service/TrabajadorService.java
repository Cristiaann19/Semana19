package com.example.em.Service;

import com.example.em.DTO.TrabajadorDTO;
import com.example.em.DTO.TrabajadorRequestDTO;
import com.example.em.DTO.UsuarioDTO;
import com.example.em.Model.Rol;
import com.example.em.Model.Trabajador;
import com.example.em.Model.Usuario;
import com.example.em.Repository.TrabajadorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrabajadorService {

    private final TrabajadorRepository trabajadorRepository;
    private final PasswordEncoder passwordEncoder;

    public TrabajadorService(TrabajadorRepository trabajadorRepository, PasswordEncoder passwordEncoder) {
        this.trabajadorRepository = trabajadorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<TrabajadorDTO> findAll() {
        return trabajadorRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TrabajadorDTO findById(Long id) {
        Trabajador trabajador = trabajadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trabajador no encontrado con id: " + id));
        return toDTO(trabajador);
    }

    public TrabajadorDTO findByDni(String dni) {
        Trabajador trabajador = trabajadorRepository.findByDni(dni)
                .orElseThrow(() -> new RuntimeException("Trabajador no encontrado con DNI: " + dni));
        return toDTO(trabajador);
    }

    public TrabajadorDTO create(TrabajadorRequestDTO request) {
        if (trabajadorRepository.existsByDni(request.getDni())) {
            throw new RuntimeException("Ya existe un trabajador con el DNI: " + request.getDni());
        }

        Trabajador trabajador = new Trabajador();
        trabajador.setNombre(request.getNombre());
        trabajador.setApellidoPaterno(request.getApellidoPaterno());
        trabajador.setApellidoMaterno(request.getApellidoMaterno());
        trabajador.setDni(request.getDni());
        trabajador.setTelefono(request.getTelefono());
        trabajador.setDireccion(request.getDireccion());
        trabajador.setEmail(request.getEmail());
        trabajador.setFechaNacimiento(request.getFechaNacimiento());
        trabajador.setGenero(request.getGenero());
        trabajador.setFechaIngreso(request.getFechaIngreso());
        trabajador.setActivo(request.isActivo());

        if (request.getUsuario() != null) {
            Usuario usuario = new Usuario();
            usuario.setUsername(request.getUsuario().getUsername());
            usuario.setPassword(passwordEncoder.encode(request.getUsuario().getPassword()));
            usuario.setRol(Rol.valueOf(request.getUsuario().getRol()));
            usuario.setActivo(true);
            trabajador.setUsuario(usuario);
        }

        Trabajador saved = trabajadorRepository.save(trabajador);
        return toDTO(saved);
    }

    public TrabajadorDTO update(Long id, TrabajadorRequestDTO request) {
        Trabajador trabajador = trabajadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trabajador no encontrado con id: " + id));

        trabajador.setNombre(request.getNombre());
        trabajador.setApellidoPaterno(request.getApellidoPaterno());
        trabajador.setApellidoMaterno(request.getApellidoMaterno());
        trabajador.setDni(request.getDni());
        trabajador.setTelefono(request.getTelefono());
        trabajador.setDireccion(request.getDireccion());
        trabajador.setEmail(request.getEmail());
        trabajador.setFechaNacimiento(request.getFechaNacimiento());
        trabajador.setGenero(request.getGenero());
        trabajador.setFechaIngreso(request.getFechaIngreso());
        trabajador.setActivo(request.isActivo());

        if (request.getUsuario() != null && trabajador.getUsuario() != null) {
            Usuario usuario = trabajador.getUsuario();
            usuario.setUsername(request.getUsuario().getUsername());
            if (request.getUsuario().getPassword() != null) {
                usuario.setPassword(passwordEncoder.encode(request.getUsuario().getPassword()));
            }
            usuario.setRol(Rol.valueOf(request.getUsuario().getRol()));
        }

        Trabajador saved = trabajadorRepository.save(trabajador);
        return toDTO(saved);
    }

    public void toggleEstado(Long id) {
        Trabajador trabajador = trabajadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trabajador no encontrado con id: " + id));
        trabajador.setActivo(!trabajador.isActivo());
        if (trabajador.getUsuario() != null) {
            trabajador.getUsuario().setActivo(trabajador.isActivo());
        }
        trabajadorRepository.save(trabajador);
    }

    public void delete(Long id) {
        if (!trabajadorRepository.existsById(id)) {
            throw new RuntimeException("Trabajador no encontrado con id: " + id);
        }
        trabajadorRepository.deleteById(id);
    }

    public boolean existsByDni(String dni) {
        return trabajadorRepository.existsByDni(dni);
    }

    private TrabajadorDTO toDTO(Trabajador trabajador) {
        TrabajadorDTO dto = new TrabajadorDTO();
        dto.setId(trabajador.getId());
        dto.setNombre(trabajador.getNombre());
        dto.setApellidoPaterno(trabajador.getApellidoPaterno());
        dto.setApellidoMaterno(trabajador.getApellidoMaterno());
        dto.setDni(trabajador.getDni());
        dto.setTelefono(trabajador.getTelefono());
        dto.setDireccion(trabajador.getDireccion());
        dto.setEmail(trabajador.getEmail());
        dto.setFechaNacimiento(trabajador.getFechaNacimiento());
        dto.setGenero(trabajador.getGenero());
        dto.setFechaIngreso(trabajador.getFechaIngreso());
        dto.setActivo(trabajador.isActivo());

        if (trabajador.getUsuario() != null) {
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setId(trabajador.getUsuario().getId());
            usuarioDTO.setUsername(trabajador.getUsuario().getUsername());
            usuarioDTO.setRol(trabajador.getUsuario().getRol());
            usuarioDTO.setActivo(trabajador.getUsuario().isActivo());
            dto.setUsuario(usuarioDTO);
        }

        return dto;
    }
}
