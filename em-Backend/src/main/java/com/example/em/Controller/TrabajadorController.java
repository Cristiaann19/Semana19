package com.example.em.Controller;

import com.example.em.DTO.TrabajadorDTO;
import com.example.em.DTO.TrabajadorRequestDTO;
import com.example.em.Service.TrabajadorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trabajadores")
public class TrabajadorController {

    private final TrabajadorService trabajadorService;

    public TrabajadorController(TrabajadorService trabajadorService) {
        this.trabajadorService = trabajadorService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<TrabajadorDTO>> findAll() {
        return ResponseEntity.ok(trabajadorService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TrabajadorDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(trabajadorService.findById(id));
    }

    @GetMapping("/dni/{dni}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TrabajadorDTO> findByDni(@PathVariable String dni) {
        return ResponseEntity.ok(trabajadorService.findByDni(dni));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TrabajadorDTO> create(@Valid @RequestBody TrabajadorRequestDTO request) {
        TrabajadorDTO created = trabajadorService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{id}/toggle-estado")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> toggleEstado(@PathVariable Long id) {
        trabajadorService.toggleEstado(id);
        return ResponseEntity.ok(Map.of("message", "Estado actualizado correctamente"));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TrabajadorDTO> update(@PathVariable Long id, @Valid @RequestBody TrabajadorRequestDTO request) {
        TrabajadorDTO updated = trabajadorService.update(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        trabajadorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
