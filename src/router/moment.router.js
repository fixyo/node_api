const Router = require('koa-router')
const { verifyToken } = require('../middleware/user.middleware')
const { create, detail, list } = require('../controller/moment.controller')
const router = new Router({prefix: '/moment'})

router.post('/', verifyToken , create)
router.get('/', list)
router.get('/:momentId', detail)

module.exports = router 
