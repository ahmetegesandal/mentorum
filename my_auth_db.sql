-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 08 Mar 2025, 22:52:59
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

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
-- Tablo için tablo yapısı `calendar`
--

CREATE TABLE `calendar` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `is_available` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `calendar`
--

INSERT INTO `calendar` (`id`, `teacher_id`, `date`, `time`, `is_available`) VALUES
(20, 34, '2025-03-10', '09:00:00', 1),
(21, 34, '2025-03-10', '10:00:00', 1),
(22, 34, '2025-03-10', '11:00:00', 1),
(23, 34, '2025-03-11', '14:00:00', 1),
(24, 34, '2025-03-11', '15:00:00', 1),
(25, 34, '2025-03-12', '09:00:00', 1),
(26, 34, '2025-03-12', '10:00:00', 1),
(27, 34, '2025-03-12', '11:00:00', 1),
(28, 34, '2025-03-13', '13:00:00', 1),
(29, 34, '2025-03-13', '14:00:00', 1),
(30, 34, '2025-03-14', '08:00:00', 1),
(31, 34, '2025-03-14', '09:00:00', 1),
(32, 34, '2025-03-14', '10:00:00', 1),
(33, 34, '2025-03-15', '11:00:00', 1),
(34, 34, '2025-03-15', '12:00:00', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(5, 'Biyoloji'),
(8, 'Çoğrafya'),
(7, 'Edebiyat'),
(9, 'Felsefe'),
(3, 'Fizik'),
(4, 'Kimya'),
(1, 'Matematik'),
(6, 'Tarih'),
(2, 'Yabancı Dil');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `language` varchar(50) NOT NULL,
  `lesson_photo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `lessons`
--

INSERT INTO `lessons` (`id`, `teacher_id`, `title`, `description`, `category_id`, `price`, `language`, `lesson_photo`) VALUES
(38, 34, 'Logaritmayı Anlamak: Temelden İleri Seviyeye', '📝 Açıklama:\r\nBu ders, logaritma konusunu sıfırdan başlayarak ileri seviyeye kadar detaylı bir şekilde anlatır. Logaritmanın temel kavramlarını, üstel fonksiyonlarla olan ilişkisini ve günlük hayattaki kullanım alanlarını ele alacağız. Ders süresince şu konular işlenecektir:\r\n✔️ Üstel ve logaritmik fonksiyonların temelleri\r\n✔️ Logaritma kuralları ve dönüşümleri\r\n✔️ Logaritmik denklemler ve çözümleri\r\n✔️ Mühendislik, ekonomi ve doğa bilimlerinde logaritmanın rolü\r\n✔️ Pratik soru çözümleri ve uygul', 1, 150.00, 'Türkçe', '/uploads/lessons/1741380602178-logaritma_egitim_ilani.png');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `live_classes`
--

CREATE TABLE `live_classes` (
  `id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `meeting_link` varchar(255) DEFAULT NULL,
  `status` enum('scheduled','ongoing','completed','canceled') DEFAULT 'scheduled',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(122, 2, 2, 'naber lo', '2025-03-03 18:15:34'),
(123, 2, 2, 'iyidir aga senden nasıl gidiyooooo', '2025-03-03 18:15:42'),
(128, 2, 2, 'sa', '2025-03-03 18:37:36'),
(151, 2, 2, 'dd', '2025-03-05 16:47:46'),
(156, 2, 2, 'iyidir kanki senden', '2025-03-05 22:25:21'),
(167, 2, 2, 'agaa', '2025-03-06 12:44:18'),
(168, 36, 2, 'naber', '2025-03-06 16:40:14'),
(169, 2, 36, 'iyi senden naber', '2025-03-06 16:40:19'),
(170, 2, 2, 'dd', '2025-03-08 15:35:56'),
(171, 2, 2, 'aloo', '2025-03-08 15:40:30'),
(172, 2, 33, 'naber', '2025-03-08 15:41:20'),
(173, 33, 2, 'iyidir senden', '2025-03-08 15:41:23'),
(174, 34, 2, 'selam', '2025-03-08 18:06:25'),
(175, 2, 34, 'naber', '2025-03-08 18:06:42'),
(176, 34, 2, 'iyidir senden', '2025-03-08 18:06:48'),
(177, 2, 34, 'iyi valle bende de', '2025-03-08 18:06:58'),
(178, 2, 34, 'sıkıntı var mı', '2025-03-08 18:07:08'),
(179, 2, 34, 'yokya', '2025-03-08 18:07:21'),
(180, 2, 34, 'aloo', '2025-03-08 18:07:34'),
(181, 34, 2, 'naber', '2025-03-08 18:09:03'),
(182, 2, 34, 'iyidir senden', '2025-03-08 18:09:16'),
(183, 34, 2, 'aloo', '2025-03-08 18:09:52'),
(184, 34, 2, 'naptıns', '2025-03-08 18:10:03'),
(185, 34, 15, 'ufuk', '2025-03-08 18:10:20'),
(186, 34, 15, 'selams', '2025-03-08 18:10:22'),
(187, 2, 34, 'helo', '2025-03-08 18:10:58'),
(188, 34, 2, 'helo', '2025-03-08 18:11:01'),
(189, 34, 2, 'naptın', '2025-03-08 18:11:03'),
(190, 34, 2, 'takılıyom', '2025-03-08 18:11:06'),
(191, 34, 2, 'aynenn', '2025-03-08 18:11:08'),
(192, 34, 2, 's', '2025-03-08 18:11:16'),
(193, 34, 2, 's', '2025-03-08 18:11:17'),
(194, 34, 2, 's', '2025-03-08 18:11:17'),
(195, 34, 2, 's', '2025-03-08 18:11:17'),
(196, 34, 2, 's', '2025-03-08 18:11:18'),
(197, 34, 2, 's', '2025-03-08 18:11:18'),
(198, 34, 2, 's', '2025-03-08 18:11:18'),
(199, 34, 2, 's', '2025-03-08 18:11:18'),
(200, 34, 2, 's', '2025-03-08 18:11:19'),
(201, 34, 2, 's', '2025-03-08 18:11:19'),
(202, 34, 2, 's', '2025-03-08 18:11:19'),
(203, 34, 2, 's', '2025-03-08 18:11:19'),
(204, 34, 2, 's', '2025-03-08 18:11:19'),
(205, 34, 2, 's', '2025-03-08 18:11:19'),
(206, 34, 2, 's', '2025-03-08 18:11:20'),
(207, 34, 2, 's', '2025-03-08 18:11:21'),
(208, 34, 2, 's', '2025-03-08 18:11:21'),
(209, 34, 2, 's', '2025-03-08 18:11:22'),
(210, 34, 2, 's', '2025-03-08 18:11:24'),
(211, 34, 2, 's', '2025-03-08 18:11:24'),
(212, 34, 2, 's', '2025-03-08 18:11:25'),
(213, 34, 2, 's', '2025-03-08 18:11:26'),
(214, 34, 2, 's', '2025-03-08 18:11:27'),
(215, 34, 2, 's', '2025-03-08 18:11:28'),
(216, 34, 2, 'sus', '2025-03-08 18:11:32'),
(217, 34, 2, 'la', '2025-03-08 18:11:33'),
(218, 34, 2, 'atma', '2025-03-08 18:11:35'),
(219, 34, 2, 'artık', '2025-03-08 18:11:36'),
(220, 34, 2, 'aq', '2025-03-08 18:11:37'),
(221, 34, 2, 'şükür', '2025-03-08 18:11:39'),
(222, 34, 2, 'senle mi uğraşcam', '2025-03-08 18:11:42'),
(223, 34, 2, 'göt', '2025-03-08 18:11:42'),
(224, 2, 34, 'delerim lan', '2025-03-08 18:11:46'),
(225, 2, 34, 'seni', '2025-03-08 18:11:47'),
(226, 2, 34, 'lale', '2025-03-08 18:11:49'),
(227, 34, 2, 'bebe', '2025-03-08 18:12:04');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `parents`
--

CREATE TABLE `parents` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `parents`
--

INSERT INTO `parents` (`id`, `parent_id`) VALUES
(8, 33);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `lesson_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `reviews`
--

INSERT INTO `reviews` (`id`, `student_id`, `rating`, `comment`, `created_at`, `lesson_id`) VALUES
(2, 36, 5, 'bence harika bir kurs arkadaşlar', '2025-03-08 00:37:06', 38),
(3, 33, 5, 'bence hocamız çok bilgili bu konularda belli oluyor', '2025-03-08 02:16:14', 38),
(4, 36, 5, 'ddd', '2025-03-08 02:17:17', 38);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `grade` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `students`
--

INSERT INTO `students` (`id`, `user_id`, `grade`) VALUES
(7, 32, ''),
(9, 36, 'ortaokul');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `student_parents`
--

CREATE TABLE `student_parents` (
  `student_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `student_parents`
--

INSERT INTO `student_parents` (`student_id`, `parent_id`) VALUES
(7, 8);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `expertise` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `teachers`
--

INSERT INTO `teachers` (`id`, `user_id`, `bio`, `expertise`) VALUES
(4, 34, 'Sibel Birtane Akar, başarılı bir girişimci ve liderdir. Kendisinin iş dünyasında kazandığı tecrübe, özellikle teknoloji ve dijital pazarlama alanlarında derindir. Yenilikçi projelere imza atarak sektördeki birçok kişiye ilham vermektedir. Yaratıcı ve vizyoner yaklaşımıyla tanınır.\n\n\n\n\n\n\nSibel Birtane Akar, başarılı bir girişimci ve liderdir. Kendisinin iş dünyasında kazandığı tecrübe, özellikle teknoloji ve dijital pazarlama alanlarında derindir. Yenilikçi projelere imza atarak sektördeki birçok', 'pc');

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
  `is_online` tinyint(1) DEFAULT 0,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `credit` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `surname`, `role`, `photo`, `is_online`, `email`, `created_at`, `credit`) VALUES
