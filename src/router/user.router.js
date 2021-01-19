const Router = require('koa-router') 
const { create, list, login, verifyTokenC } = require('../controller/user.controller')
const { verifyUser, verifyLogin, encyptPassword, verifyToken } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/users'})

userRouter.post('/create', verifyUser, encyptPassword, create)
userRouter.post('/login', verifyLogin, login)
userRouter.get('/testtoken', verifyToken, verifyTokenC)
userRouter.get('/list', list)

module.exports = userRouter 