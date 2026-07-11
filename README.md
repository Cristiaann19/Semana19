# Sistema de Gestión de Empleados

Proyecto de ejemplo para el curso **Desarrollo Web Integrado**. Aplicación full-stack para gestión de empleados y usuarios con autenticación JWT.

## Stack Tecnológico

- **Backend:** Spring Boot 4.1.0 / Java 21 / Maven / MySQL
- **Frontend:** Angular 21 / PrimeNG v21 / Tailwind CSS v4
- **Autenticación:** JWT (JSON Web Token)

## Estructura del Proyecto

```
.
├── em/                                    # Backend (Spring Boot)
│   └── src/main/java/com/example/em/
│       ├── Config/                        # Seguridad, CORS, JWT, excepciones
│       ├── Controller/                    # REST endpoints
│       ├── DTO/                           # Data Transfer Objects
│       ├── Model/                         # Entidades JPA (Trabajador, Usuario)
│       ├── Repository/                    # Spring Data JPA
│       └── Service/                       # Lógica de negocio
│
└── my/                                    # Frontend (Angular 21)
    └── src/app/
        ├── core/services/                 # Servicios HTTP + interfaces
        ├── features/
        │   └── admin/
        │       ├── layout-admin/          # Layout con sidebar
        │       ├── login-component/       # Inicio de sesión
        │       ├── trabajadores-component/ # CRUD empleados
        │       └── usuarios-component/     # CRUD usuarios
        └── model/                         # Interfaces de datos
```

## Requisitos Previos

- JDK 21
- Node.js 22+
- MySQL 8+
- Angular CLI (`npm install -g @angular/cli`)

## Configuración y Ejecución

### 1. Base de Datos

```sql
CREATE DATABASE em;
```

### 2. Backend

```bash
cd em
./mvnw clean install
./mvnw spring-boot:run
```

El servidor inicia en `http://localhost:8080`. La conexión MySQL se configura en `em/src/main/resources/application.properties` (usuario `root`, contraseña `123456`).

### 3. Frontend

```bash
cd my
npm install
ng serve
```

La aplicación se abre en `http://localhost:4200`.

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Inicio de sesión |
| POST | `/api/auth/register` | Registro de usuario |
| GET | `/api/trabajadores` | Listar todos los empleados |
| POST | `/api/trabajadores` | Crear empleado |
| GET | `/api/trabajadores/{id}` | Obtener empleado por ID |
| PUT | `/api/trabajadores/{id}` | Actualizar empleado |
| PATCH | `/api/trabajadores/{id}/toggle-estado` | Activar/Desactivar empleado |
| DELETE | `/api/trabajadores/{id}` | Eliminar empleado |
| GET | `/api/trabajadores/dni/{dni}` | Buscar empleado por DNI |
| GET | `/api/usuarios` | Listar todos los usuarios |
| POST | `/api/usuarios` | Crear usuario |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| PATCH | `/api/usuarios/{id}/toggle-estado` | Activar/Desactivar usuario |
| GET | `/api/usuarios/username/{username}` | Buscar usuario por username |

## Funcionalidades

- **Autenticación JWT** con roles ADMIN y USER
- **CRUD de empleados** con datos personales, fecha de nacimiento, género, salario
- **CRUD de usuarios** del sistema con asignación de roles
- **Activación/desactivación** sincronizada de empleado y su cuenta de usuario
- **Búsqueda y filtrado** en tablas por múltiples campos
- **Ordenamiento personalizado** de 3 estados: ascendente → descendente → original
- **Paginación** configurable (5, 10, 20, 50 registros por página)
- **Modales** para creación, edición y confirmación de cambios de estado
- **Diseño responsive** con PrimeNG y Tailwind CSS (paleta teal `#329791`)
- **Protección de rutas** con guard de autenticación e interceptor HTTP para JWT

## Temas Cubiertos en el Curso

- Arquitectura full-stack (Spring Boot + Angular)
- API RESTful con validación de datos
- Autenticación y autorización con JWT y Spring Security
- Mapeo objeto-relacional con JPA/Hibernate y relaciones @OneToOne
- Programación reactiva con RxJS y señales de Angular
- Componentes standalone de Angular con ChangeDetectionStrategy.OnPush
- PrimeNG (p-table, p-dialog, p-select, p-datepicker, etc.)
- Tailwind CSS para estilos utilitarios
- Control de versiones con Git
