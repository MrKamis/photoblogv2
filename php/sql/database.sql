CREATE DATABASE photoBlogv2;

USE photoBlogv2;

CREATE TABLE users(
    login VARCHAR(50),
    password TEXT,
    permissions TEXT,
    likes TEXT,
    unlikes TEXT,
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