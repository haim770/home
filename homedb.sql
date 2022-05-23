-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2022 at 04:02 PM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `addColumnToAdsTypeDateTime` (IN `name` INT)  NO SQL
    COMMENT 'adds datetime column to ads'
BEGIN
ALTER TABLE ads
add name datetime;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addColumnToAdsTypeDouble` (IN `namecol` INT)  NO SQL
    COMMENT 'adds another column to ads double type'
BEGIN
ALTER TABLE ads
add namecol double;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addColumnToAdstYPEInt` (IN `namecol` VARCHAR(255))  BEGIN
ALTER TABLE ads
ADD COLUMN `namecol` int;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addColumnToAdsTypeTinyInt` (IN `nam` INT)  READS SQL DATA
    COMMENT 'adds another column to ads tinyint'
BEGIN
ALTER TABLE ads
add name tinyInt;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addColumnToAdsTypeVarchar` (IN `nameCol` TEXT)  READS SQL DATA
    COMMENT 'adds varchar type column'
BEGIN
ALTER TABLE ads
add nameCol varchar(255);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdById` (IN `adID` VARCHAR(255) CHARSET sjis)  READS SQL DATA
BEGIN
select * from ads WHERE ads.adID=adID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdByLink` (IN `adLink` VARCHAR(255))  READS SQL DATA
    COMMENT 'get ad by its link'
begin
SELECT * from ads where ads.ad_link=adLink;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdContentForAdId` (IN `adID` VARCHAR(255))  READS SQL DATA
    COMMENT 'get ads content by the adId'
BEGIN
SELECT * from ad_content where ad_content.adID=adId;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllAdCOntentMasters` ()  READS SQL DATA
BEGIN
select * from ad_content where ad_content.master=1;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllMasters` ()  NO SQL
select * from ad_content where ad_content.master=1$$

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getParametersMasters` ()  READS SQL DATA
    COMMENT 'get all masters'
BEGIN
SELECT * from parametersmaster;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserByMailAndPassword` (IN `mail` VARCHAR(255), IN `password` VARCHAR(255))  READS SQL DATA
    COMMENT 'get specific user by his mail and password'
BEGIN
SELECT * FROM `users` WHERE users.mail=mail and users.password=password;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPackage` (IN `packageId` VARCHAR(255), IN `price` DOUBLE, IN `title` VARCHAR(255), IN `content` TEXT, IN `ad_value` INT)  READS SQL DATA
    COMMENT 'ad package'
BEGIN
INSERT INTO `package` (`packageId`, `price`, `is_active`, `title`, `content`, `create_time`, `ad_value`, `update_time`) VALUES (packageId, price, '1', title, content, current_timestamp(), ad_value, current_timestamp());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertTry` (IN `name` VARCHAR(255), IN `id` INT)  READS SQL DATA
INSERT INTO `try` (`id`, `name`) VALUES (id, name)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `joinAdsWithAdContent` ()  BEGIN
select * from ads,ad_content where ads.adID=1 and ad_content.adID=1;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `packTry` (IN `ad_value` INT)  BEGIN
INSERT INTO `package` (`packageId`, `price`, `is_active`, `title`, `content`, `create_time`, `ad_value`, `update_time`) VALUES (1, 12, '1', 'title', 'content', current_timestamp(), ad_value, current_timestamp());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (IN `uuid` VARCHAR(255), IN `first_name` VARCHAR(255), IN `last_name` VARCHAR(255), IN `phone` VARCHAR(255), IN `mail` VARCHAR(255), IN `password` VARCHAR(255))  NO SQL
INSERT INTO `users` (`uuid`, `first_name`, `last_name`, `phone`, `mail`, `create_time`, `password`, `last_seen`, `prompt`, `rule`) VALUES (uuid, first_name, last_name, phone, mail, current_timestamp(), password, current_timestamp(), 'k', 'user')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchAdByCityStreetRoomsPriceTypeWatch` (IN `minPrice` INT, IN `maxPrice` INT, IN `city` TEXT, IN `street` TEXT, IN `rooms` TEXT, IN `numOfAds` INT)  READS SQL DATA
    COMMENT 'search ad by params'
