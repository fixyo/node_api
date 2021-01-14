const Koa = require('koa')
const router = require('../router')

const app = new Koa()

app.useRouter = router

app.useRouter()

module.exports = app 
