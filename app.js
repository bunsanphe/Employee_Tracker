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
                addRole()
            })
        })
}

function addRole() {

    connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;

        inquirer
        .prompt([
            {
                message: "Add a title/role.",
                type: "input",
                name: "title"
            },
            {
                message: "What is the salary for this role?",
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
                startingPrompt()
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
                startingPrompt()
            })
        })
    })
}

function viewDept() {
    connection.query("SELECT name FROM department", (err, res) => {
        if (err) throw err;
        console.log(res);
        startingPrompt()
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
        startingPrompt()
    })
}

function updateEmpRole() {
    connection.query("SELECT first_name, last_name, role_id, title FROM role LEFT JOIN employee ON role.id = employee.role_id", (err, results) => {
        if (err) throw err;

        inquirer
        .prompt([
            {
                message: "Which employee would you like to update?",
                type: "list",
                name: "empToChange",
                choices: results.map( employee => {
                    return {
                        name: employee.first_name,
                        value: employee.first_name
                        }

                })
            },
            {
                message: "What is the new role?",
                type: "list",
                name: "role_id",
                choices: results.map( role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
            },
        ])
        .then( (res) => {
            console.log(res);
            console.log(res.role);
            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.role_id, res.empToChange], (err, results) => {
                if (err) throw err;
                console.log("Inserted as ID " + results.insertId);
                console.log("success")
            })
        })
    })
}

function startingPrompt() {
    inquirer
    .prompt([
        {
            message: "What would you like to do?",
            type: "list",
            name: "prompt",
            choices: [
                "Add department", 
                "Add role", 
                "Add employee", 
                "View departments", 
                "View roles",
                "View employees",
                "Update employee role",
            ]
        },
    ])
    .then( (res) => {
        if (res.prompt === "Add department") {
            addDept()
        }
        else if (res.prompt === "Add role") {
            addRole()
        }
        else if (res.prompt === "Add employee") {
            addEmp()
        }
        else if (res.prompt === "View departments") {
            viewDept()
        }
        else if (res.prompt === "View roles") {
            viewRole()
        }
        else if (res.prompt === "View employees") {
            viewEmp()
        }
        else if (res.prompt === "Update employee role") {
            updateEmpRole()
        }
    })
}

// addRole()
// addDept()
// updateEmpRole()
viewDept()