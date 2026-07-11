package com.example.em.Repository;

import com.example.em.Model.Trabajador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrabajadorRepository extends JpaRepository<Trabajador,Long> {
    boolean existsByDni(String dni);
    Optional<Trabajador> findByDni(String dni);
    Optional<Trabajador> findByUsuarioId(Long usuarioId);
}
