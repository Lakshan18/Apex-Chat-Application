-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.37 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for apex_chat_app
CREATE DATABASE IF NOT EXISTS `apex_chat_app` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `apex_chat_app`;

-- Dumping structure for table apex_chat_app.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `from_user_id` int NOT NULL,
  `to_user_id` int NOT NULL,
  `date_time` datetime NOT NULL,
  `chat_status_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chat_user1_idx` (`from_user_id`),
  KEY `fk_chat_user2_idx` (`to_user_id`),
  KEY `fk_chat_chat_status1_idx` (`chat_status_id`),
  CONSTRAINT `fk_chat_chat_status1` FOREIGN KEY (`chat_status_id`) REFERENCES `chat_status` (`id`),
  CONSTRAINT `fk_chat_user1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_chat_user2` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table apex_chat_app.chat: ~35 rows (approximately)
INSERT INTO `chat` (`id`, `message`, `from_user_id`, `to_user_id`, `date_time`, `chat_status_id`) VALUES
	(1, 'Hello', 4, 1, '2024-10-04 16:37:13', 3),
	(2, 'yes.Sahan,', 1, 4, '2024-10-04 16:39:02', 3),
	(3, 'what was the problem in yesterday? huahs vvw sgvsga sgvas ga svascv v qfwcvfqva fvafsvfavsfav fsfacfsfcsc ', 4, 1, '2024-10-05 23:41:35', 3),
	(4, 'Hi Vihanga, How are you?', 1, 2, '2024-10-06 00:16:30', 3),
	(5, 'I\'m fine Thank for you...', 2, 1, '2024-10-06 00:17:23', 3),
	(6, 'Hi Lakshan,', 7, 1, '2024-10-07 02:32:30', 3),
	(7, 'Hi Thara, So what do you want now?', 1, 7, '2024-10-07 02:33:56', 3),
	(8, 'Are you okay ?', 1, 7, '2024-10-07 16:53:39', 3),
	(9, 'Nothing else, Sahan.. So How are you? ', 1, 4, '2024-10-07 19:53:54', 3),
	(10, 'I\'m good, and you?', 4, 1, '2024-10-07 20:04:47', 3),
	(11, 'Yes, im too good..', 1, 4, '2024-10-07 21:05:21', 3),
	(12, 'Hello Dear, what are you doing now?', 2, 1, '2024-10-07 21:28:58', 3),
	(13, 'Nothing dear, So what we\'ll do tomorrow?', 1, 2, '2024-10-07 21:36:53', 3),
	(14, 'I have a lot of works today.', 1, 2, '2024-10-07 21:38:59', 3),
	(15, 'Okay..', 2, 1, '2024-10-07 21:42:20', 3),
	(16, 'I have to go now..good bye', 1, 2, '2024-10-07 21:44:54', 3),
	(17, 'okay good bye...', 2, 1, '2024-10-07 21:49:12', 3),
	(18, 'Good night Vihanga,', 1, 2, '2024-10-07 22:20:27', 3),
	(19, 'Good night Lakshan', 2, 1, '2024-10-07 22:25:34', 3),
	(20, 'okay dear, so where do you work from?', 4, 1, '2024-10-07 22:28:50', 3),
	(21, 'Im work from Hospital in government.', 1, 4, '2024-10-07 22:34:31', 3),
	(22, 'okay Sahan.. Now i wanna go now..', 1, 4, '2024-10-09 22:05:09', 3),
	(23, 'What are you doing now?', 1, 7, '2024-10-09 22:17:49', 3),
	(24, 'Nothing doing, Lakshan', 7, 1, '2024-10-09 22:55:42', 3),
	(25, 'So, what are the Plans of Success?', 7, 1, '2024-10-09 23:34:45', 3),
	(26, 'More plans are still be waiting.....ðððð', 1, 7, '2024-10-09 23:45:07', 3),
	(27, 'And Yours?ð§ð§ð§', 1, 7, '2024-10-09 23:47:34', 3),
	(28, 'Hello Sahan, How are you?after few days!!', 1, 4, '2024-10-09 23:51:27', 3),
	(29, 'Good night Vihanga ð¥³ð¥³ð¥³', 1, 2, '2024-10-09 23:55:53', 3),
	(30, 'Not yet..ðððð', 7, 1, '2024-10-10 00:02:11', 3),
	(31, 'I have lot of works today.!!', 7, 1, '2024-10-10 00:06:19', 3),
	(32, 'Okay So good bye...', 7, 1, '2024-10-10 00:14:25', 3),
	(47, 'yes of course', 4, 1, '2024-10-10 01:39:15', 2),
	(48, 'Hello', 1, 10, '2024-10-10 11:51:19', 2),
	(49, 'Hello Sahan', 1, 4, '2024-10-10 11:52:11', 2),
	(50, 'Hi ssase ', 1, 4, '2024-10-10 11:56:03', 1),
	(51, 'Hi Lakshan', 4, 1, '2024-10-10 11:56:58', 1);

