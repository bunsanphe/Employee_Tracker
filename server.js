const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection( {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "DarkArtsPW",
    database: "employee_DB"
});

connection.connect( (err) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.ThreadID);
    startPrompt();
})

app.listen(PORT, () => {
    console.log("Server listening on: http:localhost:" + PORT)
})