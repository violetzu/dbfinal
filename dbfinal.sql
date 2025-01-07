-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1:3306
-- 產生時間： 2025-01-06 18:27:58
-- 伺服器版本： 8.3.0
-- PHP 版本： 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `dbfinal`
--

-- --------------------------------------------------------

--
-- 資料表結構 `country`
--

DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `country_code` varchar(6) NOT NULL,
  `country_name` varchar(14) NOT NULL,
  `continent_name` varchar(6) NOT NULL,
  `head_of_state` varchar(14) NOT NULL,
  `foreign_minister` varchar(14) NOT NULL,
  `contact_person` varchar(14) NOT NULL,
  `population` bigint NOT NULL,
  `area` bigint NOT NULL,
  `contact_phone` varchar(14) NOT NULL,
  `is_ally` tinyint(1) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`country_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `country`
--

INSERT INTO `country` (`country_code`, `country_name`, `continent_name`, `head_of_state`, `foreign_minister`, `contact_person`, `population`, `area`, `contact_phone`, `is_ally`, `is_delete`) VALUES
('AA4321', 'Taiwan', 'Asia', 'John Smith', 'Mary Jenifer', 'Tom Wallace', 200000000, 230, '01919171234568', 1, 0),
('CA5678', 'Canada', 'N.Amer', 'JustinTrude', 'MarcGarnea', 'AliceBrown', 37742154, 9985000, '6135550199', 1, 0),
('DE7890', 'Germany', 'Europe', 'Frank-Walt', 'AnnalenaBae', 'HansSchmidt', 83149300, 357022, '495556789', 1, 1),
('FR9012', 'France', 'Europe', 'EmmanuelMac', 'JeanYvesLD', 'PierreDupon', 67081000, 551695, '335559876', 1, 0),
('JP3456', 'Japan', 'Asia', 'FumioKishi', 'YoshimasaHa', 'TaroYamada', 125836021, 377975, '815551234', 1, 0),
('US1234', 'UnitedStates', 'N.Amer', 'JoeBiden', 'AntonyBlink', 'JohnSmith', 331002651, 9833517, '2025550134', 1, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `emp_name` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `emp_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `job_grade` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `salary` int NOT NULL,
  `phone` varchar(14) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `birth_date` date NOT NULL,
  `hire_date` date NOT NULL,
  `address` varchar(30) NOT NULL,
  `photo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `employee`
--

INSERT INTO `employee` (`emp_name`, `emp_id`, `job_grade`, `salary`, `phone`, `gender`, `birth_date`, `hire_date`, `address`, `photo`, `is_delete`) VALUES
('王大明', 'B123123123', '簡任9等', 72000, '886744444444', '男', '1990-12-20', '2018-01-15', '高雄市左營區民族路二段二號', '1736187906_677c2002559b6.png', 0),
('呂溪東', 'B123456789', '簡任10等', 80000, '88626666666', '女', '1970-12-02', '2012-11-03', '台中市台灣大道四段一七二七號', 'photo2.png', 1),
('許美玲', 'B123789456', '簡任1等', 48000, '886166666666', '女', '1999-01-05', '2022-07-19', '台北市信義區信義路九段九號', 'photo3.png', 0),
('張雅婷', 'B321321321', '簡任7等', 68000, '886233333333', '女', '1985-03-10', '2010-08-20', '台北市中山區南京東路三段三號', 'photo4.png', 0),
('陳志豪', 'B456456456', '簡任6等', 60000, '886422222222', '男', '1995-07-25', '2020-11-05', '台中市西屯區青海路四段四號', 'photo5.png', 0),
('黃雅雯', 'B456789123', '簡任3等', 52000, '886888888888', '女', '1998-06-15', '2021-04-10', '屏東市民族路七段七號', 'photo6.png', 0),
('劉德華', 'B654654654', '簡任4等', 56000, '886699999999', '男', '1992-11-18', '2019-03-25', '台南市永康區永大路六段六號', 'photo7.png', 0),
('鄭嘉明', 'B789123456', '簡任5等', 50000, '886977777777', '男', '1993-10-22', '2017-09-14', '花蓮市中山路八段八號', 'photo8.png', 0),
('林曉美', 'B789789789', '簡任5等', 58000, '886511111111', '女', '1988-09-30', '2016-02-12', '彰化市中正路五段五號', 'photo9.png', 0),
('李曉華', 'B987654321', '簡任9等', 75000, '886355555555', '女', '1980-05-15', '2015-06-01', '新北市板橋區文化路一段一號', 'photo9.png', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `employeeposting`
--

DROP TABLE IF EXISTS `employeeposting`;
CREATE TABLE IF NOT EXISTS `employeeposting` (
  `emp_id` char(10) NOT NULL,
  `country_code` char(6) NOT NULL,
  `emp_name` char(14) NOT NULL,
  `start_date` date NOT NULL,
  `ambassador_name` char(14) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`emp_id`,`country_code`),
  KEY `country_code` (`country_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `employeeposting`
--

INSERT INTO `employeeposting` (`emp_id`, `country_code`, `emp_name`, `start_date`, `ambassador_name`, `is_delete`) VALUES
('B123123123', 'US1234', '王大明', '2020-03-01', 'John Smith', 0),
('B123456789', 'AA4321', '呂溪東', '2025-01-01', 'Hans Schmidt', 0),
('B123456789', 'JP3456', '呂溪東', '2019-07-15', 'Taro Yamada', 0),
('B123789456', 'AA4321', '許美玲', '2021-06-01', 'Hans Schmidt', 0),
('B321321321', 'FR9012', '張雅婷', '2018-09-10', 'Pierre Dupon', 0),
('B456456456', 'CA5678', '陳志豪', '2022-11-25', 'Alice Brown', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `familymembers`
--

DROP TABLE IF EXISTS `familymembers`;
CREATE TABLE IF NOT EXISTS `familymembers` (
  `emp_id` char(10) NOT NULL,
  `family_id` char(10) NOT NULL,
  `family_name` char(14) NOT NULL,
  `family_gender` char(1) NOT NULL,
  `relationship` char(6) NOT NULL,
  `birth_date` date NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`emp_id`,`family_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `familymembers`
--

INSERT INTO `familymembers` (`emp_id`, `family_id`, `family_name`, `family_gender`, `relationship`, `birth_date`, `is_delete`) VALUES
('B123123123', 'A123456789', '王小明', '女', '子', '2015-03-25', 0),
('B123123123', 'B987654321', '王小花', '女', '女', '2017-06-12', 0),
('B123123123', 'C234567890', '李淑華', '女', '妻', '1991-08-20', 0),
('B123456789', 'D876543210', '呂小東', '男', '子', '2005-10-01', 0),
('B123456789', 'E765432109', '呂小美', '女', '女', '2008-11-15', 0),
('B123789456', 'F654321098', '許小玲', '女', '女', '2020-01-01', 0),
('B321321321', 'G543210987', '張大仁', '男', '夫', '1983-02-15', 0),
('B321321321', 'H432109876', '張小婷', '女', '女', '2010-09-05', 0),
('B456456456', 'I321098765', '陳小豪', '男', '子', '2018-12-22', 0),
('B456456456', 'J210987654', '陳美華', '女', '妻', '1996-04-18', 0);

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `employeeposting`
--
ALTER TABLE `employeeposting`
  ADD CONSTRAINT `employeeposting_ibfk_1` FOREIGN KEY (`country_code`) REFERENCES `country` (`country_code`);

--
-- 資料表的限制式 `familymembers`
--
ALTER TABLE `familymembers`
  ADD CONSTRAINT `familymembers_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
