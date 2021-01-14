const mysql = require('mysql2')
const config = require('./config')
const { MYSQL_PORT, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_USER } = config

const connection = mysql.createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE, 
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
})

connection.getConnection((err, connect) => {
    if (err) {
        console.error(err)
    } else {
        connect.connect((err) => {
            if (!err) {
                console.log(`database connects successfully`)
            }
        })
    }
})

module.exports = connection.promise()