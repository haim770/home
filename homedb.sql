-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2022 at 09:52 PM
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `checkIfAdHasValues` ()  NO SQL
BEGIN
Select distinct(ads.adID) from ad_content,ads where ads.adID=ad_content.adID and EXISTS(select 1 from ad_content where ad_content.adID = 1 and ad_content.name ='air_conditioner' and ad_content.value=1) and EXISTS (select 1 FROM ad_content where ad_content.adID = 1 and ad_content.name ='garden' and ad_content.value=4);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `checkIfValuesExistInTableAdContent` ()  READS SQL DATA
BEGIN
select ads.*,ad_content.name,ad_content.value,ad_content.display_type from ads,ad_content where ads.adID=ad_content.adID   and EXISTS (SELECT ad_content.adID FROM ad_content WHERE ad_content.name = "air_conditioner" AND ad_content.value=1)ORDER by ads.adID limit 10;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdsMathSearch` ()  BEGIN
select DISTINCT ads.adID from ads,ad_content where ads.adID=ad_content.adID   and EXISTS (SELECT ad_content.adID FROM ad_content WHERE ad_content.name = "air_conditioner" AND ad_content.value=1)ORDER by ads.adID limit 10;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllAdsWithAdContent` ()  BEGIN
select ads.*,ad_content.name,ad_content.value,ad_content.display_type from ads,ad_content WHERE ads.adID=ad_content.adID order by ads.adID;
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
SELECT * FROM `users` WHERE users.mail=mail and users.password like password;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `haimtry` ()  BEGIN
Select * from ad_content,ads
where ads.adID=ad_content.adID GROUP by ads.adID;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAd` (IN `adID` VARCHAR(255), IN `user_id` VARCHAR(255), IN `city` VARCHAR(255), IN `street` VARCHAR(255), IN `building_number` INT, IN `apartment` VARCHAR(255), IN `entry` VARCHAR(255), IN `rooms` VARCHAR(255), IN `adType` VARCHAR(255), IN `price` DOUBLE)  READS SQL DATA
BEGIN
INSERT INTO `ads` (`adID`, `create_time`, `user_id`, `active`, `contact_counter`, `watch`, `close_reason`, `expire_date`, `approval_status`, `ad_link`, `city`, `street`, `building_number`, `entry`, `apartment`, `zip_code`, `map_X`, `map_Y`, `price`, `rooms`, `adType`) VALUES (adID, current_timestamp(), user_id, '0', '0', '0', NULL, '', 'pending', 'ad link 3', city, street, building_number, entry, apartment, '3', '', '', price, rooms, adType);
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchInAdsAndInAdContent` (IN `contentS` VARCHAR(255), IN `contentV` VARCHAR(255), IN `adS` VARCHAR(255))  READS SQL DATA
BEGIN
select ads.adID from ads,ad_content where ads.city=adS and ad_content.name=contentS and ad_content.value=contentV and ads.adID=ad_content.adID
LIMIT 10;
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
  `adType` text NOT NULL,
  `price` double NOT NULL DEFAULT 0 COMMENT 'price for the property',
  `property_type` varchar(255) NOT NULL DEFAULT '''דירה''',
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `area` double NOT NULL DEFAULT 0,
  `user_id` varchar(50) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `contact_counter` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `watch` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `close_reason` text DEFAULT NULL,
  `expire_date` datetime NOT NULL,
  `approval_status` varchar(50) NOT NULL DEFAULT 'pending',
  `building_number` int(11) NOT NULL,
  `entry` varchar(10) NOT NULL,
  `apartment` varchar(10) NOT NULL,
  `zip_code` varchar(50) NOT NULL,
  `map_X` varchar(255) NOT NULL,
  `map_Y` varchar(255) NOT NULL,
  `rooms` int(11) UNSIGNED NOT NULL,
  `floor` text NOT NULL,
  `maxFloor` text NOT NULL,
  `enteringDate` varchar(255) NOT NULL,
  `propertyTaxes` double NOT NULL,
  `houseCommittee` double NOT NULL,
  `entry_date` varchar(255) NOT NULL DEFAULT 'current_timestamp()',
  `ad_link` varchar(255) NOT NULL,
  `userIdWatchSet` varchar(255) NOT NULL DEFAULT '',
  `userIdContactSet` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`adID`, `adType`, `price`, `property_type`, `city`, `street`, `area`, `user_id`, `create_time`, `active`, `contact_counter`, `watch`, `close_reason`, `expire_date`, `approval_status`, `building_number`, `entry`, `apartment`, `zip_code`, `map_X`, `map_Y`, `rooms`, `floor`, `maxFloor`, `enteringDate`, `propertyTaxes`, `houseCommittee`, `entry_date`, `ad_link`, `userIdWatchSet`, `userIdContactSet`) VALUES
