const mysql = require("mysql");
require('dotenv').config()


// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DBhost || "localhost",
    user: process.env.DBuser || "root",
    password: process.env.DBpassword || "",
    database: process.env.DB || "store"
});
db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected.....");
});


// exporting methods
module.exports = db;