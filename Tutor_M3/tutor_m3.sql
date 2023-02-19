/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.4.14-MariaDB : Database - tutor_m3
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tutor_m3` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `tutor_m3`;

/*Table structure for table `books` */

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `id_book` bigint(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id_book`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `books` */

insert  into `books`(`id_book`,`title`) values 
(1,'ENCORE IN DEATH'),
(2,'IT ENDS WITH US'),
(3,'IT STARTS WITH US'),
(4,'HEART BONES'),
(5,'LESSONS IN CHEMISTRY'),
(6,'THE LIGHT WE CARRY');

/*Table structure for table `shops` */

DROP TABLE IF EXISTS `shops`;

CREATE TABLE `shops` (
  `id_shop` bigint(11) NOT NULL AUTO_INCREMENT,
  `id_user` bigint(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id_shop`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `shops_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `shops` */

insert  into `shops`(`id_shop`,`id_user`,`name`,`location`) values 
(1,2,'Toko Mega Jaya','Jl. Galaxy Mall'),
(2,2,'Toko Anugerah Jaya','Jl. Tunjungan Plaza'),
(3,3,'Toko Marga Mulia','Jl. Rungkut Mapan'),
(4,4,'Toko Lancar Jaya','Jl. Ciputra World');

/*Table structure for table `shops_books` */

DROP TABLE IF EXISTS `shops_books`;

CREATE TABLE `shops_books` (
  `id_shop` bigint(11) DEFAULT NULL,
  `id_book` bigint(11) DEFAULT NULL,
  `quantity` bigint(11) DEFAULT NULL,
  KEY `id_shop` (`id_shop`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `shops_books_ibfk_1` FOREIGN KEY (`id_shop`) REFERENCES `shops` (`id_shop`),
  CONSTRAINT `shops_books_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id_book`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `shops_books` */

insert  into `shops_books`(`id_shop`,`id_book`,`quantity`) values 
(2,1,4),
(2,2,5),
(3,1,8),
(3,2,7),
(3,4,6),
(3,5,8),
(1,5,5),
(1,2,10);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id_user` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id_user`,`name`) values 
(2,'Christian Chen'),
(3,'Williandy Takhta'),
(4,'Lawrence Patrick');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
