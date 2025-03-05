-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 05 Mar 2025, 18:53:03
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `my_auth_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `created_at`) VALUES
(120, 4, 2, 'sa', '2025-03-03 18:10:51'),
(121, 2, 4, 'as', '2025-03-03 18:10:53'),
(122, 2, 2, 'naber lo', '2025-03-03 18:15:34'),
(123, 2, 2, 'iyidir aga senden nasıl gidiyooooo', '2025-03-03 18:15:42'),
(124, 2, 4, 'ssssss', '2025-03-03 18:25:33'),
(125, 2, 4, '12321321', '2025-03-03 18:25:53'),
(126, 2, 4, 'ddd', '2025-03-03 18:26:20'),
(127, 2, 5, 'niyazziii', '2025-03-03 18:27:03'),
(128, 2, 2, 'sa', '2025-03-03 18:37:36'),
(129, 4, 2, 'pppp', '2025-03-03 19:21:32'),
(130, 2, 4, 'aaaaa', '2025-03-03 19:21:34'),
(131, 2, 4, 'hellooooo', '2025-03-04 07:46:58'),
(132, 4, 2, 'online değilsinnn', '2025-03-04 07:47:08'),
(133, 2, 4, 'sdsadsad', '2025-03-04 07:47:12'),
(134, 2, 4, 'merhaba', '2025-03-04 11:20:07'),
(135, 4, 2, 'dsadusa', '2025-03-04 11:20:18'),
(136, 4, 2, 'uısandusada', '2025-03-04 11:20:59'),
(137, 2, 4, '123456780*-', '2025-03-04 11:21:03'),
(138, 2, 4, 'dsadsadas', '2025-03-04 11:21:34'),
(139, 2, 4, 'deneme', '2025-03-05 13:47:07'),
(140, 2, 4, 'dsadasda', '2025-03-05 13:47:08'),
(141, 4, 2, 'vvvv', '2025-03-05 13:47:10'),
(142, 2, 5, 'dsadsada', '2025-03-05 13:47:14'),
(143, 2, 5, 'niyazi', '2025-03-05 13:47:17'),
(144, 2, 4, 'dd', '2025-03-05 14:08:30'),
(145, 4, 2, 'dasdas', '2025-03-05 14:56:30'),
(146, 2, 4, 'dsadsa', '2025-03-05 14:56:46'),
(147, 4, 2, 'alooo', '2025-03-05 15:32:30'),
(148, 2, 4, 'sdsdsadasda', '2025-03-05 15:32:34'),
(149, 2, 5, 'oooo', '2025-03-05 15:32:37'),
(150, 2, 5, 'aynen aga', '2025-03-05 15:32:39'),
(151, 2, 2, 'dd', '2025-03-05 16:47:46');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `role` enum('admin','student','parent','teacher') NOT NULL DEFAULT 'student',
  `photo` varchar(255) DEFAULT NULL,
  `is_online` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `surname`, `role`, `photo`, `is_online`) VALUES
(2, 'ege', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Ahmet Ege', 'Sandal', 'admin', 'ege.jpg', 1),
(4, 'sena', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Sena', 'Ağaçyetiştiren', 'admin', 'sena.jpg', 1),
(5, 'emir', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Niyazi Emir', 'Akdemir', 'admin', 'emir.jpg', 0),
(15, 'ufuk', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Muhammed Ufuk', 'Aslan', 'admin', 'ufuk.jpg', 0),
(16, 'hatice', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Hatice Şerife', 'Aladağlı', 'admin', 'hatice.jpg', 0),
(17, 'furkan', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Furkan', 'Güven', 'admin', 'furkan.jpg', 0);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
