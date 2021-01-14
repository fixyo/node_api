class UserController {
    async list(ctx, next) {
        ctx.body = '获取用户列表成功'
    }

    async create(ctx, next) {
        ctx.body = '创建用户成功'
    }
}

module.exports = new UserController 