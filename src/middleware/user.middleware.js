const { Layer } = require('koa-router')
const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5 = require('../util/encryptPassword')

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

    await next()
}

const encyptPassword = async (ctx, next) => {
    let {password} = ctx.request.body
    ctx.request.body.password = md5(password)
    console.log('xxx')
    await next()
}

module.exports = { verifyUser, verifyLogin, encyptPassword }