BEGIN
select * from ads where ads.price>=minPrice and ads.price<=maxPrice and ads.city like city and ads.street like street and ads.rooms=rooms   limit numOfAds;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchByAdCityContains` (IN `city` VARCHAR(255))  READS SQL DATA
    COMMENT 'if we want the city to contain the param we need to pass in % %'
BEGIN
SELECT * from ads where ads.city like `city`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `setLastSeen` (IN `mail` VARCHAR(255), IN `last_seen` DATETIME)  MODIFIES SQL DATA
    COMMENT 'set last seen to current time'
BEGIN
UPDATE users
SET users.last_seen = last_seen
WHERE users.mail = mail;
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `adID` varchar(50) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `contact_counter` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `watch` int(10) UNSIGNED NOT NULL DEFAULT 0,
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
  `rooms` int(11) UNSIGNED NOT NULL,
  `adType` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`adID`, `create_time`, `user_id`, `active`, `contact_counter`, `watch`, `close_reason`, `expire_date`, `approval_status`, `ad_link`, `city`, `street`, `building_number`, `entry`, `apartment`, `zip_code`, `map_X`, `map_Y`, `price`, `rooms`, `adType`) VALUES
('088c8395-a8fa-4a3d-aab5-e9b4893655ce', '2022-05-05 18:51:10', 'afula', 0, 0, 5, NULL, '0000-00-00 00:00:00', 'pending', 'ad link 3fsfs', 'afula street', '1', 1, '23', '1', '3', '', '', 0, 0, 'rent'),
('1', '2022-05-05 13:19:11', '1', 0, 0, 7, NULL, '0000-00-00 00:00:00', 'pending', 'ad dfflink 3', 'haifa', 'hagalil', 1, '1', '1', '3', '', '', 2002, 0, 'rent'),
('2', '2022-05-21 18:53:41', 'haim', 1, 1, 1, NULL, '2022-05-31 21:52:10', 'pending', 'linkhai', 'haifa', 'hagalil', 1, '12', '1', '', '', '', 0, 0, 'rent'),
('4', '2022-05-21 18:53:41', 'tal', 1, 1, 1, 'W', '2022-05-25 21:52:10', 'pending', 'ws', 'afula', 'street', 1, '1', '1', '1', '1', '1', 1, 1, '1');

-- --------------------------------------------------------

--
-- Table structure for table `ad_content`
--

CREATE TABLE `ad_content` (
  `element_id` varchar(255) NOT NULL,
  `adID` varchar(255) NOT NULL COMMENT 'when master is active adid will be zero (0)',
  `category` varchar(255) NOT NULL COMMENT 'exp, rent, buy...',
  `master` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'defind if row is for new add properties',
  `min_value` double DEFAULT NULL COMMENT 'min value will appear only for chooseing parameter to set minmum row value',
  `max_value` double DEFAULT NULL COMMENT 'min value will appear only for chooseing parameter to set minmum row value',
  `icon` varchar(255) NOT NULL COMMENT 'use to set the row thumbnail show in ad',
  `free_text` text NOT NULL,
  `required` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `display_type` text NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ad_content`
--

