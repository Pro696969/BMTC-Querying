-- Active: 1726423656028@@127.0.0.1@3306
-- use this as a script 
CREATE DATABASE IF NOT EXISTS bmtc;
use bmtc;

CREATE TABLE users(
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(32),
    password VARCHAR(32),
    emailid VARCHAR(64),
    bdate DATE
);

CREATE TABLE routes(
    route_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    route_no VARCHAR(16),
    distance FLOAT,
    origin VARCHAR(64),
    destination VARCHAR(64),
    starred BOOL DEFAULT FALSE,
    time TIME
);

CREATE TABLE stops(
    stop_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128),
    latitude DECIMAL(16, 13),
    longitude DECIMAL(16, 13)
);
