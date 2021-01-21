const Router = require('koa-router')
const { verifyToken, verifyPermission } = require('../middleware/user.middleware')
const { create, detail, list, update, remove } = require('../controller/moment.controller')
const router = new Router({prefix: '/moment'})

router.post('/', verifyToken , create)
router.get('/', list)
router.get('/:momentId', detail)
router.patch('/:momentId', verifyToken, verifyPermission, update)
router.delete('/:momentId', verifyToken, verifyPermission, remove)

module.exports = router 
