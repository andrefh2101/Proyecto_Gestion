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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas_conocimiento`
--

LOCK TABLES `areas_conocimiento` WRITE;
/*!40000 ALTER TABLE `areas_conocimiento` DISABLE KEYS */;
INSERT INTO `areas_conocimiento` VALUES (5,16,5),(7,16,7),(8,16,9),(10,16,11),(11,16,4),(15,16,8),(16,16,12),(17,16,6),(18,16,10),(19,16,13),(50,66,5),(51,66,7);
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
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradas_subcategoria`
--

LOCK TABLES `entradas_subcategoria` WRITE;
/*!40000 ALTER TABLE `entradas_subcategoria` DISABLE KEYS */;
INSERT INTO `entradas_subcategoria` VALUES (6,2,'Acta de constitución del proyecto'),(7,2,'Plan para la dirección del proyecto'),(8,2,'Documentos del proyecto'),(9,2,'Documentos de negocio'),(10,2,'Acuerdos'),(11,2,'Factores ambientales de la empresa'),(12,2,'Activos de los procesos de la organización'),(13,3,'Acta de constitución del proyecto'),(14,3,'Plan para la dirección del proyecto'),(15,3,'Documentos del proyecto'),(16,3,'Documentos de negocio'),(17,3,'Acuerdos'),(18,3,'Factores ambientales de la empresa'),(19,3,'Activos de los procesos de la organización'),(20,4,'Plan para la dirección del proyecto'),(21,4,'Documentos del proyecto'),(22,4,'Factores ambientales de la empresa'),(23,4,'Activos de los procesos de la organización'),(24,5,'Plan para la dirección del proyecto'),(25,5,'Documentos del proyecto'),(26,5,'Entregables verificados'),(27,5,'Datos de desempeño del trabajo'),(32,23,'Acta de constitución del proyecto'),(33,23,'Plan para la dirección del proyecto'),(34,23,'Factores ambientales de la empresa'),(35,23,'Activos de los procesos de la organización'),(59,32,'Plan para la dirección del proyecto'),(60,32,'Documentos del proyecto'),(61,32,'Factores ambientales de la empresa'),(62,32,'Activos de los procesos de la organización'),(125,145,'Acta de constitución del proyecto'),(126,145,'Plan para la dirección del proyecto'),(127,145,'Factores ambientales de la empresa'),(128,145,'Activos de los procesos de la organización'),(129,146,'Acta de constitución del proyecto'),(130,146,'Plan para la dirección del proyecto'),(131,146,'Documentos del proyecto'),(132,146,'Documentos de negocio'),(133,146,'Acuerdos'),(134,146,'Factores ambientales de la empresa'),(135,146,'Activos de los procesos de la organización'),(136,147,'Plan para la dirección del proyecto'),(137,147,'Documentos del proyecto'),(138,147,'Factores ambientales de la empresa'),(139,147,'Activos de los procesos de la organización'),(140,148,'Plan para la dirección del proyecto'),(141,148,'Documentos del proyecto'),(142,148,'Factores ambientales de la empresa'),(143,148,'Activos de los procesos de la organización'),(144,149,'Plan para la dirección del proyecto'),(145,149,'Documentos del proyecto'),(146,149,'Entregables verificados'),(147,150,'Plan para la dirección del proyecto'),(148,150,'Documentos del proyecto'),(149,150,'Datos de desempeño del trabajo'),(150,151,'Acta de constitución del proyecto'),(151,151,'Plan para la dirección del proyecto'),(152,151,'Factores ambientales de la empresa'),(153,151,'Activos de los procesos de la organización');
/*!40000 ALTER TABLE `entradas_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluaciones`
--

DROP TABLE IF EXISTS `evaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proyecto_id` int NOT NULL,
  `subcategoria_id` int NOT NULL,
  `item_id` int NOT NULL,
  `tipo` enum('entrada','herramienta','salida') NOT NULL,
  `cumplio` tinyint DEFAULT NULL,
  `descripcion` text,
  `observaciones` text,
  `fecha_cumplimiento` date DEFAULT NULL,
  `evidencia_path` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_eval` (`proyecto_id`,`subcategoria_id`,`item_id`,`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluaciones`
--

LOCK TABLES `evaluaciones` WRITE;
/*!40000 ALTER TABLE `evaluaciones` DISABLE KEYS */;
INSERT INTO `evaluaciones` VALUES (1,16,2,10,'entrada',1,'aaaaaaaaa','aaaaaaaaaaaaaaaaa','2025-12-13','/uploads/evaluaciones/1765658550960-536359897.pdf'),(2,16,2,11,'entrada',1,'HOLAS','xxxxxxxxxxxxxxxxxxHOLAS','2025-12-01','/uploads/evaluaciones/1765648815394-638510542.pdf'),(3,16,2,7,'herramienta',1,'zzzzzzzzz','zzzzzzzzzzz','2025-12-13','/uploads/evaluaciones/1765658603368-876594611.pdf'),(4,16,2,5,'salida',NULL,NULL,NULL,NULL,NULL),(5,16,2,6,'entrada',1,'hola prueba','hola prueba','2025-12-13','/uploads/evaluaciones/1765656445663-309210800.pdf'),(6,16,2,7,'entrada',1,'PRUEBA APO','PRUEBA APO','2025-12-13','/uploads/evaluaciones/1765656494354-43454435.pdf'),(7,16,2,8,'entrada',1,'PRUEBAAAAA','PRUEBAAAAA','2025-12-04','/uploads/evaluaciones/1765651259545-88954120.pdf'),(8,16,2,9,'entrada',1,'Z','Z','2025-12-09','/uploads/evaluaciones/1765648648058-843160848.pdf'),(11,16,2,12,'entrada',1,'BUENOS DIAS','BUENAS NOCHES','2025-12-02','/uploads/evaluaciones/1765648860081-193388384.pdf'),(13,16,2,4,'herramienta',1,'xxxxxx','xxxxxxxxxxxxxxxxxxxxx','2025-12-13','/uploads/evaluaciones/1765658618310-471164954.pdf'),(14,16,2,3,'salida',1,'zzzzzz','zzzzzzzzzzzzz','2025-12-13','/uploads/evaluaciones/1765658586385-776397130.pdf'),(15,16,2,11,'herramienta',1,'zzzzzzzzzzzz','zzzzzzzzzzzz','2025-12-13','/uploads/evaluaciones/1765658591957-929331925.pdf'),(17,16,2,4,'salida',1,'zzzzz','cccccccccccccc','2025-12-02','/uploads/evaluaciones/1765581096868-153443190.pdf'),(18,16,2,9,'herramienta',1,'zzzzzzzz','zzzzzzzzzzz','2025-12-02','/uploads/evaluaciones/1765581063353-893164225.pdf'),(19,16,2,10,'herramienta',1,'zzzzzzzzz','zzzzzzzzzzzzz','2025-12-13','/uploads/evaluaciones/1765658589549-73169752.pdf'),(23,16,3,13,'entrada',1,'zzzzzzzzzzzzzz','zzzzzzzzzzzzzzzzzzzzzzzzzzzz','2025-12-12','/uploads/evaluaciones/1765583035585-691607908.pdf'),(24,16,3,14,'entrada',1,'ccccccccccccc','ccccccccccccccccccccc','2025-12-01','/uploads/evaluaciones/1765583047828-425041226.pdf'),(45,16,2,8,'herramienta',1,'zzzzzzzzz','zzzzzzzzzzzzzzzzzz','2025-12-13','/uploads/evaluaciones/1765658595399-242287845.pdf'),(47,16,2,5,'herramienta',1,'zzzzzz','zzzzzzzzzzzzzzzz','2025-12-13','/uploads/evaluaciones/1765658598621-940851705.pdf'),(48,16,2,6,'herramienta',1,'zzzzzzzzzzz','zzzzzzzzzzz','2025-12-13','/uploads/evaluaciones/1765658601038-506621517.pdf'),(51,16,4,20,'entrada',1,'asfafas','fasfasfasfas','2025-12-14','/uploads/evaluaciones/1765681824637-98224427.pdf'),(52,16,23,32,'entrada',1,'fasfasfas','fasfasfas','2025-12-14','/uploads/evaluaciones/1765684252420-100766118.pdf'),(53,16,5,24,'entrada',1,'fasfasfas','fasfasfasfasf','2025-12-14','/uploads/evaluaciones/1765685711369-602487141.pdf'),(54,58,95,553,'herramienta',1,'SANDRA','SANDRA','2025-12-14','/uploads/evaluaciones/1765699801790-804176783.pdf'),(55,61,113,700,'herramienta',1,'eleazar','zczczcz','2025-12-14','/uploads/evaluaciones/1765700927968-173425092.pdf'),(56,16,3,15,'entrada',1,'cxcxcx','ccc','2025-12-14','/uploads/evaluaciones/1765704937039-388670167.pdf');
/*!40000 ALTER TABLE `evaluaciones` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=929 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `herramientas_tecnicas_subcategoria`
--

LOCK TABLES `herramientas_tecnicas_subcategoria` WRITE;
/*!40000 ALTER TABLE `herramientas_tecnicas_subcategoria` DISABLE KEYS */;
INSERT INTO `herramientas_tecnicas_subcategoria` VALUES (4,2,'Juicio de expertos'),(5,2,'Recopilación de datos'),(6,2,'Análisis de datos'),(7,2,'Toma de decisiones'),(8,2,'Representación de datos'),(9,2,'Habilidades interpersonales y de equipo'),(10,2,'Diagramas de contexto'),(11,2,'Prototipos'),(12,3,'Juicio de expertos'),(13,3,'Análisis de datos'),(14,3,'Toma de decisiones'),(15,3,'Habilidades interpersonales y de equipo'),(16,3,'Análisis del producto'),(17,4,'Juicio de expertos'),(18,4,'Descomposición'),(19,5,'Inspección'),(20,5,'Toma de decisiones'),(22,23,'Juicio de expertos'),(23,23,'Análisis de datos'),(24,23,'Reuniones'),(51,32,'Juicio de expertos'),(52,32,'Recopilación de datos'),(53,32,'Análisis de datos'),(54,32,'Toma de decisiones'),(55,32,'Representación de datos'),(56,32,'Auditorías de calidad'),(57,32,'Diseño de experimentos'),(58,32,'Métodos de mejora de la calidad'),(902,145,'Juicio de expertos'),(903,145,'Análisis de datos'),(904,145,'Reuniones'),(905,146,'Juicio de expertos'),(906,146,'Recopilación de datos'),(907,146,'Entrevistas'),(908,146,'Grupos focales'),(909,146,'Cuestionarios y encuestas'),(910,146,'Benchmarking'),(911,146,'Análisis de datos'),(912,146,'Toma de decisiones'),(913,146,'Representación de datos'),(914,146,'Habilidades interpersonales y de equipo'),(915,146,'Diagramas de contexto'),(916,146,'Prototipos'),(917,147,'Juicio de expertos'),(918,147,'Análisis de datos'),(919,147,'Toma de decisiones'),(920,147,'Habilidades interpersonales y de equipo'),(921,148,'Juicio de expertos'),(922,148,'Descomposición'),(923,149,'Inspección'),(924,149,'Toma de decisiones'),(925,150,'Análisis de datos'),(926,151,'Juicio de expertos'),(927,151,'Análisis de datos'),(928,151,'Reuniones');
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nombre_subcategorias`
--

LOCK TABLES `nombre_subcategorias` WRITE;
/*!40000 ALTER TABLE `nombre_subcategorias` DISABLE KEYS */;
INSERT INTO `nombre_subcategorias` VALUES (1,5,'5.1 Planificar la gestión del alcance'),(2,5,'5.2 Recopilar requisitos'),(3,5,'5.3 Definir el alcance'),(4,5,'5.4 Crear la EDT/WBS'),(5,5,'5.5 Validar el alcance'),(6,5,'5.6 Controlar el alcance'),(7,4,'4.1 Desarrollar el Acta de Constitución del Proyecto'),(8,4,'4.2 Desarrollar el Plan para la Dirección del Proyecto'),(9,4,'4.3 Dirigir y Gestionar el Trabajo del Proyecto'),(10,4,'4.4 Gestionar el Conocimiento del Proyecto'),(11,4,'4.5 Monitorear y Controlar el Trabajo del Proyecto'),(12,4,'4.6 Realizar el Control Integrado de Cambios'),(13,4,'4.7 Cerrar el Proyecto o Fase'),(18,6,'6.1 Planificar la Gestión del Cronograma'),(19,6,'6.2 Definir las Actividades'),(20,6,'6.3 Secuenciar las Actividades'),(21,6,'6.4 Estimar la Duración de las Actividades'),(22,6,'6.5 Desarrollar el Cronograma'),(23,6,'6.6 Controlar el Cronograma'),(24,7,'7.1 Planificar la Gestión de los Costos'),(25,7,'7.2 Estimar los Costos'),(26,7,'7.3 Determinar el Presupuesto'),(27,7,'7.4 Controlar los Costos'),(28,8,'8.1 Planificar la Gestión de la Calidad'),(29,8,'8.2 Gestionar la Calidad'),(30,8,'8.3 Controlar la Calidad'),(31,9,'9.1 Planificar la Gestión de los Recursos'),(32,9,'9.2 Estimar los Recursos de las Actividades'),(33,9,'9.3 Adquirir Recursos'),(34,9,'9.4 Desarrollar el Equipo'),(35,9,'9.5 Dirigir al Equipo'),(36,9,'9.6 Controlar los Recursos'),(37,10,'10.1 Planificar la Gestión de las Comunicaciones'),(38,10,'10.2 Gestionar las Comunicaciones'),(39,10,'10.3 Monitorear las Comunicaciones'),(40,11,'11.1 Planificar la Gestión de los Riesgos'),(41,11,'11.2 Identificar los Riesgos'),(42,11,'11.3 Realizar el Análisis Cualitativo de Riesgos'),(43,11,'11.4 Realizar el Análisis Cuantitativo de Riesgos'),(44,11,'11.5 Planificar la Respuesta a los Riesgos'),(45,11,'11.6 Implementar la Respuesta a los Riesgos'),(46,11,'11.7 Monitorear los Riesgos'),(47,12,'12.1 Planificar la Gestión de las Adquisiciones del Proyecto'),(48,12,'12.2 Efectuar las Adquisiciones'),(49,12,'12.3 Controlar las Adquisiciones'),(50,13,'13.1 Identificar a los Interesados'),(51,13,'13.2 Planificar el Involucramiento de los Interesados'),(52,13,'13.3 Gestionar el Involucramiento de los Interesados'),(53,13,'13.4 Monitorear el Involucramiento de los Interesados');
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (16,'Proyecto A',50.00),(66,'PRUEBA',0.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=401 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salidas_subcategoria`
--

