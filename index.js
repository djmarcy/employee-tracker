// Dependencies
let inquirer = require("inquirer");

const questions = [
  {
    type: `list`,
    name: `appStart`,
    message: `What do you want to do?`,
    choices: [
      `View All Departments`,
      `View All Roles`,
      `View All Employees`,
      `Add A Department`,
      "Add A Role",
      `Add An Employee`,
      `Update An Employee's Role`,
    ],
  },
];
