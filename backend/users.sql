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
