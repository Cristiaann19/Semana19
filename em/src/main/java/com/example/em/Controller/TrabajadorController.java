package com.example.em.Controller;

import com.example.em.DTO.TrabajadorDTO;
import com.example.em.DTO.TrabajadorRequestDTO;
import com.example.em.Service.TrabajadorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<TrabajadorDTO>> findAll() {
        return ResponseEntity.ok(trabajadorService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrabajadorDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(trabajadorService.findById(id));
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<TrabajadorDTO> findByDni(@PathVariable String dni) {
        return ResponseEntity.ok(trabajadorService.findByDni(dni));
    }

    @PostMapping
    public ResponseEntity<TrabajadorDTO> create(@Valid @RequestBody TrabajadorRequestDTO request) {
        TrabajadorDTO created = trabajadorService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{id}/toggle-estado")
    public ResponseEntity<Map<String, String>> toggleEstado(@PathVariable Long id) {
        trabajadorService.toggleEstado(id);
        return ResponseEntity.ok(Map.of("message", "Estado actualizado correctamente"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrabajadorDTO> update(@PathVariable Long id, @Valid @RequestBody TrabajadorRequestDTO request) {
        TrabajadorDTO updated = trabajadorService.update(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        trabajadorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
