require(`dotenv`).config();
let mysql = require("mysql");
let inquirer = require("inquirer");

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

const addtlRole = [
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
    name: `roleName`,
    message: `What is the name of the role you would like to add?`,
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
  let sql = `SELECT * FROM departments`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
  });
}

function viewRoles() {
  let sql = `SELECT * FROM roles`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
  });

  init();
}

function viewEmployees() {
  let sql = `SELECT * FROM employees`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
  });

  init();
}

// Create Functions
function addDepartment() {
  inquirer.prompt(addDept).then((response) => {
    let deptName = response.deptName;
    let sql = `INSERT INTO departments VALUES (${deptName})`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.table(result);
    });
  });

  init();
}

function addRole() {
  let roleTitle = "";
  let roleDept = "";
  let rolePay = "";
  let sql = `INSERT INTO roles VALUES (${roleTitle}, ${roleDept}, ${rolePay})`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
  });

  init();
}

function addEmployee() {
  let roleTitle = "";
  let roleDept = "";
  let rolePay = "";
  let sql = `INSERT INTO roles VALUES (${roleTitle}, ${roleDept}, ${rolePay})`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
  });

  init();
}

function updateEmployee() {
  let attr = "";
  let employeeFname = "";
  let sql = `SELECT * FROM employees
             UPDATE employees SET ${attr} WHERE employee_fname = ${employeeFname}`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
  });

  init();
}