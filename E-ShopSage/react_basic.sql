-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 31, 2025 at 05:19 PM
-- Server version: 8.4.5
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_basic`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0-disable,1-enable',
  `type` tinyint NOT NULL DEFAULT '0' COMMENT '0-user,1-admin',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `slug`, `username`, `email`, `email_verified_at`, `password`, `profile_picture`, `status`, `type`, `remember_token`, `deleted_at`, `created_at`, `updated_at`, `last_login`) VALUES
(1, 'Manoj Raj', 'manoj.raj@matellio.com', 'manojraj', 'manoj.raj@matellio.com', '2022-01-12 05:18:18', '$2a$10$MMb6PA6oAQwzpvX0o96oxuvfSrDtRHWdR.NUMLKNqPn7X1pOsFfti', '1642578467_head-659652_1280.webp', 1, 1, NULL, NULL, '2022-01-11 23:47:46', '2022-01-18 20:47:47', '2025-07-31 07:02:21'),
(19, 'Test User2', NULL, 'testuser25', 'tetsthh11@yopmail.com', '2022-01-27 04:38:22', '$2y$10$EnWRJ1S8jU3SizVKHUqs7eTX/F8lpI.Zekz51BHr1pgbasrYwl9mK', '1643278150_icon-256x256.png', 0, 0, NULL, NULL, '2022-01-24 01:21:44', '2022-01-26 23:09:10', NULL),
(25, 'chandresh', NULL, NULL, 'admin@admin.com', '2021-12-09 01:03:33', '$2a$10$MMb6PA6oAQwzpvX0o96oxuvfSrDtRHWdR.NUMLKNqPn7X1pOsFfti', '1643278150_icon-256x256.png', 1, 1, NULL, NULL, '2021-12-09 01:02:15', '2022-01-11 18:25:47', NULL),
(66, 'Test Nom', NULL, 'test3', 'testnom3@mailinator.com', '2022-01-25 02:04:52', '$2y$10$oLAaxd1MYwXKa8ujMUowSuAU3OqSdKpJ6blLr5yP3ApHwAKo5dJzq', '1643278150_icon-256x256.png', 1, 0, NULL, '2022-01-25 02:15:13', '2022-01-25 02:04:42', '2022-01-25 02:15:13', NULL),
(78, 'teararbamate', NULL, 'asdadas', 'teararbamate@yopmail.com', '2022-02-07 02:37:32', '$2y$10$FIb8kjf7lrGIp0L0hYD.xOPtbF4ucHm3x390LB94ncFR2LF6Gh.sS', '1644241148_icon-256x256.png', 0, 0, NULL, NULL, '2022-02-07 02:37:14', '2022-02-07 02:39:16', NULL),
(79, 'testusermate122', NULL, 'tetstuser', 'testusermate122@yopmail.com', '2022-02-14 03:23:45', '$2y$10$m9se7VJ5V6p6c5xCrNsdXeMmCZia0oWKypVsERQHDZjS8WEAsXaUa', '1644848638_icon-256x256.png', 0, 0, NULL, NULL, '2022-02-14 03:23:28', '2022-02-14 03:23:58', NULL),
(91, 'Test W', NULL, 'testusaer12', 'testuserwnew@yopmail.com', '2022-03-20 19:07:22', '$2y$10$HQ9QWPMfbAJvr9JBw5yDI.jZbB0HN0BHae9PirxqCDC7xQ5/aFxN6', '1647842968_istockphoto-1135820309-612x612.jpg', 1, 0, NULL, NULL, '2022-03-20 19:07:05', '2022-03-31 20:19:03', NULL),
(94, 'vasmatellio12', NULL, 'tetsmate', 'vasmatellio12@yopmail.com', '2022-03-31 19:25:01', '$2y$10$DvTTnlBwyLwHQ2zUXhu.AOhe7yBUe4vYl6RdhdodlFDaEwjbFCnCe', NULL, 1, 0, NULL, NULL, '2022-03-31 19:23:09', '2022-03-31 20:06:18', NULL),
(121, 'Testing User', 'testing-user', 'testing-user', 'testinguser121d5d@yopmail.com', NULL, '$2a$10$Nvc80RM1XYss.ldHM86/vej4ppHuGnXYim4mDp744WLmQ46qkUZWa', 'uploads/users/profile_picture-1713424605011-326833125.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL),
(122, 'Testing User', 'testing-user-1', 'testing-user-1', 'testinguser12f@yopmail.com', NULL, '$2a$10$USXJtc/VyHSa60fb9N6cMOAxe3wjM6sV1dmNk3cy1LJvgFAo9A/w.', 'uploads/users/profile_picture-1713424615503-646929204.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL),
(123, 'Testing User', 'testing-user-2', 'testing-user-2', 'testingusder12f@yopmail.com', NULL, '$2a$10$blIvWOAbxJg71rIPvn0xG.p59R83UgzC7yO55V.LKdLnTauXPCfgq', 'uploads/users/profile_picture-1713424626241-309424367.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL),
(124, 'Testing User', 'testing-user-3', 'testing-user-3', 'testinguser1215d@yopmail.com', NULL, '$2a$10$y46iqVYPZulXSyVHllXkZuzAfYvf47eThzLkwUx2KzCi0CQtBrGbi', 'uploads/users/profile_picture-1713443813053-608852593.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL),
(129, 'Test123', 'test123-4', 'test123-4', 'test123dddd@yopmail.com', NULL, '$2a$10$Ldb7.c1Y7Zd8CP9epDcWw.GfdCkpT0a5rkXUyKe8D9m4C.FbnwY1e', 'uploads/users/profile_picture-1714020664222-774102808.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL),
(135, 'Kuldeep Sharma Jee', 'test-kuldeep', 'test-kuldeep', 'kuldeepsharma@yopmail.com', NULL, '$2a$10$Gv5pHfHkA.ZlFBY.mNZ3rupaoHi/XiUAVUP.dtbdE0yUI4Buj3o5y', 'uploads/users/profile_picture-1714738155377-320469784.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL),
(136, 'Eve Wolfe', 'eve-wolfe', 'eve-wolfe', 'zeceto@mailinator.com', NULL, '$2a$10$ptpzuPMidV7mQ54cYt57NexZhWpSg8vqL7jasAX6hEBuxwDX6dI1C', 'uploads/users/profile_picture-1748927909471-172832274.png', 1, 0, NULL, NULL, NULL, NULL, NULL),
(137, 'Minerva Castaneda', 'minerva-castaneda', 'minerva-castaneda', 'fiwuvu@mailinator.com', NULL, '$2a$10$lrdMwyaGbIkrMl7WXo84AOJmbF87OVOAU1Y7PXXDbrKJEWsrlHaxy', 'uploads/users/profile_picture-1748929660883-87430521.jpeg', 1, 0, NULL, NULL, NULL, NULL, NULL),
(138, 'Keelie Foley', 'keelie-foley', 'keelie-foley', 'waqipyryxo@mailinator.com', NULL, '$2a$10$UUiff6.LoUNrt3GtYIWGF.gWvfpB3vjy35se2OstG71Gex8cd6oFK', 'uploads/users/profile_picture-1748932065414-988692641.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL),
(139, 'Nerea Green', 'nerea-green', 'nerea-green', 'tysumupeze@mailinator.com', NULL, '$2a$10$.RmIRGqibyIMlSTX/TKoSOLI91VXQb0SwGi7/MzxPjerOBQiOsxdC', 'uploads/users/profile_picture-1748934348007-632894979.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL),
(140, 'Brody Gray', 'brody-gray', 'brody-gray', 'gekygef@mailinator.com', NULL, '$2a$10$EmagkGqEPOJea/PTivs1gufK76BGLz/P.05TwZ/vb8p3xhmBcBWwW', 'uploads/users/profile_picture-1748937389672-865593120.png', 1, 0, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
