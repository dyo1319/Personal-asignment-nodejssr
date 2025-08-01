Create Database IF NOT EXISTS  Personal_assignment;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    uname VARCHAR(50),
    passwd VARCHAR(100),
    email VARCHAR(100),
    tz VARCHAR(20)
);