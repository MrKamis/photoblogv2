CREATE DATABASE photoBlogv2;

USE photoBlogv2;

CREATE TABLE users(
    login VARCHAR(50),
    password TEXT,
    permissions TEXT,
    id INT PRIMARY KEY AUTO_INCREMENT,
    reviews TEXT
);

CREATE TABLE pictures(
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(50),
    date DATE,
    title TEXT,
    src TEXT,
    likes INT,
    unlikes INT
);

CREATE TABLE sessions(
    login VARCHAR(50) UNIQUE,
    session_key TEXT,
    host_ip TEXT
);