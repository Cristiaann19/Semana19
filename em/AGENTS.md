# AGENTS.md

## Project

Spring Boot 4.1.0 / Java 21 / Maven employee management app. MySQL database.
Package: `com.example.em`. Frontend: Angular 21 (`http://localhost:4200`).

## Build & Run

```bash
./mvnw clean install        # compile + test
./mvnw spring-boot:run      # run app
./mvnw test                 # tests only
```

MySQL: `localhost:3306/em` (root/123456). Config in `application.properties`.

## Project Structure

```
src/main/java/com/example/em/
  EmApplication.java          # entry point
  Config/
    SecurityConfig.java       # CORS + JWT security (CSRF disabled for REST)
    CorsConfig.java           # allows http://localhost:4200
    JwtUtil.java              # JWT token generation/validation
    JwtAuthFilter.java        # JWT authentication filter
    GlobalExceptionHandler.java  # @RestControllerAdvice for error handling
  Model/                      # JPA entities (Usuario, Trabajador) + enums (Rol, Genero)
  Repository/                 # Spring Data JPA repos
  DTO/                        # API DTOs (UsuarioDTO, TrabajadorDTO, TrabajadorRequestDTO, AuthRequest, AuthResponse)
  Service/                    # Business logic (AuthService, UsuarioService, TrabajadorService)
  Controller/                 # REST endpoints (/api/auth, /api/usuarios, /api/trabajadores)
```

## API Endpoints

- `POST /api/auth/login` — login (no auth required)
- `POST /api/auth/register` — register (no auth required)
- `GET/POST /api/usuarios` — list all / create (auth required)
- `GET/PUT/DELETE /api/usuarios/{id}` — by ID (auth required)
- `GET /api/usuarios/username/{username}` — by username (auth required)
- `GET/POST /api/trabajadores` — list all / create (auth required)
- `GET/PUT/DELETE /api/trabajadores/{id}` — by ID (auth required)
- `GET /api/trabajadores/dni/{dni}` — by DNI (auth required)

## Conventions

- **Language**: Validation messages and comments are in Spanish
- **Package dirs** use capitalized names (`Model`, `Config`, `Repository`, `DTO`, `Service`, `Controller`) — match existing style, not standard Java lowercase
- **Lombok** `@Data` on entities and DTOs; annotation processor configured in `pom.xml`
- **Enums**: `Rol` (ADMIN, USER), `Genero` (MASCULINO, FEMININO) — stored as strings
- `Trabajador` has `@OneToOne` to `Usuario` with `@JsonIgnoreProperties({"password"})`
- **CORS** configured for Angular at `http://localhost:4200`
- **Security**: CSRF disabled, `/api/auth/**` permits all, `/api/**` requires JWT authentication
- **Global exception handling** via `GlobalExceptionHandler` (`@RestControllerAdvice`)

## Testing

Single test: `EmApplicationTests.contextLoads()`. No integration or unit tests yet.

## Installed Skills

Refer to `.agents/skills/` for coding standards, Javadoc, and Spring Boot best practices.
