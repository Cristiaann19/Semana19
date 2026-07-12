package com.example.em.DTO;

import com.example.em.Model.Rol;
import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;
    private String username;
    private Rol rol;
    private boolean activo;
}
