-- Database: `Personal_assignment`
CREATE DATABASE IF NOT EXISTS `Personal_assignment`;
USE `Personal_assignment`;

-- ---------------------------
-- Table structure for `users`
-- ---------------------------
CREATE TABLE `users` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(50),
  `uname` VARCHAR(50),
  `passwd` VARCHAR(100),
  `email` VARCHAR(100),
  `tz` VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------
-- Table structure for `categories`
-- -------------------------------
CREATE TABLE `categories` (
  `id` INT(11) NOT NULL,
  `user_id` INT(11),
  `name` VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------
-- Table structure for `tasks`
-- ---------------------------
CREATE TABLE `tasks` (
  `id` INT(11) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `due_date` DATE NOT NULL,
  `done` TINYINT(1) NOT NULL DEFAULT 0,
  `category_id` INT(11),
  `user_id` INT(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------
-- Indexes and primary keys
-- ---------------------------

-- Users
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

-- Categories
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_user_fk` (`user_id`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

-- Tasks
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_user_fk` (`user_id`),
  ADD KEY `tasks_cat_fk` (`category_id`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

-- ---------------------------
-- Foreign keys 
-- ---------------------------

ALTER TABLE `categories`
  ADD CONSTRAINT `categories_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tasks_cat_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
