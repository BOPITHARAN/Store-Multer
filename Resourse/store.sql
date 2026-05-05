-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2026 at 11:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `quantity` varchar(50) NOT NULL,
  `price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `quantity`, `price`) VALUES
(1, 'Pen', '2201', '1.50'),
(2, 'Pencil', '250', '0.50'),
(4, 'Eraser', '180', '0.30'),
(5, 'Sharpener', '90', '0.60'),
(6, 'Marker', '120', '1.20'),
(7, 'Ruler', '60', '0.80'),
(8, 'Glue Stick', '40', '1.10'),
(9, 'Stapler', '30', '2.50'),
(10, 'Tape', '55', '1.30'),
(15, 'Paper Clips', '500', '0.20'),
(16, 'Binder Clips', '200', '0.40'),
(17, 'Index Cards', '150', '0.70'),
(18, 'Post-it Notes', '300', '1.00'),
(19, 'Whiteboard Marker', '80', '1.50'),
(20, 'Scissors', '45', '2.20'),
(21, 'Tape Dispenser', '25', '3.00'),
(22, 'File Folders', '100', '0.90'),
(23, 'Calculator', '15', '10.00'),
(24, 'Paper Cutter', '10', '15.00'),
(25, 'Sticky Notes', '200', '0.50'),
(26, 'Index Tabs', '120', '1.20'),
(27, 'Whiteboard Eraser', '70', '1.80'),
(28, 'Bulletin Board Pins', '400', '0.10'),
(29, 'Tape Refills', '60', '2.00'),
(30, 'Desk Organizer', '20', '5.00'),
(31, 'Paper Shredder', '5', '100.00'),
(32, 'Printer Paper', '500', '4.00'),
(33, 'Ink Cartridges', '25', '20.00'),
(34, 'USB Flash Drive', '40', '8.00'),
(35, 'External Hard Drive', '10', '80.00'),
(36, 'Laptop Stand', '15', '30.00'),
(37, 'Mouse Pad', '200', '2.50'),
(38, 'Keyboard Cover', '50', '3.50'),
(39, 'Screen Cleaner', '100', '1.50'),
(40, 'Cable Organizer', '75', '2.00'),
(41, 'Laptop Sleeve', '30', '15.00'),
(42, 'Webcam', '20', '25.00'),
(43, 'Microphone', '10', '50.00'),
(44, 'Headphones', '15', '40.00'),
(45, 'Speakers', '8', '60.00'),
(46, 'Projector', '5', '200.00'),
(47, 'Screen Protector', '100', '5.00'),
(48, 'Phone Stand', '150', '3.00'),
(49, 'Charger Cable', '300', '2'),
(138, 'Old Pen', '200', '10'),
(139, 'Old Pencile', '55', '33.2');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Role` enum('User','Admin') NOT NULL DEFAULT 'User',
  `Password` varchar(255) NOT NULL,
  `PhotoURL` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Username`, `Email`, `Role`, `Password`, `PhotoURL`, `created_at`) VALUES
(1, 'user', 'user@gmail.com', 'User', '$2b$10$2c6TpJuHNsOq4n0Y9yT5/.4yTTaEKBY8bO2BFFxKOptscBpWOv4di', NULL, '2026-04-23 15:48:26'),
(2, 'admin', 'admin@gmail.com', 'Admin', '$2b$10$hZ6f3wccKo1NSpfAa1/vKuzK7NgwQqXckHceaPhFhbORJ66WhBWkG', '1776998150079-Backround (1).jpg', '2026-04-23 15:48:26'),
(6, 'little', 'litt@gmail.com', 'Admin', '$2b$10$yjyh/djIuG7bJdYPPBY5ouhYFd5jW27IzEliXManvGR2s41cUNGhm', '1777270179288-LTA_Icon.png', '2026-04-27 06:09:39'),
(7, 'test', 'test@gmail.com', 'User', '$2b$10$LDRq8M3pME2yTWolqrFUOeL05KlOSuHR8SX7AOOuFbYKvH9FZ5elm', '1777350477479-Backround (8).jpg', '2026-04-28 04:27:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