(2, 'ege', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Ahmet Ege', 'Sandal', 'admin', 'ege.jpg', 0, 'ege@gmail.com', '2025-03-08 21:40:16', 0),
(15, 'ufuk', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Muhammed Ufuk', 'Aslan', 'admin', 'ufuk.jpg', 0, 'ufuk@gmail.com', '2025-03-06 15:17:50', 0),
(16, 'hatice', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Hatice Şerife', 'Aladağlı', 'admin', 'hatice.jpg', 0, 'hatice@gmail.com', '2025-03-06 15:19:53', 0),
(17, 'furkan', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Furkan', 'Güven', 'admin', 'furkan.jpg', 0, 'furkan@gmail.om', '2025-03-06 15:19:59', 0),
(32, 'doruk', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Doruk', 'Gür', 'student', '1741274369116.png', 0, 'doruk@gmail.com', '2025-03-08 21:34:42', 10),
(33, 'senem', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Senem', 'Gür', 'parent', '4.png', 1, 'senem@gmail.com', '2025-03-08 21:51:13', 80),
(34, 'sibel', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Sibel Birtane', 'Akar', 'teacher', '6.png', 0, 'sibel@gmail.com', '2025-03-08 21:52:32', 0),
(36, 'yavuz', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Yavuz', 'Gür', 'student', '10.png', 0, 'yavuz@gmail.com', '2025-03-08 21:33:58', 80);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Tablo için indeksler `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Tablo için indeksler `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Tablo için indeksler `live_classes`
--
ALTER TABLE `live_classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservation_id` (`reservation_id`),
  ADD KEY `lesson_id` (`lesson_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Tablo için indeksler `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Tablo için indeksler `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Tablo için indeksler `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Tablo için indeksler `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `lesson_id` (`lesson_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Tablo için indeksler `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Tablo için indeksler `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Tablo için indeksler `student_parents`
--
ALTER TABLE `student_parents`
  ADD PRIMARY KEY (`student_id`,`parent_id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Tablo için indeksler `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

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
-- Tablo için AUTO_INCREMENT değeri `calendar`
--
ALTER TABLE `calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Tablo için AUTO_INCREMENT değeri `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Tablo için AUTO_INCREMENT değeri `live_classes`
--
ALTER TABLE `live_classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- Tablo için AUTO_INCREMENT değeri `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `parents`
--
ALTER TABLE `parents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Tablo için AUTO_INCREMENT değeri `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tablo için AUTO_INCREMENT değeri `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `calendar`
--
ALTER TABLE `calendar`
  ADD CONSTRAINT `calendar_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Tablo kısıtlamaları `live_classes`
--
ALTER TABLE `live_classes`
  ADD CONSTRAINT `live_classes_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `live_classes_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `live_classes_ibfk_3` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `live_classes_ibfk_4` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Tablo kısıtlamaları `parents`
--
ALTER TABLE `parents`
  ADD CONSTRAINT `parents_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`);

--
-- Tablo kısıtlamaları `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Tablo kısıtlamaları `student_parents`
--
ALTER TABLE `student_parents`
  ADD CONSTRAINT `student_parents_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `parents` (`id`);

--
-- Tablo kısıtlamaları `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