INSERT INTO `ad_content` (`element_id`, `adID`, `category`, `master`, `min_value`, `max_value`, `icon`, `free_text`, `required`, `name`, `display_type`, `value`) VALUES
('1', '1', 'every', 1, NULL, NULL, '', 'air conditioner', 0, 'air_conditioner', 'checkBox', '1'),
('2', '0', '12', 1, 1, 1, 'kfkf', '33232', 0, 'ndndndndn', '2', 'mwmwmw'),
('3', '1', 'hah', 0, NULL, NULL, 'jdj', 'jd', 0, 'garden', '', '1');

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
  `packageId` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `ad_value` int(10) UNSIGNED NOT NULL COMMENT 'number of ad''s added after purches',
  `update_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`packageId`, `price`, `is_active`, `title`, `content`, `create_time`, `ad_value`, `update_time`) VALUES
('1', 12, 1, 'tiny package', 'worst pack', '2022-05-22 17:39:42', 0, '2022-05-22 17:39:42'),
('2', 201, 1, 'mid pack', 's2nd peck', '2022-05-22 17:40:25', 230, '2022-05-22 17:40:25'),
('23', 2, 1, 'ckskc', 'ckk', '2022-05-22 17:41:39', 3, '2022-05-22 17:41:39'),
('3', 33, 1, '33', '3dwd', '2022-05-22 17:40:47', 332, '2022-05-22 17:40:47'),
('628a91127da05', 23, 1, '23', '13', '2022-05-22 22:37:54', 13, '2022-05-22 22:37:54'),
('628a913467f66', 929292, 1, '1', 'dswdsmm', '2022-05-22 22:38:28', 212, '2022-05-22 22:38:28'),
('628a99d860576', 11, 1, 'DCDC', 'EE', '2022-05-22 23:15:20', 2332, '2022-05-22 23:15:20');

-- --------------------------------------------------------

--
-- Table structure for table `parametersmaster`
--

CREATE TABLE `parametersmaster` (
  `paramName` varchar(255) NOT NULL,
  `paramStyle` varchar(255) NOT NULL,
  `paramMinValue` double NOT NULL,
  `paramMaxValue` double NOT NULL,
  `paramType` varchar(255) NOT NULL,
  `comboBoxValues` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parametersmaster`
--

