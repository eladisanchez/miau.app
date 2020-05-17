-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: db396322598.db.1and1.com
-- Temps de generació: 17-05-2020 a les 17:46:21
-- Versió del servidor: 5.5.62-log
-- Versió de PHP: 7.0.33-0+deb9u7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `db396322598`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `boles`
--

CREATE TABLE `boles` (
  `ip` varchar(255) COLLATE latin1_german2_ci NOT NULL,
  `nom` varchar(255) COLLATE latin1_german2_ci NOT NULL,
  `galetes` int(5) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;

--
-- Bolcament de dades per a la taula `boles`
--

INSERT INTO `boles` (`ip`, `nom`, `galetes`, `created_at`, `updated_at`) VALUES
('109.167.21.132', 'txell', 1, '2020-05-17 19:44:50', NULL),
('109.167.21.254', 'Lila', 3, '2020-05-16 23:46:19', NULL),
('139.47.120.124', 'NingÃº', 6, '2020-05-16 23:47:11', NULL),
('139.47.121.132', 'NingÃº', 1, '2020-05-17 15:13:52', NULL),
('139.47.19.11', 'NingÃº', 4, '2020-05-17 11:37:20', NULL),
('142.169.78.55', 'Dalida ', 15, '2020-05-17 05:05:14', NULL),
('147.161.95.95', 'Hotler', 23, '2020-05-17 18:39:31', NULL),
('147.161.95.95', 'NingÃº', 3, '2020-05-17 19:10:54', NULL),
('147.161.95.95', 'una polla', 5, '2020-05-17 01:47:11', NULL),
('148.3.138.93', 'La ClÃ udia 2', 9, '2020-05-16 22:01:57', NULL),
('148.3.138.93', 'Ta mare', 6, '2020-05-16 22:16:57', NULL),
('151.237.209.204', 'NingÃº', 2, '2020-05-17 15:14:34', NULL),
('176.83.105.172', 'Palsu', 113, '2020-05-17 15:51:41', NULL),
('176.83.109.70', 'Nel', 38, '2020-05-17 12:49:24', NULL),
('176.83.116.51', 'NingÃº', 18, '2020-05-17 15:25:07', NULL),
('176.83.126.140', 'cristiik', 5, '2020-05-16 22:31:50', NULL),
('176.83.176.83', 'Albert', 24, '2020-05-17 00:30:38', NULL),
('176.83.224.120', 'miki', 10, '2020-05-16 23:37:16', NULL),
('176.83.226.74', 'NingÃº', 6, '2020-05-16 23:39:07', NULL),
('176.83.229.193', 'Xavier Novell', 108, '2020-05-17 17:15:02', NULL),
('176.83.231.243', 'doncs jo', 38, '2020-05-17 00:47:09', NULL),
('176.83.231.248', 'NingÃº', 26, '2020-05-17 15:03:14', NULL),
('176.83.26.212', 'Albert', 34, '2020-05-17 14:07:36', NULL),
('176.83.31.251', 'doncs jo', 113, '2020-05-17 10:25:20', NULL),
('176.83.61.213', 'rafael 1', 5, '2020-05-16 22:05:47', NULL),
('176.83.69.174', 'dr Blanch', 44, '2020-05-17 00:57:20', NULL),
('176.83.70.38', 'Reina del universo', 4, '2020-05-17 09:29:08', NULL),
('176.83.87.233', 'NingÃº', 1, '2020-05-17 11:34:01', NULL),
('176.83.89.180', 'el jordi', 5, '2020-05-17 00:35:55', NULL),
('176.85.88.215', 'domillo', 6, '2020-05-17 10:03:06', NULL),
('176.85.88.215', 'Flixmus', 21, '2020-05-17 09:02:57', NULL),
('176.85.88.215', 'NingÃº', 4, '2020-05-17 09:47:07', NULL),
('176.85.94.159', 'domillo', 74, '2020-05-17 12:59:54', '2020-05-17 17:44:35'),
('176.85.94.159', 'Flixmus', 75, '2020-05-17 13:16:44', '2020-05-17 17:16:21'),
('176.85.95.147', 'NingÃº', 2, '2020-05-17 11:24:48', NULL),
('185.112.1.204', 'El Papu', 1, '2020-05-17 10:07:01', NULL),
('185.208.64.251', 'xl', 8, '2020-05-17 18:18:49', NULL),
('185.26.137.111', 'Ardevol', 100, '2020-05-17 11:55:43', NULL),
('185.26.137.222', 'NingÃº', 46, '2020-05-17 15:31:53', '2020-05-17 17:44:37'),
('2.141.72.133', 'Xavier Novell', 62, '2020-05-17 00:04:13', NULL),
('2.152.150.18', 'jo', 41, '2020-05-17 01:24:45', NULL),
('213.143.48.253', 'merdes', 8, '2020-05-17 10:31:03', NULL),
('213.170.225.232', 'kimi', 26, '2020-05-17 01:01:47', NULL),
('213.170.225.251', 'Joan', 0, '2020-05-17 16:38:19', NULL),
('213.195.123.200', 'Jaume', 105, '2020-05-16 22:06:04', NULL),
('213.195.123.200', 'test', 4, '2020-05-17 16:29:04', NULL),
('213.4.176.115', 'Mar, una bona person', 34, '2020-05-17 12:24:55', NULL),
('213.4.177.130', 'NingÃº', 3, '2020-05-17 11:28:21', NULL),
('213.4.177.130', 'RendÃ©', 14, '2020-05-17 11:36:06', NULL),
('213.4.177.53', 'Cabra', 3, '2020-05-17 14:30:00', NULL),
('213.4.179.240', 'Kinder Malo', 33, '2020-05-16 23:34:03', NULL),
('213.4.181.111', 'the best', 2, '2020-05-17 01:16:50', NULL),
('213.4.183.233', 'Lluti', 132, '2020-05-17 05:51:09', '2020-05-17 17:35:36'),
('213.4.186.79', 'Kinder Malo', 46, '2020-05-17 10:08:01', NULL),
('213.4.188.39', 'Peppa pig', 2, '2020-05-16 23:18:00', NULL),
('217.61.70.19', 'Joan Castella per servir-lo', 49, '2020-05-16 23:36:52', NULL),
('217.61.70.19', 'Marta', 51, '2020-05-16 23:43:34', NULL),
('217.61.70.30', 'BessÃ³ bo', 27, '2020-05-16 22:42:14', NULL),
('217.61.70.30', 'Besso dolent', 103, '2020-05-16 22:31:18', NULL),
('24.114.101.135', 'Ian la banane', 19, '2020-05-17 05:02:06', NULL),
('31.10.157.3', 'Mr. Hitler', 2, '2020-05-17 10:19:20', NULL),
('31.10.157.3', 'xavi', 2, '2020-05-17 16:14:13', NULL),
('31.14.251.101', 'el putu amo', 8, '2020-05-16 23:56:15', NULL),
('31.221.243.172', 'nyeis', 6, '2020-05-17 17:08:20', NULL),
('31.4.159.39', 'NingÃº', 82, '2020-05-17 07:59:20', NULL),
('31.4.184.140', 'Deivid', 3, '2020-05-17 15:03:33', NULL),
('31.4.184.59', 'alba', 9, '2020-05-17 06:38:57', NULL),
('31.4.184.59', 'NingÃº', 2, '2020-05-17 05:08:38', NULL),
('31.4.184.95', 'NingÃº', 12, '2020-05-17 00:02:00', NULL),
('31.4.191.14', 'NingÃº', 40, '2020-05-17 18:24:55', NULL),
('31.4.204.45', 'NingÃº', 4, '2020-05-17 13:04:29', NULL),
('37.10.248.126', 'En Pixarada', 0, '2020-05-17 00:08:40', NULL),
('37.135.235.226', 'NingÃº', 3, '2020-05-17 11:08:31', NULL),
('37.135.235.226', 'segues', 11, '2020-05-17 16:43:02', NULL),
('45.14.197.205', 'NingÃº', 6, '2020-05-17 09:48:41', NULL),
('45.14.197.32', 'ðŸ¤¨', 2, '2020-05-17 00:27:57', NULL),
('45.14.197.32', 'ðŸ¤·ðŸ»â€â™‚ï¸', 3, '2020-05-17 00:19:29', NULL),
('45.14.199.149', 'NingÃº', 1, '2020-05-17 00:10:01', NULL),
('45.14.199.253', 'NingÃº', 2, '2020-05-17 01:05:47', NULL),
('46.222.162.113', 'jo', 10, '2020-05-17 01:58:29', NULL),
('46.222.176.90', '.', 1, '2020-05-17 01:54:57', NULL),
('46.222.39.83', 'aaaah', 2, '2020-05-17 09:33:23', NULL),
('46.24.66.128', 'NingÃº', 2, '2020-05-17 01:04:47', NULL),
('46.25.112.243', 'Ausi', 57, '2020-05-16 23:33:22', NULL),
('46.25.112.243', 'Kinder Malo', 73, '2020-05-17 17:28:00', NULL),
('46.25.137.51', 'R', 1, '2020-05-17 00:02:43', NULL),
('46.6.244.73', 'Culi', 3, '2020-05-17 15:32:00', NULL),
('62.99.11.129', 'NingÃº', 3, '2020-05-17 15:26:28', NULL),
('62.99.99.220', 'Enric', 18, '2020-05-16 23:25:25', NULL),
('77.210.250.190', 'DamiÃ ', 2, '2020-05-16 22:48:00', NULL),
('77.75.179.3', 'mia', 23, '2020-05-17 18:50:48', NULL),
('79.145.165.7', 'Ultrasonica', 21, '2020-05-16 23:33:13', NULL),
('79.145.24.98', 'El sala', 7, '2020-05-17 14:59:12', NULL),
('79.149.220.53', 'Ebd', 15, '2020-05-17 18:29:34', NULL),
('79.149.55.29', 'iatuquÃ¨', 10, '2020-05-17 08:57:25', NULL),
('79.156.17.45', 'Nel', 77, '2020-05-16 22:12:01', '2020-05-17 17:42:39'),
('79.156.54.103', '.', 7, '2020-05-17 02:00:21', NULL),
('79.157.2.51', 'ðŸ¦ ', 1, '2020-05-17 15:00:49', NULL),
('79.157.3.130', 'David Jaray', 2, '2020-05-17 14:33:04', NULL),
('79.157.3.70', 'NingÃº', 2, '2020-05-16 23:56:06', NULL),
('79.158.189.28', 'mia', 14, '2020-05-17 17:18:57', NULL),
('80.102.154.30', 'Jo', 2, '2020-05-17 01:39:28', NULL),
('80.102.6.87', 'NingÃº', 6, '2020-05-17 16:35:10', NULL),
('81.184.179.137', 'El Gos Petit!', 28, '2020-05-16 23:32:54', NULL),
('81.184.179.137', 'La filla del Badia', 11, '2020-05-16 23:30:29', NULL),
('81.34.94.46', 'NingÃº', 8, '2020-05-17 05:46:07', NULL),
('81.39.157.123', 'NingÃº', 12, '2020-05-17 10:06:32', NULL),
('81.40.62.184', 'La filla de ma Mare', 85, '2020-05-17 11:32:17', NULL),
('81.40.62.184', 'NingÃº', 202, '2020-05-17 01:46:48', '2020-05-17 17:44:16'),
('82.132.237.81', 'TomSp', 53, '2020-05-17 18:12:20', NULL),
('83.247.136.245', 'kk', 18, '2020-05-17 10:33:49', NULL),
('83.41.25.169', 'Jusn', 6, '2020-05-17 18:36:10', NULL),
('83.42.111.253', 'Mar, una bona person', 48, '2020-05-17 11:06:33', NULL),
('83.42.178.207', 'magdelmirall.es', 157, '2020-05-16 23:40:28', NULL),
('83.50.31.70', 'Ainhoa', 63, '2020-05-17 19:04:35', '2020-05-17 17:33:18'),
('83.54.211.43', 'NingÃº', 6, '2020-05-17 01:46:40', NULL),
('83.56.170.115', 'Culi', 25, '2020-05-17 15:36:05', NULL),
('83.56.170.115', 'NingÃº', 2, '2020-05-17 02:25:25', NULL),
('83.56.170.115', 'Nostra senyora del C', 36, '2020-05-17 18:55:11', '2020-05-17 17:39:22'),
('83.56.170.115', 'SÃ³c la Tate', 3, '2020-05-17 02:14:02', NULL),
('83.56.170.138', 'Marieta', 501, '2020-05-17 11:52:21', '2020-05-17 17:34:10'),
('83.59.172.110', 'Jo', 6, '2020-05-17 08:17:43', NULL),
('83.59.172.118', 'Hetornat', 11, '2020-05-16 22:30:32', NULL),
('83.59.172.118', 'NingÃº', 10, '2020-05-16 22:35:22', NULL),
('83.59.173.163', 'NingÃº', 26, '2020-05-16 23:53:20', NULL),
('83.59.173.163', 'Zebra', 149, '2020-05-17 14:06:40', '2020-05-17 17:46:18'),
('83.59.173.196', 'Eladi', 70, '2020-05-16 21:56:47', '2020-05-17 17:12:25'),
('83.59.173.196', 'kepaza', 0, '2020-05-17 19:10:53', NULL),
('83.59.173.196', 'NingÃº', 2, '2020-05-16 22:43:16', NULL),
('83.59.173.196', 'Ta mare', 60, '2020-05-17 00:55:36', NULL),
('83.59.173.198', 'hola', 2, '2020-05-16 23:19:09', NULL),
('83.59.174.149', 'Joo', 35, '2020-05-17 09:50:55', NULL),
('83.59.174.149', 'Una sombraðŸ¤˜ðŸ½', 78, '2020-05-16 23:32:43', NULL),
('83.59.174.173', 'El Pol del Musical, ', 74, '2020-05-17 10:53:11', '2020-05-17 17:35:29'),
('83.59.175.194', 'null', 18, '2020-05-17 11:07:11', NULL),
('83.59.175.21', 'NingÃº', 6, '2020-05-16 23:54:31', NULL),
('83.59.175.33', 'Jo', 2, '2020-05-17 00:41:30', NULL),
('83.59.175.5', 'NingÃº', 2, '2020-05-16 22:28:30', NULL),
('84.236.220.164', 'Jo', 15, '2020-05-16 22:18:11', NULL),
('84.236.220.180', 'NingÃº', 47, '2020-05-17 11:40:42', NULL),
('84.236.221.66', 'NingÃº', 0, '2020-05-16 23:22:22', NULL),
('84.76.29.173', 'Carla', 14, '2020-05-17 10:24:08', NULL),
('84.77.158.153', 'NingÃº', 1, '2020-05-16 23:22:57', NULL),
('84.78.248.2', 'Ardevol', 50, '2020-05-17 01:13:34', NULL),
('84.78.249.204', 'un bolet', 4, '2020-05-16 23:09:08', NULL),
('84.78.249.30', 'NingÃº', 2, '2020-05-17 12:44:09', NULL),
('85.255.237.145', 'Recasens ', 2, '2020-05-17 10:14:01', NULL),
('85.53.95.166', 'NingÃº', 5, '2020-05-17 11:10:34', NULL),
('85.55.160.25', 'Benejam', 17, '2020-05-17 00:32:02', NULL),
('85.55.160.25', 'Montra', 4, '2020-05-17 18:17:35', NULL),
('85.55.160.25', 'null', 67, '2020-05-17 17:24:22', NULL),
('85.58.237.177', 'penis', 0, '2020-05-17 00:22:17', NULL),
('85.61.104.18', 'txell', 12, '2020-05-17 18:55:05', NULL),
('88.0.117.24', 'juani', 3, '2020-05-17 18:49:21', NULL),
('88.0.117.24', 'NingÃº', 1, '2020-05-17 19:33:01', NULL),
('88.0.234.104', 'NingÃº', 20, '2020-05-17 14:37:24', NULL),
('88.11.215.159', 'Josep Maria', 81, '2020-05-17 10:02:31', '2020-05-17 17:41:40'),
('88.148.91.211', 'NingÃº', 5, '2020-05-16 23:56:53', NULL),
('88.148.91.5', 'NingÃº', 9, '2020-05-17 16:51:07', NULL),
('88.18.206.90', 'NingÃº', 1, '2020-05-17 10:38:34', NULL),
('88.22.244.167', 'Juls', 2, '2020-05-16 22:28:58', NULL),
('88.23.232.249', 'javi', 30, '2020-05-17 14:48:54', NULL),
('88.23.232.249', 'NingÃº', 90, '2020-05-17 10:18:50', NULL),
('88.5.3.207', 'Reina del universo', 2, '2020-05-17 09:21:59', NULL),
('88.5.72.169', 'jaumet', 0, '2020-05-17 16:17:52', NULL),
('88.7.10.16', 'NingÃº', 7, '2020-05-17 09:47:23', NULL),
('88.7.10.60', 'Lluti', 112, '2020-05-17 00:21:53', NULL),
('88.7.13.82', 'NingÃº', 1, '2020-05-17 00:07:28', NULL),
('88.7.14.138', 'NingÃº', 6, '2020-05-17 17:35:16', NULL),
('88.7.14.138', 'Nur', 16, '2020-05-16 23:20:49', NULL),
('88.7.14.218', 'Abel', 3, '2020-05-16 22:44:33', NULL),
('88.7.15.212', 'the best', 4, '2020-05-17 01:15:20', NULL),
('88.7.15.212', 'Un ser superior a la', 8, '2020-05-17 16:43:38', NULL),
('88.7.15.69', 'David Pastilles', 151, '2020-05-17 00:19:31', '2020-05-17 17:14:20'),
('88.7.15.69', 'NingÃº', 22, '2020-05-16 23:35:21', NULL),
('88.7.8.214', 'MaC', 1, '2020-05-17 00:54:25', NULL),
('88.7.9.205', 'toni murenu', 36, '2020-05-16 23:07:55', NULL),
('88.7.9.53', 'rafel', 15, '2020-05-16 22:58:19', NULL),
('89.236.29.39', 'NingÃº', 2, '2020-05-16 23:23:53', NULL),
('90.205.78.122', 'la xÃ¨nia', 79, '2020-05-16 23:31:32', NULL),
('90.205.78.122', 'TomSp', 83, '2020-05-16 23:30:20', NULL),
('92.176.142.85', 'ta mare', 75, '2020-05-17 17:57:04', '2020-05-17 17:36:59'),
('93.176.145.151', 'NingÃº', 156, '2020-05-16 23:28:27', NULL),
('93.176.149.222', 'merdes', 6, '2020-05-17 00:25:21', NULL),
('93.176.151.56', 'ClÃ udia', 18, '2020-05-16 22:14:16', NULL),
('94.76.188.172', 'La Puta Mustela Rabiosa', 39, '2020-05-17 00:42:52', NULL),
('94.76.188.202', 'Maria', 7, '2020-05-16 23:59:41', NULL),
('95.127.157.221', 'NingÃº', 1, '2020-05-17 14:55:36', NULL),
('95.127.170.44', 'nse', 24, '2020-05-17 10:56:22', NULL),
('95.127.176.16', 'nse', 14, '2020-05-17 00:56:19', NULL),
('95.169.224.57', 'Maki', 14, '2020-05-17 00:54:14', NULL),
('95.169.226.169', 'Marina', 41, '2020-05-16 22:11:34', '2020-05-17 17:39:04'),
('95.169.227.37', '.com', 36, '2020-05-17 19:16:01', '2020-05-17 17:27:40'),
('95.169.227.37', 'Enric', 66, '2020-05-17 00:06:07', NULL),
('95.169.235.23', 'Paula', 155, '2020-05-16 23:10:25', '2020-05-17 17:31:56');

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `boles`
--
ALTER TABLE `boles`
  ADD UNIQUE KEY `ipnom` (`ip`,`nom`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;