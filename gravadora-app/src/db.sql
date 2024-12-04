-- Criação do banco de dados
CREATE DATABASE Gravadora;
USE Gravadora;

----------------------------------------------------------------
--                         TABELAS                            --
----------------------------------------------------------------

-- Criação da tabela Artista (entidade generalizada)
CREATE TABLE Artista (
 id_artista BIGINT AUTO_INCREMENT PRIMARY KEY,
 tipo_artista VARCHAR(50) NOT NULL
);

-- Criação da tabela Músico (especialização de Artista)
CREATE TABLE Musico (
 id_artista BIGINT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 rua VARCHAR(100),
 cidade VARCHAR(50),
 estado VARCHAR(50),
 numero INT,
 telefone VARCHAR(15),
 FOREIGN KEY (id_artista) REFERENCES Artista(id_artista)
);

-- Criação da tabela Banda (especialização de Artista)
CREATE TABLE Banda (
 id_artista BIGINT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 FOREIGN KEY (id_artista) REFERENCES Artista(id_artista)
);

-- Criação da tabela Instrumento
CREATE TABLE Instrumento (
 id_inst BIGINT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 marca VARCHAR(100),
 tipo VARCHAR(100)
);

-- Criação da tabela Produtor
CREATE TABLE Produtor (
 id_prod BIGINT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
cpf VARCHAR(11) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL
);

-- Criação da tabela Disco
CREATE TABLE Disco (
 id_dis BIGINT AUTO_INCREMENT PRIMARY KEY,
 titulo VARCHAR(200) NOT NULL,
 data_lancamento DATE,
 formato VARCHAR(50),
 id_artista BIGINT NOT NULL,
 id_prod BIGINT NOT NULL,
 FOREIGN KEY (id_artista) REFERENCES Artista(id_artista),
 FOREIGN KEY (id_prod) REFERENCES Produtor(id_prod)
);

-- Criação da tabela Música
CREATE TABLE Musica (
 id_musica BIGINT AUTO_INCREMENT PRIMARY KEY,
 titulo VARCHAR(200) NOT NULL,
 autores VARCHAR(255)
);

----------------------------------------------------------------
--                        RELACIONAMENTO                      --
----------------------------------------------------------------

-- Tabela intermediária para o relacionamento tem_membro (musico-banda)
CREATE TABLE tem_membro (
 id_tem_membro BIGINT AUTO_INCREMENT PRIMARY KEY,
 id_artista_musico BIGINT NOT NULL,
 id_artista_banda BIGINT NOT NULL,
 FOREIGN KEY (id_artista_musico) REFERENCES Musico(id_artista),
 FOREIGN KEY (id_artista_banda) REFERENCES Banda(id_artista)
);

-- Tabela intermediária para o relacionamento tem_toca (artista-instrumento)
CREATE TABLE tem_toca (
 id_tem_toca BIGINT AUTO_INCREMENT PRIMARY KEY,
 id_artista BIGINT NOT NULL,
 id_inst BIGINT NOT NULL,
 FOREIGN KEY (id_artista) REFERENCES Artista(id_artista),
 FOREIGN KEY (id_inst) REFERENCES Instrumento(id_inst)
);

-- Tabela intermediária para o relacionamento tem_participacao (artista-musica)
CREATE TABLE tem_participacao (
 id_tem_participacao BIGINT AUTO_INCREMENT PRIMARY KEY,
 id_artista BIGINT NOT NULL,
 id_musica BIGINT NOT NULL,
 FOREIGN KEY (id_artista) REFERENCES Artista(id_artista),
 FOREIGN KEY (id_musica) REFERENCES Musica(id_musica)
);

-- Tabela intermediária para o relacionamento tem_contem (musica-disco)
CREATE TABLE tem_contem (
 id_tem_contem BIGINT AUTO_INCREMENT PRIMARY KEY,
 id_dis BIGINT NOT NULL,
 id_musica BIGINT NOT NULL,
 FOREIGN KEY (id_dis) REFERENCES Disco(id_dis),
 FOREIGN KEY (id_musica) REFERENCES Musica(id_musica)
);

-- Tabela intermediária para o relacionamento tem_produz (disco-produtor)
CREATE TABLE tem_produz (
 id_tem_produz BIGINT AUTO_INCREMENT PRIMARY KEY,
 id_dis BIGINT NOT NULL,
 id_prod BIGINT NOT NULL,
 FOREIGN KEY (id_dis) REFERENCES Disco(id_dis),
 FOREIGN KEY (id_prod) REFERENCES Produtor(id_prod)
);

-- Tabela intermediária para o relacionamento tem_participa_disco (disco-artista)
CREATE TABLE tem_participa_disco (
 id_tem_participa_disco BIGINT AUTO_INCREMENT PRIMARY KEY,
 id_dis BIGINT NOT NULL,
 id_artista BIGINT NOT NULL,
 FOREIGN KEY (id_dis) REFERENCES Disco(id_dis),
 FOREIGN KEY (id_artista) REFERENCES Artista(id_artista)
);