-- Dumping structure for table apex_chat_app.chat_status
CREATE TABLE IF NOT EXISTS `chat_status` (
  `id` int NOT NULL,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table apex_chat_app.chat_status: ~2 rows (approximately)
INSERT INTO `chat_status` (`id`, `name`) VALUES
	(1, 'sent'),
	(2, 'delivered'),
	(3, 'read');

-- Dumping structure for table apex_chat_app.favorite
CREATE TABLE IF NOT EXISTS `favorite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(20) NOT NULL,
  `user_id` int NOT NULL,
  `fav_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_favorite_user1_idx` (`user_id`),
  KEY `fk_favorite_user2_idx` (`fav_user_id`),
  CONSTRAINT `fk_favorite_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_favorite_user2` FOREIGN KEY (`fav_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table apex_chat_app.favorite: ~0 rows (approximately)

-- Dumping structure for table apex_chat_app.friend_list
CREATE TABLE IF NOT EXISTS `friend_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `added_date_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_friend_list_user2_idx` (`friend_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk3_user_id_idx` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_friend_list_friend_idx` FOREIGN KEY (`friend_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table apex_chat_app.friend_list: ~4 rows (approximately)
INSERT INTO `friend_list` (`id`, `user_id`, `friend_id`, `added_date_time`) VALUES
	(1, 1, 4, '2024-10-08 23:48:24'),
	(2, 1, 7, '2024-10-09 01:49:47'),
	(3, 1, 2, '2024-10-09 13:10:51'),
	(4, 1, 10, '2024-10-10 11:58:18');

-- Dumping structure for table apex_chat_app.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `password` varchar(15) NOT NULL,
  `register_date` datetime NOT NULL,
  `username` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `bio_desc` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `user_status_id` int NOT NULL,
  `logout_date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_user_status_idx` (`user_status_id`),
  CONSTRAINT `fk_user_user_status` FOREIGN KEY (`user_status_id`) REFERENCES `user_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table apex_chat_app.user: ~10 rows (approximately)
INSERT INTO `user` (`id`, `first_name`, `last_name`, `mobile`, `password`, `register_date`, `username`, `bio_desc`, `user_status_id`, `logout_date_time`) VALUES
	(1, 'Lakshan', 'Maduranga', '0771122334', 'Lakshan18@.', '2024-10-02 19:18:50', 'Lakshan18@', ' I will hope to become a software engineer..One Day, I wanna get best opportunity for improve my attitude with decently. Good Luck My Journey ....', 1, NULL),
	(2, 'Vihanga', 'Heshan', '0779988776', 'Vihanga12@', '2024-10-02 20:46:46', 'V@Heshan110#', 'I am a new', 2, '2024-10-08 11:30:14'),
	(4, 'Sahan', 'Perera', '0775000300', 'Sahan11@.', '2024-10-02 21:15:08', 'Sahan12', 'my name is sahan perera. i am a professional graphic designer..', 2, '2024-10-10 10:48:00'),
	(5, 'Gayan', 'Perera', '0712003002', 'Gayan123@', '2024-10-03 11:37:32', NULL, NULL, 2, '2024-10-08 13:20:42'),
	(6, 'Janith', 'Madawa', '0778889993', 'Janith12@', '2024-10-03 14:16:39', NULL, NULL, 2, '2024-10-08 13:20:44'),
	(7, 'Nipuni', 'Thara', '0748009005', 'Thara17@.', '2024-10-04 16:48:51', '@Thara17@', 'hello guys', 2, '2024-10-10 00:24:36'),
	(8, 'Prabath', 'Weerasinghe', '0712000300', 'Praba111@', '2024-10-04 16:57:49', 'Praba890â¬@', 'Hello my friends..', 2, '2024-10-08 13:20:46'),
	(9, 'Ashan', 'Fernando', '0761001005', 'Ashan15@', '2024-10-06 21:32:23', NULL, NULL, 2, '2024-10-08 13:20:47'),
	(10, 'Kavindu', 'Jayarathne', '0786005002', 'Kavindu12@', '2024-10-10 11:22:05', 'Kavindu Max18Â¥Â¥', 'Hello Guys, I am Professional Pilot in Air Force.', 2, '2024-10-10 11:44:56'),
	(11, 'Hasindu', 'Perera', '0721112223', 'Hasindu15@', '2024-10-10 11:46:50', 'Hasindu661', 'Hello My friends...', 2, '2024-10-10 11:49:54');

-- Dumping structure for table apex_chat_app.user_status
CREATE TABLE IF NOT EXISTS `user_status` (
  `id` int NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table apex_chat_app.user_status: ~2 rows (approximately)
INSERT INTO `user_status` (`id`, `name`) VALUES
	(1, 'Online'),
	(2, 'Offline');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
