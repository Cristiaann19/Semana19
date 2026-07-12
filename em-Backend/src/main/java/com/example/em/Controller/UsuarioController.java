package com.example.em.Controller;

import com.example.em.DTO.UsuarioDTO;
import com.example.em.Service.UsuarioService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @GetMapping("/username/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioDTO> findByUsername(@PathVariable String username) {
        return ResponseEntity.ok(usuarioService.findByUsername(username));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioDTO> create(@Valid @RequestBody UsuarioCreateRequest request) {
        UsuarioDTO created = usuarioService.create(
                request.getUsername(),
                request.getPassword(),
                request.getRol()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioDTO> update(@PathVariable Long id, @Valid @RequestBody UsuarioUpdateRequest request) {
        UsuarioDTO updated = usuarioService.update(
                id,
                request.getUsername(),
                request.getPassword(),
                request.getRol(),
                request.isActivo()
        );
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/toggle-estado")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> toggleEstado(@PathVariable Long id) {
        usuarioService.toggleEstado(id);
        return ResponseEntity.ok(Map.of("message", "Estado actualizado correctamente"));
    }

    public static class UsuarioCreateRequest {
        @Size(min = 4, max = 100, message = "El username debe tener entre 4 y 100 caracteres")
        private String username;

        @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
        private String password;

        @Pattern(regexp = "ADMIN|USER", message = "El rol debe ser ADMIN o USER")
        private String rol;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRol() { return rol; }
        public void setRol(String rol) { this.rol = rol; }
    }

    public static class UsuarioUpdateRequest {
        @Size(min = 4, max = 100, message = "El username debe tener entre 4 y 100 caracteres")
        private String username;

        @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
        private String password;

        @Pattern(regexp = "ADMIN|USER", message = "El rol debe ser ADMIN o USER")
        private String rol;

        private boolean activo;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRol() { return rol; }
        public void setRol(String rol) { this.rol = rol; }
        public boolean isActivo() { return activo; }
        public void setActivo(boolean activo) { this.activo = activo; }
    }
}
