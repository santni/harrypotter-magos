-- COMANDO NO SQL

CREATE DATABASE hp;

\c hp;

CREATE TABLE personagens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    casa VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    sangue VARCHAR(100) NOT NULL
);

CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento VARCHAR(20) NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    data_fabricacao DATE NOT NULL
);

--insert de um mago aleatório

--INSERT INTO personagens (nome, idade, casa, habilidade, sangue) VALUES ('Nicolly', 17, 'Grifinória',  'Metamorfomagia', 'Puro');

--insert de uma varinha aleatória

--INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ('Madeira de Teixo', '11cm', 'Pena de Fênix', '1991-07-31');
