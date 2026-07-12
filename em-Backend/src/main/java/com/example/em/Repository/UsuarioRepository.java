package com.example.em.Repository;

import com.example.em.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    boolean existsByUsername(String username);
    Optional<Usuario> findByUsername(String username);
}
