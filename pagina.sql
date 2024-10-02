-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2024 at 03:55 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pagina`
--

-- --------------------------------------------------------

--
-- Table structure for table `especialidad`
--

CREATE TABLE `especialidad` (
  `ID_Especialidad` int(11) NOT NULL,
  `Nom_espe` varchar(50) DEFAULT NULL,
  `ID_Medic` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `especialidad`
--

INSERT INTO `especialidad` (`ID_Especialidad`, `Nom_espe`, `ID_Medic`) VALUES
(1, 'Cardiologia', 1),
(2, 'Neurologia', 2),
(3, 'Dermatologia', 3),
(4, 'Pediatria', 4),
(5, 'Oftalmologia', 5),
(6, 'Ginecologia', 6),
(7, 'Psiquiatria', 7),
(8, 'Oncologia', 8);

-- --------------------------------------------------------

--
-- Table structure for table `horario`
--

CREATE TABLE `horario` (
  `ID_Horario` int(11) NOT NULL,
  `FechaHora` datetime DEFAULT NULL,
  `ID_Medic` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `horario`
--

INSERT INTO `horario` (`ID_Horario`, `FechaHora`, `ID_Medic`) VALUES
(1, '2024-09-03 09:00:00', 1),
(2, '2024-09-03 10:00:00', 2),
(3, '2024-09-03 11:00:00', 3),
(4, '2024-09-03 12:00:00', 4),
(5, '2024-09-04 09:00:00', 5),
(6, '2024-09-04 10:00:00', 6),
(7, '2024-09-04 11:00:00', 7),
(8, '2024-09-04 12:00:00', 8),
(9, '2024-09-05 09:00:00', 1),
(10, '2024-09-05 10:00:00', 2),
(11, '2024-09-05 10:00:00', 11),
(12, '2024-09-05 11:00:00', 12),
(13, '2024-09-05 12:00:00', 13),
(14, '2024-09-05 13:00:00', 14),
(15, '2024-09-05 14:00:00', 15),
(16, '2024-09-05 15:00:00', 16),
(17, '2024-09-05 16:00:00', 17),
(18, '2024-09-05 17:00:00', 18),
(19, '2024-09-05 18:00:00', 19),
(20, '2024-09-05 19:00:00', 20);

-- --------------------------------------------------------

--
-- Table structure for table `medico`
--

CREATE TABLE `medico` (
  `ID_Medic` int(11) NOT NULL,
  `Nom_medic` varchar(50) DEFAULT NULL,
  `Apelli_medic` varchar(50) DEFAULT NULL,
  `Correo_medico` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medico`
--

INSERT INTO `medico` (`ID_Medic`, `Nom_medic`, `Apelli_medic`, `Correo_medico`) VALUES
(1, 'John', 'Doe', 'john.doe@hospital.com'),
(2, 'Jane', 'Smith', 'jane.smith@hospital.com'),
(3, 'Robert', 'Brown', 'robert.brown@hospital.com'),
(4, 'Emily', 'Davis', 'emily.davis@hospital.com'),
(5, 'Michael', 'Johnson', 'michael.johnson@hospital.com'),
(6, 'Sarah', 'Wilson', 'sarah.wilson@hospital.com'),
(7, 'James', 'Taylor', 'james.taylor@hospital.com'),
(8, 'Patricia', 'Moore', 'patricia.moore@hospital.com'),
(11, 'Diego', 'Flores', 'diego.flores@example.com'),
(12, 'Lucia', 'Rivera', 'lucia.rivera@example.com'),
(13, 'Pedro', 'Gonzalez', 'pedro.gonzalez@example.com'),
(14, 'Carmen', 'Diaz', 'carmen.diaz@example.com'),
(15, 'Javier', 'Morales', 'javier.morales@example.com'),
(16, 'Isabel', 'Ortiz', 'isabel.ortiz@example.com'),
(17, 'Fernando', 'Castro', 'fernando.castro@example.com'),
(18, 'Patricia', 'Vega', 'patricia.vega@example.com'),
(19, 'Raul', 'Ramos', 'raul.ramos@example.com'),
(20, 'Marta', 'Molina', 'marta.molina@example.com');

-- --------------------------------------------------------

--
-- Table structure for table `notificacion`
--

CREATE TABLE `notificacion` (
  `ID_notificacion` int(11) NOT NULL,
  `mensaje` varchar(200) DEFAULT NULL,
  `ID_User` int(11) DEFAULT NULL,
  `ID_Reserva` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notificacion`
--

INSERT INTO `notificacion` (`ID_notificacion`, `mensaje`, `ID_User`, `ID_Reserva`) VALUES
(1, 'Su cita ha sido confirmada.', 1, 1),
(2, 'Su cita ha sido confirmada.', 2, 2),
(3, 'Su cita ha sido cancelada.', 4, 4),
(4, 'Su cita ha sido confirmada.', 5, 5),
(5, 'Su cita ha sido confirmada.', 6, 6),
(6, 'Su cita ha sido cancelada.', 7, 7),
(7, 'Su cita ha sido confirmada.', 8, 8),
(8, 'Su cita ha sido confirmada.', 9, 9),
(9, 'Su cita ha sido confirmada.', 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `reserva`
--

CREATE TABLE `reserva` (
  `ID_Reserva` int(11) NOT NULL,
  `ID_User` int(11) DEFAULT NULL,
  `ID_Horario` int(11) DEFAULT NULL,
  `FechaCreacion` datetime DEFAULT NULL,
  `Cancelacion` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reserva`
--

INSERT INTO `reserva` (`ID_Reserva`, `ID_User`, `ID_Horario`, `FechaCreacion`, `Cancelacion`) VALUES
(1, 1, 1, '2024-08-30 08:30:00', 0),
(2, 2, 2, '2024-08-30 09:00:00', 0),
(3, 3, 3, '2024-08-30 10:00:00', 0),
(4, 4, 4, '2024-08-30 10:15:00', 1),
(5, 5, 5, '2024-08-31 08:00:00', 0),
(6, 6, 6, '2024-08-31 08:15:00', 0),
(7, 7, 7, '2024-09-01 09:00:00', 1),
(8, 8, 8, '2024-09-01 09:15:00', 0),
(9, 9, 9, '2024-09-02 08:30:00', 0),
(10, 10, 10, '2024-09-02 09:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `ID_User` int(11) NOT NULL,
  `rut` varchar(50) DEFAULT NULL,
  `Contraseña` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`ID_User`, `rut`, `Contraseña`) VALUES
(1, '12345678-9', 'password123'),
(2, '98765432-1', 'securepass'),
(3, '12311111-1', 'pass1234'),
(4, '87654321-0', 'mypassword'),
(5, '11223344-5', 'letmein'),
(6, '55667788-9', 'pass4567'),
(7, '99887766-5', 'topsecret'),
(8, '44556677-8', 'mypassword1'),
(9, '33221100-1', '1234abcd'),
(10, '77889900-2', 'qwerty123'),
(11, '12345678-11', 'password11'),
(12, '12345678-12', 'password12'),
(13, '12345678-13', 'password13'),
(14, '12345678-14', 'password14'),
(15, '12345678-15', 'password15'),
(16, '12345678-16', 'password16'),
(17, '12345678-17', 'password17'),
(18, '12345678-18', 'password18'),
(19, '12345678-19', 'password19'),
(20, '12345678-20', 'password20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`ID_Especialidad`);

--
-- Indexes for table `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`ID_Horario`);

--
-- Indexes for table `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`ID_Medic`);

--
-- Indexes for table `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`ID_notificacion`);

--
-- Indexes for table `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`ID_Reserva`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_User`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
