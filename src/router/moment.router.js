const Router = require('koa-router')
const { verifyToken } = require('../middleware/user.middleware')
const { create } = require('../controller/moment.controller')
const router = new Router({prefix: '/moment'})

router.post('/', verifyToken , create)

module.exports = router 
