const Router = require('koa-router') 
const { create, list, login, verifyTokenC, getAvatar } = require('../controller/user.controller')
const { verifyUser, verifyLogin, encyptPassword, verifyToken } = require('../middleware/user.middleware')
// const {  } = require('../controller/file.controller')

console.log(getAvatar, 'GET')
const userRouter = new Router({prefix: '/users'})

userRouter.post('/create', verifyUser, encyptPassword, create)
userRouter.post('/login', verifyLogin, login)
userRouter.get('/testtoken', verifyToken, verifyTokenC)
userRouter.get('/list', list)
userRouter.get('/:userId/avatar', getAvatar)

module.exports = userRouter 