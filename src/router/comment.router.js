const Router = require('koa-router')
const { verifyToken, verifyUser } = require('../middleware/user.middleware')
const { create, reply } = require('../controller/comment.controller')

const router = new Router({ prefix: '/comment'})

router.post('/', verifyToken, create)
router.post('/reply', verifyToken, reply)

module.exports = router