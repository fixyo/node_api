const { create, getMomentById, getMomentList } = require('../service/moment.service')
class MomentController {
    async create(ctx, next) {
        const { id } = ctx.user 
        const { content } = ctx.request.body 

        const res = await create(id, content)

        ctx.body = res 
    }
    async list(ctx, next) {
        const { page, size } = ctx.query
        const offset = (parseInt(page) - 1) * parseInt(size) 
        const res = await getMomentList(offset + '', size)
        ctx.body = res 
    }

    async detail(ctx, next) {
        const { momentId } = ctx.params 
        const moment = await getMomentById(momentId) 
        ctx.body = moment 
    }
}

module.exports = new MomentController()