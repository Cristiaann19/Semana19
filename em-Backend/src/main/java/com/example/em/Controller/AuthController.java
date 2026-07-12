package com.example.em.Controller;

import com.example.em.DTO.AuthRequest;
import com.example.em.DTO.AuthResponse;
import com.example.em.Model.Rol;
import com.example.em.Service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    //METODO A REVISAR
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(
                request.getUsername(),
                request.getPassword(),
                request.getRol().name()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    public static class RegisterRequest {
        @jakarta.validation.constraints.Size(min = 4, max = 100, message = "El username debe tener entre 4 y 100 caracteres")
        @jakarta.validation.constraints.Pattern(regexp = "^[a-zA-Z0-9._-]+$", message = "El username solo puede contener letras, números, puntos, guiones y guión bajo")
        private String username;

        @jakarta.validation.constraints.Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
        private String password;

        @jakarta.validation.constraints.NotNull(message = "El rol es obligatorio")
        private Rol rol;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public Rol getRol() { return rol; }
        public void setRol(Rol rol) { this.rol = rol; }
    }
}
