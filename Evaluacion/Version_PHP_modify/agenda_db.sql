CREATE DATABASE agenda_php_db;
use DATABASE agenda_php_db;

CREATE TABLE usuarios (
  email varchar(50) NOT NULL,
  nombre varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  fecha_nacimiento date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE eventos (
  id int(11) NOT NULL AUTO_INCREMENT,
  titulo varchar(50) NOT NULL,
  fecha_inicio varchar(20) NOT NULL,
  fecha_fin varchar(20) DEFAULT NULL,
  hora_inicio varchar(20) DEFAULT NULL,
  hora_fin varchar(20) DEFAULT NULL,
  allday tinyint(1) DEFAULT NULL,
  fk_usuarios varchar(50),
  PRIMARY KEY (id),
  FOREIGN KEY (fk_usuarios) REFERENCES usuarios(email)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


