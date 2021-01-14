const errorTypes = require('../constants/error-types')
module.exports = (error, ctx) => {
    let status, message 
    switch (error.message) {
        case errorTypes.PASSWORD_NAME_REQUIRED:
            status = 400
            message = '用户名密码不能为空'
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409 // conflict 
            message = '用户已存在'
        default:
            break;
    }
    ctx.status = status
    ctx.body = message 
}