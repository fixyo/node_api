const Router = require('koa-router')
const { verifyToken, verifyPermission } = require('../middleware/user.middleware')
const { checkIsLabelExists } = require('../middleware/label.middleware')
const { create, detail, list, update, remove, addLabels } = require('../controller/moment.controller')
const router = new Router({prefix: '/moment'})

router.post('/', verifyToken , create)
router.post('/:momentId/labels', verifyToken, verifyPermission('moment', 'momentId'), checkIsLabelExists, addLabels)
router.get('/', list)
router.get('/:momentId', detail)
router.patch('/:momentId', verifyToken, verifyPermission('moment', 'momentId'), update)
router.delete('/:momentId', verifyToken, verifyPermission('moment', 'momentId'), remove)

module.exports = router 
