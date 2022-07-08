-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2022 at 04:53 PM
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
  `adType` text NOT NULL,
  `floor` text NOT NULL,
  `maxFloor` text NOT NULL,
  `enteringDate` varchar(255) NOT NULL,
  `propertyTaxes` double NOT NULL,
  `houseCommittee` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`adID`, `create_time`, `user_id`, `active`, `contact_counter`, `watch`, `close_reason`, `expire_date`, `approval_status`, `ad_link`, `city`, `street`, `building_number`, `entry`, `apartment`, `zip_code`, `map_X`, `map_Y`, `price`, `rooms`, `adType`, `floor`, `maxFloor`, `enteringDate`, `propertyTaxes`, `houseCommittee`) VALUES
('12', '2022-05-21 18:53:41', 'tal', 1, 1, 139, 'W', '2022-05-25 21:52:10', 'aproved', 'ws', 'עפולה', 'street', 1, '1', '1', '1', '1', '1', 1, 1, 'קנייה', '', '', '', 0, 0),
('2', '2022-05-21 18:53:41', 'haim', 1, 1, 159, NULL, '2022-05-31 21:52:10', 'aproved', 'linkhai', 'חיפה', 'הגליל', 1, '12', '1', '', '', '', 0, 0, 'השכרה', '', '', '', 0, 0),
('303902', '2022-06-29 19:55:20', '2', 1, 12, 59, NULL, '0000-00-00 00:00:00', 'aproved', 'mk', 'חיפה', 'התיכון', 12, '1', '1', '1', '', '', 149039, 1, 'השכרה', '1', '3', 'עכשיו', 12, 11),
('55', '2022-05-05 13:19:11', '2', 1, 0, 286, NULL, '0000-00-00 00:00:00', 'aproved', 'ad dfflink 3', 'חיפה', 'hagalil', 1, '1', '1', '3', '', '', 2002, 5, 'השכרה', '', '', '', 0, 0),
('552', '2022-05-05 13:19:11', '2', 1, 0, 286, NULL, '0000-00-00 00:00:00', 'aproved', 'ad dfflink 3', 'חיפה', 'hagalil', 1, '1', '1', '3', '', '', 2002, 5, 'השכרה', '', '', '', 0, 0),
('62c5ee073f23b', '2022-07-06 20:18:15', '62bcc7b1b59ef', 1, 0, 2, NULL, '2025-01-06 22:18:15', 'aproved', '', 'חברון ', 'בית הדסה', 11, '1', '12', '12', '', '', 100, 12, 'קנייה', '1', '2', 'מיידי', 11, 12001),
('62c7199486eaf', '2022-07-07 17:36:20', '62bcc7b1b59ef', 1, 0, 3, NULL, '2025-01-07 19:36:20', 'aproved', '', 'קצר א-סר ', 'קצר א-סר', 1, '1', '1', '1', '', '', 1, 1, 'קנייה', '1', '1', 'גמיש', 1, 1),
('62c7444adcdf6', '2022-07-07 20:38:34', '62bcc7b1b59ef', 1, 0, 0, NULL, '2025-01-07 22:38:34', 'aproved', '', 'קצר א-סר ', 'קצר א-סר', 11, '1', '1', '1', '', '', 1, 1, 'קנייה', '1', '1', 'מיידי', 1, 1),
('62c744cecc951', '2022-07-07 20:40:46', '62bcc7b1b59ef', 1, 0, 0, NULL, '2025-01-07 22:40:46', 'aproved', '', 'חברון ', 'בית חסון', 1, '1', '1', '1', '', '', 1, 1, 'קנייה', '1', '1', 'מיידי', 1, 1),
('62c74518d217e', '2022-07-07 20:42:00', '62bcc7b1b59ef', 1, 0, 0, NULL, '2025-01-07 22:42:00', 'aproved', '', 'כמאנה ', 'כמאנה', 1, '1', '1', '1', '', '', 1, 1, 'קנייה', '1', '1', 'מיידי', 1, 1),
('62c745970dcb0', '2022-07-07 20:44:07', '62bcc7b1b59ef', 1, 0, 0, NULL, '2025-01-07 22:44:07', 'aproved', '', 'כמאנה ', 'כמאנה', 1, '1', '1', '1', '', '', 1, 1, 'קנייה', '1', '1', 'מיידי', 1, 1),
('62c81335b3f17', '2022-07-08 11:21:25', '62bcc7b1b59ef', 1, 0, 0, NULL, '2025-01-08 13:21:25', 'aproved', '', 'כמאנה ', 'כמאנה', 1, '1', '1', '1', '', '', 11, 1, 'קנייה', '1', '1', 'מיידי', 1, 1),
('62c8136760120', '2022-07-08 11:22:15', '62bcc7b1b59ef', 1, 0, 0, NULL, '2025-01-08 13:22:15', 'aproved', '', 'קצר א-סר ', 'קצר א-סר', 1, '1', '1', '1', '', '', 1, 1, 'קנייה', '1', '1', 'מיידי', 1, 1),
('62c81391edef4', '2022-07-08 11:22:57', '62bcc7b1b59ef', 0, 0, 0, NULL, '2025-01-08 13:22:57', 'pending', '', 'חברון ', 'אדמות ישי', 1, '1', '1', '1', '', '', 1, 1, 'קנייה', '1', '1', 'מיידי', 1, 1);

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
('1', '0', 'קנייה', 1, NULL, NULL, '', 'מזגן', 0, 'air_conditioner', 'checkBox', '1', 1),
('2', '2', 'קנייה', 1, 1, 100, 'kfkf', 'סתם', 0, 'asd', 'text', '1', 1),
('22', '0', 'השכרה', 1, NULL, NULL, '', '', 0, 'מבצע', 'checkBox', '0', 0),
('3', '1', 'קנייה', 0, NULL, NULL, 'jdj', 'גינה', 0, 'garden', '', '4', 0),
('324', '2', 'קנייה', 0, NULL, NULL, '', '', 0, 'garden', 'text', 'yes', 0),
('33', '0', 'השכרה', 1, 31, NULL, '31', 'חיים', 0, 'haim', 'kke', 'mm', 0),
('34453', '0', 'השכרה', 1, 21, 13, '21', 'גינה', 1, 'garden', '0', '1', 0),
('4325s2', '4325', 'קנייה', 0, NULL, NULL, '', '', 0, 'garden', 'texttext', '1', 0),
('62bedb288d88c', '0', 'השכרה', 1, 0, 0, '', '', 0, 'חגחךגד', 'text', '1233', 0),
('62bedc11bfbd5', '0', 'קנייה', 1, 1111, 0, '', '', 0, 'jfjkjvdl', 'text', 'master', 0),
('62beec2291fb2', '0', 'השכרה', 1, NULL, NULL, '', '', 0, ',dsklkds', 'text', 'master', 0),
('62beef375cd1d', '0', 'קנייה', 1, 0, 0, '', '', 0, 'hdhdh', 'text', 'master', 0),
('62c5ee0746ca8', '62c5ee073f23b', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'air_conditioner', 'checkBox', '1', 1),
('62c719948c586', '62c7199486eaf', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'air_conditioner', 'checkBox', '1', 1),
('62c71994967d6', '62c7199486eaf', 'קנייה', 0, 1, 1, 'kfkf', 'סתם', 0, 'asd', 'text', 'xxsx', 1),
('62c719949d39d', '62c7199486eaf', 'קנייה', 0, 0, 0, '', '', 0, 'hdhdh', 'text', 'xs', 0),
('62c7444ae80b3', '62c7444adcdf6', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'air_conditioner', 'checkBox', '1', 1),
('62c7444aed7fe', '62c7444adcdf6', 'קנייה', 0, 1, 1, 'kfkf', 'סתם', 0, 'asd', 'text', 'לכל', 1),
('62c7444af22eb', '62c7444adcdf6', 'קנייה', 0, 1111, 1111, '', '', 0, 'jfjkjvdl', 'text', 'לבל', 0),
('62c7444b0670c', '62c7444adcdf6', 'קנייה', 0, 0, 0, '', '', 0, 'hdhdh', 'text', 'בל', 0),
('62c744cecf0a6', '62c744cecc951', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'air_conditioner', 'checkBox', '1', 1),
('62c744ced589d', '62c744cecc951', 'קנייה', 0, 1, 1, 'kfkf', 'סתם', 0, 'asd', 'text', '1', 1),
('62c744cedb3a9', '62c744cecc951', 'קנייה', 0, 1111, 1111, '', '', 0, 'jfjkjvdl', 'text', '1', 0),
('62c744cee0573', '62c744cecc951', 'קנייה', 0, 0, 0, '', '', 0, 'hdhdh', 'text', '1', 0),
('62c74518dc2d2', '62c74518d217e', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'air_conditioner', 'checkBox', '1', 1),
('62c74518e2cfe', '62c74518d217e', 'קנייה', 0, 1, 1, 'kfkf', 'סתם', 0, 'asd', 'text', '1', 1),
('62c74518e410a', '62c74518d217e', 'קנייה', 0, 1111, 1111, '', '', 0, 'jfjkjvdl', 'text', '1', 0),
('62c74518e8e58', '62c74518d217e', 'קנייה', 0, 0, 0, '', '', 0, 'hdhdh', 'text', '1', 0),
('62c8136762cf8', '62c8136760120', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'air_conditioner', 'checkBox', '1', 1),
('62c81391f3cf6', '62c81391edef4', 'קנייה', 0, NULL, NULL, '', 'מזגן', 0, 'air_conditioner', 'checkBox', '1', 1),
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

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`favorite_id`, `userId`, `AdId`, `create_time`) VALUES
('62ac566d86f80', '1', '2', '2022-06-17 13:24:45');

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
('629633e27295f', '', '1', 'null', 'jjjjjjf', '', '2022-05-31 17:27:30', 0, 0, 0, 0, 0),
('629633e48fa0f', '', '1', 'null', 'fjdj', '', '2022-05-31 17:27:32', 0, 0, 0, 0, 0),
('62977dd9decdc', '', '1', 'null', 'kdfjdkdkj', '', '2022-06-01 16:55:21', 0, 0, 0, 0, 0),
('62978bad3ac7b', '', '1', '1', 'asdasd', '', '2022-06-01 17:54:21', 1, 0, 0, 0, 1),
('62978bae27afc', '', '1', '1', 'asdasd', '', '2022-06-01 17:54:22', 1, 0, 0, 0, 1),
('62978baf837c2', '', '1', '1', 'asdas', '', '2022-06-01 17:54:23', 1, 0, 0, 0, 1),
('62978bb9d4734', '', '1', '1', '123', '', '2022-06-01 17:54:33', 1, 0, 0, 0, 1),
('62978bd26801b', '', '1', 'tal', '2123123', '', '2022-06-01 17:54:58', 0, 0, 0, 0, 0),
('62978bf6c61e6', '', '1', 'haim', 'HAIM', '', '2022-06-01 17:55:34', 0, 0, 0, 0, 0),
('629793558486e', '', '1', 'haim', 'vbcvb', '', '2022-06-01 18:27:01', 0, 0, 0, 0, 0),
('629929ac6e231', '', '1', 'haim', 'kdk', '', '2022-06-02 23:20:44', 0, 0, 0, 0, 0),
('629929b11ccd4', '', '1', '1', 'kdkd', '', '2022-06-02 23:20:49', 1, 0, 0, 0, 1),
('62a9e92221b7d', '', '1', '1', 'kjcdsxljf', '', '2022-06-15 17:13:54', 1, 0, 0, 0, 1);

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
('2', 0, 1, 'mid pack', 's2nd peck', '2022-05-22 17:40:25', 230, '2022-05-22 17:40:25'),
('23', 2, 1, 'ckskc', 'ckk', '2022-05-22 17:41:39', 3, '2022-05-22 17:41:39'),
('3', 0.5, 1, '33', '3dwd', '2022-05-22 17:40:47', 332, '2022-05-22 17:40:47'),
('628a91127da05', 1, 1, '23', '13', '2022-05-22 22:37:54', 13, '2022-05-22 22:37:54'),
('628a913467f66', 929292, 1, '1', 'dswdsmm', '2022-05-22 22:38:28', 212, '2022-05-22 22:38:28'),
('628a99d860576', 1, 1, 'DCDC', 'EE', '2022-05-22 23:15:20', 2332, '2022-05-22 23:15:20'),
('62a0c081cfcbb', 1, 1, '', '', '2022-06-08 18:30:09', 0, '2022-06-08 18:30:09'),
('62a0c5cf49966', 0.2, 1, 'iiddi', 'dkj', '2022-06-08 18:52:47', 929292, '2022-06-08 18:52:47'),
('62a0c67806d1a', 1, 1, '3993', '299', '2022-06-08 18:55:36', 9392, '2022-06-08 18:55:36'),
('62a0c9ef58c9b', 0.3, 1, '83', 'jf', '2022-06-08 19:10:23', 830, '2022-06-08 19:10:23'),
('62a0c9f834dbf', 0.2, 1, 'a', 'djkqkj', '2022-06-08 19:10:32', 338, '2022-06-08 19:10:32'),
('62a0cf0214bf0', 0, 1, 'jlfjkgwkjrgwjk', '', '2022-06-08 19:32:02', 0, '2022-06-08 19:32:02'),
('62c742d95153b', 12, 1, 'kck', '2', '2022-07-07 23:32:25', 22, '2022-07-07 23:32:25');

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
('62a3009f2516f', '2', 2, 'fc51156c2ec0be26FinelProject-ERD.drawio (8).png', '2022-06-10 10:28:15', 'FinelProject-ERD.drawio (8).png'),
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
('62c813ad155c9', '62c813ad14e50', 1, 'f2aa0a37804165d8FinelProject-Use case Diagram.drawio.png', '2022-07-08 13:23:25', 'FinelProject-Use case Diagram.drawio.png');

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
('62a2f29fb45eb', '23', '1', '2022-06-10 10:28:31', 2),
('62a2f50495c70', '23', '2', '2022-06-10 10:38:44', 2),
('62a4eeed5022f', '1', '1', '2022-06-11 22:37:17', 12);

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
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `adsGift` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`adsGift`) VALUES
(5),
(5),
(134),
(1234),
(0);

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
  `rule` varchar(255) NOT NULL,
  `refreshToken` varchar(450) NOT NULL,
  `remaining_ads` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uuid`, `first_name`, `last_name`, `phone`, `mail`, `create_time`, `password`, `last_seen`, `prompt`, `rule`, `refreshToken`, `remaining_ads`, `active`) VALUES
('2', 'lidor', 'ben shimol', '0542155045', 'AAA', '2022-04-06 17:52:19', '123', '0000-00-00 00:00:00', '', '5150', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTQ4NDY2OTMsImp0aSI6IkttMmpHYnBVYlV4YWtmc2xjcko3Q1E9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY1NDg0NjY5MywiZXhwIjoxNjU0OTMzMDkzLCJkYXRhIjp7InVzZXIiOiJBQUEifX0.9yr0fCFFr3v1rNYnh_VCuYmtjLPTuaD9tDyRe41x3hs', 55, 1),
('62bcc7b1b59ef', 'ck', 'kdk', 'kdk', 'haim1', '2022-06-30 00:44:17', '$2y$10$.h9krhZmmhHVGiUiGIvmjueOhG4Dj01/W4RGzRIPqZ8pn3BsHkHBK', '2022-06-30 00:44:17', 'ckk', '5150', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTcyNzkyNDIsImp0aSI6Im1OcUdBSXFCdFFDeStIVW9lRUd5dVE9PSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTY1NzI3OTI0MiwiZXhwIjoxNjU3MzY1NjQyLCJkYXRhIjp7InVzZXIiOiJoYWltMSJ9fQ.W6YI0gLmEiM9s6DNYsLZp1FRnFV3xdLDTeje0ccEa7w', 5, 1),
('62c5f48d0980d', 'xkkx', 'ckskc', '4499439', 'haimm@g.com', '2022-07-06 23:46:05', '$2y$10$qqkNJ8pxpwK1YfebDHJagOEU5mx0QLFAJOI79hI7tJDNw5YL5GfVi', '2022-07-06 23:46:05', 'cck', '5150', 'ds', 5, 127),
('62c73563df771', 'kcck', 'ckmk', '', 'dkjdkjs@dk.com', '2022-07-07 22:34:59', '$2y$10$hkQbtWPYiuU0u9sqBn6Qp.a8hk9zDNamH7OOMNl02wCekqy1WjllG', '2022-07-07 22:34:59', '', '2001', 'ds', 5, 1),
('62c735c0ae12d', 'kdk', 'ckk', '1', 'jfkjfkj@kd.com', '2022-07-07 22:36:32', '$2y$10$Kt8m0so9HYc3UD1RlkRcFeZSx0cTWF7ZjshtsbgVcTC4t5Gh1GeZq', '2022-07-07 22:36:32', 'xk', '2001', 'ds', 5, 1),
('62c73834b2320', 'ckc', 'kck', '', 'klvkldf@fkdf.com', '2022-07-07 22:47:00', '$2y$10$BBSSTosdisz2ZV27NNn.x.HaxIGSVLH77XJjHYV8.1ausaK3HwT9i', '2022-07-07 22:47:00', '', '2001', 'ds', 5, 1),
('62c7eb0759d47', '2', 'skcx', '1', 'dsfk@jd.com', '2022-07-08 11:29:59', '$2y$10$d67mECSqvzIXEJUnAiYH7.rhEoNH7JwMi0EEjezXPbY0x9c.pHCTG', '2022-07-08 11:29:59', 'xk', '2001', 'ds', 5, 1),
('62c7eb20d6dbf', 'ck', 'cks', '3323432432', 'kdfkl@kf.com', '2022-07-08 11:30:24', '$2y$10$N46g16Wdy0McyZ3RqH54VO4lWe4QRUNj/W9gZdlZ2z50MqLhWzyj.', '2022-07-08 11:30:24', 'c', '2001', 'ds', 5, 1),
('62c7eb4d0aa06', 'k', '', '', 'ksl@kfk.com', '2022-07-08 11:31:09', '$2y$10$qcmJmG/bEqr3lDhkitxvR..4qnD0742hQ.kz8zKQr9PTgL0vrR0PO', '2022-07-08 11:31:09', '', '2001', 'ds', 5, 1),
('62c7ebda1e8f3', 'kd', 'kxk', '', 'jdsj@cjkc.com', '2022-07-08 11:33:30', '$2y$10$L4qThBb9HH9Ba9JgSepoVu9ng99R8flUK7XATmPtKzWrW7M/cXbl6', '2022-07-08 11:33:30', 'k', '2001', 'ds', 5, 1),
('62c7ed85ef2d8', 'c', 'c', '', 'kkxg@mail.com', '2022-07-08 11:40:38', '$2y$10$.99o3J3ym1sBoljHRUC.Q.DOxq5TFIRshVF/m6QiGiKWXGdyfavCG', '2022-07-08 11:40:38', '', '2001', 'ds', 5, 1),
('62c7edcc54605', 'kckck', 'kdk', '', 'kk@fkfk.com', '2022-07-08 11:41:48', '$2y$10$Uy4vRLlJBoCJV0hVDlJ/teYl3lODIpjo83R1ok/Wz2OlAWBhHPpZ6', '2022-07-08 11:41:48', '', '2001', 'ds', 5, 1),
('62c7ee0d56804', 'kckc', 'kck', '', 'kfdkdk@kdkdk.com', '2022-07-08 11:42:53', '$2y$10$bBICNbyK8Q0ebsyEowcjVOhUC6h30egqu2DMzGgaPK4FyzYRpg7Sa', '2022-07-08 11:42:53', '', '2001', 'ds', 5, 1),
('62c7ee48b2d9a', '', '', '', 'jc!vc2@kck.com', '2022-07-08 11:43:52', '$2y$10$23UiSvTPzpSjhDIFFNSNg.9883Kq/kaMAorHsKoUx14wNQra3EZzG', '2022-07-08 11:43:52', '', '2001', 'ds', 5, 1),
('haimke', 'll', 'll', 'll', 'll', '2022-05-08 23:14:16', '627824989503e', '2022-05-08 23:14:16', 'k', '2001', '', 0, 1);

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
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `mail` (`mail`);

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
