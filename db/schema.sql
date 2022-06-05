DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
    dept_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(30)
);

CREATE TABLE roles (
    role_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_title VARCHAR(30),
    role_dept INT,
    role_pay DECIMAL,
    FOREIGN KEY (role_dept) REFERENCES departments(dept_id)
);

CREATE TABLE employees (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    employee_fname VARCHAR(30),
    employee_lname VARCHAR(30),
    employee_role INT,
    FOREIGN KEY (employee_role)
    REFERENCES roles(role_id),
    employee_mngr INT
);