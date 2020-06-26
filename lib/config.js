const fs = require("fs");
const path = require("path");
const env = require("node-env-file");
const envPath = path.join(__dirname, "../.env");

//defaults
process.env.DB_HOST = "localhost";
process.env.DB_PORT =  3306;
process.env.DB_NAME = "employee_DB";
process.env.DB_USER = "root";
process.env.DB_PASSWORD = "DarkArtsPW"

try {
    if (fs.existsSync(envPath)) env(envPath);
} catch(err) {
    console.log("\nMissing .en file.")
}

module.exports = process.env