-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: RMS
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

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
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer` (
  `CustomerID` int NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `ContactPhone` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Status` varchar(10) DEFAULT 'Active',
  `Notes` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category_list`
--

DROP TABLE IF EXISTS `category_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_list` (
  `category_id` int NOT NULL,
  `category_description` varchar(20) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rental_equipment`
--

DROP TABLE IF EXISTS `rental_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rental_equipment` (
  `equipment_id` int NOT NULL AUTO_INCREMENT,
  `category` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `daily_rental_cost` double(10,2) NOT NULL,
  PRIMARY KEY (`equipment_id`),
  KEY `category_list_category_id_fk` (`category`),
  CONSTRAINT `category_list_category_id_fk` FOREIGN KEY (`category`) REFERENCES `category_list` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `rental_equipment_view`
--

DROP TABLE IF EXISTS `rental_equipment_view`;
/*!50001 DROP VIEW IF EXISTS `rental_equipment_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rental_equipment_view` AS SELECT 
 1 AS `equipment_id`,
 1 AS `category`,
 1 AS `category_description`,
 1 AS `name`,
 1 AS `description`,
 1 AS `daily_rental_cost`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `rental_info`
--

DROP TABLE IF EXISTS `rental_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rental_info` (
  `rental_id` int NOT NULL AUTO_INCREMENT,
  `currentdate` datetime NOT NULL,
  `customer_id` int NOT NULL,
  `equipment_id` int NOT NULL,
  `rental_date` datetime NOT NULL,
  `return_date` datetime DEFAULT NULL,
  `cost` double(10,2) DEFAULT '0.00',
  PRIMARY KEY (`rental_id`),
  KEY `equipment_id` (`equipment_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `rental_info_ibfk_2` FOREIGN KEY (`equipment_id`) REFERENCES `rental_equipment` (`equipment_id`),
  CONSTRAINT `rental_info_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`CustomerID`)
) ENGINE=InnoDB AUTO_INCREMENT=1015 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `rental_information_view`
--

DROP TABLE IF EXISTS `rental_information_view`;
/*!50001 DROP VIEW IF EXISTS `rental_information_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rental_information_view` AS SELECT 
 1 AS `rental_id`,
 1 AS `currentdate`,
 1 AS `customer_id`,
 1 AS `FirstName`,
 1 AS `LastName`,
 1 AS `customer_name`,
 1 AS `category_description`,
 1 AS `name`,
 1 AS `equipment_id`,
 1 AS `rental_date`,
 1 AS `return_date`,
 1 AS `cost`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `rental_equipment_view`
--

/*!50001 DROP VIEW IF EXISTS `rental_equipment_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`group3`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `rental_equipment_view` AS select `rental_equipment`.`equipment_id` AS `equipment_id`,`rental_equipment`.`category` AS `category`,`category_list`.`category_description` AS `category_description`,`rental_equipment`.`name` AS `name`,`rental_equipment`.`description` AS `description`,`rental_equipment`.`daily_rental_cost` AS `daily_rental_cost` from (`rental_equipment` left join `category_list` on((`rental_equipment`.`category` = `category_list`.`category_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `rental_information_view`
--

/*!50001 DROP VIEW IF EXISTS `rental_information_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`group3`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `rental_information_view` AS select `rental_info`.`rental_id` AS `rental_id`,`rental_info`.`currentdate` AS `currentdate`,`rental_info`.`customer_id` AS `customer_id`,`Customer`.`FirstName` AS `FirstName`,`Customer`.`LastName` AS `LastName`,concat(`Customer`.`FirstName`,' ',`Customer`.`LastName`) AS `customer_name`,`rental_equipment_view`.`category_description` AS `category_description`,`rental_equipment_view`.`name` AS `name`,`rental_info`.`equipment_id` AS `equipment_id`,date_format(`rental_info`.`rental_date`,'%Y-%m-%d') AS `rental_date`,`rental_info`.`return_date` AS `return_date`,`rental_info`.`cost` AS `cost` from ((`rental_info` left join `Customer` on((`rental_info`.`customer_id` = `Customer`.`CustomerID`))) left join `rental_equipment_view` on((`rental_info`.`equipment_id` = `rental_equipment_view`.`equipment_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-22  8:39:32
