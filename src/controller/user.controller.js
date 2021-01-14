const userService = require('../service/user.service')
class UserController {
    async list(ctx, next) {
        ctx.body = '获取用户列表成功'
    }

    async create(ctx, next) {
        const user = ctx.request.body 
        console.log(user, 'user')
        const res = await userService.create(user)
        console.log(res)
        ctx.body = res 
    }
}

module.exports = new UserController 