INSERT INTO `parametersmaster` (`paramName`, `paramStyle`, `paramMinValue`, `paramMaxValue`, `paramType`, `comboBoxValues`) VALUES
('ad_link', 'input', 0, 0, 'varchar', ''),
('air_conditioner', 'checkBox', 0, 0, 'boolean', ''),
('apartment', 'input', 0, 0, 'int', ''),
('building_number', 'input', 0, 0, 'int', ''),
('city', 'input', 0, 0, 'varchar(255)', ''),
('create_time', 'input', 0, 0, 'dateTime', ''),
('entry', 'input', 0, 0, 'varchar(255)', ''),
('price', 'input', 0, 0, 'int', ''),
('rooms', 'comboBox', 0, 0, 'double', '{0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10}'),
('street', 'input', 0, 0, 'varchr(255)', '');

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
  `uuid` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL,
  `last_seen` datetime NOT NULL DEFAULT current_timestamp(),
  `prompt` varchar(255) NOT NULL,
  `rule` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uuid`, `first_name`, `last_name`, `phone`, `mail`, `create_time`, `password`, `last_seen`, `prompt`, `rule`) VALUES
('', '', '', '', '', '2022-05-08 23:07:48', '1', '2022-05-08 23:07:48', 'k', 'user'),
('1', 'haim', 'mo', '01', 'haim@gmail.con', '2022-05-03 21:19:17', '1', '2022-05-09 21:47:14', '', 'user'),
('123456', 'lidor', 'ben shimol', '0542155045', 'AAA', '2022-04-06 17:52:19', 'ASdasda', '0000-00-00 00:00:00', '', ''),
('2222222222222222', '2222222222222222', '2222222222222222', '2222222222222222', '2222222222222222', '2022-05-08 23:08:11', '1', '0000-00-00 00:00:00', 'k', 'user'),
('48', '29', '22', '1', '12', '2022-05-08 23:04:51', '112', '2022-05-08 23:04:51', 'k', 'user'),
('627824e644859', 'haimkel', 'monhait', '0030', 'haim@123.com', '2022-05-08 23:15:34', '12345678', '2022-05-09 21:45:40', 'k', 'user'),
('6278268bcf8fb', 'haimmmmm', 'mmmmmm', 'mmmmmmm', 'mmmmmm', '2022-05-08 23:22:35', '$2y$10$LXc4nneaLWgnasmz7nnV6.K1g7/71oac46uNYZ.YTOyVSTRxHnrVK', '2022-05-08 23:22:35', 'k', 'user'),
('627826f01b888', 'k', 'ks', 'k', 's', '2022-05-08 23:24:16', '$2y$10$Fwz6liVpMjKCFw6xz5VY7.BXEnVeJRhQK5U0Nz6Mb91sHA/DO68Ve', '2022-05-08 23:24:16', 'k', 'user'),
('627827fb35231', '', '', '', '', '2022-05-08 23:28:43', '$2y$10$/gNDwtz.lBacBd3D1nkB8OOzbOi7Ip89xfrSCrbzPeYeH.nM1WChq', '2022-05-08 23:28:43', 'k', 'user'),
('627827fd863f8', '', '', '', '', '2022-05-08 23:28:45', '$2y$10$K1OtF5q53gh4IyrHXBIlPeQkvJr/ivFL7nPp6MO9SjRo6qgf.K2eK', '2022-05-08 23:28:45', 'k', 'user'),
('627827fe89557', '', '', '', '', '2022-05-08 23:28:46', '$2y$10$0XVRAdm2RErQRPevsK1DYeptgVJhje7FSv.tEszF9YibnOGMKk7Tq', '2022-05-08 23:28:46', 'k', 'user'),
('627828e9313d7', 'mfk', 'kck', 'l', 'lld', '2022-05-08 23:32:41', '$2y$10$Kg53uqrhKDZ6Z5D/bHa9HufBnlxvcJBDkYP3sSZPF/tgWRzH/qpki', '2022-05-08 23:32:41', 'k', 'user'),
('6278291bd3d9a', '', '', '', '', '2022-05-08 23:33:31', '$2y$10$DGTuCO7NHNq4Ntf6UHVgk.bnZEXbntd6vrh12mBXAUbMfIc4kf71e', '2022-05-08 23:33:31', 'k', 'user'),
('ckfk', 'kk', 'k', 'kk', 'k', '2022-05-08 23:10:27', '627823b34ff60', '2022-05-08 23:10:27', 'k', 'user'),
('ckfkkdkdkd', 'kkkkk', 'kkkkkkls', 'kkkkk', 'kkkkk', '2022-05-08 23:10:58', '627823d28d7bd', '2022-05-08 23:10:58', 'k', 'user'),
('haim', 'kkkkk', 'kkkkkkls', 'ndmdmd', 'kkkkk', '2022-05-08 23:11:19', '627823e713057', '2022-05-08 23:11:19', 'k', 'user'),
('haimke', 'll', 'll', 'll', 'll', '2022-05-08 23:14:16', '627824989503e', '2022-05-08 23:14:16', 'k', 'user'),
('haimlfl', 'll', 'll', '62782439b08a4', 'll', '2022-05-08 23:12:41', '62782439b0897', '2022-05-08 23:12:41', 'k', 'user'),
('k', 'k', 'k', '', 'l', '2022-05-08 23:01:14', 'l', '0000-00-00 00:00:00', 'l', 'l'),
('kk', 'k', 'k', 'k', 'kk', '2022-05-08 23:02:13', 'k', '2022-05-08 23:02:13', 'k', 'k'),
('kk1111111111111', 'kk1111111111111', 'kk1111111111111', 'kk1111111111111', 'kk1111111111111', '2022-05-08 23:09:23', '1', '2022-05-08 23:09:23', 'k', 'user');

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
-- Indexes for table `parametersmaster`
--
ALTER TABLE `parametersmaster`
  ADD PRIMARY KEY (`paramName`);

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
