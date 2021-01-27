const { create, update, remove, list } = require('../service/comment.service')

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

    async update(ctx, next) {
        const { commentId } = ctx.params 
        const { content } = ctx.request.body 
        const res = await update(commentId, content)
        ctx.body = res
    }

    async remove(ctx, next) {
        const { commentId } = ctx.params 
        const res = await remove(commentId)
        ctx.body = res
    }

    async list(ctx, next) {
        const { momentId } = ctx.query 

        const res = await list(momentId)

        ctx.body = res 
    }
}

module.exports = new CommentController()