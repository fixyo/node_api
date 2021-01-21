const { create } = require('../service/comment.service')

class CommentController {
    async create(ctx, next) {
        const { content, moment_id } = ctx.request.body
        const { id } = ctx.user 
        const res = await create({content, moment_id, user_id: id})

        ctx.body = res 
    }

    async reply(ctx, next) {
        const { content, moment_id, comment_id } = ctx.request.body
        const { id } = ctx.user 
        const res = await create({content, moment_id, user_id: id, comment_id})

        ctx.body = res 
    }
}

module.exports = new CommentController()