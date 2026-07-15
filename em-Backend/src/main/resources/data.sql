INSERT INTO usuarios (username, password, rol, activo) VALUES
('cristian19', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'ADMIN', true),
('emmy19', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'USER', true),
('user01', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'USER', true),
('user02', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'USER', false),
('admin01', '$2a$12$4gpaPJtECjV.ssaqpae9YOMiQxNSsjOK7BKUYJ1/qAI6j.tf/rGMm', 'ADMIN', true);

INSERT INTO trabajador (nombre, apellido_paterno, apellido_materno, dni, telefono, direccion, email, fecha_nacimiento, genero, fecha_ingreso, activo, usuario_id) VALUES
('Cristian', 'Huaman', 'Cruz', '73381544', '907608480', 'Calle Incanato', 'cristian.huaman@email.com', '2005-12-08', 'MASCULINO', '2020-01-15', true, 1),
('Esmeralda Maria Rosina', 'Vasquez', 'Carrasco', '76296919', '980112126', 'Las Delicias - Reque', 'emmy19@email.com', '2005-08-19', 'FEMENINO', '2019-03-10', true, 2),
('John', 'Chapofian', 'Montano', '11223344', '998877665', 'Pampas de Reque', 'john.chapofian@email.com', '1992-11-25', 'MASCULINO', '2021-06-01', true, 3),
('Ana', 'Martinez', 'Sanchez', '55667788', '955443322', 'Jr. Tacna 321', 'ana.martinez@email.com', '1988-03-10', 'FEMENINO', '2018-09-20', true, 4),
('Roberto', 'Gonzales', 'Diaz', '99887766', '944332211', 'Av. Brasil 654', 'roberto.gonzales@email.com', '1995-07-08', 'MASCULINO', '2022-02-28', true, 5);
