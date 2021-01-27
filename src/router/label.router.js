const Router = require('koa-router')
const { verifyToken } = require('../middleware/user.middleware')
const { create } = require('../controller/label.controller')
const router = new Router({prefix: '/label'})

router.post('/', verifyToken, create)

module.exports = router 