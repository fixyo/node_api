const Router = require('koa-router')
const { verifyToken } = require('../middleware/user.middleware')
const { uploadAvatar, uploadPicture } = require('../middleware/file.middleware')
const uploadFile = require('../controller/file.controller')

const router = new Router({prefix: '/uploads'})


router.post('/avatar', verifyToken, uploadAvatar.single('avatar'), uploadFile.uploadAvatar)
router.post('/picture', verifyToken, uploadPicture.array('picture', 9), uploadFile.uploadPicture)

module.exports = router 