const { getLabelByName, create } = require('../service/label.service.js') 
const checkIsLabelExists = async (ctx, next) => {
    const { labels } = ctx.request.body
    const newLabels = []
    
    try {
        for (let label of labels) {
            const res = await getLabelByName(label)
            // console.log(res)
            if (!res) {
                const inserted = await create(label)
                newLabels.push({id: inserted.insertId, name: label})
            } else {
                // console.log('here')
                newLabels.push({id: res.id, name: res.name})
            }
        }
            
        ctx.labels = newLabels

        await next()

    } catch (err) {
        console.error(err)
    }
    
    
}

module.exports = {
    checkIsLabelExists
}