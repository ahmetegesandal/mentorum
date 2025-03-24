-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 24 Mar 2025, 17:34:10
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
(53, 34, '2025-03-20', '20:00:00', 1),
(54, 34, '2025-03-28', '18:15:00', 1),
(57, 34, '2025-03-21', '16:00:00', 1),
(58, 34, '2025-03-22', '19:50:00', 1);

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
  `language` enum('Turkish','English','French','German','Spanish') NOT NULL DEFAULT 'Turkish',
  `lesson_photo` varchar(255) NOT NULL,
  `grade` enum('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `lessons`
--

INSERT INTO `lessons` (`id`, `teacher_id`, `title`, `description`, `category_id`, `price`, `language`, `lesson_photo`, `grade`) VALUES
(38, 34, 'Logaritmayı Anlamak: Temelden İleri Seviyeye', '<p>📝 Açıklama: Bu ders, logaritma konusunu sıfırdan başlayarak ileri seviyeye kadar detaylı bir şekilde anlatır. Logaritmanın temel kavramlarını, üstel fonksiyonlarla olan ilişkisini ve günlük hayattaki kullanım alanlarını ele alacağız.</p><p>Ders süresince şu konular işlenecektir:</p><p>✔️ Üstel ve logaritmik fonksiyonların temelleri</p><p>✔️ Logaritma kuralları ve dönüşümleri</p><p>✔️ Logaritmik denklemler ve çözümleri</p><p>✔️ Mühendislik, ekonomi ve doğa bilimlerinde logaritmanın rolü </p>', 1, 150.00, 'Turkish', '/uploads/lessons/1741380602178-logaritma_egitim_ilani.png', 'advanced'),
(41, 34, 'Geometriyi Anlamak', '<p>📝 Açıklama<strong>:</strong> Bu ders, temel geometri kavramlarını sıfırdan başlayarak ileri seviyeye kadar derinlemesine inceler. Geometrinin temel öğelerini, şekillerin özelliklerini ve geometriyi günlük hayatta nasıl kullanabileceğimizi keşfedeceğiz.</p><p>Ders süresince şu konular işlenecektir:</p><p>✔️ Noktalar, doğrular ve düzlemler</p><p>✔️ Üçgenler, dörtgenler ve çokgenler</p><p>✔️ Geometrik şekillerin alan ve hacim hesaplamaları</p><p>✔️ Geometri ve trigonometri arasındaki bağlantılar', 1, 400.00, 'Turkish', '/uploads/lessons/1742683599965-4284faf7-4c33-4ab7-b0c0-11c6959c27a5.webp', 'beginner'),
(45, 45, 'Biyolojiyi Anlamak', '<p>📝 Açıklama: Bu ders, biyolojinin temel ilkelerini sıfırdan başlayarak ileri seviyeye kadar keşfetmenize yardımcı olacak. Canlıların yapılarını, işlevlerini ve ekosistemlerdeki rollerini derinlemesine inceleyecek, biyolojinin hayatımızdaki önemini keşfedeceğiz.</p><p>Ders süresince şu konular işlenecektir:</p><p>✔️ Hücre yapısı ve işlevleri<br>✔️ Genetik ve kalıtım<br>✔️ Ekosistemler ve biyolojik çeşitlilik<br>✔️ İnsan vücudu ve organ sistemleri<br>✔️ Evrim teorisi ve doğal seleksiyon</p>', 5, 500.00, 'Turkish', '/uploads/lessons/1742683872932-ce96e55e-5416-4d9b-90db-c9e9f0c2b4da.webp', 'beginner');

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
  `date` date NOT NULL,
  `time` time NOT NULL,
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
-- Tablo için tablo yapısı `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`id`, `user_id`, `token`, `expires_at`, `created_at`) VALUES
(1, 2, 'e467949b-f52a-44cd-b0a2-51f0ace3d4fb', '2025-03-24 19:38:30', '2025-03-24 19:08:30');

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

--
-- Tablo döküm verisi `reservations`
--

INSERT INTO `reservations` (`id`, `student_id`, `lesson_id`, `teacher_id`, `date`, `time`, `status`, `created_at`) VALUES
(101, 36, 41, 34, '2025-03-20', '20:00:00', 'cancelled', '2025-03-24 14:55:35');

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
(3, 33, 4, 'bence hocamız çok bilgili bu konularda belli oluyor', '2025-03-08 02:16:14', 38),
(4, 36, 4, 'akıcı', '2025-03-08 02:17:17', 38),
(5, 33, 5, 'süperdi', '2025-03-18 17:03:06', 38),
(6, 36, 1, 'bence kötü', '2025-03-20 17:24:03', 41),
(7, 36, 3, 'meh daha iyi olabilir', '2025-03-20 17:24:25', 41),
(8, 36, 2, 'hocanın anlatışını beğenmedim', '2025-03-22 18:48:21', 41);

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
(7, 32, 'Ortaokul'),
(9, 36, 'Ortaokul');

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
(4, 34, 'Sibel Birtane Akar, başarılı bir girişimci ve liderdir. Kendisinin iş dünyasında kazandığı tecrübe, özellikle teknoloji ve dijital pazarlama alanlarında derindir. Yenilikçi projelere imza atarak sektördeki birçok kişiye ilham vermektedir. Yaratıcı ve vizyoner yaklaşımıyla tanınır.\n\n\n\n\n\n\nSibel Birtane Akar, başarılı bir girişimci ve liderdir. Kendisinin iş dünyasında kazandığı tecrübe, özellikle teknoloji ve dijital pazarlama alanlarında derindir. Yenilikçi projelere imza atarak sektördeki birçok', 'pc'),
(6, 45, NULL, 'yapay zeka');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('open','closed','resolved') DEFAULT 'open',
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `tickets`
--

INSERT INTO `tickets` (`id`, `user_id`, `subject`, `description`, `status`, `priority`, `created_at`, `updated_at`) VALUES
(2, 34, 'Rezervasyon prob.', 'problem açıklaması burada yer alacak', 'open', 'medium', '2025-03-24 14:09:17', '2025-03-24 14:09:17'),
(3, 36, 'merhaba ', 'aqqqqqqq', 'open', 'medium', '2025-03-24 15:01:00', '2025-03-24 15:01:00'),
(4, 36, 'dsadasda', 'dsadsad', 'open', 'medium', '2025-03-24 15:01:23', '2025-03-24 15:01:23'),
(5, 2, 'merhaba ', 'ODISANDAUDSAODISANDAUDSAODISANDAUDSAODISANDAUDSAODISANDAUDSAODISANDAUDSAODISANDAUDSA\n', 'open', 'medium', '2025-03-24 15:36:28', '2025-03-24 15:36:28'),
(6, 34, 'sdadasda', '3131', 'open', 'medium', '2025-03-24 16:32:00', '2025-03-24 16:32:00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ticket_comments`
--

CREATE TABLE `ticket_comments` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `ticket_comments`
--

INSERT INTO `ticket_comments` (`id`, `ticket_id`, `user_id`, `comment`, `created_at`) VALUES
(2, 3, 36, 'hellüüüüüüüü', '2025-03-24 15:01:08'),
(3, 4, 36, 'merhaba', '2025-03-24 15:01:46'),
(4, 5, 2, '<p><strong>MERHABA </strong></p><p><strong><em><s>Dünya</s></em></strong><em><s> </s></em></p>', '2025-03-24 15:37:05'),
(5, 5, 2, '<p>daspldsamıdoas</p>', '2025-03-24 16:31:35'),
(6, 6, 34, '<p>yorum</p>', '2025-03-24 16:32:06'),
(7, 6, 2, '<p>merhaba</p>', '2025-03-24 16:32:32');

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
(2, 'ege', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Ahmet Ege', 'Sandal', 'admin', 'ege.jpg', 1, 'ege@gmail.com', '2025-03-24 16:33:51', 1200),
(15, 'ufuk', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Muhammed Ufuk', 'Aslan', 'admin', 'ufuk.jpg', 0, 'ufuk@gmail.com', '2025-03-22 22:41:52', 2000),
(16, 'hatice', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Hatice Şerife', 'Aladağlı', 'admin', 'hatice.jpg', 0, 'hatice@gmail.com', '2025-03-22 22:41:48', 2000),
(17, 'furkan', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Furkan', 'Güven', 'admin', 'furkan.jpg', 0, 'furkan@gmail.om', '2025-03-22 22:41:45', 2000),
(32, 'doruk', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Doruk', 'Gür', 'student', '1742593154953.jpg', 0, 'doruk@gmail.com', '2025-03-22 15:52:23', 0),
(33, 'senem', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Senem', 'Gür', 'parent', '4.png', 0, 'senem@gmail.com', '2025-03-24 13:02:31', 4400),
(34, 'sibel', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Sibel Birtane', 'Akar', 'teacher', '6.png', 0, 'sibel@gmail.com', '2025-03-24 16:32:15', 10),
(36, 'yavuz', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Yavuz', 'Gür', 'student', '10.png', 0, 'yavuz@gmail.com', '2025-03-24 15:22:47', 1750),
(42, 'sena', '$2a$10$Q.neNjq1HjmO5gA9cyS2T.HTyySJ6tp8pbCUiidyqZH.aKnleoqia', 'Sena', 'Ağaçyetiştiren', 'admin', 'sena.jpg', 0, 'sena@gmail.com', '2025-03-18 16:11:42', 500),
(44, 'emir', '$2b$10$uHxbXM1PHDEWAHYTlobS0euWs8qzQ2kE92fhOTncEO5x1jK6VY25i', 'Niyazi Emir', 'Akdemir', 'student', 'emir.jpg', 0, 'akdemirniyaziemir@gmail.com', '2025-03-24 16:12:20', 2000),
(45, 'asli', '$2b$10$lPBbGtW.lUmtgOrszKK4t.gPqq1WJgLZRbGkfNBQZPCfxx5PdBN.G', 'Aslıhan', 'Karataş', 'teacher', NULL, 0, 'asli@gmail.com', '2025-03-22 23:05:45', 0);

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
-- Tablo için indeksler `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

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
-- Tablo için indeksler `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Tablo için indeksler `ticket_comments`
--
ALTER TABLE `ticket_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Tablo için AUTO_INCREMENT değeri `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Tablo için AUTO_INCREMENT değeri `live_classes`
--
ALTER TABLE `live_classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Tablo için AUTO_INCREMENT değeri `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=299;

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
-- Tablo için AUTO_INCREMENT değeri `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- Tablo için AUTO_INCREMENT değeri `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `ticket_comments`
--
ALTER TABLE `ticket_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

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
-- Tablo kısıtlamaları `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD CONSTRAINT `password_reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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

--
-- Tablo kısıtlamaları `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Tablo kısıtlamaları `ticket_comments`
--
ALTER TABLE `ticket_comments`
  ADD CONSTRAINT `ticket_comments_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  ADD CONSTRAINT `ticket_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
