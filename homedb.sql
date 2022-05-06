-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2022 at 09:46 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homedb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addColumnToAds` (IN `name` VARCHAR(255), IN `t` VARCHAR(255))  READS SQL DATA
    COMMENT 'adds another parameter to ads'
BEGIN
ALTER TABLE ads
ADD name int;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdContentTable` ()  READS SQL DATA
    COMMENT 'Get all ad content from ad_content table'
BEGIN
	SELECT * from ad_content;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdsTable` ()  READS SQL DATA
    COMMENT 'Get all ads from ads Table'
BEGIN
	SELECT * from ads;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdTableJoinedWithAdContentTable` ()  READS SQL DATA
SELECT *
FROM ads
INNER JOIN ad_content
     ON ad_content.adID = ads.adID$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getBlogsTable` ()  READS SQL DATA
    COMMENT 'Get all blogs from blogs table'
BEGIN
SELECT * from blogs;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getFavoritesTable` ()  READS SQL DATA
    COMMENT 'Get all favorites from favorit table'
BEGIN
SELECT * from favorites;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getHistoryTable` ()  READS SQL DATA
    COMMENT 'Get all history from history table'
BEGIN
SELECT * from history;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getLinksTable` ()  READS SQL DATA
    COMMENT 'get all links from links table'
BEGIN
SELECT * from links;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getMessagesTable` ()  READS SQL DATA
    COMMENT 'Get all messages from messages table'
BEGIN
SELECT * from messages;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPackageTable` ()  READS SQL DATA
    COMMENT 'Get all packages from package table'
BEGIN
SELECT * from package;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPasswordRecoveryTable` ()  READS SQL DATA
    COMMENT 'get all password recovery data from password_recovery table'
BEGIN
	SELECT * from password_recovery;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPicturesTable` ()  READS SQL DATA
    COMMENT 'get all prictures from prictures table'
BEGIN
	SELECT * from pictures;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPurchaseHistoryTable` ()  READS SQL DATA
    COMMENT 'get all purchase history table'
BEGIN
	SELECT * from purchase_history;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getReportReasonsTable` ()  READS SQL DATA
    COMMENT 'Get all reports reasons table'
BEGIN
	SELECT * from report_reason;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getSelectedAdByIdAndCity` (IN `id` VARCHAR(255), IN `city` VARCHAR(255))  READS SQL DATA
BEGIN
select * from ads where ads.adID =id and ads.city=city;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getSystemMessagesTable` ()  READS SQL DATA
    COMMENT 'get all system messages table'
BEGIN
	SELECT * from system_messages;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsersReportTable` ()  READS SQL DATA
    COMMENT 'get all users reports table'
BEGIN
	SELECT * from user_reports;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsersTable` ()  READS SQL DATA
    COMMENT 'Get all users data from users table'
BEGIN
	SELECT * from users;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAd` (IN `adID` VARCHAR(255), IN `user_id` VARCHAR(255), IN `city` VARCHAR(255), IN `street` VARCHAR(255), IN `building_number` INT, IN `apartment` VARCHAR(255), IN `entry` VARCHAR(255), IN `rooms` VARCHAR(255))  READS SQL DATA
BEGIN
INSERT INTO `ads` (`adID`, `create_time`, `user_id`, `active`, `contact_counter`, `views`, `close_reason`, `expire_date`, `approval_status`, `ad_link`, `city`, `street`, `building_number`, `entry`, `apartment`, `zip_code`, `map_X`, `map_Y`) VALUES (adID, current_timestamp(), user_id, '0', '0', '0', NULL, '', 'pending', 'ad link 3', city, street, building_number, entry, apartment, '3', '', '');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertTry` (IN `name` VARCHAR(255), IN `id` INT)  READS SQL DATA
INSERT INTO `try` (`id`, `name`) VALUES (id, name)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `adID` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `contact_counter` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `views` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `close_reason` text DEFAULT NULL,
  `expire_date` datetime NOT NULL,
  `approval_status` varchar(50) NOT NULL DEFAULT 'pending',
  `ad_link` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `building_number` int(11) NOT NULL,
  `entry` varchar(10) NOT NULL,
  `apartment` varchar(10) NOT NULL,
  `zip_code` varchar(50) NOT NULL,
  `map_X` varchar(255) NOT NULL,
  `map_Y` varchar(255) NOT NULL,
  `price` double NOT NULL DEFAULT 0 COMMENT 'price for the property',
  `air_conditioner` tinyint(1) NOT NULL,
  `elevator` varchar(255) DEFAULT NULL,
  `HAIM` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`adID`, `create_time`, `user_id`, `active`, `contact_counter`, `views`, `close_reason`, `expire_date`, `approval_status`, `ad_link`, `city`, `street`, `building_number`, `entry`, `apartment`, `zip_code`, `map_X`, `map_Y`, `price`, `air_conditioner`, `elevator`, `HAIM`) VALUES
