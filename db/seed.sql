INSERT INTO departments (dept_name)
VALUES ("Content"),
       ("Social Media"),
       ("Ads"),
       ("Web Development"),
       ("Acct Managers");

INSERT INTO roles (role_title, role_dept, role_pay)
VALUES ("CMS", 1, 50000.00),
       ("SMS", 2, 50000.00),
       ("ADS", 3, 45000.00),
       ("WebDev", 4, 75000.00),
       ("Mngr", 5, 40000.00);

INSERT INTO employees (employee_fname, employee_lname, employee_role, employee_mngr)
VALUES ("D", "M", 1, 5),
       ("L", "B", 1, 5),
       ("K", "H", 3, 2),
       ("S", "M", 2, 1),
       ("I", "A", 5, null);