-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2022 at 05:20 PM
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
('12', 'קנייה', 1, 'דירה', 'עפולה', 'street', 0, '62c7ee0d56804', '2022-05-21 18:53:41', 1, 4, 179, 'W', '2022-05-25 21:52:10', 'reject', 1, '1', '1', '1', '1', '1', 1, '', '', '', 0, 0, '2022-08-02 20:30:40', 'ws', '', ''),
('303902', 'השכרה', 149039, 'דירה', 'חיפה', 'התיכון', 0, '62e0438f6d8ac', '2022-06-29 19:55:20', 1, 12, 79, NULL, '0000-00-00 00:00:00', 'aproved', 12, '1', '1', '1', '', '', 1, '1', '3', 'עכשיו', 12, 11, '2022-08-02 20:30:40', 'mk', '', ''),
('55', 'קנייה', 2002, 'דירה', 'חיפה', 'hagalil', 0, '62e0438f6d8ac', '2022-05-05 13:19:11', 1, 0, 298, NULL, '0000-00-00 00:00:00', 'aproved', 1, '1', '1', '3', '', '', 5, '', '', '', 0, 0, '2022-08-02 20:30:40', 'ad dfflink 3', '', ''),
('552', 'קנייה', 2002, 'בית פרטי', 'חיפה', 'hagalil', 111111, '62e0438f6d8ac', '2022-05-05 13:19:11', 1, 0, 291, NULL, '2025-02-02 21:17:08', 'aproved', 1, '1', '1', '3', '', '', 5, '', '', '', 0, 0, 'גמיש', 'ad dfflink 3', '', ''),
('62e81dfb9fbb0', 'קנייה', 8, 'דירה', 'צביה ', 'האלה', 88, '62e0438f6d8ac', '2022-08-01 18:39:55', 1, 0, 1, NULL, '2025-02-01 20:39:55', 'aproved', 1, '8', '', '', '', '', 0, '8', '88', '', 8, 0, '2022-08-02 20:30:40', '', '', ''),
('62e81ef0e6610', 'קנייה', 8, 'דירה', 'צביה ', 'האלה', 88, '62e0438f6d8ac', '2022-08-01 18:44:00', 1, 0, 1, NULL, '2025-02-01 20:44:00', 'aproved', 1, '8', '', '', '', '', 3, '8', '88', '', 2, 2, '2022-08-02 20:30:40', '', '', ''),
('62e81f00a67b5', 'קנייה', 8, 'דירה', 'צביה ', 'האלה', 88, '62e0438f6d8ac', '2022-08-01 18:44:16', 1, 0, 0, NULL, '2025-02-01 20:44:16', 'aproved', 1, '8', '', '', '', '', 3, '8', '88', '', 2, 2, '2022-08-02 20:30:40', '', '', ''),
('62e81f07d3b39', 'קנייה', 8, 'דירה', 'צביה ', 'האלה', 88, '62e0438f6d8ac', '2022-08-01 18:44:23', 1, 0, 1, NULL, '2025-02-01 20:44:23', 'aproved', 1, '8', '', '', '', '', 3, '8', '88', '', 2, 2, '2022-08-02 20:30:40', '', '', ''),
('62e82a292cb67', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 19:31:53', 1, 0, 0, NULL, '2025-02-01 21:31:53', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e82ad3a51c4', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 19:34:43', 1, 0, 0, NULL, '2025-02-01 21:34:43', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e82ae746c73', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 19:35:03', 1, 0, 0, NULL, '2025-02-01 21:35:03', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e82afcc0b7d', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 19:35:24', 1, 0, 0, NULL, '2025-02-01 21:35:24', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e82b27ae14f', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 19:36:07', 1, 0, 0, NULL, '2025-02-01 21:36:07', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e82b64d80cb', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 19:37:08', 1, 0, 0, NULL, '2025-02-01 21:37:08', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e82d9e58320', 'קנייה', 0, 'דירה', '', '', 0, '62e0438f6d8ac', '2022-08-01 19:46:38', 1, 0, 0, NULL, '2025-02-01 21:46:38', 'aproved', 0, '', '', '', '', '', 0, '', '', '', 0, 0, '2022-08-02 20:30:40', '', '', ''),
('62e8309e4d0f2', 'קנייה', 1, 'דירה', 'קצר א-סר ', '', 1, '62e0438f6d8ac', '2022-08-01 19:59:26', 1, 0, 0, NULL, '2025-02-01 21:59:26', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e831ff47caf', 'קנייה', 1, 'דירה', 'קצר א-סר ', 'קצר א-סר', 1, '62e0438f6d8ac', '2022-08-01 20:05:19', 0, 0, 0, NULL, '2025-02-01 22:05:19', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e835b9eb54f', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 0, '62e0438f6d8ac', '2022-08-01 20:21:13', 1, 0, 0, NULL, '2025-02-01 22:21:13', 'aproved', 1, '1', '1', '1', '', '', 1, '1', '1', 'מיידי', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e8361f73e6d', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 0, '62e0438f6d8ac', '2022-08-01 20:22:55', 1, 0, 0, NULL, '2025-02-01 22:22:55', 'aproved', 1, '1', '1', '1', '', '', 1, '1', '1', 'מיידי', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e837e90f94f', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 20:30:33', 1, 0, 1, NULL, '2025-02-01 22:30:33', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83be3959d5', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 20:47:31', 0, 0, 0, NULL, '2025-02-01 22:47:31', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83c0f82a8e', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 20:48:15', 1, 0, 0, NULL, '2025-02-01 22:48:15', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83e320ed55', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 20:57:22', 0, 0, 0, NULL, '2025-02-01 22:57:22', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83e3e80d36', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 20:57:34', 0, 0, 0, NULL, '2025-02-01 22:57:34', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83e4d85e53', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 20:57:49', 0, 0, 0, NULL, '2025-02-01 22:57:49', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83ea464047', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 20:59:16', 0, 0, 0, NULL, '2025-02-01 22:59:16', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83ed769907', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 21:00:07', 0, 0, 0, NULL, '2025-02-01 23:00:07', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83ed8a9379', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 21:00:08', 0, 0, 0, NULL, '2025-02-01 23:00:08', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83ee979933', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 21:00:25', 0, 0, 0, NULL, '2025-02-01 23:00:25', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83f0827d3a', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 21:00:56', 0, 0, 0, NULL, '2025-02-01 23:00:56', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e83f19278e1', 'קנייה', 1, 'דירה', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-01 21:01:13', 0, 0, 0, NULL, '2025-02-01 23:01:13', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '2022-08-02 20:30:40', '', '', ''),
('62e95cce4de81', 'קנייה', 1, 'דירה', 'אבו עבדון (שבט) ', 'אבו עבדון (שבט)', 1, '62e0438f6d8ac', '2022-08-02 17:20:14', 1, 0, 1, NULL, '2025-02-02 19:20:14', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 2, 2, '2022-08-02 20:30:40', '', '', ''),
('62e95d3c18f47', 'קנייה', 1, 'דירה', 'סנסנה ', 'סנסנה', 7, '62e0438f6d8ac', '2022-08-02 17:22:04', 0, 0, 202, NULL, '2025-02-07 10:47:23', 'pending', 1, '1', '', '', '', '', 1, '1', '112', '', 1, 1, 'גמיש', '', '', ''),
('62e9741668320', 'השכרה', 4848, 'דירה', 'אעצם (שבט) ', 'אעצם (שבט)', 1, '62e0438f6d8ac', '2022-08-02 18:59:34', 0, 0, 0, NULL, '2025-02-02 20:59:34', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '1999-11-11', '', '', ''),
('62e9749d3a01e', 'השכרה', 4848, 'דירה', 'אעצם (שבט) ', 'אעצם (שבט)', 1, '62e0438f6d8ac', '2022-08-02 19:01:49', 0, 0, 0, NULL, '2025-02-02 21:01:49', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, 'גמיש', '', '', ''),
('62e9750369bcb', 'קנייה', 4848, 'בית פרטי', 'אעצם (שבט) ', 'אעצם (שבט)', 1, '62e0438f6d8ac', '2022-08-02 19:03:31', 0, 0, 11, NULL, '2025-02-02 21:03:31', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, 'גמיש', '', '', ''),
('62eab4f0265c8', 'קנייה', 1, 'דירה', 'סנסנה ', 'סנסנה', 1, '62e0438f6d8ac', '2022-08-03 17:48:32', 1, 0, 3, NULL, '2025-02-03 19:48:32', 'aproved', 1, '1', '', '', '', '', 1, '1', '1', '', 3243, 1, 'גמיש', 'jd', '', ''),
('62ef7d1be4219', 'קנייה', 1, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '62e0438f6d8ac', '2022-08-07 08:51:39', 1, 6, 22, NULL, '2025-02-07 10:51:39', 'aproved', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d1be4219', '', ''),
('62ef7d47e399b', 'קנייה', 1, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '62e0438f6d8ac', '2022-08-07 08:52:23', 1, 0, 2, NULL, '2025-02-07 10:52:23', 'aproved', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d47e399b', '', ''),
('62ef7d4fe5f90', 'קנייה', 1, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '62e0438f6d8ac', '2022-08-07 08:52:31', 0, 0, 4, NULL, '2025-02-11 00:48:08', 'pending', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d4fe5f90', '', ''),
('62ef7d5c4cd51', 'קנייה', 1, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '62e0438f6d8ac', '2022-08-11 17:52:44', 0, 0, 6, NULL, '2025-02-10 23:59:01', 'pending', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d5c4cd51', '', ''),
('62ef7d7d30008', 'השכרה', 1, 'בית פרטי', 'עדי ', 'בית הדסה', 1, '62e0438f6d8ac', '2022-08-07 08:53:17', 1, 0, 45, NULL, '2025-02-09 21:10:00', 'aproved', 3, '39', '', '', '', '', 9393, '929', '3', '', 1, 1, '0001-01-01', '62ef7d7d30008', '62f4e5dcb65b0', ''),
('62f16fe877201', 'קנייה', 32, 'בית פרטי', 'קצר א-סר ', 'קצר א-סר', 2, '62e0438f6d8ac', '2022-08-08 20:19:52', 0, 0, 0, NULL, '2025-02-08 22:19:52', 'pending', 2, '1', '', '', '', '', 2, '2', '2', '', 1, 1, 'מיידי', '62f16fe877201', '', ''),
('62f170398ef46', 'קנייה', 32, 'בית פרטי', 'קצר א-סר ', 'קצר א-סר', 2, '62e0438f6d8ac', '2022-08-08 20:21:13', 0, 0, 0, NULL, '2025-02-08 22:21:13', 'pending', 2, '1', '', '', '', '', 2, '2', '2', '', 1, 1, 'מיידי', '62f170398ef46', '', ''),
('62f2627b5972e', 'קנייה', 1, '', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-09 13:34:51', 0, 0, 0, NULL, '2025-02-09 15:34:51', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '', '62f2627b5972e', '', ''),
('62f26364846a4', 'קנייה', 1, '', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-09 13:38:44', 0, 0, 0, NULL, '2022-08-09 15:38:44', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '', '62f26364846a4', '', ''),
('62f263681627e', 'קנייה', 1, '', 'כמאנה ', 'כמאנה', 1, '62e0438f6d8ac', '2022-08-09 13:38:48', 0, 0, 0, NULL, '2022-08-09 15:38:48', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, '', '62f263681627e', '', ''),
('62f41963f1aeb', 'קנייה', 1, 'דירה', 'קצר א-סר ', 'קצר א-סר', 1, '62e0438f6d8ac', '2022-08-10 20:47:32', 0, 0, 0, NULL, '2115-03-10 22:47:32', 'pending', 1, '1', '', '', '', '', 1, '1', '1', '', 1, 1, 'מיידי', '62f41963f1aeb', '', '');

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
('22', '0', 'השכרה', 1, NULL, NULL, '', 'מבצע', 0, 'מבצע', 'checkBox', '0', 0),
('34453', '0', 'השכרה', 1, 21, 13, '', 'גינה', 1, 'garden', 'text', '1', 0),
('44', '0', 'קנייה', 1, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'checkBox', '0', 0),
('62bedb288d88c', '0', 'השכרה', 1, NULL, NULL, '', 'מזגן', 0, 'מזגן', 'checkBox', '1233', 0),
('62bedc11bfbd5', '0', 'קנייה', 1, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', 'master', 0),
('62beec2291fb2', '0', 'השכרה', 1, NULL, NULL, '', ',dsklkds', 0, ',dsklkds', 'text', 'master', 0),
('62beef375cd1d', '0', 'קנייה', 1, 0, 10, '', 'hdhdh', 0, 'hdhdh', 'text', 'master', 0),
('62dab4ca33dab', '0', 'השכרה', 1, NULL, NULL, '', 'renthAIM', 0, 'renthAIM', 'text', 'master', 0),
('62dab524f03aa', '0', 'השכרה', 1, NULL, NULL, '', 'rent2', 0, 'rent2', 'text', 'master', 0),
('62e81ad249162', '62e81ad2431e3', 'buy', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '1', 0),
('62e81ad2507f5', '62e81ad2431e3', 'buy', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
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
('62ef7c1bd2050', '62e95d3c18f47', 'קנייה', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62ef7c1bd5a57', '62e95d3c18f47', 'קנייה', 0, NULL, NULL, '', 'jfjkjvdl', 0, 'jfjkjvdl', 'text', 'c', 0),
('62ef7d1bf1156', '62ef7d1be4219', 'קנייה', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '', 0),
('62ef7d1bf33e0', '62ef7d1be4219', 'קנייה', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62ef7d47eea23', '62ef7d47e399b', 'קנייה', 0, NULL, NULL, '', 'hdhdh', 0, 'hdhdh', 'text', '', 0),
('62ef7d47ef69f', '62ef7d47e399b', 'קנייה', 0, NULL, NULL, '', 'air_conditioner', 0, 'air_conditioner', 'text', '1', 0),
('62efc1434c5de', '0', 'השכרה', 1, NULL, NULL, '', 'lkdfkfk ', 0, 'lkdfkfk \r\n', 'text', 'master', 0),
('62efc16fb5a54', '0', 'השכרה', 1, NULL, NULL, '', 'חיייייייי ', 0, 'חיייייייי ', 'text', 'master', 0),
('62efc18d47887', '0', 'השכרה', 1, 233, 19, '', 'חיייייייייי', 0, 'חייייייייייייי', 'text', 'master', 0),
('62efc244a0f03', '0', 'קנייה', 1, NULL, NULL, '', 'kkkfkfkdk', 0, 'kkkfkfkdk', 'text', 'master', 0),
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
('9', '0', 'השכרה', 1, NULL, NULL, ' ', 'דרוש שיפוץ', 0, 'דרוש שיפוץ', 'checkBox', '0', 0);

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
('1', '2022-08-04 23:10:33', 'Draft', '7 CSS tools you should be using', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-04 23:10:33', 1, 'designer-1.jpg', 'development', 'frontend,ui/ux,design'),
('2', '2022-08-04 23:12:56', 'Draft', 'Milan Places That Highlight The City', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-04 23:12:56', 1, 'f67396fc3cfce63a28e07ebb35d974ac.jpg', 'travel', 'vacation,holidays,sightseeing'),
('3', '2022-08-04 23:13:12', 'Draft', 'Online Shopping – An Alternative to Shopping in the Mall', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-04 23:13:12', 1, 'fQwuyKJ9qxjSbr6REcgtmW-1200-80.jpg', 'shopping', 'e-commerce store,clothing,shopping store'),
('4', '2022-08-04 23:13:22', 'Draft', 'ADVENTURE IN YOU', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-04 23:13:22', 1, 'graphic-design-trends.png', 'adventure', 'adrenaline,stay-fit,lifestyle'),
('5', '2022-08-05 00:24:17', 'Draft', '7 CSS tools you should be using', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-05 00:24:17', 1, 'designer-1.jpg', 'development', '[\"frontend\", \"ui/ux\", \"design\"]'),
('6', '2022-08-05 00:24:26', 'Draft', '7 CSS tools you should be using', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-05 00:24:26', 1, 'designer-1.jpg', 'development', '[\"frontend\", \"ui/ux\", \"design\"]'),
('7', '2022-08-05 00:24:36', 'Draft', '7 CSS tools you should be using', '2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-08-05 00:24:36', 1, 'designer-1.jpg', 'development', '[\"frontend\", \"ui/ux\", \"design\"]');

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
('62e043c212529', '62e0438f6d8ac', '2', '2022-07-26 22:42:58'),
('62e04ef45e8c5', '62e0438f6d8ac', '62c5ee073f23b', '2022-07-26 23:30:44'),
('62e3c53457c7c', '62e0438f6d8ac', '55', '2022-07-29 14:32:04'),
('62e6fb910b529', '62e0438f6d8ac', '62c5ee073f23b', '2022-08-01 01:00:49'),
('62e6fb92d5d64', '62e0438f6d8ac', '62c7199486eaf', '2022-08-01 01:00:50'),
('62e6fba690c3b', '62e0438f6d8ac', '55', '2022-08-01 01:01:10'),
('62e7c923824b2', '62e0438f6d8ac', '2', '2022-08-01 15:37:55'),
('62e7cac808d19', '62e0438f6d8ac', '2', '2022-08-01 15:44:56'),
('62e7cac953c06', '62e0438f6d8ac', '12', '2022-08-01 15:44:57'),
('62e7cacdc7ac0', '62e0438f6d8ac', '55', '2022-08-01 15:45:01'),
('62e7cc9f78a24', '62e0438f6d8ac', '2', '2022-08-01 15:52:47'),
('62e7d05b03651', '62e0438f6d8ac', '12', '2022-08-01 16:08:43'),
('62e7d17f74d76', '62e0438f6d8ac', '552', '2022-08-01 16:13:35'),
('62e7d180bb8ff', '62e0438f6d8ac', '62c5ee073f23b', '2022-08-01 16:13:36'),
('62e7d29facb8c', '62e0438f6d8ac', '62c745970dcb0', '2022-08-01 16:18:23'),
('62e7d2a17ec04', '62e0438f6d8ac', '62c8136760120', '2022-08-01 16:18:25'),
('62e831741aac2', '62e0438f6d8ac', '62e81f00a67b5', '2022-08-01 23:03:00'),
('62e95e0533738', '62e0438f6d8ac', '62e95d3c18f47', '2022-08-02 20:25:25'),
('62e98772a6a65', '62e0438f6d8ac', '12', '2022-08-02 23:22:10'),
('62ec22d8c400a', '62e0438f6d8ac', '303902', '2022-08-04 22:49:44'),
('62ec22d9f0467', '62e0438f6d8ac', '303902', '2022-08-04 22:49:45'),
('62f16e34d73e5', '62e0438f6d8ac', '62ef7d7d30008', '2022-08-08 23:12:36'),
('62f4a83960cc5', '62e0438f6d8ac', '62ef7d47e399b', '2022-08-11 09:56:57');

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

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`msgid`, `adId`, `sender`, `receiver`, `message`, `files`, `dateMsg`, `seen`, `received`, `delete_sender`, `delete_receiver`, `newUpdate`) VALUES
('629633e27295f', '', '62c7ee0d56804', '62e0438f6d8ac', 'jjjjjjf', '', '2022-05-31 17:27:30', 1, 0, 0, 0, 1),
('629633e48fa0f', '', '1', 'null', 'fjdj', '', '2022-05-31 17:27:32', 0, 0, 0, 0, 0),
('62977dd9decdc', '', '62c7ee0d56804', '62e0438f6d8ac', 'kdfjdkdkj', '', '2022-06-01 16:55:21', 1, 1, 0, 0, 0),
('62978bad3ac7b', '', '62e0438f6d8ac', '62c7ee0d56804', 'asdasd', '', '2022-06-01 17:54:21', 1, 0, 0, 0, 1),
('62978bae27afc', '', '1', '1', 'asdasd', '', '2022-06-01 17:54:22', 1, 0, 0, 0, 1),
('62978baf837c2', '', '1', '1', 'asdas', '', '2022-06-01 17:54:23', 1, 0, 0, 0, 1),
('62978bb9d4734', '', '1', '1', '123', '', '2022-06-01 17:54:33', 1, 0, 0, 0, 1),
('62978bd26801b', '', '1', 'tal', '2123123', '', '2022-06-01 17:54:58', 0, 0, 0, 0, 0),
('62978bf6c61e6', '', '1', 'haim', 'HAIM', '', '2022-06-01 17:55:34', 0, 0, 0, 0, 0),
('629793558486e', '', '1', 'haim', 'vbcvb', '', '2022-06-01 18:27:01', 0, 0, 0, 0, 0),
('629929ac6e231', '', '1', 'haim', 'kdk', '', '2022-06-02 23:20:44', 0, 0, 0, 0, 0),
('629929b11ccd4', '', '1', '1', 'kdkd', '', '2022-06-02 23:20:49', 1, 0, 0, 0, 1),
('62a9e92221b7d', '', '1', '1', 'kjcdsxljf', '', '2022-06-15 17:13:54', 1, 0, 0, 0, 1),
('62e6a02e83d9c', '', '62e0438f6d8ac', '62c7ee0d56804', ',vd,v,dv,vdg,', '', '2022-07-31 18:30:54', 0, 0, 0, 0, 0),
('62f508e659ca1', '', '62e0438f6d8ac', '62e0438f6d8ac', 'lcflf', '', '2022-08-11 16:49:26', 1, 0, 0, 0, 1),
('62f508f5f2293', '', '62e0438f6d8ac', '62e0438f6d8ac', 'fl', '', '2022-08-11 16:49:41', 1, 0, 0, 0, 1),
('62f5093571e22', '', '62e0438f6d8ac', '62e0438f6d8ac', 'fd', '', '2022-08-11 16:50:45', 1, 0, 0, 0, 1);

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
('1', 0, 1, 'tiny package', 'worst pack', '2022-05-22 17:39:42', 0, '2022-05-22 17:39:42'),
('2', 23, 0, 'mid pack', 's2nd peck', '2022-05-22 17:40:25', 230, '2022-08-06 21:25:55'),
('23', 2, 0, 'ckskc', 'ckk', '2022-05-22 17:41:39', 3, '0000-00-00 00:00:00'),
('3', 0.5, 1, '33', '3dwd', '2022-05-22 17:40:47', 332, '2022-08-07 10:36:23'),
('628a91127da05', 1, 1, '23', '13', '2022-05-22 22:37:54', 13, '2022-05-22 22:37:54'),
('628a913467f66', 929292, 1, '1', 'dswdsmm', '2022-05-22 22:38:28', 212, '2022-05-22 22:38:28'),
('628a99d860576', 1, 1, 'DCDC', 'EE', '2022-05-22 23:15:20', 2332, '2022-05-22 23:15:20'),
('62a0c081cfcbb', 1, 1, '', '', '2022-06-08 18:30:09', 0, '2022-06-08 18:30:09'),
('62a0c5cf49966', 0.2, 1, 'iiddi', 'dkj', '2022-06-08 18:52:47', 929292, '2022-06-08 18:52:47'),
('62a0c67806d1a', 1, 1, '3993', '299', '2022-06-08 18:55:36', 9392, '2022-06-08 18:55:36'),
('62a0c9ef58c9b', 0.3, 1, '83', 'jf', '2022-06-08 19:10:23', 830, '2022-06-08 19:10:23'),
('62a0c9f834dbf', 0.2, 1, 'a', 'djkqkj', '2022-06-08 19:10:32', 338, '2022-06-08 19:10:32'),
('62a0cf0214bf0', 0, 0, 'jlfjkgwkjrgwjk', '', '2022-06-08 19:32:02', 0, '2022-06-08 19:32:02'),
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
('62ef79e43aac5', 3993, 1, 'kkkxkxkxkxk', 'sxmcx,c', '2022-08-07 11:37:56', 200202, '2022-08-07 11:37:56');

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
('62f435a861c10', '62ef7d4fe5f90', 2, '3d57bc01434268d3FinelProject-ERD.drawio (9).png', '2022-08-11 00:48:08', 'FinelProject-ERD.drawio (9).png');

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
('62a2f50495c70', '23', '62e0438f6d8ac', '2022-06-10 10:38:44', 2),
('62a4eeed5022f', '1', '62bcc7b1b59ef', '2022-06-11 22:37:17', 12);

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
('2', 'ad', 'אחר', '2022-07-26 00:14:10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` varchar(255) NOT NULL,
  `adsGift` int(11) NOT NULL DEFAULT 0,
  `expireDateAds` int(11) NOT NULL DEFAULT 30
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `adsGift`, `expireDateAds`) VALUES
('1', 21474, 1111);

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
  `msgType` text NOT NULL DEFAULT 'massage'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_messages`
--

INSERT INTO `system_messages` (`msgId`, `userId`, `message_content`, `create_time`, `seen`, `msgType`) VALUES
('62f29d48971d6', '62e0438f6d8ac', '62eac000a0b2e 303902', '2022-08-09 20:45:44', 1, 'report');

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
  `rule` varchar(255) NOT NULL,
  `refreshToken` varchar(450) NOT NULL,
  `remaining_ads` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uuid`, `first_name`, `last_name`, `phone`, `mail`, `create_time`, `password`, `last_seen`, `prompt`, `rule`, `refreshToken`, `remaining_ads`, `active`) VALUES
('2', 'lidor', 'ben shimol', '0542155045', 'AAA@a.com', '2022-04-06 17:52:19', '123', '0000-00-00 00:00:00', '', '5150', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTg3NzMyOTYsImp0aSI6IlkvRU5ELzVYVUhMMlZKVTc2NzFSRmc9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY1ODc3MzI5NiwiZXhwIjoxNjU4ODU5Njk2LCJkYXRhIjp7InVzZXIiOiJBQUFAYS5jb20ifX0.Wv5Z8XZD3GWdJuL5eMYYGUzJU8tDcHJi1uuwqgTJ2Hs', 55, 1),
('62bcc7b1b59ef', 'ck', 'kdk', 'kdk', 'haim1@g.com', '2022-06-30 00:44:17', '$2y$10$.h9krhZmmhHVGiUiGIvmjueOhG4Dj01/W4RGzRIPqZ8pn3BsHkHBK', '2022-06-30 00:44:17', 'ckk', '5150', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTg4NjQyMjYsImp0aSI6ImhtSzFSNG03QUJDZEVTSUkxVDB4Q1E9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY1ODg2NDIyNiwiZXhwIjoxNjU4OTUwNjI2LCJkYXRhIjp7InVzZXIiOiJoYWltMUBnLmNvbSJ9fQ.zjI_gUrJgCelkWP_68tTEy8K9x_Npl55KRzUP6ixi1I', 1000, 1),
('62c5f48d0980d', 'xkkx', 'ckskc', '4499439', 'haimm@g.com', '2022-07-06 23:46:05', '$2y$10$qqkNJ8pxpwK1YfebDHJagOEU5mx0QLFAJOI79hI7tJDNw5YL5GfVi', '2022-07-06 23:46:05', 'cck', '5150', 'ds', 500, 127),
('62c73563df771', 'kcck', 'ckmk', '', 'dkjdkjs@dk.com', '2022-07-07 22:34:59', '$2y$10$hkQbtWPYiuU0u9sqBn6Qp.a8hk9zDNamH7OOMNl02wCekqy1WjllG', '2022-07-07 22:34:59', '', '2001', 'ds', 5, 1),
('62c735c0ae12d', 'kdk', 'ckk', '1', 'jfkjfkj@kd.com', '2022-07-07 22:36:32', '$2y$10$Kt8m0so9HYc3UD1RlkRcFeZSx0cTWF7ZjshtsbgVcTC4t5Gh1GeZq', '2022-07-07 22:36:32', 'xk', '2001', 'ds', 5, 1),
('62c73834b2320', 'ckc', 'kck', '', 'klvkldf@fkdf.com', '2022-07-07 22:47:00', '$2y$10$BBSSTosdisz2ZV27NNn.x.HaxIGSVLH77XJjHYV8.1ausaK3HwT9i', '2022-07-07 22:47:00', '', '2001', 'ds', 5, 1),
('62c7eb0759d47', '2', 'skcx', '1', 'dsfk@jd.com', '2022-07-08 11:29:59', '$2y$10$d67mECSqvzIXEJUnAiYH7.rhEoNH7JwMi0EEjezXPbY0x9c.pHCTG', '2022-07-08 11:29:59', 'xk', '2001', 'ds', 5, 1),
('62c7eb20d6dbf', 'ck', 'cks', '3323432432', 'kdfkl@kf.com', '2022-07-08 11:30:24', '$2y$10$N46g16Wdy0McyZ3RqH54VO4lWe4QRUNj/W9gZdlZ2z50MqLhWzyj.', '2022-07-08 11:30:24', 'c', '2001', 'ds', 5, 1),
('62c7eb4d0aa06', 'k', '', '', 'ksl@kfk.com', '2022-07-08 11:31:09', '$2y$10$qcmJmG/bEqr3lDhkitxvR..4qnD0742hQ.kz8zKQr9PTgL0vrR0PO', '2022-07-08 11:31:09', '', '2001', 'ds', 5, 1),
('62c7ebda1e8f3', 'kd', 'kxk', '', 'jdsj@cjkc.com', '2022-07-08 11:33:30', '$2y$10$L4qThBb9HH9Ba9JgSepoVu9ng99R8flUK7XATmPtKzWrW7M/cXbl6', '2022-07-08 11:33:30', 'k', '2001', 'ds', 5, 1),
('62c7ed85ef2d8', 'c', 'c', '', 'kkxg@mail.com', '2022-07-08 11:40:38', '$2y$10$.99o3J3ym1sBoljHRUC.Q.DOxq5TFIRshVF/m6QiGiKWXGdyfavCG', '2022-07-08 11:40:38', '', '2001', 'ds', 5, 1),
('62c7edcc54605', 'kckck', 'kdk', '', 'kk@fkfk.com', '2022-07-08 11:41:48', '$2y$10$Uy4vRLlJBoCJV0hVDlJ/teYl3lODIpjo83R1ok/Wz2OlAWBhHPpZ6', '2022-07-08 11:41:48', '', '2001', 'ds', 5, 1),
('62c7ee0d56804', 'חיים', 'kck', '', 'kfdkdk@kdkdk.com', '2022-07-08 11:42:53', '$2y$10$bBICNbyK8Q0ebsyEowcjVOhUC6h30egqu2DMzGgaPK4FyzYRpg7Sa', '2022-07-08 11:42:53', '', '2001', 'ds', 5, 1),
('62c7ee48b2d9a', '', '', '', 'jc!vc2@kck.com', '2022-07-08 11:43:52', '$2y$10$23UiSvTPzpSjhDIFFNSNg.9883Kq/kaMAorHsKoUx14wNQra3EZzG', '2022-07-08 11:43:52', '', '2001', 'ds', 5, 1),
('62e0438f6d8ac', 'חיים1', 'xkkxk', '3434433332', 'ha@g.com', '2022-07-26 22:42:07', '$2y$10$17YcVOPSBivOFuryRA9niuNxiNo8JMLh8QS/L6hqaAVn4VhtCXb1q', '2022-07-26 22:42:07', 'dkdkkdk', '5150', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTk3MDIwMDgsImp0aSI6IitmMFFSOXQ3eEpuTFQ3YTJlWW10OXc9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY1OTcwMjAwOCwiZXhwIjoxNjU5Nzg4NDA4LCJkYXRhIjp7InVzZXIiOiJoYUBnLmNvbSJ9fQ.gJDX7d4KzRo5uCmQ5rcr9CtCKk08R2r9zuQ2FdUjxK8', -4, 1),
('haimke', 'll', 'll', 'll', 'll', '2022-05-08 23:14:16', '627824989503e', '2022-05-08 23:14:16', 'k', '5150', '', 0, 1);

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
  `element_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_reports`
--

INSERT INTO `user_reports` (`id`, `element_id`, `userId`, `create_time`, `active`, `content`, `title`, `manage_feedback`, `report_reason`, `element_type`) VALUES
('62eac000a0b2e', '303902', '62e0438f6d8ac', '2022-08-03 21:35:44', 0, 'haim', 'jhhi', ',kckdk', 'שפה לא נאותה', 'ad'),
('62ec109f293fa', '62e95d3c18f47', '62e0438f6d8ac', '2022-08-04 21:31:59', 1, 'kdkdkdk', 'fkkf', 'kdkdkkddkkdkd', 'שפה לא נאותה', 'ad'),
('62f29d1ec470f', '62ef7d7d30008', '62e0438f6d8ac', '2022-08-09 20:45:02', 1, 'kek', 'rekkd', '', 'שפה לא נאותה', 'ad');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
