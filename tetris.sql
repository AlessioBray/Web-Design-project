-- Progettazione Web 
DROP DATABASE if exists tetris; 
CREATE DATABASE tetris; 
USE tetris; 
-- MySQL dump 10.13  Distrib 5.6.20, for Win32 (x86)
--
-- Host: localhost    Database: tetris
-- ------------------------------------------------------
-- Server version	5.6.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game1`
--

DROP TABLE IF EXISTS `game1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `playerUsername` varchar(32) NOT NULL,
  `level` int(11) NOT NULL,
  `score` int(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game1`
--

LOCK TABLES `game1` WRITE;
/*!40000 ALTER TABLE `game1` DISABLE KEYS */;
INSERT INTO `game1` VALUES (1,'alessio',3,4200),(2,'davide',3,3860),(3,'gemma',3,3200),(4,'gennaro',2,2430),(5,'andrea',2,2430),(6,'fabio',2,2110),(7,'francesco',1,1770),(8,'gianni',1,1090),(9,'rosario',0,600),(10,'stefania',0,360);
/*!40000 ALTER TABLE `game1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game2`
--

DROP TABLE IF EXISTS `game2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `playerUsername1` varchar(32) NOT NULL,
  `playerUsername2` varchar(32) NOT NULL,
  `score` int(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game2`
--

LOCK TABLES `game2` WRITE;
/*!40000 ALTER TABLE `game2` DISABLE KEYS */;
INSERT INTO `game2` VALUES (1,'alessio','davide',6240),(2,'davide','gemma',5720),(3,'gemma','gennaro',4420),(4,'gennaro','andrea',3600),(5,'andrea','fabio',3080),(6,'fabio','francesco',2600),(7,'francesco','gianni',2310),(8,'gianni','rosario',2310),(9,'rosario','stefania',1800),(10,'stefania','alessio',1680);
/*!40000 ALTER TABLE `game2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `gamesPlayed1` int(11) DEFAULT '0',
  `rank1` int(11) DEFAULT '0',
  `bestScore1` int(11) DEFAULT '0',
  `highestLinesCleared` int(11) DEFAULT '0',
  `highestTetris` int(11) DEFAULT '0',
  `highestLevel` int(11) DEFAULT '0',
  `gamesPlayed2` int(11) DEFAULT '0',
  `rank2` int(11) DEFAULT '0',
  `bestScore2` int(11) DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'alessio@gmail.com','alessio','alessio',1,1,4200,17,2,3,2,1,6240),(2,'davide@gmail.com','davide','davide',1,2,3860,16,2,3,2,1,6240),(3,'gemma@gmail.com','gemma','gemma',1,3,3200,14,1,3,2,2,5720),(4,'gennaro@gmail.com','gennaro','gennaro',1,4,2430,12,0,2,2,3,4420),(5,'andrea@gmail.com','andrea','andrea',1,4,2430,12,0,2,2,4,3600),(6,'fabio@gmail.com','fabio','fabio',1,6,2110,11,0,2,2,5,3080),(7,'francesco@gmail.com','francesco','francesco',1,7,1770,9,0,1,2,6,2600),(8,'gianni@gmail.com','gianni','gianni',1,8,1090,5,0,1,2,7,2310),(9,'rosario@gmail.com','rosario','rosario',1,9,600,0,0,0,2,7,2310),(10,'stefania@gmail.com','stefania','stefania',1,10,360,0,0,0,2,9,1800);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-10 22:08:03
