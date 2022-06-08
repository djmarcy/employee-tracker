require(`dotenv`).config();
let mysql = require("mysql");
let inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  init();
});

// Questions
const initQuestions = [
  {
    type: `list`,
    name: `appStart`,
    message: `What do you want to do?`,
    choices: [
      `View All Departments`,
      `View All Roles`,
      `View All Employees`,
      `Add A Department`,
      `Add A Role`,
      `Add An Employee`,
      `Update An Employee's Role`,
    ],
  },
];

const addDept = [
  {
    type: `input`,
    name: `deptName`,
    message: `What is the name of the department you would like to add?`,
  },
];

const addntlRole = [
  {
    type: `input`,
    name: `roleName`,
    message: `What is the name of the role you would like to add?`,
  },
  {
    type: `input`,
    name: `roleDept`,
    message: `What department does this role belong to?`,
  },
  {
    type: `input`,
    name: `rolePay`,
    message: `What is the salary for this position?`,
  },
];

const addntlEmployee = [
  {
    type: `input`,
    name: `employeeFname`,
    message: `Employee first name:`,
  },
  {
    type: `input`,
    name: `employeeLname`,
    message: `Employee last name:`,
  },
  {
    type: `input`,
    name: `employeeRole`,
    message: `Enter employee role ID:`,
  },
  {
    type: `input`,
    name: `employeeMngr`,
    message: `Enter employee manager ID:`,
  },
];

const updateEmployeeRole = [
  {
    type: `input`,
    name: `employeeId`,
    message: `Employee ID:`,
  },
  {
    type: `input`,
    name: `employeeRole`,
    message: `Employee new role:`,
  },
];

// Functions
function init() {
  inquirer.prompt(initQuestions).then((response) => {
    switch (response.appStart) {
      case `View All Departments`:
        viewDepartments();
        break;

      case `View All Roles`:
        viewRoles();
        break;

      case `View All Employees`:
        viewEmployees();
        break;

      case `Add A Department`:
        addDepartment();
        break;

      case `Add A Role`:
        addRole();
        break;

      case `Add An Employee`:
        addEmployee();
        break;

      case `Update An Employee's Role`:
        updateEmployee();
        break;
    }
  });
}

// View Functions
function viewDepartments() {
  let sql = `SELECT * FROM departments;`;

  connection.query(sql, (err, response) => {
    if (err) throw err;
    console.log(response);
  });

  init();
}

function viewRoles() {
  let sql = `SELECT * FROM roles;`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
  });

  init();
}

function viewEmployees() {
  let sql = `SELECT * FROM employees;`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
  });

  init();
}

// Create Functions
function addDepartment() {
  inquirer
    .prompt(addDept)
    .then((response) => {
      let deptName = response.deptName;
      let sql = `INSERT INTO departments (dept_name) VALUES (${deptName});`;

      connection.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
      });
    })
    .then(init());
}

function addRole() {
  inquirer.prompt(addntlRole).then((response) => {
    let roleTitle = response.roleTitle;
    let roleDept = response.roleDept;
    let rolePay = response.rolePay;
    let sql = `INSERT INTO roles (role_title, role_dept, role_pay) VALUES (${roleTitle}, ${roleDept}, ${rolePay});`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.table(result);
    });
  });

  init();
}

function addEmployee() {
  inquirer
    .prompt(addntlEmployee)
    .then((response) => {
      let employeeFname = response.employeeFname;
      let employeeLname = response.employeeLname;
      let employeeRole = response.employeeRole;
      let employeeMngr = response.employeeMngr;
      let sql = `INSERT INTO employees (employee_fname, employee_lname, employee_role, employee_mngr) VALUES (${employeeFname}, ${employeeLname}, ${employeeRole}, ${employeeMngr});`;

      connection.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
      });
    })
    .then(init());
}

function updateEmployee() {
  inquirer
    .prompt(updateEmployeeRole)
    .then((response) => {
      let employeeId = response.employeeId;
      let employeeRole = response.employeeRole;
      let sql = `SELECT * FROM employees
              UPDATE employees SET employee.role = ${employeeRole} WHERE id = ${employeeId};`;

      connection.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
      });
    })
    .then(init());
}
