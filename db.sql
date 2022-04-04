-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: concessionaire
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `brand_img` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`brand_id`),
  UNIQUE KEY `uname` (`brand_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1214 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (868,'audi','view/images/brand_logos/audi.jpg'),(887,'bmw','view/images/brand_logos/bmw.jpg'),(900,'cadillac','view/images/brand_logos/cadillac.jpg'),(910,'chevrolet','view/images/brand_logos/chevrolet.jpg'),(911,'chrysler','view/images/brand_logos/chrysler.jpg'),(913,'citroen','view/images/brand_logos/citroen.jpg'),(917,'dacia','view/images/brand_logos/dacia.jpg'),(918,'daewoo','view/images/brand_logos/daewoo.jpg'),(934,'dodge','view/images/brand_logos/dodge.jpg'),(957,'fiat','view/images/brand_logos/fiat.jpg'),(963,'ford','view/images/brand_logos/ford.jpg'),(997,'honda','view/images/brand_logos/honda.jpg'),(1003,'hummer','view/images/brand_logos/hummer.jpg'),(1005,'hyundai','view/images/brand_logos/hyundai.jpg'),(1009,'infiniti','view/images/brand_logos/infiniti.jpg'),(1019,'jaguar','view/images/brand_logos/jaguar.jpg'),(1022,'jeep','view/images/brand_logos/jeep.jpg'),(1032,'kia','view/images/brand_logos/kia.jpg'),(1044,'lexus','view/images/brand_logos/lexus.jpg'),(1068,'mazda','view/images/brand_logos/mazda.jpg'),(1074,'mercedes-benz','view/images/brand_logos/mercedes-benz.jpg'),(1080,'mini','view/images/brand_logos/mini.jpg'),(1081,'mitsubishi','view/images/brand_logos/mitsubishi.jpg'),(1093,'nissan','view/images/brand_logos/nissan.jpg'),(1097,'opel','view/images/brand_logos/opel.jpg'),(1107,'peugeot','view/images/brand_logos/peugeot.jpg'),(1114,'porsche','view/images/brand_logos/porsche.jpg'),(1124,'renault','view/images/brand_logos/renault.jpg'),(1135,'rover','view/images/brand_logos/rover.jpg'),(1137,'saab','view/images/brand_logos/saab.jpg'),(1144,'seat','view/images/brand_logos/seat.jpg'),(1152,'skoda','view/images/brand_logos/skoda.jpg'),(1153,'smart','view/images/brand_logos/smart.jpg'),(1163,'subaru','view/images/brand_logos/subaru.jpg'),(1165,'suzuki','view/images/brand_logos/suzuki.jpg'),(1174,'toyota','view/images/brand_logos/toyota.jpg'),(1191,'volkswagen','view/images/brand_logos/volkswagen.jpg'),(1192,'volvo','view/images/brand_logos/volvo.jpg');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `matricula` char(50) DEFAULT NULL,
  `bastidor` char(50) DEFAULT NULL,
  `model` int DEFAULT NULL,
  `price` float DEFAULT NULL,
  `km` int DEFAULT NULL,
  `description` text,
  `fuel_type` int DEFAULT NULL,
  `extres` char(200) DEFAULT NULL,
  `f_mat` char(20) DEFAULT NULL,
  `category` int DEFAULT NULL,
  `lat` char(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lon` char(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `city` char(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `view_count` int NOT NULL,
  PRIMARY KEY (`car_id`),
  UNIQUE KEY `matricula` (`matricula`),
  UNIQUE KEY `bastidor` (`bastidor`),
  KEY `fuel_type` (`fuel_type`),
  KEY `category` (`category`),
  KEY `model` (`model`),
  CONSTRAINT `car_ibfk_1` FOREIGN KEY (`fuel_type`) REFERENCES `fuel_type` (`fuel_type_id`),
  CONSTRAINT `car_ibfk_2` FOREIGN KEY (`category`) REFERENCES `category` (`category_id`),
  CONSTRAINT `car_ibfk_3` FOREIGN KEY (`model`) REFERENCES `models` (`model_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1785 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_img`
--

DROP TABLE IF EXISTS `car_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_img` (
  `car_img_id` int NOT NULL AUTO_INCREMENT,
  `car_ref` int DEFAULT NULL,
  `car_img_file` char(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`car_img_id`),
  KEY `car_ref` (`car_ref`),
  CONSTRAINT `car_img_ibfk_1` FOREIGN KEY (`car_ref`) REFERENCES `car` (`car_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4618 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_img`
--

LOCK TABLES `car_img` WRITE;
/*!40000 ALTER TABLE `car_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` char(30) DEFAULT NULL,
  `category_img` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uniq_cat_nme` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Preowned','view/images/category/pre-owned.png'),(2,'Km 0','view/images/category/0km.png'),(3,'Economic','view/images/category/economic.jpg'),(4,'Second Hand','view/images/category/second.jpeg'),(5,'Adapted','view/images/category/adapted.jpeg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `error`
--

DROP TABLE IF EXISTS `error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `error` (
  `error_id` int NOT NULL AUTO_INCREMENT,
  `error_date` datetime NOT NULL,
  `error_type` int DEFAULT NULL,
  `error_description` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`error_id`)
) ENGINE=InnoDB AUTO_INCREMENT=502 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `error`
--

LOCK TABLES `error` WRITE;
/*!40000 ALTER TABLE `error` DISABLE KEYS */;
/*!40000 ALTER TABLE `error` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fuel_type`
--

DROP TABLE IF EXISTS `fuel_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fuel_type` (
  `fuel_type_id` int NOT NULL AUTO_INCREMENT,
  `fuel_type_name` char(30) DEFAULT NULL,
  `fuel_type_img` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`fuel_type_id`),
  UNIQUE KEY `fuel_type_uniq` (`fuel_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fuel_type`
--

LOCK TABLES `fuel_type` WRITE;
/*!40000 ALTER TABLE `fuel_type` DISABLE KEYS */;
INSERT INTO `fuel_type` VALUES (1,'Hybrid','view/images/fuel_type/hybrid.jpg'),(2,'Gasoline','view/images/fuel_type/gasoline.jpg'),(3,'Gasoil','view/images/fuel_type/gasoil.jpg'),(4,'Electric','view/images/fuel_type/electric.jpeg');
/*!40000 ALTER TABLE `fuel_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `username_like` char(20) NOT NULL,
  `car_like` int NOT NULL,
  PRIMARY KEY (`username_like`,`car_like`),
  KEY `car_like` (`car_like`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`username_like`) REFERENCES `user` (`username`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`car_like`) REFERENCES `car` (`car_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `model_id` int NOT NULL AUTO_INCREMENT,
  `model_name` char(30) DEFAULT NULL,
  `model_brand` int DEFAULT NULL,
  `model_img` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`model_id`),
  UNIQUE KEY `model_name` (`model_name`),
  KEY `model_brand` (`model_brand`),
  CONSTRAINT `models_ibfk_1` FOREIGN KEY (`model_brand`) REFERENCES `brands` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=895 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (2,'a',900,NULL),(3,'Alhambra',1144,NULL),(4,'Altea',1144,NULL),(5,'Altea XL',1144,NULL),(6,'Arosa',1144,NULL),(7,'Cordoba',1144,NULL),(8,'Cordoba Vario',1144,NULL),(9,'Exeo',1144,NULL),(10,'Ibiza',1144,NULL),(11,'Ibiza ST',1144,NULL),(12,'Exeo ST',1144,NULL),(13,'Leon',1144,NULL),(14,'Leon ST',1144,NULL),(15,'Inca',1144,NULL),(16,'Mii',1144,NULL),(17,'Toledo',1144,NULL),(18,'Captur',1124,NULL),(19,'Clio',1124,NULL),(20,'Clio Grandtour',1124,NULL),(21,'Espace',1124,NULL),(22,'Express',1124,NULL),(23,'Fluence',1124,NULL),(24,'Grand Espace',1124,NULL),(25,'Grand Modus',1124,NULL),(26,'Grand Scenic',1124,NULL),(27,'Kadjar',1124,NULL),(28,'Kangoo',1124,NULL),(29,'Kangoo Express',1124,NULL),(30,'Koleos',1124,NULL),(31,'Laguna',1124,NULL),(32,'Laguna Grandtour',1124,NULL),(33,'Latitude',1124,NULL),(34,'Mascott',1124,NULL),(35,'Mégane',1124,NULL),(36,'Mégane CC',1124,NULL),(37,'Mégane Combi',1124,NULL),(38,'Mégane Grandtour',1124,NULL),(39,'Mégane Coupé',1124,NULL),(40,'Mégane Scénic',1124,NULL),(41,'Scénic',1124,NULL),(42,'Talisman',1124,NULL),(43,'Talisman Grandtour',1124,NULL),(44,'Thalia',1124,NULL),(45,'Twingo',1124,NULL),(46,'Wind',1124,NULL),(47,'Zoé',1124,NULL),(48,'1007',1107,NULL),(49,'107',1107,NULL),(50,'106',1107,NULL),(51,'108',1107,NULL),(52,'2008',1107,NULL),(53,'205',1107,NULL),(54,'205 Cabrio',1107,NULL),(55,'206',1107,NULL),(56,'206 CC',1107,NULL),(57,'206 SW',1107,NULL),(58,'207',1107,NULL),(59,'207 CC',1107,NULL),(60,'207 SW',1107,NULL),(61,'306',1107,NULL),(62,'307',1107,NULL),(63,'307 CC',1107,NULL),(64,'307 SW',1107,NULL),(65,'308',1107,NULL),(66,'308 CC',1107,NULL),(67,'308 SW',1107,NULL),(68,'309',1107,NULL),(69,'4007',1107,NULL),(70,'4008',1107,NULL),(71,'405',1107,NULL),(72,'406',1107,NULL),(73,'407',1107,NULL),(74,'407 SW',1107,NULL),(75,'5008',1107,NULL),(76,'508',1107,NULL),(77,'508 SW',1107,NULL),(78,'605',1107,NULL),(79,'806',1107,NULL),(80,'607',1107,NULL),(81,'807',1107,NULL),(82,'Bipper',1107,NULL),(83,'RCZ',1107,NULL),(84,'Dokker',917,NULL),(85,'Duster',917,NULL),(86,'Lodgy',917,NULL),(87,'Logan',917,NULL),(88,'Logan MCV',917,NULL),(89,'Logan Van',917,NULL),(90,'Sandero',917,NULL),(91,'Solenza',917,NULL),(92,'Berlingo',913,NULL),(93,'C-Crosser',913,NULL),(94,'C-Elissée',913,NULL),(95,'C-Zero',913,NULL),(96,'C1',913,NULL),(97,'C2',913,NULL),(98,'C3',913,NULL),(99,'C3 Picasso',913,NULL),(100,'C4',913,NULL),(101,'C4 Aircross',913,NULL),(102,'C4 Cactus',913,NULL),(103,'C4 Coupé',913,NULL),(104,'C4 Grand Picasso',913,NULL),(105,'C4 Sedan',913,NULL),(106,'C5',913,NULL),(107,'C5 Break',913,NULL),(108,'C5 Tourer',913,NULL),(109,'C6',913,NULL),(110,'C8',913,NULL),(111,'DS3',913,NULL),(112,'DS4',913,NULL),(113,'DS5',913,NULL),(114,'Evasion',913,NULL),(115,'Jumper',913,NULL),(116,'Jumpy',913,NULL),(117,'Saxo',913,NULL),(118,'Nemo',913,NULL),(119,'Xantia',913,NULL),(120,'Xsara',913,NULL),(121,'Agila',1097,NULL),(122,'Ampera',1097,NULL),(123,'Antara',1097,NULL),(124,'Astra',1097,NULL),(125,'Astra cabrio',1097,NULL),(126,'Astra caravan',1097,NULL),(127,'Astra coupé',1097,NULL),(128,'Calibra',1097,NULL),(129,'Campo',1097,NULL),(130,'Cascada',1097,NULL),(131,'Corsa',1097,NULL),(132,'Frontera',1097,NULL),(133,'Insignia',1097,NULL),(134,'Insignia kombi',1097,NULL),(135,'Kadett',1097,NULL),(136,'Meriva',1097,NULL),(137,'Mokka',1097,NULL),(138,'Movano',1097,NULL),(139,'Omega',1097,NULL),(140,'Signum',1097,NULL),(141,'Vectra',1097,NULL),(142,'Vectra Caravan',1097,NULL),(143,'Vivaro',1097,NULL),(144,'Vivaro Kombi',1097,NULL),(145,'Zafira',1097,NULL),(146,'145',1097,NULL),(147,'146',1097,NULL),(148,'147',1097,NULL),(149,'155',1097,NULL),(150,'156',1097,NULL),(151,'156 Sportwagon',1097,NULL),(152,'159',1097,NULL),(153,'159 Sportwagon',1097,NULL),(154,'164',1097,NULL),(155,'166',1097,NULL),(156,'4C',1097,NULL),(157,'Brera',1097,NULL),(158,'GTV',1097,NULL),(159,'MiTo',1097,NULL),(160,'Crosswagon',1097,NULL),(161,'Spider',1097,NULL),(162,'GT',1097,NULL),(163,'Giulietta',1097,NULL),(164,'Giulia',1097,NULL),(165,'Favorit',1152,NULL),(166,'Felicia',1152,NULL),(167,'Citigo',1152,NULL),(168,'Fabia',1152,NULL),(169,'Fabia Combi',1152,NULL),(170,'Fabia Sedan',1152,NULL),(171,'Felicia Combi',1152,NULL),(172,'Octavia',1152,NULL),(173,'Octavia Combi',1152,NULL),(174,'Roomster',1152,NULL),(175,'Yeti',1152,NULL),(176,'Rapid',1152,NULL),(177,'Rapid Spaceback',1152,NULL),(178,'Superb',1152,NULL),(179,'Superb Combi',1152,NULL),(180,'Alero',910,NULL),(181,'Aveo',910,NULL),(182,'Camaro',910,NULL),(183,'Captiva',910,NULL),(184,'Corvette',910,NULL),(185,'Cruze',910,NULL),(186,'Cruze SW',910,NULL),(187,'Epica',910,NULL),(188,'Equinox',910,NULL),(189,'Evanda',910,NULL),(190,'HHR',910,NULL),(191,'Kalos',910,NULL),(192,'Lacetti',910,NULL),(193,'Lacetti SW',910,NULL),(194,'Lumina',910,NULL),(195,'Malibu',910,NULL),(196,'Matiz',910,NULL),(197,'Monte Carlo',910,NULL),(198,'Nubira',910,NULL),(199,'Orlando',910,NULL),(200,'Spark',910,NULL),(201,'Suburban',910,NULL),(202,'Tacuma',910,NULL),(203,'Tahoe',910,NULL),(204,'Trax',910,NULL),(205,'911 Carrera',1114,NULL),(206,'911 Carrera Cabrio',1114,NULL),(207,'911 Targa',1114,NULL),(208,'911 Turbo',1114,NULL),(209,'924',1114,NULL),(210,'944',1114,NULL),(211,'997',1114,NULL),(212,'Boxster',1114,NULL),(213,'Cayenne',1114,NULL),(214,'Cayman',1114,NULL),(215,'Macan',1114,NULL),(216,'Panamera',1114,NULL),(217,'Accord',997,NULL),(218,'Accord Coupé',997,NULL),(219,'Accord Tourer',997,NULL),(220,'City',997,NULL),(221,'Civic',997,NULL),(222,'Civic Aerodeck',997,NULL),(223,'Civic Coupé',997,NULL),(224,'Civic Tourer',997,NULL),(225,'Civic Type R',997,NULL),(226,'CR-V',997,NULL),(227,'CR-X',997,NULL),(228,'CR-Z',997,NULL),(229,'FR-V',997,NULL),(230,'HR-V',997,NULL),(231,'Insight',997,NULL),(232,'Integra',997,NULL),(233,'Jazz',997,NULL),(234,'Legend',997,NULL),(235,'Prelude',997,NULL),(236,'BRZ',1163,NULL),(237,'Forester',1163,NULL),(238,'Impreza',1163,NULL),(239,'Impreza Wagon',1163,NULL),(240,'Justy',1163,NULL),(241,'Legacy',1163,NULL),(242,'Legacy Wagon',1163,NULL),(243,'Legacy Outback',1163,NULL),(244,'Levorg',1163,NULL),(245,'Outback',1163,NULL),(246,'SVX',1163,NULL),(247,'Tribeca',1163,NULL),(248,'Tribeca B9',1163,NULL),(249,'XV',1163,NULL),(250,'121',1068,NULL),(251,'2',1068,NULL),(252,'3',1068,NULL),(253,'323',1068,NULL),(254,'323 Combi',1068,NULL),(255,'323 Coupé',1068,NULL),(256,'323 F',1068,NULL),(257,'5',1068,NULL),(258,'6',1068,NULL),(259,'6 Combi',1068,NULL),(260,'626',1068,NULL),(261,'626 Combi',1068,NULL),(262,'B-Fighter',1068,NULL),(263,'B2500',1068,NULL),(264,'BT',1068,NULL),(265,'CX-3',1068,NULL),(266,'CX-5',1068,NULL),(267,'CX-7',1068,NULL),(268,'CX-9',1068,NULL),(269,'Demio',1068,NULL),(270,'MPV',1068,NULL),(271,'MX-3',1068,NULL),(272,'MX-5',1068,NULL),(273,'MX-6',1068,NULL),(274,'Premacy',1068,NULL),(275,'RX-7',1068,NULL),(276,'RX-8',1068,NULL),(277,'Xedox 6',1068,NULL),(278,'3000 GT',1081,NULL),(279,'ASX',1081,NULL),(280,'Carisma',1081,NULL),(281,'Colt',1081,NULL),(282,'Colt CC',1081,NULL),(283,'Eclipse',1081,NULL),(284,'Fuso canter',1081,NULL),(285,'Galant',1081,NULL),(286,'Galant Combi',1081,NULL),(287,'Grandis',1081,NULL),(288,'L200',1081,NULL),(289,'L200 Pick up',1081,NULL),(290,'L200 Pick up Allrad',1081,NULL),(291,'L300',1081,NULL),(292,'Lancer',1081,NULL),(293,'Lancer Combi',1081,NULL),(294,'Lancer Evo',1081,NULL),(295,'Lancer Sportback',1081,NULL),(296,'Outlander',1081,NULL),(297,'Pajero',1081,NULL),(298,'Pajeto Pinin',1081,NULL),(299,'Pajero Pinin Wagon',1081,NULL),(300,'Pajero Sport',1081,NULL),(301,'Pajero Wagon',1081,NULL),(302,'Space Star',1081,NULL),(303,'CT',1044,NULL),(304,'GS',1044,NULL),(305,'GS 300',1044,NULL),(306,'GX',1044,NULL),(307,'IS',1044,NULL),(308,'IS 200',1044,NULL),(309,'IS 250 C',1044,NULL),(310,'IS-F',1044,NULL),(311,'LS',1044,NULL),(312,'LX',1044,NULL),(313,'NX',1044,NULL),(314,'RC F',1044,NULL),(315,'RX',1044,NULL),(316,'RX 300',1044,NULL),(317,'RX 400h',1044,NULL),(318,'RX 450h',1044,NULL),(319,'SC 430',1044,NULL),(320,'4-Runner',1174,NULL),(321,'Auris',1174,NULL),(322,'Avensis',1174,NULL),(323,'Avensis Combi',1174,NULL),(324,'Avensis Van Verso',1174,NULL),(325,'Aygo',1174,NULL),(326,'Camry',1174,NULL),(327,'Carina',1174,NULL),(328,'Celica',1174,NULL),(329,'Corolla',1174,NULL),(330,'Corolla Combi',1174,NULL),(331,'Corolla sedan',1174,NULL),(332,'Corolla Verso',1174,NULL),(333,'FJ Cruiser',1174,NULL),(334,'GT86',1174,NULL),(335,'Hiace',1174,NULL),(336,'Hiace Van',1174,NULL),(337,'Highlander',1174,NULL),(338,'Hilux',1174,NULL),(339,'Land Cruiser',1174,NULL),(340,'MR2',1174,NULL),(341,'Paseo',1174,NULL),(342,'Picnic',1174,NULL),(343,'Prius',1174,NULL),(344,'RAV4',1174,NULL),(345,'Sequoia',1174,NULL),(346,'Starlet',1174,NULL),(347,'Supra',1174,NULL),(348,'Tundra',1174,NULL),(349,'Urban Cruiser',1174,NULL),(350,'Verso',1174,NULL),(351,'Yaris',1174,NULL),(352,'Yaris Verso',1174,NULL),(353,'i3',887,NULL),(354,'i8',887,NULL),(355,'M3',887,NULL),(356,'M4',887,NULL),(357,'M5',887,NULL),(358,'M6',887,NULL),(359,'Rad 1',887,NULL),(360,'Rad 1 Cabrio',887,NULL),(361,'Rad 1 Coupé',887,NULL),(362,'Rad 2',887,NULL),(363,'Rad 2 Active Tourer',887,NULL),(364,'Rad 2 Coupé',887,NULL),(365,'Rad 2 Gran Tourer',887,NULL),(366,'Rad 3',887,NULL),(367,'Rad 3 Cabrio',887,NULL),(368,'Rad 3 Compact',887,NULL),(369,'Rad 3 Coupé',887,NULL),(370,'Rad 3 GT',887,NULL),(371,'Rad 3 Touring',887,NULL),(372,'Rad 4',887,NULL),(373,'Rad 4 Cabrio',887,NULL),(374,'Rad 4 Gran Coupé',887,NULL),(375,'Rad 5',887,NULL),(376,'Rad 5 GT',887,NULL),(377,'Rad 5 Touring',887,NULL),(378,'Rad 6',887,NULL),(379,'Rad 6 Cabrio',887,NULL),(380,'Rad 6 Coupé',887,NULL),(381,'Rad 6 Gran Coupé',887,NULL),(382,'Rad 7',887,NULL),(383,'Rad 8 Coupé',887,NULL),(384,'X1',887,NULL),(385,'X3',887,NULL),(386,'X4',887,NULL),(387,'X5',887,NULL),(388,'X6',887,NULL),(389,'Z3',887,NULL),(390,'Z3 Coupé',887,NULL),(391,'Z3 Roadster',887,NULL),(392,'Z4',887,NULL),(393,'Z4 Roadster',887,NULL),(394,'Amarok',1191,NULL),(395,'Beetle',1191,NULL),(396,'Bora',1191,NULL),(397,'Bora Variant',1191,NULL),(398,'Caddy',1191,NULL),(399,'Caddy Van',1191,NULL),(400,'Life',1191,NULL),(401,'California',1191,NULL),(402,'Caravelle',1191,NULL),(403,'CC',1191,NULL),(404,'Crafter',1191,NULL),(405,'Crafter Van',1191,NULL),(406,'Crafter Kombi',1191,NULL),(407,'CrossTouran',1191,NULL),(408,'Eos',1191,NULL),(409,'Fox',1191,NULL),(410,'Golf',1191,NULL),(411,'Golf Cabrio',1191,NULL),(412,'Golf Plus',1191,NULL),(413,'Golf Sportvan',1191,NULL),(414,'Golf Variant',1191,NULL),(415,'Jetta',1191,NULL),(416,'LT',1191,NULL),(417,'Lupo',1191,NULL),(418,'Multivan',1191,NULL),(419,'New Beetle',1191,NULL),(420,'New Beetle Cabrio',1191,NULL),(421,'Passat',1191,NULL),(422,'Passat Alltrack',1191,NULL),(423,'Passat CC',1191,NULL),(424,'Passat Variant',1191,NULL),(425,'Passat Variant Van',1191,NULL),(426,'Phaeton',1191,NULL),(427,'Polo',1191,NULL),(428,'Polo Van',1191,NULL),(429,'Polo Variant',1191,NULL),(430,'Scirocco',1191,NULL),(431,'Sharan',1191,NULL),(432,'T4',1191,NULL),(433,'T4 Caravelle',1191,NULL),(434,'T4 Multivan',1191,NULL),(435,'T5',1191,NULL),(436,'T5 Caravelle',1191,NULL),(437,'T5 Multivan',1191,NULL),(438,'T5 Transporter Shuttle',1191,NULL),(439,'Tiguan',1191,NULL),(440,'Touareg',1191,NULL),(441,'Touran',1191,NULL),(442,'Alto',1165,NULL),(443,'Baleno',1165,NULL),(444,'Baleno kombi',1165,NULL),(445,'Grand Vitara',1165,NULL),(446,'Grand Vitara XL-7',1165,NULL),(447,'Ignis',1165,NULL),(448,'Jimny',1165,NULL),(449,'Kizashi',1165,NULL),(450,'Liana',1165,NULL),(451,'Samurai',1165,NULL),(452,'Splash',1165,NULL),(453,'Swift',1165,NULL),(454,'SX4',1165,NULL),(455,'SX4 Sedan',1165,NULL),(456,'Vitara',1165,NULL),(457,'Wagon R+',1165,NULL),(458,'100 D',1074,NULL),(459,'115',1074,NULL),(460,'124',1074,NULL),(461,'126',1074,NULL),(462,'190',1074,NULL),(463,'190 D',1074,NULL),(464,'190 E',1074,NULL),(465,'200 - 300',1074,NULL),(466,'200 D',1074,NULL),(467,'200 E',1074,NULL),(468,'210 Van',1074,NULL),(469,'210 kombi',1074,NULL),(470,'310 Van',1074,NULL),(471,'310 kombi',1074,NULL),(472,'230 - 300 CE Coupé',1074,NULL),(473,'260 - 560 SE',1074,NULL),(474,'260 - 560 SEL',1074,NULL),(475,'500 - 600 SEC Coupé',1074,NULL),(476,'Trieda A',1074,NULL),(478,'A L',1074,NULL),(479,'AMG GT',1074,NULL),(480,'Trieda B',1074,NULL),(481,'Trieda C',1074,NULL),(482,'C',1074,NULL),(483,'C Sportcoupé',1074,NULL),(484,'C T',1074,NULL),(485,'Citan',1074,NULL),(486,'CL',1074,NULL),(488,'CLA',1074,NULL),(489,'CLC',1074,NULL),(490,'CLK Cabrio',1074,NULL),(491,'CLK Coupé',1074,NULL),(492,'CLS',1074,NULL),(493,'Trieda E',1074,NULL),(494,'E',1074,NULL),(495,'E Cabrio',1074,NULL),(496,'E Coupé',1074,NULL),(497,'E T',1074,NULL),(498,'Trieda G',1074,NULL),(499,'G Cabrio',1074,NULL),(500,'GL',1074,NULL),(501,'GLA',1074,NULL),(502,'GLC',1074,NULL),(503,'GLE',1074,NULL),(504,'GLK',1074,NULL),(505,'Trieda M',1074,NULL),(506,'MB 100',1074,NULL),(507,'Trieda R',1074,NULL),(508,'Trieda S',1074,NULL),(509,'S',1074,NULL),(510,'S Coupé',1074,NULL),(511,'SL',1074,NULL),(512,'SLC',1074,NULL),(513,'SLK',1074,NULL),(514,'SLR',1074,NULL),(515,'Sprinter',1074,NULL),(516,'9-3',1137,NULL),(517,'9-3 Cabriolet',1137,NULL),(518,'9-3 Coupé',1137,NULL),(519,'9-3 SportCombi',1137,NULL),(520,'9-5',1137,NULL),(521,'9-5 SportCombi',1137,NULL),(522,'900',1137,NULL),(523,'900 C',1137,NULL),(524,'900 C Turbo',1137,NULL),(525,'9000',1137,NULL),(526,'100',868,NULL),(527,'100 Avant',868,NULL),(528,'80',868,NULL),(529,'80 Avant',868,NULL),(530,'80 Cabrio',868,NULL),(531,'90',868,NULL),(532,'A1',868,NULL),(533,'A2',868,NULL),(534,'A3',868,NULL),(535,'A3 Cabriolet',868,NULL),(536,'A3 Limuzina',868,NULL),(537,'A3 Sportback',868,NULL),(538,'A4',868,NULL),(539,'A4 Allroad',868,NULL),(540,'A4 Avant',868,NULL),(541,'A4 Cabriolet',868,NULL),(542,'A5',868,NULL),(543,'A5 Cabriolet',868,NULL),(544,'A5 Sportback',868,NULL),(545,'A6',868,NULL),(546,'A6 Allroad',868,NULL),(547,'A6 Avant',868,NULL),(548,'A7',868,NULL),(549,'A8',868,NULL),(550,'A8 Long',868,NULL),(551,'Q3',868,NULL),(552,'Q5',868,NULL),(553,'Q7',868,NULL),(554,'R8',868,NULL),(555,'RS4 Cabriolet',868,NULL),(556,'RS4/RS4 Avant',868,NULL),(557,'RS5',868,NULL),(558,'RS6 Avant',868,NULL),(559,'RS7',868,NULL),(560,'S3/S3 Sportback',868,NULL),(561,'S4 Cabriolet',868,NULL),(562,'S4/S4 Avant',868,NULL),(563,'S5/S5 Cabriolet',868,NULL),(564,'S6/RS6',868,NULL),(565,'S7',868,NULL),(566,'S8',868,NULL),(567,'SQ5',868,NULL),(568,'TT Coupé',868,NULL),(569,'TT Roadster',868,NULL),(570,'TTS',868,NULL),(571,'Avella',1032,NULL),(572,'Besta',1032,NULL),(573,'Carens',1032,NULL),(574,'Carnival',1032,NULL),(575,'Cee`d',1032,NULL),(576,'Cee`d SW',1032,NULL),(577,'Cerato',1032,NULL),(578,'K 2500',1032,NULL),(579,'Magentis',1032,NULL),(580,'Opirus',1032,NULL),(581,'Optima',1032,NULL),(582,'Picanto',1032,NULL),(583,'Pregio',1032,NULL),(584,'Pride',1032,NULL),(585,'Pro Cee`d',1032,NULL),(586,'Rio',1032,NULL),(587,'Rio Combi',1032,NULL),(588,'Rio sedan',1032,NULL),(589,'Sephia',1032,NULL),(590,'Shuma',1032,NULL),(591,'Sorento',1032,NULL),(592,'Soul',1032,NULL),(593,'Sportage',1032,NULL),(594,'Venga',1032,NULL),(595,'109',1032,NULL),(596,'Defender',1032,NULL),(597,'Discovery',1032,NULL),(598,'Discovery Sport',1032,NULL),(599,'Freelander',1032,NULL),(600,'Range Rover',1032,NULL),(601,'Range Rover Evoque',1032,NULL),(602,'Range Rover Sport',1032,NULL),(603,'Avenger',934,NULL),(604,'Caliber',934,NULL),(605,'Challenger',934,NULL),(606,'Charger',934,NULL),(607,'Grand Caravan',934,NULL),(608,'Journey',934,NULL),(609,'Magnum',934,NULL),(610,'Nitro',934,NULL),(611,'RAM',934,NULL),(612,'Stealth',934,NULL),(613,'Viper',934,NULL),(614,'300 C',911,NULL),(615,'300 C Touring',911,NULL),(616,'300 M',911,NULL),(617,'Crossfire',911,NULL),(618,'Grand Voyager',911,NULL),(619,'LHS',911,NULL),(620,'Neon',911,NULL),(621,'Pacifica',911,NULL),(622,'Plymouth',911,NULL),(623,'PT Cruiser',911,NULL),(624,'Sebring',911,NULL),(625,'Sebring Convertible',911,NULL),(626,'Stratus',911,NULL),(627,'Stratus Cabrio',911,NULL),(628,'Town & Country',911,NULL),(629,'Voyager',911,NULL),(630,'Aerostar',963,NULL),(631,'B-Max',963,NULL),(632,'C-Max',963,NULL),(633,'Cortina',963,NULL),(634,'Cougar',963,NULL),(635,'Edge',963,NULL),(636,'Escort',963,NULL),(637,'Escort Cabrio',963,NULL),(638,'Escort kombi',963,NULL),(639,'Explorer',963,NULL),(640,'F-150',963,NULL),(641,'F-250',963,NULL),(642,'Fiesta',963,NULL),(643,'Focus',963,NULL),(644,'Focus C-Max',963,NULL),(645,'Focus CC',963,NULL),(646,'Focus kombi',963,NULL),(647,'Fusion',963,NULL),(648,'Galaxy',963,NULL),(649,'Grand C-Max',963,NULL),(650,'Ka',963,NULL),(651,'Kuga',963,NULL),(652,'Maverick',963,NULL),(653,'Mondeo',963,NULL),(654,'Mondeo Combi',963,NULL),(655,'Mustang',963,NULL),(656,'Orion',963,NULL),(657,'Puma',963,NULL),(658,'Ranger',963,NULL),(659,'S-Max',963,NULL),(660,'Sierra',963,NULL),(661,'Street Ka',963,NULL),(662,'Tourneo Connect',963,NULL),(663,'Tourneo Custom',963,NULL),(664,'Transit',963,NULL),(666,'Transit Bus',963,NULL),(667,'Transit Connect LWB',963,NULL),(668,'Transit Courier',963,NULL),(669,'Transit Custom',963,NULL),(670,'Transit kombi',963,NULL),(671,'Transit Tourneo',963,NULL),(672,'Transit Valnik',963,NULL),(673,'Transit Van',963,NULL),(674,'Transit Van 350',963,NULL),(675,'Windstar',963,NULL),(676,'H2',1003,NULL),(677,'H3',1003,NULL),(678,'Accent',1005,NULL),(679,'Atos',1005,NULL),(680,'Atos Prime',1005,NULL),(681,'Coupé',1005,NULL),(682,'Elantra',1005,NULL),(683,'Galloper',1005,NULL),(684,'Genesis',1005,NULL),(685,'Getz',1005,NULL),(686,'Grandeur',1005,NULL),(687,'H 350',1005,NULL),(688,'H1',1005,NULL),(689,'H1 Bus',1005,NULL),(690,'H1 Van',1005,NULL),(691,'H200',1005,NULL),(692,'i10',1005,NULL),(693,'i20',1005,NULL),(694,'i30',1005,NULL),(695,'i30 CW',1005,NULL),(696,'i40',1005,NULL),(697,'i40 CW',1005,NULL),(698,'ix20',1005,NULL),(699,'ix35',1005,NULL),(700,'ix55',1005,NULL),(701,'Lantra',1005,NULL),(702,'Matrix',1005,NULL),(703,'Santa Fe',1005,NULL),(704,'Sonata',1005,NULL),(705,'Terracan',1005,NULL),(706,'Trajet',1005,NULL),(707,'Tucson',1005,NULL),(708,'Veloster',1005,NULL),(709,'EX',1009,NULL),(710,'FX',1009,NULL),(711,'G',1009,NULL),(712,'G Coupé',1009,NULL),(713,'M',1009,NULL),(714,'Q',1009,NULL),(715,'QX',1009,NULL),(716,'Daimler',1019,NULL),(717,'F-Pace',1019,NULL),(718,'F-Type',1019,NULL),(719,'S-Type',1019,NULL),(720,'Sovereign',1019,NULL),(721,'X-Type',1019,NULL),(722,'X-type Estate',1019,NULL),(723,'XE',1019,NULL),(724,'XF',1019,NULL),(725,'XJ',1019,NULL),(726,'XJ12',1019,NULL),(727,'XJ6',1019,NULL),(728,'XJ8',1019,NULL),(730,'XJR',1019,NULL),(731,'XK',1019,NULL),(732,'XK8 Convertible',1019,NULL),(733,'XKR',1019,NULL),(734,'XKR Convertible',1019,NULL),(735,'Cherokee',1022,NULL),(736,'Commander',1022,NULL),(737,'Compass',1022,NULL),(738,'Grand Cherokee',1022,NULL),(739,'Patriot',1022,NULL),(740,'Renegade',1022,NULL),(741,'Wrangler',1022,NULL),(742,'100 NX',1093,NULL),(743,'200 SX',1093,NULL),(744,'350 Z',1093,NULL),(745,'350 Z Roadster',1093,NULL),(746,'370 Z',1093,NULL),(747,'Almera',1093,NULL),(748,'Almera Tino',1093,NULL),(749,'Cabstar E - T',1093,NULL),(750,'Cabstar TL2 Valnik',1093,NULL),(751,'e-NV200',1093,NULL),(752,'GT-R',1093,NULL),(753,'Insterstar',1093,NULL),(754,'Juke',1093,NULL),(755,'King Cab',1093,NULL),(756,'Leaf',1093,NULL),(757,'Maxima',1093,NULL),(758,'Maxima QX',1093,NULL),(759,'Micra',1093,NULL),(760,'Murano',1093,NULL),(761,'Navara',1093,NULL),(762,'Note',1093,NULL),(763,'NP300 Pickup',1093,NULL),(764,'NV200',1093,NULL),(765,'NV400',1093,NULL),(766,'Pathfinder',1093,NULL),(767,'Patrol',1093,NULL),(768,'Patrol GR',1093,NULL),(769,'Pickup',1093,NULL),(770,'Pixo',1093,NULL),(771,'Primastar',1093,NULL),(772,'Primastar Combi',1093,NULL),(773,'Primera',1093,NULL),(774,'Primera Combi',1093,NULL),(775,'Pulsar',1093,NULL),(776,'Qashqai',1093,NULL),(777,'Serena',1093,NULL),(778,'Sunny',1093,NULL),(779,'Terrano',1093,NULL),(780,'Tiida',1093,NULL),(781,'Trade',1093,NULL),(782,'Vanette Cargo',1093,NULL),(783,'X-Trail',1093,NULL),(784,'240',1192,NULL),(785,'340',1192,NULL),(786,'360',1192,NULL),(787,'460',1192,NULL),(788,'850',1192,NULL),(789,'850 kombi',1192,NULL),(790,'C30',1192,NULL),(791,'C70',1192,NULL),(792,'C70 Cabrio',1192,NULL),(793,'C70 Coupé',1192,NULL),(794,'S40',1192,NULL),(795,'S60',1192,NULL),(796,'S70',1192,NULL),(797,'S80',1192,NULL),(798,'S90',1192,NULL),(799,'V40',1192,NULL),(800,'V50',1192,NULL),(801,'V60',1192,NULL),(802,'V70',1192,NULL),(803,'V90',1192,NULL),(804,'XC60',1192,NULL),(805,'XC70',1192,NULL),(806,'XC90',1192,NULL),(807,'Espero',918,NULL),(810,'Lanos',918,NULL),(811,'Leganza',918,NULL),(812,'Lublin',918,NULL),(814,'Nexia',918,NULL),(816,'Nubira kombi',918,NULL),(817,'Racer',918,NULL),(819,'Tico',918,NULL),(820,'1100',957,NULL),(822,'500',957,NULL),(823,'500L',957,NULL),(824,'500X',957,NULL),(826,'Barchetta',957,NULL),(827,'Brava',957,NULL),(828,'Cinquecento',957,NULL),(830,'Croma',957,NULL),(831,'Doblo',957,NULL),(832,'Doblo Cargo',957,NULL),(833,'Doblo Cargo Combi',957,NULL),(834,'Ducato',957,NULL),(835,'Ducato Van',957,NULL),(836,'Ducato Kombi',957,NULL),(837,'Ducato Podvozok',957,NULL),(838,'Florino',957,NULL),(839,'Florino Combi',957,NULL),(840,'Freemont',957,NULL),(841,'Grande Punto',957,NULL),(842,'Idea',957,NULL),(843,'Linea',957,NULL),(844,'Marea',957,NULL),(845,'Marea Weekend',957,NULL),(846,'Multipla',957,NULL),(847,'Palio Weekend',957,NULL),(848,'Panda',957,NULL),(849,'Panda Van',957,NULL),(850,'Punto',957,NULL),(851,'Punto Cabriolet',957,NULL),(852,'Punto Evo',957,NULL),(853,'Punto Van',957,NULL),(854,'Qubo',957,NULL),(855,'Scudo',957,NULL),(856,'Scudo Van',957,NULL),(857,'Scudo Kombi',957,NULL),(858,'Sedici',957,NULL),(859,'Seicento',957,NULL),(860,'Stilo',957,NULL),(861,'Stilo Multiwagon',957,NULL),(862,'Strada',957,NULL),(863,'Talento',957,NULL),(864,'Tipo',957,NULL),(865,'Ulysse',957,NULL),(866,'Uno',957,NULL),(867,'X1/9',957,NULL),(868,'Cooper',1080,NULL),(869,'Cooper Cabrio',1080,NULL),(870,'Cooper Clubman',1080,NULL),(871,'Cooper D',1080,NULL),(872,'Cooper D Clubman',1080,NULL),(873,'Cooper S',1080,NULL),(874,'Cooper S Cabrio',1080,NULL),(875,'Cooper S Clubman',1080,NULL),(876,'Countryman',1080,NULL),(877,'Mini One',1080,NULL),(878,'One D',1080,NULL),(879,'200',1135,NULL),(880,'214',1135,NULL),(881,'218',1135,NULL),(882,'25',1135,NULL),(883,'400',1135,NULL),(884,'414',1135,NULL),(885,'416',1135,NULL),(886,'620',1135,NULL),(887,'75',1135,NULL),(888,'Cabrio',1153,NULL),(889,'City-Coupé',1153,NULL),(890,'Compact Pulse',1153,NULL),(891,'Forfour',1153,NULL),(892,'Fortwo cabrio',1153,NULL),(893,'Fortwo coupé',1153,NULL),(894,'Roadster',1153,NULL);
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` char(30) NOT NULL,
  `email` char(35) DEFAULT NULL,
  `password` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type` char(15) DEFAULT NULL,
  `avatar` char(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'concessionaire'
--
/*!50003 DROP PROCEDURE IF EXISTS `likes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `likes`(IN u CHAR(20), IN c INT)
BEGIN
DECLARE n INT;
SELECT COUNT(*) INTO n FROM likes WHERE username_like = u AND
car_like = c;
CASE n
WHEN 1 THEN
DELETE FROM likes WHERE username_like = u AND car_like = c;
WHEN 0 THEN
INSERT INTO likes (username_like, car_like) VALUES (u,c);
END CASE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-04 16:02:52
