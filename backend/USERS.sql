-- Active: 1726423656028@@127.0.0.1@3306@bmtc
SELECT * from USERS;

DELIMITER //
CREATE FUNCTION age_calc (dob DATE) RETURNS INT DETERMINISTIC BEGIN DECLARE currentdate DATE; DECLARE age INT;
SET
    currentdate = CURDATE();
SET
    age = YEAR(currentdate) - YEAR(dob);
RETURN age; END
DELIMITER //

SELECT username, age_calc(bdate) as age from USERS;

