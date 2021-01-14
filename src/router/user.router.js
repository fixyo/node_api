const Router = require('koa-router') 
const { create, list } = require('../controller/user.controller')
const { verifyUser } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/users'})

userRouter.post('/create', verifyUser, create)
userRouter.get('/list', list)

module.exports = userRouter 