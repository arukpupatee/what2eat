-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.21-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for what2eat
CREATE DATABASE IF NOT EXISTS `what2eat` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `what2eat`;

-- Dumping structure for table what2eat.consist_of
CREATE TABLE IF NOT EXISTS `consist_of` (
  `Food_ID` int(11) NOT NULL,
  `Ingredient_ID` int(11) NOT NULL,
  PRIMARY KEY (`Food_ID`,`Ingredient_ID`),
  KEY `ingredient_in` (`Ingredient_ID`),
  CONSTRAINT `food_have` FOREIGN KEY (`Food_ID`) REFERENCES `food` (`ID`),
  CONSTRAINT `ingredient_in` FOREIGN KEY (`Ingredient_ID`) REFERENCES `ingredients` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table what2eat.consist_of: ~0 rows (approximately)
DELETE FROM `consist_of`;
/*!40000 ALTER TABLE `consist_of` DISABLE KEYS */;
INSERT INTO `consist_of` (`Food_ID`, `Ingredient_ID`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(2, 6),
	(3, 7),
	(4, 1),
	(4, 2),
	(4, 3),
	(4, 4),
	(4, 8),
	(4, 9),
	(5, 2),
	(5, 10),
	(5, 11),
	(5, 12),
	(6, 6),
	(6, 10),
	(6, 12),
	(7, 1),
	(7, 13),
	(7, 14),
	(7, 15),
	(7, 16),
	(7, 17),
	(7, 18),
	(7, 19),
	(8, 3),
	(8, 11),
	(8, 13),
	(8, 14),
	(8, 15),
	(8, 16),
	(8, 18),
	(8, 19),
	(8, 20),
	(8, 21),
	(8, 22),
	(8, 23),
	(9, 1),
	(9, 2),
	(9, 3),
	(9, 6),
	(9, 7),
	(9, 8),
	(9, 24),
	(9, 25),
	(10, 1),
	(10, 2),
	(10, 3),
	(10, 6),
	(10, 8),
	(10, 10),
	(10, 26),
	(10, 27),
	(10, 28),
	(10, 29),
	(11, 1),
	(11, 2),
	(11, 3),
	(11, 8),
	(11, 10),
	(11, 12),
	(11, 30),
	(11, 31),
	(12, 1),
	(12, 2),
	(12, 3),
	(12, 8),
	(12, 17),
	(12, 25),
	(12, 32),
	(12, 33),
	(12, 34),
	(13, 1),
	(13, 2),
	(13, 3),
	(13, 8),
	(13, 17),
	(13, 25),
	(13, 27),
	(13, 32),
	(13, 33),
	(14, 1),
	(14, 2),
	(14, 3),
	(14, 8),
	(14, 13),
	(14, 14),
	(14, 15),
	(14, 16),
	(14, 17),
	(14, 25),
	(14, 32),
	(14, 33),
	(14, 34),
	(14, 35),
	(15, 1),
	(15, 2),
	(15, 3),
	(15, 6),
	(15, 7),
	(15, 8),
	(15, 24),
	(15, 25),
	(15, 36),
	(15, 37),
	(16, 1),
	(16, 2),
	(16, 3),
	(16, 6),
	(16, 8),
	(16, 10),
	(16, 26),
	(16, 27),
	(16, 28),
	(16, 29),
	(16, 37),
	(16, 38),
	(17, 1),
	(17, 2),
	(17, 3),
	(17, 8),
	(17, 10),
	(17, 12),
	(17, 30),
	(17, 31),
	(18, 1),
	(18, 2),
	(18, 3),
	(18, 8),
	(18, 17),
	(18, 25),
	(18, 32),
	(18, 33),
	(18, 34),
	(18, 39),
	(19, 1),
	(19, 2),
	(19, 31),
	(19, 40);
/*!40000 ALTER TABLE `consist_of` ENABLE KEYS */;

-- Dumping structure for table what2eat.food
CREATE TABLE IF NOT EXISTS `food` (
  `Shop_ID` int(11) NOT NULL,
  `ID` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Type` text NOT NULL,
  `Price` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Name` (`Name`(50)),
  KEY `served` (`Shop_ID`),
  CONSTRAINT `served` FOREIGN KEY (`Shop_ID`) REFERENCES `shops` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table what2eat.food: ~0 rows (approximately)
DELETE FROM `food`;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` (`Shop_ID`, `ID`, `Name`, `Type`, `Price`) VALUES
	(1, 1, 'คั่วกลิ้ง', 'ผัด', 35),
	(1, 2, 'ข้าวหมูกรอบ', 'ทอด', 35),
	(1, 3, 'ข้าวคอหมูย่าง', 'ย่าง', 35),
	(1, 4, 'ผัดพริกแกง', 'ผัด', 35),
	(2, 5, 'ข้าวมันไก่', 'ข้าวมันไก่', 35),
	(2, 6, 'ข้าวหมูกรอบ', 'ทอด', 40),
	(3, 7, 'ก๋วยเตี๋ยวต้มยำ', 'ก๋วยเตี๋ยว', 40),
	(3, 8, 'เย็นตาโฟ', 'ก๋วยเตี๋ยว', 40),
	(4, 9, 'ผัดกะเพรา', 'ผัด', 35),
	(4, 10, 'ข้าวผัด', 'ผัด', 35),
	(4, 11, 'ผัดกระเทียมพริกไทย', 'ผัด', 35),
	(4, 12, 'ต้มยำ', 'ต้ม', 45),
	(5, 13, 'ข้าวต้มต้มยำ', 'ต้ม', 45),
	(5, 14, 'เส้นต้มยำ', 'ต้ม', 45),
	(6, 15, 'ผัดกะเพรา', 'ผัด', 35),
	(6, 16, 'ข้าวผัด', 'ผัด', 35),
	(6, 17, 'ผัดกะเทียมพริกไทย', 'ผัด', 35),
	(6, 18, 'ต้มยำ', 'ต้ม', 45),
	(6, 19, 'สเต็ก', 'ทอด', 60);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;

-- Dumping structure for table what2eat.ingredients
CREATE TABLE IF NOT EXISTS `ingredients` (
  `ID` int(11) NOT NULL,
  `Name` tinytext,
  `Type` tinytext,
  PRIMARY KEY (`ID`),
  KEY `Name` (`Name`(50))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table what2eat.ingredients: ~0 rows (approximately)
DELETE FROM `ingredients`;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` (`ID`, `Name`, `Type`) VALUES
	(1, 'หมู', 'เนื้อสัตว์'),
	(2, 'ไก่', 'เนื้อสัตว์'),
	(3, 'ปลาหมึก', 'เนื้อสัตว์'),
	(4, 'พริกแกง', 'เครื่องปรุง'),
	(5, 'พริกหยวก', 'ผัก'),
	(6, 'หมูกรอบ', 'เนื้อสัตว์'),
	(7, 'คอหมู', 'เนื้อสัตว์'),
	(8, 'กุ้ง', 'เนื้อสัตว์'),
	(9, 'พริกไทยสด', 'เครื่องปรุง'),
	(10, 'แตงกวา', 'ผัก'),
	(11, 'เลือดหมู', 'เครื่องใน'),
	(12, 'ผักชี', 'ผัก'),
	(13, 'เส้นเล็ก', 'เส้น'),
	(14, 'เส้นใหญ่', 'เส้น'),
	(15, 'เส้นหมี่', 'เส้น'),
	(16, 'เส้นบะหมี่', 'เส้น'),
	(17, 'พริกเผา', 'เครื่องปรุง'),
	(18, 'ถั่วบด', 'เครื่องปรุง'),
	(19, 'ลูกชิ้น', 'แป้ง'),
	(20, 'ปลาหมึกกรอบ', 'เนื้อสัตว์'),
	(21, 'เห็ดหูหนูขาว', 'เห็ด'),
	(22, 'เห็ดหูหนูดำ', 'เเห็ด'),
	(23, 'น้ำจิ้มเย็นตาโฟ', 'เครื่องปรุง'),
	(24, 'กะเพรา', 'ผัก'),
	(25, 'พริกบด', 'เครื่องปรุง'),
	(26, 'ไข่', 'เนื้อสัตว์'),
	(27, 'ข้าว', 'แป้ง'),
	(28, 'แครอท', 'ผัก'),
	(29, 'ไก่กรอบ', 'เนื้อสัตว์'),
	(30, 'กระเทียม', 'เครื่องปรุง'),
	(31, 'พริกไทย', 'เครื่องปรุง'),
	(32, 'ตะไคร้', 'ผัก'),
	(33, 'ใบมะกรูด', 'ผัก'),
	(34, 'เห็ดฟาง', 'เห็ด'),
	(35, 'เส้นมาม่า', 'เส้น'),
	(36, 'ถั่วฝักยาว', 'ผัก'),
	(37, 'ข้าวโพดอ่อน', 'ผัก'),
	(38, 'หัวหอม', 'ผัก'),
	(39, 'ข่า', 'ผัก'),
	(40, 'พริกไทยดำ', 'เครื่องปรุง');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;

-- Dumping structure for table what2eat.shops
CREATE TABLE IF NOT EXISTS `shops` (
  `ID` int(11) NOT NULL,
  `Title` tinytext NOT NULL,
  `Type` tinytext NOT NULL,
  `Place` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Title` (`Title`(60))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table what2eat.shops: ~0 rows (approximately)
DELETE FROM `shops`;
/*!40000 ALTER TABLE `shops` DISABLE KEYS */;
INSERT INTO `shops` (`ID`, `Title`, `Type`, `Place`) VALUES
	(1, 'ร้านตายอด', 'ร้านข้าวราดแกง', 'ด้านซ้ายมือ ตรงสามแยกแรกหลังมหาลัย'),
	(2, 'ร้านเจ๊ตุ๊ก', 'ร้านข้าวมันไก่', 'ด้านหน้า ตรงสามแยกแรกหลังมหาลัย'),
	(3, 'ร้านโรงเตี๊ยม', 'ร้านก๋วยเตี๋ยว', 'ด้านหน้า ตรงสามแยกแรกหลังมหาลัย'),
	(4, 'ร้านเจ๊เพ็ญ', 'ร้านอาหารตามสั่ง', 'เลี้ยวขวาสามแยกแรกหลังมหาลัย อยู่ตรงข้ามเยื้องกับเซเว่น'),
	(5, 'ร้านข้าวต้มต้มยำ', 'ร้านข้าวต้ม', 'หน้าหอเอื้องฟ้า'),
	(6, 'ร้าน iCook', 'ร้านอาหารตามสั่ง', 'หน้าทางเข้าหมู่บ้านสิรินปาร์ค');
/*!40000 ALTER TABLE `shops` ENABLE KEYS */;

-- Dumping structure for table what2eat.taste
CREATE TABLE IF NOT EXISTS `taste` (
  `Food_ID` int(11) NOT NULL,
  `Taste` tinytext NOT NULL,
  PRIMARY KEY (`Food_ID`,`Taste`(20)),
  CONSTRAINT `taste` FOREIGN KEY (`Food_ID`) REFERENCES `food` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table what2eat.taste: ~0 rows (approximately)
DELETE FROM `taste`;
/*!40000 ALTER TABLE `taste` DISABLE KEYS */;
INSERT INTO `taste` (`Food_ID`, `Taste`) VALUES
	(1, 'เผ็ด'),
	(2, 'จืด'),
	(3, 'จืด'),
	(4, 'เผ็ด'),
	(5, 'จืด'),
	(6, 'จืด'),
	(7, 'เปรี้ยว'),
	(7, 'เผ็ด'),
	(8, 'หวาน'),
	(8, 'เผ็ด'),
	(9, 'เผ็ด'),
	(10, 'จืด'),
	(11, 'เค็ม'),
	(12, 'เปรี้ยว'),
	(12, 'เผ็ด'),
	(13, 'เปรี้ยว'),
	(13, 'เผ็ด'),
	(14, 'เปรี้ยว'),
	(14, 'เผ็ด'),
	(15, 'เผ็ด'),
	(16, 'จืด'),
	(17, 'จืด'),
	(18, 'เปรี้ยว'),
	(18, 'เผ็ด'),
	(19, 'เค็ม');
/*!40000 ALTER TABLE `taste` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
