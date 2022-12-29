-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-12-2022 a las 21:38:21
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jo2eg4i8_ada`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblap_bh`
--

CREATE TABLE `tblap_bh` (
  `idbh` int(11) NOT NULL,
  `datebh` date NOT NULL,
  `descriptionbh` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblap_bh`
--

INSERT INTO `tblap_bh` (`idbh`, `datebh`, `descriptionbh`) VALUES
(1, '2022-01-03', 'New Year\'s Day'),
(2, '2022-02-21', 'Winter Midterm Bank Holiday'),
(3, '2022-04-15', 'Good Friday'),
(4, '2022-04-18', 'Easter Monday'),
(5, '2022-04-28', 'Workers Memorial Day'),
(6, '2022-05-02', 'May Day'),
(7, '2022-06-02', 'Spring Bank Holiday'),
(8, '2022-06-03', 'Platinum Jubilee'),
(9, '2022-06-13', 'The Queen\'s Birthday'),
(10, '2022-08-29', 'Late Summer Bank Holiday'),
(11, '2022-09-12', 'Gibraltar National Day'),
(12, '2022-12-26', 'Christmas Day'),
(13, '2022-12-27', 'Boxing Day');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblap_categories`
--

CREATE TABLE `tblap_categories` (
  `idCat` int(11) NOT NULL,
  `orderCat` int(11) NOT NULL,
  `codeCat` int(11) NOT NULL,
  `nameCat` text NOT NULL,
  `familyOrderCat` int(11) NOT NULL,
  `familyCat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblap_categories`
--

INSERT INTO `tblap_categories` (`idCat`, `orderCat`, `codeCat`, `nameCat`, `familyOrderCat`, `familyCat`) VALUES
(1, 1, 1, 'Normal', 1, 'Duties'),
(2, 2, 2, 'Extra', 1, 'Duties'),
(3, 3, 3, 'FR', 2, 'Overtime'),
(4, 4, 4, '@1 1/2', 2, 'Overtime'),
(5, 5, 5, '@2', 2, 'Overtime'),
(6, 6, 6, 'Sat @33%', 3, 'Allowances'),
(7, 7, 7, 'Sun @66%', 3, 'Allowances'),
(8, 8, 8, 'NR @33%', 3, 'Allowances'),
(9, 9, 9, 'SDA @5%', 4, 'No name 4th category'),
(10, 10, 10, 'OT SDA @5%', 4, 'No name 4th category'),
(11, 11, 11, 'Sl', 5, 'Sl category'),
(12, 12, 12, 'Subst1', 5, 'Sl'),
(13, 13, 13, 'Subst2', 5, 'Sl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblap_users`
--

CREATE TABLE `tblap_users` (
  `Iduser` int(11) NOT NULL,
  `userUser` text NOT NULL,
  `passUser` text NOT NULL,
  `nameUser` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tblap_users`
--

INSERT INTO `tblap_users` (`Iduser`, `userUser`, `passUser`, `nameUser`) VALUES
(1, 'Santiago', '123', 'Santiago'),
(2, 'Sonia', '124', 'Sonia');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tblap_bh`
--
ALTER TABLE `tblap_bh`
  ADD PRIMARY KEY (`idbh`);

--
-- Indices de la tabla `tblap_categories`
--
ALTER TABLE `tblap_categories`
  ADD PRIMARY KEY (`idCat`);

--
-- Indices de la tabla `tblap_users`
--
ALTER TABLE `tblap_users`
  ADD PRIMARY KEY (`Iduser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tblap_bh`
--
ALTER TABLE `tblap_bh`
  MODIFY `idbh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tblap_categories`
--
ALTER TABLE `tblap_categories`
  MODIFY `idCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tblap_users`
--
ALTER TABLE `tblap_users`
  MODIFY `Iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
