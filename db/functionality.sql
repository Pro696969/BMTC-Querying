
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
