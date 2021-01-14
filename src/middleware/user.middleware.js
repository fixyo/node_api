const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const verifyUser = async (ctx, next) => {
    // 获取用户信息
    const { name, password} = ctx.request.body 
    // 验证非空
    if (!name || !password) {
        const error = new Error(errorTypes.PASSWORD_NAME_REQUIRED)
        return ctx.app.emit('error', error, ctx )
    }

    const user = await userService.getUserByName(name) 
    // 查询到用户
    if (user && user.length) {
        const error = new Error(errorTypes.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', error, ctx )
    }

    // 验证通过
    await next()
    
}

module.exports = { verifyUser }