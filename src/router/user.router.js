const Router = require('koa-router') 
const { create, list } = require('../controller/user.controller')

const userRouter = new Router({prefix: '/users'})

userRouter.post('/', create)
userRouter.get('/list', list)

module.exports = userRouter 