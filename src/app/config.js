const dotenv = require('dotenv')

// 加载.env中的参数到process.env对象上 
dotenv.config()

const { APP_PORT, APP_HOST } = process.env 

module.exports = {
    APP_HOST,
    APP_PORT
}