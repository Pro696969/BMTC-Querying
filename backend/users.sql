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
    time TIME
);

CREATE TABLE stops(
    stop_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128),
    latitude DECIMAL(16, 13),
    longitude DECIMAL(16, 13)
);

CREATE TABLE history(
    h_user_id INT NOT NULL,
    h_route_id INT NOT NULL,
    FOREIGN KEY (h_user_id) REFERENCES users(user_id),
    FOREIGN KEY (h_route_id) REFERENCES routes(route_id)
);

DELIMITER //
CREATE FUNCTION age_calc (dob DATE) RETURNS INT DETERMINISTIC BEGIN DECLARE currentdate DATE; DECLARE age INT;
SET
    currentdate = CURDATE();
SET
    age = YEAR(currentdate) - YEAR(dob);
RETURN age;
END //
DELIMITER ;

SELECT username, age_calc(bdate) as age from users;

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

DELETE FROM users WHERE username=''