('088c8395-a8fa-4a3d-aab5-e9b4893655ce', '2022-05-05 21:51:10', 'afula', 0, 0, 0, NULL, '0000-00-00 00:00:00', 'pending', 'ad link 3', 'afula street', '1', 1, '23', '1', '3', '', '', 0, 0, NULL, NULL),
('1', '2022-05-05 16:19:11', '1', 0, 0, 0, NULL, '0000-00-00 00:00:00', 'pending', 'ad link 3', 'haifa', 'hagalil', 1, '1', '1', '3', '', '', 2002, 1, NULL, NULL),
('4975c3c0-c612-42b9-b77f-53ae72823142', '2022-05-05 22:56:20', 'k', 0, 0, 0, NULL, '0000-00-00 00:00:00', 'pending', 'ad link 3', 'jjjjddjjd', 'kk', 2, '2', '1', '3', '', '', 0, 0, NULL, NULL),
('a198e934-feb0-4326-bf46-8abd5edade6d', '2022-05-05 23:52:55', '1', 0, 0, 0, NULL, '0000-00-00 00:00:00', 'pending', 'ad link 3', '1', '1', 1, '1', '1', '3', '', '', 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ad_content`
--

CREATE TABLE `ad_content` (
  `element_id` varchar(50) NOT NULL,
  `adID` varchar(50) NOT NULL COMMENT 'when master is active adid will be zero (0)',
  `category` varchar(50) NOT NULL COMMENT 'exp, rent, buy...',
  `master` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'defind if row is for new add properties',
  `min_value` double DEFAULT NULL COMMENT 'min value will appear only for chooseing parameter to set minmum row value',
  `max_value` double DEFAULT NULL COMMENT 'min value will appear only for chooseing parameter to set minmum row value',
  `icon` varchar(255) NOT NULL COMMENT 'use to set the row thumbnail show in ad',
  `free_text` text NOT NULL,
  `required` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ad_content`
--

INSERT INTO `ad_content` (`element_id`, `adID`, `category`, `master`, `min_value`, `max_value`, `icon`, `free_text`, `required`, `name`) VALUES
('1', '0', 'input', 1, 0, 40000, '', 'the price here', 0, 'price'),
('12', '1', 'RENT', 0, 1, 10, '1', 'JDJDHJSHLSJFSJKFJSJKF', 1, 'PRESENTING'),
('2', '0', 'checkBox', 1, NULL, NULL, '', 'check box for air conditioner', 0, 'air_conditioner'),
('3', '1', 'checkBox', 0, NULL, NULL, '', 'air conditioner', 0, 'air_conditioner');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `blog_id` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'Draft' COMMENT 'active, close, draft',
  `title` varchar(255) NOT NULL COMMENT 'blog title',
  `userId` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `update_time` datetime NOT NULL DEFAULT current_timestamp(),
  `views` int(10) UNSIGNED NOT NULL,
  `cover_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `favorite_id` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `AdId` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `adId` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `linkId` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `userId` varchar(50) NOT NULL,
  `link_content` text NOT NULL,
  `link` varchar(255) NOT NULL COMMENT 'link url',
  `views` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `msgid` varchar(255) NOT NULL,
  `adId` varchar(50) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `files` text NOT NULL,
  `dateMsg` datetime NOT NULL,
  `seen` int(4) NOT NULL DEFAULT 0,
  `received` int(4) NOT NULL DEFAULT 0,
  `delete_sender` tinyint(4) NOT NULL DEFAULT 0,
  `delete_receiver` tinyint(4) NOT NULL DEFAULT 0,
  `newUpdate` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `packageId` varchar(50) NOT NULL,
  `price` double NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `ad_value` int(10) UNSIGNED NOT NULL COMMENT 'number of ad''s added after purches',
  `update_time` datetime NOT NULL DEFAULT current_timestamp(),
  `life_cycle` datetime NOT NULL COMMENT 'the time the package will be avalible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `password_recovery`
--

CREATE TABLE `password_recovery` (
  `id` int(11) NOT NULL,
  `userMail` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `exp_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `pictureID` varchar(50) NOT NULL,
  `element_id` varchar(50) NOT NULL,
  `serial_number` int(11) UNSIGNED NOT NULL,
  `picture_url` varchar(255) NOT NULL,
  `upload_time` datetime NOT NULL DEFAULT current_timestamp(),
  `alt` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_history`
--

CREATE TABLE `purchase_history` (
  `purchase_id` varchar(50) NOT NULL,
  `packageId` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `purchase_time` datetime NOT NULL DEFAULT current_timestamp(),
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `report_reason`
--

CREATE TABLE `report_reason` (
  `reason_id` varchar(50) NOT NULL,
  `element_type` varchar(255) NOT NULL COMMENT 'blog,ad...',
  `reason_name` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `system_messages`
--

CREATE TABLE `system_messages` (
  `msgId` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `message_content` text NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `seen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `testtable`
--

CREATE TABLE `testtable` (
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testtable`
--

INSERT INTO `testtable` (`name`, `age`) VALUES
('lidor', 30);

-- --------------------------------------------------------

--
-- Table structure for table `try`
--

CREATE TABLE `try` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `try`
--

INSERT INTO `try` (`id`, `name`) VALUES
(0, '10'),
(1, 'ed');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uuid` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `password` varchar(50) NOT NULL,
  `last_seen` datetime NOT NULL,
  `prompt` varchar(255) NOT NULL,
  `rule` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uuid`, `first_name`, `last_name`, `phone`, `mail`, `create_time`, `password`, `last_seen`, `prompt`, `rule`) VALUES
('123456', 'lidor', 'ben shimol', '0542155045', 'AAA', '2022-04-06 17:52:19', 'ASdasda', '0000-00-00 00:00:00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_reports`
--

CREATE TABLE `user_reports` (
  `report_id` varchar(50) NOT NULL,
  `element_id` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `content` text NOT NULL,
  `title` varchar(255) NOT NULL,
  `manage_feedback` text NOT NULL,
  `report_reason` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`adID`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ad_content`
--
ALTER TABLE `ad_content`
  ADD PRIMARY KEY (`element_id`),
  ADD KEY `adId` (`adID`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blog_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`favorite_id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `AdId` (`AdId`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `adId` (`adId`);

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`linkId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`msgid`),
  ADD KEY `sender` (`sender`),
  ADD KEY `receiver` (`receiver`),
  ADD KEY `adId` (`adId`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`packageId`);

--
-- Indexes for table `password_recovery`
--
ALTER TABLE `password_recovery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`pictureID`);

--
-- Indexes for table `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `packageId` (`packageId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `system_messages`
--
ALTER TABLE `system_messages`
  ADD PRIMARY KEY (`msgId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `try`
--
ALTER TABLE `try`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `user_reports`
--
ALTER TABLE `user_reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `report_reason` (`report_reason`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `password_recovery`
--
ALTER TABLE `password_recovery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
