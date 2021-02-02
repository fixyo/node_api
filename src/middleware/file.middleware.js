const multer = require('koa-multer')

const uploadAvatar = multer({dest: './uploads/'})

const uploadPicture = multer({dest: './uploads/picture/'})

module.exports = {
    uploadAvatar,
    uploadPicture
}