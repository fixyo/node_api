const fs = require('fs')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const { RSA_NO_PADDING } = require('constants')


class UserController {
    async list(ctx, next) {
        ctx.body = '获取用户列表成功'
    }

    async create(ctx, next) {
        const user = ctx.request.body 
        console.log(user, 'user')
        const res = await userService.create(user)
        // console.log(res)
        ctx.body = res 
    }

    async login(ctx, next) {
        const { user } = ctx 
        const { id, name } = user 

        const token = jwt.sign({id, name}, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })

        ctx.body = {
            id,
            name,
            token
        }
    }

    async verifyTokenC(ctx, next) {
        ctx.body = '授权验证成功'
    }

    async getAvatar(ctx, next) {
        // console.log(111)
        const {userId} = ctx.params

        const res = await fileService.getAvatarByUserId(userId)

        // console.log(res, 'rrr')
        // 不设置媒体类型会被当做文件下载
        ctx.response.set('content-type', res.mimetype)
        ctx.body = fs.createReadStream(`./uploads/${res.filename}`)
    }
}

module.exports = new UserController 