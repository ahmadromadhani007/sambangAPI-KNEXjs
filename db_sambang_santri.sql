-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 22, 2022 at 06:19 PM
-- Server version: 8.0.21
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sambang_santri`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_reservasi_santri`
--

DROP TABLE IF EXISTS `detail_reservasi_santri`;
CREATE TABLE IF NOT EXISTS `detail_reservasi_santri` (
  `id_detail_reservasi_santri` int NOT NULL AUTO_INCREMENT,
  `id_reservasi` int DEFAULT NULL,
  `id_santri` int DEFAULT NULL,
  PRIMARY KEY (`id_detail_reservasi_santri`),
  KEY `idreservasi_idx` (`id_reservasi`),
  KEY `idsantri1_idx` (`id_santri`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detail_reservasi_santri`
--

INSERT INTO `detail_reservasi_santri` (`id_detail_reservasi_santri`, `id_reservasi`, `id_santri`) VALUES
(2, 1, 1),
(3, 3, 2),
(4, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `detail_reservasi_wali`
--

DROP TABLE IF EXISTS `detail_reservasi_wali`;
CREATE TABLE IF NOT EXISTS `detail_reservasi_wali` (
  `id_detail_reservasi_wali` int NOT NULL AUTO_INCREMENT,
  `id_reservasi` int DEFAULT NULL,
  `id_mahrom` int DEFAULT NULL,
  `status` enum('p','t') DEFAULT NULL,
  PRIMARY KEY (`id_detail_reservasi_wali`),
  UNIQUE KEY `id_reservasi` (`id_reservasi`,`id_mahrom`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detail_reservasi_wali`
--

INSERT INTO `detail_reservasi_wali` (`id_detail_reservasi_wali`, `id_reservasi`, `id_mahrom`, `status`) VALUES
(1, 1, 2, 'p'),
(2, 2, 3, 'p'),
(3, 3, 1, 't'),
(5, 3, 2, 'p');

-- --------------------------------------------------------

--
-- Table structure for table `hari`
--

DROP TABLE IF EXISTS `hari`;
CREATE TABLE IF NOT EXISTS `hari` (
  `id_hari` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) DEFAULT NULL,
  `id_shift` int DEFAULT NULL,
  `id_wilayah` int DEFAULT NULL,
  `status_hari` enum('Santri','Santriwati') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` enum('Aktif','Nonaktif') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Aktif',
  PRIMARY KEY (`id_hari`),
  KEY `idwilayah2_idx` (`id_wilayah`),
  KEY `idshift_idx` (`id_shift`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hari`
--

INSERT INTO `hari` (`id_hari`, `nama`, `id_shift`, `id_wilayah`, `status_hari`, `status`) VALUES
(1, 'Senin', 1, 2, 'Santriwati', 'Nonaktif'),
(2, 'Selasa', 1, 2, 'Santri', 'Aktif');

-- --------------------------------------------------------

--
-- Table structure for table `informasi`
--

DROP TABLE IF EXISTS `informasi`;
CREATE TABLE IF NOT EXISTS `informasi` (
  `id_informasi` int NOT NULL AUTO_INCREMENT,
  `nama_informasi` varchar(45) DEFAULT NULL,
  `detail_informasi` varchar(45) DEFAULT NULL,
  `tanggal_mulai` varchar(45) DEFAULT NULL,
  `tanggal_akhir` varchar(45) DEFAULT NULL,
  `status` enum('Buka','Tutup') DEFAULT NULL,
  PRIMARY KEY (`id_informasi`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `informasi`
--

INSERT INTO `informasi` (`id_informasi`, `nama_informasi`, `detail_informasi`, `tanggal_mulai`, `tanggal_akhir`, `status`) VALUES
(1, 'Peringatan Hari Besar Islam', 'Sedang ada acara PHBI dari tanggal sekian hin', '2022-03-25', '2022-03-30', 'Tutup'),
(2, 'Libur Puasa Romadhan', 'Sedang ada acara Libur Pesantren dari tanggal', '2022-04-21', '2022-05-20', 'Tutup'),
(3, 'Libur Bulan Maulid', 'Sedang ada acara Libur Pesantren dari tanggal', '2022-10-19', '2022-10-28', 'Tutup'),
(4, 'Liburan Ramadhan', 'Pengajian Ramadhan', '2022-07-12', '2022-07-13', 'Buka');

-- --------------------------------------------------------

--
-- Table structure for table `jenis_mahrom`
--

DROP TABLE IF EXISTS `jenis_mahrom`;
CREATE TABLE IF NOT EXISTS `jenis_mahrom` (
  `id_jenis_mahrom` int NOT NULL AUTO_INCREMENT,
  `jenis_mahrom` varchar(45) DEFAULT NULL,
  `status` enum('y','t') DEFAULT NULL,
  PRIMARY KEY (`id_jenis_mahrom`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jenis_mahrom`
--

INSERT INTO `jenis_mahrom` (`id_jenis_mahrom`, `jenis_mahrom`, `status`) VALUES
(1, 'Ayah', 'y'),
(2, 'Ibu', 'y'),
(3, 'Kakek', 'y'),
(4, 'Nenek', 'y'),
(5, 'Kakak Lk', 'y'),
(6, 'Kakak Pr', 'y'),
(7, 'Buyut', 'y');

-- --------------------------------------------------------

--
-- Table structure for table `lembaga`
--

DROP TABLE IF EXISTS `lembaga`;
CREATE TABLE IF NOT EXISTS `lembaga` (
  `id_lembaga` int NOT NULL AUTO_INCREMENT,
  `nama_lembaga` varchar(45) DEFAULT NULL,
  `status` enum('Aktif','Nonaktif') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Aktif',
  PRIMARY KEY (`id_lembaga`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lembaga`
--

INSERT INTO `lembaga` (`id_lembaga`, `nama_lembaga`, `status`) VALUES
(1, 'SMP Nurul Jadid', 'Nonaktif'),
(2, 'SMA Nurul Jadid', 'Aktif'),
(3, 'MA Nurul Jadid', 'Aktif'),
(4, 'SMK Nurul Jadid', 'Aktif');

-- --------------------------------------------------------

--
-- Table structure for table `mahrom`
--

DROP TABLE IF EXISTS `mahrom`;
CREATE TABLE IF NOT EXISTS `mahrom` (
  `id_mahrom` int NOT NULL AUTO_INCREMENT,
  `id_santri` int DEFAULT NULL,
  `id_jenis_mahrom` int DEFAULT NULL,
  `nik` varchar(45) DEFAULT NULL,
  `nama_mahrom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_mahrom`),
  KEY `idsantri_idx` (`id_santri`),
  KEY `idjenismahrom_idx` (`id_jenis_mahrom`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mahrom`
--

INSERT INTO `mahrom` (`id_mahrom`, `id_santri`, `id_jenis_mahrom`, `nik`, `nama_mahrom`) VALUES
(1, 1, 2, '35131200000001', 'Nur Hayati'),
(2, 1, 2, '35131200000022', 'Sayyidah Fatimah'),
(3, 3, 6, '35131200000034', 'Nuruddin');

-- --------------------------------------------------------

--
-- Table structure for table `pengurus`
--

DROP TABLE IF EXISTS `pengurus`;
CREATE TABLE IF NOT EXISTS `pengurus` (
  `id_pengurus` int NOT NULL AUTO_INCREMENT,
  `id_wilayah` int DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `role` enum('sysadmin','admin') DEFAULT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_pengurus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pertemuan`
--

DROP TABLE IF EXISTS `pertemuan`;
CREATE TABLE IF NOT EXISTS `pertemuan` (
  `id_pertemuan` int NOT NULL AUTO_INCREMENT,
  `batas_sambang` varchar(45) DEFAULT NULL,
  `batas_tamu` varchar(45) DEFAULT NULL,
  `waktu` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_pertemuan`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pertemuan`
--

INSERT INTO `pertemuan` (`id_pertemuan`, `batas_sambang`, `batas_tamu`, `waktu`) VALUES
(1, '45', '4', '20'),
(2, '30', '2', '10'),
(3, '2', '3', '60');

-- --------------------------------------------------------

--
-- Table structure for table `reservasi`
--

DROP TABLE IF EXISTS `reservasi`;
CREATE TABLE IF NOT EXISTS `reservasi` (
  `id_reservasi` int NOT NULL AUTO_INCREMENT,
  `id_hari` int DEFAULT NULL,
  `id_shift` int DEFAULT NULL,
  `tgl_reservasi` date DEFAULT NULL,
  `tgl_kunjungan` date DEFAULT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `hadir` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_reservasi`),
  KEY `idhari_idx` (`id_hari`),
  KEY `id_shift` (`id_shift`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reservasi`
--

INSERT INTO `reservasi` (`id_reservasi`, `id_hari`, `id_shift`, `tgl_reservasi`, `tgl_kunjungan`, `jam_mulai`, `jam_selesai`, `hadir`) VALUES
(1, 3, 2, '2022-02-12', '2022-02-13', '13:00:00', '15:00:00', '3'),
(2, 3, 1, '2022-02-12', '2022-02-13', '13:00:00', '15:00:00', '3'),
(3, 1, 3, '2022-02-12', '2022-02-13', '13:00:00', '15:00:00', '3');

-- --------------------------------------------------------

--
-- Table structure for table `santri`
--

DROP TABLE IF EXISTS `santri`;
CREATE TABLE IF NOT EXISTS `santri` (
  `id_santri` int NOT NULL AUTO_INCREMENT,
  `uid_santri` varchar(45) DEFAULT NULL,
  `nis` varchar(45) DEFAULT NULL,
  `id_wilayah` int DEFAULT NULL,
  `id_lembaga` int DEFAULT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `jenkel` enum('L','P') DEFAULT NULL,
  `alamat` varchar(45) DEFAULT NULL,
  `keterangan` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_santri`),
  UNIQUE KEY `uid_santri` (`uid_santri`),
  UNIQUE KEY `nis` (`nis`),
  KEY `idwilayah_idx` (`id_wilayah`),
  KEY `idlembaga_idx` (`id_lembaga`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `santri`
--

INSERT INTO `santri` (`id_santri`, `uid_santri`, `nis`, `id_wilayah`, `id_lembaga`, `nama`, `jenkel`, `alamat`, `keterangan`) VALUES
(1, '1001', '200001', 1, 2, 'Alfad Sabil Haq', 'L', 'Paiton Probolinggo', NULL),
(2, '1002', '200002', 1, 1, 'Ahmad Dani', 'L', 'Paiton Probolinggo', NULL),
(3, '10003', '200003', 2, 2, 'Danang Izal Faizi', 'L', 'Situbondo', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
CREATE TABLE IF NOT EXISTS `shift` (
  `id_shift` int NOT NULL AUTO_INCREMENT,
  `nama_shift` varchar(45) DEFAULT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `kapasitas` int DEFAULT NULL,
  `status` enum('Aktif','Nonaktif') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Aktif',
  PRIMARY KEY (`id_shift`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`id_shift`, `nama_shift`, `jam_mulai`, `jam_selesai`, `kapasitas`, `status`) VALUES
(1, 'Pagi', '08:00:00', '10:00:00', 20, 'Nonaktif'),
(2, 'Siang', '12:00:00', '15:00:00', 20, 'Aktif'),
(3, 'Malam', '20:00:00', '21:00:00', 10, 'Aktif');

-- --------------------------------------------------------

--
-- Table structure for table `wilayah`
--

DROP TABLE IF EXISTS `wilayah`;
CREATE TABLE IF NOT EXISTS `wilayah` (
  `id_wilayah` int NOT NULL AUTO_INCREMENT,
  `nama_wilayah` varchar(45) DEFAULT NULL,
  `status` enum('Aktif','Nonaktif') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Aktif',
  PRIMARY KEY (`id_wilayah`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wilayah`
--

INSERT INTO `wilayah` (`id_wilayah`, `nama_wilayah`, `status`) VALUES
(1, 'Sunan Gunung Jati', 'Nonaktif'),
(2, 'Sunan Drajad', 'Aktif'),
(3, 'Tahfidz', 'Aktif');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
