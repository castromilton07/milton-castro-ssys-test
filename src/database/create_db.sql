SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ssys_test
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ssys_test`;
CREATE SCHEMA IF NOT EXISTS `ssys_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `ssys_test` ;

-- -----------------------------------------------------
-- Table `ssys_test`.`Employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssys_test`.`Employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `department` VARCHAR(255) NOT NULL,
  `salary` DECIMAL(10,2) NOT NULL,
  `birth_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET= utf8 COLLATE = utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `ssys_test`.`SequelizeMeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssys_test`.`SequelizeMeta` (
  `name` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Dumping data for table `SequelizeMeta`
-- -----------------------------------------------------

LOCK TABLES `Employees` WRITE;

INSERT INTO `Employees`
VALUES (1,'Anakin Skywalker','skywalker@ssys.com.br','2dfe886b7515ff7795c7879b844ee899','Architecture',4000.00,'1983-01-01 03:00:00'),
       (2,'Obi-Wan Kenobi','kenobi@ssys.com.br','bd39f3a44be2614a3f29c3cde63d1e16','Back-End',3000.00,'1977-01-01 03:00:00'),
       (3,'Leia Organa','organa@ssys.com.br','a2adfc6bd34666b617dd484c8f6a4708','DevOps',5000.00,'1980-01-01 03:00:00');

UNLOCK TABLES;

-- -----------------------------------------------------
-- Dumping data for table `SequelizeMeta`
-- -----------------------------------------------------

LOCK TABLES `SequelizeMeta` WRITE;

INSERT INTO `SequelizeMeta`
VALUES ('20220329233018-create-employees.js');

UNLOCK TABLES;