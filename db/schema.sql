CREATE DATABASE IF NOT EXISTS business_db

CREATE TABLE IF NOT EXISTS departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(25),
)

CREATE TABLE IF NOT EXISTS roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_title VARCHAR(25),
    role_dept VARCHAR(25),
    role_pay DECIMAL,
)

CREATE TABLE IF NOT EXISTS employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_fname VARCHAR(25),
    employee_lname VARCHAR(25),
    employee_role VARCHAR(25),
    employee_dept VARCHAR(25),
    employee_pay VARCHAR(25),
    employee_mngr VARCHAR(25),
)