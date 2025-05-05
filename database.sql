-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS aquadomus;
USE aquadomus;

-- Tabla nodes
CREATE TABLE IF NOT EXISTS nodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(255) NOT NULL,
    token VARCHAR(500) NULL,
    nombre VARCHAR(255) NULL,
    calle VARCHAR(255) NULL,
    codpostal VARCHAR(255) NULL,
    provincia VARCHAR(255) NULL,
    localidad VARCHAR(255) NULL
);

-- Tabla sensors
CREATE TABLE IF NOT EXISTS sensors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_registro INT NOT NULL,
    nombre VARCHAR(255) NULL,
    dispositivo VARCHAR(255) NULL,
    area VARCHAR(255) NULL,
    ubicacion VARCHAR(255) NULL,
    coordX DECIMAL(10,2) NULL,
    coordY DECIMAL(10,2) NULL,
    FOREIGN KEY (id_registro) REFERENCES nodes(id) ON DELETE SET NULL
);

-- Tabla sensorData
CREATE TABLE IF NOT EXISTS sensorData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_sensor INT NOT NULL,
    nombre VARCHAR(255) NULL,
    valor VARCHAR(255) NULL,
    estado VARCHAR(50) NULL,
    fecha_hora DATETIME NULL,
    unidades VARCHAR(50) NULL,
    FOREIGN KEY (id_sensor) REFERENCES sensors(id) ON DELETE CASCADE
);

-- Mostrar tablas creadas
SHOW TABLES;
