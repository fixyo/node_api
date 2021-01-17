const Router = require('koa-router') 
const { create, list, login } = require('../controller/user.controller')
const { verifyUser, verifyLogin, encyptPassword } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/users'})

userRouter.post('/create', verifyUser, encyptPassword, create)
userRouter.post('/login', verifyLogin, login)
userRouter.get('/list', list)

module.exports = userRouter 