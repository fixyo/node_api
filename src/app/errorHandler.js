const errorTypes = require('../constants/error-types')
module.exports = (error, ctx) => {
    let status = 404, message 
    switch (error.message) {
        case errorTypes.PASSWORD_NAME_REQUIRED:
            status = 400
            message = '用户名密码不能为空'
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409 // conflict 
            message = '用户已存在'
            break;
        case errorTypes.USER_DOSE_NOT_EXIST:
            status = 400 // 参数错误
            message = '用户不存在'
            break;
        case errorTypes.NEED_LOGIN:
            status = 401 // 未授权
            message = '无效token'
            break;
        case errorTypes.HAS_NO_PERMISSION:
            status = 403 // 未授权
            message = '用户无权限'
            break;
        case errorTypes.PASSWORD_INCORRECT:
            status = 400
            message = '密码错误'
            break;
        default:
            break;
    }
    ctx.status = status
    ctx.body = message 
}