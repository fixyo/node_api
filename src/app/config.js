const dotenv = require('dotenv')

// 加载.env中的参数到process.env对象上 
dotenv.config()

const { APP_PORT, APP_HOST, MYSQL_PORT, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_USER } = process.env 

module.exports = {
    APP_HOST,
    APP_PORT,
    MYSQL_PORT,
    MYSQL_HOST,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_USER
}