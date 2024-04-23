CREATE DATABASE invest;
USE invest;

CREATE TABLE facultades(
    cod INT AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (cod));

CREATE TABLE investigadores(
    dni VARCHAR(9),
    nomapels VARCHAR(255) NOT NULL,
    codFac INT,
    PRIMARY KEY (DNI),
    FOREIGN KEY (codfac) REFERENCES facultades (cod)
    ON DELETE CASCADE 
    ON UPDATE CASCADE);

CREATE TABLE equipos(
    numserie CHAR(4),
    PRIMARY KEY (numserie),
    nombre VARCHAR(100),
    codFac INT,
    FOREIGN KEY (codfac) REFERENCES facultades (cod)
    ON DELETE CASCADE 
    ON UPDATE CASCADE);

CREATE TABLE reserva(
    dni VARCHAR(9),
    numserie CHAR(4),
    comienzo DATE,
    fin DATE,
    PRIMARY KEY (dni, numserie),
    FOREIGN KEY (dni) REFERENCES investigadores (dni)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (numserie) REFERENCES equipos (numserie)
    ON DELETE CASCADE 
    ON UPDATE CASCADE);