-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-12-2016 a las 17:43:07
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tplaboratorioiv2016`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `local`
--

CREATE TABLE `local` (
  `id_local` int(11) NOT NULL,
  `nombre_local` varchar(200) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `direccion_local` varchar(200) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `latitud_local` int(11) NOT NULL,
  `longitud_local` int(11) NOT NULL,
  `foto_local` varchar(2000) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `local`
--

INSERT INTO `local` (`id_local`, `nombre_local`, `direccion_local`, `latitud_local`, `longitud_local`, `foto_local`) VALUES
(0, 'Pizzeria Wilde III', 'Wilde 123', 0, 0, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzeria Wilde III_0.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzeria Wilde III_1.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzeria Wilde III_2.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzeria Wilde III_3.jpg"]'),
(5, 'Pizza Quilmes', 'Quilmes 123', 0, 0, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizza Quilmes_0.jpg"]'),
(6, 'Pizzerias Wilde III', 'Wilde 123', 0, 0, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzerias Wilde III_0.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzerias Wilde III_1.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzerias Wilde III_2.jpg"]'),
(8, 'Pizzeria Wilde IV', 'Wilde 123', -35, -58, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzeria Wilde IV_0.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzeria Wilde IV_1.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzeria Wilde IV_2.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizzeria Wilde IV_3.jpg"]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_pizza` int(11) NOT NULL,
  `id_local` int(11) NOT NULL,
  `cantidad_pizza` int(11) NOT NULL,
  `estado_pedido` int(11) NOT NULL,
  `fecha_entrega` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_user`, `id_pizza`, `id_local`, `cantidad_pizza`, `estado_pedido`, `fecha_entrega`) VALUES
(1, 1, 3, 5, 1, 1, '2016-11-10'),
(4, 1, 3, 5, 3, 1, '2016-11-01'),
(5, 1, 3, 5, 6, 1, '2016-11-30'),
(6, 3, 3, 8, 4, 0, '2016-11-26'),
(7, 4, 3, 8, 3, 0, '2016-11-27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pizza`
--

CREATE TABLE `pizza` (
  `id_pizza` int(11) NOT NULL,
  `descripcion_pizza` varchar(2000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `precio_pizza` int(11) NOT NULL,
  `foto_pizza` varchar(2000) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `pizza`
--

INSERT INTO `pizza` (`id_pizza`, `descripcion_pizza`, `precio_pizza`, `foto_pizza`) VALUES
(3, 'Pizza Wilde', 2, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizza Wilde_0.jpg"]'),
(4, 'Pizza Wilde', 2, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizza Wilde_0.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/Pizza Wilde_1.jpg"]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promocion`
--

CREATE TABLE `promocion` (
  `id_promo` int(11) NOT NULL,
  `precio_promo` int(11) NOT NULL,
  `id_pizza` int(11) NOT NULL,
  `id_local` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `promocion`
--

INSERT INTO `promocion` (`id_promo`, `precio_promo`, `id_pizza`, `id_local`) VALUES
(2, 2, 3, 4),
(4, 5, 3, 4),
(6, 8, 3, 6),
(7, 3, 4, 0),
(8, 3, 3, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `descripcion_rol` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `descripcion_rol`) VALUES
(1, 'ADMINISTRADOR'),
(2, 'EMPLEADO'),
(3, 'CLIENTE'),
(4, 'ENCARGADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `pass_usuario` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_rol` int(11) NOT NULL,
  `nombre_persona` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `apellido_persona` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `dni_persona` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `direccion_persona` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `latitud_persona` int(11) NOT NULL,
  `longitud_persona` int(11) NOT NULL,
  `foto_persona` varchar(2000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_local` varchar(11) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `estado_usuario` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `pass_usuario`, `id_rol`, `nombre_persona`, `apellido_persona`, `dni_persona`, `direccion_persona`, `latitud_persona`, `longitud_persona`, `foto_persona`, `id_local`, `estado_usuario`) VALUES
(1, 'AXELCORES', 'A1', 1, 'AXELCORES', 'dsa', 'asd', 'asd', 0, 0, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/1_0.jpg"]', '5', 1),
(5, 'Axel1', '1234', 4, 'Axel', 'Cores', '37426853', 'Calle Falsa 123', -35, -58, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/37426853_0.jpg"]', '6', 1),
(6, 'ASD', '1234', 1, 'Axel', 'Cores', '37426853', 'Calle Falsa 123', -35, -58, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/37426853_0.jpg"]', '0', 1),
(7, 'AxelLucas', '1234', 2, 'Axel Lucas', 'Cores', '37426853', 'Calle Falsa 123', -35, -58, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/37426853_0.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/37426853_1.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/37426853_2.jpg"]', '', 1),
(8, 'EmpleadoArgento', '1234', 2, 'Pepe', 'Argento', '10532123', 'Calle Falsa 123', -35, -58, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/10532123_0.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/10532123_1.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/10532123_2.jpg"]', '', 1),
(9, 'Dardo', '1234', 3, 'Dardo', 'Lopez', '30213321', 'Calle Falsa 123', -35, -58, '["http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/30213321_0.jpg","http:\\/\\/localhost:8080\\/Laboratorio-IV-2016\\/TPlaboratorioIV2016\\/ws1\\/fotos\\/30213321_1.jpg"]', '', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `local`
--
ALTER TABLE `local`
  ADD PRIMARY KEY (`id_local`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `pizza`
--
ALTER TABLE `pizza`
  ADD PRIMARY KEY (`id_pizza`);

--
-- Indices de la tabla `promocion`
--
ALTER TABLE `promocion`
  ADD PRIMARY KEY (`id_promo`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `local`
--
ALTER TABLE `local`
  MODIFY `id_local` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `pizza`
--
ALTER TABLE `pizza`
  MODIFY `id_pizza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `promocion`
--
ALTER TABLE `promocion`
  MODIFY `id_promo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
