const { create, getMomentById, getMomentList, updateMoment, removeMoment } = require('../service/moment.service')
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

    async update(ctx, next) {
        try {
            const { content } = ctx.request.body 
            const { momentId } = ctx.params 
            const res = await updateMoment(momentId, content)
            ctx.body = res
        } catch (err) {
            console.log(err)
        }
    }

    async remove(ctx, next) {
        try {
            const { momentId } = ctx.params
            const res = await removeMoment(momentId)
            ctx.body = res 
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new MomentController()