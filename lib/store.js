const mysql = require("mysql");
const config = require("./config");

class Store {
    constructor() {
        if (!config.DB_PASSWORD)
            throw new Error("Missing database password.");

        this.connection = mysql.createConnection({
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            database: config.DB_NAME,
            password: config.DB_PASSWORD,
        });
    }

    connect() {
        return new Promise( (resolve, reject) => {
            this.connection.connect( (err) => {
                if (err) reject(err);
                else resolve();
            })
        })
    }

    close() {
        this.connection.end();
    }
}

module.exports = new Store();