require('dotenv').config()

// NodeJS external package that allows for a connection to a mysql database
const mysql = require("mysql2")

// Connects to a mysql database using appropriate credentials.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

module.exports = pool.promise()