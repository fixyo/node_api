const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5 = require('../util/encryptPassword')
const { PUBLIC_KEY } = require('../app/config')

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

const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body

    if (!name || !password) {
        const error = new Error(errorTypes.PASSWORD_NAME_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }

    const result = await userService.getUserByName(name)
    const user = result[0]

    if (!user) {
        const error = new Error(errorTypes.USER_DOSE_NOT_EXIST)
        return ctx.app.emit('error', error, ctx)
    }

    const encryptPassword = md5(password)

    if (encryptPassword !== user.password) {
        const error = new Error(errorTypes.PASSWORD_INCORRECT)
        return ctx.app.emit('error', error, ctx)
    }
    // 传递user信息
    ctx.user = user 

    await next()
}

const encyptPassword = async (ctx, next) => {
    let {password} = ctx.request.body
    ctx.request.body.password = md5(password)
    console.log('xxx')
    await next()
}

const verifyToken = async (ctx, next) => {
    console.log('验证授权登录middleware执行')
    let token = ctx.headers.authorization
    console.log(ctx.headers)
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })

        ctx.user = result 
        await next()
        
    } catch (err) {
        
        const error = new Error(errorTypes.NEED_LOGIN)
        ctx.app.emit('error', error, ctx)
    }


}

const verifyPermission = async (ctx, next) => {
    // 当前用户的id
    const { id } = ctx.user 
    const { momentId } = ctx.params
    try {
        const hasPermission = await authService.checkMomentPermission(momentId, id)
        if (!hasPermission) throw new Error()
        await next()
    } catch (err) {
        const error = new Error(errorTypes.HAS_NO_PERMISSION)
        ctx.app.emit('error', error, ctx)
    }

}

module.exports = { verifyUser, verifyLogin, encyptPassword, verifyToken, verifyPermission}