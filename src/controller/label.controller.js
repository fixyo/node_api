
const  { create } = require('../service/label.service') 

class LabelController {
    async create(ctx, next) {
        const { name } = ctx.request.body
        const result = await create(name)
        ctx.body = result
    }

  
}

module.exports = new LabelController()