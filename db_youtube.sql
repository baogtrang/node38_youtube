-- -------------------------------------------------------------
-- TablePlus 3.7.1(332)
--
-- https://tableplus.com/
--
-- Database: db_youtube
-- Generation Time: 2023-10-31 13:17:41.4440
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `face_app_id` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `video` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `video_name` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `description` text,
  `views` int DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  KEY `user_id` (`user_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `video_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `video_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `video_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `video_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `video_id` int DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `content` text,
  `reply_list` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `video_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `video_comment_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `video_like` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `video_id` int DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `dis_like` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `video_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `video_like_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `video_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`user_id`, `full_name`, `email`, `avatar`, `pass_word`, `face_app_id`, `role`) VALUES
('1', 'John Doe', 'john@example.com', 'avatar1.jpg', 'hashed_pass1', 'face123', 'user'),
('2', 'Jane Smith', 'jane@example.com', 'avatar2.jpg', 'hashed_pass2', 'face456', 'user'),
('3', 'Admin User', 'admin@example.com', 'admin_avatar.jpg', 'hashed_pass3', 'face789', 'admin'),
('4', 'Alice Johnson', 'alice@example.com', 'avatar3.jpg', 'hashed_pass4', 'face987', 'user'),
('5', 'Bob Brown', 'bob@example.com', 'avatar4.jpg', 'hashed_pass5', 'face654', 'user');

INSERT INTO `video` (`video_id`, `video_name`, `thumbnail`, `description`, `views`, `source`, `user_id`, `type_id`) VALUES
('1', 'Introduction to Coding', 'coding_intro.jpg', 'Learn the basics of coding', '1500', 'youtube.com', '1', '2'),
('2', 'Music Concert Highlights', 'music_concert.jpg', 'Highlights from a live music concert', '800', 'vimeo.com', '2', '3'),
('3', 'Gaming Adventure Episode 1', 'gaming_adventure1.jpg', 'First episode of a gaming adventure', '2500', 'twitch.tv', '3', '5'),
('4', 'Fashion Trends for Spring', 'spring_fashion.jpg', 'Latest fashion trends for the spring season', '1200', 'instagram.com', '4', '7'),
('5', 'Introduction to Cryptocurrency', 'crypto_intro.jpg', 'Understanding the basics of cryptocurrency', '300', 'youtube.com', '5', '9'),
('6', 'Full Stack Web Development Tutorial', 'web_dev_tutorial.jpg', 'Complete guide to full stack web development', '1200', 'youtube.com', '1', '2'),
('7', 'Acoustic Guitar Performance', 'acoustic_guitar.jpg', 'Soulful acoustic guitar performance', '650', 'vimeo.com', '2', '3'),
('8', 'Epic Gaming Moments Compilation', 'gaming_compilation.jpg', 'Compilation of epic gaming moments', '3500', 'twitch.tv', '3', '5'),
('9', 'Fitness Workout Routine', 'fitness_workout.jpg', 'Effective fitness workout routine', '900', 'instagram.com', '4', '8'),
('10', 'Understanding Blockchain Technology', 'blockchain_technology.jpg', 'Exploring the concepts of blockchain', '500', 'youtube.com', '5', '9');

INSERT INTO `video_type` (`type_id`, `type_name`, `icon`) VALUES
('1', 'New', 'fa-solid fa-house'),
('2', 'Coding', 'fa-solid fa-code'),
('3', 'Music', 'fa-solid fa-music'),
('4', 'Movie', 'fa-solid fa-video'),
('5', 'Gaming', 'fa-sharp fa-solid fa-gamepad'),
('6', 'Sport', 'fa-solid fa-baseball'),
('7', 'Fashion', 'fa-sharp fa-solid fa-shirt'),
('8', 'Gym', 'fa-solid fa-dumbbell'),
('9', 'Crypto', 'fa-solid fa-diamond');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;