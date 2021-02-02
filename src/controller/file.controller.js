const { saveUploadFileInfo, saveUploadPictureInfo } = require('../service/file.service')
const { updateUserAvatarUrl } = require('../service/user.service')

class UploadFile {
    async uploadAvatar(ctx, next) {
        const { user } = ctx 
        // console.log(user)
        const { filename, mimetype, size } = ctx.req.file
        const res = await saveUploadFileInfo({ filename, mimetype, size, user_id: user.id}) 
        const path = `/uploads/${filename}`
        await updateUserAvatarUrl(path, user.id)
        ctx.body = '上传头像成功'
    }

    async uploadPicture(ctx, next) {
        const {id} = ctx.user 
        const {momentId} = ctx.query
        const files = ctx.req.files 

        for (const file of files) {
            const { filename, size, mimetype} = file 
            const res = await saveUploadPictureInfo({filename, size, momentId, mimetype, user_id: id})
        }
        
        ctx.body = '上传图片成功'

    }

  
}

module.exports = new UploadFile()