const store = require("./lib/store")
const inquirer = require("inquirer")
const { connection } = require("./lib/store")

function addDept() {
    inquirer
        .prompt([
            {
                message: "What is the department's name?",
                type: "input",
                name: "deptName"
            }
        ])
        .then( (res) => {
            connection.query("INSERT INTO department (name) VALUES (?)", res.deptName, (err, result) => {
                if (err) throw err;
                console.log("Inserted as ID " + result.insertId)
            })
            console.log(res)
        })
}

function addRole() {

    connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;

        inquirer
        .prompt([
            {
                message: "What is the title?",
                type: "input",
                name: "title"
            },
            {
                message: "What is the salary?",
                type: "input",
                name: "salary",
                validate: (value) => {
                    return !isNaN(value);
                }
            },
            {
                message: "What department does the role belong to?",
                type: "list",
                name: "department_id",
                choices: results.map( department => {
                    return {
                        name: department.name, 
                        value: department.id
                    }
                })
            }
        ])
        .then( (res) => {
            connection.query("INSERT INTO role SET ?", res, (err, result) => {
                if (err) throw err;
                console.log("Inserted as ID " + result.insertId)
            })
        })
    })
}

function addEmp() {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;

        inquirer
        .prompt([
            {
                message: "What is the title?",
                type: "input",
                name: "first_name"
            },
            {
                message: "What is the title?",
                type: "input",
                name: "last_name"
            },
            {
                message: "What is the salary?",
                type: "input",
                name: "role_id",
                validate: (value) => {
                    return !isNaN(value);
                }
            },
            {
                message: "What is the salary?",
                type: "input",
                name: "manager_id",
                validate: (value) => {
                    return !isNaN(value);
                }
            },
            {
                message: "What department does the role belong to?",
                type: "list",
                name: "department_id",
                choices: results.map( department => {
                    return {
                        name: department.name, 
                        value: department.id
                    }
                })
            }
        ])
        .then( (res) => {
            connection.query("INSERT INTO role SET ?", res, (err, result) => {
                if (err) throw err;
                console.log("Inserted as ID " + result.insertId)
            })
        })
    })
}

function viewDept() {

}

function viewRole() {

}

function viewEmp() {

}

function updateEmpRole() {

}

addRole()