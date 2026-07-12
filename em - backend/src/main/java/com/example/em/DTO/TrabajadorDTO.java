package com.example.em.DTO;

import com.example.em.Model.Genero;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TrabajadorDTO {
    private Long id;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String dni;
    private String telefono;
    private String direccion;
    private String email;
    private LocalDate fechaNacimiento;
    private Genero genero;
    private LocalDate fechaIngreso;
    private boolean activo;
    private UsuarioDTO usuario;
}
