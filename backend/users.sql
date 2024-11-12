SELECT * from users;

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