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
    connection.query("SELECT * FROM role", (err, results) => {
        if (err) throw err;

        inquirer
        .prompt([
            {
                message: "Employee's first name?",
                type: "input",
                name: "first_name"
            },
            {
                message: "Employee's last name?",
                type: "input",
                name: "last_name"
            },
            {
                message: "Employee's role ID?",
                type: "list",
                name: "role_id",
                choices: results.map( role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
            },
            {
                message: "Employee's manager ID?",
                type: "input",
                name: "manager_id",
                validate: (value) => {
                    return !isNaN(value);
                }
            },
        ])
        .then( (res) => {
            connection.query("INSERT INTO employee SET ?", res, (err, result) => {
                if (err) throw err;
                console.log("Inserted as ID " + result.insertId)
            })
        })
    })
}

function viewDept() {
    connection.query("SELECT name FROM department", (err, res) => {
        if (err) throw err;
        console.log(res);
        connection.end();
    })

}

function viewRole() {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.log(res);
        startingPrompt()
    })
}

function viewEmp() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.log(res);
    })
}

function updateEmpRole() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;

        inquirer
        .prompt([
            {
                message: "Which employee would you like to update?",
                type: "list",
                name: "newEmpRole",
                choices: results.map( employee => {
                    return {
                        name: employee.first_name,
                        value: employee.id
                        }

                })
            },
        ])
        .then( (res) => {
            
        })
    })
}

function startingPrompt() {

}

addEmp()