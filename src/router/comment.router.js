const Router = require('koa-router')
const { verifyToken, verifyPermission } = require('../middleware/user.middleware')
const { create, reply, update, remove, list } = require('../controller/comment.controller')

const router = new Router({ prefix: '/comment'})

router.post('/', verifyToken, create)
router.post('/reply', verifyToken, reply)

router.get('/', list)

router.patch('/:commentId', verifyToken, verifyPermission('comment', 'commentId'), update)
router.delete('/:commentId', verifyToken, verifyPermission('comment', 'commentId'), remove)

module.exports = router