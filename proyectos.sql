-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: proyectos
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas_conocimiento`
--

DROP TABLE IF EXISTS `areas_conocimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas_conocimiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proyecto_id` int NOT NULL,
  `tipo_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `proyecto_id` (`proyecto_id`),
  KEY `fk_area_tipo` (`tipo_id`),
  CONSTRAINT `areas_conocimiento_ibfk_1` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_area_tipo` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_area_conocimiento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas_conocimiento`
--

LOCK TABLES `areas_conocimiento` WRITE;
/*!40000 ALTER TABLE `areas_conocimiento` DISABLE KEYS */;
INSERT INTO `areas_conocimiento` VALUES (4,23,4),(5,16,5),(6,29,6),(7,16,7),(8,16,9),(9,30,6),(10,16,11),(11,16,4),(12,17,5),(13,17,6),(14,18,5);
/*!40000 ALTER TABLE `areas_conocimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entradas_subcategoria`
--

DROP TABLE IF EXISTS `entradas_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entradas_subcategoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subcategoria_id` int NOT NULL,
  `nombre` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_entrada_subcat` (`subcategoria_id`),
  CONSTRAINT `fk_entrada_subcat` FOREIGN KEY (`subcategoria_id`) REFERENCES `subcategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradas_subcategoria`
--

LOCK TABLES `entradas_subcategoria` WRITE;
/*!40000 ALTER TABLE `entradas_subcategoria` DISABLE KEYS */;
INSERT INTO `entradas_subcategoria` VALUES (6,2,'Acta de constitución del proyecto'),(7,2,'Plan para la dirección del proyecto'),(8,2,'Documentos del proyecto'),(9,2,'Documentos de negocio'),(10,2,'Acuerdos'),(11,2,'Factores ambientales de la empresa'),(12,2,'Activos de los procesos de la organización'),(13,3,'Acta de constitución del proyecto'),(14,3,'Plan para la dirección del proyecto'),(15,3,'Documentos del proyecto'),(16,3,'Documentos de negocio'),(17,3,'Acuerdos'),(18,3,'Factores ambientales de la empresa'),(19,3,'Activos de los procesos de la organización'),(20,4,'Plan para la dirección del proyecto'),(21,4,'Documentos del proyecto'),(22,4,'Factores ambientales de la empresa'),(23,4,'Activos de los procesos de la organización'),(24,5,'Plan para la dirección del proyecto'),(25,5,'Documentos del proyecto'),(26,5,'Entregables verificados'),(27,5,'Datos de desempeño del trabajo'),(28,6,'Plan para la dirección del proyecto'),(29,6,'Documentos del proyecto'),(30,6,'Datos de desempeño del trabajo'),(31,6,'Activos de los procesos de la organización');
/*!40000 ALTER TABLE `entradas_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacion_subcategoria_items`
--

DROP TABLE IF EXISTS `evaluacion_subcategoria_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacion_subcategoria_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proyecto_id` int NOT NULL,
  `subcategoria_item_id` int NOT NULL,
  `tipo` enum('entrada','herramienta','salida') NOT NULL,
  `cumplio` enum('SI','NO') DEFAULT NULL,
  `descripcion` text,
  `observaciones` text,
  `fecha_cumplimiento` datetime DEFAULT NULL,
  `evidencia_path` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_eval_proyecto` (`proyecto_id`),
  KEY `fk_eval_subitem` (`subcategoria_item_id`),
  CONSTRAINT `fk_eval_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_eval_subitem` FOREIGN KEY (`subcategoria_item_id`) REFERENCES `nombre_subcategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacion_subcategoria_items`
--

LOCK TABLES `evaluacion_subcategoria_items` WRITE;
/*!40000 ALTER TABLE `evaluacion_subcategoria_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluacion_subcategoria_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `herramientas_tecnicas_subcategoria`
--

DROP TABLE IF EXISTS `herramientas_tecnicas_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `herramientas_tecnicas_subcategoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subcategoria_id` int NOT NULL,
  `nombre` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ht_subcat` (`subcategoria_id`),
  CONSTRAINT `fk_ht_subcat` FOREIGN KEY (`subcategoria_id`) REFERENCES `subcategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `herramientas_tecnicas_subcategoria`
--

LOCK TABLES `herramientas_tecnicas_subcategoria` WRITE;
/*!40000 ALTER TABLE `herramientas_tecnicas_subcategoria` DISABLE KEYS */;
INSERT INTO `herramientas_tecnicas_subcategoria` VALUES (4,2,'Juicio de expertos'),(5,2,'Recopilación de datos'),(6,2,'Análisis de datos'),(7,2,'Toma de decisiones'),(8,2,'Representación de datos'),(9,2,'Habilidades interpersonales y de equipo'),(10,2,'Diagramas de contexto'),(11,2,'Prototipos'),(12,3,'Juicio de expertos'),(13,3,'Análisis de datos'),(14,3,'Toma de decisiones'),(15,3,'Habilidades interpersonales y de equipo'),(16,3,'Análisis del producto'),(17,4,'Juicio de expertos'),(18,4,'Descomposición'),(19,5,'Inspección'),(20,5,'Toma de decisiones'),(21,6,'Análisis de datos');
/*!40000 ALTER TABLE `herramientas_tecnicas_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nombre_subcategorias`
--

DROP TABLE IF EXISTS `nombre_subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nombre_subcategorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tipo_subcat` (`tipo_id`),
  CONSTRAINT `fk_tipo_subcat` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_area_conocimiento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nombre_subcategorias`
--

LOCK TABLES `nombre_subcategorias` WRITE;
/*!40000 ALTER TABLE `nombre_subcategorias` DISABLE KEYS */;
INSERT INTO `nombre_subcategorias` VALUES (1,5,'5.1 Planificar la gestión del alcance'),(2,5,'5.2 Recopilar requisitos'),(3,5,'5.3 Definir el alcance'),(4,5,'5.4 Crear la EDT/WBS'),(5,5,'5.5 Validar el alcance'),(6,5,'5.6 Controlar el alcance');
/*!40000 ALTER TABLE `nombre_subcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `porcentaje_avance` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (16,'Proyecto A',50.00),(17,'Proyecto B',75.00),(18,'Hola',0.00),(19,'pruebas',0.00),(20,'pruebas',0.00),(21,'ddd',0.00),(22,'BES',0.00),(23,'SFAFAFAS',0.00),(24,'ZZZZZZZZZ',0.00),(25,'fsfsfs',0.00),(26,'fsfsfs',0.00),(27,'fff',0.00),(28,'FFSAFXVZX',0.00),(29,'fasfasas',0.00),(30,'fsfsfsfs',0.00),(31,'fsafsafsa',0.00),(32,'fasfsafsa',0.00),(33,'ffsfsfs',0.00),(34,'zzzzzzz',0.00),(35,'fsafas',0.00),(36,'ZZCCX',0.00),(37,'asfafas',0.00),(38,'APO',0.00),(39,'ASFASFCXC',0.00),(40,'untels',0.00);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salidas_subcategoria`
--

DROP TABLE IF EXISTS `salidas_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salidas_subcategoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subcategoria_id` int NOT NULL,
  `nombre` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_salida_subcat` (`subcategoria_id`),
  CONSTRAINT `fk_salida_subcat` FOREIGN KEY (`subcategoria_id`) REFERENCES `subcategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salidas_subcategoria`
--

LOCK TABLES `salidas_subcategoria` WRITE;
/*!40000 ALTER TABLE `salidas_subcategoria` DISABLE KEYS */;
INSERT INTO `salidas_subcategoria` VALUES (3,2,'Documentación de requisitos'),(4,2,'Matriz de trazabilidad de requisitos'),(5,3,'Enunciado del alcance del proyecto'),(6,3,'Actualizaciones a los documentos del proyecto'),(7,4,'Línea base del alcance'),(8,4,'Actualizaciones a los documentos del proyecto'),(9,5,'Entregables aceptados'),(10,5,'Información de desempeño del trabajo'),(11,5,'Solicitudes de cambio'),(12,5,'Actualizaciones a los documentos del proyecto'),(13,6,'Información de desempeño del trabajo'),(14,6,'Solicitudes de cambio'),(15,6,'Actualizaciones al plan para la dirección del proyecto'),(16,6,'Actualizaciones a los documentos del proyecto');
/*!40000 ALTER TABLE `salidas_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategorias`
--

DROP TABLE IF EXISTS `subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `area_conocimiento_id` int NOT NULL,
  `nombre_subcategoria_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `area_conocimiento_id` (`area_conocimiento_id`,`nombre_subcategoria_id`),
  KEY `fk_area_subcat` (`area_conocimiento_id`),
  KEY `fk_nombre_subcat` (`nombre_subcategoria_id`),
  CONSTRAINT `fk_area_subcat` FOREIGN KEY (`area_conocimiento_id`) REFERENCES `areas_conocimiento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_nombre_subcat` FOREIGN KEY (`nombre_subcategoria_id`) REFERENCES `nombre_subcategorias` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorias`
--

LOCK TABLES `subcategorias` WRITE;
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` VALUES (12,5,1),(2,5,2),(3,5,3),(4,5,4),(5,5,5),(6,5,6),(7,12,1),(13,12,2),(14,12,3),(15,12,4),(16,12,5),(17,12,6),(18,14,1),(19,14,2);
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_area_conocimiento`
--

DROP TABLE IF EXISTS `tipo_area_conocimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_area_conocimiento` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_area_conocimiento`
--

LOCK TABLES `tipo_area_conocimiento` WRITE;
/*!40000 ALTER TABLE `tipo_area_conocimiento` DISABLE KEYS */;
INSERT INTO `tipo_area_conocimiento` VALUES (4,'Gestión de la Integración del Proyecto'),(5,'Gestión del Alcance del Proyecto'),(6,'Gestión del Cronograma del Proyecto'),(7,'Gestión de los Costos del Proyecto'),(8,'Gestión de la Calidad del Proyecto'),(9,'Gestión de los Recursos del Proyecto'),(10,'Gestión de las Comunicaciones del Proyecto'),(11,'Gestión de los Riesgos del Proyecto'),(12,'Gestión de las Adquisiciones del Proyecto'),(13,'Gestión de los Interesados del Proyecto');
/*!40000 ALTER TABLE `tipo_area_conocimiento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-11 13:49:56