('12', 'קנייה', 1, 'דירה', 'עפולה', 'street', 12, '62c7eb0759d47', '2022-05-21 18:53:41', 1, 5, 217, 'W', '2022-05-25 21:52:10', 'reject', 1, '1', '1', '1', '1', '1', 1, '', '', '', 20, 393, '2022-08-02 20:30:40', '12', '62f9480a0c7da', ''),
('2', 'קנייה', 0, 'דירה', '', '', 23, '2', '2022-08-28 05:08:33', 0, 1, 296, NULL, '2115-03-16 22:08:33', 'reject', 1, '1', '', '', '', '', 6, '', '', '', 3838, 3993, 'מיידי', '2', '', ''),
('303902', 'השכרה', 149039, 'דירה', 'חיפה', 'התיכון', 34, '62c7eb0759d47', '2022-06-29 19:55:20', 1, 12, 88, NULL, '2025-09-06 00:00:00', 'aproved', 12, '1', '1', '1', '', '', 1, '1', '3', 'מיידי', 11, 12, '2022-08-02 20:30:40', '303902', '62f9486da2ecf', ''),
('55', 'קנייה', 2002, 'דירה', 'חיפה', 'הגליל', 23, '62c7eb0759d47', '2022-05-05 13:19:11', 1, 0, 301, NULL, '0002-08-27 00:00:00', 'aproved', 1, '1', '1', '3', '', '', 5, '', '', '', 48, 9, '2022-08-02 20:30:40', '55', '62f9486da46ae', ''),
('552', 'קנייה', 2002, 'בית פרטי', 'חיפה', 'הגליל', 111111, '62c7eb0759d47', '2022-05-05 13:19:11', 1, 0, 307, NULL, '2025-02-02 21:17:08', 'aproved', 1, '1', '1', '3', '', '', 5, '', '', '', 0, 0, 'גמיש', '552', '62f948405c139', ''),
('62e81dfb9fbb0', 'קנייה', 8, 'דירה', 'צביה ', 'האלה', 88, '62c7eb0759d47', '2022-08-01 18:39:55', 1, 1, 39, NULL, '2026-06-16 00:00:00', 'aproved', 1, '8', '', '', '', '', 0, '8', '88', '', 8, 0, '2022-08-02 20:30:40', '62e81dfb9fbb0', '', ''),
('62e81ef0e6610', 'קנייה', 8, 'דירה', 'צביה ', 'האלה', 88, '62c7eb0759d47', '2022-08-01 18:44:00', 1, 1, 31, NULL, '2025-02-01 20:44:00', 'aproved', 1, '8', '', '', '', '', 3, '8', '88', '', 2, 2, '2022-08-02 20:30:40', '62e81ef0e6610', '62f9486db55fa', ''),
('62e81f00a67b5', 'קנייה', 8, 'דירה', 'צביה ', 'האלה', 88, '62c7eb0759d47', '2022-08-01 18:44:16', 1, 0, 27, NULL, '2025-02-01 20:44:16', 'aproved', 1, '8', '', '', '', '', 3, '8', '88', '', 2, 2, '2022-08-02 20:30:40', '62e81f00a67b5', '62f9486db7543', ''),
('62e81f07d3b39', 'קנייה', 8, 'דירה', 'צביה ', 'האלה', 88, '62c7eb0759d47', '2022-08-01 18:44:23', 1, 0, 33, NULL, '2025-02-01 20:44:23', 'aproved', 1, '8', '', '', '', '', 3, '8', '88', '', 2, 2, '2022-08-02 20:30:40', '62e81f07d3b39', '', ''),
('62e82a292cb67', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 19:31:53', 1, 0, 31, NULL, '2025-02-01 21:31:53', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e82a292cb67', '62f9486e5dd13', ''),
('62e82ad3a51c4', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 19:34:43', 1, 0, 26, NULL, '2025-02-01 21:34:43', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e82ad3a51c4', '', ''),
('62e82ae746c73', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 19:35:03', 1, 0, 24, NULL, '2025-02-01 21:35:03', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e82ae746c73', '', ''),
('62e82afcc0b7d', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 19:35:24', 1, 0, 23, NULL, '2025-02-01 21:35:24', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e82afcc0b7d', '62f9486df2291', ''),
('62e82b27ae14f', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 19:36:07', 1, 1, 25, NULL, '2025-02-01 21:36:07', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e82b27ae14f', '', ''),
('62e82b64d80cb', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 19:37:08', 1, 0, 25, NULL, '2025-02-01 21:37:08', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e82b64d80cb', '62f9483290c74', ''),
('62e82d9e58320', 'קנייה', 0, 'דירה', 'חיפה', 'התיכון', 48, '62c7eb0759d47', '2022-08-01 19:46:38', 1, 0, 27, NULL, '2025-02-01 21:46:38', 'aproved', 5, '', '', '', '', '', 12, '', '', '', 23, 400, '2022-08-02 20:30:40', '62e82d9e58320', '', ''),
('62e8309e4d0f2', 'קנייה', 1, 'דירה', 'קצר א-סר ', '', 1, '62c7eb0759d47', '2022-08-01 19:59:26', 1, 0, 27, NULL, '2025-02-01 21:59:26', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e8309e4d0f2', '62f9486f43944', ''),
('62e831ff47caf', 'קנייה', 1, 'דירה', 'קצר א-סר ', 'קצר א-סר', 1, '62c7eb0759d47', '2022-08-01 20:05:19', 1, 0, 10, NULL, '2025-02-18 22:38:16', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e831ff47caf', '62f9486f452a8', ''),
('62e835b9eb54f', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 59, '62c7eb0759d47', '2022-08-01 20:21:13', 1, 0, 31, NULL, '2025-02-01 22:21:13', 'aproved', 1, '1', '1', '1', '', '', 1, '1', '1', 'מיידי', 1, 1, '2022-08-02 20:30:40', '62e835b9eb54f', '', ''),
('62e8361f73e6d', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 959, '62c7eb0759d47', '2022-08-01 20:22:55', 1, 0, 46, NULL, '2027-10-29 00:00:00', 'aproved', 1, '1', '1', '1', '', '', 1, '1', '1', 'מיידי', 1, 1, '2022-08-02 20:30:40', '62e8361f73e6d', '', ''),
('62e837e90f94f', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 20:30:33', 1, 0, 30, NULL, '0000-00-00 00:00:00', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e837e90f94f', '', ''),
('62e83be3959d5', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 20:47:31', 1, 0, 52, NULL, '2025-02-01 22:47:31', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83be3959d5', '', ''),
('62e83c0f82a8e', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 20:48:15', 1, 0, 29, NULL, '0000-00-00 00:00:00', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83c0f82a8e', '62fa6961100fd', ''),
('62e83e320ed55', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 20:57:22', 1, 0, 35, NULL, '0000-00-00 00:00:00', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83e320ed55', '', ''),
('62e83e3e80d36', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 20:57:34', 0, 0, 2, NULL, '2025-02-01 22:57:34', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83e3e80d36', '', ''),
('62e83e4d85e53', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 20:57:49', 0, 0, 0, NULL, '2025-02-01 22:57:49', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83e4d85e53', '62f9487021064', ''),
('62e83ea464047', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 20:59:16', 0, 0, 0, NULL, '2025-02-01 22:59:16', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83ea464047', '62f9487047e33', ''),
('62e83ed769907', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 21:00:07', 0, 0, 0, NULL, '2025-02-01 23:00:07', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83ed769907', '62f9487055745', ''),
('62e83ed8a9379', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 21:00:08', 0, 0, 1, NULL, '2025-02-01 23:00:08', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83ed8a9379', '62f9487088b22', ''),
('62e83ee979933', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 21:00:25', 0, 0, 0, NULL, '2025-02-01 23:00:25', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83ee979933', '62f9487088b23', ''),
('62e83f0827d3a', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 21:00:56', 1, 6, 37, NULL, '0000-00-00 00:00:00', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83f0827d3a', '62fa69601aa99', ''),
('62e83f19278e1', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-01 21:01:13', 0, 1, 43, NULL, '2025-02-01 23:01:13', 'reject', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '62e83f19278e1', '', ''),
('62e95cce4de81', 'קנייה', 1, 'דירה', 'אבו עבדון (שבט) ', 'אבו עבדון (שבט)', 1, '62c7eb0759d47', '2022-08-02 17:20:14', 0, 0, 98, NULL, '2025-02-02 19:20:14', 'reject', 1, '1', '', '', '', '', 1, '1', '1', '', 2, 2, '2022-08-02 20:30:40', '62e95cce4de81', '', ''),
('62e95d3c18f47', 'קנייה', 1, 'דירה', 'סנסנה ', 'סנסנה', 7, '62c7eb0759d47', '2022-08-02 17:22:04', 1, 1, 300, NULL, '2022-02-28 10:44:40', 'aproved', 1, '1', '', '', '', '', 1, '1', '112', '', 1, 1, 'גמיש', '62e95d3c18f47', '', ''),
('62e9741668320', 'השכרה', 4848, 'דירה', 'אעצם (שבט) ', 'אעצם (שבט)', 1, '62c7eb0759d47', '2022-08-02 18:59:34', 0, 0, 0, NULL, '2025-02-02 20:59:34', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '1999-11-11', '62e9741668320', '62f94870ae7ce', ''),
('62e9749d3a01e', 'השכרה', 4848, 'דירה', 'אעצם (שבט) ', 'אעצם (שבט)', 1, '62c7eb0759d47', '2022-08-02 19:01:49', 0, 0, 23, NULL, '2025-02-02 21:01:49', 'reject', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, 'גמיש', '62e9749d3a01e', '', ''),
('62e9750369bcb', 'קנייה', 4848, 'בית פרטי', 'אעצם (שבט) ', 'אעצם (שבט)', 1, '62c7eb0759d47', '2022-08-02 19:03:31', 0, 0, 11, NULL, '2025-02-02 21:03:31', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, 'גמיש', '62e9750369bcb', '', ''),
('62eab4f0265c8', 'קנייה', 1, 'דירה', 'סנסנה ', 'סנסנה', 1, '62c7eb0759d47', '2022-08-03 17:48:32', 0, 1, 34, NULL, '2025-02-03 19:48:32', 'reject', 1, '1', '', '', '', '', 1, '1', '1', '', 3243, 1, 'גמיש', '62eab4f0265c8', '', ''),
('62ef7d1be4219', 'קנייה', 1, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '62c7eb0759d47', '2022-08-07 08:51:39', 0, 6, 22, NULL, '2025-02-07 10:51:39', 'declined', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d1be4219', '', ''),
('62ef7d47e399b', 'קנייה', 1, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '62c7eb0759d47', '2022-08-07 08:52:23', 0, 0, 4, NULL, '2025-02-07 10:52:23', 'declined', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d47e399b', '62f55f9e44251', ''),
('62ef7d4fe5f90', 'קנייה', 1, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '62c7eb0759d47', '2022-08-07 08:52:31', 0, 0, 46, NULL, '2025-02-11 00:48:08', 'reject', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d4fe5f90', '', ''),
('62ef7d5c4cd51', 'קנייה', 24, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '6308e3a2849f3', '2022-08-11 17:52:44', 1, 7, 314, NULL, '2022-03-31 19:11:58', 'approved', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d5c4cd51', '', ''),
('62ef7d7d30008', 'השכרה', 1, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '62c7eb0759d47', '2022-08-07 08:53:17', 0, 0, 58, NULL, '2025-02-09 21:10:00', 'declined', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d7d30008', '62f528ac3527f', ''),
('62f16fe877201', 'קנייה', 32, 'בית פרטי', 'קצר א-סר ', 'קצר א-סר', 2, '62c7eb0759d47', '2022-08-08 20:19:52', 0, 0, 0, NULL, '2025-02-08 22:19:52', 'declined', 2, '1', '', '', '', '', 2, '2', '2', '', 1, 1, 'מיידי', '62f16fe877201', '', ''),
('62f170398ef46', 'קנייה', 32, 'בית פרטי', 'קצר א-סר ', 'קצר א-סר', 2, '62c7eb0759d47', '2022-08-08 20:21:13', 0, 1, 45, NULL, '2025-02-08 22:21:13', 'reject', 2, '1', '', '', '', '', 2, '2', '2', '', 1, 1, 'מיידי', '62f170398ef46', '62fa694e28f89', ''),
('62f2627b5972e', 'קנייה', 1, '', 'כמאנה ', 'כמאנה', 1, '2', '2022-08-09 13:34:51', 1, 0, 14, NULL, '2025-02-09 15:34:51', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '', '62f2627b5972e', '62f94870eb5f5', ''),
('62f26364846a4', 'קנייה', 1, '', 'כמאנה ', 'כמאנה', 1, '62c7eb0759d47', '2022-08-09 13:38:44', 0, 0, 65, NULL, '2022-08-09 15:38:44', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '', '62f26364846a4', '', ''),
('62f263681627e', 'קנייה', 1, '', 'כמאנה ', 'כמאנה', 1, '2', '2022-08-09 13:38:48', 1, 0, 173, NULL, '2022-08-09 15:38:48', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '', '62f263681627e', '', ''),
('62f41963f1aeb', 'קנייה', 1, 'דירה', 'קצר א-סר ', 'קצר א-סר', 1, '62c7eb0759d47', '2022-08-10 20:47:32', 0, 0, 7, NULL, '2115-03-10 22:47:32', 'declined', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, 'מיידי', '62f41963f1aeb', '', ''),
('630b982ca3319', 'קנייה', 1000, 'בית פרטי', 'קצר א-סר ', 'קצר א-סר', 54, '6308e3a2849f3', '2022-08-28 16:30:36', 0, 0, 2, NULL, '2025-03-01 18:58:47', 'declined', 1, '1', '', '', '', '', 2, '2', '5', '', 138, 555, 'גמיש', '630b982ca3319', '', ''),
('6310e5950d2e4', 'קנייה', 2, 'דירה', 'כמאנה ', 'כמאנה', 2, '2', '2022-09-01 17:02:13', 0, 0, 0, NULL, '2031-01-01 19:02:13', 'declined', 4, '3', '', '', '', '', 22, '1', '2', '', 53, 55, 'מיידי', '6310e5950d2e4', '', ''),
('6310e5ab9080b', 'קנייה', 2, 'דירה', 'כמאנה ', 'כמאנה', 2, '2', '2022-09-01 17:02:35', 0, 0, 83, NULL, '2031-01-01 19:02:35', 'reject', 4, '3', '', '', '', '', 22, '1', '2', '', 9393, 55, 'מיידי', '6310e5ab9080b', '', ''),
('6310e5c9a0f97', 'קנייה', 2, 'דירה', 'כמאנה ', 'כמאנה', 2, '6308e3a2849f3', '2022-09-01 17:03:05', 0, 1, 50, NULL, '2031-01-01 19:03:05', 'reject', 4, '3', '', '', '', '', 22, '1', '2', '', 8383, 3, 'מיידי', '6310e5c9a0f97', '', ''),
('6310e6633b61e', 'קנייה', 2, 'דירה', 'כמאנה ', 'כמאנה', 2, '6308e3a2849f3', '2022-09-01 17:05:39', 0, 0, 0, NULL, '2031-01-01 19:05:39', 'declined', 4, '3', '', '', '', '', 22, '1', '2', '', 393, 23, 'מיידי', '6310e6633b61e', '', ''),
('6310e6d4e271f', 'קנייה', 2, 'דירה', 'כמאנה ', 'כמאנה', 2, '6308e3a2849f3', '2022-09-01 17:07:32', 0, 0, 48, NULL, '2031-01-01 19:07:32', 'reject', 4, '3', '', '', '', '', 22, '1', '2', '', 2828, 393, 'מיידי', '6310e6d4e271f', '', ''),
('633025380f00d', 'קנייה', 2222222, 'בית פרטי', 'חיפה ', 'א\"ת מפרץ(צפון-מזרח)', 12, '6314c734aea38', '2022-09-25 09:54:00', 0, 0, 28, NULL, '2032-02-29 00:00:00', 'reject', 12, '12', '', '', '', '', 1, '1', '12', '', 1222, 100, 'גמיש', '633025380f00d', '', ''),
('633b31e322971', 'קנייה', 12, 'בית פרטי', 'אבו תלול ', 'אבו תלול', 12, '62c7eb0759d47', '2022-10-03 19:02:59', 0, 0, 3, NULL, '2031-02-03 21:02:59', 'reject', 12, '1', '', '', '', '', 0, '1', '1', '', 1, 1, 'מיידי', '633b31e322971', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `ad_content`
--

CREATE TABLE `ad_content` (
  `element_id` varchar(255) NOT NULL,
  `adID` varchar(255) NOT NULL COMMENT 'when master is active adid will be zero (0)',
  `category` varchar(255) NOT NULL DEFAULT 'all' COMMENT 'exp, rent, buy...',
  `master` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'defind if row is for new add properties',
  `min_value` double DEFAULT NULL COMMENT 'min value will appear only for chooseing parameter to set minmum row value',
  `max_value` double DEFAULT NULL COMMENT 'min value will appear only for chooseing parameter to set minmum row value',
  `icon` varchar(255) NOT NULL DEFAULT '' COMMENT 'use to set the row thumbnail show in ad',
  `free_text` text NOT NULL DEFAULT '',
  `required` tinyint(1) DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `display_type` text NOT NULL DEFAULT 'text',
  `value` text NOT NULL,
  `prevDisplay` tinyint(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ad_content`
--

INSERT INTO `ad_content` (`element_id`, `adID`, `category`, `master`, `min_value`, `max_value`, `icon`, `free_text`, `required`, `name`, `display_type`, `value`, `prevDisplay`) VALUES
('34453', '0', 'השכרה', 1, 1, 33, '', 'גינה', 0, 'גינה', 'text', '1', 0),
('44', '0', 'קנייה', 1, NULL, NULL, '', 'מזגן1', 0, 'מזגן1', 'checkBox', '0', 0),
('62bedb288d88c', '0', 'השכרה', 1, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'checkBox', '1233', 0),
('62bedc11bfbd5', '0', 'השכרה', 1, NULL, NULL, '', 'ניסוי', 0, 'ניסוי', 'text', 'master', 0),
('62dab4ca33dab', '0', 'השכרה', 1, 1, 100, '', 'renthAIM', 0, 'renthAIM', 'text', 'master', 0),
('62e81ad249162', '62e81ad2431e3', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '1', 0),
('62e81ae33f391', '62e81ae33b59c', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'dk', 0),
('62e81ae343301', '62e81ae33b59c', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81d55deece', '62e81d55d745d', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'kd', 0),
('62e81d55e5f2e', '62e81d55d745d', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81d55e7e66', '62e81d55d745d', 'buy', 0, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', 'kfk', 0),
('62e81dfba143a', '62e81dfb9fbb0', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'kd', 0),
('62e81dfba2c95', '62e81dfb9fbb0', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81ef0ea8cb', '62e81ef0e6610', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'ki', 0),
('62e81ef0ec3f8', '62e81ef0e6610', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81f00a76cd', '62e81f00a67b5', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'd', 0),
('62e81f00a862c', '62e81f00a67b5', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81f07d9fdd', '62e81f07d3b39', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '', 0),
('62e81f07de338', '62e81f07d3b39', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81f2fd516b', '62e81f2fd1299', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '', 0),
('62e81f2fd6378', '62e81f2fd1299', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81f31c1cc5', '62e81f31c09d5', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'd', 0),
('62e81f31c70d3', '62e81f31c09d5', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81f329a890', '62e81f3299a50', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'd', 0),
('62e81f329b741', '62e81f3299a50', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81f6be0e0d', '62e81f6bdcef3', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'd', 0),
('62e81f6be4b07', '62e81f6bdcef3', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e81f7873f8e', '62e81f7872d73', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'd', 0),
('62e81f7874ec4', '62e81f7872d73', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e82007c4304', '62e82007c34b2', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'd', 0),
('62e82007c9358', '62e82007c34b2', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e820222ee51', '62e8202229b65', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'd', 0),
('62e8202232b53', '62e8202229b65', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e8203299c83', '62e8203298e10', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '', 0),
('62e820329ad22', '62e8203298e10', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e827d65ece3', '2', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e827d65feac', '2', 'buy', 0, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', 'לג', 0),
('62e82f9333a50', '62e82f932bfac', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e835b9f416b', '62e835b9eb54f', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'air_conditioner', 'checkBox', '1', 0),
('62e8361f7c9e8', '62e8361f73e6d', 'קנייה', 0, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', 'd', 0),
('62e837e91face', '62e837e90f94f', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e837e9213ec', '62e837e90f94f', 'buy', 0, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', 'דג', 0),
('62e83be3997e4', '62e83be3959d5', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83c0f90412', '62e83c0f82a8e', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83e3216b47', '62e83e320ed55', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83e3e8ef9c', '62e83e3e80d36', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83e4d94538', '62e83e4d85e53', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83ea46d364', '62e83ea464047', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83ed76c147', '62e83ed769907', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83ed8b76d5', '62e83ed8a9379', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83ee97f7f6', '62e83ee979933', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83f0834763', '62e83f0827d3a', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e83f1933a3c', '62e83f19278e1', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e95cce5b624', '62e95cce4de81', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '0', 0),
('62e95cce5cd8b', '62e95cce4de81', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62e95cce5eecd', '62e95cce4de81', 'buy', 0, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', '123', 0),
('62e978343828e', '552', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62eab4f036842', '62eab4f0265c8', 'קנייה', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62eab4f03a7b2', '62eab4f0265c8', 'קנייה', 0, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', 'גלגלחל', 0),
('62ef7d1bf1156', '62ef7d1be4219', 'קנייה', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '', 0),
('62ef7d1bf33e0', '62ef7d1be4219', 'קנייה', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62ef7d47eea23', '62ef7d47e399b', 'קנייה', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '', 0),
('62ef7d47ef69f', '62ef7d47e399b', 'קנייה', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62f16fe87cf29', '62f16fe877201', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('62f16fe884227', '62f16fe877201', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '0', 0),
('62f17039954c6', '62f170398ef46', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('62f170399a208', '62f170398ef46', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '0', 0),
('62f2627b60d3f', '62f2627b5972e', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('62f263648c23e', '62f26364846a4', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('62f2636823f98', '62f263681627e', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('62f263792b8e9', '62f2637926913', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('62f2637b5b5c5', '62f2637b51453', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('62f263e98bb67', '62f263e9826b5', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('62f2642e34279', '62f2642e2825b', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('62f2b10809a21', '62ef7d7d30008', 'השכרה', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', 'בבבב', 0),
('62f2b1080f5f2', '62ef7d7d30008', 'השכרה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('62f419640d8ea', '62f41963f1aeb', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', 'DKDK', 0),
('62f419640eace', '62f41963f1aeb', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('62f419640fc03', '62f41963f1aeb', 'קנייה', 0, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', 'FLF', 0),
('62f419641546c', '62f41963f1aeb', 'קנייה', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '0', 0),
('62f42a2565f7a', '62ef7d5c4cd51', 'קנייה', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62f42a256835d', '62ef7d5c4cd51', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('62f435a86ff5c', '62ef7d4fe5f90', 'קנייה', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '10', 0),
('62f435a87588d', '62ef7d4fe5f90', 'קנייה', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62fbf9412bf47', '62fbf94121997', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', '', 0),
('630b2af8bd392', '62e95d3c18f47', 'קנייה', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('630b2af8c058b', '62e95d3c18f47', 'קנייה', 0, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', 'c', 0),
('630b2af8c2d7d', '62e95d3c18f47', 'קנייה', 0, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', 'dkdk', 0),
('630b2af8c5268', '62e95d3c18f47', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('6310e4c798637', '630b982ca3319', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('6310e59510376', '6310e5950d2e4', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('6310e5ab965ac', '6310e5ab9080b', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('6310e5c9a5d6b', '6310e5c9a0f97', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('6310e66340566', '6310e6633b61e', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('6310e6d4e706e', '6310e6d4e271f', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'text', '1', 0),
('63111145db622', '0', 'קנייה', 1, NULL, NULL, '', 'ממבמב', 0, 'ממבמב', 'checkBox', 'master', 0),
('6314cd4216dd5', '0', 'השכרה', 1, NULL, NULL, '', 'kfkf', 0, 'kfkf', 'input', 'master', 0),
('63302538168d6', '633025380f00d', 'קנייה', 0, NULL, NULL, '', 'ממבמב', 0, 'ממבמב', 'text', '', 0),
('6330253818883', '633025380f00d', 'קנייה', 0, NULL, NULL, '', 'מזגן1', 0, 'מזגן1', 'text', '1', 0),
('633b31e32a4eb', '633b31e322971', 'קנייה', 0, NULL, NULL, '', 'ממבמב', 0, 'ממבמב', 'text', '', 0),
('633b31e32bed3', '633b31e322971', 'קנייה', 0, NULL, NULL, '', 'מזגן1', 0, 'מזגן1', 'text', '1', 0),
('9', '0', 'השכרה', 1, NULL, NULL, ' ', 'דרוש שיפוץ', 0, 'דרוש שיפוץ', 'checkBox', '0', 0);

-- --------------------------------------------------------

--
-- Table structure for table `blogcomments`
--

CREATE TABLE `blogcomments` (
  `id` varchar(255) NOT NULL,
  `blogId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogcomments`
--

INSERT INTO `blogcomments` (`id`, `blogId`, `userId`, `title`, `content`, `create_time`, `status`) VALUES
('630292e38c9d2', '2', 'guest', 'ckc', 'kfikf', '2022-09-29 19:24:31', 1),
('63029309a279c', '4', 'guest', 'ckc', 'kfikf', '2022-08-21 20:18:17', 1),
('6302933c1b7a9', '4', 'guest', 'jhhnev,fkfk', 'dkdk', '2022-08-23 20:40:19', 1),
('63029363bc459', '4', 'guest', 'jhhnev', 'jhho', '2022-08-21 20:19:47', 1),
('6302994527857', '1', '62e0438f6d8ac', 'kdfk', 'lfkf', '2022-08-21 21:15:04', 0),
('6305258c685af', '1', '62e0438f6d8ac', 'kdfkdf', 'lfkfk', '2022-08-23 19:07:56', 1),
('63053607423eb', '', '62e0438f6d8ac', 'lfkfk', 'חחחחחחחחחחחחחחחח', '2022-08-23 20:18:15', 1),
('6305365c6dbd1', '', '62e0438f6d8ac', 'lfkfk', 'חחחחחחחחחחחחחחחחחח', '2022-08-23 20:19:40', 1),
('630536931d326', '1', '62e0438f6d8ac', 'lfkfk', 'ש', '2022-08-23 20:29:05', 1),
('630538a56fb05', '4', '62e0438f6d8ac', 'לגלגd', 'd', '2022-08-23 20:34:47', 1),
('63067f27667f3', '2', '62e0438f6d8ac', '13', 'אחד העם 1', '2022-08-24 19:42:31', 1),
('63067f36cd399', '2', '62e0438f6d8ac', '12', 'ךגך', '2022-08-24 19:42:46', 1),
('63067f860efc7', '2', '62e0438f6d8ac', 'תוכן', 'כותרת', '2022-08-24 19:44:21', 0),
('6334a7254a481', '2', '62c7eb0759d47', 'כותרת', 'תוכן', '2022-09-28 19:57:25', 1),
('63471d2768fcc', '2', 'guest', 'kkdkdk', 'kdkdkdkd', '2022-10-12 20:01:43', 1);

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
  `cover_image` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `subCategory` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`blog_id`, `create_time`, `status`, `title`, `userId`, `content`, `update_time`, `views`, `cover_image`, `category`, `subCategory`) VALUES
('1', '2022-08-04 23:10:33', 'links', 'לינקים שימושיים', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-04 23:10:33', 10, 'designer-1.jpg', 'links', ',לינקים'),
('2', '2022-08-04 23:12:56', 'Draft', 'Milan Places That Highlight The City', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-04 23:12:56', 25, 'f67396fc3cfce63a28e07ebb35d974ac.jpg', 'travel', 'vacation,holidays,sightseeing'),
('3', '2022-08-04 23:13:12', 'Draft', 'Online Shopping – An Alternative to Shopping in the Mall', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-04 23:13:12', 3, 'fQwuyKJ9qxjSbr6REcgtmW-1200-80.jpg', 'shopping', 'e-commerce store,clothing,shopping store'),
('4', '2022-08-04 23:13:22', 'Draft', 'ADVENTURE IN YOU', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-04 23:13:22', 2, 'graphic-design-trends.png', 'adventure', 'adrenaline,stay-fit,lifestyle'),
('5', '2022-08-05 00:24:17', 'close', '7 CSS tools you should be using', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-05 00:24:17', 3, 'designer-1.jpg', 'development', '[\"frontend\", \"ui/ux\", \"design\"]'),
('6', '2022-08-05 00:24:26', 'Draft', '7 CSS tools you should be using', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-05 00:24:26', 2, 'designer-1.jpg', 'development', '[\"frontend\", \"ui/ux\", \"design\"]'),
('62f540ca6c818', '2022-08-11 20:47:54', 'Draft', 'חיים', '62e0438f6d8ac', 'אני כאן', '2022-08-11 20:47:54', 3, '3d5a58e10209e789FinelProject-Use case Diagram.drawio (1).png', 'כל הקטגוריות', 'מים,סבון'),
('7', '2022-08-05 00:24:36', 'Draft', '7 CSS tools you should be using', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-05 00:24:36', 3, 'designer-1.jpg', 'development', '[\"frontend\", \"ui/ux\", \"design\"]');

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

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`favorite_id`, `userId`, `AdId`, `create_time`) VALUES
('62e03fbfee30a', '62bcc7b1b59ef', '12', '2022-07-26 22:25:51'),
('62e04079d78ce', '62bcc7b1b59ef', '2', '2022-07-26 22:28:57'),
('62e0407c1386f', '62bcc7b1b59ef', '55', '2022-07-26 22:29:00'),
('62e0407dd64ca', '62bcc7b1b59ef', '303902', '2022-07-26 22:29:01'),
('62e0413e4566f', '62bcc7b1b59ef', '62c74518d217e', '2022-07-26 22:32:14'),
('62e04140875ee', '62bcc7b1b59ef', '62c744cecc951', '2022-07-26 22:32:16'),
('62e0414f61ac2', '62bcc7b1b59ef', '62c8136760120', '2022-07-26 22:32:31'),
('62e04151e51fd', '62bcc7b1b59ef', '62c745970dcb0', '2022-07-26 22:32:33'),
('62e0415386b0c', '62bcc7b1b59ef', '62c81335b3f17', '2022-07-26 22:32:35'),
('62e041575efa1', '62bcc7b1b59ef', '62c74518d217e', '2022-07-26 22:32:39'),
('62e041590d9de', '62bcc7b1b59ef', '62c744cecc951', '2022-07-26 22:32:41'),
('62e0415b63194', '62bcc7b1b59ef', '62c7199486eaf', '2022-07-26 22:32:43'),
('62e0415d2deb5', '62bcc7b1b59ef', '303902', '2022-07-26 22:32:45'),
('62e0415e4a5a2', '62bcc7b1b59ef', '55', '2022-07-26 22:32:46'),
('62e041601780a', '62bcc7b1b59ef', '2', '2022-07-26 22:32:48'),
('62e041619d7e8', '62bcc7b1b59ef', '12', '2022-07-26 22:32:49'),
('62e04ef45e8c5', '62e0438f6d8ac', '62c5ee073f23b', '2022-07-26 23:30:44'),
('62e6fb910b529', '62e0438f6d8ac', '62c5ee073f23b', '2022-08-01 01:00:49'),
('62e6fb92d5d64', '62e0438f6d8ac', '62c7199486eaf', '2022-08-01 01:00:50'),
('62e7d180bb8ff', '62e0438f6d8ac', '62c5ee073f23b', '2022-08-01 16:13:36'),
('62e7d29facb8c', '62e0438f6d8ac', '62c745970dcb0', '2022-08-01 16:18:23'),
('62e7d2a17ec04', '62e0438f6d8ac', '62c8136760120', '2022-08-01 16:18:25'),
('62e95e0533738', '62e0438f6d8ac', '62e95d3c18f47', '2022-08-02 20:25:25'),
('62ec22d8c400a', '62e0438f6d8ac', '303902', '2022-08-04 22:49:44'),
('62ec22d9f0467', '62e0438f6d8ac', '303902', '2022-08-04 22:49:45'),
('62f16e34d73e5', '62e0438f6d8ac', '62ef7d7d30008', '2022-08-08 23:12:36'),
('62f4a83960cc5', '62e0438f6d8ac', '62ef7d47e399b', '2022-08-11 09:56:57'),
('62f525c9433b8', '62e0438f6d8ac', '62ef7d7d30008', '2022-08-11 18:52:41'),
('62fa91f89cc7a', '62e0438f6d8ac', '62e95d3c18f47', '2022-08-15 21:35:36'),
('62fa91fa95988', '62e0438f6d8ac', '62e95d3c18f47', '2022-08-15 21:35:38'),
('62fa91fb4accc', '62e0438f6d8ac', '62e95d3c18f47', '2022-08-15 21:35:39'),
('6307f40a8c454', '62e0438f6d8ac', '62e81f00a67b5', '2022-08-26 01:13:30'),
('6307f40d2fca5', '62e0438f6d8ac', '303902', '2022-08-26 01:13:33'),
('63088e4463d30', '62e0438f6d8ac', '2', '2022-08-26 12:11:32'),
('63088e45c86ba', '62e0438f6d8ac', '2', '2022-08-26 12:11:33'),
('63088e494fc0c', '62e0438f6d8ac', '2', '2022-08-26 12:11:37'),
('63088e4ae1636', '62e0438f6d8ac', '2', '2022-08-26 12:11:38'),
('630a8d21d10d9', '6308e3a2849f3', '62e81ef0e6610', '2022-08-28 00:31:13'),
('630b999349c1a', '6308e3a2849f3', '62e81ef0e6610', '2022-08-28 19:36:35'),
('630b9cf0cf11f', '6308e3a2849f3', '62e83f0827d3a', '2022-08-28 19:50:56'),
('630b9cf23765c', '6308e3a2849f3', '62e83f0827d3a', '2022-08-28 19:50:58'),
('630b9cf2c5eb1', '6308e3a2849f3', '62e83f0827d3a', '2022-08-28 19:50:58'),
('630b9cf2ee1ec', '6308e3a2849f3', '62e83f0827d3a', '2022-08-28 19:50:58'),
('630b9cf32033f', '6308e3a2849f3', '62e83f0827d3a', '2022-08-28 19:50:59'),
('6310e8adf158e', '6308e3a2849f3', '2', '2022-09-01 20:15:26'),
('633b3649687ac', '62c7eb0759d47', '6310e5ab9080b', '2022-10-03 22:21:45'),
('635175067f393', '62c7eb0759d47', '6310e6d4e271f', '2022-10-20 19:19:18');

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

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `userId`, `adId`, `create_time`) VALUES
('631a271b0d2f5', '6314c734aea38', '2', '0000-00-00 00:00:00'),
('631a27c0e9892', '6314c734aea38', '62e95d3c18f47', '2022-09-08 20:34:56'),
('631b23b2aaf81', '6314c734aea38', '6310e5ab9080b', '2022-09-09 14:29:54'),
('633021761a813', '6314c734aea38', '62e82ad3a51c4', '2022-09-25 12:37:58'),
('63349608ed380', '62c7eb0759d47', '6310e5c9a0f97', '0000-00-00 00:00:00'),
('63360ba68be12', '62c7eb0759d47', '303902', '2022-09-30 00:18:30'),
('633a06fe028f2', '62c7eb0759d47', '62e81dfb9fbb0', '0000-00-00 00:00:00'),
('633f3f68cecbf', '62c7eb0759d47', '633b31e322971', '0000-00-00 00:00:00'),
('633f40177614c', '62c7eb0759d47', '2', '0000-00-00 00:00:00'),
('633f40efc067c', '62c7eb0759d47', '6310e5ab9080b', '0000-00-00 00:00:00'),
('6345b2f85d38c', '62c7eb0759d47', '62f2627b5972e', '0000-00-00 00:00:00'),
('6350581fc3a3f', '62c7eb0759d47', '633025380f00d', '2022-10-19 23:03:43'),
('6350585d4b0f5', '62c7eb0759d47', '6310e6d4e271f', '0000-00-00 00:00:00'),
('635175aa635fe', '62c7eb0759d47', '62e81ef0e6610', '2022-10-20 19:22:02'),
('6351967abd921', '62c7eb0759d47', '12', '0000-00-00 00:00:00'),
('63519904dceb5', '62c7eb0759d47', '55', '2022-10-20 21:52:52'),
('6351996f08d37', '62c7eb0759d47', '62e83ed8a9379', '2022-10-20 21:54:39'),
('63519cb3c09f7', '62c7eb0759d47', '62e95d3c18f47', '2022-10-20 22:08:35');

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
  `status` varchar(255) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`linkId`, `create_time`, `userId`, `link_content`, `link`, `views`, `status`) VALUES
('1', '2022-08-21 00:13:37', '1', 'fkkfkfkfk', 'link', 1, '1'),
('2', '2022-08-21 00:13:37', '2', 'kvkkkv', 'link2', 0, ''),
('3', '2022-08-21 01:30:25', '3', '3', '3', 3, '3'),
('6301638acee0b', '2022-08-21 01:43:22', '62e0438f6d8ac', 'f', 'd', 0, 'deleted'),
('630163a4ba36e', '2022-08-21 01:43:48', '62e0438f6d8ac', 'f', 'fd', 0, 'deleted'),
('630168818dd80', '2022-08-21 02:04:33', '62e0438f6d8ac', 'kckkdkd', 'kddkkdkkd', 0, 'deleted'),
('6301699a05db9', '2022-08-21 02:09:14', '62e0438f6d8ac', 'www.google.com', 'www.google.com', 0, 'active'),
('63016bd762f49', '2022-08-21 02:18:47', '62e0438f6d8ac', 'facebook', 'www.facebook.com', 0, 'active');

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

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`msgid`, `adId`, `sender`, `receiver`, `message`, `files`, `dateMsg`, `seen`, `received`, `delete_sender`, `delete_receiver`, `newUpdate`) VALUES
('1', '1', '2', '6308e3a2849f3', 'hi', '1', '0000-00-00 00:00:00', 1, 1, 0, 0, 0),
('2\r\n', '1', '6308e3a2849f3', '2', 'hello', '', '2022-08-28 19:46:12', 0, 0, 0, 0, 0),
('630bfe6960ce0', '', '62c7ebda1e8f3', '62c7eb0759d47', 'ldl', '', '2022-08-29 02:46:49', 1, 1, 0, 0, 1),
('630bfe6b15577', '', '6308e3a2849f3', '6308e3a2849f3', 'd', '', '2022-08-29 02:46:51', 1, 1, 0, 0, 1),
('630bfe6ded996', '', '6308e3a2849f3', '62c7eb0759d47', 'ldl', '', '2022-08-29 02:46:53', 1, 1, 0, 0, 1),
('630cf7fa55d4d', '', '62c7ed85ef2d8', '62c7eb0759d47', 'חיים', '', '2022-08-29 20:31:38', 1, 1, 0, 0, 1),
('630cf7fbbeffc', '', '6308e3a2849f3', '62c7eb0759d47', 'ldld', '', '2022-08-29 20:31:39', 1, 1, 0, 0, 1),
('6314c6022a480', '', '62c7eb0759d47', '2', 'kfkf', '', '2022-10-03 00:15:13', 0, 0, 0, 0, 0),
('6314c6022a48d', '', '62c7eb0759d47', '62c7ebda1e8f3', 'kdkd', '', '2022-10-03 00:15:22', 0, 0, 0, 0, 0),
('633025e7dbe37', '', '6314c734aea38', '6314c40b67d94', 'חחדח', '', '2022-09-25 12:56:55', 1, 1, 0, 0, 1),
('6339f7e280171', '', '62c7ed85ef2d8', '6314c734aea38', 'kfkf', '', '2022-10-02 23:43:14', 0, 0, 0, 0, 0),
('6339f7e3d1989', '', '62c7eb0759d47', '6308e3a2849f3', 'f', '', '2022-10-02 23:43:15', 0, 0, 0, 0, 0),
('6339f7e43a731', '', 'haimke', '6314c734aea38', 'f', '', '2022-10-02 23:43:16', 0, 0, 0, 0, 0),
('6339f7e46990a', '', '62c7eb0759d47', 'haimke', 'f', '', '2022-10-02 23:43:16', 0, 0, 0, 0, 0),
('6339f7e48ff46', '', '2', '6314c734aea38', 'f', '', '2022-10-02 23:43:16', 0, 0, 0, 0, 0),
('6339ff6073f6f', '', '62c7eb0759d47', '6314c734aea38', 'klfkfkf', '', '2022-10-03 00:15:12', 0, 0, 0, 0, 0),
('6339ff6204ad1', '', '62c7eb0759d47', '62c73834b2320', ',fkflk', '', '2022-10-03 00:15:14', 0, 0, 0, 0, 0),
('6339ff6b042b1', '', '62c7eb0759d47', '62bcc7b1b59ef', 'kdkd', '', '2022-10-03 00:15:23', 0, 0, 0, 0, 0),
('6339ff6baf35a', '', '6314c6022a480', '6314c734aea38', 'kdkd', '', '2022-10-03 00:15:23', 0, 0, 0, 0, 0),
('6339ffadbd8cd', '', '2', '6314c734aea38', 'fkdfk', '', '2022-10-03 00:16:29', 0, 0, 0, 0, 0),
('6339ffaf586f4', '', '62c7eb0759d47', '6308dec066530', 'ldd', '', '2022-10-03 00:16:31', 0, 0, 0, 0, 0),
('6339ffbe9f49e', '', '62c7eb0759d47', '6314c6022a480', 'dld', '', '2022-10-03 00:16:46', 0, 0, 0, 0, 0),
('633b0ef6e8edb', '', '6308e3a2849f3', '62c7eb0759d47', '62c7eb0759d47', '', '2022-10-03 19:33:58', 1, 1, 0, 0, 1),
('6345b1bbb53ab', '', '62c7eb0759d47', '6308e3a2849f3', 'fkfk', '', '2022-10-11 21:11:07', 0, 0, 0, 0, 0),
('6346ce7738134', '', '62c7eb0759d47', '6308e3a2849f3', 'dkkkdfkfdkfd', '', '2022-10-12 17:25:59', 0, 0, 0, 0, 0),
('6346ce78156d4', '', '62c7eb0759d47', '6308e3a2849f3', 'kfksdkfs', '', '2022-10-12 17:26:00', 0, 0, 0, 0, 0),
('6346ce78ea588', '', '62c7eb0759d47', '6308e3a2849f3', 'kfskfkfs', '', '2022-10-12 17:26:00', 0, 0, 0, 0, 0),
('6346ce7990a8e', '', '62c7eb0759d47', '6308e3a2849f3', 'kfskfs', '', '2022-10-12 17:26:01', 0, 0, 0, 0, 0);

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
('1', 99, 0, 'tiny package', 'worst pack', '2022-05-22 17:39:42', 19, '2022-10-14 16:05:53'),
('2', 23, 0, 'mid pack', 's2nd peck', '2022-05-22 17:40:25', 230, '2022-08-06 21:25:55'),
('23', 2, 0, 'ckskc', 'ckk', '2022-05-22 17:41:39', 3, '0000-00-00 00:00:00'),
('3', 33, 1, '33', '3dwd', '2022-05-22 17:40:47', 332, '2022-08-07 10:36:23'),
('628a91127da05', 1, 1, '23', '13', '2022-05-22 22:37:54', 13, '2022-05-22 22:37:54'),
('628a913467f66', 929292, 1, '1', 'dswdsmm', '2022-05-22 22:38:28', 212, '2022-05-22 22:38:28'),
('628a99d860576', 1, 1, 'DCDC', 'EE', '2022-05-22 23:15:20', 2332, '2022-05-22 23:15:20'),
('62a0c081cfcbb', 1, 1, 'חבילה בשקל בלי לקבל כלום', 'חבילה בלי כלום', '2022-06-08 18:30:09', 83, '2022-10-14 16:05:28'),
('62a0c5cf49966', 12, 1, 'iiddi', 'dkj', '2022-06-08 18:52:47', 929292, '2022-06-08 18:52:47'),
('62a0c67806d1a', 1, 1, '3993', '299', '2022-06-08 18:55:36', 9392, '2022-06-08 18:55:36'),
('62a0c9ef58c9b', 64, 1, '83', 'jf', '2022-06-08 19:10:23', 830, '2022-06-08 19:10:23'),
('62a0c9f834dbf', 83, 1, 'a', 'djkqkj', '2022-06-08 19:10:32', 338, '2022-06-08 19:10:32'),
('62a0cf0214bf0', 83, 0, 'jlfjkgwkjrgwjk', '', '2022-06-08 19:32:02', 93, '2022-06-08 19:32:02'),
('62c742d95153b', 12, 1, 'kck', '2', '2022-07-07 23:32:25', 22, '2022-07-07 23:32:25'),
('62e69d278057b', 200, 1, 'jhho', 'FKGKDGMKD', '2022-07-31 18:17:59', 535, '2022-07-31 18:17:59'),
('62ed18749a53c', 38, 1, '8', '8', '2022-08-05 16:17:40', 8, '2022-08-05 16:17:40'),
('62ed187ecf156', 388, 1, 'בחחבחבחבחחב', '8282', '2022-08-05 16:17:50', 8383, '2022-08-05 16:17:50'),
('62ed19210f174', 332, 1, '2kckckckck', '2', '2022-08-05 16:20:33', 2, '2022-08-05 16:20:33'),
('62ed1935a78b3', 4, 1, 'jfjfjj', 'j', '2022-08-05 16:20:53', 3, '2022-08-05 16:20:53'),
('62ed19533c125', 4, 1, '3ii3', 'i', '2022-08-05 16:21:23', 3, '2022-08-05 16:21:23'),
('62ed19636f9ed', 39, 1, '939', '92', '2022-08-05 16:21:39', 29, '2022-08-05 16:21:39'),
('62ed196f4bd46', 9393, 1, '99399', '992', '2022-08-05 16:21:51', 3, '2022-08-05 16:21:51'),
('62ed1998944ad', 3, 1, 'cc', 'kck', '2022-08-05 16:22:32', 2, '2022-08-05 16:22:32'),
('62ef79e43aac5', 3993, 1, 'kkkxkxkxkxk', 'sxmcx,c', '2022-08-07 11:37:56', 200202, '2022-08-07 11:37:56'),
('630d238151989', 1, 1, 'mcc', 'kdk', '2022-08-29 23:37:21', 2, '2022-08-29 23:37:21'),
('63496cdf0f721', 123, 1, 'חבילה בשישי בדיקה', 'בדיקה', '2022-10-14 17:06:23', 12, '2022-10-14 17:06:23'),
('63496dca5ebfa', 1.111111111111111e15, 0, 'dkk', 'xx', '2022-10-14 17:10:18', 12, '2022-10-14 16:11:06');

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

--
-- Dumping data for table `password_recovery`
--

INSERT INTO `password_recovery` (`id`, `userMail`, `token`, `exp_date`) VALUES
(8, 'haim17701@gmail.com', '7cf3a7d265d537257fc673f0dcd8ec86', '2022-10-19 21:46:35');

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `pictureID` varchar(255) NOT NULL,
  `element_id` varchar(255) NOT NULL,
  `serial_number` int(10) UNSIGNED NOT NULL,
  `picture_url` varchar(255) NOT NULL,
  `upload_time` datetime NOT NULL DEFAULT current_timestamp(),
  `alt` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pictures`
--

INSERT INTO `pictures` (`pictureID`, `element_id`, `serial_number`, `picture_url`, `upload_time`, `alt`) VALUES
('62a3009f23dc1', '62c5ee073f23b', 1, 'b0d52433cd2818d3FinelProject-ERD.drawio (9).png', '2022-06-10 10:28:15', 'FinelProject-ERD.drawio (9).png'),
('62c5ee073fcf0', '62c5ee073f23b', 1, '1a10914ccd118e2eFinelProject-ERD.drawio (3).png', '2022-07-06 22:18:15', 'FinelProject-ERD.drawio (3).png'),
('62c7444ade4ee', '62c7444adcdf6', 1, '3cd9be27846993a8FinelProject-ERD.drawio (7).png', '2022-07-07 22:38:34', 'FinelProject-ERD.drawio (7).png'),
('62c7446dba2eb', '62c7446db9d19', 1, '81350e7f44afe9e6FinelProject-Use case Diagram.drawio (1).png', '2022-07-07 22:39:09', 'FinelProject-Use case Diagram.drawio (1).png'),
('62c7446dbbfb4', '62c7446db9d19', 2, '8da7e58c46f8cfa1FinelProject-ERD.drawio (9).png', '2022-07-07 22:39:09', 'FinelProject-ERD.drawio (9).png'),
('62c7446dbe138', '62c7446db9d19', 3, '2257c4fc73bbc35bFinelProject-ERD.drawio (8).png', '2022-07-07 22:39:09', 'FinelProject-ERD.drawio (8).png'),
('62c7446dc0718', '62c7446db9d19', 4, 'a40939f135305b07FinelProject-ERD.drawio (7).png', '2022-07-07 22:39:09', 'FinelProject-ERD.drawio (7).png'),
('62c7446dc3095', '62c7446db9d19', 5, 'd5d9a000a17420a3FinelProject-ERD.drawio (6).png', '2022-07-07 22:39:09', 'FinelProject-ERD.drawio (6).png'),
('62c7446dc4c09', '62c7446db9d19', 6, 'c4ce49a45befb876FinelProject-Use case Diagram.drawio.png', '2022-07-07 22:39:09', 'FinelProject-Use case Diagram.drawio.png'),
('62c7446dc9f07', '62c7446db9d19', 7, '3040a196af5ae5f5FinelProject-Activity Diagram__.drawio.png', '2022-07-07 22:39:09', 'FinelProject-Activity Diagram__.drawio.png'),
('62c7446dd1416', '62c7446db9d19', 8, '707a72e9f5e2768aFinelProject-Page-12.drawio.png', '2022-07-07 22:39:09', 'FinelProject-Page-12.drawio.png'),
('62c7446dd6113', '62c7446db9d19', 9, 'debd9f20f2b9c3c5FinelProject-Class diagram.drawio (1).png', '2022-07-07 22:39:09', 'FinelProject-Class diagram.drawio (1).png'),
('62c7446ddaa39', '62c7446db9d19', 10, '344414007b8e4db0FinelProject-Class diagram.drawio.png', '2022-07-07 22:39:09', 'FinelProject-Class diagram.drawio.png'),
('62c74496c9be8', '62c74496c9554', 1, 'd0aad538141d2187FinelProject-Use case Diagram.drawio.png', '2022-07-07 22:39:50', 'FinelProject-Use case Diagram.drawio.png'),
('62c744ceccc24', '62c744cecc951', 1, '431275983292f06eFinelProject-ERD.drawio (6).png', '2022-07-07 22:40:46', 'FinelProject-ERD.drawio (6).png'),
('62c744f2be86e', '62c744f2be39c', 1, '9de4f3ad7a4df602FinelProject-ERD.drawio (7).png', '2022-07-07 22:41:22', 'FinelProject-ERD.drawio (7).png'),
('62c744f2c07cd', '62c744f2be39c', 2, 'fb46f5285152f549FinelProject-ERD.drawio (6).png', '2022-07-07 22:41:22', 'FinelProject-ERD.drawio (6).png'),
('62c744f2c78e3', '62c744f2be39c', 3, '17cbffe9cd325ad7FinelProject-Use case Diagram.drawio.png', '2022-07-07 22:41:22', 'FinelProject-Use case Diagram.drawio.png'),
('62c744f2ca870', '62c744f2be39c', 4, '5f1d820db7d575cbFinelProject-Activity Diagram__.drawio.png', '2022-07-07 22:41:22', 'FinelProject-Activity Diagram__.drawio.png'),
('62c744f2cc1e9', '62c744f2be39c', 5, 'dce13009e84713e1FinelProject-Page-12.drawio.png', '2022-07-07 22:41:22', 'FinelProject-Page-12.drawio.png'),
('62c74518d2640', '62c74518d217e', 1, 'de5f465d98f1e021FinelProject-Use case Diagram.drawio (1).png', '2022-07-07 22:42:00', 'FinelProject-Use case Diagram.drawio (1).png'),
('62c74518d3bcc', '62c74518d217e', 2, '13abf2fdeed5a459FinelProject-ERD.drawio (9).png', '2022-07-07 22:42:00', 'FinelProject-ERD.drawio (9).png'),
('62c745585690d', '62c7455856540', 1, '01c7985b627b5672FinelProject-ERD.drawio (7).png', '2022-07-07 22:43:04', 'FinelProject-ERD.drawio (7).png'),
('62c745585900d', '62c7455856540', 2, '077b53f3122bd84eFinelProject-ERD.drawio (6).png', '2022-07-07 22:43:04', 'FinelProject-ERD.drawio (6).png'),
('62c7457864eba', '62c745786306e', 1, '9954929626eb9051FinelProject-Use case Diagram.drawio.png', '2022-07-07 22:43:36', 'FinelProject-Use case Diagram.drawio.png'),
('62c745970e55a', '62c745970dcb0', 1, '50f74db2399663c3FinelProject-Use case Diagram.drawio (1).png', '2022-07-07 22:44:07', 'FinelProject-Use case Diagram.drawio (1).png'),
('62c81335b430d', '62c81335b3f17', 1, 'ceafd1eed45d450eFinelProject-ERD.drawio (7).png', '2022-07-08 13:21:25', 'FinelProject-ERD.drawio (7).png'),
('62c8134e88c22', '62c8134e88846', 1, 'e945329519d5032eFinelProject-Page-12.drawio.png', '2022-07-08 13:21:50', 'FinelProject-Page-12.drawio.png'),
('62c813676051a', '62c8136760120', 1, 'a7dc961bbea05125FinelProject-Page-12.drawio.png', '2022-07-08 13:22:15', 'FinelProject-Page-12.drawio.png'),
('62c81391ee225', '62c81391edef4', 1, '971e72dc05611ed3FinelProject-Page-12.drawio.png', '2022-07-08 13:22:57', 'FinelProject-Page-12.drawio.png'),
('62c813ad155c9', '62c813ad14e50', 1, 'f2aa0a37804165d8FinelProject-Use case Diagram.drawio.png', '2022-07-08 13:23:25', 'FinelProject-Use case Diagram.drawio.png'),
('62e81718bda0e', '62e81718bd3b7', 1, '2df2f01529463233FinelProject-Class diagram.drawio (1).png', '2022-08-01 20:10:32', 'FinelProject-Class diagram.drawio (1).png'),
('62e81d55d26d8', '62e81d55d1f7e', 1, '85993e821d421219FinelProject-ERD.drawio (7).png', '2022-08-01 20:37:09', 'FinelProject-ERD.drawio (7).png'),
('62e81dfb9b6e5', '62e81dfb9b27b', 1, 'ecd6ead417826dd6FinelProject-ERD.drawio (8).png', '2022-08-01 20:39:55', 'FinelProject-ERD.drawio (8).png'),
('62e81ef0e25d8', '62e81ef0e19e6', 1, '55bf879b31459ecaFinelProject-ERD.drawio (8).png', '2022-08-01 20:44:00', 'FinelProject-ERD.drawio (8).png'),
('62e81f00a49ea', '62e81f00a4620', 1, 'ae6fa3db66450d74FinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:44:16', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e81f07d1d5e', '62e81f07d188e', 1, 'f69b8082d778d16eFinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:44:23', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e81f2fccc24', '62e81f2fcc780', 1, '055f1c92d337b005FinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:45:03', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e81f31bf63a', '62e81f31bf1f2', 1, 'a7df162b29b7085aFinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:45:05', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e81f32989be', '62e81f329858f', 1, '0022dd6e6f44d0baFinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:45:06', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e81f6bd60de', '62e81f6bd5bd4', 1, '29d8bfe68be69e17FinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:46:03', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e81f786e528', '62e81f786e175', 1, 'ef8060414dc299f8FinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:46:16', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e82007c221a', '62e82007c1b75', 1, '7db7e7222ec01706FinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:48:39', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e8202227bc4', '62e8202227625', 1, 'f4e87ea29bc01f8fFinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:49:06', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e8203297cbe', '62e8203296848', 1, 'a8e8099b2647ecb6FinelProject-Use case Diagram.drawio (1).png', '2022-08-01 20:49:22', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e827d6562ef', '2', 1, '553d92d464c301e5FinelProject-Class diagram.drawio (1).png', '2022-08-01 21:21:58', 'FinelProject-Class diagram.drawio (1).png'),
('62e829cd66933', '62e829cd64881', 1, '32643dac441caac2FinelProject-Class diagram.drawio.png', '2022-08-01 21:30:21', 'FinelProject-Class diagram.drawio.png'),
('62e829fec3cc2', '62e829fec39a5', 1, 'aa45efbeba022682FinelProject-Class diagram.drawio.png', '2022-08-01 21:31:10', 'FinelProject-Class diagram.drawio.png'),
('62e82a292bd50', '62e82a292b8d8', 1, '31b0044f79db605eFinelProject-Class diagram.drawio.png', '2022-08-01 21:31:53', 'FinelProject-Class diagram.drawio.png'),
('62e82b64d534b', '62e82b64d4f03', 1, '4c5cef6e8480d5a7FinelProject-Activity Diagram__.drawio.png', '2022-08-01 21:37:08', 'FinelProject-Activity Diagram__.drawio.png'),
('62e82d9e548d7', '62e82d9e5439c', 1, 'cf4b0e125f62628b10259764.jpg', '2022-08-01 21:46:38', '10259764.jpg'),
('62e82db71e519', '62e82db71e087', 1, '60cb72d50556dac810259764.jpg', '2022-08-01 21:47:03', '10259764.jpg'),
('62e82eaa0562f', '62e82eaa04f9c', 1, 'ff1d378b15a6dba410259764.jpg', '2022-08-01 21:51:06', '10259764.jpg'),
('62e82f932b1a2', '62e82f932add8', 1, '9302c75d4a4ec239FinelProject-ERD.drawio (7).png', '2022-08-01 21:54:59', 'FinelProject-ERD.drawio (7).png'),
('62e83022369c8', '62e8309e4d0f2', 1, '7f99c8ac4c538089FinelProject-ERD.drawio (7).png', '2022-08-01 21:57:22', 'FinelProject-ERD.drawio (7).png'),
('62e830955f77a', '62e8309e4d0f2', 1, '25f08b789ef97229FinelProject-ERD.drawio (7).png', '2022-08-01 21:59:17', 'FinelProject-ERD.drawio (7).png'),
('62e8309e4d63e', '62e8309e4d0f2', 1, '8037e6afa3f7ff4fFinelProject-Activity Diagram__.drawio.png', '2022-08-01 21:59:26', 'FinelProject-Activity Diagram__.drawio.png'),
('62e831ff4868c', '62e831ff47caf', 1, 'f0efb12d58d8e68aFinelProject-Use case Diagram.drawio (1).png', '2022-08-01 22:05:19', 'FinelProject-Use case Diagram.drawio (1).png'),
('62e8359071322', '62e8359070c47', 1, 'e884dbdfef6410cdFinelProject-ERD.drawio (9).png', '2022-08-01 22:20:32', 'FinelProject-ERD.drawio (9).png'),
('62e835b9ebbf6', '62e835b9eb54f', 1, '8a0c27ab925ef109FinelProject-ERD.drawio (9).png', '2022-08-01 22:21:13', 'FinelProject-ERD.drawio (9).png'),
('62e8361f744b7', '62e8361f73e6d', 1, 'a53dd7051ee63eedFinelProject-Page-12.drawio.png', '2022-08-01 22:22:55', 'FinelProject-Page-12.drawio.png'),
('62e837e910d55', '62e837e90f94f', 1, '2784fec45cf74e54FinelProject-ERD.drawio (7).png', '2022-08-01 22:30:33', 'FinelProject-ERD.drawio (7).png'),
('62e95cce4e181', '62e95cce4de81', 1, '5e24746339fcf9d02.jpg', '2022-08-02 19:20:14', '2.jpg'),
('62e95cce51b72', '62e95cce4de81', 2, '52eb7d962a4544afFinelProject-ERD.drawio (4).png', '2022-08-02 19:20:14', 'FinelProject-ERD.drawio (4).png'),
('62eab4f026e8c', '62eab4f0265c8', 1, 'bc7a85c86fd9a5182.jpg', '2022-08-03 19:48:32', '2.jpg'),
('62eab4f02dfde', '62eab4f0265c8', 2, '2b8883d2c2b9dde0FinelProject-ERD.drawio (4).png', '2022-08-03 19:48:32', 'FinelProject-ERD.drawio (4).png'),
('62ef7c1b8fea2', '62e95d3c18f47', 1, '9b5104a43b70711cFinelProject-ERD.drawio (8).png', '2022-08-07 10:47:23', 'FinelProject-ERD.drawio (8).png'),
('62ef7c1b9210f', '62e95d3c18f47', 2, 'c132452071f66336FinelProject-ERD.drawio (7).png', '2022-08-07 10:47:23', 'FinelProject-ERD.drawio (7).png'),
('62ef7c1b93eb6', '62e95d3c18f47', 3, 'e6a0ca7cdbffad78FinelProject-ERD.drawio (6).png', '2022-08-07 10:47:23', 'FinelProject-ERD.drawio (6).png'),
('62ef7c1b95982', '62e95d3c18f47', 4, '8d25f16c062030c2FinelProject-Use case Diagram.drawio.png', '2022-08-07 10:47:23', 'FinelProject-Use case Diagram.drawio.png'),
('62ef7c1b9c25a', '62e95d3c18f47', 5, '408d019228b67230FinelProject-Activity Diagram__.drawio.png', '2022-08-07 10:47:23', 'FinelProject-Activity Diagram__.drawio.png'),
('62ef7c1ba27a0', '62e95d3c18f47', 6, '19f55e8064bdb6afFinelProject-Page-12.drawio.png', '2022-08-07 10:47:23', 'FinelProject-Page-12.drawio.png'),
('62ef7c1ba7297', '62e95d3c18f47', 7, '0ca8b7b86b0e868eFinelProject-Class diagram.drawio (1).png', '2022-08-07 10:47:23', 'FinelProject-Class diagram.drawio (1).png'),
('62ef7c1bab53a', '62e95d3c18f47', 8, 'e8933cd2b3732677FinelProject-Class diagram.drawio.png', '2022-08-07 10:47:23', 'FinelProject-Class diagram.drawio.png'),
('62ef7c1bacc70', '62e95d3c18f47', 9, '649ac6a808605779FinelProject-ERD.drawio (5).png', '2022-08-07 10:47:23', 'FinelProject-ERD.drawio (5).png'),
('62ef7c1bae1a0', '62e95d3c18f47', 10, 'aa62df407b6de8e5WhatsApp Image 2022-02-14 at 23.26.54.jpeg', '2022-08-07 10:47:23', 'WhatsApp Image 2022-02-14 at 23.26.54.jpeg'),
('62ef7c1bb2434', '62e95d3c18f47', 11, '95161e7947b31b47FinelProject-ERD.drawio (4).png', '2022-08-07 10:47:23', 'FinelProject-ERD.drawio (4).png'),
('62ef7c1bb8f74', '62e95d3c18f47', 12, '5e3a167263514042FinelProject-ERD.drawio (3).png', '2022-08-07 10:47:23', 'FinelProject-ERD.drawio (3).png'),
('62ef7c1bba228', '62e95d3c18f47', 13, 'a0c3647cc441772dFinelProject-ERD (2).jpg', '2022-08-07 10:47:23', 'FinelProject-ERD (2).jpg'),
('62ef7c1bbb84e', '62e95d3c18f47', 14, '5efbbf61c571ebbeFinelProject-ERD.drawio (2).png', '2022-08-07 10:47:23', 'FinelProject-ERD.drawio (2).png'),
('62ef7c1bbca2c', '62e95d3c18f47', 15, 'c80ca8053874bc6cFinelProject-ERD.drawio (1).png', '2022-08-07 10:47:23', 'FinelProject-ERD.drawio (1).png'),
('62ef7c1bbda1e', '62e95d3c18f47', 16, 'f40699aafed0050dFinelProject-ERD.drawio.png', '2022-08-07 10:47:23', 'FinelProject-ERD.drawio.png'),
('62ef7c1bc17a4', '62e95d3c18f47', 17, 'd84a73966f370927FinelProject-Class diagram.jpg', '2022-08-07 10:47:23', 'FinelProject-Class diagram.jpg'),
('62ef7c1bc6999', '62e95d3c18f47', 18, '85bca31855f24987FinelProject-ERD (1).jpg', '2022-08-07 10:47:23', 'FinelProject-ERD (1).jpg'),
('62ef7c1bcd12a', '62e95d3c18f47', 19, 'c9d6482197d2c268FinelProject-ERD.jpg', '2022-08-07 10:47:23', 'FinelProject-ERD.jpg'),
('62ef7d1be4869', '62ef7d1be4219', 1, 'b635f523a0ae0a68FinelProject-Use case Diagram.drawio (1).png', '2022-08-07 10:51:39', 'FinelProject-Use case Diagram.drawio (1).png'),
('62ef7d1be62e2', '62ef7d1be4219', 2, '19a3da2eea349bbfFinelProject-ERD.drawio (9).png', '2022-08-07 10:51:39', 'FinelProject-ERD.drawio (9).png'),
('62ef7d47e3f86', '62ef7d47e399b', 1, '292ac3061331da09FinelProject-Use case Diagram.drawio (1).png', '2022-08-07 10:52:23', 'FinelProject-Use case Diagram.drawio (1).png'),
('62ef7d47e6764', '62ef7d47e399b', 2, '9a48e34703684daaFinelProject-ERD.drawio (9).png', '2022-08-07 10:52:23', 'FinelProject-ERD.drawio (9).png'),
('62ef7d4feba33', '62ef7d4fe5f90', 2, '0623be5b1ad35a4bFinelProject-ERD.drawio (9).png', '2022-08-07 10:52:31', 'FinelProject-ERD.drawio (9).png'),
('62f2b10805bf4', '62ef7d7d30008', 1, 'e4cb05b79a2fe649FinelProject-ERD.drawio (7).png', '2022-08-09 21:10:00', 'FinelProject-ERD.drawio (7).png'),
('62f41963f2191', '62f41963f1aeb', 1, 'dd39109822c2aa8eFinelProject-ERD.drawio (6).png', '2022-08-10 22:47:31', 'FinelProject-ERD.drawio (6).png'),
('62f41963f3833', '62f41963f1aeb', 2, '0c4d2e904d8c4f1dFinelProject-ERD.drawio (8).png', '2022-08-10 22:47:31', 'FinelProject-ERD.drawio (8).png'),
('62f4298e717de', '62ef7d5c4cd51', 1, '80fcce7e0f59a931FinelProject-Use case Diagram.drawio (1).png', '2022-08-10 23:56:30', 'FinelProject-Use case Diagram.drawio (1).png'),
('62f4298e73360', '62ef7d5c4cd51', 2, '301dc8f624961576FinelProject-ERD.drawio (9).png', '2022-08-10 23:56:30', 'FinelProject-ERD.drawio (9).png'),
('62f4298e74779', '62ef7d5c4cd51', 3, '56244032b3c5093bFinelProject-ERD.drawio (8).png', '2022-08-10 23:56:30', 'FinelProject-ERD.drawio (8).png'),
('62f4298e790bc', '62ef7d5c4cd51', 7, 'c40d03b21f933cb3FinelProject-Activity Diagram__.drawio.png', '2022-08-10 23:56:30', 'FinelProject-Activity Diagram__.drawio.png'),
('62f4298e7a282', '62ef7d5c4cd51', 8, '32ce3e6c989e2dd2FinelProject-Page-12.drawio.png', '2022-08-10 23:56:30', 'FinelProject-Page-12.drawio.png'),
('62f4298e7b396', '62ef7d5c4cd51', 9, 'e2b6472da83ecb49FinelProject-Class diagram.drawio (1).png', '2022-08-10 23:56:30', 'FinelProject-Class diagram.drawio (1).png'),
('62f4298e7c7e3', '62ef7d5c4cd51', 10, 'cc1034e29be80d26FinelProject-Class diagram.drawio.png', '2022-08-10 23:56:30', 'FinelProject-Class diagram.drawio.png'),
('62f435a85fd16', '62ef7d4fe5f90', 1, '3d5a58e10209e789FinelProject-Use case Diagram.drawio (1).png', '2022-08-11 00:48:08', 'FinelProject-Use case Diagram.drawio (1).png'),
('62f435a861c10', '62ef7d4fe5f90', 2, '3d57bc01434268d3FinelProject-ERD.drawio (9).png', '2022-08-11 00:48:08', 'FinelProject-ERD.drawio (9).png'),
('62fea31f2c851', '303902', 1, '8cbc749b12be968cFinelProject-Page-12.drawio.png', '2022-08-18 22:37:51', 'FinelProject-Page-12.drawio.png'),
('630fddc99843f', '630b982ca3319', 1, '970db7e569323ed3FinelProject-ERD (7).jpg', '2022-09-01 00:16:41', 'FinelProject-ERD (7).jpg'),
('630fddc99aae9', '630b982ca3319', 2, 'ac2165d30ecaea84context-Page-2.jpg', '2022-09-01 00:16:41', 'context-Page-2.jpg'),
('630fde488e115', '630b982ca3319', 1, '97af5cdf3d62b3d7FinelProject-ERD (7).jpg', '2022-09-01 00:18:48', 'FinelProject-ERD (7).jpg'),
('630fde488f4f3', '630b982ca3319', 2, '7432602e463e3525context-Page-2.jpg', '2022-09-01 00:18:48', 'context-Page-2.jpg'),
('630fde5e0372a', '630b982ca3319', 1, 'cd482793080c6157FinelProject-ERD (7).jpg', '2022-09-01 00:19:10', 'FinelProject-ERD (7).jpg'),
('630fde5e04b65', '630b982ca3319', 2, 'f53e64ddff26b491context-Page-2.jpg', '2022-09-01 00:19:10', 'context-Page-2.jpg'),
('630fdeec03987', '630b982ca3319', 1, 'dd553a2447adcd9fFinelProject-ERD (7).jpg', '2022-09-01 00:21:32', 'FinelProject-ERD (7).jpg'),
('630fdeec04c67', '630b982ca3319', 2, '08ce0a1f0bac309ccontext-Page-2.jpg', '2022-09-01 00:21:32', 'context-Page-2.jpg'),
('630fe0f405f30', '630b982ca3319', 1, 'c832f38e068d9c42FinelProject-ERD (7).jpg', '2022-09-01 00:30:12', 'FinelProject-ERD (7).jpg'),
('630fe0f40798d', '630b982ca3319', 2, 'bf2dc15be1bd095dcontext-Page-2.jpg', '2022-09-01 00:30:12', 'context-Page-2.jpg'),
('63109c1fc1fd8', '630b982ca3319', 1, '14f39251724b9b07FinelProject-ERD (7).jpg', '2022-09-01 13:48:47', 'FinelProject-ERD (7).jpg'),
('63109c1fc3ef4', '630b982ca3319', 2, '9ad3506236c53326context-Page-2.jpg', '2022-09-01 13:48:47', 'context-Page-2.jpg'),
('63109c21190c9', '630b982ca3319', 1, '2e2d6a90e0c7fe10FinelProject-ERD (7).jpg', '2022-09-01 13:48:49', 'FinelProject-ERD (7).jpg'),
('63109c211accc', '630b982ca3319', 2, '5884a0b2e6d2df12context-Page-2.jpg', '2022-09-01 13:48:49', 'context-Page-2.jpg'),
('63109c31915f7', '630b982ca3319', 1, 'c3a189c2c5197694FinelProject-ERD (7).jpg', '2022-09-01 13:49:05', 'FinelProject-ERD (7).jpg'),
('63109c3192c54', '630b982ca3319', 2, 'df21c46c2e3e39e8context-Page-2.jpg', '2022-09-01 13:49:05', 'context-Page-2.jpg'),
('63109c3571bd7', '630b982ca3319', 1, 'ce033c86d58d48d4FinelProject-ERD (7).jpg', '2022-09-01 13:49:09', 'FinelProject-ERD (7).jpg'),
('63109c3577495', '630b982ca3319', 2, '1d91563866bed471context-Page-2.jpg', '2022-09-01 13:49:09', 'context-Page-2.jpg'),
('63109c8be10b8', '630b982ca3319', 1, '0cd02021425c5be9FinelProject-ERD (7).jpg', '2022-09-01 13:50:35', 'FinelProject-ERD (7).jpg'),
('63109c8be2fab', '630b982ca3319', 2, 'db823c43078d563econtext-Page-2.jpg', '2022-09-01 13:50:35', 'context-Page-2.jpg'),
('63109c9d94073', '630b982ca3319', 1, '80ac3ebdb61ae7b6FinelProject-ERD (7).jpg', '2022-09-01 13:50:53', 'FinelProject-ERD (7).jpg'),
('63109c9d958b3', '630b982ca3319', 2, '9b46c59aadb3fd3econtext-Page-2.jpg', '2022-09-01 13:50:53', 'context-Page-2.jpg'),
('63109ca54db1a', '630b982ca3319', 1, 'e985681d094da314FinelProject-ERD (7).jpg', '2022-09-01 13:51:01', 'FinelProject-ERD (7).jpg'),
('63109ca54f1d3', '630b982ca3319', 2, 'b3acbbab7829559ccontext-Page-2.jpg', '2022-09-01 13:51:01', 'context-Page-2.jpg'),
('63109cbc169c1', '630b982ca3319', 1, '79d4664a00ca91d7FinelProject-ERD (7).jpg', '2022-09-01 13:51:24', 'FinelProject-ERD (7).jpg'),
('63109cbc1d168', '630b982ca3319', 2, 'd8f67867c4af98a3context-Page-2.jpg', '2022-09-01 13:51:24', 'context-Page-2.jpg'),
('63109ce3c6054', '630b982ca3319', 1, '99a6a9ce4facedbaFinelProject-ERD (7).jpg', '2022-09-01 13:52:03', 'FinelProject-ERD (7).jpg'),
('63109ce3cbc87', '630b982ca3319', 2, '915c4f9a9653b707context-Page-2.jpg', '2022-09-01 13:52:03', 'context-Page-2.jpg'),
('63109cf649270', '630b982ca3319', 1, '1eae78052c1e2e9fFinelProject-ERD (7).jpg', '2022-09-01 13:52:22', 'FinelProject-ERD (7).jpg'),
('63109cf64b543', '630b982ca3319', 2, '3a890d6f70cfe827context-Page-2.jpg', '2022-09-01 13:52:22', 'context-Page-2.jpg'),
('63109d40c5ffe', '630b982ca3319', 1, '4a4eee1ef54832a6FinelProject-ERD (7).jpg', '2022-09-01 13:53:36', 'FinelProject-ERD (7).jpg'),
('63109d40c7755', '630b982ca3319', 2, '2c8a2ce2fe6c05a2context-Page-2.jpg', '2022-09-01 13:53:36', 'context-Page-2.jpg'),
('63109d5b03200', '630b982ca3319', 1, 'feca18fd15d8358aFinelProject-ERD (7).jpg', '2022-09-01 13:54:03', 'FinelProject-ERD (7).jpg'),
('63109d5b0488b', '630b982ca3319', 2, '0d75750b78411282context-Page-2.jpg', '2022-09-01 13:54:03', 'context-Page-2.jpg'),
('63109d687ee72', '630b982ca3319', 1, 'd2ffda8c2116b449FinelProject-ERD (7).jpg', '2022-09-01 13:54:16', 'FinelProject-ERD (7).jpg'),
('63109d688025b', '630b982ca3319', 2, 'bf47301af0895785context-Page-2.jpg', '2022-09-01 13:54:16', 'context-Page-2.jpg'),
('63109d96600c9', '630b982ca3319', 1, '73eb56ca9b8ab365FinelProject-ERD (7).jpg', '2022-09-01 13:55:02', 'FinelProject-ERD (7).jpg'),
('63109d9661387', '630b982ca3319', 2, 'f84fc44b612f063acontext-Page-2.jpg', '2022-09-01 13:55:02', 'context-Page-2.jpg'),
('63109df527901', '630b982ca3319', 1, '866a2a996e7a7fc5FinelProject-ERD (7).jpg', '2022-09-01 13:56:37', 'FinelProject-ERD (7).jpg'),
('63109df528e1b', '630b982ca3319', 2, '098a168efcac9b43context-Page-2.jpg', '2022-09-01 13:56:37', 'context-Page-2.jpg'),
('63109df7bcada', '630b982ca3319', 1, '415c763be4c6344fFinelProject-ERD (7).jpg', '2022-09-01 13:56:39', 'FinelProject-ERD (7).jpg'),
('63109df7be683', '630b982ca3319', 2, 'a6bb28f396e14c04context-Page-2.jpg', '2022-09-01 13:56:39', 'context-Page-2.jpg'),
('63109dffec59d', '630b982ca3319', 1, '7be9e7595e2dcee1FinelProject-ERD (7).jpg', '2022-09-01 13:56:47', 'FinelProject-ERD (7).jpg'),
('63109dffede06', '630b982ca3319', 2, 'd8559a768aee5168context-Page-2.jpg', '2022-09-01 13:56:47', 'context-Page-2.jpg'),
('63109ecc03125', '630b982ca3319', 1, '97fc90fafda02e5bFinelProject-ERD (7).jpg', '2022-09-01 14:00:12', 'FinelProject-ERD (7).jpg'),
('63109ecc0a139', '630b982ca3319', 2, '277eb348d66b1e25context-Page-2.jpg', '2022-09-01 14:00:12', 'context-Page-2.jpg'),
('63109ed85ba00', '630b982ca3319', 1, '1706004a657acbcbFinelProject-ERD (7).jpg', '2022-09-01 14:00:24', 'FinelProject-ERD (7).jpg'),
('63109ed85cd4c', '630b982ca3319', 2, '5ce722015f109ec1context-Page-2.jpg', '2022-09-01 14:00:24', 'context-Page-2.jpg'),
('63109f1967d8a', '630b982ca3319', 1, '2d1549294475498aFinelProject-ERD (7).jpg', '2022-09-01 14:01:29', 'FinelProject-ERD (7).jpg'),
('63109f19695d0', '630b982ca3319', 2, '239f7e95851559fecontext-Page-2.jpg', '2022-09-01 14:01:29', 'context-Page-2.jpg'),
('63109f987d3f6', '630b982ca3319', 1, '6bb4c4b9dee896d8FinelProject-ERD (7).jpg', '2022-09-01 14:03:36', 'FinelProject-ERD (7).jpg'),
('63109f987fc34', '630b982ca3319', 2, '9d74d3c2c7327142context-Page-2.jpg', '2022-09-01 14:03:36', 'context-Page-2.jpg'),
('63109fa61f2b9', '630b982ca3319', 1, 'fd12fa4181f2fecdFinelProject-ERD (7).jpg', '2022-09-01 14:03:50', 'FinelProject-ERD (7).jpg'),
('63109fa620827', '630b982ca3319', 2, '04794b4ea3da99dccontext-Page-2.jpg', '2022-09-01 14:03:50', 'context-Page-2.jpg'),
('63109fd7cf822', '630b982ca3319', 1, '5730a99427bd16adFinelProject-ERD (7).jpg', '2022-09-01 14:04:39', 'FinelProject-ERD (7).jpg'),
('63109fd7d1651', '630b982ca3319', 2, '3061c0ac01084908context-Page-2.jpg', '2022-09-01 14:04:39', 'context-Page-2.jpg'),
('6310a00191852', '630b982ca3319', 1, '5d89fe294bf2626eFinelProject-ERD (7).jpg', '2022-09-01 14:05:21', 'FinelProject-ERD (7).jpg'),
('6310a001943e8', '630b982ca3319', 2, '48e18dafaec01293context-Page-2.jpg', '2022-09-01 14:05:21', 'context-Page-2.jpg'),
('6310a04224808', '630b982ca3319', 1, 'ddd10c257efe213aFinelProject-ERD (7).jpg', '2022-09-01 14:06:26', 'FinelProject-ERD (7).jpg'),
('6310a04226031', '630b982ca3319', 2, '3ea8b4955dca0177context-Page-2.jpg', '2022-09-01 14:06:26', 'context-Page-2.jpg'),
('6310a0e27780a', '630b982ca3319', 1, '6b42d9916c1393cfFinelProject-ERD (7).jpg', '2022-09-01 14:09:06', 'FinelProject-ERD (7).jpg'),
('6310a0e278b72', '630b982ca3319', 2, 'f92b00cf58243aa6context-Page-2.jpg', '2022-09-01 14:09:06', 'context-Page-2.jpg'),
('6310a10208d49', '630b982ca3319', 1, '4d24bedd6000a920FinelProject-ERD (7).jpg', '2022-09-01 14:09:38', 'FinelProject-ERD (7).jpg'),
('6310a1020f8c9', '630b982ca3319', 2, '06bfea1288d857b5context-Page-2.jpg', '2022-09-01 14:09:38', 'context-Page-2.jpg'),
('6310a159a5cc7', '630b982ca3319', 1, 'f717394f041c800fFinelProject-ERD (7).jpg', '2022-09-01 14:11:05', 'FinelProject-ERD (7).jpg'),
('6310a159a7cba', '630b982ca3319', 2, 'bb1b33ef6b1943d7context-Page-2.jpg', '2022-09-01 14:11:05', 'context-Page-2.jpg'),
('633025380f457', '633025380f00d', 1, '4523c06d5e28e725FinelProject-ERD (4).jpg', '2022-09-25 11:54:00', 'FinelProject-ERD (4).jpg'),
('6330253814272', '633025380f00d', 2, 'ef5aa914c3bdb8e4FinelProject-ERD (6).jpg', '2022-09-25 11:54:00', 'FinelProject-ERD (6).jpg'),
('633b31e322d04', '633b31e322971', 1, 'dba534ac208e40dfFinelProject-Use case Diagram.drawio (1).png', '2022-10-03 21:02:59', 'FinelProject-Use case Diagram.drawio (1).png'),
('633b31e324869', '633b31e322971', 2, '55998bf2339d8ddfFinelProject-ERD (4).jpg', '2022-10-03 21:02:59', 'FinelProject-ERD (4).jpg'),
('633b31e325c19', '633b31e322971', 3, '347964ed612d7731FinelProject-ERD (5).jpg', '2022-10-03 21:02:59', 'FinelProject-ERD (5).jpg');

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

--
-- Dumping data for table `purchase_history`
--

INSERT INTO `purchase_history` (`purchase_id`, `packageId`, `userId`, `purchase_time`, `price`) VALUES
('62a2f29fb45eb', '23', '62e0438f6d8ac', '2022-06-10 10:28:31', 2),
('62a2f50495c70', '23', '62e0438f6d8ac', '2022-08-09 10:38:44', 2),
('62a2f50495c71', '23', '62bcc7b1b59ef', '2022-06-10 10:38:44', 2),
('62a4eeed5022f', '1', '62bcc7b1b59ef', '2022-08-12 22:37:17', 12),
('63051c9b2ea5f', '62ed19533c125', '62e0438f6d8ac', '2022-08-23 21:29:47', 4),
('63051d8736b0c', '1', '62e0438f6d8ac', '2022-08-23 21:33:43', 99),
('63051ee67315b', '1', '62e0438f6d8ac', '2022-08-23 21:39:34', 99),
('63051fe8d7dab', '628a99d860576', '62e0438f6d8ac', '2022-08-23 21:43:52', 1),
('6305207013765', '628a99d860576', '62e0438f6d8ac', '2022-08-23 21:46:08', 1),
('630521160d7df', '628a99d860576', '62e0438f6d8ac', '2022-08-23 21:48:54', 1),
('6305212e9f199', '628a99d860576', '6308e3a2849f3', '2022-08-23 21:49:18', 1);

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

--
-- Dumping data for table `report_reason`
--

INSERT INTO `report_reason` (`reason_id`, `element_type`, `reason_name`, `create_time`, `active`) VALUES
('1', 'ad', 'שפה לא נאותה', '2022-07-26 00:14:10', 1),
('2', 'ad', 'אחר', '2022-07-26 00:14:10', 1),
('3', 'blog', 'שפה לא נאותה1', '2022-08-21 11:16:29', 1),
('4', 'blog', 'אחר', '2022-08-21 11:16:29', 1),
('630272e7eed5f', 'ad', 'dkdkdk', '2022-08-21 21:01:11', 1),
('6308b4eb944bc', 'blog', 'שינוי מייל', '2022-08-26 14:56:27', 0),
('6308b51eb8b8d', 'משתמש', 'שינוי מייל', '2022-08-26 14:57:18', 0),
('6308b5618d39b', 'user', 'שינוי מייל', '2022-08-26 14:58:25', 1),
('63495efa33aab', 'ad', 'שחזר מודעה', '2022-10-14 16:07:06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` varchar(255) NOT NULL,
  `adsGift` int(11) NOT NULL DEFAULT 0,
  `expireDateAds` int(11) NOT NULL DEFAULT 30,
  `expectedProfit` int(11) NOT NULL DEFAULT 30
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `adsGift`, `expireDateAds`, `expectedProfit`) VALUES
('1', 214, 1001, 4412);

-- --------------------------------------------------------

--
-- Table structure for table `system_messages`
--

CREATE TABLE `system_messages` (
  `msgId` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `message_content` text NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `seen` tinyint(1) NOT NULL DEFAULT 0,
  `msgType` text NOT NULL DEFAULT 'massage',
  `NotificationType` varchar(255) NOT NULL DEFAULT 'Notice'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_messages`
--

INSERT INTO `system_messages` (`msgId`, `userId`, `message_content`, `create_time`, `seen`, `msgType`, `NotificationType`) VALUES
('62f29d48971d6', '62e0438f6d8ac', '62eac000a0b2e 303902', '2022-08-09 20:45:44', 1, 'report', 'Notice'),
('62f800a09e5a6', '62e0438f6d8ac', ' נמחקה\'303902\'מודעה מספר ', '2022-08-13 22:50:56', 1, 'adClosed', 'Notice'),
('62f8016902393', '62e0438f6d8ac', ' מודעה מספר\'303902\'נמחקה', '2022-08-13 22:54:17', 1, 'adClosed', 'notify'),
('62f808b93cef4', '62e0438f6d8ac', ' מודעה מספר303902נמחקה', '2022-08-13 23:25:29', 1, 'adClosed', 'Notice'),
('62f80abd024f7', '62e0438f6d8ac', '62ec109f293fa 62e95d3c18f47', '2022-08-13 23:34:05', 1, 'report', 'Notice'),
('62f80aef6f7d1', '62e0438f6d8ac', '62ec109f293fa 62e95d3c18f47', '2022-08-13 23:34:55', 1, 'report', 'Notice'),
('62f80ffea43ce', '62e0438f6d8ac', ' מודעה מספר 62e95d3c18f47 אושרה ', '2022-08-13 23:56:30', 1, 'aproveAd', 'Notice'),
('62f81001ca51a', '62e0438f6d8ac', ' מודעה מספר 62e9750369bcb לא אושרה ', '2022-08-13 23:56:33', 1, 'declineAd', 'Notice'),
('62f81059247f4', '62e0438f6d8ac', ' מודעה מספר 62e9749d3a01e אושרה ', '2022-08-13 23:58:01', 1, 'aproveAd', 'Notice'),
('62f8105b64944', '62e0438f6d8ac', ' מודעה מספר 62ef7d1be4219 לא אושרה ', '2022-08-13 23:58:03', 1, 'declineAd', 'Notice'),
('62f81091aaa1b', '62e0438f6d8ac', ' מודעה מספר 62eab4f0265c8 אושרה ', '2022-08-13 23:58:57', 1, 'aproveAd', 'Notice'),
('62f810d285dd0', '62e0438f6d8ac', ' מודעה מספר 62ef7d47e399b אושרה ', '2022-08-14 00:00:02', 1, 'aproveAd', 'Notice'),
('62f810d4d6ecd', '62e0438f6d8ac', ' מודעה מספר 62ef7d7d30008 לא אושרה ', '2022-08-14 00:00:04', 1, 'declineAd', 'Notice'),
('62f810f253cfd', '62e0438f6d8ac', ' מודעה מספר 62ef7d47e399b לא אושרה ', '2022-08-14 00:00:34', 1, 'declineAd', 'Notice'),
('62f811f82e3dc', '62e0438f6d8ac', ' מודעה מספר 62f26364846a4 אושרה ', '2022-08-14 00:04:56', 1, 'aproveAd', 'Notice'),
('62f811fa042bd', '62e0438f6d8ac', ' מודעה מספר 62f263681627e לא אושרה ', '2022-08-14 00:04:58', 1, 'declineAd', 'Notice'),
('62f811fbed128', '62e0438f6d8ac', ' מודעה מספר 62f263681627e לא אושרה ', '2022-08-14 00:04:59', 1, 'declineAd', 'Notice'),
('62f811fcac0e6', '62e0438f6d8ac', ' מודעה מספר 62f263681627e לא אושרה ', '2022-08-14 00:05:00', 1, 'declineAd', 'Notice'),
('62f811fd418fe', '62e0438f6d8ac', ' מודעה מספר 62f263681627e לא אושרה ', '2022-08-14 00:05:01', 1, 'declineAd', 'Notice'),
('62f811fe0bfad', '62e0438f6d8ac', ' מודעה מספר 62f263681627e אושרה ', '2022-08-14 00:05:02', 1, 'aproveAd', 'Notice'),
('62f811feddfce', '62e0438f6d8ac', ' מודעה מספר 62f263681627e לא אושרה ', '2022-08-14 00:05:02', 1, 'declineAd', 'Notice'),
('62f81201be9d3', '62e0438f6d8ac', ' מודעה מספר 62f263681627e אושרה ', '2022-08-14 00:05:05', 1, 'aproveAd', 'Notice'),
('62f8120220ba8', '62e0438f6d8ac', ' מודעה מספר 62f263681627e אושרה ', '2022-08-14 00:05:06', 1, 'aproveAd', 'Notice'),
('62f8120277746', '62e0438f6d8ac', ' מודעה מספר 62f263681627e אושרה ', '2022-08-14 00:05:06', 1, 'aproveAd', 'Notice'),
('62fbf94132ec9', '62e0438f6d8ac', 'מודעה חדשה נוצרה והועברה לאישור מנהל', '2022-08-16 23:08:33', 1, 'newAd', 'Notice'),
('62fea40298de1', '62e0438f6d8ac', ' מודעה מספר 303902 <Link to={{ pathname: \'/settings/UserReportsToAds\' }}> אושרה ', '2022-08-18 23:41:38', 1, 'aproveAd', 'Success'),
('62fea4ee33eda', '62e0438f6d8ac', 'מודעה אושרהגד', '2022-08-18 23:45:34', 1, 'aproveAd', 'Success'),
('62fea7a73fc1d', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:11', 1, 'aproveAd', 'Success'),
('62fea7a863bd8', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:12', 1, 'aproveAd', 'Success'),
('62fea7a92d799', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:13', 1, 'aproveAd', 'Success'),
('62fea7a9aa2fe', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:13', 1, 'aproveAd', 'Success'),
('62fea7aa059be', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:14', 1, 'aproveAd', 'Success'),
('62fea7aa205a5', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:14', 1, 'aproveAd', 'Success'),
('62fea7aa4be96', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:14', 1, 'aproveAd', 'Success'),
('62fea7aa7f243', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:14', 1, 'aproveAd', 'Success'),
('62fea7ab0da20', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:15', 1, 'aproveAd', 'Success'),
('62fea7ad93178', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:17', 1, 'aproveAd', 'Success'),
('62fea7ae4fb75', '62e0438f6d8ac', ' מודעה מספר 62fbf94121997 אושרה ', '2022-08-18 23:57:18', 1, 'aproveAd', 'Success'),
('63051ee67c67f', '62e0438f6d8ac', '63051ee67316a', '2022-08-23 21:39:34', 1, ' רכשת חבילה מספר 1 במחיר 99', 'purchase'),
('63051fe8dc3f5', '62e0438f6d8ac', '63051fe8d7db5', '2022-08-23 21:43:52', 1, ' רכשת חבילה מספר 628a99d860576 במחיר 1', 'purchase'),
('630520701c444', '62e0438f6d8ac', '6305207013777', '2022-08-23 21:46:08', 1, ' רכשת חבילה מספר 628a99d860576 במחיר 1', 'purchase'),
('63052116178d0', '62e0438f6d8ac', ' רכשת חבילה מספר 628a99d860576 במחיר 1', '2022-08-23 21:48:54', 1, 'purchase', 'Success'),
('6305212ea4e65', '62e0438f6d8ac', ' רכשת חבילה מספר 628a99d860576 במחיר 1', '2022-08-23 21:49:18', 1, 'purchase', 'Success'),
('630522a666840', '62e0438f6d8ac', '62ec109f293fa 62f263681627e', '2022-08-23 21:55:34', 1, 'report', 'Notice'),
('630690780f4dd', '62e0438f6d8ac', ' מודעה מספר62fbf94121997 נמחקה ', '2022-08-24 23:56:24', 1, 'adClosed', 'Notice'),
('6306909673ef6', '62e0438f6d8ac', ' מודעה מספר62fbf94121997 נמחקה ', '2022-08-24 23:56:54', 1, 'adClosed', 'Notice'),
('6306909914866', '62e0438f6d8ac', ' מודעה מספר62f263681627e נמחקה ', '2022-08-24 23:56:57', 1, 'adClosed', 'Notice'),
('630690a0dfedb', '62e0438f6d8ac', ' מודעה מספר62ef7d4fe5f90 נמחקה ', '2022-08-24 23:57:04', 1, 'adClosed', 'Notice'),
('63069262099db', '62e0438f6d8ac', ' מודעה מספר62f26364846a4 נמחקה ', '2022-08-25 00:04:34', 1, 'adClosed', 'Notice'),
('63069264bc801', '62e0438f6d8ac', ' מודעה מספר62f26364846a4 נמחקה ', '2022-08-25 00:04:36', 1, 'adClosed', 'Notice'),
('6306926a080c6', '62e0438f6d8ac', ' מודעה מספר62f26364846a4 נמחקה ', '2022-08-25 00:04:42', 1, 'adClosed', 'Notice'),
('6306926e6f7d6', '62e0438f6d8ac', ' מודעה מספר62f26364846a4 נמחקה ', '2022-08-25 00:04:46', 1, 'adClosed', 'Notice'),
('63069298ac21a', '62e0438f6d8ac', ' מודעה מספר62ef7d5c4cd51 נמחקה ', '2022-08-25 00:05:28', 1, 'adClosed', 'Notice'),
('630692a1a1a84', '62e0438f6d8ac', ' מודעה מספר62eab4f0265c8 נמחקה ', '2022-08-25 00:05:37', 1, 'adClosed', 'Notice'),
('630692ce567f7', '62e0438f6d8ac', ' מודעה מספר62eab4f0265c8 נמחקה ', '2022-08-25 00:06:22', 1, 'adClosed', 'Notice'),
('630692d14caf4', '62e0438f6d8ac', ' מודעה מספר62eab4f0265c8 נמחקה ', '2022-08-25 00:06:25', 1, 'adClosed', 'Notice'),
('630692e2cdf16', '62e0438f6d8ac', ' מודעה מספר62eab4f0265c8 נמחקה ', '2022-08-25 00:06:42', 1, 'adClosed', 'Notice'),
('630692fc7e6e8', '62e0438f6d8ac', ' מודעה מספר62f170398ef46 נמחקה ', '2022-08-25 00:07:08', 1, 'adClosed', 'Notice'),
('63069311a5448', '62e0438f6d8ac', ' מודעה מספר62e9749d3a01e נמחקה ', '2022-08-25 00:07:29', 1, 'adClosed', 'Notice'),
('6306933bf13f7', '62e0438f6d8ac', ' מודעה מספר62f263681627e נמחקה ', '2022-08-25 00:08:12', 1, 'adClosed', 'Notice'),
('63088011ad855', '62e0438f6d8ac', ' מודעה מספר 62e95d3c18f47 אושרה ', '2022-08-26 11:10:57', 1, 'aproveAd', 'Success'),
('6308dccb06c37', '62e0438f6d8ac', ' מודעה מספר2 נמחקה ', '2022-08-26 17:46:35', 0, 'adClosed', 'Notice'),
('630b23cdcb492', '2', '2 ', '2022-08-28 11:14:05', 0, 'report', 'Notice'),
('630b24f7a9fa5', '2', '2 ', '2022-08-28 11:19:03', 0, 'report', 'Notice'),
('630b256d3371d', '2', '2 ', '2022-08-28 11:21:01', 0, 'report', 'Notice'),
('630b25a803c81', '2', '2 ', '2022-08-28 11:22:00', 0, 'report', 'Notice'),
('630b2b26b1a3a', '62c7eb0759d47', ' מודעה מספר62e95cce4de81 נמחקה ', '2022-08-28 11:45:26', 1, 'adClosed', 'Notice'),
('630b2b3e57b45', '62c7eb0759d47', ' מודעה מספר62e83f19278e1 נמחקה ', '2022-08-28 11:45:50', 1, 'adClosed', 'Notice'),
('630b982cb5b97', '6308e3a2849f3', 'מודעה חדשה נוצרה והועברה לאישור מנהל', '2022-08-28 19:30:36', 1, 'newAd', 'Notice'),
('630f86d81f7c2', '62c7eb0759d47', ' מודעה מספר 62e95d3c18f47 אושרה ', '2022-08-31 19:05:44', 1, 'aproveAd', 'Success'),
('630f8f67c9ff4', '2', '2 ', '2022-08-31 19:42:15', 0, 'report', 'Notice'),
('630f8f97a1920', '6308e3a2849f3', ' מודעה מספר 630b982ca3319 אושרה ', '2022-08-31 19:43:03', 1, 'aproveAd', 'Success'),
('6310b10c1bafd', '6308e3a2849f3', ' מודעה מספר 630b982ca3319 לא אושרה ', '2022-09-01 16:18:04', 1, 'declineAd', 'Error'),
('6310b140253dd', '6308e3a2849f3', ' מודעה מספר 630b982ca3319 אושרה ', '2022-09-01 16:18:56', 1, 'aproveAd', 'Success'),
('6310b1432b965', '2', ' מודעה מספר 2 לא אושרה ', '2022-09-01 16:18:59', 0, 'declineAd', 'Error'),
('6310b80f46096', '2', ' מודעה מספר 2 אושרה ', '2022-09-01 16:47:59', 0, 'aproveAd', 'Success'),
('6310b8f7c4ec2', '6308e3a2849f3', ' מודעה מספר 630b982ca3319 אושרה ', '2022-09-01 16:51:51', 1, 'aproveAd', 'Success'),
('6310b8fc76773', '6308e3a2849f3', ' מודעה מספר 630b982ca3319 אושרה ', '2022-09-01 16:51:56', 1, 'aproveAd', 'Success'),
('6310b8fd390c2', '6308e3a2849f3', ' מודעה מספר 630b982ca3319 אושרה ', '2022-09-01 16:51:57', 1, 'aproveAd', 'Success'),
('6310b8fe99582', '6308e3a2849f3', ' מודעה מספר 630b982ca3319 לא אושרה ', '2022-09-01 16:51:58', 1, 'declineAd', 'Error'),
('6310b92f920ea', '6308e3a2849f3', ' מודעה מספר 630b982ca3319 אושרה ', '2022-09-01 16:52:47', 1, 'aproveAd', 'Success'),
('6310b961bc6a0', '62c7eb0759d47', ' מודעה מספר 62f2627b5972e אושרה ', '2022-09-01 16:53:37', 1, 'aproveAd', 'Success'),
('6310bb2c0fe05', '62c7eb0759d47', ' מודעה מספר 62f26364846a4 לא אושרה ', '2022-09-01 17:01:16', 1, 'declineAd', 'Error'),
('6310bb2d927a9', '62c7eb0759d47', ' מודעה מספר 62f263681627e אושרה ', '2022-09-01 17:01:17', 1, 'aproveAd', 'Success'),
('6310e59511718', '6308e3a2849f3', 'מודעה חדשה נוצרה והועברה לאישור מנהל', '2022-09-01 20:02:13', 1, 'newAd', 'Notice'),
('6310e5ab979ef', '6308e3a2849f3', 'מודעה חדשה נוצרה והועברה לאישור מנהל', '2022-09-01 20:02:35', 1, 'newAd', 'Notice'),
('6310e5c9a76ff', '6308e3a2849f3', 'מודעה חדשה נוצרה והועברה לאישור מנהל', '2022-09-01 20:03:05', 1, 'newAd', 'Notice'),
('6310e663419bd', '6308e3a2849f3', 'מודעה חדשה נוצרה והועברה לאישור מנהל', '2022-09-01 20:05:39', 1, 'newAd', 'Notice'),
('6310e6d4e8524', '6308e3a2849f3', 'מודעה חדשה נוצרה והועברה לאישור מנהל', '2022-09-01 20:07:32', 1, 'newAd', 'Notice'),
('631127c7aa4be', '6308e3a2849f3', '63111e8045553 62e83f0827d3a', '2022-09-02 00:44:39', 1, 'report', 'Notice'),
('63112826d3d9e', '6308e3a2849f3', '63111e8045553 2', '2022-09-02 00:46:14', 1, 'report', 'Notice'),
('63112a480c62f', '2', '63111e8045553 2', '2022-09-02 00:55:20', 0, 'report', 'Notice'),
('63112a948ae4e', '2', '63111e8045553 2', '2022-09-02 00:56:36', 0, 'report', 'Notice'),
('63112cbe0af1f', '2', '63111e8045553 2', '2022-09-02 01:05:50', 0, 'report', 'Notice'),
('63112d7f740e2', '2', '63111e8045553 2', '2022-09-02 01:09:03', 0, 'report', 'Notice'),
('63112e8f4fddf', '2', '63111e8045553 2', '2022-09-02 01:13:35', 0, 'report', 'Notice'),
('63112ede4f7bf', '2', '63111e8045553 2', '2022-09-02 01:14:54', 0, 'report', 'Notice'),
('63112f13c2747', '2', '63111e8045553 2', '2022-09-02 01:15:47', 0, 'report', 'Notice'),
('63112f75d2dc7', '62c7eb0759d47', '630b94f315197 62e83f0827d3a', '2022-09-02 01:17:25', 1, 'report', 'Notice'),
('63112fb39d49e', '62c7eb0759d47', '630b94f315197 62e83f0827d3a', '2022-09-02 01:18:27', 0, 'report', 'Notice'),
('63112ff6c36b3', '62c7eb0759d47', '630b94f315197 62e83f0827d3a', '2022-09-02 01:19:34', 1, 'report', 'Notice'),
('6311304d0c78b', '62c7eb0759d47', '630b94f315197 62e83f0827d3a', '2022-09-02 01:21:01', 1, 'report', 'Notice'),
('631b1cc25d8db', '62c7eb0759d47', ' מודעה מספר 62f41963f1aeb לא אושרה ', '2022-09-09 14:00:18', 1, 'declineAd', 'Error'),
('631b1cc6209b9', '2', ' מודעה מספר 6310e5950d2e4 לא אושרה ', '2022-09-09 14:00:22', 0, 'declineAd', 'Error'),
('631b1cc83a3ec', '2', ' מודעה מספר 6310e5ab9080b אושרה ', '2022-09-09 14:00:24', 0, 'aproveAd', 'Success'),
('631b1cf552a6f', '6308e3a2849f3', ' מודעה מספר 630b982ca3319 לא אושרה ', '2022-09-09 14:01:09', 0, 'declineAd', 'Error'),
('631e1bd22f40c', '6308e3a2849f3', ' מודעה מספר 6310e5c9a0f97 אושרה ', '2022-09-11 20:33:06', 0, 'aproveAd', 'Success'),
('631e2f004785e', '6308e3a2849f3', ' מודעה מספר 6310e6633b61e לא אושרה ', '2022-09-11 21:54:56', 0, 'declineAd', 'Error'),
('633025381a05d', '6314c734aea38', 'מודעה חדשה נוצרה והועברה לאישור מנהל', '2022-09-25 12:54:00', 1, 'newAd', 'Notice'),
('633b31e32d82b', '62c7eb0759d47', 'מודעה חדשה נוצרה והועברה לאישור מנהל', '2022-10-03 22:02:59', 1, 'newAd', 'Notice'),
('633b360a45c64', '6308e3a2849f3', ' מודעה מספר6310e5c9a0f97 נמחקה ', '2022-10-03 22:20:42', 0, 'adClosed', 'Notice'),
('633b360e76187', '6308e3a2849f3', ' מודעה מספר6310e5c9a0f97 נמחקה ', '2022-10-03 22:20:46', 0, 'adClosed', 'Notice'),
('633b3613a4bd3', '6308e3a2849f3', ' מודעה מספר6310e5c9a0f97 נמחקה ', '2022-10-03 22:20:51', 0, 'adClosed', 'Notice'),
('633b3617324ec', '6308e3a2849f3', ' מודעה מספר6310e5c9a0f97 נמחקה ', '2022-10-03 22:20:55', 0, 'adClosed', 'Notice'),
('633b36182fb05', '6308e3a2849f3', ' מודעה מספר6310e5c9a0f97 נמחקה ', '2022-10-03 22:20:56', 0, 'adClosed', 'Notice'),
('633b361bc2bb2', '6308e3a2849f3', ' מודעה מספר6310e5c9a0f97 נמחקה ', '2022-10-03 22:20:59', 0, 'adClosed', 'Notice'),
('633b362259ac9', '6308e3a2849f3', ' מודעה מספר6310e5c9a0f97 נמחקה ', '2022-10-03 22:21:06', 0, 'adClosed', 'Notice'),
('633f3f8fcab4c', '62c7eb0759d47', ' מודעה מספר633b31e322971 נמחקה ', '2022-10-06 23:50:23', 1, 'adClosed', 'Notice'),
('633f3f9310bff', '62c7eb0759d47', ' מודעה מספר633b31e322971 נמחקה ', '2022-10-06 23:50:27', 1, 'adClosed', 'Notice'),
('633f3f93eff60', '62c7eb0759d47', ' מודעה מספר633b31e322971 נמחקה ', '2022-10-06 23:50:28', 1, 'adClosed', 'Notice'),
('633f416f3d48d', '62c7eb0759d47', ' מודעה מספר633b31e322971 נמחקה ', '2022-10-06 23:58:23', 1, 'adClosed', 'Notice'),
('633f41720af2f', '62c7eb0759d47', ' מודעה מספר633b31e322971 נמחקה ', '2022-10-06 23:58:26', 1, 'adClosed', 'Notice'),
('633f417311008', '62c7eb0759d47', ' מודעה מספר633b31e322971 נמחקה ', '2022-10-06 23:58:27', 1, 'adClosed', 'Notice'),
('633f41734dfd9', '62c7eb0759d47', ' מודעה מספר633b31e322971 נמחקה ', '2022-10-06 23:58:27', 1, 'adClosed', 'Notice'),
('633f41738ab82', '62c7eb0759d47', ' מודעה מספר633b31e322971 נמחקה ', '2022-10-06 23:58:27', 1, 'adClosed', 'Notice'),
('6349585014371', '2', ' מודעה מספר6310e5ab9080b נמחקה ', '2022-10-14 15:38:40', 0, 'adClosed', 'Notice'),
('63495ccb34799', '2', ' מודעה מספר6310e5ab9080b שוחזרה ', '2022-10-14 15:57:47', 0, 'aproveAd', 'Notice'),
('63495ccfda19a', '2', ' מודעה מספר6310e5ab9080b שוחזרה ', '2022-10-14 15:57:51', 0, 'aproveAd', 'Notice'),
('63495ce1a785e', '2', ' מודעה מספר6310e5ab9080b שוחזרה ', '2022-10-14 15:58:09', 0, 'aproveAd', 'Notice'),
('63495ce4be34e', '2', ' מודעה מספר6310e5ab9080b שוחזרה ', '2022-10-14 15:58:12', 0, 'aproveAd', 'Notice'),
('63495cf5dfd02', '2', ' מודעה מספר2 נמחקה ', '2022-10-14 15:58:29', 0, 'adClosed', 'Notice'),
('63495d0ed3bb8', '2', ' מודעה מספר6310e5ab9080b נמחקה ', '2022-10-14 15:58:54', 0, 'adClosed', 'Notice'),
('63495d43db263', '2', ' מודעה מספר6310e5ab9080b שוחזרה ', '2022-10-14 15:59:47', 0, 'aproveAd', 'Notice'),
('63495d7a7a50b', '2', ' מודעה מספר6310e5ab9080b נמחקה ', '2022-10-14 16:00:42', 0, 'adClosed', 'Notice'),
('63495d82e8828', '2', ' מודעה מספר6310e5ab9080b נמחקה ', '2022-10-14 16:00:50', 0, 'adClosed', 'Notice'),
('63495d9f728d5', '2', ' מודעה מספר6310e5ab9080b שוחזרה ', '2022-10-14 16:01:19', 0, 'aproveAd', 'Notice'),
('63495dd6e9d46', '2', ' מודעה מספר6310e5ab9080b נמחקה ', '2022-10-14 16:02:14', 0, 'adClosed', 'Notice'),
('6349601249d68', '6308e3a2849f3', ' מודעה מספר 6310e6d4e271f אושרה ', '2022-10-14 16:11:46', 0, 'aproveAd', 'Success'),
('63496027227bd', '6314c734aea38', ' מודעה מספר 633025380f00d לא אושרה ', '2022-10-14 16:12:07', 0, 'declineAd', 'Error'),
('6349602911827', '6314c734aea38', ' מודעה מספר 633025380f00d לא אושרה ', '2022-10-14 16:12:09', 0, 'declineAd', 'Error'),
('63496029e8c18', '6314c734aea38', ' מודעה מספר 633025380f00d לא אושרה ', '2022-10-14 16:12:09', 0, 'declineAd', 'Error'),
('6349602aeb185', '6314c734aea38', ' מודעה מספר 633025380f00d אושרה ', '2022-10-14 16:12:10', 0, 'aproveAd', 'Success'),
('6349602be4999', '6314c734aea38', ' מודעה מספר 633025380f00d אושרה ', '2022-10-14 16:12:11', 0, 'aproveAd', 'Success'),
('6349602f5f8a4', '6314c734aea38', ' מודעה מספר 633025380f00d לא אושרה ', '2022-10-14 16:12:15', 0, 'declineAd', 'Error'),
('6349602faa39d', '6314c734aea38', ' מודעה מספר 633025380f00d לא אושרה ', '2022-10-14 16:12:15', 0, 'declineAd', 'Error'),
('6349602fd9382', '6314c734aea38', ' מודעה מספר 633025380f00d לא אושרה ', '2022-10-14 16:12:15', 0, 'declineAd', 'Error'),
('63496030cb8a0', '6314c734aea38', ' מודעה מספר 633025380f00d אושרה ', '2022-10-14 16:12:16', 0, 'aproveAd', 'Success'),
('63505855a718b', '6314c734aea38', ' מודעה מספר633025380f00d נמחקה ', '2022-10-19 23:04:37', 0, 'adClosed', 'Notice'),
('635175594a6b0', '6308e3a2849f3', ' מודעה מספר6310e6d4e271f נמחקה ', '2022-10-20 19:20:41', 0, 'adClosed', 'Notice');

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
  `rule` varchar(255) NOT NULL,
  `refreshToken` varchar(450) NOT NULL,
  `remaining_ads` int(11) NOT NULL DEFAULT 0,
  `privateSharedKey` text NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uuid`, `first_name`, `last_name`, `phone`, `mail`, `create_time`, `password`, `last_seen`, `prompt`, `rule`, `refreshToken`, `remaining_ads`, `privateSharedKey`, `active`) VALUES
('1888', 'lidor', 'ben shimol', '05421565045', 'lidor', '2022-10-20 22:34:08', '$2y$10$vtwitsoqvMynNo7p2idBwuHrMIHPyArBxsva80.ZWVAamOqttqcuC\r\n', '2022-10-20 22:34:08', '', '5150', '', 0, '', 1),
('2', 'lidor', 'ben shimol', '0542155045', 'ha@ww.com', '2022-04-06 17:52:19', '123', '2022-08-11 15:18:43', '', '5150', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTg3NzMyOTYsImp0aSI6IlkvRU5ELzVYVUhMMlZKVTc2NzFSRmc9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY1ODc3MzI5NiwiZXhwIjoxNjU4ODU5Njk2LCJkYXRhIjp7InVzZXIiOiJBQUFAYS5jb20ifX0.Wv5Z8XZD3GWdJuL5eMYYGUzJU8tDcHJi1uuwqgTJ2Hs', 0, '', 1),
('62bcc7b1b59ef', 'ck', 'kdk', 'kdk', 'ha@g.com', '2022-06-30 00:44:17', '$2y$10$.h9krhZmmhHVGiUiGIvmjueOhG4Dj01/W4RGzRIPqZ8pn3BsHkHBK', '2022-06-30 00:44:17', 'ckk', '5150', 'ds', 1000, '', 1),
('62c5f48d0980d', 'יעל', 'ברוך', '4499439', 'haimm@g.com', '2022-07-06 23:46:05', '$2y$10$qqkNJ8pxpwK1YfebDHJagOEU5mx0QLFAJOI79hI7tJDNw5YL5GfVi', '2022-07-06 23:46:05', 'cck', '5150', 'ds', 500, '', 1),
('62c73563df771', 'בנצי', 'חבר', '', 'jj@jj.com', '2022-07-07 22:34:59', '$2y$10$hkQbtWPYiuU0u9sqBn6Qp.a8hk9zDNamH7OOMNl02wCekqy1WjllG', '2022-07-07 22:34:59', '', '2001', 'ds', 5, '', 1),
('62c735c0ae12d', 'יהודה', 'רוקח', '1', 'jfkjfkj@kd.com', '2022-07-07 22:36:32', '$2y$10$Kt8m0so9HYc3UD1RlkRcFeZSx0cTWF7ZjshtsbgVcTC4t5Gh1GeZq', '2022-07-07 22:36:32', 'xk', '2001', 'ds', 5, '', 1),
('62c73834b2320', 'אפרים', 'שמעון', '', 'klvkldf@fkdf.com', '2022-07-07 22:47:00', '$2y$10$BBSSTosdisz2ZV27NNn.x.HaxIGSVLH77XJjHYV8.1ausaK3HwT9i', '2022-07-07 22:47:00', '', '2001', 'ds', 5, '', 1),
('62c7eb0759d47', 'חיים', 'מונהייט', '050555555', 'haim17701@gmail.com', '2022-07-08 11:29:59', '$2y$10$6l.ELDYr7QcQeFpAz/vaCe46NP46xECe7gh.6FlfIAluCbC1o46ye', '2022-10-20 22:51:17', 'xk', '5150', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjYyMDg4MDIsImp0aSI6IkJXcUhONVNjR3JOMVBMUDZTaFdidVE9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY2NjIwODgwMiwiZXhwIjoxNjY2Mjk1MjAyLCJkYXRhIjp7InVzZXIiOiJoYWltMTc3MDFAZ21haWwuY29tIn19.fmdcums4IT6eFTI7T3SpbR5mPqPPpRy8TbEwU0OcZbY', 0, '39296223', 1),
('62c7eb20d6dbf', 'רונה', 'קינן', '3323432432', 'kdfkl@kf.com', '2022-07-08 11:30:24', '$2y$10$N46g16Wdy0McyZ3RqH54VO4lWe4QRUNj/W9gZdlZ2z50MqLhWzyj.', '2022-07-08 11:30:24', 'c', '2001', 'ds', 5, '', 1),
('62c7eb4d0aa06', 'רונית', 'גיל', '', 'ksl@kfk.com', '2022-07-08 11:31:09', '$2y$10$qcmJmG/bEqr3lDhkitxvR..4qnD0742hQ.kz8zKQr9PTgL0vrR0PO', '2022-07-08 11:31:09', '', '2001', 'ds', 5, '', 1),
('62c7ebda1e8f3', 'חלי', 'אור', '', 'jdsj@cjkc.com', '2022-07-08 11:33:30', '$2y$10$L4qThBb9HH9Ba9JgSepoVu9ng99R8flUK7XATmPtKzWrW7M/cXbl6', '2022-07-08 11:33:30', 'k', '2001', 'ds', 5, '', 1),
('62c7ed85ef2d8', 'שניר', 'עטיה', '', 'kkxg@mail.com', '2022-07-08 11:40:38', '$2y$10$.99o3J3ym1sBoljHRUC.Q.DOxq5TFIRshVF/m6QiGiKWXGdyfavCG', '2022-07-08 11:40:38', '', '2001', 'ds', 5, '', 1),
('62c7edcc54605', 'לידור', 'אמיר', '', 'kk@fkfk.com', '2022-07-08 11:41:48', '$2y$10$Uy4vRLlJBoCJV0hVDlJ/teYl3lODIpjo83R1ok/Wz2OlAWBhHPpZ6', '2022-07-08 11:41:48', '', '2001', 'ds', 5, '', 1),
('62c7ee0d56804', 'חיים', 'שורק', '', 'kfdkdk@kdkdk.com', '2022-07-08 11:42:53', '$2y$10$bBICNbyK8Q0ebsyEowcjVOhUC6h30egqu2DMzGgaPK4FyzYRpg7Sa', '2022-07-08 11:42:53', '', '2001', 'ds', 5, '', 1),
('62c7ee48b2d9a', 'דני', 'אלעד', '', 'jc!vc2@kck.com', '2022-07-08 11:43:52', '$2y$10$23UiSvTPzpSjhDIFFNSNg.9883Kq/kaMAorHsKoUx14wNQra3EZzG', '2022-07-08 11:43:52', '', '2001', 'ds', 5, '', 1),
('62e0438f6d8ac', 'נוי', 'לוי', '33', 'kfkfk@kkf.com', '2022-09-04 18:40:54', '$2y$10$Qcm67bzD/yNLxkX3vWqtO.w0HIjt2SzCjQcCQOIKRu2MFXZTYQMhG', '2022-09-04 18:40:54', 'kckw', '2001', 'ds', 21474, '', 1),
('6308dec066530', 'חיים', 'גורי', '93939393', 'mon@g.com', '2022-08-26 17:54:56', '$2y$10$DdkbJO..Yk2wQ96r1MU1T.AXiQgJSmmArCuc1C7/b06dQoiVO81X.', '2022-08-26 17:54:56', '39', '2001', 'ds', 21474, '', 1),
('6308e3a2849f3', 'שיר', 'אבו', '32324242', 'haim@gg.com', '2022-08-26 18:15:46', '$2y$10$BTfUNc8l5VYpXIT3tmfZFuEtlY2kJkgpym2uyJ0bfObJH/KC1tj7m', '2022-09-04 17:40:51', 'cd', '5150', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE3MDM5MzcsImp0aSI6InFvVjFVZHp3YlRBRlJEdlVpZndZTFE9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY2MTcwMzkzNywiZXhwIjoxNjYxNzkwMzM3LCJkYXRhIjp7InVzZXIiOiJoYWltQGdnLmNvbSJ9fQ.bpd_WxKBGXYprVS7a20mnIWJ5Ke9o2dJ5WpHhG80qrw', 43, '7121349', 1),
('6314c40b67d94', 'מנחם', 'שני', '0303939393', 'ddkl@ddk.com', '2022-09-04 18:28:11', '$2y$10$/7e7obY7H3ganX.mK1RqI.LXT/Z40fA70NvMCJ0PjUwnxukGJSHle', '2022-09-04 18:28:11', 'ckksk', '2001', 'ds', 21474, '', 1),
('6314c6022a480', 'שלמה', 'ארצי', '3993939993', 'haim@kwwk.com', '2022-09-04 18:36:34', '$2y$10$23ECguQ/W3KJTMtqp/fKNu15ker/scpDUTMdnyfahJtXW4KIsTpAm', '2022-09-04 18:36:34', 'kcdkckskc', '2001', 'ds', 21474, '', 1),
('6314c6865c74f', 'מירי', 'מסיקה', '3383838383', 'fkjfjf@fkfk.com', '2022-09-04 18:38:46', '$2y$10$PIKu.7jA5obF0eiY0YMdle/9o7r6sikSlCvMD5yhjAFIz0hbRkvJm', '2022-09-04 18:38:46', 'jcjc', '2001', 'ds', 21474, '', 1),
('6314c734aea38', 'שירה', 'לוי', '299292', 'hg@g.com', '2022-09-04 18:41:40', '$2y$10$s7LuiSMwi2rQKYaFvUQDPOEOGL8sm6/LdiBKsgmva2OcWHmx9pMf2', '2022-09-28 20:59:02', 'd', '5150', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIzMDc3MzQsImp0aSI6Im05UVdhaXF4MHV5TWhlZHpkaU1keVE9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY2MjMwNzczNCwiZXhwIjoxNjYyMzk0MTM0LCJkYXRhIjp7InVzZXIiOiJoZ0BnLmNvbSJ9fQ.5WbZ5Iq_bDsBYbrxwyQ9Ab6yqcdhxfVf0g6ZASlKa2U', 21474, '87260048', 1),
('6346d4eb15e8b', 'אביב', 'חיים', '2232323232', 'haim@ekek.com', '2022-10-12 17:53:31', '$2y$10$U6m7tKJLwsb3SY1H4.EtlO5N5r/H1bA3.LpPrSD7B503hvEbit6HC', '2022-10-12 17:53:31', '', '2001', 'ds', 21474, '', 1),
('6346d50bcc049', 'שגיא', 'לב', '2223232323', 'dj@d.com', '2022-10-12 17:54:03', '$2y$10$EBqZq.9MVLfzQAsRhcLstOOlYSmYwTs7TLTBtD3glLn1i85.KfB9.', '2022-10-12 17:54:03', '', '2001', 'ds', 21474, '', 1),
('6346d5359b596', 'רוני', 'דוד', '133', 'j@j.com', '2022-10-12 17:54:45', '$2y$10$cP5khQwppcYwbXScKLY/geDNdsEYXqYQ7cDK8kvvEbqcgr6Cicgrm', '2022-10-12 17:55:53', '', '2001', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjU1ODY1NDUsImp0aSI6IitkSklyYnN6TjRuYUUyS1A3V2ZxUEE9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY2NTU4NjU0NSwiZXhwIjoxNjY1NjcyOTQ1LCJkYXRhIjp7InVzZXIiOiJqQGouY29tIn19.ufM_JWJjGbX43ln0BQs5h_7wgEvmSgWCmg84-sKlQU4', 21474, '12382540', 1),
('6346d588d604a', 'משה', 'כהן', '33', 'j@j1.com', '2022-10-12 17:56:08', '$2y$10$Mc.iqYb4iwCB0Mo535iHMuecRq2QhDq6LEryHnM6R4W6BknuJrgdC', '2022-10-12 22:51:21', '', '2001', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjU1ODY1NzUsImp0aSI6ImppSUxhYTR5dnV5d3V1RG11elpHS0E9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY2NTU4NjU3NSwiZXhwIjoxNjY1NjcyOTc1LCJkYXRhIjp7InVzZXIiOiJqQGoxLmNvbSJ9fQ.PDCe_jAFdFYa33gxLdyNiqWBuIGPELwUuLMLUPW9qc8', 21474, '90539050', 1),
('63471ac956015', 'אבי', 'בניה', '39', 'jh@s.com', '2022-10-12 22:51:37', '$2y$10$Car7kq6xPf0Riermf.iOp.ipIHv1ZWdaBW8MnWVtSYWY.RsrOylb6', '2022-10-12 22:51:37', '', '2001', 'ds', 21474, '', 1),
('haimke', 'll', 'll', 'll', 'll', '2022-05-08 23:14:16', '627824989503e', '2022-05-08 23:14:16', 'k', '5150', '', 0, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_reports`
--

CREATE TABLE `user_reports` (
  `id` varchar(50) NOT NULL,
  `element_id` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `content` text NOT NULL,
  `title` varchar(255) NOT NULL,
  `manage_feedback` text NOT NULL,
  `report_reason` varchar(50) NOT NULL,
  `element_type` text NOT NULL,
  `seen` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_reports`
--

INSERT INTO `user_reports` (`id`, `element_id`, `userId`, `create_time`, `active`, `content`, `title`, `manage_feedback`, `report_reason`, `element_type`, `seen`) VALUES
('2', '2', '2', '2022-08-28 11:12:10', 0, 'jdj', 'ha@ww.com', 'lld', 'שינוי מייל', 'user', 0),
('6308e8a5dfc1f', '7', 'guest', '2022-08-26 18:37:09', 0, 'd', 'ddq', 'kfkfkf', 'שפה לא נאותה1', 'blog', 0),
('630b94f315197', '62e83f0827d3a', '2', '2022-08-28 19:16:51', 0, 'ךגך', 'לכל', 'lfldflfll', 'שפה לא נאותה', 'ad', 0),
('630f85bedd141', '62e83be3959d5', '6308e3a2849f3', '2022-08-31 19:01:02', 0, 'DKWSDK', 'KCKFKD', 'fk', 'שפה לא נאותה', 'ad', 1),
('63111e8045553', '2', '6308e3a2849f3', '2022-09-02 00:05:04', 1, 'kskdkdk', 'dkdkdkkdkd', '', 'שפה לא נאותה', 'ad', 1),
('63111e9429a32', '62f2627b5972e', '6308e3a2849f3', '2022-09-02 00:05:24', 0, 'kdkdk', 'ddkdk', 'kfkf', 'שפה לא נאותה', 'ad', 1),
('631e30ffd4e10', '6310e5c9a0f97', '6314c734aea38', '2022-09-11 22:03:27', 1, 'ךגך', 'לג', '', 'שפה לא נאותה', 'ad', 1),
('6347205f4ae87', '6310e5ab9080b', 'guest', '2022-10-12 23:15:27', 0, 'kdkd', 'kdkd', 'חיים שיששי', 'שפה לא נאותה', 'ad', 0),
('6347218fe7092', '2', 'guest', '2022-10-12 23:20:31', 1, 'kd', 'fk', '', 'אחר', 'ad', 0),
('6347219a0701d', '2', 'guest', '2022-10-12 23:20:42', 1, ',', 'lkf', '', 'dkdkdk', 'ad', 0),
('634721fc42a27', '6310e5ab9080b', 'guest', '2022-10-12 23:22:20', 1, 'kdkd', 'kkd', '', 'שפה לא נאותה', 'ad', 0),
('634729d7a2042', '6310e5ab9080b', 'guest', '2022-10-12 23:55:51', 1, 'dk', 'fk', '', 'שפה לא נאותה', 'ad', 0),
('63472a4fc704a', '6310e5ab9080b', 'guest', '2022-10-12 23:57:51', 1, 'd', 'df', '', 'שפה לא נאותה', 'ad', 0),
('63472b25434b0', '6310e5ab9080b', 'guest', '2022-10-13 00:01:25', 1, 'f', 'f', '', 'שפה לא נאותה', 'ad', 0),
('63472c8b4778b', '2', 'guest', '2022-10-13 00:07:23', 1, 'w', 'd', '', 'אחר', 'blog', 0),
('63486cc5aa56e', '62e8309e4d0f2', 'guest', '2022-10-13 22:53:41', 1, 'ekk', 'kdk', '', 'שפה לא נאותה', 'ad', 0),
('63486d06e1850', '303902', 'guest', '2022-10-13 22:54:46', 1, 'dkd', 'kdkdf', '', 'שפה לא נאותה', 'ad', 0),
('63486d0e952aa', '62e8309e4d0f2', 'guest', '2022-10-13 22:54:54', 1, 'k', 'kf', '', 'שפה לא נאותה', 'ad', 0),
('63486d3bb6cdc', '62e8309e4d0f2', 'guest', '2022-10-13 22:55:39', 1, 'kdk', 'kfkf', '', 'שפה לא נאותה', 'ad', 0),
('63486d8f603f1', '6310e5ab9080b', 'guest', '2022-10-13 22:57:03', 1, 'lk', 'ldf', '', 'שפה לא נאותה', 'ad', 0),
('63486dd8bcef0', '6310e5ab9080b', 'guest', '2022-10-13 22:58:16', 1, 'd', 'f', '', 'שפה לא נאותה', 'ad', 0),
('63486e0863a41', '6310e5ab9080b', 'guest', '2022-10-13 22:59:04', 1, 'kd', 'fkk', '', 'אחר', 'ad', 0),
('63486e228f8a0', '6310e5ab9080b', 'guest', '2022-10-13 22:59:30', 1, 'd', 'd', '', 'שפה לא נאותה', 'ad', 0);

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
-- Indexes for table `blogcomments`
--
ALTER TABLE `blogcomments`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userMail` (`userMail`);

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Indexes for table `user_reports`
--
ALTER TABLE `user_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_reason` (`report_reason`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `password_recovery`
--
ALTER TABLE `password_recovery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
