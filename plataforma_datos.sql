-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-12-2024 a las 22:43:57
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `plataforma_datos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `id_carrera` int(11) NOT NULL,
  `nom_carrera` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`id_carrera`, `nom_carrera`) VALUES
(1, 'Licenciatura en Ingeniería Financiera'),
(2, 'Licenciatura en Ingeniería Biomédica'),
(3, 'Licenciatura en Ingeniería en Tecnologías de la Información e Innovación Digital'),
(4, 'Ingeniería en Biotecnología'),
(5, 'Licenciatura en Terapia Física'),
(6, 'Licenciatura en Administración');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `id` varchar(10) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `end_date` date NOT NULL,
  `last_increment_source` varchar(50) DEFAULT NULL,
  `manual_increment` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datos`
--

INSERT INTO `datos` (`id`, `count`, `end_date`, `last_increment_source`, `manual_increment`) VALUES
('EVE0002', 35, '2024-11-14', 'sensor', 0),
('EVE0003', 1, '2024-11-14', 'sensor', 0),
('EVE0004', 1, '2024-11-14', 'manual', 1),
('EVE0006', 1, '2024-11-30', 'manual', 1),
('EVE0007', 10, '2024-11-30', 'sensor', 0),
('EVE0008', 1, '2024-11-30', 'manual', 1),
('EVE0009', 1, '2024-12-03', 'sensor', 0),
('EVE0010', 1, '2024-12-03', 'manual', 1),
('EVE0011', 1, '2024-12-03', 'manual', 1),
('EVE0012', 4, '2024-12-03', 'manual', 1),
('EVE0013', 1, '2024-12-03', 'manual', 1),
('EVE0014', 69, '2024-12-03', 'sensor', 0),
('EVE0015', 1, '2024-12-03', 'manual', 1),
('EVE0016', 1, '0000-00-00', 'manual', 1),
('EVE0017', 1, '2024-12-03', 'manual', 1),
('EVE0018', 1, '2024-12-03', 'manual', 1),
('EVE0019', 19, '2024-12-03', 'sensor', 0),
('EVE0020', 1, '2024-12-03', 'manual', 1),
('EVE0021', 484, '2024-12-03', 'sensor', 0),
('EVE0022', 28, '2024-12-03', 'sensor', 0),
('EVE0023', 1, '2024-12-04', 'manual', 1),
('EVE0024', 1, '2024-12-04', 'manual', 1),
('EVE0025', 1, '2024-12-04', 'manual', 1),
('EVE0026', 1, '2024-12-04', 'manual', 1),
('EVE0027', 5, '2024-12-04', 'sensor', 0),
('EVE0028', 15, '2024-12-04', 'sensor', 0),
('EVE0029', 15, '2024-12-04', 'sensor', 0),
('EVE0030', 1, '2024-12-04', 'manual', 1),
('EVE0031', 1, '2024-12-04', 'manual', 1),
('EVE0032', 6, '2024-12-04', 'sensor', 0),
('EVE0033', 2, '2024-12-04', 'sensor', 0),
('EVE0034', 1, '2024-12-04', 'manual', 1),
('EVE0035', 1, '2024-12-04', 'manual', 1),
('EVE0036', 5, '2024-12-04', 'sensor', 0),
('EVE0037', 1, '2024-12-09', 'manual', 1),
('EVE0038', 65, '2024-12-09', 'manual', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosevento`
--

CREATE TABLE `datosevento` (
  `id_evento` int(11) NOT NULL,
  `nombre_evento` text NOT NULL,
  `fechahora_inicio` datetime NOT NULL,
  `tipo_evento` int(11) NOT NULL,
  `nombre_ponente` text DEFAULT NULL,
  `lugar` varchar(255) NOT NULL,
  `tipo_carrera` varchar(255) NOT NULL,
  `nombre_organizador` text NOT NULL,
  `cargo_organizador` text NOT NULL,
  `comentarios` text DEFAULT NULL,
  `fechahora_fin` datetime NOT NULL,
  `tipo_dato` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datosevento`
--

INSERT INTO `datosevento` (`id_evento`, `nombre_evento`, `fechahora_inicio`, `tipo_evento`, `nombre_ponente`, `lugar`, `tipo_carrera`, `nombre_organizador`, `cargo_organizador`, `comentarios`, `fechahora_fin`, `tipo_dato`) VALUES
(1, 'Evento Prueba', '2024-11-14 02:04:00', 1, 'Prueba', 'Biblioteca', 'Ingeniería en Biotecnología', 'PruebaOrganizador', 'Licenciado', 'comentario', '2024-11-15 02:04:00', 'EVE0002'),
(8, 'EventoPruebaDB', '2024-11-27 02:52:00', 2, 'José MiguelPrueba', 'Biblioteca', 'Otro', 'ÁngelPrueba', 'EncargadoPrueba', 'no', '2024-11-28 02:52:00', 'EVE0003'),
(10, 'EventoPrueba10', '2024-11-27 07:24:00', 2, 'Prueba', 'Biblioteca', 'Licenciatura en Ingeniería en Tecnologías de la Información e Innovación Digital', 'Prueba', 'EncargadoPrueba', 'muy bien', '2024-11-27 07:25:00', 'EVE0002'),
(14, 'EventoP', '2024-11-27 07:33:00', 2, 'PruebaA', 'Auditorio', 'Ingeniería en Software', 'Prueba', 'EncargadoPrueba', 'ci', '2024-11-27 07:33:00', 'EVE0003'),
(16, 'EventoPDB', '2024-11-27 07:40:00', 2, 'Prueba', 'Biblioteca', 'Ingeniería en Software', 'Prueba', 'EncargadoPrueba', 'prueba', '2024-11-27 07:40:00', 'EVE0004'),
(18, 'EventoPrueba17', '2024-11-27 12:43:00', 2, 'Prueba17', 'Auditorio', 'Licenciatura en Administración', 'PruebaOrganizador', 'EncargadoPrueba17', '17', '2024-11-27 12:44:00', 'EVE0002'),
(22, 'Venta Navideña', '2024-11-29 17:00:00', 3, 'N/A', 'Explanada de la UPQROO', 'N/A', 'N/S', 'N/S', 'Prueba #777 de la entrada de datos', '2024-11-29 19:00:00', 'EVE0004'),
(25, 'Prueba Movilidad', '2024-11-28 16:47:00', 6, 'N/A', 'Digital', 'N/A', 'N/S', 'N/S', '   ', '2024-11-28 16:52:00', 'EVE0002'),
(27, 'Evento Prueba 19', '2024-12-03 12:19:00', 2, 'N/A', 'Prueba', 'Ingeniería en Software', 'PruebaOrganizador', 'N/S', 'n/a', '2024-12-03 12:20:00', 'EVE0019'),
(28, 'Evento Prueba Ing', '2024-12-03 13:18:00', 2, 'Prueba Ing', 'Oficina', 'N/A', 'N/S', 'N/S', 'N/S', '2024-12-03 13:19:00', 'EVE0022'),
(30, 'Prueba08', '2024-12-08 00:11:00', 2, 'Elizabeth Salas', 'Auditorio', 'Ingeniería en Biotecnología', 'Moises Zetina', 'Maestro', 'n/a2', '2024-12-08 00:12:00', 'EVE0007'),
(34, 'PruebaIntegracion', '2024-12-08 01:12:00', 1, 'Prueba', 'Auditorio', 'Público en General', 'Moises Zetina', 'Maestro', 'N/A', '2024-12-09 01:12:00', 'EVE0020');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `tipo_rol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `tipo_rol`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposeventos`
--

CREATE TABLE `tiposeventos` (
  `id` int(11) NOT NULL,
  `tipo_evento` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiposeventos`
--

INSERT INTO `tiposeventos` (`id`, `tipo_evento`) VALUES
(1, 'Conferencia'),
(2, 'Pláticas'),
(3, 'Cultural/Deportivo'),
(4, 'Social'),
(5, 'Académico'),
(6, 'Ferias/Exposiciones'),
(7, 'Presentaciones virtuales'),
(8, 'Concursos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` text NOT NULL,
  `correo` text NOT NULL,
  `contraseña` int(11) DEFAULT NULL,
  `cargo_usua` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `correo`, `contraseña`, `cargo_usua`) VALUES
(1, 'Departamento de Vinculación', 'correo@gmail.com', 12345678, 2),
(2, 'Departamento de Servicios E', 'nombre2@gmail.com', 654321, 2),
(5, 'Fatima García', 'fatimagv328@gmail.com', 112233, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`id_carrera`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `datosevento`
--
ALTER TABLE `datosevento`
  ADD PRIMARY KEY (`id_evento`),
  ADD KEY `id_carrera` (`tipo_carrera`),
  ADD KEY `id_dato` (`tipo_dato`),
  ADD KEY `tipo_evento` (`tipo_evento`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tiposeventos`
--
ALTER TABLE `tiposeventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `cargo_usuario` (`cargo_usua`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `id_carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `datosevento`
--
ALTER TABLE `datosevento`
  MODIFY `id_evento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tiposeventos`
--
ALTER TABLE `tiposeventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `datosevento`
--
ALTER TABLE `datosevento`
  ADD CONSTRAINT `datosevento_ibfk_2` FOREIGN KEY (`tipo_dato`) REFERENCES `datos` (`id`),
  ADD CONSTRAINT `datosevento_ibfk_3` FOREIGN KEY (`tipo_evento`) REFERENCES `tiposeventos` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`cargo_usua`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