LOCK TABLES `salidas_subcategoria` WRITE;
/*!40000 ALTER TABLE `salidas_subcategoria` DISABLE KEYS */;
INSERT INTO `salidas_subcategoria` VALUES (3,2,'Documentación de requisitos'),(4,2,'Matriz de trazabilidad de requisitos'),(5,3,'Enunciado del alcance del proyecto'),(6,3,'Actualizaciones a los documentos del proyecto'),(7,4,'Línea base del alcance'),(8,4,'Actualizaciones a los documentos del proyecto'),(9,5,'Entregables aceptados'),(10,5,'Información de desempeño del trabajo'),(11,5,'Solicitudes de cambio'),(12,5,'Actualizaciones a los documentos del proyecto'),(17,23,'Plan de gestión del alcance'),(18,23,'Plan de gestión de los requisitos'),(29,32,'Entregables verificados'),(30,32,'Información de desempeño del trabajo'),(31,32,'Solicitudes de cambio'),(32,32,'Actualizaciones al plan para la dirección del proyecto'),(33,32,'Actualizaciones a los documentos del proyecto'),(381,145,'Plan de gestión del alcance'),(382,145,'Plan de gestión de los requisitos'),(383,146,'Documentación de requisitos'),(384,146,'Matriz de trazabilidad de requisitos'),(385,147,'Enunciado del alcance del proyecto'),(386,147,'Actualizaciones a los documentos del proyecto'),(387,148,'Línea base del alcance'),(388,148,'Enunciado del alcance del proyecto'),(389,148,'EDT/WBS'),(390,148,'Diccionario de la EDT/WBS'),(391,148,'Actualizaciones a los documentos del proyecto'),(392,149,'Entregables aceptados'),(393,149,'Información de desempeño del trabajo'),(394,149,'Solicitudes de cambio'),(395,149,'Actualizaciones a los documentos del proyecto'),(396,150,'Información de desempeño del trabajo'),(397,150,'Solicitudes de cambio'),(398,150,'Actualizaciones al plan para la dirección del proyecto'),(399,150,'Actualizaciones a los documentos del proyecto'),(400,151,'Plan de gestión de los costos');
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
  `porcentaje` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `area_conocimiento_id` (`area_conocimiento_id`,`nombre_subcategoria_id`),
  KEY `fk_area_subcat` (`area_conocimiento_id`),
  KEY `fk_nombre_subcat` (`nombre_subcategoria_id`),
  CONSTRAINT `fk_area_subcat` FOREIGN KEY (`area_conocimiento_id`) REFERENCES `areas_conocimiento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_nombre_subcat` FOREIGN KEY (`nombre_subcategoria_id`) REFERENCES `nombre_subcategorias` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorias`
--

LOCK TABLES `subcategorias` WRITE;
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` VALUES (2,5,2,100),(3,5,3,21),(4,5,4,0),(5,5,5,10),(21,5,6,0),(23,5,1,11),(30,11,7,0),(32,15,29,0),(145,50,1,0),(146,50,2,0),(147,50,3,0),(148,50,4,0),(149,50,5,0),(150,50,6,0),(151,51,24,0);
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

-- Dump completed on 2025-12-14  5:38:01
