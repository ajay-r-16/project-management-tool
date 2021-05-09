-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 18, 2019 at 03:36 PM
-- Server version: 10.3.14-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id9900441_miniproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(32) NOT NULL,
  `issue_id` int(32) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `user_id` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `issue_id`, `comment`, `user_id`) VALUES
(1, 1, 'Good one!', 1001),
(2, 1, 'please resolve soon!', 1001),
(6, 2, 'Slow Respone', 1001),
(7, 3, 'Needs improvement!', 1001);

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `issue_id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `reportedby` int(32) NOT NULL,
  `assignedto` int(32) NOT NULL,
  `team_id` int(32) NOT NULL,
  `priority` varchar(32) NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'NEW',
  `sprint_id` int(32) NOT NULL,
  `version` int(32) NOT NULL,
  `points` int(32) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `issues`
--

INSERT INTO `issues` (`issue_id`, `heading`, `reportedby`, `assignedto`, `team_id`, `priority`, `status`, `sprint_id`, `version`, `points`, `date`, `description`) VALUES
(1, 'Bug Issue', 1001, 1001, 1, 'High', 'OPEN', 1, 1, 10, '2019-06-08', 'Debug'),
(2, 'Updated New Issue', 1001, 1001, 1, 'LOW', 'OPEN', 1, 2, 5, '2019-06-09', 'Updated an existing issue'),
(3, 'Slow Respone', 1001, 1001, 1, 'High', 'OPEN', 1, 1, 6, '2019-06-12', 'Immediate action needed!'),
(5, 'Slow Respone', 1001, 1001, 1, 'High', 'OPEN', 1, 1, 6, '2019-06-12', 'Immediate action needed!'),
(6, 'Updated New Issue', 1001, 1001, 1, 'LOW', 'OPEN', 1, 2, 5, '2019-06-09', 'Updated an existing issue'),
(7, 'Updated New Issue', 1001, 1001, 1, 'LOW', 'OPEN', 1, 2, 5, '2019-06-09', 'Updated an existing issue'),
(8, 'Updated New Issue', 1001, 1001, 1, 'high', 'OPEN', 3, 456, 123, '2019-06-24', 'asdfgh'),
(9, 'AABCDEF', 1001, 1001, 1, 'high', 'OPEN', 3, 456, 123, '2019-06-24', 'asdfgh'),
(10, 'AABCDEF', 1001, 1001, 1, 'high', 'OPEN', 3, 456, 123, '2019-06-24', 'asdfgh'),
(11, 'Bug Issue', 1001, 1001, 1, 'High', 'OPEN', 1, 1, 10, '2019-07-16', 'Debug');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `user_id` int(32) NOT NULL,
  `username` varchar(255) NOT NULL,
  `token` varchar(512) NOT NULL,
  `expiry` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`user_id`, `username`, `token`, `expiry`) VALUES
(1001, 'admin@example.com', '5037740f19389822cd502abb8d693edfa0f15832d2514bc3ab48d5730333c5de', 1563496284);

-- --------------------------------------------------------

--
-- Table structure for table `sprints`
--

CREATE TABLE `sprints` (
  `sprint_id` int(32) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `duration` varchar(255) NOT NULL,
  `createdby` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sprints`
--

INSERT INTO `sprints` (`sprint_id`, `startdate`, `enddate`, `duration`, `createdby`) VALUES
(1, '2019-06-08', '2019-06-18', '10', 1001),
(2, '2019-06-14', '2019-06-20', '6', 1001),
(3, '2019-06-14', '2019-06-28', '14', 1001),
(4, '2019-06-29', '2019-07-09', '10', 1001),
(5, '2019-06-23', '2019-06-30', '15', 1001),
(6, '2019-06-23', '2019-06-30', '15', 1001),
(7, '2019-07-04', '2019-08-04', '31', 1001),
(11, '2019-07-16', '2019-07-30', '14', 1001),
(12, '2019-07-16', '2019-07-30', '14', 1001),
(13, '2019-07-16', '2019-07-30', '14', 1001);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` int(32) NOT NULL,
  `teamname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`team_id`, `teamname`) VALUES
(1, 'Back End'),
(2, 'Front End');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(32) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `active`) VALUES
(1001, 'admin@example.com', 'ec610b74f5c3151fb793453977d0c5667a78adc7eb5a4227654a846d3ffd9f5c', 1),
(1002, 'user@example.com', '086e8d8bfe8a2a7ee5af7f5f2a369c492541190dfd72f27c340ab7c175c20c4e', 1),
(1003, 'madeshhhh@example.com', '84986a9bf025110984949d789ac6cf396669ba81957cf6fdb7e3f394c54538e8', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_id` int(32) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `nationality` varchar(32) NOT NULL,
  `team_id` int(11) NOT NULL,
  `image` longblob DEFAULT NULL,
  `role` varchar(32) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_id`, `fullname`, `nationality`, `team_id`, `image`, `role`) VALUES
(1001, 'admin', 'Indian', 1, '', 'admin'),
(1002, 'User', 'Indian', 2, NULL, 'user'),
(1003, 'madeshwaran', 'asd', 2, NULL, 'Dev');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `issue_id` (`issue_id`);

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`issue_id`),
  ADD KEY `sprint_id` (`sprint_id`),
  ADD KEY `assignedto` (`assignedto`),
  ADD KEY `reportedby` (`reportedby`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD UNIQUE KEY `user_id` (`user_id`) USING BTREE;

--
-- Indexes for table `sprints`
--
ALTER TABLE `sprints`
  ADD PRIMARY KEY (`sprint_id`),
  ADD KEY `createdby` (`createdby`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD UNIQUE KEY `user_id` (`user_id`) USING BTREE,
  ADD KEY `team_id` (`team_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `issue_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sprints`
--
ALTER TABLE `sprints`
  MODIFY `sprint_id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `team_id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1004;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`issue_id`),
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `issues`
--
ALTER TABLE `issues`
  ADD CONSTRAINT `issues_ibfk_3` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`sprint_id`),
  ADD CONSTRAINT `issues_ibfk_4` FOREIGN KEY (`assignedto`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `issues_ibfk_5` FOREIGN KEY (`reportedby`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `issues_ibfk_6` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `sprints`
--
ALTER TABLE `sprints`
  ADD CONSTRAINT `sprints_ibfk_1` FOREIGN KEY (`createdby`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_details_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
