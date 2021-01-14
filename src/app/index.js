const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('../router')
const db = require('./database')
const errorHandler = require('./errorHandler')

const app = new Koa()

app.useRouter = router

// 先使用bodyParser中间件
app.use(bodyParser())

app.useRouter()


app.on('error', errorHandler)



module.exports = app 
