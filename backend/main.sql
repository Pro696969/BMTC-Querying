-- Active: 1726423656028@@127.0.0.1@3306@bmtc
-- use this as a script 
CREATE DATABASE bmtc;
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


DELIMITER //
CREATE FUNCTION age_calc (dob DATE) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE currentdate DATE; DECLARE age INT;
    SET currentdate = CURDATE();
    SET age = YEAR(currentdate) - YEAR(dob);
    RETURN age;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER validate_birthdate 
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF YEAR(NEW.bdate) > 2024 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Birth year cannot be greater than 2024';
    END IF;
END //
DELIMITER ;

SELECT 
    COUNT(*) AS total_users,
    AVG(YEAR(CURDATE()) - YEAR(bdate)) AS average_age,
    MAX(YEAR(CURDATE()) - YEAR(bdate)) AS oldest_user_age,
    MIN(YEAR(CURDATE()) - YEAR(bdate)) AS youngest_user_age
FROM users;

SELECT 
    u.user_id, 
    u.username, 
    r.route_no, 
    r.origin, 
    r.destination
FROM 
    users u
JOIN 
    routes r
ON 
    u.user_id = r.route_id;


CREATE TABLE user_starred_routes (
    user_id INT NOT NULL,
    route_id INT NOT NULL,
    PRIMARY KEY (user_id, route_id),
    FOREIGN Key (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(route_id) ON DELETE CASCADE
);

DESC user_starred_routes;

SELECT user_id FROM users
WHERE username = 'mnc';

SELECT * FROM user_starred_routes
WHERE user_id = 1;

SELECT u.username, r.route_no, r.origin, r.destination
FROM users u
JOIN user_starred_routes usr ON u.user_id = usr.user_id
JOIN routes r ON r.route_id = usr.route_id
ORDER BY u.username;
