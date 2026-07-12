-- ============================================
-- SCRIPT DE INSERCION DE DATOS PRUEBA
-- Base de datos: em
-- Contraseñas hasheadas con BCrypt
-- ============================================
-- drop database em
-- create database em
use em;

-- Primero insertar usuarios (trabajador depende de usuario)
-- Passwords: admin123, user123 (hasheados con BCrypt)
INSERT INTO usuarios (username, password, rol, activo) VALUES
('admin01', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'ADMIN', true),
('user01', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'USER', true),
('user02', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'USER', true),
('user03', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'USER', false),
('admin02', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'ADMIN', true);

-- Luego insertar trabajadores (con referencia a usuario_id)
INSERT INTO trabajador (nombre, apellido_paterno, apellido_materno, dni, telefono, direccion, email, fecha_nacimiento, genero, fecha_ingreso, activo, usuario_id) VALUES
('Juan', 'Pérez', 'García', '12345678', '987654321', 'Av. Lima 123', 'juan.perez@email.com', '1990-05-15', 'MASCULINO', '2020-01-15', true, 1),
('María', 'López', 'Martínez', '87654321', '912345678', 'Jr. Cusco 456', 'maria.lopez@email.com', '1985-08-20', 'FEMENINO', '2019-03-10', true, 2),
('Carlos', 'Rodríguez', 'Fernández', '11223344', '998877665', 'Av. Arequipa 789', 'carlos.rodriguez@email.com', '1992-11-25', 'MASCULINO', '2021-06-01', true, 3),
('Ana', 'Martínez', 'Sánchez', '55667788', '955443322', 'Jr. Tacna 321', 'ana.martinez@email.com', '1988-03-10', 'FEMENINO', '2018-09-20', true, 4),
('Roberto', 'Gonzales', 'Díaz', '99887766', '944332211', 'Av. Brasil 654', 'roberto.gonzales@email.com', '1995-07-08', 'MASCULINO', '2022-02-28', true, 5);
